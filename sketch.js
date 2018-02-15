var stopWatch;
var water, boat, person;
//var RF="g";
//var RFDraw;



var start=false;
var updateOnce=false;
var showVelocity=false;
var refrenceFrame;
function setup() {
  createCanvas(1000,1000);
  background(0);
  scale(2);
  
  stopWatch=new StopWatch();

  
  //tree=new PhysicalObject("tree", createVector(400,200),createVector(0,0),createVector(0,0), drawTree)
  water=new PhysicalObject("water", createVector(100,200),createVector(0,0),createVector(0,0), drawWater)
  boat=new PhysicalObject("boat", createVector(150,200),createVector(20,0),createVector(0,0), drawBoat)
  person = new PhysicalObject("plane", createVector(150-40,200-10),createVector(0,0),createVector(17.2,0), drawPlane,boat)
  
  refrenceFrame=new RefrenceFrame(water);
  water.display();
  //tree.display();
  boat.display();
  
  person.display();
  
  
  startButton=createButton("Start");
  startButton.position(0,50);
  startButton.mousePressed(function(){
    start=!start;
    stopWatch.setZero();
    
    if(start){
      startButton.getCaptionLabel="Stop";
    }else{
      startButton.getCaptionLabel="Start";
    }
  })
  
  velButton=createButton("Show Velocity");
  velButton.position(50,50);
  velButton.mousePressed(function(){
    showVelocity=!showVelocity;
    updateOnce=true;
    stopWatch.setZero();
  })
  
  groundButton=createButton("Ground Refrence Frame");
  groundButton.position(0,0);
  groundButton.mousePressed(function(){
    //RF="g";
    refrenceFrame.switchTracking(water);
    updateOnce=true;
    stopWatch.setZero();
  })
  boatButton=createButton("boat Refrence Frame");
  boatButton.position(200,0);
  boatButton.mousePressed(function(){
    //RF="c";
    refrenceFrame.switchTracking(boat);
    updateOnce=true;
    stopWatch.setZero();
  })
  personButton=createButton("Person Refrence Frame");
  personButton.position(400,0);
  personButton.mousePressed(function(){
    //RF="p";
    refrenceFrame.switchTracking(person);
    updateOnce=true;
    stopWatch.setZero();
  })
  
  
}

function draw() {
  
  if(start || updateOnce){
    scale(2);
    background(0);
    
    stopWatch.update();
    boat.update();
    person.update();
    
    
    refrenceFrame.translate();
    
    
    // if(RF=="g"){
    //   translate(-tree.pos.x+tree.posInital.x,0)
    //   console.log("g")
    // }else if(RF=="c"){
    //   translate(-boat.pos.x+boat.posInital.x,0)
    //   console.log("c")
    // }else if(RF=="p"){
    //   translate(-person.pos.x+person.posInital.x,0)
    //   console.log("p")
    // }
    water.display();
    //tree.display();
    boat.display();
    person.display();
    updateOnce=false;
  }
  
  
}

function StopWatch(){
  
  this.deltaTime=0;
  this.lastTime;
  this.deltaTimeSec=0;
  
  this.setZero=function(){
    this.deltaTime=0;
    this.lastTime=millis();
    this.deltaTimeSec=0;
    
  }
  
  
  this.update=function(){
    if(!this.lastTime){
      this.lastTime=millis();
    }
    
    
    var curTime=millis();
    this.deltaTime=curTime-this.lastTime;
    this.deltaTimeSec=this.deltaTime/1000;
    this.lastTime=curTime;
    
  }
}

function PhysicalObject(_name, _pos, _vel, _acc, _drawing, _parent){
  this.name=_name;
  this.posInital=createVector(_pos.x,_pos.y);
  this.pos=_pos;
  this.vel=_vel;
  this.acc=_acc;
  this.drawing=_drawing;
  
  this.parentObj=_parent;

  this.getRefFrameVel=function(){
    if(this.parentObj){
      // print(this.vel.x+this.parentObj.vel.x)
      // print(this.vel.y+this.parentObj.vel.y)
      
      var myVec = createVector(this.vel.x+this.parentObj.vel.x,this.vel.y+this.parentObj.vel.y);
      
      return myVec;
    }else{
      return this.vel;
    }
  }
  
  this.update=function(){
    if(stopWatch.deltaTime){
      
      //this.pos.x=this.pos.x+this.getRelativeVel().x*stopWatch.deltaTimeSec;\
      
      
      
      //this.pos.x=this.pos.x+this.vel.x*stopWatch.deltaTimeSec;
      if(this.name=="plane" && this.pos.x<this.posInital.x+80 + (this.parentObj.pos.x-this.parentObj.posInital.x)){
        this.vel.x=this.vel.x+this.acc.x*stopWatch.deltaTimeSec;
      }
      
      this.pos.x=this.pos.x+this.getRefFrameVel().x*stopWatch.deltaTimeSec;
      if(this.parentObj){
        if(this.pos.x>this.posInital.x+80 + (this.parentObj.pos.x-this.parentObj.posInital.x)){
          //print("off")
          if(this.getRefFrameVel().x>72.2){
            this.vel.y=this.vel.y-10*stopWatch.deltaTimeSec;
          }else{
            this.vel.y=this.vel.y+10*stopWatch.deltaTimeSec;
          }
          
          this.pos.y=this.pos.y+this.vel.y*stopWatch.deltaTimeSec;
          //print(this.vel.y)
        }
      }
      
    }

  }
  
  
  
  this.getRelativeVel=function(){
    
    return createVector(this.getRefFrameVel().x-refrenceFrame.trackingRefrence.getRefFrameVel().x,this.getRefFrameVel().y);
  }
  
  this.display=function(){
    push();
    translate(this.pos.x,this.pos.y);
    this.drawing()
    
    if(this == refrenceFrame.trackingRefrence)
    refrenceFrame.display();
    
    if(showVelocity){
      noStroke()
      fill(20,20,250);
      var myVel = this.getRelativeVel();
      textAlign(CENTER);
      text(round(myVel.mag())+ " m/s",0,40);
      
      ellipse(0,45,4,4);
      stroke(20,20,250);
      line(0,45,myVel.x,45 + myVel.y)
      translate(myVel.x,0)
      triangle(0,45,-abs(myVel.x)/myVel*5,50,-abs(myVel.x)/myVel*5,40)
    }
    
    pop();
  }
}


function RefrenceFrame(_trackerObj){
  
  //this.position;
  
  this.trackingRefrence=_trackerObj;
  
  this.switchTracking=function(_trackerObj){
    this.trackingRefrence=_trackerObj;
  }
  
  this.translate=function(){
    
    translate(-this.trackingRefrence.pos.x+this.trackingRefrence.posInital.x,0)
  }
  
  this.display=function(){
    stroke(200,0,0);
    line(0,0,60,0);
    triangle(60,-5,65,0,60,5);
    line(0,0,0,-60);
    triangle(-5,-60,0,-65,5,-60);
  }
}


