import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Hero from '../components/Hero';
import Layout from "../components/layout";
import PrivateBox from '../components/Card';
import InfoPanel from '../components/InfoPanel';
import ScrollToTopButton from '../components/ScrollToTopButton';
import "../components/style/InvestmentBanking.css"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Seo from '../components/seo';
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const InvestmentBanking = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://reports.itqancapital.com/api/pages/?filters[custom_slug][$eq]=Investment-banking&locale=${locale}&populate[sections][populate][section_content][populate]=*&populate=image`, {
          headers: {
            Authorization: 'Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38'
          }
        });
        setPageData(response.data.data[0].attributes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <Loader/>;
  if (error) return <div>Error: {error}</div>;
  if (!pageData) return null;
  const { meta_title, meta_description, sections } = pageData;
  const contentCards = sections.data[0].attributes.section_content.filter(item => item.__component === "blocks.content-card");
  const contentTabs = sections.data[0].attributes.section_content.find(item => item.__component === "blocks.content-tabs");
  return (
   <Layout>
    <Seo
     title={meta_title}
     description={meta_description}
    />
    <ScrollToTopButton/>
    <Hero 
      title={sections.data[0].attributes.section_title}
    />
    <section className='investment-banking-sec'>
        <div className='investment-banking-title'>
        </div>
        <div className='investment-banking-container-card'>
          {contentCards.slice(0, 2).map((card, index) => (
            <PrivateBox
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              hidebutton="none"
              imgSrc={`${card.image.data.attributes.url}`}
              spaceP={index === 1 ? "25px" : undefined}
            />
          ))}
        </div>
        <div className='investment-banking-info-card'>
          <section className='infopanel-sec bg-infopanel-sec'>
            <div className='infopanel-container'>
              <div className='infopanel-content'>
                <h2>{contentTabs.content[0].title}</h2>
                <p>{contentTabs.content[0].subtitle}</p>
                <Tabs>
                  <TabList>
                    {contentTabs.tabs.map((tab, index) => (
                      <Tab key={index}>{tab.title}</Tab>
                    ))}
                  </TabList>
                  {contentTabs.tabs.map((tab, index) => (
                    <TabPanel key={index}>
                      <h2>{tab.subtitle}</h2>
                    </TabPanel>
                  ))}
                </Tabs>
              </div>
              
              <div className='infopanel-image tab-image'>
                <h2>{contentTabs.content[0].title}</h2>
              </div>
            </div>
          </section>
        </div>
        <div className='investment-banking-container-card'>
          {contentCards.slice(2).map((card, index) => (
            <PrivateBox
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              hidebutton="none"
              imgSrc={`${card.image.data.attributes.url}`}
              />
          ))}
        </div>
    </section>
   </Layout>
  )
}
export default InvestmentBanking