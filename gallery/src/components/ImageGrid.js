
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import "../assets/main.css"
import axios from 'axios';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";


function ImageGrid() {
  let navigate = useNavigate(); 
const [imageList, setImageList] = useState([]);
const [selectedImageId, setSelectedImageId] = useState(null);

  const handleClick = (id) => {
    setSelectedImageId(id);
    console.log(selectedImageId);


  };

  const getImages = async () => {
    const resp = await axios.get('http://localhost:8000/image/fetch', {
    headers: {
      'Authorization':'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }
  })
  setImageList(resp.data)
  }

  useEffect(() => {

    getImages()
    
  }, []);

  const deleteImage = async (id) => {
    let res;
    try{
      res = await axios.delete(`http://localhost:8000/image/delete`, {
      data:{
        id
      },
      headers:{
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
      }
    })

    getImages();
    }
    catch(err) {

      // if(err.response.status===401){
      //   alert(err.response.status)
      //   navigate("/");
      // }

      throw err;
    }

}

  


  const handleDelete = (id) => {
    deleteImage(id);
  };
  
  return (
    <div className="grid grid-cols-3 gap-4 h-full w-full mt-100 ">
      {imageList && imageList.map(image => (
       <div key={image.id}>
       <img
          key={image.id}
          src={image.url}
          className={

            `w-64 h-64 object-cover self-center rounded-lg hover:scale-110 ${image.id === selectedImageId && 'show-delete-icon' ? 'bg-gray-200' : ''}`
           }
          onClick={() => handleClick(image.id)}
        />


        <button className={` flex flex-row bg-blue-500 hover:bg-blue-700 hover:scale-110 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline rounded-sm shadow-md content-center items-center self-center  top-0 right-0 ${image.id === selectedImageId && 'show-delete-icon' ? 'block' : 'hidden'}`} onClick={() => handleDelete(image.id)}>
          <AiTwotoneDelete/>
          <text>Delete</text>
        </button>

        
      
        </div>
      ))}
    </div>






  );

    
}

export default ImageGrid;

