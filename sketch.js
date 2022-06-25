var rocket;
var spaceGround;
var rocketImage, meteoriteImage, spaceGroundImage, bulletImage;
var meteoriteG;
var score=0;
var wall1, wall2;

function preload(){
rocketImage=loadImage("rocket.png");
meteoriteImage=loadImage("meteoro.png");
spaceGroundImage=loadImage("space.png");
bulletImage=loadImage("bullet.png");
}

function setup() {
    createCanvas(350,500);

 spaceGround = createSprite(175,250);
 spaceGround.addImage(spaceGroundImage);

 wall1=createSprite(-5,250,10,500);
 wall2=createSprite(355,250,10,500);


 rocket = createSprite(175,400);
 rocket.addImage(rocketImage);    
 rocket.scale=0.17;

 meteoriteG=new Group();
 bulletG=new Group();

}

function draw() {

 rocket.collide(wall1);
 rocket.collide(wall2);
 

 spaceGround.velocityY=4;
 if(spaceGround.y > 335){
  spaceGround.y = spaceGround.width/2;
 }
//-------------------------//   

 if(keyDown("a")){
    rocket.velocityX=-6;
 }  

 if(keyDown("d")){
    rocket.velocityX=+6;
 } 

//-------------------------//

 if(World.frameCount % 50 == 0){
    spawnMeteorites();
 }

 //------------------------//

 if(rocket.isTouching(meteoriteG)){
    meteoriteG.destroyEach();
    score=score-300;
 }

//-------------------------//
 if(keyDown("space")){
   shotBullets();
 }
 if(bulletG.isTouching(meteoriteG)){
   meteoriteG.destroyEach();
   bulletG.destroyEach();
   score=score+100;
 }


 drawSprites();
 
 textSize(20);    
 fill("white");
 text("Pontos:"+score,145,20);
 score = score + Math.round(getFrameRate()/30);



}

function spawnMeteorites(){
   var meteorite=createSprite(Math.round(random(30, 330)));
   meteorite.addImage(meteoriteImage);
   meteorite.velocityY=5;
   meteorite.lifetime=250;
   meteorite.scale=0.1;
   meteoriteG.add(meteorite);
}

function shotBullets(){
   var bullet=createSprite(rocket.x,rocket.y);
   bullet.addImage(bulletImage);
   bullet.velocityY=-7;
   bullet.lifetime=200;
   bullet.scale=0.1;
   bulletG.add(bullet);
}