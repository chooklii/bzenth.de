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
var saws;
var finish;
var start;

class Game extends Phaser.Scene{
  constructor(){
    super()
    this.state = {
      rocks: [],
      saws: [],
      spikeheads: [],
      elevatorheads: []
    }
  }

  preload(){
    hit = false
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
  }

  update(){
    !hit && this.movePlayer()
    this.moveRockHeads()
    this.moveElevatorHeads()
    this.moveSpikeheads()
  }

  initWorld(){
    platforms = this.physics.add.staticGroup();
    rockheads = this.physics.add.group({immovable: true, collideWorldBounds: true});
    elevatorHeads = this.physics.add.group({immovable: true, collideWorldBounds: true});
    spikeheads = this.physics.add.group({immovable: true})
    finish = this.physics.add.group({immovable: true})
    saws = this.physics.add.group({immovable: true});

    this.createPlattforms()
    this.addDefaultToHeads()
  }

  addFinish(x,y){
    platforms.create(x-30, y, "terrain", 215)
    platforms.create(x-45, y, "terrain", 215)
    platforms.create(x-60, y, "terrain", 215)
    platforms.create(x-75, y, "terrain", 215)
    finish =  finish.create(x-50, y-35, "idle_finish").setScale(0.75,0.75).refreshBody()
  }

  addStart(x,y){
    start = this.physics.add.staticGroup()
    start.create(x, y, "idle_start")
  }

  createPlattforms(){
    // add Green Body
    platforms.create(0, height-8, "terrain", 7).setScale(width, 1).refreshBody()
    const levels = width >= 1500 ? this.game.levels.large : this.game.levels.small
    // add start
    this.addStart(width * levels.start.x, height * levels.start.y)
    // add finish
    this.addFinish(width *levels.finish.x, height * levels.finish.y)
    // add all other stuff
    levels.spikeheads.forEach(_ => this.addSpikehead(width * _.x, height*_.y))
    levels.plattforms.forEach(_ => this.addThickPlattform(width * _.x, height * _.y, _.scale))
    levels.saws.forEach(_ => this.addSaw(width*_.x, height*_.y, _.amound))
    levels.rockheads.forEach(_ => this.addPlattformWithRockhead(width*_.x, height*_.y, _.scale,_.multiple))
    levels.sticks.forEach(_ => this.addSmallPlattform(width*_.x, height*_.y))
    if(levels.elevator) levels.elevator.forEach(_ => this.addElevatorHead(width*_.x, height*_.y))
  }


  addThickPlattform(x, y, scale){
    platforms.create(x, y, "terrain", 13).setScale(scale, 1).refreshBody()
  }

  addSmallPlattform(x, y){
    platforms.create(x, y, "plattform")
  }

  addSaw(x, y, amound = 1){
    // creates given amound if savs add X / Y position
    var current_x = x
    for(var i = 1; i<=amound; i++){
      const saw = saws.create(current_x, y, "idle_saw")
      saw.anims.play("animation_saw", true)
      this.state.saws.push(saw)
      current_x+=40
      }
  }
  
  addElevatorHead(x, y){
    this.state.elevatorheads.push(elevatorHeads.create(x, y, "idle_rockhead"))
  }

  addPlattformWithRockhead(x, y, scale = 5, multiple = false){
    // create Rockheads
    platforms.create(x, y, "terrain", 13).setScale(scale, 1).refreshBody()
    const positionRockhead = Phaser.Math.Between(x-5*scale, x+5*scale)
    this.state.rocks.push(rockheads.create(positionRockhead, y-70, "idle_rockhead"))
    if(multiple){
      this.state.rocks.push(rockheads.create(positionRockhead+40, y-70, "idle_rockhead"))
    }
  }

  addSpikehead(x, y){
    this.state.spikeheads.push(spikeheads.create(x, y, "idle_spike"))
  }

  addDefaultToHeads(){
    // add the starting y to all rockheads in order to move them up and down
    this.state.rocks.forEach(x => {
      x.defaultY = x.y
    })
    this.state.spikeheads.forEach(x => {
      x.defaultY = x.y
    })
    this.state.elevatorheads.forEach(x => {
      x.setVelocityY(100)
    })
  }

  hitRockhead(){
    // check if player got hit by rockhead or jumped on it
    this.state.rocks.forEach(rockhead => {
      if((player.x +player.displayOriginX > rockhead.x - rockhead.displayOriginX) && (player.x - player.displayOriginX < rockhead.x + rockhead.displayOriginX)){
        if(player.y > rockhead.y && rockhead.body.velocity.y >= 0){
          hit=true
          player.anims.play("hit", true)
          this.game.death("rockhead")
        }
      } 
    })
}

  hitSpikehead(){
    this.state.spikeheads.forEach(single => {
      // check if player and single spikehead are within of 10 values
      if((player.x +player.displayOriginX > single.x - single.displayOriginX -10) && (player.x - player.displayOriginX < single.x + single.displayOriginX +10) &&
        (player.y +player.displayOriginY > single.y - single.displayOriginY -10) && (player.y - player.displayOriginY < single.y + single.displayOriginY +10)){
      if((player.x +player.displayOriginX > single.x - single.displayOriginX) && (player.x - player.displayOriginX < single.x + single.displayOriginX)){
        if(player.y > single.y){
          // player hit spikehead from top
          single.anims.play("spikes_top")
        }
        // player hit spikehead from bottom
        else if(player.y < single.y){
          single.anims.play("spikes_bottom")
        }
      }else{
        if(player.x + player.displayOriginX < single.x - single.displayOriginX){
          // player is left of spikehead
          single.anims.play("spikes_left")
        }else{
          single.anims.play("spikes_right")
        }
      }
    }
    })
    hit=true
    player.anims.play("hit", true)
    this.game.death("spike")
  }

  hitSaw(){
    hit=true
    player.anims.play("hit", true)
    this.game.death("saw")
  }

  finished(){
    finish.anims.play("animation_finish", true)
    this.game.finished()
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
    // finish Animation
    this.anims.create({
      key: "animation_finish",
      frames: this.anims.generateFrameNumbers("animation_finish"),
      frameRate: 20,
      repeat: -1
    })

  }

  initPlayer(){
    player = this.physics.add.sprite(40, height-40, "idle_right")
    player.setCollideWorldBounds(true)
    player.body.setGravityY(400)
  }

  moveRockHeads(){
    this.state.rocks.forEach(single => {
      if(single.y <= single.defaultY){
        single.setVelocityY(200)
      }
      else if(single.y >= single.defaultY+45){
        single.anims.play("bottom_rockhead")
        single.setVelocityY(-20)
      }
    })
  }

  moveElevatorHeads(){
    this.state.elevatorheads.forEach(single => {
      if(single.y < 100){
        single.setVelocityY(300)
      }
      else if(single.body.y + 50 >= height){
        single.anims.play("bottom_rockhead")
        single.setVelocityY(-100)
      }
    })
  }

  moveSpikeheads(){
    this.state.spikeheads.forEach(single => {
      if(single.y <= single.defaultY){
        single.setVelocityY(100)
      }
      else if(single.y >= single.defaultY+100){
        single.setVelocityY(-100)
      }
    })
  }


  movePlayer(){
    const cursors = this.input.keyboard.createCursorKeys();
    const keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    if(keyR.isDown){
      this.game.restart()
    }
    if(cursors.space.isDown && player.body.touching.down){
      player.setVelocityY(-320);
      player.anims.play("jump", true)
    }
    if(cursors.right.isDown){
      lastMovingDirection = "r"
      player.setVelocityX(160);
      player.anims.play("right", true)
    }
    else if(cursors.left.isDown){
      lastMovingDirection = "l"
      player.setVelocityX(-160);
      player.anims.play("left", true)
    }else if(!hit){
      if(lastMovingDirection == "r") player.anims.play("idle_right", true)
       if(lastMovingDirection == "l") player.anims.play("idle_left", true)
      player.setVelocityX(0)
     }
  }

  init(){
  }


}

export default Game
