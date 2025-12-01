import { useEffect, useState } from "react";
import type { windowOptionProps } from "./type";



export default function WindowOption({ X, Y, addServer,lookServer }: windowOptionProps) {


    const [theme,setTheme] = useState<string>("");

    useEffect(()=>{
        setTheme(localStorage.getItem("Theme") || "");
    })


    return (
        <>
            <div style={{ top: Y, left: X, }} className={`absolute flex bg-[var(--chat)] border border-[var(--text)] text-[var(--text)] p-2 rounded-lg shadow-2xl  ${theme}`}>
                <ul>
                    <button className="hover:bg-[var(--hover)]/20 p-1 cursor-pointer rounded-lg w-full " onClick={()=>addServer(true)}>Create Server</button>
                    <p className="border border-[#404246] mt-2 mb-2"></p>
                    <button className="hover:bg-[var(--hover)]/20 p-1 cursor-pointer rounded-lg w-full" onClick={()=>lookServer(true)}> Find server</button>
                    
                </ul>
            </div>
            
        </>



    );
}

