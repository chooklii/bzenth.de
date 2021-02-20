import React from "react"
import Phaser from "phaser";
import Game from "./Game"

class GameHome extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        gameWidth: 0,
        gameHeight: 0,
      }
    }
  
    componentDidMount(){
      const gameWidth = window.innerWidth-100
      const gameHeight = window.innerHeight-100
      this.setState({
        gameWidth: gameWidth,
        gameHeight: gameHeight
      })

      const config = {
        type: Phaser.AUTO,
        parent: "phaser-target",
        width: gameWidth,
        height: gameHeight,
        scene: [Game],
        physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 300 },
              debug: false
          }
        }
      }
      const game = new Phaser.Game(config)
    }

    render(){

        return(
            <div>
              <div className="header"></div>
              <div className="game">
                <section id="phaser-target"/>
              </div>
            </div>
        )
    }
}

export default GameHome