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
          `https://app.netlify.com/projects/dainty-brigadeiros-5e00ce/deploys/api/pages/?filters[custom_slug][$eq]=client-awareness&locale=${locale}&populate[sections][populate][section_content][populate]=*&populate=image`,
          {
            headers: {
              Authorization: 'Bearer ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68'
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