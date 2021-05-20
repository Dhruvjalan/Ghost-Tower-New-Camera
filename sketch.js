var ghost, ghostimage,ghost2image, tower, towerimage, towerimage2, tower2, climberimage, climber, climberGroup, doorGroup, doorimage, door, invisiblesprite, invisiblegroup;
var gameState, PLAY = 1, END = 0,y= 600;
var x, MOVE=1, STOP = 2,T1 = 1, T2 = 2;
function preload(){
  ghostimage = loadImage("ghost-jumping.png");
  ghost2image = loadImage("ghost-standing.png");
  towerimage = loadImage("tower.png");
  towerimage2 = loadImage("tower.png");
  climberimage = loadImage("climber.png");
  doorimage = loadImage("door.png");

}

function setup(){
  createCanvas(600,600);
  camera.position.y = 300;
  camera.position.x = 300;
  tower = createSprite(300,300,600,600);
  tower.addImage(towerimage);
  //tower.velocityY = 4.3
  tower2 = createSprite(300,-600,600,600);
  tower2.addImage(towerimage);
  //tower2.velocityY = 0
  ghost = createSprite(300,300,20,20);
  ghost.addImage(ghostimage);
  ghost.scale = 0.5;
    ghost.velocityY = ghost.velocityY+0.7;
  
  gameState = PLAY;
  climberGroup = new Group();
  doorGroup = new Group();
  invisibleGroup = new Group();
  MOVE = 1
  
  
}
function draw(){
  background("black");

ghost.y = ghost.y+0.7
//console.log(ghost.y);
ghost.y = camera.position.y;
ghost.x = 10

//camera.position.y = ghost.y
tower2.visible = false
console.log("1: "+(tower.y - camera.position.y), "2: "+ (tower2.y - camera.position.y)  )

 
  
 
  
  if(gameState === PLAY){
    x = 1;
    ghost.velocityY = ghost.velocityY+0.7;
   //tower.y = ghost.y
    
    
    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x-10;
    } else if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x+10;
    }
    
    if(keyDown("Space")){
      ghost.velocityY = -10;
      tower.visible = false;
      tower.y = ghost.y +5;
      tower.visible = true
      tower.velocityY= -5;
      camera.position.y = ghost.y;
      y = ghost.y+300;

    }
    if(ghost.isTouching(climberGroup)){
      ghost.velocityY = 0;
    }
     
    if(ghost.isTouching (invisibleGroup)){
      gameState = END;
      x = 0;
    }
    if(ghost.y > camera.position.y+300 || ghost.y < camera.position.y-300|| ghost.x > 600 || ghost.x < 0|| ghost.y>y){
      gameState = END;
    }
    if(frameCount%100 === 0){
      spawnclimber();
      
    }
    
    drawSprites();
  }else if(gameState === END){
    textSize(28);
   text("Game Over", camera.position.x - 30,camera.position.y - 30);
    text("Hit r to restart", camera.position.x,camera.position.y);
       
    
  }
   if(keyDown("r") && gameState === END){
  x = 0
  location.reload()
      gameState = PLAY;
        ghost = createSprite(300,300,20,20);
  ghost.addImage(ghostimage);
  ghost.scale = 0.5;
   }
  if(x ===0){
   
    
    ghost.velocityY = ghost.velocityY+0.7;
  }

   
}

function spawnclimber(){
  climber = createSprite(300, ghost.y-300, 10,10);
  climber.x = Math.round(random(250,500));
  //console.log(climber.x);
  climber.addImage(climberimage);
  climber.velocityY = 5
  climber.depth = ghost.depth-1;
  climberGroup.add(climber);
 // climber.lifetime = 600/5;
  invisiblesprite = createSprite(climber.x,climber.y+4,80,10);
  invisiblesprite.velocityY = 5;
  invisiblesprite.visible = false;
  invisibleGroup.add(invisiblesprite)
  door = createSprite(300, climber.y-70, 10,10);
  door.addImage(doorimage);
  door.velocityY = 5;
  door.x = climber.x ;
  door.depth = climber.depth;
  doorGroup.add(door);
 doorGroup.lifetime = 600/5;
  
}

  
