import React from 'react'
import "./style/ResearchLibrary.css"
const ResearchLibraryBox = ({imgSrc, title, description}) => {
  return (
    <div className='ResearchLibraryBox-sec'>
        <img src={imgSrc}  />
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
  )
}

export default ResearchLibraryBox