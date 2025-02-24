

import {useFormik } from "formik";
import React, {  useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartConext } from "../../Context/CartContext";



export default function PaymentForm() {
   let {chekOut, Cart} = useContext(CartConext)
  
  const [loading, setloading] = useState(false)



  async function handlePAyment(CardId , url){
   let {data} = await  chekOut(CardId , url , formik.values)
   if(data.status === "success"){
window.location.href = data.session.url
   }
   console.log(data.session.url)
   
  }

  let formik = useFormik({
    initialValues: {
     
        details: "",
        phone: "",
        city: "",
    
    },
   
    onSubmit:()=> handlePAyment(`${Cart.cartId}` , "http://localhost:4000/")
  });
  return (
    <>
    
  

      <div className="w-10/12 mx-auto mt-20">
     
      
        <h1 className="text-3xl font-bold">CheckOut Now</h1>
  
{loading?<div className="bg-slate-100 text-center py-60  w-full h-screen"><i className="  text-6xl fa-solid fa-spinner fa-spin"></i></div>:<form onSubmit={formik.handleSubmit}>
       

       <div className="mt-5">
         <label
           htmlFor="details"
           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
         >
          details :
         </label>
         <input
           type="text"
           name="details"
           id="details"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.details}
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder=""
           
         />
       </div>
       <div className="mt-5">
         <label
           htmlFor="phone"
           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
         >
           phone :
         </label>
         <input
           type="tel"
           name="phone"
           id="phone"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.phone}
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder=""
           
         />
       </div>


       <div className="mt-5">
         <label
           htmlFor="city"
           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
         >
           city :
         </label>
         <input
         name="city"
           type="text"
           id="city"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.city}
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder=""
           
         />
       </div>
 
<div className="flex justify-between my-5">

       <div className=" text-end">
         <button disabled ={!(formik.isValid && formik.dirty)} type="submit" className="border bg-main text-white py-3 px-12 rounded-xl">
           {loading?<i className="mx-1 fa-solid fa-spinner fa-spin"></i>: <p className="font-bold" >ChekOut Now</p> }
         
           
         </button>
       </div>
</div>


     </form>}
      
      </div>
    </>
  );
}
