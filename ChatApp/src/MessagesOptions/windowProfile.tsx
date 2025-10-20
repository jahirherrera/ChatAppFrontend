import type { windowMessagesProps } from "../type";
 
 
 export default function WindowProfile({X,Y, showing,giveStars}: windowMessagesProps) {
    return (
        <>
            <div style={{ top: Y, left: X, }} className={`absolute flex bg-[#343436] border border-[#404246] text-white p-2 rounded-lg shadow-2xl  `}>
                <ul>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full " onClick={()=>showing(true)}>View Profile &#x27A4;</button>
                    <p className="border border-[#404246] mt-2 mb-2"></p>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full" onClick={()=>giveStars(true)}>Give Stars</button>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full">...</button>
                    <p className="border border-[#404246] mt-2 mb-2"></p>
                    <button className="text-red-500 hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full"> Report Account&#10071;</button>

                </ul>
            </div>
        </>
    )
}