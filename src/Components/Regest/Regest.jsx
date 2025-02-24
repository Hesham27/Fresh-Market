import axios from "axios";
import {useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Usercontext } from "../../Context/usercontext";

export default function Regest() {
  const [apidata, setapidata] = useState("")
  const [loading, setloading] = useState(false)
let navigate = useNavigate()
 let {setUserlogin} = useContext(Usercontext)

  async function handleregst(formvalues){
    setloading(true)
   await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , formvalues)
   
    .then((response)=>{
      if( response?.data?.message === "success"){
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
    name: Yup.string().required('Name Is Required ').min(3 , "Name Min Length Is 3") .max(18,"Name Max Length Is 18"),
    email: Yup.string().required("Mail Is Required").email("Not Valid Email"),
    password: Yup.string().required("Password Is Required") .matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/,`must be
* Start with a letter (either uppercase or lowercase).
* Be between 6 and 9 characters in total.
* Can only contain letters (A-Z or a-z) and numbers (0-9)`),
    rePassword: Yup.string().required("RePassword Is Required").oneOf([Yup.ref("password")]) .matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, "re-Password pattern is inavalid"),
    phone:  Yup.string().required("Phone Is Required") .matches(/^01[0-2,5]{1}[0-9]{8}$/, "invalid Phone")

  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema : ValidationSchema ,
    onSubmit:handleregst
  });
  return (
    <>
    
  

      <div className="w-10/12 mx-auto mt-20">
     
      
        <h1 className="text-3xl font-bold">register now</h1>
        {apidata?<div className="p-4 m-4 text-sm  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{apidata}</span> .
</div>:null}
{loading?<div className="bg-slate-100 text-center py-60  w-full h-screen"><i className="  text-6xl fa-solid fa-spinner fa-spin"></i></div>:<form onSubmit={formik.handleSubmit}>
       
       <div className="mt-5">
         <label
           htmlFor="name"
           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
         >
           Name :
         </label>
         <input
         name="name"
           type="text"
           id="name"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.name}
          
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder=""
           
         />
       </div>
       {formik.errors.name &&formik.touched.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<span className="font-medium">{formik.errors.name}</span> .
</div>:null}
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
       <div className="mt-5">
         <label
           htmlFor="rePassword"
           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
         >
           Re-password :
         </label>
         <input
         name="rePassword"
           type="password"
           id="rePassword"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.rePassword}
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder=""
           
         />
       </div>
       {formik.errors.rePassword && formik.touched.rePassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<span className="font-medium">{formik.errors.rePassword}</span> .
</div>:null}
       <div className="mt-5">
         <label
           htmlFor="phone"
           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
         >
           Phone :
         </label>
         <input
         name="phone"
           type="tel"
           id="phone"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.phone}
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder=""
           
         />
       </div>
       {formik.errors.phone &&  formik.touched.phone? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<span className="font-medium">{formik.errors.phone}</span> .
</div>:null}
       <div className="my-5 text-end">
         <button disabled ={!(formik.isValid && formik.dirty)} type="submit" className="border border-black py-3 px-12 rounded-xl">
           {loading?<i className="mx-1 fa-solid fa-spinner fa-spin"></i>: "Register"}
         
           
         </button>
       </div>
     </form>}
      
      </div>
    </>
  );
}
