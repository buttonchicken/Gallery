import axios from "axios";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "../assets/main.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate(); 


    async function login() {
        let res
        try{
                res = await axios.post("http://localhost:8000/account/register",{
                username:email,
                password
            })
            console.log(res)
            if(res) {
                localStorage.setItem("token", JSON.stringify(res.data.access));
                navigate('/gallery')
            }
        }
        catch(error){
            // alert(error)
            console.log(error)
            alert(error.response.data.message);
            // console.log(error);
            // if(error.response.status===400){
            //     alert(error.response.statusText);
                
            // }
            // else{
            // console.log(error)
            // alert("A problem occured. Please try again later.")
            // }
        }
      
        
    }
    
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Username
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="username" placeholder="Username" required value={email} onChange={(val) => setEmail(val.target.value)}/>
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Password
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="password" required placeholder="******************" value={password} onChange={(val) => setPassword(val.target.value)}/>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                    </button> */}

                    <button onClick={login} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign Up
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/">
                       Existing User? Sign in
                    </a>
                </div>
            </div>
        </div>

    );
    }



