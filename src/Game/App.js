import React from "react";
import GameHome from "./GameHome";
import { init, trackPages } from "insights-js"

import "../../static/css/style-game.css"
import 'antd/dist/antd.css'

class App extends React.Component {

  componentDidMount(){
    init("OMGVVhafavnD3FVc")
    trackPages()
  }



  render() {
    return (
      <div className="app">
        <GameHome/>
        </div>
    );
  }
}
export default App;