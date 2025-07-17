import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

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
          `https://reports.itqancapital.com/api/pages/?filters[custom_slug][$eq]=board&locale=${locale}&populate[sections][populate][section_content][populate][Board_of_Directors_card][populate]=*&populate=image`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68',
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