import React from 'react'
import "./style/PrivateBoxCard.css"
import { Link } from "gatsby"
import { useLocalization } from '../context/LocalizationContext';
import { LocalizedLink } from './LocalizedLink';

const PrivateBoxCard = ({title,imgSrc,subtitle,Button,size,backgroundColor,spaceP,link,hidebutton}) => {
  const { locale } = useLocalization();

  return (
    <div className='PrivateBoxCard-sec'>
    <div className={`PrivateBoxCard-container ${backgroundColor}`}>
          <div className='PrivateBoxCard-image'>
            <img src={imgSrc}/>
          </div>
          <div className='PrivateBoxCard-title'>
            <h3>{title}</h3>
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

export default PrivateBoxCard
