//Create variables here
var dog,dogImg,happydog,database,foods,foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");

}

function setup() {
  database=firebase.database();
  createCanvas(1000, 500);
  
  foodObj=new Food();

  dog=createSprite(800,220,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed=createButton("feed the Dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("addFood");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
background(46,139,87);

  //add styles here

  feedTime=database.ref("FeedTime");
  feedTime.on("value",function(data) {
    lastFed=data.val();
  })

  fill(255);
  textSize(20);
  if(lastFed>=12)  {
    text("LastFed :" + lastFed%12 + "PM",350,30);
  }else if(lastFed==0)  {
    text("LastFed : 12 AM",350,30)
  }else{
    text("LastFed:" + lastFed + "AM",350,30);
  }

  foodObj.display();
  drawSprites

}

function readStock(data)  {
  foodS=data.val();
  foodObj=updateFoodStock(foodS);
}

function feedDog()  {
  dog.addImage(happyDog);
  foodObj=updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFodStock(),
    FeedTime:hour()
  })
}

function addFoods()  {
  foods++;
  database.ref('/').update({
    Food:foodS
  })
}