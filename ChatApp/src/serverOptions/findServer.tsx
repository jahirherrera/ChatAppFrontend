import { useEffect, useState } from "react"
import type { Server, findServerProps } from "../type";


export default function FindServer({ showing }: findServerProps) {


    const [theme, setTheme] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [serverList, setServerList] = useState<Server[]>([]);
    const [serverType, setServerType] = useState<string>("")


    useEffect(() => {
        setTheme(localStorage.getItem("Theme") || "");
        setUsername(localStorage.getItem("Username") || "");
        getServerNoUsername();
    }, []);

    const getServerNoUsername = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getAllServersNoUsername`, {
                method: "GET",
                credentials: "include",

            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setServerList(data);

        } catch (error) {
            console.error("Error fetching chat messages:", error);
        }
    };

    const addingItself = async (server_id: number) => {

        const serverMemberDTO = {
            id_server: server_id,
        }

        try {
            const response = await fetch(`http://localhost:8080/addingItself`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(serverMemberDTO)
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.text();
            getServerNoUsername();


        } catch (error) {
            console.error("Error fetching chat messages:", error);
        }
    };
    
    useEffect(()=>{
        if(serverType.length===0){
            getServerNoUsername();
            return;
        };
        if(serverType.length%2===0){
            lookingFor();
        }
    },[serverType])

    const lookingFor = async () => {
        const serverDTO = {
            name: serverType,
        }

        try {
            const response = await fetch(`http://localhost:8080/allServerIncludes/${serverDTO.name}`, {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setServerList(data);

        } catch (error) {
            console.error("Error fetching chat messages:", error);
        }
    }



    return (
        <>
            <div className={`fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-[var(--text)] ${theme}`}>
                <div className='bg-gradient-to-tl from-[var(--chat)] to-[var(--chat)]/60 p-4 rounded-lg shadow-2xl'>
                    <h2 className='text-xl mb-4 flex justify-between items-center'>Enter the Server you want to look for <button className="bg-red-500 h-5 w-5 flex justify-center items-center rounded text-white" onClick={() => showing(false)}>X</button></h2>
                    <input type="text" value={serverType} onChange={(e) => setServerType(e.target.value)} placeholder="Input the server name" className='border border-[var(--text)] p-2 rounded w-100 mb-4 ' />
                    <div className="flex justify-between pb-2 border-b border-[var(--text)]">
                        <p>Server Name</p><p>Owner</p>
                    </div>

                    <div className="min-h-100 max-h-150  border-b border-[var(--text)] overflow-y-scroll scrollbar-bg">
                        <ul>
                            {
                                serverList.map(s => (
                                    <li key={s.id} className="flex justify-between pb-2">
                                        <p>{s.name}</p><p className="flex justify-center items-center content-center">{s.ownerUsername}<button className="flex justify-center items-center ml-2 h-5 w-5 bg-[var(--hover)] rounded hover:cursor-pointer" onClick={() => addingItself(s.id)}>+</button></p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}