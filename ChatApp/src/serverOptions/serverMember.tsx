import type { AddUserToServerProps, deleteAdd } from "../type"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"

export default function ServerMember({ adding, idServer, addUsertoServer,sGlobalText }: AddUserToServerProps) {

    const [typingUsername, setTypingUsername] = useState<string>("");
    
    const [or, setOr] = useState<string>("");

    useEffect(() => {
        if (adding) {
            setOr("Add user")
        } else {
            setOr("Delete user")
        }
    }, []);

    const token: string = localStorage.getItem("authToken") || "";
    const decode: any = jwtDecode(token);
    const username: string = decode.sub;

    const addUser = async (UserData: deleteAdd) => {

        try {
            const response = await fetch("http://localhost:8080/addUserToServer", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserData)
            });
            if (!response.ok) {
                throw new Error("Failed to add user to server");
            }

            const worked = await response.text();
            sGlobalText(worked)

        } catch (error) {
            alert(`Error creating server: ${error}`);
        }


    }

    const deleteUser = async (UserData: deleteAdd) => {

        try {

            const response = await fetch("http://localhost:8080/deleteUserFromServer", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserData)

            });
            if (!response.ok) {
                throw new Error("Failed to delete user to server");
            }

            const worked = await response.text();
            sGlobalText(worked)



        } catch (e) {
            console.log(e);
        }
    }

    function deletingAdding() {
        const UserData: deleteAdd = {
            id_server: idServer,
            owner: username,
            user: typingUsername
        }
        if (adding) {
            addUser(UserData);
        } else {
            deleteUser(UserData);
        }
        addUsertoServer(false);
    }



    return (
        <>
            <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white'>
                <div className='bg-gradient-to-tl from-sky-600 to-sky-900 p-4 rounded-lg shadow-2xl'>
                    <h2 className='text-xl mb-4'>{or} to server</h2>
                    <input type="text" value={typingUsername} onChange={(e) => setTypingUsername(e.target.value)} placeholder="Enter the username you want to add" className='border p-2 rounded w-100 mb-4 ' />

                    <div>
                        <button onClick={deletingAdding} className='ml-2 bg-blue-500 text-white p-2 rounded'>{or}</button>
                        <button onClick={() => addUsertoServer(false)} className='ml-2 bg-red-500 text-white p-2 rounded '>Close</button>
                    </div>
                </div>
            </div>
            
        </>
    )
}