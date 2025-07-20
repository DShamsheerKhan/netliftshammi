import React, { useState, useEffect } from "react"
import { useLocation } from "@reach/router"
import ScrollToTopButton from "../../components/ScrollToTopButton"
import "../../components/style/Team.css"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Link } from "gatsby"
import { FormattedMessage } from "react-intl"
import { useLocalization } from "../../context/LocalizationContext"
import Loader from "../../components/loader"
import { LocalizedLink } from "../../components/LocalizedLink"
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
