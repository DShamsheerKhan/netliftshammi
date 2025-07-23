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
          `https://strong-nest-c09ad17fab.strapiapp.com/api/pages/?filters[custom_slug][$eq]=client-awareness&locale=${locale}&populate[sections][populate][section_content][populate]=*&populate=image`,
          {
            headers: {
              Authorization: 'Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38'
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