var ghost = {
  x: 200,
  y: 200,
  h: 50,
  w: 50,
  xSpeed: 2.5,
  ySpeed: 2
};

var score = 0;
var level = 5;
var img;
var time = 23;
var frame = 0;
var caught = 0;
var restartButton;
var won = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("pics/ghost.png");
}

function draw() {
  // the level trasitions
  switch(level) {
    case -1:
      gameOver();

      break; 
    //case 0:
    //  levelZero();
      
    //  break;
    case 1:
      background(225);
      fill(0);
      if (time > 21) {
        // title screen
        textAlign(CENTER, CENTER);
        text("level one", width/2, height/2);
        text("catch at least 15 ghosts before time runs out", width/2, height/2+15 );
      } else {
        levelOne();
      }
      break;
    case 2:
      background(225);
      fill(0);
      if (time > 21) {
        // title screen
        textAlign(CENTER, CENTER);
        text("level two", width/2, height/2);
        text("the ghosts can hide now! catch 15 more ghosts.", width/2, height/2+15 );
      } else {
        levelTwo();
      }
      break;
    case 3:
      background(0);
      fill(225);
      if (time > 26) {
        textAlign(CENTER, CENTER);
        text("level three", width/2, height/2);
        text("catch 10 more ghosts but this time the light are out, so use a flashlight!", width/2, height/2+15 );
      } else {
        levelThree();
      }
      break;
    case 4:
      background(0);
      fill(225);
      if (time > 26) {
        textAlign(CENTER, CENTER);
        text("level four", width/2, height/2);
        text("catch 15 more ghosts", width/2, height/2+15 );
        } else {
        levelFour();
      }
      break;
    case 5:
      background(0);
      fill(225);
      if (time > 19) {
        textAlign(CENTER, CENTER);
        text("FINAL ROUND", width/2, height/2);
        text("catch at least 10 more ghosts to win", width/2, height/2+15 );
      } else {
        levelFive();
      }
      break;
  }

  // the time functions
  frame += 1;
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
  text("Total score: "+ score, width-142, 30);
  text ("ghosts caught: " + caught, width-170, 50);
  text("Time Left: " + time, 10, 30);
  //noCursor();
  //fill(0, 225, 0);
  //ellipse(mouseX, mouseY, 20, 20);
}

function pressed(obj) {
  if (mouseIsPressed && dist(mouseX, mouseY, (obj.x + (obj.x + obj.w))/2, (obj.y + (obj.y + obj.h))/2) < obj.h) {
    obj.xSpeed = random(-5, 5);
    obj.ySpeed = random(-5, 5);

    obj.x = random(1, width-ghost.w);
    obj.y = random(1, height-ghost.h);
    
    score++;
    caught++;
  }
}

function restart() {
  score = 0;
  level = 1;
  time = 17;
  caught = 0;
  restartButton.hide();
}

function gameOver() {
  //score = 0;
  time = 0;
  textAlign(CENTER, CENTER);
  background(0);
  fill(225, 0, 0);
  if (won) {
    background(225);
    fill(0);
    text("YOU WON!", width/2, height/2);
  } else {
    background(0);
    fill(225, 0, 0);
    textSize(20);
    text("GAME OVER.", width/2, height/2);
  }
  text("total ghosts caught: " + score, width/2, height/2+20);
  if (!restartButton) {
    restartButton = createButton('press to restart game');
    restartButton.position(width/2-restartButton.width/2, height/2+restartButton.height+15);
    restartButton.mousePressed(restart);
  } else {
    restartButton.show();
  }
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

if (caught > 14 && time === 0) {
    // win condition
    time = 23;
    level = 2;
    caught = 0;
  } else if (time === 0) {
    // lose condition
    level = -1;
  }
}

function levelTwo() {
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

  if (caught > 14 && time === 0) {
    // win condition
    time = 28;
    level = 3;
    caught = 0;
  } else if (time === 0) {
    // lose condition
    level = -1;
  }
}

function levelThree() {
   // light spot
  fill(203, 217, 15);
  ellipse(mouseX, mouseY, 400, 400);

  // mouse is touching ghost
  pressed(ghost);

  //  moves ball
  move(ghost);

  // bounces ball when hits wall
  bounce(ghost);

  // shape
  fill (225, 225, 225)
  display(ghost);

  if (caught > 9 && time === 0) {
    // win condition
    time = 28;
    level = 4;
    caught = 0;
  } else if (time === 0) {
    // lose condition
    level = -1;
  }
}

function levelFour() {
  // light spot
  fill(203, 217, 15);
  ellipse(mouseX, mouseY,300, 300);

  // mouse is touching ghost
  pressed(ghost);

  //  moves ball
  move(ghost);

  // bounces ball when hits wall
  bounce(ghost);

  // shape
  fill (225, 225, 225)
  display(ghost);

  if (caught > 14 && time === 0) {
    // win condition
    time = 23;
    level = 5;
    caught = 0;
  } else if (time === 0) {
    // lose condition
    level = -1;
  }
}

function levelFive() {
  // light spot
  fill(203, 217, 15);
  ellipse(mouseX, mouseY, 150, 150);

  // mouse is touching ghost
  pressed(ghost);

  //  moves ball
  move(ghost);

  // bounces ball when hits wall
  bounce(ghost);

  // shape
  fill (225, 225, 225)
  display(ghost);

  if (caught > 9 && time === 0) {
    // win condition
    won = true;
    level = -1;
  } else if (time === 0) {
    // lose condition
    level = -1;
  }
}