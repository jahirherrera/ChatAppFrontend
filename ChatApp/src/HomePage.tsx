import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect, use } from "react";
import type { Chat, Server, Message } from './type.d';
import { useNavigate } from "react-router-dom";
import { Client } from '@stomp/stompjs';
import ServerBar from './serverOptions/ServerLIst';
//@ts-ignore
import SockJS from 'sockjs-client/dist/sockjs'
//@ts-ignore
import sprite from './assets/sprite.svg';
import WindowOption from './windowOption';
import DisappearingDiv from './disapearDiv';


export default function HomePage() {

    const [addServerState, setAddServerState] = useState<boolean>(false);
    const navigate = useNavigate();
    const token: string = localStorage.getItem("authToken") || "";
    const decode: any = jwtDecode(token);
    const username: string = decode.sub;
    //servers
    const [servers, setServers] = useState<Server[]>([]);
    const [serverClicked, setServerClicked] = useState<Server | undefined>();
    const [newServerName, setNewServerName] = useState("");
    const [is_public, setIs_public] = useState(true);
    //chats
    const [chats, setChats] = useState<Chat[]>([]);
    const [chatSellected, setChatSelected] = useState<Chat[]>([]);
    const [chatClicked, setChatClicked] = useState<Chat>();
    //Messages
    const [messagesFromChat, setMessagesFromChat] = useState<Message[]>([]);
    // const [newMessage, setNewMessage] = useState<Message>();
    const [messageContent, setMessageContent] = useState("");

    //WebSocket
    const [stompClient, setStompClient] = useState<Client | null>(null);

    //Little window of changes
    const [globalText, setGlobalText] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);

    //Menu
    const [menu, setMenu] = useState<{ visible: boolean; x: number; y: number }>({
        visible: false,
        x: 0,
        y: 0,
    })

    useEffect(() => {
        getEverything();
    }, []);


    function getEverything() {
        getServers(username);
        getChats(username);
    }

    function getServers(username: string) {
        fetch(`http://localhost:8080/serverOfUser/${username}`, {

            method: "GET",
            headers: {
                // "Content-Type": "application/json",  only needed for POST/PUT/PATCH requests
                "Authorization": "Bearer " + token,
            },
            // body: JSON.stringify(username)   we cannot send body in GET request
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();

        }).then((data) => {
            setServers(data);
            if (data.length === 0) {
                return;
            }
        }).catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
    }

    function getChats(username: string) {
        fetch(`http://localhost:8080/chats/${username}`, {
            method: "GET",
            headers: {
                "authorization": "Bearer " + token,
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }).then((data) => {
            setChats(data);
            if (data.length === 0) {
                return;
            }
        }).catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
    }

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {

                // Subscribe to all chats of the user once connected
                chats.forEach(chat => {
                    client.subscribe(`/topic/server/${chat.server_id}/chat/${chat.id}`, (message) => {
                        const newMessage = JSON.parse(message.body);
                        setMessagesFromChat(prev => [...prev, newMessage]);
                    });
                });
            },
        });

        client.activate();
        setStompClient(client);




        return () => {
            client.deactivate();
        };


    }, [chats]);


    useEffect(() => {

        if (serverClicked) {
            const selectedChats = chats.filter(chat => chat.server_id === serverClicked.id);
            setChatSelected(selectedChats);
        }
    }, [serverClicked, chats]);

    useEffect(() => {
        getChatMessages();
    }, [chatClicked]);

    const getChatMessages = async () => {
        if (chatClicked) {
            try {
                const response = await fetch(`http://localhost:8080/messages/${chatClicked.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token,
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setMessagesFromChat(data);

            } catch (error) {
                console.error("Error fetching chat messages:", error);
            }
        }
    };

    const createServer = async (servername: string, un: string) => {

        const s: Server = {
            id: 0,
            name: servername,
            ownerUsername: un,
            is_Public: is_public,
        };


        try {
            const response = await fetch("http://localhost:8080/addServer", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(s)
            });
            if (!response.ok) {
                throw new Error("Failed to create server");
            }
            getEverything();
            setNewServerName("");
            setAddServerState(false)
        } catch (error) {
            alert(`Error creating server: ${error}`);
        }



    }


    function logout() {
        localStorage.removeItem("authToken");
        navigate("/");
    }

    const sendMessage = async (messageContent: string) => {
        if (chatClicked === undefined || chatClicked === null) {
            alert("Please select a server first.");
            return;
        }
        if (messageContent.trim() === "") return;
        if (!chatClicked) {
            alert("Please select a chat to send a message.");
            return;
        }

        const date = new Date();
        const formatted = date.toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).replace(",", "");;


        const message: Message = {
            id: 0,
            content: messageContent,
            sender_username: username,
            chat_id: chatClicked.id,
            sender_id: 0,
            date: formatted
        };


        setMessageContent("");

        const response = await fetch(`http://localhost:8080/saveMessage`, {
            method: "POST",
            headers: {

                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
        if (!response.ok) {
            console.error("Failed to send message");
            return;
        }

        const data = await response.json();



        if (stompClient) {
            stompClient.publish({
                destination: `/app/server/${chatClicked.server_id}/chat/${chatClicked.id}`,
                body: JSON.stringify(data),
            });

        }



    }

    const enterSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage(messageContent);
        }
    };

    const isPublicChange = () => {
        setIs_public(!is_public);
    }

    const chatBgColor = (chat: Chat): string => {
        if (chatClicked?.id === chat.id) return "bg-[#5865f2]  border-[#5865f2] ";
        return "";
    }

    useEffect(() => {
        const close = () => setMenu({ ...menu, visible: false });
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, [menu]);

    function prevendefault(e: React.MouseEvent) {
        e.preventDefault();
        setMenu({ visible: true, x: e.pageX, y: e.pageY });
    }

    useEffect(() => {

        if (globalText !== "" ) {
            setShow(true);
        }
    }, [globalText])



    return (
        <>
            <div className='grid grid-rows-[1fr_19fr_1fr]  w-full h-screen font-  m-0 p-0' >
                <header className='grid grid-cols-[2fr_14fr] border-b text-sm border-[#36393f] bg-[#292b2f] p-1'>
                    <div className=' text-white text-2xl flex justify-center items-center p-1 '>
                        <p className='italic'>Byte</p>Talking
                    </div>
                    <div className='flex justify-end items-center-safe  text-white'>
                        <h1 className='mr-10 text-xl'>#{username}</h1>
                        <button className='w-6 h-6 mr-10 flex justify-center items-center rounded hover:bg-[#36393f] hover:cursor-pointer'>
                            <svg width="19" height="19">
                                <use href={`${sprite}#setting`} />
                            </svg>
                        </button>
                        <button className='bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white  font-medium px-3 py-1 rounded-lg transition shadow-md' onClick={() => logout()} >Logout</button>
                    </div>
                </header>
                <section className='grid grid-cols-[1fr_1fr_6fr]'>
                    <div className='grid grid-rows-[1fr_1fr] text-white text-xl  bg-[#292b2f] overflow-hidden p-1'>
                        <section className='p-2 '>
                            <h3 className='flex justify-between ' onContextMenu={(e) => prevendefault(e)} >PUBLIC SERVERS </h3>
                            <ServerBar servers={servers} ispublic={true} globalServer={setServerClicked} getEverything={getEverything} sGlobalText={setGlobalText} />
                        </section>
                        <section className='p-1 '>
                            <h3 className='flex justify-between' onContextMenu={(e) => prevendefault(e)}>PRIVATES SERVES </h3>
                            <ServerBar servers={servers} ispublic={false} globalServer={setServerClicked} getEverything={getEverything} sGlobalText={setGlobalText} />
                        </section>
                    </div>
                    <div className='flex-grow text-white text-2xl overflow-hidden bg-[#36393f] p-2'>
                        <section>
                            <h3 className='flex justify-between'>Chats  </h3>

                            <ul className='list-none p-2'>
                                {chatSellected.map((chat) => (
                                    <li key={chat.id} className={` ${chatBgColor(chat)} text-xl pl-5 m-1 cursor-pointer rounded-2xl transition-colors duration-300`} onClick={() => { setChatClicked(chat) }}> # {chat.name} </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                    <div className='grid grid-rows-[24fr_2fr]   bg-[#292b2f] '>

                        <div className='text-white text-2xl overflow-y-scroll flex flex-col-reverse scrollbar-bg max-h-190'>
                            <ul className='p-2 flex flex-col m-0'>
                                {
                                    messagesFromChat.filter(message => message.chat_id === chatClicked?.id).map((m) => (
                                        <li key={m.id} className='p-1 m-1 border-white '>
                                            <div className='flex flex-col p-2'>
                                                <span className='font-bold mb-2 text-2xl'>{m.sender_username} <span className='text-gray-500 text-lg'>{m.date}</span></span>
                                                <span >{m.content}</span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className='text-white flex justify-between items-start p-2 '>
                            <input id='message' className='p-2  pl-4 rounded-2xl w-full bg-[#36393f]' value={messageContent} placeholder='Enter a message' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageContent(e.target.value)} onKeyDown={enterSendMessage}></input>
                        </div>

                    </div>
                </section>
                <footer className='text-gray-400 text-sm text-center bg-[#292b2f] border-t border-[#36393f] p-1 flex justify-between items-center'>
                    <p>&copy; 2024 ByteTalking. All rights reserved.</p>
                    <div className='flex justify-around w-40 items-center'>
                        <svg width="19" height="19">
                            <use href={`${sprite}#github`} />
                        </svg>
                        <svg width="19" height="19">
                            <use href={`${sprite}#x`} />
                        </svg>
                        <svg width="19" height="19">
                            <use href={`${sprite}#instagram`} />
                        </svg>
                    </div>
                </footer>
                {menu.visible && <WindowOption X={menu.x} Y={menu.y} addServer={setAddServerState} />}
                {
                    addServerState && (
                        <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white '>
                            <div className='bg-gradient-to-tl from-sky-600 to-sky-900 p-4 rounded-lg'>
                                <h2 className='text-xl mb-4'>Add Server</h2>
                                <input type="text" value={newServerName} onChange={(e) => setNewServerName(e.target.value)} placeholder="Server Name" className='border p-2 rounded w-100 mb-4 ' />
                                <div className='mb-4'>
                                    <input className="m-2 " type="checkbox" id="{item}" onClick={isPublicChange} />
                                    <label className="text-lg   cursor-pointer" htmlFor="{item}"> Private </label>
                                </div>
                                <button onClick={() => createServer(newServerName, username)} className='bg-blue-500 text-white p-2 rounded'>Create Server</button>
                                <button onClick={() => setAddServerState(false)} className='ml-2 bg-red-500 text-white p-2 rounded'>Close</button>
                            </div>
                        </div>
                    )
                }
                {
                    show && <DisappearingDiv key={globalText} text={globalText} />
                }

            </div>

        </>
    );
}