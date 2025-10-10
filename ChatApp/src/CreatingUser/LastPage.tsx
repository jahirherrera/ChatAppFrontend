import type {User,LastPageProps} from "../type.d.ts";
import React, {useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LastPage({technologies}:LastPageProps) {

    const navigate = useNavigate();

        
    const [fullname, setFullname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const isExpired = false;

    let user: User = {
        fullname: fullname,
        username: username,
        password: password,
        isExpired: isExpired,
        technologies: technologies
    };


    const addUser = async (u: User) => {
        
        try {
            const response = await fetch("http://localhost:8080/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(u)
            });
            if (!response.ok) {
                throw new Error("Failed to create user");
            }
            const data = await response.text();
            if (data === "taken") {
                alert("Username already taken. Please choose a different username.");
                return;
            } else if (data === "added") {
                alert("User created successfully!");
            } else {
                alert("Unexpected response from server: " + data);
            }

            navigate("/");


        } catch (error) {
            console.error("Error adding user:", error);
        }
    }

    return (
        <div className="flex flex-row justify-center items-center  text-white">
            <section className="flex flex-col justify-center  content-center items-center h-160 w-120 bg-gradient-to-tl from-sky-600 to-sky-900 border-r-1 border-white m-2">
                <div className="flex flex-col items-start p-4">
                    <div className="relative border-2 border-white p-2">
                        <label htmlFor="fullname" className="absolute -top-5 left-3 bg-sky-800 px-1 text-white text-xl ">Full Name</label>
                        <input className="bg-gray-900 border-2 border-white p-4 text-white w-80 text-xl outline-none" type="text" id="fullname" value={fullname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullname(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-col items-start p-4">
                    <div className="relative border-2 border-white p-2">
                        <label htmlFor="username" className="absolute -top-5 left-3 bg-sky-800 px-1 text-white text-xl ">Username</label>
                        <input className="bg-gray-900 border-2 border-white p-4 text-white w-80 text-xl outline-none" type="text" id="username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-col items-start p-4">
                    <div className="relative border-2 border-white p-2">
                        <label htmlFor="password" className="absolute -top-5 left-3 bg-sky-800 px-1 text-white text-xl ">Password:</label>
                        <input className="bg-gray-900 border-2 border-white p-4 text-white w-80 text-xl outline-none" type="password" id="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    </div>
                </div>
                <button className="text-xl border border-white rounded-2xl p-2 cursor-pointer" onClick={() => addUser(user)}>Submit</button>
            </section>
            <section className="flex flex-col justify-center  content-center items-center h-160 w-120 bg-gradient-to-tl from-sky-600 to-sky-900 border-l-1 border-white border-spacing-0.5 hover:">
                <h1 className="text-3xl" >CREATE YOUR USER!</h1>
            </section>
        </div>
    )
}