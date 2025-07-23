// src/components/GreetingComponent.js
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';
import './style/GreetingComponent.css'; // Import your component-specific CSS

const GreetingComponent = () => {
    const { locale } = useLocalization();

    return (
        <div className={`greeting-container ${locale === 'en' ? 'text-left' : 'text-right'}`}>
            <FormattedMessage id="greeting" />
        </div>
    );
};

export default GreetingComponent;
