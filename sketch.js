var ghost = {
  x: 200,
  y: 200,
  h: 50,
  w: 50,
  xSpeed: 2.5,
  ySpeed: 2
};

var score = 0;
var level = 1;
var img;
var time = 28;
var frame = 0;
var showDemon = false;
let cackle;

function preload() {
  soundFormats('mp3');
  cackle = loadSound('sound/cackle3.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("pics/ghost.png");
  demonImg = loadImage("pics/demon.jpg");
}

function draw() {
  //cackle.play();
  
  switch(level) {
    case 0:
      levelZero();
      //if (mouseIsPressed) {
      //  frames += 1;
      //  time = 0;
      //}
      break;
    case 1:
      if (time > 25) {
        // title screen
        textAlign(CENTER, CENTER);
        fill(225, 0, 0);
        text("level one", width/2, height/2);
        text("catch 20 ghosts before time runs out", width/2, height/2+15 );
      } else {
        levelOne();
      }
      break;
    case 2:
      if (time > 20) {
        textAlign(CENTER, CENTER);
        text("level two", width/2, height/2);
        text("the ghosts can hide now! catch 20 more ghosts.", width/2, height/2+15 );
      } else {
        levelTwo();
      }
      break;
    case 3:
      if (time > 20) {
        textAlign(CENTER, CENTER);
        text("level three", width/2, height/2);
        text("catch 20 more ghosts but this time the light are out!", width/2, height/2+15 );
      } else {
        levelThree();
      }
      break;
    case 4:
    if (time > 20) {
      textAlign(CENTER, CENTER);
      text("level four", width/2, height/2);
      } else {
      levelFour();
    }
      break;
    case 5:
      if (time > 20) {
        textAlign(CENTER, CENTER);
        text("level five", width/2, height/2);
        text("catch 20 more ghosts", width/2, height/2+15 );
      } else {
        levelFive();
      }
      break;
  }
  frame += 1;
  //first level of the game
  if (frame === 60) {
    frame = 0;
    time -= 1;
  }
}

function bounce(obj) {
  // right wall or left wall
  if (obj.x > width-obj.w || obj.x < 0){ 
    // change direction 
    obj.xSpeed *= -1;
  }
  // bottom wall
  if (obj.y > height-obj.h || obj.y < 0){
    // change direction
    obj.ySpeed *= -1;
  }
}

function move(obj) {
  obj.y += obj.ySpeed;
  obj.x += obj.xSpeed;
}

function display(obj) {
  image(img, obj.x, obj.y, obj.w, obj.h);
  textSize(20);
  textAlign(LEFT, BOTTOM);
  fill(225, 0, 0);
  text("ghosts caught: "+ score, width-170, 30);
  text("Time Left: " + time, 10, 30);
  if (showDemon) {
    image(demonImg, 0, 0, width, height);
  }
}

function pressed(obj) {
  if (mouseIsPressed && dist(mouseX, mouseY, (obj.x + (obj.x + obj.w))/2, (obj.y + (obj.y + obj.h))/2) < obj.h) {
    obj.xSpeed = random(-5, 5);
    obj.ySpeed = random(-5, 5);

    obj.x = random(1, width-ghost.w);
    obj.y = random(1, height-ghost.h);
    
    score++;
  }
}

function levelZero() {
  score = 0;
  time = 0;
  textAlign(CENTER, CENTER);
  text("GAME OVER.", width/2, height/2);
}

function levelOne() {
  // background
  background(225, 225, 225);

  // mouse is touching ghost
  pressed(ghost);

  //  moves ball
  move(ghost);

  // bounces ball when hits wall
  bounce(ghost);

  // shape
  display(ghost);

  if (score === 20) {
    // win condition
    time = 23;
    level = 2;
  } else if (time === 0) {
    // lose condition
    level = 0;
  }
}

function levelTwo() {
  // background
  background(225, 225, 225);

  // obsticle
  fill(0, 0, 0);
  ellipse(width-250, height-300, 40, 40);
  ellipse(width-200, height-100, 80, 80);
  ellipse(width-400, height-400, 90, 80);
  ellipse(width-450, height-150, 100, 100);
  ellipse(width-100, height-400, 120, 90);
  ellipse(width-990, height-200, 200, 150);
  ellipse(width-790, height-100, 50, 100);
  ellipse(width-680, height-300, 100, 50);
  ellipse(width-550, height-400, 50, 100);
  ellipse(width-200, height-200, 100, 100);

  // mouse is touching ghost
  pressed(ghost);

  //  moves ball
  move(ghost);

  // bounces ball when hits wall
  bounce(ghost);

  // shape
  display(ghost);

  if (score === 40) {
    // win condition
    time = 23;
    level = 3;
  } else if (time === 0) {
    // lose condition
    level = 0;
  }
}

function levelThree() {
  // background
  background(0, 0, 0);

  // light spot
  fill(225, 225, 225);
  ellipse(width-200, height-200, 100, 100);
  ellipse(width-400, height-400, 150, 50);
  ellipse(width-75, height-400, 100, 125);
  ellipse(width-400, height-100, 125, 125);
  ellipse(width-400, height-250, 100, 75);
  ellipse(width-975, height-100, 150, 125);
  ellipse(width-860, height-300, 100, 150);
  ellipse(width-675, height-200, 200, 100);
  ellipse(width-500, height-200, 100, 90);
  ellipse(width-750, height-400, 100, 95);
  ellipse(width-75, height-100, 150, 150);

  // mouse is touching ghost
  pressed(ghost);

  //  moves ball
  move(ghost);

  // bounces ball when hits wall
  bounce(ghost);

  // shape
  display(ghost);

  if (time === 15 && frame === 30) {
    cackle.play();
    showDemon = true;
    level = 0;
  }

  if (score === 60) {
    // win condition
    time = 23;
    level = 4;
  } else if (time === 0) {
    // lose condition
    level = 0;
  }
}

function levelFour() {
  // background
  background(0, 0, 0);

  // light spot
  fill(203, 217, 15);
  ellipse(mouseX, mouseY, 100, 100);

  // mouse is touching ghost
  pressed(ghost);

  //  moves ball
  move(ghost);

  // bounces ball when hits wall
  bounce(ghost);

  // shape
  fill (225, 225, 225)
  display(ghost);

  if (score === 80) {
    // win condition
    time = 23;
    level = 5;
  } else if (time === 0) {
    // lose condition
    level = 0;
  }
}

function levelFive() {
  // background
  background(0, 0, 0);

  // light spot
  fill(203, 217, 15);
  ellipse(mouseX, mouseY, 50, 50);

  // mouse is touching ghost
  pressed(ghost);

  //  moves ball
  move(ghost);

  // bounces ball when hits wall
  bounce(ghost);

  // shape
  fill (225, 225, 225)
  display(ghost);

  if (score === 100) {
    // win condition
    time = 23;
    level = 6;
  } else if (time === 0) {
    // lose condition
    level = 0;
  }
}

function levelSix() {
  // background
  background(0, 0, 0);

  // light spot
  fill(225, 225, 225);
  

  // mouse is touching ghost
  pressed(ghost);

  //  moves ball
  move(ghost);

  // bounces ball when hits wall
  bounce(ghost);

  // shape
  fill (225, 225, 225)
  display(ghost);
}