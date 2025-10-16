import type { Message, messageListProps } from "../type";
import { useState, useEffect } from "react";
import WindowMessages from "./windowMessage";



export default function MessageList({ messages }: messageListProps) {

    const [menu, setMenu] = useState<{ visible: boolean; x: number; y: number }>({
        visible: false,
        x: 0,
        y: 0,
    })

    function prevendefault(e: React.MouseEvent) {
        e.preventDefault();
        setMenu({ visible: true, x: e.pageX, y: e.pageY });
    }

    useEffect(() => {
        const close = () => setMenu({ ...menu, visible: false });
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, [menu]);


    function messagesOrderLogic(i: number, m: Message[]) {
        if (i === 0 || m[i].sender_username !== m[i - 1].sender_username) {
            return (
                <span className='font-bold mb-1 mt-3 pl-2 text-xl' >
                    {m[i].sender_username}
                    <span className='pl-2 text-gray-500 text-sm'>{m[i].date}</span>
                </span>
            );
        }
        return null;
    }

    return (
        <>
            <div className='text-white text-xl overflow-y-scroll flex flex-col-reverse scrollbar-bg max-h-177'>
                <ul className=' p-2 pl-4 flex flex-col m-0'>
                    {
                        messages.map((m, i) => (
                            <li key={i} className=' border-white ' onContextMenu={(e)=>prevendefault(e)}>
                                <div className='flex flex-col'>

                                    {messagesOrderLogic(i, messages)}
                                    <span className="pl-2 hover:bg-[#36393f] rounded">{m.content}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {menu.visible && <WindowMessages X={menu.x} Y={menu.y}/>}
        </>
    )
}