// src/components/LocalizedLink.js
import React from 'react';
import { Link } from 'gatsby';
import { useLocalization } from '../context/LocalizationContext';

export const LocalizedLink = ({ to, children, target, ...props }) => {
  const { locale } = useLocalization();
  
  // If path starts with /, remove it to avoid double slashes
  const cleanPath = to.startsWith('/') ? to.slice(1) : to;
  
  // Add /en prefix only for English
  const localizedPath = locale === 'en' ? `/en/${cleanPath}` : `/${cleanPath}`;
  
  // If target="_blank" is specified, use a regular anchor tag instead of Gatsby's Link
  if (target === "_blank") {
    return (
      <a href={localizedPath} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  
  // Otherwise use Gatsby's Link component
  return (
    <Link to={localizedPath} {...props}>
      {children}
    </Link>
  );
};

// Helper function for getting localized paths (useful for programmatic navigation)
export const getLocalizedPath = (path, locale) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return locale === 'en' ? `/en/${cleanPath}` : `/${cleanPath}`;
};