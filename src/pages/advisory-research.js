import React, { useState, useEffect } from 'react';
import Layout from "../components/layout";
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import Seo from '../components/seo';
import "../components/style/ConservationServices.css";
import axios from 'axios';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const AdvisoryResearch = () => {
  const [pageData, setPageData] = useState(null);
  const { locale } = useLocalization();

  const fetchPageData = async () => {
    const baseUrl = 'https://dainty-brigadeiros-5e00ce.netlify.app/api/pages/';
    const queryParams = `?filters[custom_slug][$eq]=advisory-research&locale=${locale}&populate[sections][populate][section_content][populate]=*&populate=image`;
    const token = 'ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68';

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