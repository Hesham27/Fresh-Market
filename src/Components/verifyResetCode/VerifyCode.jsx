
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyCode()  {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  function handelForgetPass(formValues) {
    setIsLoading(true);
    axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        formValues
      )
      .then((response) => {
        console.log(response)
        if (response?.data?.status === "Success") {
          
          navigate("/");
          
        }
        
        setIsLoading(false);
      })
    
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handelForgetPass,
  });
  return (
    <>
      <div className="w-10/12 mx-auto mt-32">
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}

        <h2 className="m-5 text-xl md:text-3xl font-bold">reset your account password</h2>
        <form onSubmit={formik.handleSubmit} className="w-11/12 mx-auto ">
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="resetCode"
              id="resetCode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            
            />
            <label
              htmlFor="resetCode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Code
            </label>
          </div>
          <div className="flex justify-between flex-wrap my-5">
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