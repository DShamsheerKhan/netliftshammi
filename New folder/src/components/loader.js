import React from 'react'
import "./style/loader.css"
import Loader from "../Json/Loader.json"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
const loader = () => {
  return (
    <section className="loader-sec">
    <div className="loader-container">
    <img src='/itqanLogo (2).svg'/>
     <Player
        autoplay
        loop
        src={Loader} 
        style={{ height: '100px', width: '100px' }} 
      >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>    
     
  </div>
  </section>
  )
}

export default loader