
import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility of the button
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    // Scroll to top function
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
  
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    return (
      <>
        {isVisible && (
          <button
            onClick={scrollToTop}
            id='backToTop'
            style={{
              
              position: 'fixed',
              bottom: '40px',
              left: '40px',
              background: '#3F1A58',
              color: 'white',
              border: 'none',
              borderRadius: '100%',
              padding: '10px 11px',
              cursor: 'pointer',
              zIndex: '500',
            }}
          >
            <img src='/arrow-up-line.png'/>
          </button>
        )}
      </>
    );
  };
export default ScrollToTopButton