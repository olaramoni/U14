var start=true
var gravity = 0.3;
var players =
    {
      playerOne:
      {
        score: 0,
        sprite: "",
        leftBoundary:0,
        rightBoundary:500,
        xPosition:250
      },
      playerTwo:
      {
        score: 0,
        sprite: "",
        leftBoundary:500,
        rightBoundary:1000,
        xPosition:750
      }
    }

var sprites = {
  ball:{
    sprite:""
  },
  walls:{
    rightWall:"",
    leftWall:"",
    bottomWall:"",
    topWall:""
  },
  divider:{
  divOne:""
  },
  scores: {
    playerOneScore:"",
    playerTwoScore:""
    }
}

function setup(){
    createCanvas(1000,700)
    players.playerOne.sprite=createSprite(players.playerOne.xPosition, 600, 100,64)
    players.playerOne.sprite.scale=0.7
    players.playerOne.sprite.addAnimation("playerOne", "images/playerOne.png")
    players.playerOne.sprite.immovable=true
    players.playerTwo.sprite=createSprite(players.playerTwo.xPosition, 600, 100,64)
    players.playerTwo.sprite.addAnimation("playerTwo", "images/playerTwo.png")
    players.playerTwo.sprite.scale=0.7
    players.playerTwo.sprite.immovable=true
    sprites.ball.sprite=createSprite(500,100,1,1)
    sprites.ball.sprite.scale=0.3
    sprites.ball.sprite.addAnimation("Ball", "images/ball.png")
    sprites.walls.rightWall=createSprite(1000,350,1,700)
    sprites.walls.rightWall.immovable=true
    sprites.walls.leftWall=createSprite(0,350,1,700)
    sprites.walls.leftWall.immovable=true
    sprites.walls.bottomWall=createSprite(500,700,1000,1)
    sprites.walls.bottomWall.immovable=true
    sprites.walls.topWall=createSprite(500,0,1000,1)
    sprites.walls.topWall.immovable=true
    sprites.divider.divOne=createSprite(500,550,1,300)
    sprites.divider.divOne.immovable=true
    bg=loadImage("images/background.jpg")
    sprites.playerOneScore=createSprite(400,100,1,1)
    sprites.playerTwoScore=createSprite(600,100,1,1)
    sprites.playerOneScore.addAnimation("P1Zero", "images/zero.png")
    sprites.playerOneScore.addAnimation("P1One", "images/one.png")
    sprites.playerOneScore.addAnimation("P1Two", "images/two.png")
    sprites.playerOneScore.addAnimation("P1Three", "images/three.png")
    sprites.playerOneScore.addAnimation("P1Four", "images/four.png")
    sprites.playerOneScore.addAnimation("P1Five", "images/five.png")
    sprites.playerTwoScore.addAnimation("P2Zero", "images/zero.png")
    sprites.playerTwoScore.addAnimation("P2One", "images/one.png")
    sprites.playerTwoScore.addAnimation("P2Two", "images/two.png")
    sprites.playerTwoScore.addAnimation("P2Three", "images/three.png")
    sprites.playerTwoScore.addAnimation("P2Four", "images/four.png")
    sprites.playerTwoScore.addAnimation("P2Five", "images/five.png")    
  }
function setScores(){
    if (players.playerOne.score==0){
        sprites.playerOneScore.changeAnimation("P1Zero")
    }
    if (players.playerOne.score==1){
        sprites.playerOneScore.changeAnimation("P1One")
    }
    if (players.playerOne.score==2){
        sprites.playerOneScore.changeAnimation("P1Two")
    }
    if (players.playerOne.score==3){
        sprites.playerOneScore.changeAnimation("P1Three")
    }
    if (players.playerOne.score==4){
        sprites.playerOneScore.changeAnimation("P1Four")
    }
    if (players.playerOne.score==5){
        sprites.playerOneScore.changeAnimation("P1Five")
    }
    if (players.playerOne.score==0){
        sprites.playerTwoScore.changeAnimation("P2Zero")
    }
    if (players.playerTwo.score==1){
        sprites.playerTwoScore.changeAnimation("P2One")
    }
    if (players.playerTwo.score==2){
        sprites.playerTwoScore.changeAnimation("P2Two")
    }
    if (players.playerTwo.score==3){
        sprites.playerTwoScore.changeAnimation("P2Three")
    }
    if (players.playerTwo.score==4){
        sprites.playerTwoScore.changeAnimation("P2Four")
    }
    if (players.playerTwo.score==5){
        sprites.playerTwoScore.changeAnimation("P2Five")
    }
}
function startBall(){
    if(start===true){
  sprites.ball.sprite.position.x=500
  sprites.ball.sprite.position.y=100
  sprites.ball.sprite.setSpeed(10, random(180,360))
  start=false
    }
}
function detectScore(){   
  if (sprites.ball.sprite.position.x<500){
      players.playerTwo.score+=1
  }
  if (sprites.ball.sprite.position.x>500){
      players.playerOne.score+=1
  }
  setScores()
  start=true
  console.log(players.playerOne.score)
  console.log(players.playerTwo.score)
  resetGame()
}
function resetGame(){
    if (players.playerOne.score==5){
        players.playerOne.score=0
        players.playerTwo.score=0
    }
    if (players.playerTwo.score==5){
        players.playerOne.score=0
        players.playerTwo.score=0
    }
    setScores()
}
function draw(){
  clear()
  startBall()
  game=createCanvas(1000,700)
  game.parent('sketch-holder')
  background(bg)
  sprites.ball.sprite.addSpeed(gravity,90)
  sprites.ball.sprite.bounce(sprites.walls.leftWall)
  sprites.ball.sprite.bounce(sprites.walls.rightWall)
  sprites.ball.sprite.bounce(sprites.walls.topWall)
  sprites.ball.sprite.bounce(sprites.walls.bottomWall)
  sprites.ball.sprite.bounce(players.playerOne.sprite)
  sprites.ball.sprite.bounce(players.playerTwo.sprite)
  sprites.ball.sprite.bounce(sprites.divider.divOne)
  if(keyDown("a")){
  players.playerOne.sprite.position.x-=6
  }
  if(keyDown("d")){
  players.playerOne.sprite.position.x+=6
  }
  if(keyDown("j")){
  players.playerTwo.sprite.position.x-=6
  }
  if(keyDown("l")){
    players.playerTwo.sprite.position.x+=6
  }
  if(sprites.ball.sprite.bounce(players.playerOne.sprite)){
    sprites.ball.sprite.setSpeed(20,random(220,320))
  }
  if(sprites.ball.sprite.bounce(players.playerTwo.sprite)){
    sprites.ball.sprite.setSpeed(20,random(220,320))
  }
  if (sprites.ball.sprite.position.y>650){
    detectScore()
    sprites.ball.sprite.setSpeed(0,0)
    sprites.ball.sprite.addSpeed(gravity,270)
  }
    if(players.playerOne.sprite.position.x>460){
   players.playerOne.sprite.position.x=460 
}
    if(players.playerOne.sprite.position.x<40){
   players.playerOne.sprite.position.x=40 
}
    if(players.playerTwo.sprite.position.x<540){
   players.playerTwo.sprite.position.x=540 
}
    if(players.playerTwo.sprite.position.x>960){
   players.playerTwo.sprite.position.x=960
}
  drawSprites()
}
