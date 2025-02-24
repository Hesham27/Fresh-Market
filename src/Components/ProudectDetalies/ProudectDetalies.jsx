import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartConext } from '../../Context/CartContext';
import { WislListConext } from '../../Context/WishListContext'
import toast from 'react-hot-toast'

export default function ProudectDetalies() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true ,
      };
        /**************************************************************************************/
        let {addToWishList }= useContext(WislListConext)
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
      



          /**************************************************************************************/
      /**************************************************************************************/

      let {addToCart ,  setCart} = useContext(CartConext)
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
    
      






/***********************************************************************************************/


     const [loading, setloading] = useState(true)
    let {id} = useParams()
    const [proddetal, setproddetal] = useState(null)
    function gelProdDet(id){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then(({data})=>{
            setproddetal(data.data)
            setloading(false)
            
        })
        .catch((err)=>{
            setloading(false)
        })
    }

    useEffect(()=>{
        gelProdDet(id)

},[])
   

  return (
    <>
     {loading?
      <div  key={proddetal?.id}  className="bg-slate-100  text-center py-60  w-full h-screen"><i className="  text-6xl fa-solid fa-spinner fa-spin"></i></div>: <div key={proddetal?.id}  className='  md:flex-column md:justify-center row w-full md:px-5 md:w-10/12   mx-auto  '>
    <div key={proddetal?.id}  className='w-full md:w-1/4'>
    <Slider {...settings}>
    {proddetal?.images.map((src)=><img className=' w-full' src={src} alt={proddetal?.title} />)}
    </Slider>

    </div>
    <div  className='w-full md:w-3/4'>
    <h1 className='font-bold m-5 '>{proddetal?.title}</h1>
    <p className='m-5'>{proddetal?.description}</p>
    <div  className='flex flex-row justify-between m-5'>
<span>{proddetal?.price}EGP</span>
<span>{proddetal?.ratingsAverage} <i className= "text-yellow-300 fa-solid fa-star" ></i></span>

    </div>
    <div className='flex flex-row justify-between mx-auto w-10/12'>
    <button   onClick={()=>addProud(proddetal?.id)} className='bg-main btn w-10/12  text-white px-14 py-2 rounded-md  my-2 '> +Add </button>
    <button onClick={()=>AddTowish(proddetal?.id)}  ><i className=" text-lime-700 text-2xl fa-solid fa-heart"></i></button>
    </div>
   

     </div>
     
    </div>
    }
  
    </>
  )
}
