import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import "./style/ItqanC.css";
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';

const ItqanC = () => {
  const [pageData, setPageData] = useState(null);
  const { locale } = useLocalization();

  useEffect(() => {
    const fetchData = async () => {
      const token = 'd669ad6366aa64f56773be0483825f4c484c013463b9747662f0dee6fe068c486286209e0ddf7210dadcb668fa2a9315793ae3c9d22f8047a5748eeb148d4e6556287f972c9a5c5c94f9c16fa42678d6ced8c78bc5e5463a329f0c0eebcf4514ede98fc323e5acfc03ed6593f69f648d531b39c3efe6db04c71527d5030db760';
      const baseUrl = `https://reports.itqancapital.com/api/pages/?filters[custom_slug][$eq]=home_page&populate[sections][populate][section_content][populate][points][populate]=*&locale=${locale}&populate=title_icon`;
      
      try {
        const response = await fetch(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPageData(data.data[0]); // Assuming you only expect one page of data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!pageData) {
    return <Loader/>;
  }

  const section = pageData.attributes.sections.data[3];
  const points = section.attributes.section_content[0].points || []; // Ensure points is defined

  return (
    <section className='itqan-c-section'>
      <div className='itqan-c-container'>
        <div className='itqan-c-content'>
          <h2>{section.attributes.section_content[0].title}</h2>
          <div className='itqan-c-line'></div>
          <p>{section.attributes.section_content[0].subtitle}</p>
          {points.map((point) => (
            <div key={point.id} className='itqan-c-text'>
              <h6><img src={`${point.title_icon.data.attributes.url}`} alt={point.title_icon.data.attributes.name} /><FormattedMessage id={point.title} /></h6>
              {point.subtitle.map((sub, index) => (
                <div key={index}>
                  {sub.type === 'paragraph' && (
                    <p>{sub.children.map((child, idx) => (
                      <React.Fragment key={idx}>{child.text}</React.Fragment>
                    ))}</p>
                  )}
                    <ul>
                    {sub.type === 'list' && (
                      <>
                        {sub.children.map((item, idx) => (
                          <li key={idx}>
                            <p>
                              {item.children.map((child, cIdx) => (
                                <React.Fragment key={cIdx}>{child.text}</React.Fragment>
                              ))}
                            </p>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                      </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItqanC;
