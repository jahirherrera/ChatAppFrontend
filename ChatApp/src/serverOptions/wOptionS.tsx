import type { windowOptionSProps } from "../type";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";



export default function WOptionS({ X, Y, addChat, deteleServer, addUsertoServer, adding, owner,leaveServer, showmode }: windowOptionSProps) {
    const token: string = localStorage.getItem("authToken") || "";
    const decode: any = jwtDecode(token);
    const username: string = decode.sub;
    const [isOwnwe, setIsOwner] = useState(false);

    useEffect(() => {
        if (username === owner) {
            setIsOwner(true);
        }
    }, [])

    function createServer() {
        addChat(true);
    }

    function deleteS() {
        deteleServer();
    }

    function addUser() {
        addUsertoServer(true);
        adding(true);
    }

    function DeleteUser() {
        addUsertoServer(true);
        adding(false);
    }









    return (
        <>
            {
                isOwnwe && <div style={{ top: Y, left: X, }} className={`absolute flex bg-[#343436] border border-[#404246] text-white p-2 rounded-lg shadow-2xl  text-sm max-w-38`}>
                    <ul>
                        <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full " onClick={createServer}>Create Chat</button>
                        <p className="border mt-2 mb-2 border-[#404246]"></p>
                        <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full " onClick={()=>showmode(true)}> View Moderators</button>
                        <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full " onClick={addUser}> Add User</button>
                        <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full " onClick={DeleteUser}>Delete User</button>
                        <p className="border mt-2 mb-2 border-[#404246]"></p>
                        <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full text-red-600" onClick={deleteS}> Delete Server</button>

                    </ul>
                </div>
            }
            {
                !isOwnwe && <div style={{ top: Y, left: X, }} className={`absolute flex bg-[#343436] border border-[#404246] text-white p-2 rounded-lg shadow-2xl  text-sm max-w-38`}>
                    <ul>
                       
                        <p className="border mt-2 mb-2 border-[#404246]"></p>
                        <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full text-red-600" onClick={leaveServer}> Leave server </button>

                    </ul>
                </div>
            }


        </>



    );
}