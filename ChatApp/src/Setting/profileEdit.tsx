import { use, useEffect, useState } from "react";
import type { userInfo } from "../type";
import type { UserLogin } from "../type";
import DisappearingDiv from "../disapearDiv";


export default function ProfileEdit() {

    const [passwordOpen, setPasswordOpen] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [success, setSuccess] = useState<{message:string;id:number} | null>(null);
    

    const [theme, setTheme] = useState<string>("")

    const [user, setUser] = useState<userInfo>({
        fullname: "",
        username: "",
        email: "",
        password: "",
        description: ""
    });

    useEffect(() => {
        getinfo();
        setTheme(localStorage.getItem("theme") || "");
    }, [])


    const getinfo = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getUserOptions`, {
                method: "GET",
                credentials: "include",
            })
            if (!response.ok) {
                console.log("something were wrong");
            }
            const data = await response.json();
            setUser(data);

        } catch (e) {
            console.log(e)
        }
    }

    function closePassword() {
        setPasswordOpen(false);
        setPassword("");
        setConfirmPassword("");
        setAlertMessage("");
    }

    function savePassword() {
        if (password !== confirmPassword) {
            setAlertMessage("Passwords do not match");
            return;
        }
        saveChanges();
    }

    const saveChanges = async () => {
        const user : UserLogin = {
            username: localStorage.getItem("Username") || "",
            password: password,
        }
        try {
            const response = await fetch(`http://localhost:8080/changePassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                console.log("something were wrong");
            }
            const data = await response.text();
            if(data  === "succefull") {
                //id with the Date.now makes the id to be different every time so the component will be re-rendered and the message will be shown again
                setSuccess({message:"Password changed successfully",id:Date.now()});
                closePassword();
            }
        }
        catch (e) {             
            console.log(e)
        }
    }

    


    return (
        <div className={`w-full h-full flex flex-col justify-around items-center ${theme}`}>
            <div>
                <p className="w-50 h-50 bg-[var(--hover)] rounded-full border  mb-3"></p>
            </div>

            <div>
                <input type="text" name="fullname" id="fullname" value={user?.fullname} className="p-1 border-b border-[var(--text)] text-xl text-[var(--text)]" onChange={(e) => setUser({ ...user, fullname: e.target.value })} />
                <p className=" text-sm">Fullname</p>
            </div>

            <div>
                <input type="text" name="fullname" id="fullname" value={user?.username} className="p-1 border-b border-[var(--text)] text-xl text-[var(--text)]" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                <p className=" text-sm">Username</p>
            </div>

            <div>
                <input type="text" name="fullname" id="fullname" value={user?.email} className="p-1 border-b border-[var(--text)] text-xl text-[var(--text)]" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <p className=" text-sm">Email</p>
            </div>

            {!passwordOpen && <div>
                <button className="p-1 bg-[var(--chat)] rounded hover:bg-[var(--chat)]/80 hover:cursor-pointer" onClick={() => setPasswordOpen(true)}>Change Password</button>
            </div>}

            {passwordOpen && <div>
                <input type="password" name="Password" id="Password" value={password} className="p-1 border-b border-[var(--text)] text-xl text-[var(--text)]" onChange={(e) => setPassword(e.target.value)} />
                <p className=" text-sm">Password</p>
                <input type="password" name="ConfirmPassword" id="ConfirmPassword" value={confirmPassword} className="p-1 border-b border-[var(--text)] text-xl text-[var(--text)]" onChange={(e) => setConfirmPassword(e.target.value)} />
                <p className=" text-sm">Password</p>
                <p className="flex justify-center text-red-500 text-sm ">{alertMessage}</p>
                <div className="mt-2 flex gap-2 justify-center ">
                    <button className="p-1 bg-[var(--chat)] rounded hover:bg-[var(--chat)]/80 hover:cursor-pointer" onClick={savePassword}>Save Password</button>
                    <button className="p-1 bg-[var(--chat)] rounded hover:bg-[var(--chat)]/80 hover:cursor-pointer" onClick={closePassword}>Go back</button>
                </div>
            </div>
            }

            <div>
                <h2 className="text-sm text-[var(--text)] m-0.5">Description</h2>
                <textarea value={user?.description} className="p-3 w-110 h-50 rounded-2xl bg-[var(--chat)] opacity-92 border border-[var(--text)] resize-none overflow-y-auto" onChange={(e) => setUser({ ...user, description: e.target.value })} />
            </div>

            <div>
                <button className=" bg-[var(--hover)] rounded p-1 text-[var(--text)]">Save Changes</button>
            </div>
            {success && <DisappearingDiv key={success.id} text={success.message} />}
        </div>
    )
}