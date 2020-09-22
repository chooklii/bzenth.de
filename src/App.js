import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Skills,
  Contact,
  Home,
  NotFound,
  Private,
  Projects,
} from "./Pages";

import "../static/style-mobile.css";
import "../static/style-desktop.css";
import "../static/style-tablet.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/projekte">
              <Projects />
            </Route>
            <Route exact path="/skills">
              <Skills />
            </Route>
            <Route exact path="/privat">
              <Private />
            </Route>
            <Route exact path="/kontakt">
              <Contact />
            </Route>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
