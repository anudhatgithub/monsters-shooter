var ball;
var carColor;
var inp, button
var name = "";
var edges;
var Gamestate = 0;
var laserArray = [];
var MonsterArray = [];
function setup() {
    createCanvas(windowWidth, windowHeight);

    // database = firebase.database();

    ball = createSprite(600, 600, 10, 10);
    ball.shapeColor = "red";
    // database.ref("car").on("value",(data)=>{
    //     carColor = data.val();
    //     console.log(carColor);

    // })
    // database.ref("position").on("value",(data)=>{
    //     var pos = data.val();
    //    ball.x = pos.x;
    //    ball.y = pos.y;

    // })
    form = new Formclass()


}

function draw() {
    background("white");
    form.display();

    edges = createEdgeSprites();
    ball.collide(edges)
    

    if (keyDown(LEFT_ARROW)) {
        changePosition(-5, 0);

    }
    else if (keyDown(RIGHT_ARROW)) {
        changePosition(5, 0);

    }
    else if (keyDown(UP_ARROW)) {
        changePosition(0, -5);
    }
    else if (keyDown(DOWN_ARROW)) {
        changePosition(0, +5);
    }

    lasers();
    if (Gamestate === 1) {

        if (frameCount % 100 === 0) {
            spawnMonsters();
        }
        for (let m = 0; m < MonsterArray.length; m++) {
            if (MonsterArray[m].isTouching(ball)) {
                Gamestate = 2
                ball.x = windowWidth / 2
                ball.y = windowHeight / 2


            }


        }

    }

    for (let m = 0; m < MonsterArray.length; m++) {

        MonsterArray[m].bounceOff(edges)


    }


    drawSprites();

    for (let i = 0; i < laserArray.length; i++) {
        for (let m = 0; m < MonsterArray.length; m++) {
            if (laserArray[i].isTouching(MonsterArray[m])) {
                laserArray[i].lifetime = 0;
                MonsterArray[m].destroy();
            }

        }




    }
    if(Gamestate===2){
    ball.visible=false;
   textSize(25)
   fill("RED");
   text("GAME OVER!!,TRY AGAIN?,Press r to try again",windowWidth/2,windowHeight/2)
   

    }
    if(keyWentDown("R")){
  Gamestate=1;
  ball.visible=true;
  ball.x=20;
  ball.y=20;


    }
    if(Gamestate===1){
        textSize(20)
        text(name, ball.x, ball.y - 20)

    }
}


function changePosition(x, y) {
    ball.x = ball.x + x;
    ball.y = ball.y + y;


    // database.ref("position").update({
    //       x: ball.x,
    //       y: ball.y  
    // })

}

function lasers() {
    if (keyWentDown("space") && Gamestate===1) {
        laser1 = createSprite(ball.x, ball.y, 15, 5)
        laser2 = createSprite(ball.x, ball.y, 5, 15)
        laser3 = createSprite(ball.x, ball.y, 15, 5)
        laser4 = createSprite(ball.x, ball.y, 5, 15)

        laser1.shapeColor = "yellow"
        laser2.shapeColor = "yellow"
        laser3.shapeColor = "yellow"
        laser4.shapeColor = "yellow"

        laser1.velocityX = 7
        laser1.velocityY = 0
        laser2.velocityX = 0
        laser2.velocityY = 7
        laser3.velocityX = -7
        laser3.velocityY = 0
        laser4.velocityX = 0
        laser4.velocityY = -7

        laser1.lifetime = 200;
        laser2.lifetime = 200;
        laser3.lifetime = 200;
        laser4.lifetime = 200;

        laserArray.push(laser1);
        laserArray.push(laser2);
        laserArray.push(laser3);
        laserArray.push(laser4);
    }


}
function spawnMonsters() {
    Monster = createSprite(random(200, 500), random(200, 500), 20, 20)
    Monster.shapeColor = "Green";
    Monster.velocityX = (random(1, 5))
    Monster.velocityY = (random(1, 5))


    MonsterArray.push(Monster)
}