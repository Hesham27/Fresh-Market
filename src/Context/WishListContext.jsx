import axios from "axios";
import { createContext } from "react";

export let WislListConext = createContext()


export function WislListConextProvider(props){
    let headers = {
        token : localStorage.getItem('UserToken')
    }

    function removeWishItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers:headers})
        .then((response)=>response)
      }
  

    function getWishListItem(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:headers})
         .then((response)=>response)
          
     }

    function addToWishList(productId){
        return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId:productId
        },{headers:headers})
        .then((response)=>response)
    }
    
    

      return <WislListConext.Provider value={{addToWishList , getWishListItem , removeWishItem}}>
    {props.children}
      </WislListConext.Provider>
    }