import React, { useState, useEffect } from "react"
import axios from "axios"
import Modal from "react-modal"
import { Player, Controls } from "@lottiefiles/react-lottie-player"
import Successfully from "../Json/Successfully.json"

import Fail from "../Json/fail.json"
import { FormattedMessage } from "react-intl"
import "./style/SecFooter.css"
import "./style/ContactUs.css"
import { Link } from "gatsby"
import { useLocalization } from "../context/LocalizationContext"

const SecFooter = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)
  const [file, setFile] = useState(null)
  const [contactData, setContactData] = useState(null)
  const { locale } = useLocalization()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://app.netlify.com/projects/dainty-brigadeiros-5e00ce/deploys/api/pages/?filters[custom_slug][$eq]=contact-us&populate[sections][populate][section_content][populate][subtitle][populate]=*&locale=${locale}&populate=image&populate=*&populate[sections][populate][section_content][populate][image][populate]=*`,
          {
            headers: {
              Authorization:
                "Bearer ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68",
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
    setFile(event.target.files[0])
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    file: null,
  })

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const payload = new FormData()
    payload.append("data", JSON.stringify(formData))

    if (file) {
      payload.append("files.file", file)
    }

    axios
      .post(
        "https://app.netlify.com/projects/dainty-brigadeiros-5e00ce/deploys/api/contact-uses?populate=*",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68",
          },
        }
      )
      .then(response => {
        if (response.status === 200) {
          setFormSubmitted(true)
          setFormData({ name: "", email: "", message: "" })
          setFile(null)
        } else {
          setFormError(true)
          console.error("Error:", response)
        }
      })
      .catch(error => {
        console.error("Error:", error)
        setFormError(true)
      })
  }
  // console.log(contactData, "contactData")
  return (
    <section className="sec-footer-section">
      <div className="sec-footer-container">
        <form className="sec-footer-form" onSubmit={handleSubmit}>
          <label>
            <FormattedMessage id="name_label" defaultMessage="الاسم">
              {text => <span>{text}</span>}
            </FormattedMessage>
            <FormattedMessage id="name_placeholder" defaultMessage="أدخل اسمك">
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
            <FormattedMessage
              id="email_label"
              defaultMessage="البريد الإلكتروني"
            >
              {text => <span>{text}</span>}
            </FormattedMessage>
            <FormattedMessage
              id="email_placeholder"
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
            <FormattedMessage id="message_label" defaultMessage="الرسالة">
              {text => <span>{text}</span>}
            </FormattedMessage>
            <FormattedMessage
              id="message_placeholder"
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
              name="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit">
            <FormattedMessage id="submit_button" defaultMessage="إرسال" />
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
                    <FormattedMessage
                      id="success_message"
                      defaultMessage="لقد تم أرسال طلبك بنجاح"
                    />
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
                    <FormattedMessage
                      id="error_message"
                      defaultMessage="لم يتم أرسال طلبك، الرجاء المحاولة لاحقاً"
                    />
                  </h4>
                </div>
              </div>
            )}
          </Modal>
          <p>
            <FormattedMessage
              id="privacy_policy"
              defaultMessage="نحن ملتزمون بحماية واحترام خصوصيتكم. سيتم استخدام المعلومات المقدمة في هذا النموذج للتواصل معكم والإجابة على استفساراتكم فقط."
            />
          </p>
        </form>
        <div className="sec-footer-content">
          <h2>
            {contactData?.sections?.data[1]?.attributes?.section_content[0]
              ?.title || ""}
          </h2>
          <p>
            {contactData?.sections?.data[1]?.attributes?.section_content[0]
              ?.subtitle[0]?.subtitle[0]?.children[0]?.text ||
              "No subtitle available."}
          </p>
          <h3>{contactData?.sections?.data[2]?.attributes?.section_title || ""}</h3>
          <h6>
            <FormattedMessage id="address_title" defaultMessage="العنوان" />
          </h6>
          <div className="Contact-info">
            {contactData?.sections?.data[2]?.attributes?.section_content && 
              contactData.sections.data[2].attributes.section_content[0]?.subtitle?.map(
                (subtitle, index) => {
                  // We'll assume that each subtitle has a title as the first child
                  const titleText =
                    subtitle?.subtitle?.[0]?.children[0]?.text ||
                    `Subtitle ${index + 1}`

                  return (
                    <div key={index}>
                      <h6>{titleText}</h6>
                      {subtitle?.subtitle?.slice(1).map((info, infoIndex) => {
                        // Extracting text and URL for links
                        const text = info?.children[0]?.text || ""
                        const link = info?.children?.find(
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
              )
            }
          </div>
          <h6>
            <FormattedMessage
              id="social_media_title"
              defaultMessage="التواصل الاجتماعي"
            />
          </h6>
          <div className="sec-footer-content-social">
            <Link target="_blank" to="https://x.com/ItqanCapital">
              <img src="/X.png" alt="X Social Media" />
            </Link>
            <Link
              target="_blank"
              to="https://sa.linkedin.com/company/itqancapital"
            >
              <img src="/LinkedIn.png" alt="LinkedIn Social Media" />
            </Link>
          </div>
          {contactData?.sections?.data[2]?.attributes?.section_content &&
            contactData.sections.data[2].attributes.section_content
            .filter(content => content.__component === "blocks.subtitle") // Assuming the subtitle block contains the company profile link
            .map((subtitle, contentIndex) =>
              subtitle?.subtitle?.map((sub, subIndex) => (
                <Link
                  key={`${contentIndex}-${subIndex}`}
                  target="_blank"
                  to={
                    sub?.children?.find(child => child.type === "link")?.url ||
                    "#"
                  }
                >
                  <h6>
                    <img src="/file-icon.png" alt="Investor icon" />
                    <FormattedMessage id="company_profile" />
                  </h6>
                </Link>
              ))
            )}
        </div>
      </div>
    </section>
  )
}

export default SecFooter
