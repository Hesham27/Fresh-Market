
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Carts from './Components/Carts/Carts'
import WishList from './Components/WishList/WishList'
import Proudect from './Components/Proudect/Proudect'
import Catgories from './Components/Catgories/Catgories'
import Brands from './Components/Brands/Brands'
import LogIn from './Components/LogIn/LogIn'
import Regest from './Components/Regest/Regest'
import NotFound from './Components/NotFound/NotFound'
import ForgetPass from './Components/ForgetPass/ForgetPass'
import Usercontextprovider from './Context/usercontext'
import ProtectRouting from './Components/ProtictRouting/ProtectRouting'
import ProudectDetalies from './Components/ProudectDetalies/ProudectDetalies'
import { CartConextProvider } from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import PaymentForm from './Components/PaymentForm/PaymentForm'
import { WislListConextProvider } from './Context/WishListContext'
import VerifyCode from './Components/verifyResetCode/VerifyCode'
VerifyCode

function App() {

  let router =createBrowserRouter([{
    path: "/" ,element :<Layout/> , children :[{index:true , element :<ProtectRouting><Home/></ProtectRouting>  },
      {path: "/cart" , element: <ProtectRouting><Carts/></ProtectRouting>  },
      {path:"/WishList" , element:<ProtectRouting><WishList/></ProtectRouting> },
      {path:"/proudect" , element:<ProtectRouting><Proudect/></ProtectRouting> },
      {path:"/Catgories" , element: <ProtectRouting><Catgories/></ProtectRouting>},
      {path:"/Brands" , element: <ProtectRouting><Brands/></ProtectRouting>},
      {path:"/PaymentForm" , element: <ProtectRouting><PaymentForm/></ProtectRouting>},
      {path:"/proddetal/:id" , element: <ProtectRouting><ProudectDetalies/></ProtectRouting>},

      {path:"/login" , element: <LogIn/>},
      {path:"/verifyCode" , element: <VerifyCode/>},
      {path:"/Regest" , element: <Regest/>},
      {path:"/forget" ,element: <ForgetPass/>},
      {path:"*" , element:<NotFound/>}

    ]
  }])

  return (
    <>
    <WislListConextProvider>

    <CartConextProvider>
    <Usercontextprovider>
<RouterProvider router={router}></RouterProvider>
<Toaster/>
</Usercontextprovider>

    </CartConextProvider>
 

    </WislListConextProvider>

    </>
  )
}

export default App
