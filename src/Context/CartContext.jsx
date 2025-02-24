import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartConext = createContext()

export function CartConextProvider(props){
    let headers = {
        token : localStorage.getItem('UserToken')


    }

    const [Cart, setCart] = useState(null)
    function chekOut(CardId , url ,formvalues){
return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CardId}?url=${url}`,{shippingAddress:formvalues},{headers})
.then((response)=>response)
    }
    
    function updateCart(productId ,count){
      return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:count},{headers:headers})
      .then((response)=>response)
     
    }


    function removeCart(productId){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers:headers})
      .then((response)=>response)
     
    }

    function getCartItem(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:headers})
        .then((response)=>response)
         
    }
 function addToCart(productId){
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:productId
    },{headers:headers})
    .then((response)=>response)
}
async function GetCarts(){
  let response = await getCartItem()
  setCart(response.data)
}

useEffect(()=>{
  GetCarts()
},[])

  return <CartConext.Provider value={{ Cart ,setCart, addToCart , getCartItem , removeCart ,updateCart , chekOut }}>
{props.children}
  </CartConext.Provider>
}