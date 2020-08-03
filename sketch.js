var backImage, backgr;
var player, player_running;
var ground, ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var endImage, end;

function preload() {
  backImage = loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png");

  //endImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800, 400);

  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);


  backgr.scale = 1.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;

  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;

  //end = createSprite(400, 200);
  //end.addImage("end", endImage);
  //end.visisble = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {

  background(255);

  player.collide(ground);
  obstaclesGroup.isTouching(ground);
  
  if(obstaclesGroup.isTouching(ground)){
    obstaclesGroup.velocityY = 0;
    }
  
  if (gameState === PLAY) {
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (backgr.x < 100) {
      backgr.x = backgr.width / 2;
    }

    if (keyDown("space") && player.y>=270) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

    spawnFood();
    spawnObstacles();

    if (FoodGroup.isTouching(player)) {
      FoodGroup.destroyEach();
      score = score + 2;
    }
    switch (score) {
      case 10:
        player.scale = 0.12;
        break;
      case 20:
        player.scale = 0.14;
        break;
      case 30:
        player.scale = 0.16;
        break;
      case 40:
        player.scale = 0.18;
        break;
      default:
        break;
    }


    if (obstaclesGroup.collide(player)) {
      player.scale = 0.08;
      gameState = END;
    }

  }

   else if (gameState === END) {

    //end.visible=true;

    ground.velocityX = 0;
    player.velocityY = 0;
    backgr.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  if (keyDown("r")) {
    reset();
  }


  drawSprites();

  if (gameState === END) {
    textSize(20);
    fill("white");
    stroke("white");
    text("To restart press 'r'", 200, 150);
  }

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 280, 40, 10);
    banana.y = random(200, 280);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(800, 330, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);

    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);


  }
}

function reset() {
  gameState = PLAY;
 
  if (backgr.x < 100) {
      backgr.x = backgr.width / 2;
    }

  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();

  score = 0;
}