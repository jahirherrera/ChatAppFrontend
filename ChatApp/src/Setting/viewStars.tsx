import { useState, useEffect } from "react"
import FiveStars from "../ExtrasComponents/fiveStarts";
import type  {starsName}  from "../type"


export default function ViewStars() {

    const [stars,setStars] = useState<starsName[]>([]);

    useEffect(() => {
        getStars(); 
    },[])

    
    

    const getStars = async () => {
        const username = localStorage.getItem("Username") || "";
        try {
            const response = await fetch(`http://localhost:8080/getStars/${username}`, {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setStars(data);
        
        } catch (error) {
            console.error("Error fetching stars:", error);
        }
    }




    return (
        <>
            <div className={`flex flex-col mt-10`}>
                <ul>
                    {stars?.map((star,index) => (
                        <li key={index} className="border-b border-[var(--text)] p-3 ml-5 mr-5 "> 
                            <FiveStars amount={star.amount} usernameFrom={star.usernameFrom} usernameTo={star.usernameTo}  />
                        </li>
                    ))}
                </ul>
                
            </div>
        </>
    )
}