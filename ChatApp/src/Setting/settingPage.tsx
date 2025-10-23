import { useState, useEffect } from "react";
import ProfileEdit from "./profileEdit";
import Theme from "./theme";
import { jwtDecode } from "jwt-decode";



export default function SettingPage() {

    const [showProfile, setShowProfile] = useState(true);
    const [showTheme, setShowTheme] = useState(false);
    

    const color1: string = localStorage.getItem("color1") || "[#292b2f]";
    const token: string = localStorage.getItem("authToken") || "";
    const decode: any = jwtDecode(token);
    const username: string = decode.sub;

    function themetrue(){
        setShowProfile(false);
        setShowTheme(true);
    }


    return (
        <>
            <div className={`bg-${color1} w-full h-screen flex justify-center items-center text-white`}>
                <section className="bg-[#36393f] h-screen min-w-60 flex flex-col text-xl items-start pt-5 pl-3 pr-2">
                    <button className="pl-1 m-1 rounded hover:cursor-pointer w-full hover:bg-[#42464d] flex" >My Account</button> 
                    <button className=" pl-1 m-1 rounded hover:cursor-pointer w-full hover:bg-[#42464d] flex" onClick={themetrue}>Theme / Appearance</button> 
                    <button className=" pl-1 m-1 rounded hover:cursor-pointer w-full hover:bg-[#42464d] flex">Language</button>
                    <button className=" pl-1 m-1 rounded hover:cursor-pointer w-full hover:bg-[#42464d] flex">View Stars</button>
                    <p className="border border-white w-full mr-2 mb-2 mt-2"></p>
                    <button className="m-1 text-red-500">Delete account</button>
                    <button className="m-1 text-red-500">Go back</button>
                    

                </section>
                <section className="border-r border-[#36393f] h-screen min-w-150 max-w-150 justify-center items-center">
                    {showProfile && <ProfileEdit />}
                    {showTheme && <Theme />}
                </section>
            </div>
        </>
    )
}