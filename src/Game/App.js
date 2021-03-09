import React from "react";
import GameHome from "./GameHome";

import "../../static/css/style-game.css"
import 'antd/dist/antd.css'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <GameHome/>
        </div>
    );
  }
}
export default App;