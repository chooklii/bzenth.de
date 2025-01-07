import Phaser from "phaser";

var player;
var width;
var height;
var lastMovingDirection = "r"
var hit = false
var platforms;
var rockheads;
var elevatorHeads;
var spikeheads;
var fires;
var saws;
var spikes;
var finish;
var start;


const rockheadUpTempo = -100
const deathsound = new Audio("../assets/sounds/gameover.wav")
const finishsound = new Audio("../assets/sounds/finish.wav")

class Game extends Phaser.Scene{
  constructor(){
    super()
    this.state = {
      rocks: [],
      saws: [],
      spikeheads: [],
      fires: [],
      elevatorheads: [],
      spikes: [],
      startRun: null
    }
  }

  preload(){
    // reset game to enable full reload functionality
    hit = false
    deathsound.pause()
    deathsound.currentTime = 0
    // player movement
    this.load.spritesheet("run_right", "../assets/character/run_right.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("idle_right", "../assets/character/idle_right.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("run_left", "../assets/character/run_left.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("idle_left", "../assets/character/idle_left.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("jump", "../assets/character/jump.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("hit", "../assets/character/hit.png", { frameWidth: 32, frameHeight: 32 })
    // terrain
    this.load.spritesheet("terrain", "../assets/terrain.png", { frameWidth: 16, frameHeight: 16 })
    this.load.spritesheet("plattform", "../assets/plattform.png", { frameWidth: 16, frameHeight: 16 })
    this.loadBackground()
    // traps
    this.load.spritesheet("idle_rockhead", "../assets/rockhead/idle.png", {frameWidth: 42, frameHeight: 42})
    this.load.spritesheet("bottom_rockhead", "../assets/rockhead/bottom_hit.png", {frameWidth: 42, frameHeight: 42})
    this.load.spritesheet("idle_saw", "../assets/saw/idle.png", {frameWidth: 38, frameHeight: 38})
    this.load.spritesheet("animation_saw", "../assets/saw/animation.png", {frameWidth: 38, frameHeight: 38})
    this.load.spritesheet("idle_spike", "../assets/rockheadSpikes/idle.png", {frameWidth: 54, frameHeight: 52})
    this.load.spritesheet("blink_spike", "../assets/rockheadSpikes/blink.png", {frameWidth: 54, frameHeight: 52})
    this.load.spritesheet("bottom_spike", "../assets/rockheadSpikes/bottom_hit.png", {frameWidth: 54, frameHeight: 52})
    this.load.spritesheet("left_spike", "../assets/rockheadSpikes/left_hit.png", {frameWidth: 54, frameHeight: 52})
    this.load.spritesheet("right_spike", "../assets/rockheadSpikes/right_hit.png", {frameWidth: 54, frameHeight: 52})
    this.load.spritesheet("top_spike", "../assets/rockheadSpikes/top_hit.png", {frameWidth: 54, frameHeight: 52})

    this.load.spritesheet("fire_on", "../assets/fire/On.png", {frameWidth: 16, frameHeight: 32})
    this.load.spritesheet("fire_off", "../assets/fire/Off.png", {frameWidth: 16, frameHeight: 32})
    this.load.spritesheet("fire_hit", "../assets/fire/Hit.png", {frameWidth: 16, frameHeight: 32})

    this.load.spritesheet("idle_spike_bottom", "../assets/spike/Idle.png", { frameWidth: 16, frameHeight: 16})

    // start and finish
    this.load.spritesheet("idle_start", "../assets/start/idle.png", {frameWidth: 64, frameHeight: 64})
    this.load.spritesheet("animation_start", "../assets/start/animation.png", {frameWidth: 64, frameHeight: 64})
    this.load.spritesheet("idle_finish", "../assets/finish/idle.png", {frameWidth: 64, frameHeight: 64})
    this.load.spritesheet("animation_finish", "../assets/finish/animation.png", {frameWidth: 64, frameHeight: 64})
    this.objects = {}
  }

  loadBackground(){
    const background = this.game.levels.background
    this.load.image("background", `../assets/backgrounds/${background}.png`)
  }

  create(){
    width = this.game.config.width
    height = this.game.config.height
    
    this.add.tileSprite(width/2, height/2, width, height, "background")
    this.initAnimations()
    this.initWorld()
    this.initPlayer()

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(rockheads, platforms);
    this.physics.add.collider(rockheads, player, this.hitRockhead, null, this)
    this.physics.add.collider(elevatorHeads, player, this.hitElevatorRockhead, null, this)
    this.physics.add.collider(saws, player, this.hitSaw, null, this)
    this.physics.add.collider(player, finish, this.finished, null, this)
    this.physics.add.collider(player, spikeheads, this.hitSpikehead, null, this)
    this.physics.add.collider(fires, player, this.hitFire, null, this)
    this.physics.add.collider(spikes, player, this.hitSpike, null, this)
  }

  update(){
    !hit && this.movePlayer()
    this.moveRockHeads()
    this.moveElevatorHeads()
    this.moveSpikeheads()
    this.toggleFire()
  }

  initWorld(){
    platforms = this.physics.add.staticGroup();
    rockheads = this.physics.add.group({immovable: true, collideWorldBounds: true});
    elevatorHeads = this.physics.add.group({immovable: true, collideWorldBounds: true});
    spikeheads = this.physics.add.group({immovable: true})
    fires = this.physics.add.group({immovable: true});
    finish = this.physics.add.group({immovable: true});
    saws = this.physics.add.group({immovable: true});
    spikes = this.physics.add.group({immovable: true})

    this.createPlattforms()
    this.addDefaultToObjects()
  }

  addFinish(x,y){
    const differenceBetween = 15*this.game.scaleFactor
    platforms.create(x-differenceBetween*2, y, "terrain", 215).setScale(this.game.scaleFactor, this.game.scaleFactor)
    platforms.create(x-differenceBetween*3, y, "terrain", 215).setScale(this.game.scaleFactor, this.game.scaleFactor)
    platforms.create(x-differenceBetween*4, y, "terrain", 215).setScale(this.game.scaleFactor, this.game.scaleFactor)
    platforms.create(x-differenceBetween*5, y, "terrain", 215).setScale(this.game.scaleFactor, this.game.scaleFactor)
    finish =  finish.create(x-50*this.game.scaleFactor, y-35*this.game.scaleFactor, "idle_finish").setScale(0.75*this.game.scaleFactor,0.75*this.game.scaleFactor).refreshBody()
  }

  addStart(x,y){
    start = this.physics.add.staticGroup()
    start.create(x, y, "idle_start").setScale(this.game.scaleFactor, this.game.scaleFactor)
  }

  createPlattforms(){
    // add Green Body
    platforms.create(0, height-8, "terrain", 7).setScale(width*this.game.scaleFactor, this.game.scaleFactor).refreshBody()
    const levels = this.game.levels.data
    if(!levels) return
    // add start
    this.addStart(width * levels.start.x, height * levels.start.y)
    // add finish
    this.addFinish(width *levels.finish.x, height * levels.finish.y)
    // add all other stuff
    levels.spikeheads.forEach(_ => this.addSpikehead(width * _.x, height*_.y))
    levels.fires.forEach(_ => this.addFires(width * _.x, height *_.y))
    levels.plattforms.forEach(_ => this.addThickPlattform(width * _.x, height * _.y, _.scale))
    levels.saws.forEach(_ => this.addSaw(width*_.x, height*_.y,  _.amound))
    levels.rockheads.forEach(_ => this.addPlattformWithRockhead(width*_.x, height*_.y, _.scale,_.multiple))
    levels.sticks.forEach(_ => this.addSmallPlattform(width*_.x, height*_.y))
    levels.spikes.forEach(_ => this.addSpike(width*_.x, height*_.y, _.plattform))
    if(levels.elevator) levels.elevator.forEach(_ => this.addElevatorHead(width*_.x, height*_.y))
  }


  addThickPlattform(x, y, scale){
    platforms.create(x, y, "terrain", 13).setScale(scale*this.game.scaleFactor, this.game.scaleFactor).refreshBody()
  }

  addSmallPlattform(x, y){
    platforms.create(x, y, "plattform").setScale(this.game.scaleFactor, this.game.scaleFactor)
  }

  addSpike(x, y, plattform){
    this.state.spikes.push(spikes.create(x, y, "idle_spike_bottom").setScale(this.game.scaleFactor, this.game.scaleFactor))
    if(plattform){
      platforms.create(x, y+(16*this.game.scaleFactor), "terrain", 1).setScale(this.game.scaleFactor, this.game.scaleFactor).refreshBody()
    }
  }

  addSaw(x, y, amound = 1){
    // creates given amound if savs add X / Y position
    var current_x = x
    for(var i = 1; i<=amound; i++){
      const saw = saws.create(current_x, y, "idle_saw").setScale(this.game.scaleFactor, this.game.scaleFactor)
      saw.anims.play("animation_saw", true)
      this.state.saws.push(saw)
      current_x+=(40*this.game.scaleFactor)
      }
  }
  
  addElevatorHead(x, y){
    this.state.elevatorheads.push(elevatorHeads.create(x, y, "idle_rockhead").setScale(this.game.scaleFactor, this.game.scaleFactor))
  }

  addPlattformWithRockhead(x, y, scale = 5, multiple = false){
    // create Rockheads
    platforms.create(x, y, "terrain", 13).setScale(scale*this.game.scaleFactor, this.game.scaleFactor).refreshBody()
    const positionRockhead = Phaser.Math.Between(x-5*scale*this.game.scaleFactor, x+5*scale*this.game.scaleFactor)
    this.state.rocks.push(rockheads.create(positionRockhead, y-(70*this.game.scaleFactor), "idle_rockhead").setScale(this.game.scaleFactor, this.game.scaleFactor))
    if(multiple){
      this.state.rocks.push(rockheads.create(positionRockhead+(40*this.game.scaleFactor), y-(70*this.game.scaleFactor), "idle_rockhead").setScale(this.game.scaleFactor, this.game.scaleFactor))
    }
  }
  
  addFires(x, y){
    this.state.fires.push(fires.create(x, y, "fire_off").setScale(this.game.scaleFactor, this.game.scaleFactor))
  }

  addSpikehead(x, y){
    this.state.spikeheads.push(spikeheads.create(x, y, "idle_spike").setScale(this.game.scaleFactor, this.game.scaleFactor))
  }

  addDefaultToObjects(){
    // add the starting y to all rockheads in order to move them up and down
    this.state.rocks.forEach(x => {
      x.defaultY = x.y
    })
    this.state.spikeheads.forEach(x => {
      x.defaultY = x.y
    })
    this.state.elevatorheads.forEach(x => {
      x.setVelocityY(100*this.game.scaleFactor)
    })
    // add state and current Date to fire
    this.state.fires.forEach(x => {
      x.active = true;
      x.anims.play("fire_on")
      x.activeChangeTime = Date.now()
    })
  }

  hitSpike(){
    this.state.spikes.forEach(spike => {
      if(spike.body.touching.up){
        player.anims.play("hit", true)
        this.playerdeath("spike_bottom")
      }
    })
  }

  hitFire(){ 
    const activeFires = this.state.fires.filter(_ => _.active)
    activeFires.forEach(fire => {
      if(fire.body.touching.up){
        player.anims.play("hit", true)
        fire.anims.play("fire_hit", true)
        this.playerdeath("fire")
      }
    })

  }

  hitRockhead(){
    this.state.rocks.forEach(rockhead => {
      if(rockhead.body.touching.down && rockhead.body.velocity.y >= 0){
          player.anims.play("hit", true)
          this.playerdeath("rockhead")
    }
    })
}

hitElevatorRockhead(){
  this.state.elevatorheads.forEach(rockhead => {
    if(rockhead.body.touching.down && rockhead.body.velocity.y >= 0){
        player.anims.play("hit", true)
        this.playerdeath("rockhead")
        }  
  })
}

playerdeath(type){
  if(deathsound.currentTime == 0 && this.game.playMusic) deathsound.play()
  if(!hit){
    hit=true
    this.state.startRun=null
    this.game.death(type)
  }
}

  hitSpikehead(){
    this.state.spikeheads.forEach(single => {
      if(!single.body.touching.none){
        if(player.y > single.y){
          // player hit spikehead from top
          single.anims.play("spikes_top")
        }
        // player hit spikehead from bottom
        else if(player.y < single.y){
          single.anims.play("spikes_bottom")
      }else{
        if(player.x + player.displayOriginX < single.x - single.displayOriginX){
          // player is left of spikehead
          single.anims.play("spikes_left")
        }else{
          single.anims.play("spikes_right")
        }
      }
    }})
    player.anims.play("hit", true)
    this.playerdeath("spike")
  }

  hitSaw(){
    player.anims.play("hit", true)
    this.playerdeath("saw")
  }

  finished(){
    this.game.playMusic && finishsound.play()
    finish.anims.play("animation_finish", true)

    const runTime = Date.now() - this.state.startRun
    this.game.finished(runTime)
  }

  initAnimations(){
    // Player Animations
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers('run_right'),
      frameRate: 20,
      repeat: -1
    })
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers('run_left'),
      frameRate: 20,
      repeat: -1
    })
    this.anims.create({
      key: "idle_right",
      frames: this.anims.generateFrameNumbers('idle_right'),
      frameRate: 20,
      repeat: -1
    })
    this.anims.create({
      key: "idle_left",
      frames: this.anims.generateFrameNumbers('idle_left'),
      frameRate: 20,
      repeat: -1
    })
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers('jump'),
      frameRate: 20,
    })
    this.anims.create({
      key: "hit",
      frames: this.anims.generateFrameNumbers('hit'),
      frameRate: 20,
    })
    // Rockhead Animation
    this.anims.create({
      key: "bottom_rockhead",
      frames: this.anims.generateFrameNumbers("bottom_rockhead"),
      frameRate: 20, 
    })
    // Saw Animation
    this.anims.create({
      key: "animation_saw",
      frames: this.anims.generateFrameNumbers("animation_saw"),
      frameRate: 20,
      repeat: -1
    })
    // Fire
    this.anims.create({
      key: "fire_hit",
      frames: this.anims.generateFrameNumbers("fire_hit"),
      repeat: -1
    })
    this.anims.create({
      key: "fire_on",
      frames: this.anims.generateFrameNumbers("fire_on"),
      frameRate: 20,
      repeat: -1,
      repeatDelay: 0,
      yoyo: true
    })
    this.anims.create({
      key: "fire_off",
      frames: this.anims.generateFrameNumbers("fire_off"),
      frameRate: 20,
    })
    this.anims.create({
      key: "spikes_bottom",
      frames: this.anims.generateFrameNumbers("bottom_spike"),
      frameRate: 20
    })
    this.anims.create({
      key: "spikes_left",
      frames: this.anims.generateFrameNumbers("left_spike"),
      frameRate: 20
    })
    this.anims.create({
      key: "spikes_right",
      frames: this.anims.generateFrameNumbers("right_spike"),
      frameRate: 20
    })
    this.anims.create({
      key: "spikes_top",
      frames: this.anims.generateFrameNumbers("top_spike"),
      frameRate: 20
    })
    this.anims.create({
      key: "spikes_blink",
      frames: this.anims.generateFrameNumbers("blink_spike"),
      frameRate: 20
    })
    this.anims.create({
      key: "animation_finish",
      frames: this.anims.generateFrameNumbers("animation_finish"),
      frameRate: 20,
      repeat: -1
    })

  }

  initPlayer(){
    player = this.physics.add.sprite(40, height-40, "idle_right").setScale(this.game.scaleFactor, this.game.scaleFactor)
    player.setCollideWorldBounds(true)
    player.body.setGravityY(400*this.game.scaleFactor)
  }

  moveRockHeads(){
    this.state.rocks.forEach(single => {
      if(single.y <= single.defaultY){
        single.setVelocityY(200*this.game.scaleFactor)
      }
      else if(single.y >= single.defaultY+(45*this.game.scaleFactor)){
        single.anims.play("bottom_rockhead")
        single.setVelocityY(-(20*this.game.scaleFactor))
      }
      else if(single.body.velocity.y === 0){
        single.setVelocityY(200*this.game.scaleFactor)
      }
    })
  }

  moveElevatorHeads(){
    this.state.elevatorheads.forEach(single => {
      if(single.y < 100*this.game.scaleFactor){ 
        single.setVelocityY(300*this.game.scaleFactor)
      }
      else if(single.body.y + (50*this.game.scaleFactor) >= height){
        single.anims.play("bottom_rockhead")
        single.setVelocityY(rockheadUpTempo*this.game.scaleFactor)
      }
      else if(single.body.velocity.y === 0){
        single.setVelocityY(300*this.game.scaleFactor)
      }
    })
  }

  toggleFire(){
    this.state.fires.forEach(single => {
      const currentDate = Date.now();
      // Change Fire every two seconds
      if(currentDate - single.activeChangeTime > 2000){
        if(single.active){
          
          single.setSize(32*this.game.scaleFactor, 15*this.game.scaleFactor)
          single.active = false;
          // ugly fix to prevent endless fire on animation :-)
          single.anims.play("fire_off")
          single.activeChangeTime = currentDate
        }
        else{          
          single.active = true;
          this.hitFire()
          single.setSize(32*this.game.scaleFactor, 32*this.game.scaleFactor)
          single.anims.play("fire_on")
          single.activeChangeTime = currentDate
        }
      }
    }
    )
  }

  moveSpikeheads(){
    this.state.spikeheads.forEach(single => {
      if(single.y <= single.defaultY){
        single.setVelocityY(100*this.game.scaleFactor)
      }
      else if(single.y >= single.defaultY+(100*this.game.scaleFactor)){
        single.setVelocityY(rockheadUpTempo*this.game.scaleFactor)
      }
    })
  }

  setStartDate(){
    if(this.state.startRun === null){
      this.state.startRun = Date.now()
    }
  }


  movePlayer(){
    const cursors = this.input.keyboard.createCursorKeys();
    const keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    if(keyR.isDown){
      this.game.restart()
      this.state.startRun = null;
    }
    if(cursors.space.isDown && player.body.touching.down){
      this.setStartDate()
      player.setVelocityY(-320*this.game.scaleFactor);
      player.anims.play("jump", true)
    }
    if(cursors.right.isDown){
      this.setStartDate()
      lastMovingDirection = "r"
      player.setVelocityX(160*this.game.scaleFactor);
      player.anims.play("right", true)
    }
    else if(cursors.left.isDown){
      this.setStartDate()
      lastMovingDirection = "l"
      player.setVelocityX(-160*this.game.scaleFactor);
      player.anims.play("left", true)
    }else if(!hit){
      if(lastMovingDirection == "r") player.anims.play("idle_right", true)
       if(lastMovingDirection == "l") player.anims.play("idle_left", true)
      player.setVelocityX(0)
     }
  }

  init(){}

}

export default Game
