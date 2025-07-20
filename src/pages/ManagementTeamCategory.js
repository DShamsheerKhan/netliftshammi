import React, { useState, useEffect } from "react"
import ScrollToTopButton from "../components/ScrollToTopButton"
import "../components/style/Directors.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"
import { FormattedMessage } from "react-intl"
import { useLocalization } from "../context/LocalizationContext"
import Loader from "../components/loader"

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
          `https://dainty-brigadeiros-5e00ce.netlify.app/api/pages/?filters[custom_slug][$eq]=management-team&locale=${locale}&populate[sections][populate][section_content][populate][Board_of_Directors_card][populate]=*&populate=image`,
          {
            headers: {
              Authorization:
                "Bearer ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68",
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
                to={`/managementTeamTemplet?slug=${member.slug}`}
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