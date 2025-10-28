import type { Message, messageListProps, giveStars } from "../type";
import { useState, useEffect } from "react";
import WindowMessages from "./windowMessage";
import WindowProfile from "./windowProfile";
import ShowProfile from "../Setting/showProfile";
//@ts-ignore
import sprite from '../assets/sprite.svg';



export default function MessageList({ messages }: messageListProps) {


    const username: string ="";

    const [showProfile, setShowProfile] = useState(false);

    //send stars object
    const [amount, setAmout] = useState(0);
    const [userClick, setUserClick] = useState<string>("")
    const [showStar, setShowStar] = useState<boolean>(false);

    

    const [menu, setMenu] = useState<{ visible: boolean; x: number; y: number }>({
        visible: false,
        x: 0,
        y: 0,
    })

    const [menuP, setMenuP] = useState<{ visible: boolean; x: number; y: number }>({
        visible: false,
        x: 0,
        y: 0,
    })



    function prevendefault(e: React.MouseEvent) {
        e.preventDefault();
        setMenu({ visible: true, x: e.pageX, y: e.pageY });
    }

    useEffect(() => {
        const close = () => setMenuP({ ...menu, visible: false });
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, [menu]);

    function prevendefaultP(e: React.MouseEvent, username: string) {
        e.preventDefault();
        setMenuP({ visible: true, x: e.pageX, y: e.pageY });
        setUserClick(username);
    }

    useEffect(() => {
        const close = () => setMenu({ ...menu, visible: false });
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, [menuP]);

    function fillColor(n : number) : string{
        if(amount < n) return "none";
        return "#FFD700";

    }

    const sendStars = async ()=>{
        const sendStar : giveStars = {
            amount : amount,
            usernameFrom : username,
            usernameTo : userClick
        }
        try{
            const response = await fetch("http://localhost:8080/giveStars",{
            method : "POST",
            credentials: "include",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(sendStar)
        })
        if(!response.ok) console.log("something were wrong")
        setShowStar(false)
        setAmout(0)
        }catch(e){
            console.log(e)
        }
        
    }


    function messagesOrderLogic(i: number, m: Message[]) {
        if (i === 0 || m[i].sender_username !== m[i - 1].sender_username) {
            return (
                <span className='font-bold mb-1 mt-3 pl-2 text-xl' onContextMenu={(e) => prevendefaultP(e, m[i].sender_username)}>
                    {m[i].sender_username}
                    <span className='pl-2 text-gray-500 text-sm'>{m[i].date}</span>
                </span>
            );
        }
        return null;
    }

    return (
        <>
            <div className='text-white text-xl overflow-y-scroll flex flex-col-reverse scrollbar-bg max-h-194'>
                <ul className=' p-2 pl-4 flex flex-col m-0'>
                    {
                        messages.map((m, i) => (
                            <li key={i} className=' border-white ' >
                                <div className='flex flex-col'>

                                    {messagesOrderLogic(i, messages)}
                                    <span className="pl-2 hover:bg-[#36393f] rounded" onContextMenu={(e) => prevendefault(e)}>{m.content}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {/* {menu.visible && <WindowMessages X={menu.x} Y={menu.y} />} */}
            {menuP.visible && <WindowProfile X={menuP.x} Y={menuP.y} showing={setShowProfile} giveStars={setShowStar} />}
            {showProfile && <ShowProfile usernameUser={userClick} showing={setShowProfile} />}
            {showStar &&

                <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white '>
                    <div className='bg-gradient-to-tl from-sky-600 to-sky-900 p-4 rounded-lg'>
                        <div className='mb-4 flex justify-center items-center'>
                            <svg width="26" height="26" fill={fillColor(1)} className="hover:cursor-pointer hover:animate-spin" onClick={()=>setAmout(1)}>
                                <use href={`${sprite}#star`} />
                            </svg>
                            <svg width="26" height="26" fill={fillColor(2)} className="  hover:cursor-pointer hover:animate-spin" onClick={()=>setAmout(2)}>
                                <use href={`${sprite}#star`} />
                            </svg>
                            <svg width="26" height="26" fill={fillColor(3)} className="  hover:cursor-pointer hover:animate-spin" onClick={()=>setAmout(3)}>
                                <use href={`${sprite}#star`} />
                            </svg>
                            <svg width="26" height="26" fill={fillColor(4)} className=" hover:cursor-pointer hover:animate-spin" onClick={()=>setAmout(4)}>
                                <use href={`${sprite}#star`} />
                            </svg>
                            <svg width="26" height="26" fill={fillColor(5)} className=" hover:cursor-pointer hover:animate-spin" onClick={()=>setAmout(5)}>
                                <use href={`${sprite}#star`} />
                            </svg>
                        </div>
                        <button  className='bg-blue-500 text-white p-2 rounded' onClick={sendStars}>Send</button>
                        <button onClick={() => {setShowStar(false), setAmout(0)}} className='ml-2 bg-red-500 text-white p-2 rounded'>Close</button>
                    </div>
                </div>
            }
        </>
    )
}