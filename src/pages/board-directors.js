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
          `https://dainty-brigadeiros-5e00ce.netlify.app//api/pages/?filters[custom_slug][$eq]=board-directors&populate[sections][populate][section_content][populate]=*&locale=${locale}&populate=image`,
          {
            headers: {
              Authorization: `Bearer ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68`
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
