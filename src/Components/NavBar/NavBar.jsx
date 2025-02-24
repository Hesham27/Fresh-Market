import React, { useContext } from "react";
import logo from "../../assets/freshcart-logo.svg";
import {  NavLink, useNavigate } from "react-router-dom";
import { Usercontext } from "../../Context/usercontext";
import { CartConext } from "../../Context/CartContext";
 
export default function NavBar() {
  let navigate = useNavigate()
  let {Cart} = useContext(CartConext)
 
  let {Userlogin , setUserlogin} = useContext(Usercontext)
  function logout(){
    localStorage.removeItem("UserToken")
    setUserlogin(null)
    navigate("/login")
  }
  return (
    <>
      <nav className="bg-white z-50 fixed top-0 left-0 right-0 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap  md:items-center justify-between mx-auto p-4">
          <img src={logo} className="h-8" alt="Logo" />

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full  lg:block lg:w-auto"
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col text-center p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white">
             {Userlogin !== null?<>
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-whiterounded-sm lg:bg-transparent  lg:p-0 "
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className="block py-2 px-3 text-whiterounded-sm lg:bg-transparent  lg:p-0 "
                >
                  Cart
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/WishList"
                  className="block py-2 px-3 text-whiterounded-sm lg:bg-transparent  lg:p-0 "
                >
                  Wish List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/proudect"
                  className="block py-2 px-3 text-whiterounded-sm lg:bg-transparent  lg:p-0 "
                >
                  Proudect
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Catgories"
                  className="block py-2 px-3 text-whiterounded-sm lg:bg-transparent  lg:p-0 "
                >
                  Catgories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Brands"
                  className="block py-2 px-3 text-whiterounded-sm lg:bg-transparent  lg:p-0 "
                >
                  Brands
                </NavLink>
              </li>
             </>:null}
      {Userlogin == null ?<>
        <li>
                <NavLink
                  to="/login"
                  className="block py-2 px-3 text-whiterounded-sm lg:bg-transparent  lg:p-0 "
                >
                  Log In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Regest"
                  className="block py-2 px-3 text-whiterounded-sm lg:bg-transparent  lg:p-0 "
                >
                  Register
                </NavLink>
              </li>
      </>:
      
      <>  <li >
         <NavLink to={"/cart"}>
               
                   <i className=" text-3xl fa-solid fa-cart-shopping"></i>
                   <span className="bg-main relative top-[-15px] right-[10px] text-white p-1 rounded-lg">{Cart?.numOfCartItems}</span>
               
               
              </NavLink>
     </li>
      
      
       <NavLink to={"/login"}> 
       <li>
       
                <span
                 onClick={logout}
                  className="block py-2 px-3 text-whiterounded-sm lg:bg-transparent  lg:p-0 cursor-pointer "
                >

                  Log Out 
                </span>


              </li> 
              </NavLink>

           
            
      
      </>   
              }
            
             
            </ul>
           

          </div>
          
        </div>
        
      </nav>
      
    </>
  );
}
