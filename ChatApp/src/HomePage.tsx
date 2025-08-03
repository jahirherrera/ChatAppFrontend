import {jwtDecode} from 'jwt-decode';
import React, { useState, useEffect } from "react";
import type {Chat, Server, Message} from './type.d';
import { useNavigate } from "react-router-dom";
import { Client } from '@stomp/stompjs';
//@ts-ignore
import SockJS from 'sockjs-client/dist/sockjs'


export default function HomePage() {

    const [addServerState, setAddServerState] = useState<boolean>(false);
    const [addChatState, setAddChatState] = useState<boolean>(false);
    const navigate = useNavigate();
    const token : string = localStorage.getItem("authToken") || "";
    const decode : any = jwtDecode(token);  
    const username : string = decode.sub;
    //servers
    const [servers, setServers] =useState<Server[]>([]);
    const [serverSellected, setServerSelected] = useState<Server>();
    const [newServerName, setNewServerName] = useState("");
    //chats
    const [chats, setChats] = useState<Chat[]>([]);
    const [newChatName, setNewChatName] = useState("");
    const [chatSellected, setChatSelected] = useState<Chat[]>([]);
    const [chatClicked, setChatClicked] = useState<Chat>();
    //Messages
    const [messagesFromChat, setMessagesFromChat] = useState<Message[]>([]);
    // const [newMessage, setNewMessage] = useState<Message>();
    const [messageContent, setMessageContent] = useState("");

    //WebSocket
    const [stompClient, setStompClient] = useState<Client | null>(null);
    

   useEffect(() => {
        getEverything();
        
        
    },[]);


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
                console.log("WELCOME");
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
            console.log(response);
        }).then((data) => {
            setChats(data);
            if (data.length === 0) {
                console.log("WELCOME");
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
            console.log("✅ Connected to WebSocket");

            // Subscribe to all chats of the user once connected
            chats.forEach(chat => {
                client.subscribe(`/topic/server/${chat.server_id}/chat/${chat.id}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessagesFromChat(prev =>[...prev,newMessage]);
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
    
        if(serverSellected) {
            const selectedChats = chats.filter(chat => chat.server_id === serverSellected.id);
            setChatSelected(selectedChats);
        }
    }, [serverSellected, chats]);

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

    const createServer = async (servername : string, un: string) => {
        
        const s: Server = {
            id: 0,
            name: servername,
            ownerUsername: un
        };
        

        try{
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
            alert("Server created successfully!");
            getEverything();
            setNewServerName("");
            setAddServerState(false)
        }catch(error){
            console.error("Error creating server:", error);
        }

    }   

    
    const createChat = async (chatname: string, serverId: number) => {
        
        
        if(chatname.trim() === "") {
            alert("Chat name cannot be empty.");
            return;
        }
        const newchat : Chat ={
            id : 0,
            name: chatname,
            server_id: serverId
        }

        try
        {
        
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
            console.log("Chat created successfully");
            getEverything();
            setNewChatName("");
            setAddChatState(false)
        }catch(error) {
            console.error("Error creating chat:", error);
        }
    }

    function logout() {
        localStorage.removeItem("authToken");
        navigate("/");
    }

    const sendMessage = async (messageContent: string) => {
        if(chatClicked === undefined || chatClicked === null) {
            alert("Please select a server first.");
            return;
        }
        if(messageContent.trim() === "") return;
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
            sender_id:0,
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

  return (
    <>
        <div className='grid grid-rows-[1fr_13fr]  w-auto h-screen   overflow-hidden m-0 p-0' >
            <section className='grid grid-cols-[2fr_14fr] border-b-2 border-white bg-gray-900'>
                <div className=' text-white text-4xl flex justify-center items-center  '>
                    <p className='italic'>Byte</p>Talking
                </div>
                <div className='flex justify-end items-center-safe text-2xl text-white'>
                    <h1 className='pr-10'>#{username}</h1>
                    <button className=' flex justify-center content-center items-center m-2 p-1 pr-4 pl-4 border rounded-2xl bg-gray-600 hover:bg-gray-700 cursor-pointer' onClick={()=>logout()} >Log out</button>
                </div>
            </section>
            <section className='grid grid-cols-[1fr_1fr_6fr]'>
                <div className='flex-grow text-white text-2xl border-r-2 border-white bg-gray-900 overflow-hidden p-1'>
                    <section className='p-2'>
                        <h3 className='flex justify-between'>Servers <button className='hover:text-emerald-600 cursor-pointer ' onClick={()=> setAddServerState(true)}>+</button></h3>
                        
                        <ul className='list-none p-2'>
                            {servers.map((server) => (
                                <li key={server.id} className=' hover:text-emerald-600 cursor-pointer' onClick={()=>setServerSelected(server)}> {server.name} </li>
                            ))}
                        </ul>
                    </section>    
                </div>
                <div className='flex-grow text-white text-2xl border-r-2 border-white overflow-hidden bg-gray-900 p-2'>
                    <section>
                        <h3 className='flex justify-between'>Chats  <button className='hover:text-emerald-600 cursor-pointer' onClick={()=>{if(serverSellected) setAddChatState(true)}}>+</button></h3>
                        
                        <ul className='list-none p-2'>
                            {chatSellected.map((chat) => (
                                <li key={chat.id} className='hover:text-emerald-600 cursor-pointer' onClick={()=>{setChatClicked(chat)}}> {chat.name} </li>
                            ))}
                        </ul>
                    </section>
                </div>
                <div className='grid grid-rows-[13fr_2fr] h-screen bg-gradient-to-r  from-slate-700 to-gray-600'>

                    <div className='text-white text-2xl overflow-y-scroll flex flex-col-reverse scrollbar-bg'>
                        <ul className='p-2 flex flex-col m-0'>   
                            {
                                messagesFromChat.filter(message=> message.chat_id === chatClicked?.id).map((m) => (                                              
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

                    <div className='text-white  border-t-2 border-white flex justify-between items-start p-2'>
                        <input id='message' className='p-2 border-2 border-white rounded-2xl w-full bg-transparent' value={messageContent}  placeholder='Enter a message' onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setMessageContent(e.target.value)} onKeyDown={enterSendMessage}></input>
                        <button className=' p-1 border-2 text-2xl border-white rounded-3xl w-20 bg-gray-900 hover:bg-gray-700 hover:cursor-pointer ' onClick={()=>sendMessage(messageContent)} >➜</button>
                    </div>

                    
                </div>
            </section>
            {
                addServerState && (
                    <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white'>
                        <div className='bg-gradient-to-tl from-sky-600 to-sky-900 p-4 rounded-lg'>
                            <h2 className='text-xl mb-4'>Add Server</h2>
                            <input type="text" value={newServerName} onChange={(e) => setNewServerName(e.target.value)} placeholder="Server Name" className='border p-2 rounded w-full mb-4' />
                            <button onClick={() => createServer(newServerName, username)} className='bg-blue-500 text-white p-2 rounded'>Create Server</button>
                            <button onClick={() => setAddServerState(false)} className='ml-2 bg-red-500 text-white p-2 rounded'>Close</button>
                        </div>
                    </div>
                )
            }
            {
                addChatState && (
                    <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white'>
                        <div className='bg-gradient-to-tl from-sky-600 to-sky-900 p-4 rounded-lg'>
                            <h2 className='text-xl mb-4'>Add Chat</h2>
                            <input type="text" value={newChatName} onChange={(e) => setNewChatName(e.target.value)} placeholder="Chat Name" className='border p-2 rounded w-full mb-4' />
                            <button onClick={() => {if(serverSellected)createChat(newChatName, serverSellected.id)}} className='bg-blue-500 text-white p-2 rounded'>Create Chat</button>
                            <button onClick={() => setAddChatState(false)} className='ml-2 bg-red-500 text-white p-2 rounded'>Close</button>
                        </div>
                    </div>

                )
            }
        </div>
        
    </>
  );
}