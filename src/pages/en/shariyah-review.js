import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from "gatsby";
import axios from 'axios';
import Layout from "../../components/layout";
import Hero from '../../components/Hero';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import "../../components/style/index.css";
import Seo from '../../components/seo';
import { useLocalization } from '../../context/LocalizationContext';
import Loader from '../../components/loader';

const SecurityCard = ({ defaultContent, hoverContent, defaultImgSrc, hoverImgSrc }) => {
  const [content, setContent] = useState(defaultContent);
  const [imgSrc, setImgSrc] = useState(defaultImgSrc);

  // Update both content and image source on hover
  const handleMouseEnter = () => {
    setContent(hoverContent);
    setImgSrc(hoverImgSrc);
  };

  // Revert to default content and image source when not hovered
  const handleMouseLeave = () => {
    setContent(defaultContent);
    setImgSrc(defaultImgSrc);
  };

  return (
    <div 
      className='Reports-data-single-card security-single-card ShariyahReview-security-single-card '
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
        <img src={imgSrc} alt="" />
        <p>{content}</p>
    </div>
  );
};

const ShariyahReview = () => {
  const [pageData, setPageData] = useState(null);
  const { locale } = useLocalization();

  const fetchPageData = async () => {
    const baseUrl = 'https://strong-nest-c09ad17fab.strapiapp.com/api/pages/';
    const queryParams = `?filters[custom_slug][$eq]=shariyah-review&locale=${locale}&populate[sections][populate][section_content][populate][button][populate]=*&populate[sections][populate][section_content][populate][Card_Pdf][populate]=*&populate[sections][populate][section_content][populate][Content_Card][populate]=*&populate=image`;
    const token = 'd669ad6366aa64f56773be0483825f4c484c013463b9747662f0dee6fe068c486286209e0ddf7210dadcb668fa2a9315793ae3c9d22f8047a5748eeb148d4e6556287f972c9a5c5c94f9c16fa42678d6ced8c78bc5e5463a329f0c0eebcf4514ede98fc323e5acfc03ed6593f69f648d531b39c3efe6db04c71527d5030db760';

    try {
      const response = await axios.get(baseUrl + queryParams, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data[0];
    } catch (error) {
      console.error('Error fetching page data:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchPageData().then(data => setPageData(data));
  }, [locale]); // Add locale as a dependency

  if (!pageData) return <Loader/>;

  const { attributes } = pageData;
  const sectionContent = attributes.sections.data[0].attributes.section_content[0];
  const contentCard = sectionContent.Content_Card[0];
  const cardPdf = sectionContent.Card_Pdf[0];
  const button = sectionContent.button[0];

  return (
    <Layout>
      <Seo 
         title={attributes.meta_title}
         description={attributes.meta_description}
      />

      <ScrollToTopButton />
      <Hero
        title={attributes.page_title}
      />
      <section className='ShariyahReview-sec'>
        <div className='ShariyahReview-container'>
          <section className={`infopanel-sec`}>
            <div className='infopanel-container' style={{flexDirection: "row-reverse"}}>
              <div className='infopanel-content ShariyahReview-content'>
                <h2>{contentCard.title}</h2>
                <p>{contentCard.subtitle}</p>
                <Link to={button.button_link} target="_blank">
                  <button>{button.button_title}</button>
                </Link>
                <Link to={cardPdf.Pdf_link} target="_blank"> 
                  <SecurityCard
                    defaultImgSrc={`${cardPdf.image.data.attributes.url}`}
                    hoverImgSrc={`${cardPdf.hover_image.data.attributes.url}`}
                    defaultContent={cardPdf.title}
                    hoverContent={cardPdf.hover_title}
                  />
                </Link>
              </div>
              <div className='infopanel-image'>
                <img src={`${contentCard.image.data.attributes.url}`} alt={contentCard.title} />
              </div>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default ShariyahReview;