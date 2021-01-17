var dog,happyDog,dog_img,happyDog_img;
var foodS,foodStock;
var database;
var milk,milk_img;

function preload()
{
  dog_img=loadImage("images/dogImg.png");
  happyDog_img=loadImage("images/dogImg1.png");
  milk_img=loadImage("images/milk.png");
  
}

function setup() {
  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock,showError);
 

  createCanvas(500,500);
  dog=createSprite(250,300);
  dog.addImage(dog_img);
  dog.scale=0.2;
  
  milk=createSprite(200,340);
  milk.addImage(milk_img);
  milk.scale=0.03
  milk.visible=false;

  

  

  
}


function draw() {  

  background("#3af04f");

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDog_img);
    milk.visible=true;
  }

  if(keyWentUp(UP_ARROW))
  {
    dog.addImage(dog_img);
    milk.visible=false;
  }

  drawSprites();
  

  strokeWeight(2);
  stroke("black")
  textSize(24);
  fill("white");
  text("Food Remaining : "+foodS,130,140);
  textSize(20);
  text("Note: Press Up Arrow Key To Feed Drago Milk!",25,50);

  if(foodS%2===0)
  {
    textSize(24);
    text("Great!! Drago is Happy",140,450);
  }

  if(foodS===0)
  {
  
    foodS=20;
  }

}

function readStock(data)
{ 
  foodS=data.val();
}

function writeStock(x)
{
  
  if(x<=0)
  {
    x=0;
  }
  else
  {
    x=x-1;
  }

  database.ref('/').set(
    {
      Food:x
    }
  )

}

function showError()
{
  text("Error!! Error!! Try again later",200,200);
}



