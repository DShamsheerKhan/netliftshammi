import React, { useEffect, useState } from "react"
import axios from "axios"
import { FormattedMessage } from "react-intl"
import Layout from "../../components/layout"
import ItqanC from "../../components/ItqanC"
import Distinction from "../../components/distinction"
import SecFooter from "../../components/SecFooter"
import "../../components/style/AboutUs.css"
import ScrollToTopButton from "../../components/ScrollToTopButton"
import Hero from "../../components/Hero"
import Seo from "../../components/seo"
import { useLocalization } from "../../context/LocalizationContext"
import Loader from "../../components/loader"
import Modal from "../../components/Modal"

const AboutUS = () => {
  const [pageData, setPageData] = useState(null)
  const { locale } = useLocalization()
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://reports.itqancapital.com/api/pages/?filters[custom_slug][$eq]=about_us&populate[sections][populate][section_content][populate][single_card][populate]=*&locale=${locale}&populate=image&populate[sections][populate][section_content][populate][image][populate]=*`,
          {
            headers: {
              Authorization:
                "Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38",
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
          <ItqanC />
        </div>
      </section>
     
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedImage}
        />
      )}
      <Distinction />
      <SecFooter />
      <div className="sec-footer-background"></div>
    </Layout>
  )
}

export default AboutUS
