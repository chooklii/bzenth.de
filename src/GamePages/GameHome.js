import React from "react"
import Phaser from "phaser";
import Game from "./Game"
import {levels, starting} from "./levels"
import {Button, Tooltip} from "antd"

const config = {
  type: Phaser.AUTO,
  parent: "phaser-target",
  width: 0,
  height: 0,
  scene: [Game],
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
    }
  }
}
var game;

const itemsToUnlock = {
  1: "About Me",
  3: "Skills",
  5: "GitHub Projekte",
  7: "Projekte",
  10: "Kontakt"
}

class GameHome extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        gameWidth: 0,
        gameHeight: 0,
        currentLevel: 1,
        finishedLevel: [],
        selectedLevel: null,
        showMenu: true
      }
    }
  
    componentDidMount(){
    
      config.height = window.innerHeight-100
      config.width = window.innerWidth-100

      game = new Phaser.Game(config)
      game.levels = starting
      game.finished = () => this.finished()
      game.death = () => this.death()
    }

    finished(){
      this.state.finishedLevel.push(this.state.selectedLevel)
      this.setState({showMenu: true})
      // kill current game
      //game.destroy(true)
      console.log("finished")
    }

    death(){
      console.log("death")
    }

    selectedLevel(id){
      // kill current game
      game.destroy(true)
      this.setState({selectedLevel: id, showMenu: false})
      // create new game with correct level id
      game = new Phaser.Game(config)
      game.levels = levels[id]
      game.finished = () => this.finished()
      game.death = () => this.death()
    }

    levelSelection(){
      return(
        <div className="level_selector">
          <div className="explaination">
          <h2 className="explaination_heading">Arcade-Modus</h2>
          <div className="explaination_text">Beende Level um einzelne Seiten freizuschalten. Erreiche mit deiner Spielfigur den Pokal, um ein Level anzuschließen. Bewegung: Pfeiltasten - Springen: Leertaste</div>
          </div>
          <div className="level_row">
            {this.singleLevel(1)}
            {this.singleLevel(2)}
            {this.singleLevel(3)}
            {this.singleLevel(4)}
            {this.singleLevel(5)}
          </div>
          <div className="level_row">
            {this.singleLevel(6)}
            {this.singleLevel(7)}
            {this.singleLevel(8)}
            {this.singleLevel(9)}
            {this.singleLevel(10)}

          </div>
        </div>
      )
    }

    singleLevel(levelID){
      const disabled = (levelID == 1 || this.state.finishedLevel.includes(levelID -1)) ? false: true 
      return(
        <div className="single_level">
          <div className="single_level_row">
            <div className={"level l"+levelID}></div>
            <div className="single_level_name">Level {levelID}</div>
          </div>
          {this.unlock_button(levelID)}
          <div className="button_start_level">
          <Tooltip title={disabled ? "Beende das vorherige Level, um dieses zu spielen." : "Klicke hier, um das Level zu starten"}>
          <Button 
            type="primary"
            style={{minWidth: "100%"}}
            onClick={() => this.selectedLevel(levelID)}
            disabled={disabled}>
            <div className="button_start_text">
            <div className="level_play"></div>
            Level starten
            </div>
          </Button>
          </Tooltip>
          </div>
        </div>
      )
    }

    unlock_button(levelID){
      const disabled = this.state.finishedLevel.includes(levelID) ? false: true
      const unlock = Object.keys(itemsToUnlock).includes(levelID.toString()) ? true: false
      if(unlock){
      return(
      <div className="button_start_level">
      <Tooltip title={disabled ? "Beende dieses Level, um diese Seite anzuzeigen." : "Klicke hier, um diese Seite anzuzeigen"}>
      <Button
        style={{minWidth: "100%"}}
        type="dashed"
        disabled={disabled}>
        <div className="button_start_text">
        <div className="unlock_icon"></div>
        {itemsToUnlock[levelID]}
        </div>
      </Button>
      </Tooltip>
      </div>
      )
      }else{
        return(
          <div className="no_unlock">
          </div>
        )
      }
    }

    render(){
      const {showMenu} = this.state
        return(
            <div>
              {showMenu && this.levelSelection()}
              <div className="game">
                <section id="phaser-target"/>
              </div>
            </div>
        )
    }
}

export default GameHome