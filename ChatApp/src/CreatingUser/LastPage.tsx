import type { User, LastPageProps } from "../type.d.ts";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LastPage({ technologies, description }: LastPageProps) {

    const navigate = useNavigate();

    
    const [fullname, setFullname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [Cpassword, setCPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [wrong, setWrong] = useState<String>("");

    let user: User = {
        fullname: fullname,
        username: username,
        password: password,
        isExpired: false,
        email : email,
        description : description,
        technologies: technologies
    };


    const addUser = async (u: User) => {

        if(fullname==="" || username==="" || email==="" || Cpassword==="" || password==="" ){
            setWrong("Fields cannot be empty");
            return;
        }

        if(password!==Cpassword){
            setWrong("Passwords are not the same");
            return;
        }

        if(!email.includes("@") || !email.includes(".")){
            setWrong("Need to enter a valid email");
            return;
        }

        

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
            setWrong(data);

            if(data==="added"){
                navigate("/");
            }
            


        } catch (error) {
            console.error("Error adding user:", error);
        }
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen  text-white">
            <section className='flex flex-col justify-around items-center pt-4 border w-140 h-160 border-black rounded-[60px] shadow-xl/60 m-4  backdrop-blur-[10px]'>

                <div className="flex flex-col justify-center items-center ">
                    <h2 className="text-3xl font-bold text-white flex"><p className="italic">Byte</p>Talk</h2>
                    <p className="text-gray-300">Connect. Code. Colaborate</p>
                </div>


                <div className="flex flex-col justify-around h-66">
                    <div className="flex flex-row justify-between items-center w-100">
                        <p className="text-white text-lg">Full Name</p>
                        <input type="text" id="fullname" value={fullname} onChange={(e)=>setFullname(e.target.value)} placeholder="Jon Wick" className="text-white p-1 rounded border border-[#54585f] hover:border-[#00FFFF] focus:border focus:border-[#00FFFF] outline-none  transition-all duration-300" />
                    </div>

                    <div className="flex flex-row justify-between items-center w-100">
                        <p className="text-white text-lg">Username</p>
                        <input type="text" id="Username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} className="text-white p-1 rounded border border-[#54585f] hover:border-[#00FFFF] focus:border focus:border-[#00FFFF] outline-none  transition-all duration-300" />
                    </div>

                    <div className="flex flex-row justify-between items-center w-100">
                        <p className="text-white text-lg">Password</p>
                        <input type="Password" id="password" placeholder="°°°°°°°°°°" value={password} onChange={(e)=>setPassword(e.target.value)} className="text-white p-1 rounded border border-[#54585f] hover:border-[#00FFFF] focus:border focus:border-[#00FFFF] outline-none  transition-all duration-300" />
                    </div>

                    <div className="flex flex-row justify-between items-center w-100">
                        <p className="text-white text-lg">Confirm Password</p>
                        <input type="password" id="comfrimpassword" placeholder="°°°°°°°°°°" value={Cpassword} onChange={(e)=>setCPassword(e.target.value)} className="text-white p-1 rounded border border-[#54585f] hover:border-[#00FFFF] focus:border focus:border-[#00FFFF] outline-none  transition-all duration-300" />
                    </div>

                    <div className="flex flex-row justify-between items-center w-100">
                        <p className="text-white text-lg">Email</p>
                        <input type="email" id="email" placeholder="your.email@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} className="text-white p-1 rounded border border-[#54585f] hover:border-[#00FFFF] focus:border focus:border-[#00FFFF] outline-none  transition-all duration-300" />
                    </div>
                </div>

                

                <div className="flex flex-col justify-center items-center m-2">
                    <p className="min-h-7 text-sm text-red-500 mb-2 transition-all duration-500">{wrong}</p>
                    <button className='p-2  rounded-lg text-white w-40 cursor-pointer shadow-xl bg-blue-500 mb-4' onClick={() => addUser(user)}>
                        Create
                    </button>
                    <h2 className="flex text-sm">Already have an account? . <p className="underline pl-1  text-blue-600" onClick={()=>navigate("/")}>Log In</p></h2>
                </div>


            </section>
        </div>
    )
}