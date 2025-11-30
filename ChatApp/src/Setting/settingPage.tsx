import { useState, useEffect } from "react";
import ProfileEdit from "./profileEdit";
import Theme from "./theme";
import { useNavigate } from "react-router-dom";



export default function SettingPage() {

    const navigate = useNavigate();

    const [theme,setTheme] = useState<string>("");

    useEffect(()=>{
        setTheme(localStorage.getItem("Theme") || "")
    })

    const [showProfile, setShowProfile] = useState(true);
    const [showTheme, setShowTheme] = useState(false);
    
    function myAccountTrue(){
        setShowProfile(true);
        setShowTheme(false);
    }

    function themetrue(){
        setShowProfile(false);
        setShowTheme(true);
    }


    return (
        <>
            <div className={`bg-[var(--bg)] w-full h-screen flex justify-center items-center text-[var(--text)] ${theme}`}>
                <section className="bg-[var(--chat)] h-screen min-w-60 flex flex-col text-xl items-start pt-5 pl-3 pr-2">
                    <button className="pl-1 m-1 rounded hover:cursor-pointer w-full hover:bg-[var(--hover)] flex" onClick={myAccountTrue}>My Account</button> 
                    <button className=" pl-1 m-1 rounded hover:cursor-pointer w-full hover:bg-[var(--hover)] flex" onClick={themetrue}>Theme / Appearance</button> 
                    <button className=" pl-1 m-1 rounded hover:cursor-pointer w-full hover:bg-[var(--hover)] flex">Language</button>
                    <button className=" pl-1 m-1 rounded hover:cursor-pointer w-full hover:bg-[var(--hover)] flex">View Stars</button>
                    <p className="border border-white w-full mr-2 mb-2 mt-2"></p>
                    <button className="m-1 text-red-500">Delete account</button>
                    <button className="m-1 text-red-500 hover:cursor-pointer" onClick={()=>navigate("/home")}>Go back</button>
                    

                </section>
                <section className="border-r border-[var(--chat)] h-screen min-w-150 max-w-150 justify-center items-center">
                    {showProfile && <ProfileEdit />}
                    {showTheme && <Theme settheme={setTheme}/>}
                </section>
            </div>
        </>
    )
}