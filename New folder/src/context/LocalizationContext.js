import React, { createContext, useState, useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import messages_en from '../lang/en.json';
import messages_ar from '../lang/ar.json';

const messages = {
  ar: messages_ar,
  en: messages_en,
};

const SUPPORTED_LOCALES = ['ar', 'en'];
const DEFAULT_LOCALE = 'ar';

const LocalizationContext = createContext({
  locale: DEFAULT_LOCALE,
  changeLocale: () => {},
});

export const LocalizationProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check if path starts with /en
      if (window.location.pathname.startsWith('/en')) {
        return 'en';
      }
      
      // Check localStorage
      const savedLocale = localStorage.getItem('locale');
      if (savedLocale === 'en') {
        return 'en';
      }
    }
    return 'ar';
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'ltr' : 'ltr';
  }, [locale]);

  const changeLocale = (newLocale) => {
    if (newLocale !== locale && SUPPORTED_LOCALES.includes(newLocale)) {
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
      
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search;
        const currentHash = window.location.hash;
        
        let newPath;
        if (newLocale === 'ar') {
          // Remove /en prefix for Arabic
          newPath = `${currentPath.replace(/^\/en/, '')}${currentSearch}${currentHash}`;
        } else {
          // Add /en prefix for English
          const pathWithoutEn = currentPath.replace(/^\/en/, '');
          newPath = `/en${pathWithoutEn}${currentSearch}${currentHash}`;
        }
        
        // Perform hard reload by changing window.location
        window.location.href = newPath;
      }
    }
  };

  return (
    <LocalizationContext.Provider value={{ locale, changeLocale }}>
      <IntlProvider 
        locale={locale} 
        messages={messages[locale]}
        defaultLocale={DEFAULT_LOCALE}
      >
        {children}
      </IntlProvider>
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);