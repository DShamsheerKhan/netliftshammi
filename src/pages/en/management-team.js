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
            'Authorization': 'Bearer d669ad6366aa64f56773be0483825f4c484c013463b9747662f0dee6fe068c486286209e0ddf7210dadcb668fa2a9315793ae3c9d22f8047a5748eeb148d4e6556287f972c9a5c5c94f9c16fa42678d6ced8c78bc5e5463a329f0c0eebcf4514ede98fc323e5acfc03ed6593f69f648d531b39c3efe6db04c71527d5030db760'
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