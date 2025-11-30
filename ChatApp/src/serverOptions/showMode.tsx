import type { serverInfo, showMode, User } from "../type";
import { useState, useEffect } from "react";

export default function ShowModerators({ server_id, showing }: showMode) {

    const [server, setServer] = useState<serverInfo>();

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/serverInfo/${server_id}`, {
                method: "GET",
                credentials:"include",
            });
            if (!response.ok) {
                console.log("something were wrong")
            }
            const data = await response.json();
            setServer(data);
        } catch (e) {
            throw (e);
        }
    }


    return (
        <>
            <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white '>
                <div className='bg-gradient-to-tl from-sky-600 to-sky-900 p-6 rounded-lg w-120 h-70 grid grid-rows-[1fr_10fr]'>
                    <h2 className=' border-b text-xl mb-4 flex justify-between'>Infomation of the server <button onClick={() => showing(false)} className="bg-red-500 rounded w-5 h-5 flex justify-center items-center hover:cursor-pointer">&#x2613;</button></h2>
                    <div className="flex flex-col justify-around">
                        <h2>Name: {server?.name}</h2>
                        <h2>Owner: {server?.ownerUsername}</h2>
                        <h2>{server?.is_Public ? "Public Server" : "Private Server"}</h2>
                        <h2>Number of moderators: {server?.numberModerators}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}