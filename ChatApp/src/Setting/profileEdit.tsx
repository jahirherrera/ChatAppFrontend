import { useEffect, useState } from "react";
import type { userInfo } from "../type";


export default function ProfileEdit() {

    const [theme,setTheme] = useState<string>("")

    const [user, setUser] = useState<userInfo>({
        fullname: "",
        username: "",
        email: "",
        password:"",
        description : ""
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
                <input type="text" name="fullname" id="fullname" value={user?.username} className="p-1 border-b border-[var(--text)] text-xl text-[var(--text)]" onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                <p className=" text-sm">Username</p>
            </div>

            <div>
                <input type="text" name="fullname" id="fullname" value={user?.email} className="p-1 border-b border-[var(--text)] text-xl text-[var(--text)]" onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                <p className=" text-sm">Email</p>
            </div>

            <div>
                <button className="p-1 bg-[var(--chat)] rounded hover:bg-[var(--chat)]/80 hover:cursor-pointer">Change Password</button>
            </div>

            <div>
                <h2 className="text-sm text-[var(--text)] m-0.5">Description</h2>
                <textarea value={user?.description} className="p-3 w-110 h-50 rounded-2xl bg-[var(--chat)] opacity-92 border border-[var(--text)] resize-none overflow-y-auto" onChange={(e) => setUser({ ...user, description: e.target.value })}/>
            </div>


            <div>
                <button className=" bg-[var(--hover)] rounded p-1 text-[var(--text)]">Save Changes</button>
            </div>
        </div>
    )
}