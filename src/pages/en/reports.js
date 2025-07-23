import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero';
import Layout from '../../components/layout';
import Accordion from '../../components/AccordionV2';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import { useLocalization } from '../../context/LocalizationContext';
import Seo from '../../components/seo';
import Loader from '../../components/loader';
import { FormattedMessage } from 'react-intl';

const Reports = () => {
  const { locale } = useLocalization();
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState({
    arabic: 'التقارير', 
    english: 'Reports'
  });

  useEffect(() => {
    const fetchPageData = async () => {
      setIsLoading(true);
      const token = 'd669ad6366aa64f56773be0483825f4c484c013463b9747662f0dee6fe068c486286209e0ddf7210dadcb668fa2a9315793ae3c9d22f8047a5748eeb148d4e6556287f972c9a5c5c94f9c16fa42678d6ced8c78bc5e5463a329f0c0eebcf4514ede98fc323e5acfc03ed6593f69f648d531b39c3efe6db04c71527d5030db760';
    
      try {
        const response = await fetch(`https://strong-nest-c09ad17fab.strapiapp.com/api/pages/?filters[custom_slug][$eq]=reports&populate[sections][populate][section_content][populate]=*&locale=${locale}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPageData(data);
      } catch (error) {
        console.error('Error fetching page data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageData();
  }, [locale]);

  if (isLoading) {
    return <Loader/>;
  }
  if (!pageData || !pageData.data) {
    return <div>Error loading page data</div>;
  }

  const { attributes } = pageData.data[0];
  const { meta_title, meta_description, sections } = attributes;

  const heroSection = sections.data.find(section => 
    section.attributes.section_content.some(item => item.__component === 'blocks.hero-section')
  );

  const heroContent = heroSection?.attributes.section_content.find(item => item.__component === 'blocks.hero-section');

  const handleFilterChange = (arabicFilter, englishFilter) => {
    setActiveFilter({ arabic: arabicFilter, english: englishFilter });
  };

  // Helper function to determine if a button is active
  const isActiveButton = (arabicText, englishText) => 
    activeFilter.arabic === arabicText && activeFilter.english === englishText;

  return (
    <Layout>
      <ScrollToTopButton />
      <Seo title={meta_title} description={meta_description} />
      
      {heroContent && (
        <Hero
          title={heroContent.title}
          subTitle={heroContent.subtitle}
        />
      )}

      {sections.data.map((section) => (
        <section key={section.id} className="assetManagement-accordion Reports-sec">
          <h3>{section.attributes.section_title}</h3>
          <div className='Reports-button'>
            <button 
              onClick={() => handleFilterChange('التقارير', 'Reports')}
              className={isActiveButton('التقارير', 'Reports') ? 'active' : ''}
            >
              <FormattedMessage id="Reports-button"/>
            </button>
            <button 
              onClick={() => handleFilterChange('البيانات المالية', 'Financial Data')}
              className={isActiveButton('البيانات المالية', 'Financial Data') ? 'active' : ''}
            >
              <FormattedMessage id="Financial-button"/>
            </button>
            <button 
              onClick={() => handleFilterChange('الركيزة', 'Pillar')}
              className={isActiveButton('الركيزة', 'Pillar') ? 'active' : ''}
            >
              <FormattedMessage id="Pillar-button"/>
            </button>
          </div>
          <div className="assetManagement-accordion-container">
            {section.attributes.section_content
              .filter(item => item.__component === 'test.accordion')
              .filter(item => 
                activeFilter.arabic === '' && activeFilter.english === '' 
                || item.title.includes(activeFilter.arabic) 
                || item.title.includes(activeFilter.english)
              )
              .map((item, index) => (
                <Accordion
                  key={index}
                  title={item.title}
                  links={item.accordion_link}
                />
              ))}
          </div>
        </section>
      ))}
    </Layout>
  );
};

export default Reports;