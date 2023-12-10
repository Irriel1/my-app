import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../languages/en.json';
import cz from '../languages/cz.json';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [texts, setTexts] = useState(en);

  useEffect(() => {
    const loadLanguage = async () => {
      // Load language file based on the current language
      const languageFile = language === 'en' ? en : cz;
      setTexts(languageFile);
    };

    loadLanguage();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { LanguageProvider, useLanguage };
