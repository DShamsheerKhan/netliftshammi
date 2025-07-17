import React, { useState, useEffect } from "react"
import axios from "axios"

import Layout from "../../../components/layout"
import Hero from "../../../components/Hero"
import Seo from "../../../components/seo"

import { useLocalization } from "../../../context/LocalizationContext"

import InfoPanel from "../../../components/InfoPanel"
import AccordionsV2 from "../../../components/AccordionV2"
import { FormattedMessage } from "react-intl"

const MoneyMarket = () => {
  const { locale } = useLocalization()
  const [pageData, setPageData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://app.netlify.com/projects/dainty-brigadeiros-5e00ce/deploys/api/pages/?filters[custom_slug][%24eq]=asset-management&locale=${locale}&populate[sections][populate][section_content][populate][accordion_link][populate]=*&populate[sections][populate][section_content][populate][Content][populate]=*&populate[sections][populate][section_content][populate]=image`,
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
  // console.log(pageData, "pageData")
  const MoneyMarketFundData = pageData?.sections.data.find(
    section =>
      section.attributes?.section_title === "صندوق المرابحات والصكوك" ||
      section.attributes?.section_title ===
        "Itqan Fund for Murabaha and Sukuk Fund"
  )?.attributes
  const MoneyMarketFundHeader = pageData?.sections.data.find(
    section =>
      section.attributes?.section_title === "money market header" ||
      section.attributes?.section_title ===
        "money market header"
  )?.attributes
  // console.log(MoneyMarketFundData, "MoneyMarketFundData")
  const imageUrl =
    MoneyMarketFundData?.section_content[0]?.Content[0]?.image?.data?.attributes
      ?.url
  // console.log(imageUrl, "imageUrl")
  const paragraphContent = MoneyMarketFundData?.section_content[0]?.Content[0]
    ?.subtitle
    ? MoneyMarketFundData?.section_content[0]?.Content[0]?.subtitle
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
    MoneyMarketFundData?.section_content[0]?.accordion_link || []
  // console.log(accordionItems, "accordionItems")
  return (
    <Layout>
      <Seo
        title="خدمات إدارة الأصول في شركة إتقان كابيتال - صناديق الأسهم والمرابحات والعقارات"
        description="اكتشف خدمات إدارة الأصول التي تقدمها شركة إتقان كابيتال، بما في ذلك صناديق الأسهم والمرابحات وصندوق العقارات، واستفد من الاستشارات المالية المخصصة لتحقيق أهداف استثمارية متوافقة مع الضوابط الشرعية."
      />
     <Hero
        title={
          MoneyMarketFundHeader?.section_content[0]?.title
        }
        subTitle={
          MoneyMarketFundHeader?.section_content[0]?.subtitle
        }
      />
      <InfoPanel
        title={
          MoneyMarketFundData?.section_content[0]?.Content[0]?.title || (
            <FormattedMessage
              id="fund_title"
              defaultMessage="Murabaha and Sukuk Fund"
            />
          )
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

export default MoneyMarket
