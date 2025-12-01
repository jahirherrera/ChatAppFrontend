
import type { ServerBarProps, Server, Chat, deleteAdd, windowPropsS } from '../type';
import { useEffect, useState } from 'react';
import WOptionS from './wOptionS';
import ServerMember from './serverMember';
import ShowModerators from './showMode';



export default function ServerBar({ servers, ispublic, globalServer, globalServerState, getEverything, sGlobalText }: ServerBarProps) {


    const [username, setUsername] = useState("");

    const [menu, setMenu] = useState(false);

    const [theme, setTheme] = useState("");

    const [currentServer, setCurrentServerState] = useState<Server | undefined>(undefined);
    const [serverRightClick, setServerRightClick] = useState<Server | undefined>(undefined);

    const [addChatState, setAddChatState] = useState(false);
    const [newChatName, setNewChatName] = useState("");

    const [addDeleteUsertoServerState, setAddDeleteUsertoServerState] = useState(false);
    const [addingUser, setAddingUser] = useState(false);

    const [showMode, setShowMode] = useState(false);

    const [allProp, setAllProp] = useState<windowPropsS>({
        allProps: {
            X: 0,
            Y: 0,
            serverClicked: serverRightClick,
            getEverything: getEverything,
            addChat: setAddChatState,
            showInfo : setShowMode,
            showAddDelete : setAddDeleteUsertoServerState,
            addding:setAddingUser
        }
    });


    useEffect(() => {
        setUsername(localStorage.getItem("Username") || "");
        setTheme(localStorage.getItem("Theme") || "");
    }, [])


    function setServerSelected(server: Server) {
        setCurrentServerState(server);
        globalServer(server);
    }

    function selected(s: Server): string {
        if (globalServerState?.id === s.id) return " border-l-[7px] border-[var(--hover)]  bg-gradient-to-r from-[var(--hover)] to-transparent ";
        return "";
    }

    useEffect(() => {
        const close = () => setMenu(false);
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, [menu]);

    function prevendefault(e: React.MouseEvent, server: Server) {
        e.preventDefault();
        setMenu(true);
        setServerRightClick(server);
        setAllProp({allProps: { X: e.pageX, Y: e.pageY, serverClicked: server, getEverything: getEverything, addChat: setAddChatState , showInfo:setShowMode , showAddDelete:setAddDeleteUsertoServerState, addding:setAddingUser} })
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
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newchat)
            });
            if (!response.ok) {
                throw new Error("Failed to create chat");
            }
            getEverything();
            setNewChatName("");
            setAddChatState(false);
            sGlobalText("Chat has created succefully")
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    }




    return (
        <>
            <ul className='list-none p-1 text-xl'>
                {servers.filter(s => s.is_Public === ispublic).map((server) => (
                    <li key={server.id} onContextMenu={(e) => prevendefault(e, server)} className={` ${selected(server)}   rounded-2xl cursor-pointer pl-4 m-1 transition-colors duration-500 hover:bg-[var(--chat)]`} onClick={() => setServerSelected(server)}> {server.name} </li>// hover:bg-[#36393f]
                ))}
                {menu && <WOptionS {...allProp}></WOptionS>}
            </ul>
            {
                addChatState && (
                    <div className={`fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-[var(--text)] ${theme}`}>
                        <div className='bg-gradient-to-tl from-[var(--chat)] to-[var(--chat)]/80 p-4 rounded-lg'>
                            <h2 className='text-xl mb-4'>Add Chat</h2>
                            <input type="text" value={newChatName} onChange={(e) => setNewChatName(e.target.value)} placeholder="Chat Name" className='border p-2 rounded w-full mb-4' />
                            <button onClick={() => { if (serverRightClick) createChat(newChatName, serverRightClick.id) }} className='bg-blue-500 text-[var(--text)] p-2 rounded'>Create Chat</button>
                            <button onClick={() => setAddChatState(false)} className='ml-2 bg-red-500 text-white p-2 rounded'>Close</button>
                        </div>
                    </div>

                )
            }
            {
                addDeleteUsertoServerState && <ServerMember adding={addingUser} idServer={serverRightClick ? serverRightClick.id : 0}  showing={setAddDeleteUsertoServerState}></ServerMember>
            }
            {showMode && <ShowModerators showing={setShowMode} server_id={serverRightClick ? serverRightClick.id : 3} />}
        </>
    )
}
