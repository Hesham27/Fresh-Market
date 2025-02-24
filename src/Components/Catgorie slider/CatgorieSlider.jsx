import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import Mainslider from '../MainSlider/Mainslider'


export default function CatgorieSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:6,
        slidesToScroll: 1,
        autoplay: true ,
        responsive: [
            {
              breakpoint: 1024,  
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 768, 
              settings: {
                slidesToShow: 2,
              },
            },
          ],
      };
           const [loading, setloading] = useState(true)
      
      const [categories, setcategories] = useState([])
      function getCatgorie(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then(({data})=>{
            setcategories(data.data)
          setloading(false)
        })
        .catch((err)=>{
          setloading(false)
        })
      }
      useEffect(()=>{getCatgorie()
        
      },[])
  return (<>
  {loading? <div  className="bg-slate-100  text-center py-60  w-full h-screen"><i className="  text-6xl fa-solid fa-spinner fa-spin"></i></div>: <div>
<Mainslider/>
<Slider className='md:w-auto  mx-auto w-10/12 overflow-hidden ' {...settings}>
    {categories.map((cat)=> <div key={cat._id} className=''>
        <img className='w-full h-[250px]' src={cat.image} alt={cat.name} />
        <h3 className='font-bold text-2xl'>{cat.name}</h3>
    </div> )}
    </Slider>
</div>  }

  </>
  


  )
}
