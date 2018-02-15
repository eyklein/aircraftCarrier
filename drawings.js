var drawRoad=function(){
  var marksLength=50;
  var marksWidth=4;
  var marksSpacing=50;
  push()
  strokeWeight(marksWidth);
  var numberMarks=20;
  stroke(200,200,0);
  for(var i=0; i<numberMarks;i++){
    line(i*(marksLength+marksSpacing), 0, i*(marksLength+marksSpacing)+marksLength,0)
  }
  noStroke();
  fill(150)
  rect(0,1,numberMarks*(marksLength+marksSpacing)+marksLength,5);
  
  pop()
}


var drawTree=function(){
  widthTree=50;
  heightTree=150;
  widthTrunckTree=10;
  heightTrunckTree=20;
  
  fill(20,180,20);
  triangle(widthTree/-2,-heightTrunckTree,widthTree/2,-heightTrunckTree,0,-heightTree);
  fill(150);
  rect(-widthTrunckTree/2,-heightTrunckTree,widthTrunckTree,heightTrunckTree);
}
var drawCar=function(){
  // push();
  // translate(this.pos.x,this.pos.y);
  
  widthCar=70;
  heightCar=40;
  wheelDiamCar=20;
  wheelOffestCar=.4;
  
  
  fill(100);
  rect(-widthCar/2,-heightCar,widthCar,heightCar-wheelDiamCar/2);
  
  fill(150);
  ellipse(-widthCar/2*(1-wheelOffestCar),-wheelDiamCar/2,wheelDiamCar,wheelDiamCar)
  ellipse(widthCar/2*(1-wheelOffestCar),-wheelDiamCar/2,wheelDiamCar,wheelDiamCar)
  
  // refrenceFrame.display();
  // pop();
}
var drawPlane=function(){
  var scaleThis=1;
  var widthPlane=20*scaleThis;
  var heightPlane=3*scaleThis;
  var widthTailPlane=1*scaleThis;
  var heightTailPlane=1.5*scaleThis;
  
  
  // push();
  // translate(this.pos.x,this.pos.y);
  
  
  fill(150);
  ellipse(0,0,widthPlane,heightPlane);
  fill(170);
  ellipse(0,0,widthPlane/4,heightPlane/4);
  rect(-widthPlane/2, -heightPlane/2,widthTailPlane, heightTailPlane)
  //RFDraw.display();
  // pop();
}






var drawWater=function(){
  var waveLength=20;
  var waveHeight=4;
  var marksSpacing=15;
  
  
  //strokeWeight(4);
  var numberMarks=40;
  stroke(20,20,200);
  
  push()
  translate(-waveLength*marksSpacing/2,0);
  for(var i=0; i<numberMarks;i++){
    noFill();
    translate(waveLength,0);
    arc(0, 0, waveLength, waveHeight*2, 0, PI);
  }
  noStroke();
  fill(150)
  pop()
}

var drawBoat=function(){
  translate(0,-5);
  widthBoat=80;
  heightBoat=10;
  mastHeight=120;
  mastWidth=4;
  sailWidth=40;
  
  
  fill(150);
  arc(0, 0, widthBoat, heightBoat*2, 0, PI);
  //rect(0,0,mastWidth,-mastHeight)
  fill(150,100,100);
  
  //triangle(-widthBoat/2,-10,-5,-10,-5,-mastHeight+10)
  
}

var drawairplane=function(){
  
  var headDiam=10;
  var heightairplane=20;
  var armWidth=15;
  var legHeight=15;
  
  
  
  // push();
  // translate(this.pos.x,this.pos.y);
  fill(250);
  stroke(250);
  ellipse(0,-heightairplane,headDiam,headDiam);
  
  
  line(0,-heightairplane,0,heightairplane-legHeight)
  line(-armWidth/2,-heightairplane*.5,armWidth/2,-heightairplane*.5)
  
  line(0,heightairplane-legHeight,armWidth/2,legHeight)
  line(0,heightairplane-legHeight,-armWidth/2,legHeight)
  //RFDraw.display();
  // pop();
}