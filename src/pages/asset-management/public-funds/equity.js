import React, { useState, useEffect } from "react"
import axios from "axios"

import Layout from "../../../components/layout"
import Hero from "../../../components/Hero"
import Seo from "../../../components/seo"

import { useLocalization } from "../../../context/LocalizationContext"

import InfoPanel from "../../../components/InfoPanel"
import AccordionsV2 from "../../../components/AccordionV2"
import { FormattedMessage } from "react-intl"

const Equity = () => {
  const { locale } = useLocalization()
  const [pageData, setPageData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://reports.itqancapital.com/api/pages/?filters[custom_slug][%24eq]=asset-management&locale=${locale}&populate[sections][populate][section_content][populate][accordion_link][populate]=*&populate[sections][populate][section_content][populate][Content][populate]=*&populate[sections][populate][section_content][populate]=image`,
          {
            headers: {
              Authorization:
                "Bearer d669ad6366aa64f56773be0483825f4c484c013463b9747662f0dee6fe068c486286209e0ddf7210dadcb668fa2a9315793ae3c9d22f8047a5748eeb148d4e6556287f972c9a5c5c94f9c16fa42678d6ced8c78bc5e5463a329f0c0eebcf4514ede98fc323e5acfc03ed6593f69f648d531b39c3efe6db04c71527d5030db760",
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
  // console.log(pageData, "pageData")
  const EquityFundData = pageData?.sections.data.find(
    section =>
      section.attributes?.section_title === "صندوق الأسهم السعودية" ||
      section.attributes?.section_title ===
        "Saudi Equity Fund"
  )?.attributes
  const EquityFundHero = pageData?.sections.data.find(
    section =>
      section.attributes?.section_title === "equity header" ||
      section.attributes?.section_title ===
        "equity header"
  )?.attributes
  console.log(EquityFundHero?.section_content[0]?.title, "EquityFundHero")
  const imageUrl =
    EquityFundData?.section_content[0]?.Content[0]?.image?.data?.attributes
      ?.url
  // console.log(imageUrl, "imageUrl")
  const paragraphContent = EquityFundData?.section_content[0]?.Content[0]?.subtitle
    ? EquityFundData?.section_content[0]?.Content[0]?.subtitle
        .split("\n")
        .map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {index < array.length - 1 && (
              <>
                <br />
                <span></span>
              </>
            )}
          </React.Fragment>
        ))
    : null
  // console.log(paragraphContent, "paragraphContent")
  const accordionItems =
    EquityFundData?.section_content[0]?.accordion_link || []
  // console.log(accordionItems, "accordionItems")
  return (
    <Layout>
      <Seo
        title="خدمات إدارة الأصول في شركة إتقان كابيتال - صناديق الأسهم والمرابحات والعقارات"
        description="اكتشف خدمات إدارة الأصول التي تقدمها شركة إتقان كابيتال، بما في ذلك صناديق الأسهم والمرابحات وصندوق العقارات، واستفد من الاستشارات المالية المخصصة لتحقيق أهداف استثمارية متوافقة مع الضوابط الشرعية."
      />
      <Hero
        title={
          EquityFundHero?.section_content[0]?.title
        }
        subTitle={
          EquityFundHero?.section_content[0]?.subtitle
        }
      />
      <InfoPanel
        title={
          EquityFundData?.section_content[0]?.Content[0]?.title
        }
        paragraph={paragraphContent}
        none="none"
        button={
          <FormattedMessage
            id="fund_button"
            defaultMessage="Invest Smartly with Fund"
          />
        }
        image={imageUrl}
        links="/Individuals-login"
      />
      {accordionItems && accordionItems.length > 0 && (
        <section className="assetManagement-accordion">
          <div className="assetManagement-accordion-container">
            {accordionItems.map((item, index) => (
              <AccordionsV2
                key={index}
                title={item.title || ""}
                links={item.link || []}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  )
}

export default Equity
