import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "./Selecting.tsx";
import LastPage from "./LastPage.tsx";


export default function CreateUser() {
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(0);
    const [description,setDescription] = useState("");
    const [techSelected, settechSelected] = useState<string[]>([]);


    const goBack = () => {
        if(page === 0){
            navigate("/");
        }else{
            setPage(p => p=p-1);
        }
    }

    const goFoward = () => {
        if(page === 1){
            return;
        }else{
            setPage(p => p=p+1);
        }  
    }

    const pages= [
        <Select  setSelected={settechSelected} setDes={setDescription}/>,
        <LastPage  technologies={[...techSelected]} description={description}/>
    ]


    return(
        <>
             
            <div className="relative overflow-hidden h-screen w-screen text-white bg-[url(./assets/bg-createUser.PNG)] bg-cover bg-center bg-no-repeat justify-center items-center flex ">
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
                    {page!==1 && <button className="text-xl border border-white rounded-2xl p-2 cursor-pointer m-2 w-12 " onClick={() =>goFoward()}>&rarr;</button>}
                </div>
                
            </div>
            
            
        </>
    )
}