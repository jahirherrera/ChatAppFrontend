import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { UserLogin } from "./type.d.tsx";


export default function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Login = async (username: string, password: string) => {
    localStorage.removeItem("authToken");

    const user: UserLogin = {
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


    } catch (error) {
      console.error("Login failed", error);
    }

  }

  const enterLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      Login(username, password);
    }
  }



  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[url(./assets/bg.png)] bg-cover bg-center bg-no-repeat text-white">
      <section className='flex flex-col items-center pt-6 border w-120 h-140 text-black rounded-2xl shadow-xl/40 m-4  backdrop-blur-[10px] '>
        <div className="flex flex-col justify-center items-center m-5">
          <h2 className="text-3xl font-bold text-white flex"><p className="italic">Byte</p>Talk</h2>
          <p className="text-gray-300">Connect. Code. Colaborate</p>
        </div>

        <div className=" flex flex-col justify-center items-center gap-4 p-6">
          <input className='border border-white rounded-md px-3 py-2  w-100  text-white' placeholder="Username" name="username" id="username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} onKeyDown={enterLogin}></input>
          <input className='border border-white rounded-md px-3 py-2  w-100 text-white' name="password" placeholder="Password" id="password" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} onKeyDown={enterLogin}></input>
          <button className='p-2  rounded-lg text-white w-40 cursor-pointer shadow-xl bg-blue-500' onClick={() => { Login(username, password) }}>
            Login
          </button>
          <button className='p-2 text-white  rounded-lg   cursor-pointer shadow-xl bg-blue-500' onClick={() => { navigate("/CreateUser") }}>
            Register
          </button>
        </div>

        <div>
          <p className="text-white">---- Sign in with ----</p>
        </div>
      </section>
    </div>

  );
}