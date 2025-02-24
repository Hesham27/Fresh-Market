import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Brands() {
  const [loading, setloading] = useState(true)
  const [brandes, setbrandes] = useState([])
  function getAllBrabdes(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then(({data})=>{
      setbrandes(data.data)
      setloading(false)
    })

  }
  useEffect(()=>{
    getAllBrabdes()
  },[])
  return (
   <>
   
   {loading?<div  key={brandes._id} className="bg-slate-100  text-center py-60  w-full h-screen"><i key={brandes.id} className="  text-6xl fa-solid fa-spinner fa-spin"></i></div>:
<div >
<h1 className='text-center  font-extrabold my-4 text-4xl text-main'>All Brands</h1>
<div className='row  w-10/12 mx-auto '> 

{brandes.map((brandes)=><div key={brandes._id} className="product w-full  md:w-1/4 my-3  px-5 hover:border-green-500 hover:shadow-lg hover:border hover:shadow-green-200 hover:scale-105  transition-all duration-150">
  
  <img className="rounded-t-lg" src={brandes.image} alt="" />

<div className="p-5 text-center">
 
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{brandes.name}</h5>
 
 
</div>
</div>
)}
</div>
</div>
}



   
   </>
  )
}
