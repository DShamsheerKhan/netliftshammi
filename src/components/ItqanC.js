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
      const token = 'ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68';
      const baseUrl = `https://dainty-brigadeiros-5e00ce.netlify.app/api/pages/?filters[custom_slug][$eq]=home_page&populate[sections][populate][section_content][populate][points][populate]=*&locale=${locale}&populate=title_icon`;
      
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
