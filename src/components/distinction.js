import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import "./style/distinction.css";
import { useLocalization } from '../context/LocalizationContext';

const Distinction = () => {
  const [cardsData, setCardsData] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://reports.itqancapital.com/api/pages/?filters[custom_slug][$eq]=home_page&populate[sections][populate][section_content][populate][single_card][populate]=*&locale=${locale}&populate=image`, {
          headers: {
            Authorization: 'Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38',
          },
        });
        // Assuming response structure matches the provided API format

        const pageData = response.data?.data[0].attributes;
        setPageTitle(response.data.data[0].attributes.sections.data[4].attributes.section_content[0].title);

        // Extracting single card data from sections
        const singleCardData = pageData.sections.data.find(section => section.attributes.custom_slug === 'Company_Values_Spotlight');
        if (singleCardData) {
          const cards = singleCardData.attributes.section_content[0].single_card;
          setCardsData(cards);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='distinguishes-sec'>
      <div className='distinguishes-container'>
        <div className='distinguishes-title'>
          <h1>{pageTitle}</h1>
        </div>
        <div className='distinguishes-card'>
        {cardsData.map((card, index) => {
            return (
              <div className='distinguishes-single-card' key={index}>
                <img src={`${card.image.data.attributes.url}`} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Distinction;
