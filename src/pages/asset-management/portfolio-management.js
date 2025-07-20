import React, { useState, useEffect } from "react"
import axios from "axios"

import Layout from "../../components/layout"
import Hero from "../../components/Hero"
import Seo from "../../components/seo"

import { useLocalization } from "../../context/LocalizationContext"

import InfoPanel from "../../components/InfoPanel"
import AccordionsV2 from "../../components/AccordionV2"
import { FormattedMessage } from "react-intl"

const PortfolioManagement = () => {
    const { locale } = useLocalization()
  const [pageData, setPageData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://strong-nest-c09ad17fab.strapiapp.com/api/pages/?filters[custom_slug][%24eq]=asset-management&locale=${locale}&populate[sections][populate][section_content][populate][accordion_link][populate]=*&populate[sections][populate][section_content][populate][Content][populate]=*&populate[sections][populate][section_content][populate]=image`,
          {
            headers: {
              Authorization:
                "Bearer 6bd6af85d32da95f631a89f06f68ed9c05b785a52197a8c6484b87b2fb402160414499b19ee179791552c19a9a0a515a6c68233149179b39e01180f2a8cefeeed9f905bbdc597101ad02d8f76f62d3e3bc709f9ffb7864f04d60540a5f3cf46f06e46c2b71a24e457a355d1fa0f8aec9850b0e17e8e21a5263de6e72b40e9e31
            },
          }
        )
        setPageData(response.data.data[0].attributes)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [locale])
  const portfolioManagementData = pageData?.sections?.data[2].attributes.section_content[0]
  // console.log(portfolioManagementData,"portfolioManagementData")
  const privateSectionHeader = pageData?.sections?.data.find(section => 
    section.attributes?.section_title === "Portfolio Management Header" ||
    section.attributes?.section_title === "Portfolio Management Header"
  );
  const imageUrl = portfolioManagementData?.image?.data?.attributes?.url
  ? `${portfolioManagementData?.image?.data?.attributes?.url}`
  : "/Frame 139.png";
  return (
    <Layout>
      <Seo
        title="خدمات إدارة الأصول في شركة إتقان كابيتال - صناديق الأسهم والمرابحات والعقارات"
        description="اكتشف خدمات إدارة الأصول التي تقدمها شركة إتقان كابيتال، بما في ذلك صناديق الأسهم والمرابحات وصندوق العقارات، واستفد من الاستشارات المالية المخصصة لتحقيق أهداف استثمارية متوافقة مع الضوابط الشرعية."
      />
       <Hero
        title={
          privateSectionHeader?.attributes?.section_content[0]?.title
        }
        subTitle={
          privateSectionHeader?.attributes?.section_content[0]?.subtitle
        }
      />
      <section className='management-portfolios-sec'>
        <h2 className='boxes-title'>{portfolioManagementData?.title}</h2>
        <InfoPanel
          title={portfolioManagementData?.title}
          paragraph={portfolioManagementData?.subtitle.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
          button="Experience Our Unique Approach Now"
          image={imageUrl}
          revers="row-reverse"
          none="none"
          links="/Individuals-login"
        />
      </section>
    </Layout>
  )
}

export default PortfolioManagement
