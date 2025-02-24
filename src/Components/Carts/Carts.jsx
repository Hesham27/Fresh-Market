import React, { useContext, useState } from 'react'
import { CartConext } from '../../Context/CartContext'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Carts() {

  let {getCartItem , removeCart ,updateCart , Cart ,setCart} = useContext(CartConext)
  console.log(Cart)
const [cartDet, setcartDet] = useState(null)

async function updateCartItem(productId , count){
  if(count < 1){
    return

  }
  let response= await  updateCart(productId , count)
 
  setcartDet(response.data)
  setCart(response.data)
 
  
  }


async function removeCartItem(productId){
  let response= await  removeCart(productId)
 
  setcartDet(response.data)
  setCart(response.data)
 
  
  }


 async function GetCart(){
  let response= await  getCartItem()
  setcartDet(response.data)

  }

  useEffect(()=>{
    GetCart()
    

  },[])
  return (
    <>
    


<div className='w-10/12 mx-auto mt-10 row justify-between'>
  <h1 className='font-bold text-3xl'>
    Cart Shop
</h1>
<Link to={"/PaymentForm"}>
<button  className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-3 rounded-md mx-5 my-2 '> Check Out </button>

</Link>


 
</div>
<div className='w-10/12 mx-auto mt-10 row justify-between'>

<span className='font-bold text-xl'> total price: <span className='text-main'>{Cart?.data.totalCartPrice}</span> EGP </span>
<span className='font-bold text-xl' >total number of items: <span className='text-main'>{Cart?.numOfCartItems}</span></span>
</div>
{cartDet?.data.products.map((prod)=><div key={prod.product.id} className="row justify-between w-10/12 mx-auto bg-slate-50">
<div className="">
<img src= {prod.product.imageCover} className="w-full md:w-40 max-w-full max-h-full" alt="Apple Watch" />
<h1 className='my-3 font-bold'>{prod.product.title.split(' ').slice(0 , 2).join(' ')}</h1>
<span className='block my-3 font-bold'> {prod.price}  EGP</span>  
<span onClick={()=>removeCartItem(prod.product.id)} className="font-medium cursor-pointer text-red-600"> <i className="fa-solid fa-trash"></i>Remove</span>
</div>
<div className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateCartItem(prod.product.id , prod.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>


            <div>
<span> {prod.count}</span>         
   </div>

            
            <button onClick={()=>updateCartItem(prod.product.id , prod.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </div>

</div>
)}


    
    </>
  )
}
