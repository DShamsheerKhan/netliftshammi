import React, { useState, useEffect } from "react"
import axios from "axios"

import Layout from "../../../components/layout"
import Hero from "../../../components/Hero"
import Seo from "../../../components/seo"

import { useLocalization } from "../../../context/LocalizationContext"

import PrivateBox from '../../../components/PrivateBoxCard';
import InfoPanel from "../../../components/InfoPanel"
import AccordionsV2 from "../../../components/AccordionV2"
import { FormattedMessage } from "react-intl"

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="btn-sliider">
      <button onClick={() => swiper.slidePrev()} style={{ transform: "rotate(180deg)" }}>
        <img src='/arrow-circle-right.png' alt="Previous Slide" />
      </button>
      <button onClick={() => swiper.slideNext()} className=''>
        <img src='/arrow-circle-right.png' alt="Next Slide" />
      </button>
    </div>
  )
}


const MultiAssets = () => {
    const { locale } = useLocalization()
  const [pageData, setPageData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://reports.itqancapital.com/api/pages/?filters[custom_slug][%24eq]=asset-management&locale=${locale}&populate[sections][populate][section_content][populate][accordion_link][populate]=*&populate[sections][populate][section_content][populate][Content][populate]=*&populate[sections][populate][section_content][populate]=image`,
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
  }, [locale])
  const privateSection = pageData?.sections?.data.find(section => 
    section.attributes?.section_title === "أصول متعددة" ||
    section.attributes?.section_title === "Multi Assets"
  );
  const privateSectionHeader = pageData?.sections.data.find(
    section =>
      section.attributes?.section_title === "Multi Assets header" ||
      section.attributes?.section_title ===
        "Multi Assets header"
  )?.attributes
  const ProductDevelopmentData = privateSection?.attributes?.section_content || [];
  return (
    <Layout>
      <Seo
        title="خدمات إدارة الأصول في شركة إتقان كابيتال - صناديق الأسهم والمرابحات والعقارات"
        description="اكتشف خدمات إدارة الأصول التي تقدمها شركة إتقان كابيتال، بما في ذلك صناديق الأسهم والمرابحات وصندوق العقارات، واستفد من الاستشارات المالية المخصصة لتحقيق أهداف استثمارية متوافقة مع الضوابط الشرعية."
      />
     <Hero
        title={
          privateSectionHeader?.section_content[0]?.title
        }
        subTitle={
          privateSectionHeader?.section_content[0]?.subtitle
        }
      />
    <section className='private-box-sec'>
        <div className='private-box-container'>
          <Swiper
            className="swiper-Discover"
            breakpointsInverse={true}
            breakpoints={{
              900: { slidesPerView: 1, spaceBetween: 40 },
              1070: { slidesPerView: 2, spaceBetween: 50 },
              1300: { slidesPerView: 2, spaceBetween: 50 },
              1640: { slidesPerView: 3, spaceBetween: 50 },
            }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={0}
            direction="horizontal"
            scrollbar={{ draggable: true }}
            
          >
            <div className='private-box-title'>
              <h2>
                {privateSection?.attributes?.section_title}
              </h2>
              <SliderButtons />
            </div>
            <div className='private-box-card'>
              {ProductDevelopmentData.map((item, index) => (
                <SwiperSlide key={index} className="swiper-Discover-Slide">
                  <PrivateBox
                    title={item?.title}
                    subtitle={item?.subtitle}
                    Button={<FormattedMessage id="private_funds_button" defaultMessage="Invest Now" />}
                    imgSrc={`${item?.image?.data?.attributes?.url}`}
                    size={item?.image?.data?.attributes?.size}
                    link="/Individuals-login"
                    hidebutton="none"
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </section>
    </Layout>
  )
}

export default MultiAssets
