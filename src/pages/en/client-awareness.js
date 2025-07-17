import React, { useState, useEffect } from 'react';
import Layout from "../../components/layout";
import ScrollToTopButton from '../../components/ScrollToTopButton';
import Hero from '../../components/Hero';
import "../../components/style/ClientAwareness.css";
import { Link } from "gatsby";
import Seo from '../../components/seo';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import { useLocalization } from '../../context/LocalizationContext';
import Loader from '../../components/loader';

const SecurityCard = ({ title, hoverTitle, pdfLink, imageSrc, hoverImageSrc }) => {
  const [content, setContent] = useState(title);
  const [imgSrc, setImgSrc] = useState(imageSrc);
  const handleMouseEnter = () => {
    setContent(hoverTitle);
    setImgSrc(hoverImageSrc);
  };
  const handleMouseLeave = () => {
    setContent(title);
    setImgSrc(imageSrc);
  };
  return (
    <Link target="_blank" to={pdfLink}>
      <div 
        className='Reports-data-single-card security-single-card'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
          <img src={imgSrc} alt="" />
          <p>{content}</p>
      </div>
    </Link>
  );
};
const ClientAwareness = () => {
  const [pageData, setPageData] = useState(null);
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://reports.itqancapital.com/api/pages/?filters[custom_slug][$eq]=client-awareness&locale=${locale}&populate[sections][populate][section_content][populate]=*&populate=image`,
          {
            headers: {
              Authorization: 'Bearer d669ad6366aa64f56773be0483825f4c484c013463b9747662f0dee6fe068c486286209e0ddf7210dadcb668fa2a9315793ae3c9d22f8047a5748eeb148d4e6556287f972c9a5c5c94f9c16fa42678d6ced8c78bc5e5463a329f0c0eebcf4514ede98fc323e5acfc03ed6593f69f648d531b39c3efe6db04c71527d5030db760'
            }
          }
        );
        setPageData(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  if (!pageData) {
    return <Loader/>;
  }
  const heroSection = pageData.attributes.sections.data.find(
    section => section.attributes.section_content[0].__component === 'blocks.hero-section'
  );
  const securityCards = pageData.attributes.sections.data.find(
    section => section.attributes.section_content[0].__component === 'blocks.security-card'
  );
  return (
    <Layout>
      <Seo
        title={pageData.attributes.meta_title}
        description={pageData.attributes.meta_description}
      />
      <ScrollToTopButton />
      <Hero
        title={heroSection.attributes.section_content[0].title}
        subTitle={heroSection.attributes.section_content[0].subtitle}
      />
      <section className='Reports-data-sec'>
        <div className='Reports-data-container'>
          <div className='Reports-data-title'>
            {/* Add translated title here if needed */}
          </div>
          <div className='Reports-data-cards security-cards'>
            {securityCards.attributes.section_content.map((card, index) => (
              <SecurityCard
                key={index}
                title={card.title}
                hoverTitle={card.hover_title}
                pdfLink={card.Pdf_link}
                imageSrc={`${card.image.data.attributes.url}`}
                hoverImageSrc={`${card.hover_image.data.attributes.url}`}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default ClientAwareness;