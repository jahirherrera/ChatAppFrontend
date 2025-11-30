import { useState, useEffect } from "react"


interface str{
    settheme : React.Dispatch<React.SetStateAction<string>>;
}



export default function Theme({settheme}:str) {

    const changeTheme=(theme:string)=>{
        localStorage.setItem("Theme",theme);
        settheme(theme);
    }

    return (
        <>
            <div className={`flex flex-col m-4  `}>
                <div className="flex flex-col justify-center items-center m-3">
                    <div className=" w-71 h-35 bg-[url(./assets/darkdefault.png)] bg-contain bg-no-repeat rounded-xl hover:cursor-pointer" onClick={()=>changeTheme("darkdefault")}/>
                    <h1>Dark Default</h1>
                </div>

                <div className="flex flex-col justify-center items-center m-3">
                    <div className=" w-71 h-35 bg-[url(./assets/darkgithub.png)] bg-contain bg-no-repeat rounded-xl hover:cursor-pointer" onClick={()=>changeTheme("darkgithub")}/>
                    <h1 className="">Dark Github</h1>
                </div>
                <div className="flex flex-col justify-center items-center m-3">
                    <div className=" w-71 h-35 bg-[url(./assets/ligthdefault.png)] bg-contain bg-no-repeat rounded-xl hover:cursor-pointer" onClick={()=>changeTheme("lightdefault")}/>
                    <h1>Light Default</h1>
                </div>

                <div className="flex flex-col justify-center items-center m-3">
                    <div className=" w-71 h-35 bg-[url(./assets/lightgithub.png)] bg-contain bg-no-repeat rounded-xl hover:cursor-pointer" onClick={()=>changeTheme("lightgithub")}/>
                    <h1>Light Github</h1>
                </div>
            </div>
        </>
    )
}