function setup() {
  createCanvas(500, 500);
  background(150, 206, 235);
  rectMode(CENTER);

fill(100);
stroke(0);
  //road//
rect(250, height - 28, width, 50);
fill(200);
rect(250, height - 25, width, 5);

  rectMode(CENTER);
  fill(155, 0, 0) //red color//
 rect(width/2 - 20, height - 200, 130, 90);
  // car body//
  fill(225, 0, 0)
  rect(width/2 - 15, height - 140, 250, 90);
  // car window//
  stroke(10);
  fill(25, 0, 0)
  rect(230,275,150,80)
  fill(150, 206, 235)
  rect(200,275,60,60)
  rect(260,275,60,60)
  
  // wheels//
  fill(25, 25, 0); 
  ellipse(width/1 - 190, height - 80, 70, 70);
  fill(200)
  ellipse(width/1 - 190, height - 80, 50, 50);
  fill(25, 0, 0)
  ellipse(width/2 - 90, height - 80, 70, 70);
  fill(200)
  ellipse(width/2 - 90, height - 80, 50, 50);
  // headlight//
  fill(255, 255, 0)
  rect(width/1 - 145, height - 120, 20, 20); 
  rect(width/1 - 145, height - 160, 20, 20); 

  rect(width/1 - 143, height - 118, 20, 20); 
  rect(width/1 - 143, height - 162, 20, 20);  
// sun //
  noStroke();
  fill(255, 255, 0)
  ellipse(140, 50, 50, 50)
  // clouds1//
  noStroke();
  fill(300)
ellipse(75, 75, 100, 50)
ellipse(110, 72, 100, 50)
ellipse(93, 90, 80, 50)
ellipse(90, 60, 80, 50)
  // cloud 2//

ellipse(460, 95, 100, 50)
ellipse(400, 92, 100, 50)
ellipse(430, 110, 80, 50)
ellipse(444, 80, 80, 50)
  //cloud 3//

ellipse(300, 175, 100, 50)
ellipse(258, 172, 100, 50)
ellipse(270, 190, 80, 50)
ellipse(274, 160, 80, 50) 
 
}