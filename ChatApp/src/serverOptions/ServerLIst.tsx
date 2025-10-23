
import type { ServerBarProps, Server, Chat, deleteAdd } from '../type';
import { useEffect, useState } from 'react';
import WOptionS from './wOptionS';
import ServerMember from './serverMember';
import { jwtDecode } from 'jwt-decode';
import ShowModerators from './showMode';



export default function ServerBar({ servers, ispublic, globalServer, getEverything, sGlobalText }: ServerBarProps) {

    const token: string = localStorage.getItem("authToken") || "";
    const decode: any = jwtDecode(token);
    const username: string = decode.sub;

    const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });

    const [currentServer, setCurrentServerState] = useState<Server | undefined>(undefined);
    const [serverRightClick, setServerRightClick] = useState<Server | undefined>(undefined);

    const [addChatState, setAddChatState] = useState(false);
    const [newChatName, setNewChatName] = useState("");

    const [addDeleteUsertoServerState, setAddDeleteUsertoServerState] = useState(false);
    const [addingUser, setAddingUser] = useState(false);

    const [showMode, setShowMode] = useState(false);
    


    

    function setServerSelected(server: Server) {
        setCurrentServerState(server);
        globalServer(server);
    }

    function selected(s: Server): string {
        if (currentServer?.id === s.id) return " border-l-[7px] border-[#5865f2]  bg-gradient-to-r from-[#5865f2] to-transparent ";
        return "";
    }

    useEffect(() => {
        const close = () => setMenu({ ...menu, visible: false });
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, [menu]);

    function prevendefault(e: React.MouseEvent, server: Server) {
        e.preventDefault();
        setMenu({ visible: true, x: e.pageX, y: e.pageY });
        setServerRightClick(server);
    }

    const createChat = async (chatname: string, serverId: number) => {


        if (chatname.trim() === "") {
            alert("Chat name cannot be empty.");
            return;
        }
        const newchat: Chat = {
            id: 0,
            name: chatname,
            server_id: serverId
        }

        try {

            const response = await fetch("http://localhost:8080/addChat", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newchat)
            });
            if (!response.ok) {
                throw new Error("Failed to create chat");
            }
            getEverything();
            setNewChatName("");
            setAddChatState(false)
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    }


    const deleteServer = async (serverId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/deleteServer/${serverId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete server");
            }
            sGlobalText("Server deleted successfully");
            getEverything();
        } catch (error) {
            console.error("Error deleting server:", error);
        }
    }

    const leaveServer = async () => {

        if (!serverRightClick) return;

        const UserData: deleteAdd = {
            id_server: serverRightClick?.id,
            owner: "",
            user: username,
        }

        try {
            const response = await fetch("http://localhost:8080/leavingServer", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserData)

            })
            if (!response.ok) {
                throw new Error("Failed to delete user to server");
            }

            getEverything();

        } catch (e) {
            console.log(e);
        }
    }




    return (
        <>
            <ul className='list-none p-1 text-xl'>
                {servers.filter(s => s.is_Public === ispublic).map((server) => (
                    <li key={server.id} onContextMenu={(e) => prevendefault(e, server)} className={` ${selected(server)}   rounded-2xl cursor-pointer pl-4 m-1 transition-colors duration-500 hover:bg-[#36393f]`} onClick={() => setServerSelected(server)}> {server.name} </li>
                ))}
                {menu.visible && <WOptionS X={menu.x} Y={menu.y} leaveServer={leaveServer} addChat={setAddChatState} deteleServer={() => { if (serverRightClick) deleteServer(serverRightClick?.id) } } addUsertoServer={setAddDeleteUsertoServerState} adding={setAddingUser} owner={serverRightClick ? serverRightClick?.ownerUsername : ""}  showmode={setShowMode}></WOptionS>}
            </ul>
            {
                addChatState && (
                    <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white'>
                        <div className='bg-gradient-to-tl from-sky-600 to-sky-900 p-4 rounded-lg'>
                            <h2 className='text-xl mb-4'>Add Chat</h2>
                            <input type="text" value={newChatName} onChange={(e) => setNewChatName(e.target.value)} placeholder="Chat Name" className='border p-2 rounded w-full mb-4' />
                            <button onClick={() => { if (serverRightClick) createChat(newChatName, serverRightClick.id) }} className='bg-blue-500 text-white p-2 rounded'>Create Chat</button>
                            <button onClick={() => setAddChatState(false)} className='ml-2 bg-red-500 text-white p-2 rounded'>Close</button>
                        </div>
                    </div>

                )
            }
            {
                addDeleteUsertoServerState && <ServerMember adding={addingUser} idServer={serverRightClick ? serverRightClick.id : 0} addUsertoServer={setAddDeleteUsertoServerState} sGlobalText={sGlobalText}></ServerMember>
            }
            {showMode && <ShowModerators showing={setShowMode} server_id={serverRightClick ? serverRightClick.id : 0}/>}
        </>
    )
}
