import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Skills, Contact, Home, NotFound, Private, Projects } from "./Pages";
import { ScrollToTop } from "./Components";

import "../static/style-mobile.css";
import "../static/style-desktop.css";
import "../static/style-tablet.css";
import "../static/style-tablet-large.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <ScrollToTop>
                <Home />
              </ScrollToTop>
            </Route>
            <Route exact path="/projekte">
              <ScrollToTop>
                <Projects />
              </ScrollToTop>
            </Route>
            <Route exact path="/skills">
              <ScrollToTop>
                <Skills />
              </ScrollToTop>
            </Route>
            <Route exact path="/privat">
              <ScrollToTop>
                <Private />
              </ScrollToTop>
            </Route>
            <Route exact path="/kontakt">
              <ScrollToTop>
                <Contact />
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
