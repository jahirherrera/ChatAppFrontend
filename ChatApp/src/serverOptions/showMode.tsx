import type{showMode, User} from  "../type";
import { useState,useEffect } from "react";

export default function ShowModerators({server_id,showing}:showMode) {

    const token: string = localStorage.getItem("authToken") || "";
    const [users, setUsers] = useState<User[]>([]);

    useEffect(()=>{
        getUsers();
    },[])

    const getUsers=async()=>{
        try{
            const response = await fetch(`http://localhost:8080/getModerators/${server_id}`,{
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                },
            });
            if(!response.ok){
                console.log("something were wrong")
            }
            const data = await response.json();
            setUsers(data);
        }catch(e){
            throw(e);
        }
    }


    return (
        <>
            <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white '>
                <div className='bg-gradient-to-tl from-sky-600 to-sky-900 p-6 rounded-lg w-200 h-150 grid grid-rows-[1fr_10fr]'>
                    <h2 className=' border-b text-xl mb-4 flex justify-between'>Moderators of the server <button onClick={()=>showing(false)} className="bg-red-500 rounded w-5 h-5 flex justify-center items-center hover:cursor-pointer">&#x2613;</button></h2>
                    <div className="flex flex-col overflow-y-auto pt-2">
                        <div>

                        </div>
                        {
                           users.map((user,index) => (
                                <li className="m-3 pl-5 list-none" key={index}>{user.username}</li>
                           ))
                        }
                    </div>
                    
                </div>
            </div>
        </>
    )
}