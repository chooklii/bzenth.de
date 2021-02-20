import Phaser from "phaser";

var player;
var platforms;
var rockhead;
var rocks = []
var width;
var height;
var lastMovingDirection = "r"
class Game extends Phaser.Scene{
  constructor(){
    super()
  }

  preload(){
    // player movement
    this.load.spritesheet("run_right", "../assets/character/run_right.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("idle_right", "../assets/character/idle_right.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("run_left", "../assets/character/run_left.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("idle_left", "../assets/character/idle_left.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("jump", "../assets/character/jump.png", { frameWidth: 32, frameHeight: 32 })
    // terrain
    this.load.spritesheet("terrain", "../assets/terrain.png", { frameWidth: 16, frameHeight: 16 })
    this.load.spritesheet("plattform", "../assets/plattform.png", { frameWidth: 16, frameHeight: 16 })
    // traps
    this.load.spritesheet("idle_rockhead", "../assets/rockhead/idle.png", {frameWidth: 42, frameHeight: 42})
    this.load.spritesheet("bottom_rockhead", "../assets/rockhead/bottom_hit.png", {frameWidth: 42, frameHeight: 42})
    this.objects = {}
  }

  create(){
    this.initWorld()
    this.initPlayer()
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(rockhead, platforms);


  }

  update(){
    const cursors = this.input.keyboard.createCursorKeys();
    this.movePlayer(cursors)
    this.moveRockHeads()
  }

  initWorld(){
    width = this.game.config.width
    height = this.game.config.height
    platforms = this.physics.add.staticGroup();
    rockhead = this.physics.add.group();
    this.initPlattforms()
    this.platformWithRockhead()
  }

  initPlattforms(){
    platforms.create(0, height-8, "terrain", 7).setScale(width, 1).refreshBody()
    platforms.create(200, 400, "terrain", 13).setScale(10, 1)
    platforms.create(10, height - 100, "plattform")
  }

  platformWithRockhead(){
    platforms.create(200, 400, "terrain", 13).setScale(10, 1)
    rocks.push(rockhead.create(200, 330, "idle_rockhead"))
  }

  initPlayer(){
    player = this.physics.add.sprite(width/2, height-50, "idle_right")
    player.setCollideWorldBounds(true)
    player.body.setGravityY(400)
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
  }

  moveRockHeads(){
    rocks.forEach(x => {
      console.log(x)
      if(x.body.velocity.equals(0)){
        x.setVelocityY(-20)
      }else{
      x.setVelocityY(100)
      }
    })
  }


  movePlayer(cursors){
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
    }else{
      if(lastMovingDirection == "r") player.anims.play("idle_right", true)
      if(lastMovingDirection == "l") player.anims.play("idle_left", true)
      player.setVelocityX(0)
     }
  }

  init(){
  }


}

export default Game
