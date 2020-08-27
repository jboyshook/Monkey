var monkey, monkey_running;
var bg, bg1;
var bg2, bg3;
var edge1, edge2;
var invisG;
var ob, ob1;
var dieSnd;
var gameState = 0;
var b, b1;
var win;
var gmo, gmo1;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png",             "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bg1 = loadImage("Bg.png");
  bg3 = loadImage("Baackg.png");
  ob1 = loadImage("obstacle.png");
  b1 = loadImage("banana.png");
  gmo1 = loadImage("GameOver.png");
  
  dieSnd = loadSound("EnemyDie.wav");
  win = loadSound("ac.wav");
}

function setup() {
  monkey = createSprite(70, 355, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  
  bg = createSprite(280, 460, 20, 10);
  bg.addImage("background", bg1);
  bg.scale = 1;
  
  bg2 = createSprite(650, 460, 200, 10);
  bg2.addImage("backg2", bg3);
  
  edge1 = createSprite(595, 250, 10, 500);
  edge1.visible = false;
  
  edge2 = createSprite(5, 250, 10, 500);
  edge2.visible = false;
  
  invisG = createSprite(300, 400, 10000, 10);
  invisG.visible = false;
  
  ob = createSprite(500, 355, 10, 10);
  ob.addImage("obstacle", ob1);
  
  b = createSprite(550, 255, 10, 10);
  b.addImage("banana", b1);
  
  gmo = createSprite(300, 200, 600, 500);
  gmo.addImage("GameOver", gmo1);
  gmo.scale = 0.6;
}

function draw() {
  createCanvas(600, 500);
  background("white");
  
  if (gameState === 0) {
    spawnBanana();
    spawnRocks();
    bg.velocityX = -6;
    ob.visible = true;
    b.visible = true;
    bg.visible = true;
    bg2.visible = true; 
    monkey.visible = true;
    gmo.visible = false;
  
    if (bg.x < 0) {
    bg2.velocityX = -6;
    }
  
    if (bg2.x < 0){
      bg2.x = bg.width/2;
    }
  
    if (bg.x < 0){
      bg.x = bg.width/2;
    }
  
    if (keyDown("space")) {
      monkey.y = monkey.y - 14;
    }
    
  
    if (monkey.isTouching(ob)) {
      monkey.visible = false;
      dieSnd.play();
      gameState = 1;
    }
    
    if (monkey.isTouching(b)) {
      win.play();
    }
    
   
    monkey.setCollider("circle", 0, 0, 100);
  
    monkey.collide(bg);
    monkey.collide(bg2);
    monkey.collide(edge1);
    monkey.collide(edge2);
    monkey.collide(invisG);
  
    if (monkey.y < 300) {
      monkey.velocityY = monkey.velocityY + 0.7;
     }
  }
  
  else if(gameState === 1) {
    ob.visible = false;
    b.visible = false;
    bg.visible = false;
    bg2.visible = false;
    monkey.visible = true;
    gmo.visible = true;
    monkey.depth = gmo.depth +1;
    text("Press Space to play Again", 200, 400);
    monkey.collide(invisG);
  }
  
  if (gameState === 1 && keyDown("space")) {
    gameState = 0;
  }
  
  drawSprites();
}

function spawnRocks() {
  ob.scale = 0.2;
  ob.velocityX = -9;
  
  if (ob.x < 0) {
    ob.x = random(400 , 600);
    ob.y = 355
  }
}

function spawnBanana() {
  b.scale = 0.15;
  b.velocityX = -6;
  
  if (b.x < 0) {
    b.x = random(0 , 500);
    b.y = 355;
  }
}