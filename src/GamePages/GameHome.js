import React from "react"
import Phaser from "phaser";
import Game from "./Game"
import {levels, starting} from "./levels"
import {Button, Tooltip} from "antd"
import { faGrinTongueSquint } from "@fortawesome/free-regular-svg-icons";

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
        showMenu: true,
        showSettings: false,
        deathscreen: false,
        killedBy: null
      }
    }
  
    componentDidMount(){
      config.height = window.innerHeight-100
      config.width = window.innerWidth-100
      game = new Phaser.Game(config)
      game.levels = starting
    }

    componentWillUnmount(){
      window.removeEventListener("keydown")
    }

    finished(){
      this.state.finishedLevel.push(this.state.selectedLevel)
      this.setState({showMenu: true})
      game.scene.pause("default")
    }

    death(way){
      this.setState({deathscreen: true, killedBy: way})
      window.addEventListener("keydown", event => {
        if((event.key === "r" || event.key === "R") && this.state.deathscreen){
          this.restartLevel()
        }
      })
    }

    selectedLevel(id){
      // kill current game
      game.destroy(true)
      this.setState({selectedLevel: id, showMenu: false})
      // create new game with correct level id
      this.initGame(id)
    }

    initGame(id){
      game = new Phaser.Game(config)
      game.levels = levels[id]
      game.finished = () => this.finished()
      game.death = (way) => this.death(way)
      game.restart = () => this.restartLevel()
    }

    restartLevel(){
      game.destroy(true)
      this.setState({deathscreen: false})
      this.initGame(this.state.selectedLevel)
    }

    levelSelection(){
      return(
        <div className="level_selector">
          <div className="explaination">
          <h1 className="explaination_heading">Arcade-Modus</h1>
          <div className="explaination_text">Beende Level um einzelne Seiten freizuschalten. Erreiche mit deiner Spielfigur den Pokal, um ein Level anzuschließen.</div>
          <div className="explaination_setting">Bewegung: Pfeiltasten - Springen: Leertaste - Neustarten: R</div>
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

    settingsIcon(){
      return(
        <div onClick={() => this.handleSettingsMenu()}
        className="settings_icon"></div>
      )
    }

    handleSettingsMenu(){
      if(this.state.showSettings){
        game.scene.resume("default")
        this.setState({showSettings: false})
      }else{
        game.scene.pause("default")
        this.setState({showSettings: true, deathscreen: false})
      }

    }
    restartIcon(){
      return(
        <div 
        onClick={() => this.restartLevel()}
        className="restart_icon"></div>
      )
    }

    settings(){
      return(
        <div className="settings">
          <div className="controll">
            <div className="single_setting">
              <div className="setting_key">Bewegung:</div>
              <div className="setting_value">Pfeiltasten</div>
            </div>
            <div className="single_setting">
              <div className="setting_key">Springen:</div>
              <div className="setting_value">Leertaste</div>
            </div>
            <div className="single_setting">
              <div className="setting_key">Restart:</div>
              <div className="setting_value">R</div>
            </div>
          </div>

          <div className="options">
          <Button 
            type="default" 
            onClick={() => {
              this.handleSettingsMenu()
            }}>Zurück</Button>
            <Button 
            style={{marginLeft: "10px"}}
            type="primary" 
            onClick={() => {
              this.setState({showSettings: false, showMenu: true})
            }}>Hauptmenü</Button>
            
          </div>
        </div>
      )
    }

    deathScreen(){
      const {killedBy} = this.state
      var killText = "Gestorben"
      if(killedBy === "saw"){
        killText = "Durch Säge zweigeteilt"
      }
      else if(killedBy === "spike"){
        killText = "Aufgespießt und serviert"
      }
      else if(killedBy === "rockhead"){
        killText = "Vom Stein begraben"
      }
      return(
        <div>
          <p className="gameover">Game over!</p>
          <p className="killedbytext">{killText}</p>
          <p 
          onClick={() => {
            this.restartLevel()
            this.setState({deathscreen: false})
          }}
          className="restart_text">R to Restart oder hier klicken</p>
        </div>
      )
    }

    render(){
      const {showMenu, showSettings, deathscreen} = this.state
        return(
            <div>
              {showMenu && this.levelSelection()}
              {!showMenu && <div>
                {this.settingsIcon()}
                {this.restartIcon()}
                </div>}
              {deathscreen && this.deathScreen()}
              {showSettings && this.settings()}
              <div className="game">
                <section id="phaser-target"/>
              </div>
            </div>
        )
    }
}

export default GameHome