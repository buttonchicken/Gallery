import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import ImageGrid from "../components/ImageGrid"
import UploadImage from "../components/UploadImage"
import "../../src/assets/main.css"




function Gallery(props) {
    let navigate = useNavigate(); 

    async function logout() {
        localStorage.removeItem("token")
        // props.setToken(null)
        navigate("/")
    
}
useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (token === null || token === undefined) {
        
        navigate("/");
        }
  }, []);

    return (
    <div className="h-full px-10 py-10 justify-items-between items-center content-between ">
    <button onClick={logout} className="bg-blue-500 top-0 left-0  hover:bg-blue-700 text-white font-bold my-2.5 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
    Logout
    </button>
    <ImageGrid/>
    <UploadImage/>
    </div>
    );

}

export default Gallery;