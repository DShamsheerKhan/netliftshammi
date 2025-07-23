import React, { useState, useEffect } from "react"
import { FormattedMessage } from "react-intl"
import Hero from "../../components/Hero"
import Layout from "../../components/layout"
import "../../components/style/ConservationServices.css"
import ScrollToTopButton from "../../components/ScrollToTopButton"
import Seo from "../../components/seo"
import axios from "axios"
import { useLocalization } from "../../context/LocalizationContext"
import Loader from "../../components/loader"

const ConservationServices = () => {
  const [pageData, setPageData] = useState(null)
  const { locale } = useLocalization()

  const fetchPageData = async () => {
    const baseUrl =
      "https://strong-nest-c09ad17fab.strapiapp.com/api/pages/"
    const queryParams = `?filters[custom_slug][$eq]=conservation-services&locale=${locale}&populate[sections][populate][section_content][populate][subtitle][populate]=*`
    const token =
      "d669ad6366aa64f56773be0483825f4c484c013463b9747662f0dee6fe068c486286209e0ddf7210dadcb668fa2a9315793ae3c9d22f8047a5748eeb148d4e6556287f972c9a5c5c94f9c16fa42678d6ced8c78bc5e5463a329f0c0eebcf4514ede98fc323e5acfc03ed6593f69f648d531b39c3efe6db04c71527d5030db760"

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
