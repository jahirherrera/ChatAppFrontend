import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { userInfo } from "../type";


export default function ProfileEdit() {

    const token: string = localStorage.getItem("authToken") || "";
    const decode: any = jwtDecode(token);
    const username: string = decode.sub;


    const [user, setUser] = useState<userInfo>({
        fullname: "",
        username: "",
        email: "",
        password:"",
        description : ""
    });

    useEffect(() => {
        getinfo();
    }, [])


    const getinfo = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getUserOptions/${username}`, {
                method: "GET",
                headers: { "Authorization": "Bearer " + token }
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
        <div className="w-full h-full flex flex-col justify-around items-center">
            <div>
                <p className="w-50 h-50 bg-blue-500 rounded-full border shadow-sky-50 shadow-lg mb-3"></p>
            </div>

            <div>
                <input type="text" name="fullname" id="fullname" value={user?.fullname} className="p-1 border-b border-white text-xl" onChange={(e) => setUser({ ...user, fullname: e.target.value })} />
                <p className=" text-sm">Fullname</p>
            </div>

            <div>
                <input type="text" name="fullname" id="fullname" value={user?.username} className="p-1 border-b border-white text-xl" onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                <p className=" text-sm">Username</p>
            </div>

            <div>
                <input type="text" name="fullname" id="fullname" value={user?.email} className="p-1 border-b border-white text-xl" onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                <p className=" text-sm">Email</p>
            </div>

            <div>
                <button className="p-1 bg-[#36393f] rounded hover:bg-[#2f3236] hover:cursor-pointer">Change Password</button>
            </div>

            <div>
                <h2 className="text-sm text-white m-0.5">Description</h2>
                <textarea value={user?.description} className="p-3 w-110 h-50 rounded-2xl bg-[#232327] opacity-92 border-2 border-[#3d4046] resize-none overflow-y-auto" onChange={(e) => setUser({ ...user, description: e.target.value })}/>
            </div>


            <div>
                <button className=" bg-blue-500 rounded p-1">Save Changes</button>
            </div>
        </div>
    )
}