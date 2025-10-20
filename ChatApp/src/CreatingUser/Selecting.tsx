import { useState, useEffect } from "react";
import type { SelectProps, techs } from "../type.d.tsx";

export default function Select({ setSelected }: SelectProps) {



    const [select, setSelect] = useState<techs[]>([]);
    const [available, setAvailable] = useState<techs[]>([
        { name: "TypeScript", color: "bg-[#3178C6]" },
        { name: "Java", color: "bg-gradient-to-r from-[#5382A1] to-[#E76F00]" },
        { name: "JavaScript", color: "bg-[#F7DF1E] text-black" },
        { name: "Python", color: "bg-gradient-to-r from-[#3776AB] to-[#FFD43B]" },
        { name: "C#", color: "bg-gradient-to-r from-[#68217A] to-[#9B4F96]" },
        { name: "C++", color: "bg-[#00599C]" },
        { name: "C", color: "bg-[#A8B9CC] text-black" },
        { name: "Go", color: "bg-[#00ADD8]" },
        { name: "PHP", color: "bg-[#777BB4]" },
        { name: "Rust", color: "bg-[#DEA584] text-black" },
        { name: "Git", color: "bg-[#F05033]" },
        { name: "Docker", color: "bg-[#2496ED]" },
        { name: "AWS", color: "bg-gradient-to-r from-[#232F3E] to-[#FF9900]" },
        { name: "Azure", color: "bg-[#0078D7]" },
        { name: "GoogleCloud", color: "bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]" },
        { name: "REST", color: "bg-[#009688]" },
        { name: "Linux", color: "bg-gradient-to-r from-[#FCC624] to-[#333333]" },
        { name: "Redis", color: "bg-[#D82C20]" },
        { name: "SQL", color: "bg-[#336791]" },
        { name: "NoSQL", color: "bg-gradient-to-r from-[#00C896] to-[#2E7D32]" }
    ]);



    useEffect(()=>{
        setSelected(select.map(s =>s.name));
    },[select])

    function addToS(a : techs){
        setAvailable(available.filter(av=>av.name !== a.name))
        setSelect(s=>[...s,a])
    }

    function deleteFromS(a : techs){
        setSelect(select.filter(s=>s.name !== a.name));
        setAvailable(s=>[...s,a])
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen  text-white">
            <div className='flex flex-col justify-around items-center pt-4 border w-150 h-180 border-black rounded-[60px] shadow-xl/60 m-4  backdrop-blur-[10px]'>
                <div className="flex flex-col justify-center items-center ">
                    <h1 className="text-4xl font-bold text-white flex"><p className="italic">Byte</p>Talk</h1>
                    <h2 className="text-xl text-white m-0.5">Personalize Your Profile</h2>
                    <h3 className="text-lg text-gray-300">What's Your Stack?</h3>
                </div>

                <button className='p-2  rounded-lg text-white w-40 cursor-pointer shadow-xl bg-blue-500 mb-4'>
                    Upload Picture
                </button>

                <div className="flex flex-col">
                    <h2 className="text-lg text-white m-0.5">Description</h2>
                    <textarea className="p-3 w-110 h-50 rounded-2xl bg-[#232327] opacity-92 border-2 border-[#3d4046] resize-none overflow-y-auto" placeholder="Tell us about you, your coding journey, project, and interest..." />
                </div>

                <div className="p-1 flex flex-col  w-110 border border-[#3d4046] bg-[#232327] overflow-y-auto scrollbar-bg">
                    <h2 className="text-lg text-white m-0.5">Your Tech Stack</h2>
                    <p className="w-full border border-[#3d4046]"></p>
                    <div className="flex flex-wrap p-1 max-h-18 min-h-9 gap-1 overflow-y-auto scrollbar-bg">
                        {select && select.map((s) => (
                            <div className={`flex justify-center items-center  w-25 h-7 text-white rounded hover:cursor-pointer ${s.color} `} onClick={()=>deleteFromS(s)}>
                                {s.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-1 flex flex-col  w-110 border border-[#3d4046] bg-[#232327]">
                    <h2 className="text-lg text-white m-0.5">Techs Chat Available</h2>
                    <p className="w-full border border-[#3d4046]"></p>
                    <div className="flex flex-wrap p-1 max-h-18 min-h-9 gap-1 overflow-y-auto scrollbar-bg">
                        {available && available.map((a) => (
                            <div className={`flex justify-center items-center  w-25 h-7 text-white rounded hover:cursor-pointer ${a.color} `} onClick={()=>addToS(a)}>
                                {a.name}
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    )
}