
//Defing variables and creating the the Engine


var helicopterIMG, crashImg, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
var packagenum = 1;
var timer = 0;
var bounceamnt = 20;
var fuel;
var START = 0;
var PLAY = 1;
var END = 2;
var INSTRUCTIONS = 3;
var gamestate = START;
var status;
var body1, body2, body3, box1, box2, box3;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
	crashIMG = loadImage("helicrash.png");
}

function setup() {
	createCanvas(1200, 700);
	rectMode(CENTER);
	packagenum = 1;


	//Creating all of the objects and bodies
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.visible = false;
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(20, 200, 10,10);
	helicopterSprite.visible = false;
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	engine = Engine.create();
	world = engine.world;

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true});
 	World.add(world, ground);

	box = new DustBin(500, 600, 600, 600, 550, 660, 20, 110, 20, 110, 120, 10);

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  drawSprites();
  
  //The intro
  if (gamestate === START) {
	helicopterSprite.visible = false;
	textSize(50);
	fill("white");
	text("HELICOPTER DROP", 350, 100);
	textSize(30);
	text("Press enter to get briefed on the mission", 330, 200);
  }
  if (keyDown("ENTER") && gamestate === START) {
	  gamestate = INSTRUCTIONS
  }
  if (gamestate === INSTRUCTIONS) {
	  textSize(25);
	  fill("white");
	  text("Your pilot will fly the helicopter back and forth until you run out of fuel or drop the package", 50, 50);
	  text("Use left and right arrow keys to adjust amount of force you will eject the package with", 50, 100);
	  text("Make sure the pacakge lands in the red drop zone, otherwise you fail the mission", 50, 150);
	  text("Press s to start the mission", 350, 400);
	  textSize(35);
	  text("The fate of the survivers depends on you!!!", 200, 250);
  }
  if (keyDown("s") && gamestate === INSTRUCTIONS) {
	  gamestate = PLAY;
	  helicopterSprite.velocityX = 4;
	  fuel = 50;
  }


  // Tells Player to do the Drop
  if (gamestate === PLAY) {
	  helicopterSprite.visible = true;
	  
	  //Displaying the dropzone
	  box.display();

	  //Showing amount of fuel remaining
	  fuel = fuel - 1/20;
	  textSize(35);
	  fill("white");
	  text("Fuel: " + Math.ceil(fuel), 1000, 40);

	  text("Bounciness of package: " + bounceamnt, 400, 40);

	  if (keyDown("LEFT_ARROW") && bounceamnt >= 0) {
		  bounceamnt = bounceamnt - 1/2;
	  }
	  if (keyDown("RIGHT_ARROW")) {
		  bounceamnt = bounceamnt + 1/2;
	  }

	  //Makes sure to only drop package once
	  if (keyDown("DOWN_ARROW") && packagenum === 1) {
		packageSprite=createSprite(width/2, 80, 10,10);
		packageSprite.visible = true;
		packageSprite.addImage(packageIMG);
		packageSprite.scale=0.2;

		packageBody = Bodies.circle(helicopterSprite.x , 200 , 5 , {restitution: bounceamnt / 10, isStatic:false});
		World.add(world, packageBody);

		packagenum = 2;
	  }

	  //Drops the pacakge at the right time.
	  if (packagenum === 2) {
		packageSprite.x= packageBody.position.x 
		packageSprite.y= packageBody.position.y 
	  }

	  //Making helicopter hover over dropzone until fuel runs out
	  if (helicopterSprite.x > 1200 && status != "succeed") {
		helicopterSprite.velocityX *= -1;
	  }
	  if (helicopterSprite.x < 0) {
		  helicopterSprite.velocityX *= -1;
	  }

	  //Checking if you failed
	  if (fuel < 0) {
		  gamestate = END;
		  helicopterSprite.velocityY = 3;
		  status = "fail";
	  }

	  if (packageSprite.y > 580) {
		  status = "fail";
		  timer = timer + 1;
	  }
	  //Checking if you succeeded
	  if (packageSprite.x > 500 && packageSprite.x < 600 && packageSprite.y > 580) {
		  timer = timer + 1;
		  status = "succeed";
	  }
	  if (timer > 80) {
		  gamestate = END;
		  
	  }
  }
  if (gamestate === END) {
	
	  if (helicopterSprite.isTouching(groundSprite)) {
		  helicopterSprite.velocityY = 0;
		  helicopterSprite.velocityX = 0;
		  
	  }
	  if (status === "fail") {
		textSize(30);
		fill("white");
		text("Mission failed", 400, 100);
	  }
	  if (status === "succeed") {
		  textSize(30);
		  fill("white");
		  text("Mission is a Success", 350, 100);
	  }
  }
}