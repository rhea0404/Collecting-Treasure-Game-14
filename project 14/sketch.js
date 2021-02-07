var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit,enemy,fruitGroup,enemyGroup;
var swordImage,fruit1,fruit2,fruit3,fruit4,gameoverImage;
 var monster,monsterImage;
 
var score;
var sound1,sound2;


function preload(){
 swordImage=loadImage("sword.png"); 
 fruit1=loadImage("fruit1.png");
fruit2=loadImage("fruit2.png");
fruit3=loadImage("fruit3.png");
fruit4=loadImage("fruit4.png");
gameoverImage=loadImage("gameover.png");
monsterImage=loadAnimation("alien1.png","alien2.png");
  
//sound1=loadSound("knifeSwooshSound.mp3");
//sound2=loadSound("gameover.mp3");
}

function setup(){

createCanvas(600,600);

sword=createSprite(40,200,20,20);
sword.addImage(swordImage);
sword.scale=0.7;
sword.setCollider("rectangle",0,0,40,40);
sword.debug=false;
score=0;
  
fruitGroup=createGroup();
enemyGroup=createGroup();

}




function draw(){

  background("lightblue");
  
  if(gameState===PLAY){
  
  Fruit();
  Enemy();
   
  sword.x=World.mouseX;
  sword.y=World.mouseY;
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score+2;
  }
  }
  
 else if(gameState===END){
    
   fruitGroup.destroyEach();
   enemyGroup.destroyEach();
  fruitGroup.setVelocityX(0);
  enemyGroup.setVelocityX(0);
   
   sword.addImage(gameoverImage);
   sound1.play();
   sword.x=200;
   sword.y=200;
 }
  drawSprites();
  text("Score:"+ score,300,30);
  
}

function Fruit(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
   // fruit.debug=true;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    }else if(r==2){
      fruit.addImage(fruit2);
    }else if(r==3){
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  
  }
}

function Enemy(){
  if(World.fameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}