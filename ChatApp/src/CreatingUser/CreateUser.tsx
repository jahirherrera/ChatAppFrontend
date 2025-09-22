import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "./Selecting.tsx";
import LastPage from "./LastPage.tsx";

export default function CreateUser() {
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(0);
    
    const [langSelected, setlangSelected] = useState<string[]>([]);
    const [techSelected, settechSelected] = useState<string[]>([]);

    //"C#", "C++", "Ruby", "Go", "Swift", "Kotlin", "PHP", "TypeScript", "Rust","C"
    const languages = {types : ["JavaScript", "Python", "Java"] , title : "What languages do you use daily? What languages do you like to learn about?"};
    const technoloies = {types : ["SQL", "NoSQL"], title : "What technologies do you use daily? What technologies do you like to learn about?"};
    //, "Git", "Docker", "Aws", "Azure","Google Cloud","Rest" ,"Linux", "Redis"

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

    const pages= [
        <div><h1 className="text-white text-4xl m-15">Welcome to ByteTalking, a platform for sharing and discussing programming knowledge.</h1></div>,
        <Select list={languages.types} title={languages.title}  setSelected={setlangSelected}/>,
        <Select list={technoloies.types}  title={technoloies.title} setSelected={settechSelected}/>,
        <LastPage  technologies={[...langSelected,...techSelected]}/>
    ]


    return(
        <>
             
            <div className="relative overflow-hidden h-screen w-screen text-white bg-gradient-to-t from-gray-800 via-slate-600 to-gray-800 justify-center items-center flex ">
                <div
                    className="flex h-full w-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${page * 100}%)` }}
                >
                    {pages.map((content, i) => (
                        <div key={i} className="flex-shrink-0 w-full h-200">
                            {content}
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-10 flex flex-row justify-center items-center">
                    <button className="text-xl border border-white rounded-2xl p-2 cursor-pointer m-2 w-12 " onClick={() =>goBack()}>&larr;</button>
                    {page!==3 && <button className="text-xl border border-white rounded-2xl p-2 cursor-pointer m-2 w-12 " onClick={() =>goFoward()}>&rarr;</button>}
                </div>
                
            </div>
            
            
        </>
    )
}