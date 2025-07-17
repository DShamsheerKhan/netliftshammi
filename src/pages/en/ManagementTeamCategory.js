import React, { useState, useEffect } from "react"
import ScrollToTopButton from "../../components/ScrollToTopButton"
import "../../components/style/Directors.css"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Link } from "gatsby"
import { FormattedMessage } from "react-intl"
import { useLocalization } from "../../context/LocalizationContext"
import Loader from "../../components/loader"

const ManagementTeamCategory = ({ Slug }) => {
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { locale } = useLocalization()
  const setTitle = (Slug) => {
    switch (Slug) {
      case "Managing-Director-&-CEO":
        return <FormattedMessage id="Managing-Director-&-CEO" />;
      case "Asset-Management":
        return <FormattedMessage id="Asset-Management" />;
      case "Investment-Banking":
        return <FormattedMessage id="Investment-Banking" />;
      case "Finance":
        return <FormattedMessage id="Finance" />;
      case "Operations":
        return <FormattedMessage id="Operations" />;
      case "Compliance":
        return <FormattedMessage id="Compliance" />;
      default:
        return <FormattedMessage id="Default-Title" />; // Fallback title
    }
  };
  
  // Example usage
  const title = setTitle(Slug);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://reports.itqancapital.com/api/pages/?filters[custom_slug][$eq]=management-team&locale=${locale}&populate[sections][populate][section_content][populate][Board_of_Directors_card][populate]=*&populate=image`,
          {
            headers: {
              Authorization:
                "Bearer d669ad6366aa64f56773be0483825f4c484c013463b9747662f0dee6fe068c486286209e0ddf7210dadcb668fa2a9315793ae3c9d22f8047a5748eeb148d4e6556287f972c9a5c5c94f9c16fa42678d6ced8c78bc5e5463a329f0c0eebcf4514ede98fc323e5acfc03ed6593f69f648d531b39c3efe6db04c71527d5030db760",
            },
          }
        )
        const data = await response.json()
        setPageData(data.data[0])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [locale])

  if (loading) {
    return <Loader />
  }

  if (!pageData) {
    return <p>No data available</p>
  }

  const heroSection = pageData.attributes.sections.data.find(section =>
    section.attributes.section_content.some(
      content => content.__component === "blocks.hero-section"
    )
  )

  const managementTeamSection = pageData.attributes.sections.data.find(
    section =>
      section.attributes.section_content.some(
        content => content.__component === "blocks.itqan-capital-members"
      )
  )

  const heroContent = heroSection?.attributes.section_content.find(
    content => content.__component === "blocks.hero-section"
  )
  
  const managementTeamContent =
    managementTeamSection?.attributes.section_content.find(
      content => content.__component === "blocks.itqan-capital-members"
    )

  // Filter members based on position
  const filteredMembers = managementTeamContent?.Board_of_Directors_card.filter(member => 
    member.positions?.data?.attributes?.positions === Slug
  )

  return (
    <Layout>
      <Seo
        title={pageData.attributes.meta_title}
        description={pageData.attributes.meta_description}
      />
      <ScrollToTopButton />
      <section className="Board-hero-sec">
        <div className="Board-hero-container">
          <div className="Board-hero-title">
            <h1>{heroContent?.title}</h1>
            <p>{heroContent?.subtitle}</p>
          </div>
        </div>
      </section>
      <section className="director-card-sec">
        <h3>{title}</h3>
        <div className="director-card-container">
          {filteredMembers.map(member => {
            const profileImageUrl = member.image?.data?.attributes?.formats
              ?.small?.url
              ? `${member.image.data.attributes.formats.small.url}`
              : "/default-profile.png"

            return (
              <Link
                key={member.id}
                to={`../../managementTeamTemplet?slug=${member.slug}`}
                className="director-card"
              >
                <img
                  src={profileImageUrl}
                  alt={member?.name}
                  style={{
                    display:
                      profileImageUrl === "/default-profile.png" ? "none" : "",
                  }}
                />{" "}
                <div className="director-card-info">
                  <h4>{member?.name}</h4>
                  <p>{member?.position}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export default ManagementTeamCategory