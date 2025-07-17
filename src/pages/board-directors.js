import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../components/layout";
import Hero from '../components/Hero';
import "../components/style/index.css";
import { FormattedMessage } from 'react-intl';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Seo from '../components/seo';
import { useLocalization } from '../context/LocalizationContext';

const BoardDirectors = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [data, setdata] = useState('');
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://reports.itqancapital.com/api/pages/?filters[custom_slug][$eq]=board-directors&populate[sections][populate][section_content][populate]=*&locale=${locale}&populate=image`,
          {
            headers: {
              Authorization: `Bearer d669ad6366aa64f56773be0483825f4c484c013463b9747662f0dee6fe068c486286209e0ddf7210dadcb668fa2a9315793ae3c9d22f8047a5748eeb148d4e6556287f972c9a5c5c94f9c16fa42678d6ced8c78bc5e5463a329f0c0eebcf4514ede98fc323e5acfc03ed6593f69f648d531b39c3efe6db04c71527d5030db760`
            }
          }
        );
        const sections = response.data.data[0].attributes.sections.data;
        setdata(response.data.data[0].attributes)
        if (sections.length > 0) {
          const imageData = sections[0].attributes.section_content[0].image.data.attributes.url;
          setImageUrl(`${imageData}`);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <Layout>
      <Seo
        title={data.meta_title}
        description={data.meta_description}
      />
      <ScrollToTopButton />
      <Hero
        title={data.page_title}
      />
      <section className='BoardDirectors-sec'>
        {imageUrl ? <img src={imageUrl} alt="Organizational Structure" /> : <p>Loading...</p>}
      </section>
    </Layout>
  );
}

export default BoardDirectors;
