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
          `https://dainty-brigadeiros-5e00ce.netlify.app/api/pages/?filters[custom_slug][$eq]=about_us&populate[sections][populate][section_content][populate][single_card][populate]=*&locale=${locale}&populate=image&populate[sections][populate][section_content][populate][image][populate]=*`,
          {
            headers: {
              Authorization:
                "Bearer ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68",
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
