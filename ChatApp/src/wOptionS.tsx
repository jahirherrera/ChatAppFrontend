import type { windowOptionSProps } from "./type";



export default function WOptionS({ X, Y, addChat, deteleServer }: windowOptionSProps) {

    function createServer() {
        addChat(true);
    }

    function deleteS(){
        deteleServer();
    }


    return (
        <>
            <div style={{ top: Y, left: X, }} className={`absolute flex bg-[#343436] border border-[#404246] text-white p-2 rounded-lg shadow-2xl  text-sm max-w-38`}>
                <ul>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full " onClick={createServer}>Create Chat</button>
                    <p className="border mt-2 mb-2 border-[#404246]"></p>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full ">Add User</button>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full ">Delete User</button>
                    <p className="border mt-2 mb-2 border-[#404246]"></p>
                    <button className="hover:bg-gray-600 p-1 cursor-pointer rounded-lg w-full text-red-600" onClick={deleteS}> Delete Server</button>
                    
                </ul>
            </div>
            
        </>



    );
}