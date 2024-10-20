import React from "react";

export const TranslationContext = React.createContext({
    language:"de",
    languageOptions: [],
    getText: () => {},
    setLanguage: () => {},
  });