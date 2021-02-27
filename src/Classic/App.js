import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Skills, Contact, Home, NotFound, AboutMe, PublicProjects, Imprint } from "../Pages";
import GameHome from "../Game/GameHome";
import { ScrollToTop } from "../Components";

import "../../static/style-mobile.css";
import "../../static/style-desktop.css";
import "../../static/style-tablet.css";
import "../../static/style-tablet-large.css";
import "../../static/style-game.css";
import 'antd/dist/antd.css'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <ScrollToTop>
                <GameHome />
              </ScrollToTop>
            </Route>
            <Route exact path="/projekte">
              <ScrollToTop>
                <PublicProjects />
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
