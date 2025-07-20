import React, { useEffect, useState } from "react"
import axios from "axios"
import { FormattedMessage } from "react-intl"
import Layout from "../components/layout"
import ItqanC from "../components/ItqanC"
import Distinction from "../components/distinction"
import SecFooter from "../components/SecFooter"
import "../components/style/AboutUs.css"
import ScrollToTopButton from "../components/ScrollToTopButton"
import Hero from "../components/Hero"
import Seo from "../components/seo"
import { useLocalization } from "../context/LocalizationContext"
import Loader from "../components/loader"
import Modal from "../components/Modal"

const AboutUS = () => {
  const [pageData, setPageData] = useState(null)
  const { locale } = useLocalization()
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://strong-nest-c09ad17fab.strapiapp.com/api/pages/?filters[custom_slug][$eq]=about_us&populate[sections][populate][section_content][populate][single_card][populate]=*&locale=${locale}&populate=image&populate[sections][populate][section_content][populate][image][populate]=*`,
          {
            headers: {
              Authorization:
                "Bearer 6bd6af85d32da95f631a89f06f68ed9c05b785a52197a8c6484b87b2fb402160414499b19ee179791552c19a9a0a515a6c68233149179b39e01180f2a8cefeeed9f905bbdc597101ad02d8f76f62d3e3bc709f9ffb7864f04d60540a5f3cf46f06e46c2b71a24e457a355d1fa0f8aec9850b0e17e8e21a5263de6e72b40e9e31"
            },
          }
        )
        setPageData(response.data.data[0].attributes)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  if (!pageData) {
    return <Loader />
  }

  const openModal = imageSrc => {
    setSelectedImage(imageSrc)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedImage("")
  }

  return (
    <Layout>
      <Seo
        title={pageData.meta_title}
        description={pageData.meta_description}
      />
      <ScrollToTopButton />
      <Hero
        title={pageData.sections.data[0]?.attributes.section_content[0].title}
        subTitle={
          pageData.sections.data[0]?.attributes.section_content[0].subtitle
        }
      />
      
      <section className="who-are-we-sec">
        <div className="who-are-we-container">
          <div className="who-are-we-title">
            <h3>
              {pageData.sections.data[1]?.attributes.section_content[0].title}
            </h3>
            <p>
              {pageData.sections.data[1]?.attributes.section_content[0].subtitle
                .split("\n")
                .map((text, index) => (
                  <React.Fragment key={index}>
                    {text}
                    <br />
                  </React.Fragment>
                ))}
            </p>
          </div>
          <section className="who-are-we-rewards-sec">
        <div className="who-are-we-rewards-container">
          {pageData.sections.data[2]?.attributes.section_content.map(item => (
            <div className="who-are-we-reward" key={item.id}>
              <img
                src={item.image.data.attributes.url}
                alt="reward"
                onClick={() => openModal(item.image.data.attributes.url)}
              />
            </div>
          ))}
        </div>
      </section>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedImage}
        />
      )}
          <ItqanC />
        </div>
      </section>
      
      <Distinction />
      <SecFooter />
      <div className="sec-footer-background"></div>
    </Layout>
  )
}

export default AboutUS
