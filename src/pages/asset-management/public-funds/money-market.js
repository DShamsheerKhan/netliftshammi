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
