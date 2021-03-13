import React from "react"
import Phaser from "phaser";
import Game from "./Game"
import {levels, starting} from "./level"
import {Button, Tooltip, Row, Col} from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute, faTimes } from "@fortawesome/free-solid-svg-icons";
import {AboutMeGame, SkillsGame, ContactGame, PublicProjectsGame, PrivateProjectsGame, Credits} from "../Pages"
import { music_menu, sea_theme, night_theme, dungeon_theme, cave_theme, field_theme} from "./music"

const minHeight = 650
const minWidth = 1250
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
var currentSong;

const itemsToUnlock = {
  1: "About Me",
  2: "Credits",
  3: "Skills",
  5: "Private Projekte",
  6: "Öffentliche Projekte",
  8: "Kontakt"
}

class GameHome extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        screenWidth: 0,
        finishedLevel: [],
        selectedLevel: null,
        showMenu: true,
        showSettings: false,
        deathscreen: false,
        killedBy: null,
        currentPage: null,
        displayPage: false,
        type: null,
        music_playing: false,
        music_playlist: music_menu,
        music_index: 0
      }
    }
  
    componentDidMount(){
      this.initDefaultGame()
      this.initMusic()
    }

    
    componentWillUnmount(){
      window.removeEventListener("keydown")
      window.removeEventListener("ended")
    }

    initMusic(){
      const starting_index = Math.floor(Math.random() * music_menu.length)
      this.setState([{music_index: starting_index}])
      currentSong = new Audio(music_menu[starting_index])
      currentSong.addEventListener("ended", () => {
        this.playNextSong()
      })
    }

    playNextSong(){
      const {music_index, music_playlist} = this.state
      if(music_index < (music_playlist.length -1)){
        this.setState({music_index: music_index+1})
        currentSong = new Audio(music_playlist[music_index+1])
        currentSong.addEventListener("ended", () => {
          this.playNextSong()
        })
        currentSong.play()
      }else{
        this.setState({music_index: 0})
        currentSong = new Audio(music_playlist[0])
        currentSong.addEventListener("ended", () => {
          this.playNextSong()
        })
        currentSong.play()
      }
    }

    updateMusic(theme){
      if(this.state.music_playing){
      currentSong.pause()
      const starting_index = Math.floor(Math.random() * theme.length)
      this.setState([{music_index: starting_index}])
      currentSong = new Audio(theme[starting_index])
      currentSong.addEventListener("ended", () => {
        this.playNextSong()
      })
      currentSong.play()
      }
    }

    initDefaultGame(){
      const {width, height, type} = this.getScreenSize()
      config.height = height
      config.width = width
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      this.setState({screenWidth: screenWidth, screenHeight: screenHeight})
      if(screenWidth >=minWidth && screenHeight >=minHeight){
      game = new Phaser.Game(config)
      game.levels = starting
      game.restart = () => void(0)
      game.type = type
      game.playMusic = false
      this.setState({type: type})
      }
    }

    getScreenSize(){
      const width = window.innerWidth
      const height = window.innerHeight
      if(width <= 1450 || height <= 750){
        return{
          width: 1200, height: 600, type: "s"
        }
      }else if(width <= 1650 || height <= 850){
        return{
          width: 1400, height: 700, type:"m"
        }
      }else if(width <= 1850 || height <=950){
        return{
          width: 1600, height: 800, type: "l"
        }
      }else{
        return{
          width: 1800, height: 900, type: "xl"
        }
      }
    }

    finished(){
      this.state.finishedLevel.push(this.state.selectedLevel)
      this.updateMusic(music_menu)
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

    selectedLevel(id, music_theme){
      // kill current game
      game.destroy(true)
      this.updateMusic(music_theme)
      this.setState({selectedLevel: id, showMenu: false, music_playlist: music_theme})
      // create new game with correct level id
      this.initGame(id)
    }

    initGame(id){
      game = new Phaser.Game(config)
      game.levels = levels[id]
      game.type = this.state.type
      game.playMusic = this.state.music_playing
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
          <div className="game_back">
            <Button onClick={() => window.location.href="/"}>Zurück zur Startseite</Button>
            {this.renderMusicIconMenu()}
          </div>
          <div className="explaination">
          <h1 className="explaination_heading">Arcade-Modus</h1>
          <div className="explaination_text">Beende Level um einzelne Seiten freizuschalten. Erreiche mit deiner Spielfigur den Pokal, um ein Level anzuschließen.</div>
          <div className="explaination_setting">
            <div className="single_setting">
            <p className="key_setting">Bewegung: </p>
            <p className="value_setting">Pfeiltasten</p>
            </div>
            <div className="single_setting">
            <p className="key_setting">Springen: </p>
            <p className="value_setting">Leertaste</p>
            </div>
            <div className="single_setting">
            <p className="key_setting">Restart: </p>
            <p className="value_setting">R</p>
            </div>
            </div>
          </div>
          <Row className="level_row">
            {this.singleLevel(1, "Getting Started", field_theme)}
            {this.singleLevel(2, "Schlangen S", sea_theme)}
            {this.singleLevel(3, "Kettensägenkantine", cave_theme)}
            {this.singleLevel(4, "Spicy Spike", sea_theme)}
            {this.singleLevel(5, "Obacht Oben", field_theme)}
            {this.singleLevel(6, "Aufregender Aufzug", dungeon_theme)}
            {this.singleLevel(7, "Where is the Way?", night_theme)}
            {this.singleLevel(8, "Furioses Finale", night_theme)}

          </Row>
        </div>
      )
    }

    singleLevel(levelID, levelName, music_theme){
      const disabled = (levelID == 1 || this.state.finishedLevel.includes(levelID -1)) ? false: true 
      return(
        <Col xl={6} xxl={6} lg={8} md={12} sm={12} xs={12}>
          <div className="single_level">
          <div className="single_level_row">
            <div className={"level l"+levelID}></div>
            <div className="single_level_name">{levelName}</div>
          </div>
          {this.unlock_button(levelID)}
          <div className="button_start_level">
          <Tooltip title={disabled ? "Beende das vorherige Level, um dieses zu spielen." : "Klicke hier, um das Level zu starten"}>
          <Button 
            type="primary"
            style={{minWidth: "100%"}}
            onClick={() => this.selectedLevel(levelID, music_theme)}
            disabled={disabled}>
            <div className="button_start_text">
            <div className="level_play"></div>
            Level starten
            </div>
          </Button>
          </Tooltip>
          </div>
          </div>
        </Col>
        
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
        onClick={() => this.setState({displayedPage: levelID, displayPage: true, showMenu: false})}
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
        className="settings_icon" style={{marginTop: "-" + config.height /2 + "px"}}></div>
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
        className="restart_icon" style={{marginTop: "-" + config.height /2 + "px"}}></div>
      )
    }

    settings(){
      return(
        <div 
          className="settings" 
          style={{marginTop: "-" + (config.height/2 - 30) + "px"}}>
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
              this.updateMusic(music_menu)
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

    showPages(){
      const {displayedPage} = this.state
        return(
          <div className="game_pages">
            <div onClick={
              () => this.setState({displayedPage: null, displayPage: false, showMenu: true})} 
              className="back_icon"/>
            <div className="content_game_pages"> 
            {displayedPage === 1 && <AboutMeGame/>}
            {displayedPage === 2 && <Credits/>}
            {displayedPage === 3 && <SkillsGame/>}
            {displayedPage === 5 && <PrivateProjectsGame/>}
            {displayedPage === 6 && <PublicProjectsGame/>}
            {displayedPage === 8 && <ContactGame/>}
            </div>
          </div>
        )

    }

    renderButtons(){
      return(
        <div className="ingame_icons">
                {this.settingsIcon()}
                {this.restartIcon()}
                {this.state.showSettings && this.settings()}
        </div>
      )
    }

    renderMusicIconMenu(){
      const {music_playing} = this.state
      return(
        <div className="mute_icon_game" onClick={() => {
          music_playing && currentSong.pause()
          !music_playing && currentSong.play()
          this.setState({music_playing: !music_playing})
          }}>
          <FontAwesomeIcon icon={music_playing ? faVolumeUp: faVolumeMute}/>
        </div>
      )
    }

    render(){
      const {showMenu, deathscreen, displayPage, screenWidth, screenHeight} = this.state
      if(screenWidth < minWidth || screenHeight < minHeight){
        return(
          <div className="game_home">
            <div className="game_error">
            <h2 className="heading_game">
                    <FontAwesomeIcon icon={faTimes} className="icon_game"/>
                    Bildschirm zu klein
                </h2>
                <p className="game_text">Der genutzte Bildschirm ist leider zu klein, um den Arcade-Modus optimal zu nutzen. Bitte nutze einen Bildschirm, 
                der breiter als {minWidth}px und höher als {minHeight}px ist und besuche die Seite anschließend erneut. Eine Unterstützung für kleinere Bildschirme und Smartphones folgt in einer
                zukünftigen Version.</p>
            </div>
          </div>
        )
      }
      
      return(
            <div className="game_home">

              {showMenu && this.levelSelection()}
              {deathscreen && this.deathScreen()}
              {displayPage && this.showPages()}
              <div className="game">
              {(!showMenu && !displayPage) && this.renderButtons()}
                <section id="phaser-target"/>
              </div>

            </div>
        )
    }
}

export default GameHome