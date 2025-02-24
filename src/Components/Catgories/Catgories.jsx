import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Catgories() {
   const [loading, setloading] = useState(true)
  const [Catig, setCatig] = useState([])
  function GetAllCatig(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=>{
      setCatig(data.data)
      setloading(false)
    })
  }
useEffect(()=>{
  GetAllCatig()
},[])
  return (
    <>
    {loading?<div className="bg-slate-100  text-center py-60  w-full h-screen"><i className="  text-6xl fa-solid fa-spinner fa-spin"></i></div>:<div>
      <div className='row w-10/12 mx-auto px-24 justify-between'>
    {Catig.map((cat)=> <Link to={"/Catgories"} key={cat._id} className='w-full md:w-1/3 px-3 my-5   rounded-xl hover:border-green-500 hover:shadow-lg hover:border hover:shadow-green-200 hover:scale-105  transition-all duration-150 '> 
    <img className='w-full h-[300px]  ' src={cat.image} alt="" />
    <h1 className=' py-5 text-center font-extrabold text-2xl text-main'> {cat.name}</h1>
  </Link>)}
    </div>
        
      <h1 className=' text-center font-extrabold text-main text-3xl' >Men's Fashion subcategories</h1>

<div className='row w-10/12 justify-center  '>
  <h1 className= ' py-5 px-20 border text-center font-extrabold text-2xl mx-5 my-5 rounded-xl hover:border-green-500 hover:shadow-lg hover:border hover:shadow-green-200 hover:scale-105  transition-all duration-150'> Bags & luggage</h1>
  <h1 className= ' py-5 px-20 border text-center font-extrabold text-2xl  mx-5 rounded-xl hover:border-green-500 hover:shadow-lg hover:border hover:shadow-green-200 hover:scale-105  transition-all duration-150'> Men's Clothing</h1>
  
  </div>
  
         </div> }
  
  
    </>
  )
}
