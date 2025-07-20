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
          `https://dainty-brigadeiros-5e00ce.netlify.app/api/pages/?filters[custom_slug][%24eq]=asset-management&locale=${locale}&populate[sections][populate][section_content][populate][accordion_link][populate]=*&populate[sections][populate][section_content][populate][Content][populate]=*&populate[sections][populate][section_content][populate]=image`,
          {
            headers: {
              Authorization:
                "Bearer ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68",
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
