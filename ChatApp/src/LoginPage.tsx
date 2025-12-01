import { href, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { UserLogin } from "./type.d.tsx";
//@ts-ignore
import sprite from './assets/sprite.svg';


export default function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [visibleString, setVisibleString] = useState("password");

  const Login = async (username: string, password: string) => {

    const user: UserLogin = {
      username: username,
      password: password
    }

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error("Could not login. Please check your credentials.");
      }

      localStorage.setItem("Username", username);
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

  function changeVisible() {
    setVisible(!visible);
  }

  useEffect(() => {
    visible ? setVisibleString("text") : setVisibleString("password");
  }, [visible])


  const goToGoogle =()=>{
    window.location.href = "http://localhost:8080/oauth2/authorization/google"
  }



  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[url(./assets/bg.png)] bg-cover bg-center bg-no-repeat text-white ">
      <section className='flex flex-col items-center pt-6 border w-120 h-140 text-black rounded-2xl shadow-xl/40 m-4  backdrop-blur-[10px] scale-120'>
        <div className="flex flex-col justify-center items-center m-5">
          <h2 className="text-3xl font-bold text-white flex"><p className="italic">Byte</p>Talk</h2>
          <p className="text-gray-300">Connect. Code. Colaborate</p>
        </div>

        <div className=" flex flex-col justify-center items-center gap-4 p-6">
          <input className='border border-white rounded-md px-3 py-2  w-100  text-white focus:outline-none focus:ring-0' placeholder="Username" name="username" id="username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} onKeyDown={enterLogin}></input>
          <div>
            <div className='border border-white rounded-md px-3 py-2  w-100 text-white flex justify-between items-center'>
              <input className="bg-transparent outline-none focus:outline-none focus:ring-0 w-full text-white" name="password" placeholder="Password" id="password" type={visibleString} value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} onKeyDown={enterLogin}></input>
              <button
                onClick={changeVisible}
                className="w-5 h-5 flex justify-center items-center bg-cover"
              >
                <svg
                  className="w-5 h-5 text-white hover:cursor-pointer"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                >
                  <use href={`${sprite}#${visible ? "notvisible" : "visible"}`} />
                </svg>
              </button>
            </div>

            <div className='p-1 text-blue-600    cursor-pointer text-xs flex justify-start items-start w-100'>
              Forgot Password?
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button className='p-2  rounded-lg text-white w-40 cursor-pointer shadow-xl bg-blue-500' onClick={() => { Login(username, password) }}>
              Login
            </button>
            <button className='p-2 text-blue-600    cursor-pointer text-xs flex ' onClick={() => { navigate("/CreateUser") }}>
              New here? <p className="underline pl-1">Create an account</p>
            </button>
          </div>

        </div>

        <div>
          <div className="text-white flex justify-center items-center mb-3">
            <p className="border border-white w-10 h-0"></p>
            <p className="p-1">Sign in with</p>
            <p className="border border-white w-10 h-0"> </p>
          </div>
          <div>
            <div className='flex justify-around w-40 items-center mt-2'>
              <svg width="28" height="28" className="hover:cursor-pointer ">
                <use href={`${sprite}#gitlogin`} />
              </svg>
              <svg width="26" height="26" className="hover:cursor-pointer" onClick={goToGoogle}>
                <use href={`${sprite}#google`}  />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}