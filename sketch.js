//Create variables here
var dog, happyDog, dogNor, database, foodS, foodStock;
var lastfed;
var feed, add;
var foodObj;
var readState, changeState;
var bedImg, gardImg, washImg;
var state

function preload()
{
  //load images here
  happyDog = loadImage("images/Happy.png");
  dogNor = loadImage("images/Dog.png");
  milk = loadImage("images/milk.png");
  foodImg = loadImage("images/FoodStock.png");
  bedImg = loadImage("images/Bed Room.png");
  gardImg = loadImage("images/Garden.png");
  washImg = loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodObj = new Food();

  dog = createSprite(250,250,10,10);
  dog.addImage(dogNor);
  dog.scale = 0.5;


  feed = createButton("Feed the dog");
  feed.position(700,95);
  if(foodStock === 0){
  feed.mousePressed(error);
  }else{
    feed.mousePressed(feedDog)
  }


  add = createButton("Add Food");
  add.position(800,95);
  add.mousePressed(addFoods);



}


function draw(){
background(46, 139, 87);
//fill("black");
foodObj.display();

if(state !== "Hungry"){
  feed.hide();
  add.hide();
  dog.remove();
}else{
  feed.show();
  add.show();
  dog.addImage(dogNor);
}

currentTime = hour();
if(currentTime === (lastfed + 1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime === (lastfed + 2)){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime > (lastfed +2) && currentTime <= (lastfed+4)){
  update("Bathing");
  foodObj.washroom();
}else{
  update("Hungry")
  foodObj.display();
}

if(foodStock<=0){
  foodStock=0;
  dog.addImage(dogNor);
}

fedtime=database.ref('feedtime');
fedtime.on("value",function(data){
 lastfed=data.val();
})
textSize(16);
stroke(0);
fill("white");
text("Food Remaing :"+foodStock,350,100);
if(lastfed>=12){
  text("LAST FED TIME  : "+lastfed%12+"PM",50,100);
}else if(lastfed===0){
  text("LAST FED TIME : 12AM",50,100)
}else{
  text("LAST FED TIME :"+lastfed+"AM",50,100);
}
drawSprites();
}

function readStock(data){
  foodStock = data.val();
  foodObj.updateFoodStock(foodStock);
}

function addFoods(){
  foodStock++;
  database.ref('/').update({
    Food:foodStock
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodStock-1);
  dog.addImage(happyDog);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function error(){
  text("No Food Left For Pet", 400,400);
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}
