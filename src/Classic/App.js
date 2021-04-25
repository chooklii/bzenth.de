import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Skills, Contact, Home, NotFound, AboutMe, PublicProjects, Imprint, PrivateProjects } from "../Pages";
import { ScrollToTop } from "../Components";
import { init, trackPages } from "insights-js"

import "../../static/css/style-mobile.css";
import "../../static/css/style-desktop.css";
import "../../static/css/style-tablet.css";
import "../../static/css/style-tablet-large.css";
import "../../static/css/style-general.css"
import 'antd/dist/antd.css'

class App extends React.Component {

  componentDidMount(){
    init("OMGVVhafavnD3FVc")
    trackPages()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <ScrollToTop>
                <Home />
              </ScrollToTop>
            </Route>
            <Route exact path="/projekte/offentlich">
              <ScrollToTop>
                <PublicProjects />
              </ScrollToTop>
            </Route>
            <Route exact path="/projekte/privat">
              <ScrollToTop>
                <PrivateProjects />
              </ScrollToTop>
            </Route>
            <Route exact path="/skills">
              <ScrollToTop>
                <Skills />
              </ScrollToTop>
            </Route>
            <Route exact path="/privat">
              <ScrollToTop>
                <AboutMe />
              </ScrollToTop>
            </Route>
            <Route exact path="/kontakt">
              <ScrollToTop>
                <Contact />
              </ScrollToTop>
            </Route>
            <Route exact path="/impressum">
              <ScrollToTop>
                <Imprint />
              </ScrollToTop>
            </Route>
            <Route path="/*">
              <ScrollToTop>
                <NotFound />
              </ScrollToTop>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
