import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../../context/LocalizationContext';
import Loader from '../../components/loader';

const Board = ({ pageContext, location }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useLocalization();
  const currentLocale = pageContext.locale || locale;

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://strong-nest-c09ad17fab.strapiapp.com/api/pages/?filters[custom_slug][$eq]=board&locale=${locale}&populate[sections][populate][section_content][populate][Board_of_Directors_card][populate]=*&populate=image`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38',
            },
          }
        );
        const data = await response.json();
        setPageData(data.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [currentLocale]);

  // Function to generate localized URLs
  const getLocalizedUrl = (path) => {
    const urlParts = location.pathname.split('/').filter(Boolean);
    urlParts[0] = currentLocale;
    return '/' + urlParts.join('/') + path;
  };

  if (loading) {
    return <Loader/>;
  }

  if (!pageData) {
    return <p>No data available</p>;
  }

  const sections = pageData.attributes.sections.data;
  const heroSection = sections.find(section => section.attributes.custom_slug === "board" && section.attributes.section_content[0].__component === "blocks.hero-section");
  const boardSection = sections.find(section => section.attributes.custom_slug === "board" && section.attributes.section_content[0].__component === "blocks.itqan-capital-members");

  const directors = boardSection?.attributes.section_content[0].Board_of_Directors_card || [];

  return (
    <Layout>
      <Seo
        title={pageData.attributes.meta_title}
        description={pageData.attributes.meta_description}
      />
      <ScrollToTopButton />
      <section className="Board-hero-sec">
        <div className="Board-hero-container">
          <div className="Board-hero-title">
            <h1>{heroSection?.attributes.section_content[0].title}</h1>
            <p>{heroSection?.attributes.section_content[0].subtitle}</p>
          </div>
        </div>
      </section>
      <section className="director-card-sec">
        <h3>{boardSection?.attributes.section_content[0].title}</h3>
        <div className="director-card-container">
          {directors.map((director) => {
            const profileImageUrl = director.image?.data?.attributes?.formats?.small?.url || '/default-profile.png';
            return (
              <Link
              key={director.id}
              to={`../team?slug=${director.slug}`}
              className="director-card"
            >
                <img 
  src={profileImageUrl} 
  alt={director.name} 
  style={{ display: profileImageUrl === "/default-profile.png" ? "none" : "" }}
/> 
                <div className="director-card-info">
                  <h4>{director.name}</h4>
                  <p>{director.position}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Board;