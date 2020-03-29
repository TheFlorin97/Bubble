var canvas=document.querySelector('canvas');

canvas.width =window.innerWidth;
canvas.height=window.innerHeight;

var c =canvas.getContext('2d');

/*var x =Math.random()*innerWidth;
var y =Math.random()*innerHeight;
var dx =(Math.random()-0.5)*10;
var dy =(Math.random()-0.5)*10;
var radius =30;*/

var mouse ={
	x:undefined,
	y:undefined
}

var maxRadius=40;
//var minRadius=2;

var colorArray=[
'#F2CF1D',
'#F2A71B',
'#FA6A2D',
'#F22D1B',
'#067896',
]

window.addEventListener ('mousemove',function(event)  {
	
		mouse.x =event.x;
		mouse.y=event.y;
		
})

window.addEventListener('resize',function(){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;

	init();
})



function Circle(x,y,dx,dy,radius){
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
	this.minRadius=radius;

	this.draw=function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2 ,false);
		c.fillStyle=this.color;
		c.fill()
	}

	this.update=function(){
		if(this.x+this.radius>innerWidth||this.x-this.radius<0){
		this.dx=-this.dx;
	}
 
	if(this.y+this.radius>innerHeight||this.y-this.radius<0){
		this.dy=-this.dy
	}

	this.x+=this.dx;
 	this.y+=this.dy;

 	//ineractivity
 	if(mouse.x-this.x<50&&mouse.x-this.x>-50&&mouse.y-this.y<50&&mouse.y-this.y>-50){
 		if(this.radius<maxRadius){
 			this.radius +=1;

 		}
 	}
 		else if(this.radius>this.minRadius){
 			this.radius-=1;
 		}
 	


 	this.draw();
	}

}
var circleArray=[];

function init(){

	circleArray=[];

for(var i=0;i<1500;i++){
	var radius =Math.random()*3+1;
	var x =Math.random()*(innerWidth-radius * 2)+radius;
	var y =Math.random()*(innerWidth-radius * 2)+radius;
	var dx =(Math.random()-0.5)*2;
	var dy =(Math.random()-0.5)*2;


	circleArray.push(new Circle(x,y,dx,dy,radius))

}
}


function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);

for(var i =0;i<circleArray.length; i++)
	circleArray[i].update();
}

init();
animate();

