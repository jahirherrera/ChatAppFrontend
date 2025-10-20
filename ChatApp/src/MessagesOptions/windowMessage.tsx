import type { windowMessagesProps } from "../type";
 
 
 export default function WindowMessages({X,Y}: windowMessagesProps) {
    return (
        <>
            <div style={{ top: Y, left: X, }} className={`absolute flex bg-[#343436] border border-[#404246] text-white p-2 rounded-lg shadow-2xl  `}>
                <ul>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full ">Add Reaction &#x27A4;</button>
                    <p className="border border-[#404246] mt-2 mb-2"></p>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full">Copy Text</button>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full">Reply</button>
                    <p className="border border-[#404246] mt-2 mb-2"></p>
                    <button className="text-red-500 hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full"> Report message&#10071;</button>

                </ul>
            </div>
        </>
    )
}