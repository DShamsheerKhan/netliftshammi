import React from 'react'

const Hero = ({title, subTitle,bgcolor,hidep}) => {
  return (
    <section className='aboutus-hero-sec' style={{backgroundColor: `${bgcolor}`}}>
    <div className='aboutus-hero-container'>
      <div className='aboutus-hero-title'>
        <h1>{title}</h1>
        <p style={{display:{hidep}}}> {subTitle}</p>
      </div>
    </div>
  </section>
  )
}

export default Hero