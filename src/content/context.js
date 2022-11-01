import React, { useState, useEffect, useContext } from "react";

export const TranslationContext = React.createContext({
    language:"de",
    languageOptions: [],
    setLanguage: () => {},
    getData: async () => {}
  });