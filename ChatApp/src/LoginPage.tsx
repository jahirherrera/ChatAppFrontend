import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { UserLogin } from "./type.d.tsx";


export default function HomePage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const Login = async (username:string, password:string) => {
      localStorage.removeItem("authToken");

      const user : UserLogin = {
        username: username,
        password: password
      }
        
      try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error("Could not login. Please check your credentials.");
    }

    
    const token = await response.text();
    
    localStorage.setItem("authToken", token);
    navigate("/Home");
    

    }catch (error) {
      console.error("Login failed", error);
    }
        
  }

  const enterLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      Login(username, password);
    }
  }



  return (
    <div className=' flex justify-center items-center w-screen h-screen bg-gradient-to-r from-gray-900 via-slate-800 to-gray-800 text-white'>
        <div className="flex flex-col justify-evenly items-center w-[800px] h-[600px] z-10">
          <section className='flex flex-col justify-center items-center'>
            <h1 className='text-5xl text-white p-5 flex' ><p className='italic'>Byte</p>Talk</h1>
            <p className="text-white text-3xl p-5 pl-12" >Welcome to ByteTalking, a platform for sharing and discussing programming knowledge.</p>
          </section>

          <section className='group relative bg-gradient-to-b from-sky-600 to-sky-800 text-black rounded-2xl shadow-2xl overflow-hidden w-60 h-20 transition-all duration-500 ease-in-out hover:w-96 hover:h-[420px] flex flex-col items-center pt-6 border border-white'>
            <h2 className="text-3xl font-bold text-white">Login</h2>
            <div  className="opacity-0 group-hover:opacity-100 transition-all duration-700 w-4/5 mt-6 flex flex-col gap-4">
              <label htmlFor="username" className="text-white  " >USERNAME</label> 
              <input className='border border-white rounded-md px-3 py-2   focus:outline-none text-white' name="username" id="username" value={username} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)} onKeyDown={enterLogin}></input>
              <label htmlFor="password" className=' text-white pt-3  '>PASSWORD</label> 
              <input className='border border-white rounded-md px-3 py-2   focus:outline-none text-white' name="password" id="password" type="password" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} onKeyDown={enterLogin}></input>
              <button className='p-2 text-white border rounded-lg border-white  cursor-pointer shadow-xl bg-blue-500' onClick={()=>{Login(username, password)}}>
                Login
              </button>
              <button className='p-2 text-white border rounded-lg border-white  cursor-pointer shadow-xl bg-blue-500' onClick={()=>{navigate("/CreateUser")} }>
                Register
              </button>
            </div>  
          </section>
        </div>
      </div>
  );
}