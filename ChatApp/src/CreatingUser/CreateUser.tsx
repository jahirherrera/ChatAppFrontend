import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "./Selecting.tsx";
import LastPage from "./LastPage.tsx";

export default function CreateUser() {
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(0);

    const [proSelected, setProSelected] = useState<string[]>([]);
    const [techSelected, settechSelected] = useState<string[]>([]);

    const languages = {types : ["JavaScript", "Python", "Java", "C#", "C++", "Ruby", "Go", "Swift", "Kotlin", "PHP", "TypeScript", "Rust","C"] , title : "What languages do you use daily? What languages do you like to learn about?"};
    const technoloies = {types : ["SQL", "NoSQL", "Git", "Docker", "Aws", "Azure","Google Cloud","Rest" ,"Linux", "Redis"], title : "What technologies do you use daily? What technologies do you like to learn about?"};
    
    const goBack = () => {
        if(page === 0){
            navigate("/");
        }else{
            setPage(p => p=p-1);
        }
    }

    const goFoward = () => {
        if(page === 3){
            return;
        }else{
            setPage(p => p=p+1);
        }  
    }

    const pages= {
        0 : <div><h1 className="text-white text-4xl m-15">Welcome to ByteTalking, a platform for sharing and discussing programming knowledge.</h1></div>,
        1: <Select list={languages.types} title={languages.title}  setSelected={setProSelected}/>,
        2: <Select list={technoloies.types}  title={technoloies.title} setSelected={settechSelected}/>,
        3: <LastPage />
    }


    return(
        <>
             
            <div className="flex flex-col justify-center items-center h-screen w-screen  text-white bg-gradient-to-t from-gray-800 via-slate-600 to-gray-800">
                {pages[page as keyof typeof pages]}
                <div>
                    <button className="text-xl border border-white rounded-2xl p-2 cursor-pointer m-2 w-12 " onClick={() =>goBack()}>&larr;</button>
                    {page!==3 && <button className="text-xl border border-white rounded-2xl p-2 cursor-pointer m-2 w-12 " onClick={() =>goFoward()}>&rarr;</button>}
                </div>
                
            </div>
            
            
        </>
    )
}