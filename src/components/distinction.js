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
        const response = await axios.get(`https://dainty-brigadeiros-5e00ce.netlify.app/api/pages/?filters[custom_slug][$eq]=home_page&populate[sections][populate][section_content][populate][single_card][populate]=*&locale=${locale}&populate=image`, {
          headers: {
            Authorization: 'Bearer ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68',
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
