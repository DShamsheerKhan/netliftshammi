import React, { useState, useEffect } from "react"
import { useLocation } from "@reach/router"
import ScrollToTopButton from "../components/ScrollToTopButton"
import "../components/style/Team.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"
import { FormattedMessage } from "react-intl"
import { useLocalization } from "../context/LocalizationContext"
import Loader from "../components/loader"
import { LocalizedLink } from "../components/LocalizedLink"
const ManagementTeamTemplate = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const slug = params.get("slug")
  const { locale } = useLocalization()

  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://strong-nest-c09ad17fab.strapiapp.com/api/pages/?filters[custom_slug][$eq]=management-team&locale=${locale}&populate[sections][populate][section_content][populate][Board_of_Directors_card][populate]=*&populate=image`,
          {
            headers: {
              Authorization:
                "Bearer 6bd6af85d32da95f631a89f06f68ed9c05b785a52197a8c6484b87b2fb402160414499b19ee179791552c19a9a0a515a6c68233149179b39e01180f2a8cefeeed9f905bbdc597101ad02d8f76f62d3e3bc709f9ffb7864f04d60540a5f3cf46f06e46c2b71a24e457a355d1fa0f8aec9850b0e17e8e21a5263de6e72b40e9e31
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

  const managementTeamSection = pageData.attributes.sections.data.find(
    section =>
      section.attributes.section_content.some(
        content => content.__component === "blocks.itqan-capital-members"
      )
  )

  const managementTeamContent =
    managementTeamSection?.attributes.section_content.find(
      content => content.__component === "blocks.itqan-capital-members"
    )

  const teamMember = managementTeamContent?.Board_of_Directors_card.find(
    member => member.slug === slug
  )

  if (!teamMember) {
    return (
      <p>
        <FormattedMessage
          id="teamMemberNotFound"
          defaultMessage="Team member not found"
        />
      </p>
    )
  }

  const profileImageUrl = teamMember.image?.data?.attributes?.formats?.small
    ?.url
    ? `${teamMember.image.data.attributes.formats.small.url}`
    : "/default-profile.png"

  return (
    <Layout>
      <Seo
        title={`${pageData.attributes.meta_title} - ${teamMember.name}`}
        description={teamMember.subtitle}
      />
      <ScrollToTopButton />
      <section className="Board-hero-sec">
        <div className="Board-hero-container">
          <div className="Board-hero-title">
            <h1>{teamMember.name}</h1>
            <p>{teamMember.position}</p>
          </div>
        </div>
      </section>
      <section className="Team-sec">
        <div className="Team-container">
          <LocalizedLink to={`/management-team`}>
            <button>
              <FormattedMessage id="backButtonText" defaultMessage="Back" />
              <img src="/RA.png" alt="Back" />
            </button>
          </LocalizedLink>
          <div className="Team-card">
            <img
              src={profileImageUrl}
              alt={teamMember.name}
              style={{ display: profileImageUrl === "/default-profile.png" ? "none" : "" }}
            />
            <div className="Team-card-info">
              <h4>{teamMember.name}</h4>
              <p>{teamMember.position}</p>
              <p>{teamMember.subtitle}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ManagementTeamTemplate
