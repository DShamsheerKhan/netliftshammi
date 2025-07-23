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
              Authorization: `Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38`
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
