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
            Authorization: 'Bearer d669ad6366aa64f56773be0483825f4c484c013463b9747662f0dee6fe068c486286209e0ddf7210dadcb668fa2a9315793ae3c9d22f8047a5748eeb148d4e6556287f972c9a5c5c94f9c16fa42678d6ced8c78bc5e5463a329f0c0eebcf4514ede98fc323e5acfc03ed6593f69f648d531b39c3efe6db04c71527d5030db760',
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
