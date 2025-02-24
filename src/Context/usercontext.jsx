import { createContext, useEffect, useState } from "react";

export let Usercontext = createContext(0)


export default function Usercontextprovider(props){
const [Userlogin, setUserlogin] = useState(null)


useEffect(()=>{
    if(localStorage.getItem('UserToken') !== null){

setUserlogin(localStorage.getItem("UserToken"))
    }

},[])
return <>
<Usercontext.Provider value={{Userlogin , setUserlogin}}>
    {props.children}
</Usercontext.Provider>
</> 
}
