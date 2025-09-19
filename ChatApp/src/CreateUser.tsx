import type {User} from "./type.d.tsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "./Selecting.tsx";

export default function CreateUser() {
    const navigate = useNavigate();
    
    const [fullname, setFullname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const isExpired = false;

    const [page, setPage] = useState<number>(0);

    const [proSelected, setProSelected] = useState<string[]>([]);
    const [techSelected, settechSelected] = useState<string[]>([]);

    const languages = {types : ["JavaScript", "Python", "Java", "C#", "C++", "Ruby", "Go", "Swift", "Kotlin", "PHP", "TypeScript", "Rust","C"] , title : "What languages do you use daily? What languages do you like to learn about?"};
    const technoloies = {types : ["SQL", "NoSQL", "Git", "Docker", "Aws", "Azure","Google Cloud","Rest" ,"Linux", "Redis"], title : "What technologies do you use daily? What technologies do you like to learn about?"};



    let user: User = {
        fullname: fullname,
        username: username,
        password: password,
        isExpired: isExpired
    };

    const addUser = async (u: User) => {
        try{
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
            }else if (data === "added"){
                alert("User created successfully!");
            }else {
                alert("Unexpected response from server: " + data);
            }

            navigate("/");
            

        }catch(error) {
            console.error("Error adding user:", error);
        }
    }

    const goBack = () => {
        if(page === 0){
            navigate("/");
        }else{
            setPage(p => p=p-1);
        }
    }

    const goFoward = () => {
        if(page === 3){
            return;
        }else{
            setPage(p => p=p+1);
        }
    }


    return(
        <>
            {/* <div className="flex flex-row justify-center items-center h-screen w-screen  text-white bg-gradient-to-r from-gray-900 via-slate-800 to-gray-800">
                <section className="flex flex-col justify-center  content-center items-center h-160 w-120 bg-gradient-to-tl from-sky-600 to-sky-900 border-r-1 border-white m-2">
                    <div className="flex flex-col items-start p-4">
                        <div className="relative border-2 border-white p-2">
                            <label htmlFor="fullname" className="absolute -top-5 left-3 bg-sky-800 px-1 text-white text-xl ">Full Name</label>
                            <input className="bg-gray-900 border-2 border-white p-4 text-white w-80 text-xl outline-none" type="text" id="fullname" value={fullname} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFullname(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-col items-start p-4">
                        <div className="relative border-2 border-white p-2">
                            <label htmlFor="username" className="absolute -top-5 left-3 bg-sky-800 px-1 text-white text-xl ">Username</label>
                            <input className="bg-gray-900 border-2 border-white p-4 text-white w-80 text-xl outline-none" type="text" id="username" value={username} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                        </div>
                    </div>    
                    <div className="flex flex-col items-start p-4">
                        <div className="relative border-2 border-white p-2">
                            <label htmlFor="password" className="absolute -top-5 left-3 bg-sky-800 px-1 text-white text-xl ">Password:</label>
                            <input className="bg-gray-900 border-2 border-white p-4 text-white w-80 text-xl outline-none" type="password" id="password" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        </div>
                    </div>    
                    <button className="text-xl border border-white rounded-2xl p-2 cursor-pointer" onClick={() =>addUser(user)}>Submit</button>
                    <button className="text-xl border border-white rounded-2xl p-2 cursor-pointer m-2 w-15 bg-red-600" onClick={() =>navigate("/")}>&larr;</button>
                </section>
                <section className="flex flex-col justify-center  content-center items-center h-160 w-120 bg-gradient-to-tl from-sky-600 to-sky-900 border-l-1 border-white border-spacing-0.5 hover:">
                    <h1 className="text-3xl" >CREATE YOUR USER!</h1>
                </section>
            </div> */}
            <div className="flex flex-col justify-center items-center h-screen w-screen  text-white bg-gradient-to-t from-gray-800 via-slate-600 to-gray-800">
                {page===0 && <div><h1 className="text-white text-3xl m-15">Welcome to ByteTalking, a platform for sharing and discussing programming knowledge.</h1></div>}
                {page===1 && <Select list={languages.types} title={languages.title}  setSelected={setProSelected}/>}
                {page===2 && <Select list={technoloies.types}  title={technoloies.title} setSelected={settechSelected}/>}
                {page===3 && <div className="flex flex-col justify-center items-center border-2 border-white p-4 m-4 rounded-lg  "/>}
                <div>
                    <button className="text-xl border border-white rounded-2xl p-2 cursor-pointer m-2 w-12 " onClick={() =>goBack()}>&larr;</button>
                    <button className="text-xl border border-white rounded-2xl p-2 cursor-pointer m-2 w-12 " onClick={() =>goFoward()}>&rarr;</button>
                </div>
                
            </div>
            
            
        </>
    )
}