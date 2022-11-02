import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import {
  Skills,
  Contact,
  Home,
  NotFound,
  AboutMe,
  Projects,
  Imprint,
} from "../Pages"
import {
  TranslationContext,
  contentfulClient,
} from "../helper";
import { ScrollToTop } from "../Components";
import { init, trackPages } from "insights-js";

import "../../static/css/style-mobile.css";
import "../../static/css/style-desktop.css";
import "../../static/css/style-tablet.css";
import "../../static/css/style-tablet-large.css";
import "../../static/css/style-general.css";
import "antd/dist/antd.css";

const App = () => {
  const [language, setLanguage] = useState("de");
  const [locales, setLocales] = useState(null);
  const [data, setData] = useState(null);

  const fetchLocales = async () => {
    const entry = await contentfulClient
      .getLocales()
      .catch((err) => console.log(err));

    setLocales(entry.items);
    return entry.items;
  };

  const getData = async (key, byTag = false) => {
    // initial setup, fetch locales and setup empty data
    if (!data && !locales) {
      const fetchedLocales = await fetchLocales();
      const languageOptions = fetchedLocales.map((x) => x.code);
      const emptyData = {};
      languageOptions.forEach((key) => {
        emptyData[key] = {};
      });
      setData(emptyData);
      return checkIfDataExists(emptyData, key, byTag);
    }
    return checkIfDataExists(data, key, byTag);
  };

  const checkIfDataExists = async (data, key, byTag) => {
    // check if key for language is defined, if not fetch data
    if (key in data[language]) {
      return data[language][key];
    } else if(!byTag){
      const fetchedData = await fetchDataByContentType(key)
      data[language][key] = fetchedData
      return fetchedData
    }else{
      const fetchedData = await fetchDataByTag(key)
      data[language][key] = fetchedData
      return fetchedData
    }
  };

  const fetchDataByContentType = async (key) => {
    const fetchedData = await contentfulClient.getEntries({
      content_type: key,
      locale: language,
    });
    return fetchedData.items;
  };

  const fetchDataByTag = async (key) => {
    const fetchedData = await contentfulClient.getEntries({
      [`metadata.tags[${key}]`]: true,
      locale: language
    })
    return fetchedData.items;
  };

  useEffect(() => {

    if (location.hostname != "localhost") {
      init("OMGVVhafavnD3FVc");
      trackPages();
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <TranslationContext.Provider
          value={{ language, locales, setLanguage, getData }}
        >
          <Switch>
            <Route exact path="/">
              <ScrollToTop>
                <Home game={false}/>
              </ScrollToTop>
            </Route>
            <Route exact path="/projekte">
              <ScrollToTop>
                <Projects game={false}/>
              </ScrollToTop>
            </Route>
            <Route exact path="/skills">
              <ScrollToTop>
                <Skills game={false}/>
              </ScrollToTop>
            </Route>
            <Route exact path="/privat">
              <ScrollToTop>
                <AboutMe game={false}/>
              </ScrollToTop>
            </Route>
            <Route exact path="/kontakt">
              <ScrollToTop>
                <Contact game={false}/>
              </ScrollToTop>
            </Route>
            <Route exact path="/impressum">
              <ScrollToTop>
                <Imprint/>
              </ScrollToTop>
            </Route>
            <Route path="/*">
              <ScrollToTop>
                <NotFound />
              </ScrollToTop>
            </Route>
          </Switch>
        </TranslationContext.Provider>
      </div>
    </BrowserRouter>
  );
};
export default App;
