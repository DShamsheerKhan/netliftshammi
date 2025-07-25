import { FormattedMessage } from "react-intl"
import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Header from "./header"
import "./style/layout.css"
import Loader from "./loader"
import { LocalizationProvider } from "../context/LocalizationContext"
import { useLocalization } from "../context/LocalizationContext"
import { LocalizedLink } from "./LocalizedLink"

const Layout = ({ children, overPadding }) => {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState(null)
  const [newsletterData, setNewsletterData] = useState(null)
  const [addressData, setAddressData] = useState(null)
  const { locale } = useLocalization()

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)

    const fetchData = async () => {
      try {
        // Fetch newsletter data
        const newsletterResponse = await fetch(
          `https://strong-nest-c09ad17fab.strapiapp.com/api/sections?filters[custom_slug][$eq]=Newsletter&locale=${locale}&populate[section_content][populate][title]=*&populate[section_content][populate][subtitle]=*`,
          {
            headers: {
              Authorization:
                "Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38",
            },
          }
        )
        const newsletterJsonData = await newsletterResponse.json()

        // Fetch address data
        const addressResponse = await fetch(
          `https://strong-nest-c09ad17fab.strapiapp.com/api/sections?filters[custom_slug][$eq]=address_footer&locale=${locale}&populate[section_content][populate][title]=*&populate[section_content][populate][subtitle]=*`,
          {
            headers: {
              Authorization:
                "Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38",
            },
          }
        )
        const addressJsonData = await addressResponse.json()

        if (newsletterResponse.ok) {
          setNewsletterData(newsletterJsonData.data)
        }
        if (addressResponse.ok) {
          setAddressData(addressJsonData.data)
        }
      } catch (error) {
        console.error("Error fetching data", error)
      }
    }

    fetchData()
  }, [locale])

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: "error", id: "footer.invalidEmail" })
      return
    }

    const response = await fetch(
      "https://strong-nest-c09ad17fab.strapiapp.com/api/newsletter-emails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38",
        },
        body: JSON.stringify({ data: { email } }),
      }
    )

    const responseData = await response.json()

    if (response.ok) {
      setMessage({ type: "success", id: "footer.subscriptionSuccess" })
      setEmail("")
    } else {
      setMessage({
        type: "error",
        id: responseData.message || "footer.subscriptionError",
      })
    }
  }

  if (loading) return <Loader />

  return (
    <LocalizationProvider>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main>{children}</main>
      <footer className="footer-sec">
        <div className="footer-container">
          <div className="footer-logo">
            <LocalizedLink to="/">
              <img src="/itqanlogo.svg" alt="Itqan Capital Logo" />
            </LocalizedLink>
            {addressData &&
              addressData.length > 0 &&
              addressData[0].attributes.section_content[0].subtitle.map(
                (item, index) => <p key={index}>{item.children[0].text}</p>
              )}
          </div>

          <div className="footer-services">
            <h6>
              <FormattedMessage
                id="footer.services"
                defaultMessage="Services"
              />
            </h6>
            <LocalizedLink to={`/asset-management/private-funds/multi-assets`}>
              <FormattedMessage id="multi-assets" />
            </LocalizedLink>
            {/* <LocalizedLink to={`/asset-management`}><FormattedMessage id="footer.assetManagement" defaultMessage="Asset Management" /></LocalizedLink> */}
            <LocalizedLink to={`/Investment-banking`}>
              <FormattedMessage
                id="footer.investmentBanking"
                defaultMessage="Investment Banking"
              />
            </LocalizedLink>
            <LocalizedLink to={`/conservation-services`}>
              <FormattedMessage
                id="footer.conservationServices"
                defaultMessage="Conservation Services"
              />
            </LocalizedLink>
            <LocalizedLink to={`/advisory-research`}>
              <FormattedMessage
                id="footer.advisoryResearch"
                defaultMessage="Wealth Management"
              />
            </LocalizedLink>
          </div>

          <div className="footer-links">
            <h6>
              <FormattedMessage
                id="footer.quickLinks"
                defaultMessage="Quick Links"
              />
            </h6>
            <LocalizedLink to={`/careers`}>
              <FormattedMessage id="careers" />
            </LocalizedLink>
            <LocalizedLink to={`/about-us`}>
              <FormattedMessage id="footer.aboutUs" defaultMessage="Overview" />
            </LocalizedLink>
            <LocalizedLink target="_blank" to={`/announcements`}>
              <FormattedMessage
                id="footer.announcements"
                defaultMessage="Announcements"
              />
            </LocalizedLink>
            <LocalizedLink to={`/contact-us`}>
              <FormattedMessage
                id="footer.contactUs"
                defaultMessage="Contact Us"
              />
            </LocalizedLink>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit}>
            {newsletterData && newsletterData.length > 0 && (
              <>
                {newsletterData.map(section => (
                  <>
                    <h6>{section.attributes.section_content[0].title}</h6>
                    <p>
                      {
                        section.attributes.section_content[0].subtitle[0]
                          .subtitle[0].children[0].text
                      }
                    </p>
                  </>
                ))}
              </>
            )}
            <div className="button-input">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="button-input-field"
                required
                placeholder="Your email address"
              />
              <button className="button-input-button" type="submit">
                <FormattedMessage
                  id="footer.subscribe"
                  defaultMessage="Subscribe"
                />
              </button>
            </div>
            {message && (
              <p
                className={
                  message.type === "error" ? "error-message" : "success-message"
                }
              >
                <FormattedMessage
                  id={message.id}
                  defaultMessage="Message not found."
                />
              </p>
            )}
          </form>
        </div>
      </footer>
      <footer className="copyright-sec">
        <div className="copyright">
          <p>
            <FormattedMessage
              id="footer.designBy"
              defaultMessage="Designed and developed by"
            />{" "}
            <Link to="https://softylus.com/">Softylus</Link> @2024
          </p>
          <p>
            <FormattedMessage
              id="footer.copyright"
              defaultMessage="Itqan Capital © 2024. All rights reserved."
            />
          </p>
        </div>
      </footer>
    </LocalizationProvider>
  )
}

export default Layout
