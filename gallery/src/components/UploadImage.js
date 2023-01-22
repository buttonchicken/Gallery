import React, { useState } from 'react';
// import ProgressBar from './ProgressBar';
import "../assets/main.css"
import axios from "axios"

const UploadImage = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg)');
        }
    };

    const upload = async () => {
        if(!file) {
            return;
        }
        const formData = new FormData();
        formData.append("url", file);
        formData.append("name", file.name);

        const res = await axios.post('http://localhost:8000/image/upload',formData, {
            headers:{
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token")),
            "Content-Type": "multipart/form-data"
            }
        })

        console.log(res)
    }

    return (
        <form>
          
            <div className="flex flex-col items-center justify-center ">
                <h1 className="text-xl font-bold text-gray-900">Upload Image</h1>
                <p className="text-gray-500">Upload an image to the gallery</p>
           
            <input type="file" onChange={changeHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
                {/* {file && <ProgressBar file={file} setFile={setFile} />} */}
                
            </div>
            <button onClick={upload}>Submit</button>
            </div>
        </form>
    );
};

export default UploadImage;
