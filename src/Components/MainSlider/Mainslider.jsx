import React from 'react'
import Slider from "react-slick";
import pic2 from "../../assets/pic2.jpg"
import pic1 from "../../assets/pic1.jpg"
import bag from "../../assets/bag.jpg"
import holder from "../../assets/holder.jpg"
import jellw from "../../assets/jellw.jpg"
export default function Mainslider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:1,
        slidesToScroll: 1,
        autoplay: true ,
       
      };
  return (
    
    <>
    <div className='row w-full  md:w-8/12 mx-auto '>
       
        <div className='w-3/4  '> 
        <Slider className='md:w-auto h-80 overflow-hidden ' {...settings}>
  <img  className="w-full h-80   " src={bag} alt="" />
  <img  className="w-full h-80 " src={holder} alt="" />
  <img  className="w-full " src={jellw} alt="" />
    </Slider>

        </div>
        <div className='w-1/4 '>
       <img className='w-full ' src={pic2} alt="" />
       <img className='w-full'  src={pic1} alt="" />
        </div>
      
    </div>
    </>
  )
}
