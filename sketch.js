var tower, towerImg;
var ghost, ghostImg;
var door, doorImage, doorsGroup;
var climber, climberImg, climbersGroup;
var invisibleBlock, invisibleBlockGroup;
var spooky;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorsGroup = new Group();
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  climbersGroup = new Group();  
  ghostImg = loadImage("ghost-standing.png");
  invisibleBlockGroup = new Group();
  spooky = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spooky.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
}

function draw() {
  background(0);
  
  if (gameState === "play"){
    if (tower.y > 400) {
      tower.y = 300;
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
    ghost.velocityY += 0.8;
    if (keyDown("left")) {
      ghost.x -= 3;
    }
    if (keyDown("right")) {
      ghost.x += 3;
    }
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
    spawnDoors();    
  }
  drawSprites();
  if (gameState === "end") {
    fill("red");
    textSize(30);
    text("Game Over",230,250);
  }
}
function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200,-50);
    door.addImage("door",doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120,480)); 
    door.lifetime = 700;
    doorsGroup.add(door);
    
    climber = createSprite(200,10);
    climber.addImage("climber",climberImg);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 700;
    climbersGroup.add(climber);
    
    door.depth = ghost.depth;
    ghost.depth += 1;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2; 
    invisibleBlock.x = door.x;
    //invisibleBlock.debug = true;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
  }
  
}

