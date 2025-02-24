
import axios from "axios";
import {useFormik } from "formik";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Usercontext } from "../../Context/usercontext";

export default function LogIn() {
   let {setUserlogin} = useContext(Usercontext)
  const [apidata, setapidata] = useState("")
  const [loading, setloading] = useState(false)
let navigate = useNavigate()


  async function handlelogin(formvalues){
    setloading(true)
   await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , formvalues)
   
    .then((response)=>{
      if( response.data.message === "success"){
        localStorage.setItem("UserToken" ,response?.data?.token)
        setUserlogin(response.data.token)
       
        navigate("/")
      }
      setloading(false)
     
    })
    .catch((err)=>{setapidata(err.response.data.message)
      setloading(false)
    })


  }
  let ValidationSchema = Yup.object({
    
    email: Yup.string().required("Mail Is Required").email("Not Valid Email"),
    password: Yup.string().required("Password Is Required") .matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/,`must be
* Start with a letter (either uppercase or lowercase).
* Be between 6 and 9 characters in total.
* Can only contain letters (A-Z or a-z) and numbers (0-9)`),
  

  })
  let formik = useFormik({
    initialValues: {
     
      email: "",
      password: "",
    
    },
    validationSchema : ValidationSchema ,
    onSubmit:handlelogin
  });
  return (
    <>
    
  

      <div className="w-10/12 mx-auto mt-20">
     
      
        <h1 className="text-3xl font-bold">LogIn now</h1>
        {apidata?<div className="p-4 m-4 text-sm  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{apidata}</span> .
</div>:null}
{loading?<div className="bg-slate-100 text-center py-60  w-full h-screen"><i className="  text-6xl fa-solid fa-spinner fa-spin"></i></div>:<form onSubmit={formik.handleSubmit}>
       

       <div className="mt-5">
         <label
           htmlFor="email"
           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
         >
           Email :
         </label>
         <input
           type="email"
           name="email"
           id="email"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.email}
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder=""
           
         />
       </div>
       {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<span className="font-medium">{formik.errors.email}</span> .
</div>:null}

       <div className="mt-5">
         <label
           htmlFor="password"
           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
         >
           Password :
         </label>
         <input
         name="password"
           type="password"
           id="password"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.password}
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder=""
           
         />
       </div>
       {formik.errors.password &&  formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<span className="font-medium">{formik.errors.password}</span> .
</div>:null}
<div className="flex justify-between my-5">
<div className=" font-bold text-xl ">  
  <NavLink to={"/forget"} className="hover:text-green-600 transition-all duration-200"> forget your password ?</NavLink>
</div>
       <div className=" text-end">
         <button disabled ={!(formik.isValid && formik.dirty)} type="submit" className="border bg-main text-white py-3 px-12 rounded-xl">
           {loading?<i className="mx-1 fa-solid fa-spinner fa-spin"></i>: <p className="font-bold" >Log In</p> }
         
           
         </button>
       </div>
</div>


     </form>}
      
      </div>
    </>
  );
}
