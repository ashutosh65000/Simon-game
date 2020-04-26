var buttonColors=["red", "blue", "green", "yellow"]; //colors used in game
var gamePattern=[]; //the pattern generated by computer/code
var userClickedPattern=[]; //the pattern clicked by the user

var started=false;
var level=0;

$(document).keypress(function (){
  if(started === false){
    started=true;
    $("#level-title").text("Level "+level);
    nextSequence();
  }
});

//to find which color was clicked by the user
$(".btn").click(function (){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//check the answer
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else{ // if the color clicked by the user were wrong
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

//to produce the random color sequence
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


//to play sounds at respective colors
funtion playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

//add animation class of CSS to the button pressed by user
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
