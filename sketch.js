// Variaveis Gerais:

  //Trex var
var trex, trex_running, trex_collided;


  //obstacle var
var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var cloudGroup

//Estados de jogo:
  //PLAY
var PLAY = 1;
   //END
var END = 0;



 //game state:
var gameState = PLAY;
var gameover
var reset_image
//var score:
var score = 0;

//função Preload:

function preload() {
  //Trex
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided_image = loadAnimation("trex_collided.png")

  //ground
  ground_image = loadImage("ground2.png");

  //nuvens
  cloud_image = loadImage("cloud.png");


  //Obstacolos:
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")

  //gameover:
  gameover_image = loadImage("gameOver.png")

  jumpsound = loadSound("jump.mp3")
  diesound = loadSound("die.mp3")
  checkpointsound = loadSound("checkPoint.mp3")

  //reset
  reset_image = loadImage("reset-icon-614x460.png")

}
//função setup:
function setup() {
  createCanvas(600, 200)

  //trex sprites
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5
  trex.addAnimation("trex_collided", trex_collided_image)

  //ground sprites
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", ground_image);
  ground.x = ground.width / 2;

  //chão invisivel
  ground_invisible = createSprite(200, 190, 400, 20);
  ground_invisible.visible = false

  //grupo de obstaculos
  obstacleGroup = createGroup();
  cloudGroup = createGroup();

  //gameover
  gameover = createSprite(300,100)
  gameover.addImage("gameover", gameover_image);
  gameover.visible = false

  //reset
  reset = createSprite(300,100)
  reset.addImage("reset", reset_image);
  reset.scale = 0.15
  






}
  //função draw
function draw() {
  //background and draw sprites
  background("White")
  drawSprites();


  // trex colide com o chão invisivel
  trex.collide(ground_invisible)
  //Estados de jogo:
    // game state PLAY
  if (gameState === PLAY) {
    ground.velocityX = -4
    // inicia o jogo
    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
      jumpsound.play()
      
      
    

    }
    trex.velocityY = trex.velocityY + 0.8
    score = score + Math.round(getFrameRate() / 60);
    
    if(score>0 && score%100 === 0){
      checkpointsound.play()
    }
    // cria as nuvens
    Splat()
    // cria os cactos ou obstaculos
    Cacks()
    // Repete o chão
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    // game state END
    if(obstacleGroup.isTouching(trex)){
      gameState = END
      diesound.play()

    }


    // finaliza o jogo
  } else if (gameState === END) {
   // para o obstaculos
  obstacleGroup.setVelocityXEach(0)
    // mostra a mensagem de game over
    gameover.visible = true
    // para a movimentação do chão
    ground.velocityX = 0
    // muda a animação do trex para "trex_collided"
    trex.changeAnimation("trex_collided", trex_collided_image)
    // exibe o score final
    text("score" + score, 500, 50)
    // restar jogo
    if(mousePressedOver(reset)){
      console.log("Reiniciar o Jogo")
      resetF()
    }




  }




}
function resetF(){
  gameState = PLAY;
  gameover.visible = false;
  trex.changeAnimation("running", trex_running);
  score = 0;
  obstacleGroup.destroyEach();
  reset.visible = false;
  
}
function Splat() {
  if (frameCount % 60 == 0) {
    nuvens = createSprite(600, 100, 40, 10);
    nuvens.addImage(cloud_image)
    nuvens.y = Math.round(random(20, 70))
    nuvens.velocityX = -3


    nuvens.lifetime = 220

    nuvens.depth = trex.depth
    trex.depth = trex.depth + 1

    cloudGroup.add(nuvens)
  }
}
function Cacks() {
  if (frameCount % 60 == 0) {
    var obstacle = createSprite(600, 165, 10, 40)
    obstacle.scale = 0.5
    obstacle.velocityX = -5
    var Cak = Math.round(random(1, 6))

    switch (Cak) {
      case 1:
        obstacle.addImage(obstacle1)
        break

      case 2:
        obstacle.addImage(obstacle2)
        break

      case 3:
        obstacle.addImage(obstacle3)
        break
      case 4:
        obstacle.addImage(obstacle4)
        break

      case 5:
        obstacle.addImage(obstacle5)
        break

      case 6:
        obstacle.addImage(obstacle6)
        break

      default:
        break;
    }
    //obstacle.depth = trex.depth;
    obstacleGroup.add(obstacle)
    
  }

}



