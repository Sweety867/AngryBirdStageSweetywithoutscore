const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg //preload variable with a default image / 
var platform;
var bird, slingshot;
var backgroundImg1;// used in getTime() 
var bg;
var score=0;


var gameState = "onSling";

function preload() {
    getTime();
    backgroundImg = loadImage("sprites/bg.png");
  // if(backgroundImg)
  // Api is being called if day then day image else night image
        getTime();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    pig1.score();
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);
    pig3.score();

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg1){
        background(backgroundImg1);
        noStroke();
        textSize(35);
        fill ("white")
        textSize(35)
        text("SCORE :- "+score ,width-300,50)
    }
    else 
    {
    background(backgroundImg)
    noStroke();
    textSize(35);
    fill ("white")
    textSize(35)
    text("SCORE :- "+score ,width-300,50)
    }
    //strokeWeight(4);
   


    Engine.update(engine);
     
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}
//gameState= "onSling"
function keyPressed(){
    if(keyCode === 32){
        bird.trajectory=[];
        Matter.Body.setPosition(bird.body,{x:200,y:50});
        Matter.Body.setAngle(bird.body,0)
        
        slingshot.attach(bird.body);
        gameState="onSling"
    }
}
   


async function  getTime()
{
     var response = await  fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
     var responseJSON = await response.json();
     console.log(responseJSON);

     var datetime = responseJSON.datetime
      console.log(datetime);
      var hr= datetime.slice(11,16)
       console.log(hr)
      if (hr >=06 && hr<=19){
          bg="sprites/bg.png"
      }  
      else
      {
          bg="sprites/bg2.jpg"
      }
      backgroundImg1=loadImage(bg);
      console.log(backgroundImg1);
} 

