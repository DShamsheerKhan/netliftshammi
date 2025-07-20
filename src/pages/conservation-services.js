import React, { useState, useEffect } from "react"
import { FormattedMessage } from "react-intl"
import Hero from "../components/Hero"
import Layout from "../components/layout"
import "../components/style/ConservationServices.css"
import ScrollToTopButton from "../components/ScrollToTopButton"
import Seo from "../components/seo"
import axios from "axios"
import { useLocalization } from "../context/LocalizationContext"
import Loader from "../components/loader"

const ConservationServices = () => {
  const [pageData, setPageData] = useState(null)
  const { locale } = useLocalization()

  const fetchPageData = async () => {
    const baseUrl =
      "https://dainty-brigadeiros-5e00ce.netlify.app//api/pages/"
    const queryParams = `?filters[custom_slug][$eq]=conservation-services&locale=${locale}&populate[sections][populate][section_content][populate][subtitle][populate]=*`
    const token =
      "ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68"

    try {
      const response = await axios.get(baseUrl + queryParams, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data[0]
    } catch (error) {
      console.error("Error fetching page data:", error)
      return null
    }
  }

  useEffect(() => {
    fetchPageData().then(data => setPageData(data))
  }, [locale])

  if (!pageData) return <Loader />

  const { attributes } = pageData
  const heroSection = attributes.sections.data.find(
    section =>
      section.attributes.custom_slug === "conservation-services" &&
      section.attributes.section_content[0].__component ===
        "blocks.hero-section"
  )
  const contentSection = attributes.sections.data.find(
    section =>
      section.attributes.custom_slug === "conservation-services" &&
      section.attributes.section_content[0].__component === "blocks.subtitle"
  )
  const renderSubtitle = subtitleContent => {
    if (!subtitleContent || !Array.isArray(subtitleContent)) return null

    return subtitleContent.map((paragraph, index) => {
      if (paragraph.type === "paragraph") {
        return (
          <p key={index}>
            {paragraph.children.map(
              (child, childIndex) =>
                child.text || (
                  /* handle empty text gracefully */ <span key={childIndex}>
                    &nbsp;
                  </span>
                )
            )}
          </p>
        )
      }
      return null // Just in case we encounter any other type, returning null.
    })
  }

  return (
    <Layout>
      <Seo
        title={attributes.meta_title}
        description={attributes.meta_description}
      />
      <ScrollToTopButton />
      <Hero
        title={heroSection.attributes.section_content[0].title}
        subTitle={heroSection.attributes.section_content[0].subtitle}
      />
      <section className="Conservation-Services-card-sec">
        <div className="Conservation-Services-card-container">
          <div className="Conservation-Services-card-title">
            <p>
              {" "}
              {renderSubtitle(
                contentSection.attributes.section_content[0].subtitle
              )}{" "}
              {/* Call to rendering function */} {/* Use the new function */}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ConservationServices
