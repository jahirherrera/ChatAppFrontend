import type { profile, userWithStars } from "../type";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
//@ts-ignore
import sprite from '../assets/sprite.svg';



export default function ShowProfile({ usernameUser,showing }: profile) {
    const token: string = localStorage.getItem("authToken") || "";
    const decode: any = jwtDecode(token);
    const username: string = decode.sub;
    const [user, setUser] = useState<userWithStars>();

    useEffect(() => {
        getUserByUsername();
    }, [])

    const getUserByUsername = async () => {

        try {
            const response = await fetch(`http://localhost:8080/getUserProfile/${usernameUser}`, {
                method: "GET",
                headers: { "Authorization": "Bearer " + token }
            })
            if (!response.ok) {
                console.log("something were wrong");
            }
            const data = await response.json();
            setUser(data);
        } catch (e) {
            console.log(e)
        }

    }


    return (
        <>
            <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white '>
                <button className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 rounded-full hover:bg-red-600 transition z-50" onClick={()=>showing(false)}>X</button>
                <section className=" bg-gradient-to-b from-gray-600  flex flex-col justify-center items-center h-screen w-200 border-l border-r  border-white">

                    <p className="w-50 h-50 bg-blue-500 rounded-full border shadow-sky-50 shadow-lg mb-3"></p>
                    <p className="m-4 text-8xl ">{user?.fullname}</p>

                    {/* The code below is copy from chatgpt */}
                    <div className="flex flex-col justify-center items-center">
                        <p className="m-4 text-2xl text-[#606b81]">@{user?.username}</p>

                        {/* Inline mask for the stars */}
                        <svg width="0" height="0">
                            <mask id="starMask">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} x={i * 26} width="26" height="26" viewBox="0 0 24 24">
                                        <path
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2
                                                9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                            fill="white"
                                        />
                                    </svg>
                                ))}
                            </mask>
                        </svg>

                        {/* Rating bar with mask fill */}
                        <div className="relative w-[130px] h-[26px]">
                            <div
                                className="absolute top-0 left-0 h-full bg-yellow-400"
                                style={{
                                    width: `${(user?.starsGiven ?? 0/ 5) * 100}%`, // Dynamic fill
                                    mask: 'url(#starMask)',
                                    WebkitMask: 'url(#starMask)',
                                }}
                            ></div>

                            {/* Star outlines */}
                            <div className="flex absolute top-0 left-0">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        width="26"
                                        height="26"
                                        viewBox="0 0 24 24"
                                        className="text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
                                            9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* -------------------------------------------- */}

                    <p className="w-100 h-50rounded mt-10">{user?.description === null ? "No description" : user?.description}</p>
                </section>
            </div>
        </>
    )
}