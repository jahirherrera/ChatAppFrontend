import type {windowPropsS, deleteAdd } from "../type";
import { useEffect, useState } from "react";




export default function WOptionS({ allProps }: windowPropsS) {

    const [theme, setTheme] = useState<string>("");
    const [username, setUsername] = useState<string>("")
    const [isOwnwe, setIsOwner] = useState<boolean>(false);
    const [addDelete, setAddDelete] = useState<boolean>(false);

    useEffect(() => {
        setUsername(localStorage.getItem("Username") || "");
        setTheme(localStorage.getItem("Theme") || "");
    }, [])



    const leaveServer = async () => {


        const UserData: deleteAdd = {
            id_server: allProps.serverClicked?.id || 0,
            owner: allProps.serverClicked?.ownerUsername || "",
            user: username,
        }

        try {
            const response = await fetch("http://localhost:8080/leavingServer", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserData)

            })
            if (!response.ok) {
                throw new Error("Failed to delete user to server");
            }

            allProps.getEverything();

        } catch (e) {
            console.log(e);
        }


    }

    useEffect(() => {
        if (username === allProps.serverClicked?.ownerUsername) {
            setIsOwner(true);
        }
    }, [username])


    const deleteServer = async (serverId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/deleteServer/${serverId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Failed to delete server");
            }
            allProps.getEverything();
        } catch (error) {
            console.error("Error deleting server:", error);
        }
    }

    const showAddDelete =(state : boolean)=>{
        allProps.addding(state);
        allProps.showAddDelete(true);
    }







    return (
        <>
            {
                isOwnwe && <div style={{ top: allProps.Y, left: allProps.X, }} className={`absolute flex bg-[var(--chat)] border border-[var(--text)] text-[var(--text)] p-2 rounded-lg shadow-2xl  text-sm max-w-38 ${theme}`}>
                    <ul>
                        <button className="hover:bg-[var(--hover)]/20 p-1 cursor-pointer rounded-lg w-full " onClick={() => allProps.addChat(true)}>Create Chat</button>
                        <p className="border mt-2 mb-2 border-[var(--text)]"></p>
                        <button className="hover:bg-[var(--hover)]/20 p-1 cursor-pointer rounded-lg w-full " onClick={()=>allProps.showInfo(true)}> Server Info</button>
                        <button className="hover:bg-[var(--hover)]/20 p-1 cursor-pointer rounded-lg w-full " onClick={()=>showAddDelete(true)}> Add User</button>
                        <button className="hover:bg-[var(--hover)]/20 p-1 cursor-pointer rounded-lg w-full " onClick={() => showAddDelete(false)}>Delete User</button>
                        <p className="border mt-2 mb-2 border-[var(--text)]"></p>
                        <button className="hover:bg-[var(--chat)]/80 p-1 cursor-pointer rounded-lg w-full text-red-600" onClick={() => deleteServer(allProps.serverClicked?.id || 0)}> Delete Server</button>

                    </ul>
                </div>
            }
            {
                !isOwnwe && <div style={{ top: allProps.Y, left: allProps.X, }} className={`absolute flex bg-[var(--chat)] border border-[var(--text)] text-[var(--text)] p-2 rounded-lg shadow-2xl  text-sm max-w-38 ${theme}`}>
                    <ul>
                        <button className="hover:bg-[var(--hover)]/20 p-1 cursor-pointer rounded-lg w-full " onClick={()=>allProps.showInfo(true)}>Server Info</button>
                        <p className="border mt-2 mb-2 border-[var(--text)]"></p>
                        <button className="p-1 cursor-pointer rounded-lg w-full text-red-600" onClick={leaveServer}> Leave server </button>

                    </ul>
                </div>
            }


        </>



    );
}