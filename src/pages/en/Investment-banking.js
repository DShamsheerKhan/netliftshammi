import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Hero from '../../components/Hero';
import Layout from "../../components/layout";
import PrivateBox from '../../components/Card';
import InfoPanel from '../../components/InfoPanel';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import "../../components/style/InvestmentBanking.css"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Seo from '../../components/seo';
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../../context/LocalizationContext';
import Loader from '../../components/loader';

const InvestmentBanking = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dainty-brigadeiros-5e00ce.netlify.app//api/pages/?filters[custom_slug][$eq]=Investment-banking&locale=${locale}&populate[sections][populate][section_content][populate]=*&populate=image`, {
          headers: {
            Authorization: 'Bearer ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68'
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