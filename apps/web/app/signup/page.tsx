"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const baseEndpoint = process.env.NEXT_PUBLIC_API_URL as string;
  
  if(!baseEndpoint){
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="rounded-3xl px-8 py-2 w-96 bg-zinc-950">
            <div className="flex flex-col my-2">
                Email
                <input onChange={e => {
                    setEmail(e.target.value);
                }} type="text" className="bg-gray-900 p-2 rounded-lg"></input>
            </div>
            <div className="flex flex-col my-2">
                Password
                <input onChange={e => {
                    setPassword(e.target.value);
                }} type="password" className="bg-gray-900 p-2 rounded-lg"></input>
            </div>
            <div className="flex flex-col text-center">
                <button onClick={async () => {
                    console.log("these are the inputs" ,email, password);
                    
                    
                    await axios.post(`${baseEndpoint}/api/v1/user/signup`, {
                        email,
                        password
                    }, {
                        withCredentials: true,
                        // headers: {
                        //     "Content-Type": "application/json",
                        // }
                    });
                    alert("You are logged in")
                    router.push("/chat");


                }} className="bg-zinc-950 hover:bg-gray-900 flex items-center justify-center mb-2 p-6 rounded-lg">Sign in with credentials</button>
            </div>
        </div>
    </div>
);
}
