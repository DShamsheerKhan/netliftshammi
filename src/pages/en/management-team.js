import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import "../../components/style/Directors.css";
import Layout from "../../components/layout";
import Seo from '../../components/seo';
import { Link } from "gatsby";
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../../context/LocalizationContext';
import Loader from '../../components/loader';

const ManagementTeam = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://reports.itqancapital.com/api/pages/?filters[custom_slug][$eq]=management-team&locale=${locale}&populate[sections][populate][section_content][populate][Board_of_Directors_card][populate]=*&populate=image`, {
          headers: {
            'Authorization': 'Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38'
          }
        });
        const data = await response.json();
        setPageData(data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading) {
    return <Loader/>;
  }

  if (!pageData) {
    return <p>No data available</p>;
  }

  const heroSection = pageData.attributes.sections.data.find(section => 
    section.attributes.section_content.some(content => content.__component === "blocks.hero-section")
  );

  const managementTeamSection = pageData.attributes.sections.data.find(section => 
    section.attributes.section_content.some(content => content.__component === "blocks.itqan-capital-members")
  );

  const heroContent = heroSection?.attributes.section_content.find(content => content.__component === "blocks.hero-section");
  const managementTeamContent = managementTeamSection?.attributes.section_content.find(content => content.__component === "blocks.itqan-capital-members");

  return (
    <Layout>
      <Seo
        title={pageData.attributes.meta_title}
        description={pageData.attributes.meta_description}
      />
      <ScrollToTopButton />
      <section className='Board-hero-sec'>
        <div className='Board-hero-container'>
          <div className='Board-hero-title'>
            <h1>{heroContent?.title}</h1>
            <p>{heroContent?.subtitle}</p>
          </div>
        </div>
      </section>
      <section className='ManagementTeam-category-sec'>
        <div className='ManagementTeam-category-container'>
          <Link to={`/management-team/Managing-Director-&-CEO`}>
            <button><FormattedMessage id="Managing-Director-&-CEO" />
            </button>
          </Link>
          <Link to={`/management-team/Asset-Management`}>
            <button><FormattedMessage id="Asset-Management" /></button>
          </Link>
          <Link to={`/management-team/Investment-Banking`}>
            <button><FormattedMessage id="Investment-Banking" /></button>
          </Link>
          <Link to={`/management-team/Finance`}>
            <button><FormattedMessage id="Finance" /></button>
          </Link>
          <Link to={`/management-team/Operations`}>
            <button><FormattedMessage id="Operations" /></button>
          </Link>
          <Link to={`/management-team/Compliance`}>
            <button><FormattedMessage id="Compliance" /></button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ManagementTeam;