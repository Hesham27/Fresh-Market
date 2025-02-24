import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  let navigate = useNavigate();

  function handelForgetPass(formValues) {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, formValues)
      .then((response) => {
        console.log(response?.data?.statusMsg);
        
       
       
        if (response?.data?.statusMsg === "success") {
          navigate("/verifyCode");
          setIsLoading(false);
          
          
        }
      }
    )
      
      .catch((err) => {
        setIsLoading(false);
        setApiError(err?.response?.data?.message);
      });
    
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handelForgetPass
  });
  return (
    <>
      <div className="mt-32">
        {apiError ? (
          <div
            classname="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}

        <h2 className=" m-5 text-xl md:text-3xl font-bold">please enter your verification code</h2>
        <form className="w-11/12 mx-auto" onSubmit={formik.handleSubmit} >
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

          <div className="flex justify-between flex-wrap my-5 ">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}