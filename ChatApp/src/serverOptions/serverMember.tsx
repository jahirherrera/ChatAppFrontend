import type { AddUserToServerProps, deleteAdd } from "../type"
import { useEffect, useState } from "react"

export default function ServerMember({ adding, idServer, showing }: AddUserToServerProps) {

    const [theme,setTheme] = useState<string>("")

    const [typingUsername, setTypingUsername] = useState<string>("");

    const [username, setUsername] = useState<string>("");

    const [message, setMessage] = useState<string>("");

    const [or, setOr] = useState<string>("");

    useEffect(() => {
        setTheme(localStorage.getItem("Theme") || "");
        setUsername(localStorage.getItem("Username") || "");

        if (adding) {
            setOr("Add user to")
        } else {
            setOr("Delete user from")
        }
    }, []);


    const addUser = async (UserData: deleteAdd) => {

        try {
            const response = await fetch("http://localhost:8080/addUserToServer", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserData)
            });
            if (!response.ok) {
                throw new Error("Failed to add user to server");
            }

            const worked = await response.text();

            if (worked !== "User added") {
                setMessage(worked);
                return;
            }
            setMessage("");
            showing(false);


        } catch (error) {
            alert(`Error creating server: ${error}`);
        }


    }

    const deleteUser = async (UserData: deleteAdd) => {

        try {

            const response = await fetch("http://localhost:8080/deleteUserFromServer", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserData)

            });
            if (!response.ok) {
                throw new Error("Failed to delete user to server");
            }

            const worked = await response.text();

            if(worked !== "User delete from the server"){
                setMessage(worked);
                return;
            }
            showing(false);
            setMessage("");


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
    }



    return (
        <>
            <div className={`fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-[var(--text)] ${theme}`}>
                <div className='bg-gradient-to-tl from-[var(--chat)] to-[var(--chat)]/60 p-4 rounded-lg shadow-2xl'>
                    <h2 className='text-xl mb-4'>{or} server</h2>
                    <input type="text" value={typingUsername} onChange={(e) => setTypingUsername(e.target.value)} placeholder="Enter the username you want to add" className='border border-[var(--text)] p-2 rounded w-100 mb-4 ' />

                    <div className="text-lg mb-2">
                        {message}
                    </div>
                    <div>
                        <button onClick={deletingAdding} className='ml-2 bg-[var(--hover)] text-white p-2 rounded'>{or}</button>
                        <button onClick={() => showing(false)} className='ml-2 bg-red-500 text-white p-2 rounded '>Close</button>
                    </div>
                </div>
            </div>

        </>
    )
}