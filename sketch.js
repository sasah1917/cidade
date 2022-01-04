
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;
var ground;
var building;
var ball;
var rope;
var obstacle;
var button;
var ballon;

function preload(){
}

function setup() {
  createCanvas(400,400);
  frameRate(80);

  
  
  building = createImg("batman.png");
  building.position(0,0);
  building.scale = 0.2;

  obstacle = createImg("obstacle2.png");
  obstacle.position(-105,-90);

  button = createImg('cut_button.png');
  button.position(100,50);
  button.size(50,50);
  button.mouseClicked(drop);

  ballon = createImg("balloon.png");
  ballon.position(0,150);
  ballon.size(120,120);
  ballon.mouseClicked(airBlow);
  


  rope = new Rope(3,{x:200,y:30});

  ball = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,ball);

  ball = new Link(rope,fruit);
 

  rectMode(CENTER);
  ellipseMode(RADIUS);
  
  engine = Engine.create();
  world = engine.world;
  
}


function draw() 
{
  background(51);
  

  push();
  imageMode(CENTER);
  if(ball!=null){
    image(ball.position.x,ball.position.y,70,70);
  }
  pop();

  Engine.update(engine);

  Link.show();
  rope.show();
  ground.show();

  drawSprites()

  if(ball.collided(obstacle)){
    obstacle = null;
  }
}

function drop()
{
  rope.break();
  ball.dettach();
  ball = null; 
}

function airBlow(){
  Matter.Body.applyForce( ballon, {x:0,y:0}, {x:0, y: -0.03});
}
