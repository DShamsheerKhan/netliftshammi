import React, { useState, useEffect } from "react"
import axios from "axios"

import Layout from "../../components/layout"
import Hero from "../../components/Hero"
import Seo from "../../components/seo"

import { useLocalization } from "../../context/LocalizationContext"

import PrivateBox from '../../components/PrivateBoxCard';
import InfoPanel from "../../components/InfoPanel"
import AccordionsV2 from "../../components/AccordionV2"
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


const ProductDevelopment = () => {
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
  }, [locale])
  const privateSection = pageData?.sections?.data.find(section => 
    section.attributes?.section_title === "تطوير المنتجات" ||
    section.attributes?.section_title === "Product development"
  );
  const privateSectionHeader = pageData?.sections?.data.find(section => 
    section.attributes?.section_title === "Product development Header" ||
    section.attributes?.section_title === "Product development Header"
  );

  const ProductDevelopmentData = privateSection?.attributes?.section_content || [];
  return (
    <Layout>
      <Seo
        title="خدمات إدارة الأصول في شركة إتقان كابيتال - صناديق الأسهم والمرابحات والعقارات"
        description="اكتشف خدمات إدارة الأصول التي تقدمها شركة إتقان كابيتال، بما في ذلك صناديق الأسهم والمرابحات وصندوق العقارات، واستفد من الاستشارات المالية المخصصة لتحقيق أهداف استثمارية متوافقة مع الضوابط الشرعية."
      />
     <Hero
        title={
          privateSectionHeader?.attributes?.section_content[0]?.title
        }
        subTitle={
          privateSectionHeader?.attributes?.section_content[0]?.subtitle
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

export default ProductDevelopment
