import type { windowOptionProps } from "./type";



export default function WindowOption({ X, Y, addServer }: windowOptionProps) {

    function createServer() {
        addServer(true);
    }


    return (
        <>
            <div style={{ top: Y, left: X, }} className={`absolute flex bg-[#343436] border border-[#404246] text-white p-2 rounded-lg shadow-2xl  `}>
                <ul>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full " onClick={createServer}>Create Server</button>
                    <p className="border border-[#404246] mt-2 mb-2"></p>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full"> Find server</button>
                    
                </ul>
            </div>
            
        </>



    );
}

