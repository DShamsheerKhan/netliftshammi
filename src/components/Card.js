import React from 'react'
import "./style/PrivateBoxCard.css"
import { Link } from "gatsby"
import { useLocalization } from '../context/LocalizationContext';
import { LocalizedLink } from './LocalizedLink';
const Card = ({title,imgSrc,subtitle,Button,size,backgroundColor,spaceP,link,hidebutton}) => {
  const { locale } = useLocalization();

  return (
    <div className='PrivateBoxCard-sec'>
    <div className={`PrivateBoxCard-container ${backgroundColor}`}>
          <div className='PrivateBoxCard-image Card-image' style={{background:`url(${imgSrc})`}}>
                <h3>{title}</h3>
            </div>
          <div className='PrivateBoxCard-title'>
            <h3 style={{marginTop:"24px"}}>{title}</h3>
            <p>{subtitle}</p>
            <p style={{paddingTop:spaceP}}>{size}</p>
            <LocalizedLink to={`/${link}`}> <button style={{ display: hidebutton ? 'none' : 'inline-block' }}>
              {Button}
            </button></LocalizedLink>
            </div>
        </div>
    </div>
  )
}

export default Card
