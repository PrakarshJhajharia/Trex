var hi = 0;
var gs = 0;
var reset,go;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cg;
var obsg;
var count;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  clouda = loadImage("cloud.png")
  obsf = loadImage("obstacle1.png")
   obsa = loadImage("obstacle2.png")
   obsb = loadImage("obstacle3.png")
   obsc = loadImage("obstacle4.png")
   obsd = loadImage("obstacle5.png")
   obse = loadImage("obstacle6.png")
  groundImage = loadImage("ground2.png")
  rese = loadImage("restart.png")
  g = loadImage("gameOver.png")
}

function setup() {
 
obsg = new Group()
cg = new Group()
  createCanvas(600, 200);
  reset = createSprite(300,100,10,10)
  reset.addImage("re",rese)
reset.scale = 0.5
  go = createSprite(300,50,10,10)
  go.addImage("gov",g)
go.scale = 0.5
  trex = createSprite(50,180,20,50);
  
  trex.scale = 0.5;
   trex.addAnimation("running", trex_running);
   trex.addAnimation("collide", trex_collided);
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  
  background(240);
    text("high "+hi+" score "+count,450,50)
  if(gs == 0){
    trex.changeAnimation("running", trex_running);
     go.visible = false
     reset.visible = false
      ground.velocityX = -4;
  count = count + Math.round(getFrameRate()/60)

  if(keyDown("space") && trex.collide(invisibleGround)) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);

  clouds();
  obs();
  if(trex.collide(obsg)){
     gs = 1
     }
     }
  else if(gs == 1){
    trex.changeAnimation("collide", trex_collided);
    reset.visible = true
    go.visible = true
    trex.velocityX = 0
    trex.velocityY = 0
    ground.velocityX = 0
    obsg.setVelocityEach(0,0)
    cg.setVelocityEach(0,0)  
    obsg.setLifetimeEach(-1)
    cg.setLifetimeEach(-1)
    if(count>hi){
       hi = count
       }
    if(mousePressedOver(reset)){
       gs = 0
      count = 0
      obsg.destroyEach()
      cg.destroyEach()
       }
          }
  drawSprites();
}
function clouds(){
  if(frameCount % 100 == 0){
     var cloud = createSprite(600,50,20,5)
    cloud.addImage("cloud", clouda)
    cloud.scale=0.7
    cloud.velocityX = -4
    cloud.lifetime = 220
   cg.add(cloud)
     }
  
}
function obs(){
  if(frameCount % 90 == 0) {
    var obs = createSprite(600,170,20,5)
     obs.scale=0.5
    obs.velocityX = -4
    obs.lifetime = 220
   obsg.add(obs)
    var a = Math.round(random(1,6))
    switch(a){
      case 1:obs.addImage(obsa)
        break;
      case 2:obs.addImage(obsb)
        break;
        case 3:obs.addImage(obsc)
        break;
        case 4:obs.addImage(obsd)
        break;
        case 5:obs.addImage(obse)
        break;
        case 6:obs.addImage(obsf)
        break;
        deafault: break;
      }
  
    }
}