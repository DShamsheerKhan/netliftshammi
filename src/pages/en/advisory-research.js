import React, { useState, useEffect } from 'react';
import Layout from "../../components/layout";
import ScrollToTopButton from '../../components/ScrollToTopButton';
import Hero from '../../components/Hero';
import Seo from '../../components/seo';
import "../../components/style/ConservationServices.css";
import axios from 'axios';
import { useLocalization } from '../../context/LocalizationContext';
import Loader from '../../components/loader';

const AdvisoryResearch = () => {
  const [pageData, setPageData] = useState(null);
  const { locale } = useLocalization();

  const fetchPageData = async () => {
    const baseUrl = 'https://reports.itqancapital.com/api/pages/';
    const queryParams = `?filters[custom_slug][$eq]=advisory-research&locale=${locale}&populate[sections][populate][section_content][populate]=*&populate=image`;
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
  }, [locale]);

  if (!pageData) return <Loader/>;

  const { attributes } = pageData;
  const contentSection = attributes.sections.data[0].attributes.section_content[0];

  // Function to add line breaks
  const addLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <Layout>
      <Seo
        title={attributes.meta_title}
        description={attributes.meta_description}
      />
      <ScrollToTopButton />
      <Hero title={attributes.page_title} />
      <div className='Contact-footer-section-wallpaper'>
        <section className='AdvisoryResearch-sec'>
          <div className='AdvisoryResearch-card-title'>
            {/* Title section, if any */}
          </div>
          <div className='AdvisoryResearch-container'>
            <div className='AdvisoryResarch-img'>
              <img src={`${contentSection.image.data.attributes.url}`} alt={contentSection.title} />
            </div>
            <div className='AdvisoryResarch-info'>
              <h1>{contentSection.title}</h1>
              <p>{addLineBreaks(contentSection.subtitle)}</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AdvisoryResearch;