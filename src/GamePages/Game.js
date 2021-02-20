import Phaser from "phaser";

var player;
var game;

class Game extends Phaser.Scene{
  constructor(){
    super()
  }

  preload(){
    this.load.spritesheet("player_run", "../assets/character/run.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("player_hit", "../assets/character/hit.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("player_idle", "../assets/character/idle.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("player_jump", "../assets/character/jump.png", { frameWidth: 32, frameHeight: 32 })
    this.objects = {}
  }

  create(){
    player = this.physics.add.sprite(200, 200, "player_idle").setScale(1.5)
    player.setCollideWorldBounds(true)
    player.body.setGravityY(300)
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers('player_run'),
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers('player_run', { start: 4, end: 7 }),
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers('player_idle'),
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers('player_jump'),
      frameRate: 15,
      repeat: -1
    })
  }

  update(){
    const cursors = this.input.keyboard.createCursorKeys();
    this.movePlayer(cursors)
  }

  movePlayer(cursors){
    if(cursors.space.isDown && player.body.touching.down){
      player.setVelocityY(-330);
      player.anims.play("jump", true)
    }
    if(cursors.right.isDown){
      player.setVelocityX(160);
      player.anims.play("right", true)
    }
    else if(cursors.left.isDown){
      player.setVelocityX(-160);
      player.anims.play("left", true)
    }else{
      player.anims.play("idle", true)
      player.setVelocityX(0)
     }
  }

  init(){
  }


}

export default Game
