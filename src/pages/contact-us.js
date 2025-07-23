import React, { useState, useEffect } from "react"
import axios from "axios"
import Layout from "../components/layout"
import Hero from "../components/Hero"
import ScrollToTopButton from "../components/ScrollToTopButton"
import Seo from "../components/seo"
import "../components/style/ContactUs.css"
import Modal from "react-modal"
import { Player, Controls } from "@lottiefiles/react-lottie-player"
import Successfully from "../Json/Successfully.json"
import Fail from "../Json/fail.json"
import { Link } from "gatsby"
import { FormattedMessage } from "react-intl"
import { useLocalization } from "../context/LocalizationContext"
import Loader from "../components/loader"
const ContactUs = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)
  const [file, setFile] = useState(null)
  const [fillFile, setFillFile] = useState("No file attached") // Changed initial state
  const { locale } = useLocalization()
  const [contactData, setContactData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://reports.itqancapital.com/api/pages/?filters[custom_slug][$eq]=contact-us&populate[sections][populate][section_content][populate][subtitle][populate]=*&locale=${locale}&populate=image&populate=*&populate[sections][populate][section_content][populate][image][populate]=*`,
          {
            headers: {
              Authorization:
                "Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38",
            },
          }
        )

        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          setContactData(response.data.data[0].attributes)
        }
      } catch (error) {
        console.error("Error fetching contact data:", error)
      }
    }

    fetchData()
  }, [locale])

  const handleFileChange = event => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    setFillFile(
      selectedFile ? "Check Strapi  for attachment" : "No file attached"
    )
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    const payload = new FormData()
    payload.append(
      "data",
      JSON.stringify({
        ...formData,
        fillFile: fillFile,
      })
    )

    if (file) {
      payload.append("files.file", file)
    }

    axios
      .post(
        "https://reports.itqancapital.com/api/contact-uses?populate=*",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38",
          },
        }
      )
      .then(response => {
        if (response.status === 200) {
          setFormSubmitted(true)
          setFormData({ name: "", email: "", message: "" })
          setFile(null)
          setFillFile("No file attached") // Reset to initial state
        } else {
          setFormError(true)
        }
      })
      .catch(error => {
        console.error("Error:", error)
        setFormError(true)
      })
  }

  if (!contactData) {
    return <Loader />
  }

  return (
    <Layout>
      <Seo
        title={contactData.meta_title || "Contact Us"}
        description={contactData.meta_description || "Contact Us page."}
      />
      <Hero
        title={contactData.sections.data[0].attributes.section_content[0]?.title}
      />
      <ScrollToTopButton />
      <div className="Contact-footer-section-wallpaper">
        <section className="Contact-footer-section">
          <div className="Contact-footer-container">
            <form className="Contact-footer-form" onSubmit={handleSubmit}>
              <label>
                <FormattedMessage id="contact_form_name" />
                <FormattedMessage
                  id="contact_form_name_placeholder"
                  defaultMessage="أدخل اسمك"
                >
                  {placeholder => (
                    <input
                      type="text"
                      name="name"
                      placeholder={placeholder}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  )}
                </FormattedMessage>
              </label>
              <label>
                <FormattedMessage id="contact_form_email" />
                <FormattedMessage
                  id="contact_form_email_placeholder"
                  defaultMessage="أدخل بريدك الإلكتروني"
                >
                  {placeholder => (
                    <input
                      type="email"
                      name="email"
                      placeholder={placeholder}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  )}
                </FormattedMessage>
              </label>
              <label>
                <FormattedMessage id="contact_form_message" />
                <FormattedMessage
                  id="contact_form_message_placeholder"
                  defaultMessage="اكتب رسالتك هنا"
                >
                  {placeholder => (
                    <textarea
                      name="message"
                      placeholder={placeholder}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  )}
                </FormattedMessage>
              </label>
              <label>
                <FormattedMessage id="file_label" defaultMessage="File">
                  {text => <span>{text}</span>}
                </FormattedMessage>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  name="file"
                  onChange={handleFileChange}
                />
              </label>
              <button type="submit">
                <FormattedMessage id="contact_form_submit" />
              </button>
              <Modal
                isOpen={formSubmitted || formError}
                onRequestClose={() => {
                  setFormSubmitted(false)
                  setFormError(false)
                }}
              >
                {formSubmitted ? (
                  <div className="Contact-successfuly">
                    <button
                      onClick={() => {
                        setFormSubmitted(false)
                      }}
                    >
                      <img src="/close.svg" alt="Close" />
                    </button>
                    <div className="Contact-successfuly-body">
                      <Player
                        autoplay
                        loop
                        src={Successfully}
                        style={{ height: "200px", width: "200px" }}
                      >
                        <Controls
                          visible={false}
                          buttons={["play", "repeat", "frame", "debug"]}
                        />
                      </Player>
                      <h4>
                        <FormattedMessage id="contact_form_success_message" />
                      </h4>
                    </div>
                  </div>
                ) : (
                  <div className="Contact-error">
                    <button
                      onClick={() => {
                        setFormError(false)
                      }}
                    >
                      <img src="/close.svg" alt="Close" />
                    </button>
                    <div className="Contact-error-body">
                      <Player
                        autoplay
                        loop
                        src={Fail}
                        style={{ height: "200px", width: "200px" }}
                      >
                        <Controls
                          visible={false}
                          buttons={["play", "repeat", "frame", "debug"]}
                        />
                      </Player>
                      <h4>
                        <FormattedMessage id="contact_form_error_message" />
                      </h4>
                    </div>
                  </div>
                )}
              </Modal>
            </form>

            <div className="Contact-footer-content">
              <h2>
                {
                  contactData.sections.data[1].attributes.section_content[0]?.title
                }
              </h2>
              <p>
                {contactData.sections.data[1].attributes.section_content[0]
                  ?.subtitle[0]?.subtitle[0]?.children[0]?.text ||
                  "No subtitle available."}
              </p>

              <h3>{contactData.sections.data[2].attributes.section_title}</h3>
              <div className="Contact-info">
                {contactData.sections.data[2].attributes.section_content[0].subtitle.map(
                  (subtitle, index) => {
                    // We'll assume that each subtitle has a title as the first child
                    const titleText =
                      subtitle.subtitle?.[0]?.children[0]?.text ||
                      `Subtitle ${index + 1}`

                    return (
                      <div className="Contact-info-data" key={index}>
                        <h6>{titleText}</h6>
                        {subtitle.subtitle.slice(1).map((info, infoIndex) => {
                          // Extracting text and URL for links
                          const text = info.children[0]?.text || ""
                          const link = info.children.find(
                            child => child.type === "link"
                          )

                          return (
                            <p key={infoIndex}>
                              {text}
                              {link && (
                                <Link to={link.url || "#"} target="_blank">
                                  {" "}
                                  Google Map
                                </Link>
                              )}
                            </p>
                          )
                        })}
                      </div>
                    )
                  }
                )}
              </div>

              <h6>
                <FormattedMessage id="social_media_title" />
              </h6>
              <div className="Contact-footer-content-social">
                {contactData.sections.data[2].attributes.section_content
                  .filter(content => content.__component === "blocks.social")
                  .map((social, index) => (
                    <Link key={index} to={social.link} target="_blank">
                      <img
                        src={`${social.image?.data?.attributes?.url}`}
                        alt={social.__component} // or a more descriptive alt text based on the platform
                        style={{ width: "48px", height: "48px" }} // Use inline styles to enforce size
                      />
                    </Link>
                  ))}
              </div>

              {contactData.sections.data[2].attributes.section_content
                .filter(content => content.__component === "blocks.subtitle") // Assuming the subtitle block contains the company profile link
                .map(subtitle =>
                  subtitle.subtitle.map((sub, subIndex) => (
                    <Link
                      key={subIndex}
                      target="_blank"
                      to={
                        sub.children.find(child => child.type === "link")
                          ?.url || "#"
                      }
                    >
                      <h6>
                        <img src="/Investor.png" alt="Investor icon" />
                        <FormattedMessage id="company_profile" />
                      </h6>
                    </Link>
                  ))
                )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default ContactUs
