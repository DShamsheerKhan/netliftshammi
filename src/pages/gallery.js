import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Hero from "../components/Hero"
import "../components/style/gallery.css"
import { useLocalization } from "../context/LocalizationContext"
import Seo from "../components/seo"
import Modal from "../components/Modal" // Import the Modal component
import { FormattedMessage } from "react-intl"

const GalleryPage = () => {
  const [galleryData, setGalleryData] = useState(null)
  const { locale } = useLocalization()
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://strong-nest-c09ad17fab.strapiapp.com/api/pages/?filters[custom_slug][$eq]=gallery&locale=${locale}&populate[sections][populate][section_content][populate]=*&populate=*`,
          {
            headers: {
              Authorization:
                "Bearer 6bd6af85d32da95f631a89f06f68ed9c05b785a52197a8c6484b87b2fb402160414499b19ee179791552c19a9a0a515a6c68233149179b39e01180f2a8cefeeed9f905bbdc597101ad02d8f76f62d3e3bc709f9ffb7864f04d60540a5f3cf46f06e46c2b71a24e457a355d1fa0f8aec9850b0e17e8e21a5263de6e72b40e9e31"
            },
          }
        )
        const data = await response.json()
        setGalleryData(data.data[0])
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const openModal = mediaSrc => {
    setSelectedMedia(mediaSrc)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedMedia("")
  }
  const formatDate = (dateString, locale) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date)
  }
  console.log('galleryData', galleryData)
  return (
    <Layout>
      <Seo
        title={galleryData ? galleryData.attributes.meta_title : "Loading..."}
        description={
          galleryData ? galleryData.attributes.meta_description : "Loading..."
        }
      />
      {galleryData ? (
        <>
          <Hero title={galleryData.attributes.page_title} />
          <section className="gallery-sec">
            <div className="gallery-container">
              {galleryData.attributes.sections.data.map(section => {
                return (
                  <div key={section.id} className="image-container-gallery">
                    {section.attributes.section_content.map(content => {
                      if (content.__component === "blocks.multimedia") {
                        const media = content.images.data
                        const textContent = content.content // Capture the content for <p>

                        if (media && media.attributes) {
                          const { mime, formats } = media.attributes

                          if (mime.startsWith("image/")) {
                            return (
                              <>
                                <div className="image-single-gallery">
                                  <img
                                    key={content.id}
                                    src={formats.small.url}
                                    onClick={() => openModal(formats.small.url)}
                                    alt={
                                      media.attributes.alternativeText ||
                                      "Gallery Image"
                                    }
                                    width={media.attributes.width}
                                    height={media.attributes.height}
                                  />
                                  {/* Add content inside <p> */}
                                  <div className="content-single-gallery">
                                    {textContent.map((text, index) => {
                                      switch (text.type) {
                                        case "paragraph":
                                          return (
                                            <p key={index}>
                                              {text.children
                                                .map(child =>
                                                  child.bold ? (
                                                    <strong key={child.text}>
                                                      {child.text}
                                                    </strong>
                                                  ) : (
                                                    child.text
                                                  )
                                                )
                                                .reduce((prev, curr) => [
                                                  prev,
                                                  " ",
                                                  curr,
                                                ])}
                                            </p>
                                          )
                                        case "list":
                                          return (
                                            <ul key={index}>
                                              {text.children.map(
                                                (listItem, listIndex) => (
                                                  <li key={listIndex}>
                                                    {listItem.children
                                                      .map(child =>
                                                        child.bold ? (
                                                          <strong
                                                            key={child.text}
                                                          >
                                                            {child.text}
                                                          </strong>
                                                        ) : (
                                                          child.text
                                                        )
                                                      )
                                                      .reduce((prev, curr) => [
                                                        prev,
                                                        " ",
                                                        curr,
                                                      ])}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )
                                        case "line-break":
                                          return <br key={index} />
                                        default:
                                          return null
                                      }
                                    })}
                                    <h5 className="publishedAt-gallery">
                                      <h6>
                                        <FormattedMessage id="publishedAt" />: {" "}
                                      </h6>
                                      {formatDate(
                                        media.attributes.updatedAt || section.attributes.publishedAt,
                                        locale
                                      )}
                                    </h5>{" "}
                                  </div>
                                </div>
                                <div className="gray-divider"></div>
                              </>
                            )
                          } else if (mime.startsWith("video/")) {
                            return (
                              <>
                                <div className="image-single-gallery">
                                  <video
                                    key={content.id}
                                    controls
                                    onClick={() =>
                                      openModal(media.attributes.url)
                                    }
                                  >
                                    <source
                                      src={media.attributes.url}
                                      type={mime}
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                  {/* Add content inside <p> */}
                                  <div className="content-single-gallery">
                                    {textContent.map((text, index) => {
                                      switch (text.type) {
                                        case "paragraph":
                                          return (
                                            <p key={index}>
                                              {text.children
                                                .map(child =>
                                                  child.bold ? (
                                                    <strong key={child.text}>
                                                      {child.text}
                                                    </strong>
                                                  ) : (
                                                    child.text
                                                  )
                                                )
                                                .reduce((prev, curr) => [
                                                  prev,
                                                  " ",
                                                  curr,
                                                ])}
                                            </p>
                                          )
                                        case "list":
                                          return (
                                            <ul key={index}>
                                              {text.children.map(
                                                (listItem, listIndex) => (
                                                  <li key={listIndex}>
                                                    {listItem.children
                                                      .map(child =>
                                                        child.bold ? (
                                                          <strong
                                                            key={child.text}
                                                          >
                                                            {child.text}
                                                          </strong>
                                                        ) : (
                                                          child.text
                                                        )
                                                      )
                                                      .reduce((prev, curr) => [
                                                        prev,
                                                        " ",
                                                        curr,
                                                      ])}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )
                                        case "line-break":
                                          return <br key={index} />
                                        default:
                                          return null
                                      }
                                    })}
                                    <h5 className="publishedAt-gallery">
                                      <h6>
                                        <FormattedMessage id="publishedAt" />: {" "}
                                      </h6>
                                      {formatDate(
                                        media.attributes.publishedAt || section.attributes.publishedAt,
                                        locale
                                      )}
                                    </h5>{" "}
                                  </div>
                                </div>
                                <div className="gray-divider"></div>
                              </>
                            )
                          }
                        }
                      }

                      return null
                    })}
                  </div>
                )
              })}
            </div>
          </section>
          <Modal isOpen={isModalOpen} onClose={closeModal} imageSrc={selectedMedia} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  )
}

export default GalleryPage
