import React from "react";

export const TranslationContext = React.createContext({
    language:"de",
    languageOptions: [],
    setLanguage: () => {},
    getData: async () => {}
  });