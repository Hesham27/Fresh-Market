import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartConext } from '../../Context/CartContext'

import toast from 'react-hot-toast'
import { WislListConext } from '../../Context/WishListContext'
export default function Proudect() {


let {addToWishList} = useContext(WislListConext)

const [Color, setColor] = useState(true)
  let {addToCart , setCart} = useContext(CartConext)

  async function AddTowish(productId) {
    let response =  await addToWishList(productId)
    setColor(false)
    if(response.data.status === "success"){
      
      toast('Its Has Been Successfully Added', {
        duration: 4000,
        position: 'top-right',
              style: {
                background: 'rgb(10, 173, 10)',
                color: '#fff',
              },
        className: '',
      
        icon: '👏',
      
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      
        
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      
        
        removeDelay: 1000,
      });
     

    } else{
      console.log('err')

    }
    
  }


  async function addProud(productId){
    let response =  await addToCart(productId)
    if(response.data.status === "success"){
      setCart(response.data)
      toast('Its Has Been Successfully Added', {
        duration: 4000,
        position: 'top-right',
              style: {
                background: 'rgb(10, 173, 10)',
                color: '#fff',
              },
        className: '',
      
        icon: '👏',
      
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      
        
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      
        
        removeDelay: 1000,
      });
     

    } else{
      console.log('err')

    }
    
  }



   const [loading, setloading] = useState(true)
  const [data, setdata] = useState([])
  function getAllProud(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
      setdata(data.data)
      setloading(false)
    })
    .catch((err)=>{
      setloading(false)
    })
  }
 useEffect(()=>{
  getAllProud()
 },[])
  return (
  <>
  
  
  {loading?<div className="bg-slate-100 text-center py-60  w-full h-screen"><i className="  text-6xl fa-solid fa-spinner fa-spin"></i></div>: <div className='row w-10/12  mx-auto'>
{data.map((prod)=>  <div key={prod.id} className='w-10/12 mx-auto lg:w-1/4 md:w-1/2 p-4 my-6  product transition-all duration-200' >
  <div className="prod" > 
    <Link to={`/proddetal/${prod.id}`}> 
    <img className='w-full mb-4' src={prod.imageCover} alt={prod.title} />
    <span className='text-main '>{prod.category.name}</span>
    <h3 className='font-bold my-3'>{prod.title.split(' ').slice(0 , 2).join(' ')}</h3>
    <div className='flex flex-row justify-between'>
<span>{prod.price}EGP</span>
<span>{prod.ratingsAverage} <i className= "text-yellow-300 fa-solid fa-star" ></i></span>

    </div>
    </Link>
 
    <button onClick={()=>AddTowish(prod.id)}  > {Color?<i className="text-end text-2xl fa-solid fa-heart"></i>:<i className="text-end text-red-600 text-2xl fa-solid fa-heart"></i>}</button>
    <button onClick={()=>addProud(prod.id)} className='bg-main btn text-white px-14 py-2 rounded-md mx-5 my-2 '> +Add </button>
  </div>
  </div>
)}
 

 </div>}

  </>
  )
}
