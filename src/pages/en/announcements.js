import React, { useState, useEffect, useRef } from 'react';
import Layout from "../../components/layout";
import ScrollToTopButton from '../../components/ScrollToTopButton';
import Hero from '../../components/Hero';
import AnnouncementsBox from '../../components/AnnouncementsBox';
import "../../components/style/Announcements.css";
import Seo from '../../components/seo';
import { Player } from '@lottiefiles/react-lottie-player';
import loaderl from "../../Json/loaderl.json";
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../../context/LocalizationContext';

const Announcements = () => {
  const { locale } = useLocalization();
  const [announcements, setAnnouncements] = useState([]);
  const [Data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://reports.itqancapital.com/api/pages/?filters[custom_slug][%24eq]=announcements&locale=${locale}&populate[sections][populate][section_content][populate][subtitle][populate]=*&populate=image`, {
          headers: {
            'Authorization': 'Bearer 0f4719065f4e32664cb04309b82a4deaa30b50a0264f656cad02f6b14b32a0ebe1f2b9605877ea25251f33c38f65b1b670a6191ded56603d831cdebb5c953db6a38b2f3beb03af16455955777e26b8a7d1bc84da0b7f76266a921b28b97510409a46a88d2b68ee04e3266b206cc877d951249dde9b7967e6e2e278c67b6ccc38'
          }
        });
        const data = await response.json();
        const Data =data.data[0].attributes;
        setData(Data);
        const announcementsData = data.data[0].attributes.sections.data[0].attributes.section_content[0].subtitle;
        setAnnouncements(announcementsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const renderAnnouncementContent = (content) => {
    return content.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index}>
            {block.children.map((child, idx) => {
              if (child.type === 'text') {
                return (
                  <span key={idx} style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                    {child.text}
                  </span>
                );
              } else if (child.type === 'link') {
                return (
                  <a key={idx} href={child.url}>
                    {child.children.map((linkChild, linkIdx) => (
                      <span key={linkIdx}>{linkChild.text}</span>
                    ))}
                  </a>
                );
              }
              return null;
            })}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <Layout>
      <Seo
        title={Data.meta_title}
        description={Data.meta_description}
      />
      <ScrollToTopButton />
      <Hero title={Data.page_title} />
      <section className='Announcements-sec'>
        <div className='Announcements-container'>
          <div className='Announcements-content'>
            <h3>{Data.page_title}</h3>
            {loading ? (
              <div ref={loaderRef} style={{ height: '100px', margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
                <Player autoplay loop src={loaderl} style={{ height: '100px', width: '100px' }} />
              </div>
            ) : (
              announcements.map((announcement, index) => (
                <AnnouncementsBox
                  key={index}
                  p1={renderAnnouncementContent(announcement.subtitle)}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Announcements;