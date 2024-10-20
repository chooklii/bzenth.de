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

import "../../static/css/style-mobile.css";
import "../../static/css/style-desktop.css";
import "../../static/css/style-tablet.css";
import "../../static/css/style-tablet-large.css";
import "../../static/css/style-general.css";
import "antd/dist/antd.css";
import { translations } from "../translations";

const App = () => {
  const [language, setLanguage] = useState("de")

  const getText = (key) => {
    if(key in translations[language]){
      return translations[language][key]
    }
    return translations["de"][key]
  }

  return (
    <BrowserRouter>
      <div className="app">
        <TranslationContext.Provider
c          value={{ language, locales: ["de", "en"], setLanguage, texts: translations, getText }}
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
