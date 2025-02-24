import React, { useContext, useEffect, useState } from 'react'
import { WislListConext } from '../../Context/WishListContext'
import { CartConext } from '../../Context/CartContext'
import toast from 'react-hot-toast'



export default function WishList() {


  let {addToCart , setCart} = useContext(CartConext)


  /*******************************************/
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
      console.log('Adeed')

    } else{
      console.log('err')

    }
    
  }


  /****************************************************/
let {getWishListItem ,removeWishItem} = useContext(WislListConext)
  const [cartDet, setcartDet] = useState(null)

  async function removeWish(productId){
    let response= await  removeWishItem(productId)
   
    setcartDet(response.data)
    console.log(response.data)
    
    }
  

  async function GetWish(){
    let response= await  getWishListItem()
    setcartDet(response.data)
  
  
    }
useEffect(()=>{
  GetWish()
},[])  
  return (
   <>
   
<div className='w-10/12 mx-auto my-5 row justify-between'>
  <h1 className='font-bold text-3xl'>
  My wish List
</h1>


</div>

{cartDet?.data.map((prod)=><div key={prod.id} className="row justify-between w-10/12 mx-auto bg-slate-50">
<div className="">
<img src= {prod.imageCover} className="w-full md:w-40 max-w-full max-h-full" alt="Apple Watch" />
<h1 className='my-3 font-bold'>{prod.title}</h1>
<span className='block my-3 font-bold text-main'> {prod.price}  EGP</span>  
<span onClick={()=>removeWish(prod.id)} className="font-medium cursor-pointer text-red-600"> <i className="fa-solid fa-trash"></i>Remove</span>
</div>
<div className="px-6 py-4">
<button  onClick={()=>addProud(prod.id)}  className=' bg-white text-black border border-green-400 px-8 py-3 rounded-md mx-5 my-2 '> Add To Cart </button>
        </div>


</div>
)}

   
  


   </>
  )
}
