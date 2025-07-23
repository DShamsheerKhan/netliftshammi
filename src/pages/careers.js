import React, { useState, useEffect, useRef } from "react"
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

const JoinUs = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)
  const [file, setFile] = useState(null)
  const [fillFile, setFillFile] = useState("No file attached") // Changed initial state
  const { locale } = useLocalization()
  const [contactData, setContactData] = useState(null)
  const [selectedJob, setSelectedJob] = useState("") // New state for selected job
  const [showJobDescription, setShowJobDescription] = useState(false)
  const [currentJobDescription, setCurrentJobDescription] = useState(null)
  const formRef = useRef(null) // Add form reference
  const [isHighlighted, setIsHighlighted] = useState(false) // Add state for animation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://strong-nest-c09ad17fab.strapiapp.com/api/pages/?filters[custom_slug][$eq]=join-us&populate[sections][populate][section_content][populate][subtitle][populate]=*&locale=${locale}&populate=image&populate=*&populate[sections][populate][section_content][populate][image][populate]=*`,
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
    job: "", // Add job field to formData
    customJob: "", // Add for "Other" option
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Function to auto-fill job field when a job is selected
  const handleJobSelection = (jobTitle, jobData = null) => {
    setSelectedJob(jobTitle)
    setFormData({
      ...formData,
      job: jobTitle,
      customJob: "" // Reset custom job when selecting a predefined job
    })
    
    if (jobData && jobTitle !== "other") {
      setCurrentJobDescription(jobData)
      setShowJobDescription(true)
    } else {
      setShowJobDescription(false)
      setCurrentJobDescription(null)
    }
    
    // Smooth scroll to the form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Trigger highlight animation
      setIsHighlighted(true)
      setTimeout(() => setIsHighlighted(false), 1500) // Animation duration
    }, 100)
  }

  const closeJobDescription = () => {
    setShowJobDescription(false)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const payload = new FormData()
    // Include custom job if "other" is selected
    const jobData = formData.job === "other" ? formData.customJob : formData.job;
    
    payload.append(
      "data",
      JSON.stringify({
        ...formData,
        job: jobData, // Send the custom job value if "other" is selected
        fillFile: fillFile,
      })
    )

    if (file) {
      payload.append("files.file", file)
    }

    axios
      .post(
        "https://strong-nest-c09ad17fab.strapiapp.com/api/join-uses?populate=*",
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
          setFormData({ name: "", email: "", message: "", job: "", customJob: "" })
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
  
  // Extract available jobs from the API data
  const availableJobs = contactData.sections.data.find(
    section => section.attributes.section_title === "الوظائف المتاحة"
  )?.attributes.section_content || []

  return (
    <Layout>
      <Seo
        title={contactData.meta_title || "Contact Us"}
        description={contactData.meta_description || "Contact Us page."}
      />
      <Hero
        title={contactData.page_title}
      />
      <ScrollToTopButton />
      <div className="Contact-footer-section-wallpaper">
        <section className="Contact-footer-section">
          <div className="Contact-footer-container Contact-career-container">
            {/* Job Description Modal */}
            <Modal
              isOpen={showJobDescription}
              onRequestClose={closeJobDescription}
              className="job-description-modal"
              overlayClassName="job-description-overlay"
            >
              {currentJobDescription && (
                <div className="job-description-content">
                  <button className="close-modal-btn" onClick={closeJobDescription}>
                    <img src="/close.svg" alt="Close" />
                  </button>
                  <h2 className="job-title">{currentJobDescription.title}</h2>
                  {currentJobDescription.subtitle?.[0]?.subtitle?.map((item, index) => (
                    item.children && item.children[0]?.text && item.children[0].text.trim() !== "" && (
                      <div key={index} className="job-description-paragraph">
                        {item.children[0].text}
                      </div>
                    )
                  ))}
                  {/* <button 
                    className="apply-now-btn" 
                    onClick={() => {
                      closeJobDescription();
                      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setIsHighlighted(true);
                      setTimeout(() => setIsHighlighted(false), 1500);
                    }}
                  >
                    <FormattedMessage id="apply_now" defaultMessage="Apply Now" />
                  </button> */}
                </div>
              )}
            </Modal>
            
            <form 
              ref={formRef} 
              className={`Contact-footer-form ${isHighlighted ? 'form-highlight' : ''}`} 
              onSubmit={handleSubmit}
            >
              <label>
                <FormattedMessage id="contact_form_name" />
                <FormattedMessage
                  id="contact_form_name_placeholder"
                  defaultMessage="Enter your name"
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
                  defaultMessage="Enter your email"
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
                <FormattedMessage id="contact_form_job" defaultMessage="Job Position" />
                <select
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  className="job-select"
                >
                  <option value="">
                    <FormattedMessage 
                      id="contact_form_job_placeholder" 
                      defaultMessage="Select job position" 
                    />
                  </option>
                  {availableJobs.map((jobItem, index) => (
                    <option 
                      key={index}
                      value={jobItem.title}
                    >
                      {jobItem.title}
                    </option>
                  ))}
                  <option value="other">
                    <FormattedMessage id="other_job_option" defaultMessage="Other" />
                  </option>
                </select>
              </label>
              
              {/* Conditional input field for "Other" option */}
              {formData.job === "other" && (
                <label>
                  <FormattedMessage id="custom_job_label" defaultMessage="Specify job position" />
                  <input
                    type="text"
                    name="customJob"
                    value={formData.customJob}
                    onChange={handleChange}
                    placeholder="Please specify the job position"
                  />
                </label>
              )}

              <label>
                <FormattedMessage id="contact_form_message" />
                <FormattedMessage
                  id="contact_form_message_placeholder"
                  defaultMessage="Write your message here"
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
                <FormattedMessage id="file_label_joinUs" defaultMessage="File">
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
            <div className="available-jobs-section">
              <h3><FormattedMessage id="available_jobs" defaultMessage="Available Jobs" /></h3>
              <div className="available-jobs-container">
                {availableJobs.map((jobItem, index) => (
                  <div 
                    key={index} 
                    className={`job-item ${selectedJob === jobItem.title ? "selected" : ""}`}
                    onClick={() => handleJobSelection(jobItem.title, jobItem)}
                  >
                    <h4>{jobItem.title}</h4>
                    <button className="view-details-btn">
                      <FormattedMessage id="view_details" defaultMessage="View Details" />
                    </button>
                  </div>
                ))}
                <div 
                  className={`job-item ${selectedJob === "other" ? "selected" : ""}`}
                  onClick={() => handleJobSelection("other")}
                >
                  <h4><FormattedMessage id="other_job_option" defaultMessage="أخرى" /></h4>
                  <p><FormattedMessage id="other_job_description" defaultMessage="تقدم بطلب للحصول على وظيفة غير مدرجة هنا" /></p>
                </div>
              </div>
            </div>
            <div className="Contact-footer-content">
              <h2>
                <FormattedMessage id="join_our_team" defaultMessage="Join Our Team" />
              </h2>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default JoinUs
