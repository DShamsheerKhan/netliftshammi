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
                "Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38",
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
