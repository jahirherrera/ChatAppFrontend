import { useState, useEffect } from "react";
import type {SelectProps} from "../type.d.tsx";

export default function Select({list,setSelected ,title}:SelectProps) {

    

    const [s, setS] = useState<string[]>([]);
    

    useEffect(()=>{
        console.log(s);
        setSelected(s);
    }, [s]);

    function handleSelect(item:string){
        if(s.includes(item)){
            setS(s.filter(i=>i!==item));
        }else{
            setS([...s, item]);
        }
    }

    return(
        <div className="flex flex-col bg-gradient-to-tl from-sky-600 to-sky-900  border-2 border-black p-4 m-4 rounded-lg  ">
            <h1 className="text-2xl p-3">{title}</h1>
            {list.map((item,index)=>
                (<div key={index} className="flex flex-row items-center p-2">
                    <input className="m-2 accent-green-500" onClick={()=>handleSelect(item)} type="checkbox" id={item} name={item} value={item} />
                    <label className="text-2xl  hover:text-green-500 cursor-pointer" htmlFor={item}>{item}</label>
                </div>
            ))}
        </div>
    )
}