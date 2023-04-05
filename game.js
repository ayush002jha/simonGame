
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameLevel = 0;

// Button Animation
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

// Audio Output
function playSound(name){
    var location = 'sounds/'+name+'.mp3';
    var sound = new Audio(location);
    sound.play();
}

// next level sequence
function nextSequence(){
    gameLevel++;
    $("h1").text("Level "+gameLevel);
    var randomNumber = Math.floor(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);

}

// Function to check the user answer
function checkCorrectness(i){
    if(gamePattern[i]!==userClickedPattern[i]){
        // console.log("Fail");
        gameOver();

    }else{
        // console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            userClickedPattern=[];
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
}

// User Click Event Listener
$(".btn").click(function(event){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkCorrectness(userClickedPattern.length-1);
});

// Game Start Sequence
$(".btn1").click(function(){
    $(this).addClass("hidden");
    nextSequence();
});

// Game Over Sequence
function gameOver(){
    // Reset the variables to initial state
    gameLevel=0;
    userClickedPattern=[];
    gamePattern = [];

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Play Button To Start Again!");
    $(".btn1").removeClass("hidden");
}