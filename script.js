// Random Color
let buttonColors = ["red", "blue", "green", "yellow"];

//game pattern
let gamePattern = [];
let userClickPattern = [];

var started = false;

$(".btn").click(function (event) {
    let userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    console.log(userClickPattern);
    playsound(userChosenColor);
    animatepress(userChosenColor)
    checkAnswer(userClickPattern.length - 1)

})



// Random number
function nextSequence() {
    userClickPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomnumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomnumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100, function () {
        playsound(randomChosenColour);
    })

}



function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}



function animatepress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

let level = 0;
$(document).on('keypress', function () {


    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;

    }
}
);

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {


        if (gamePattern.length === userClickPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }

    else {
        console.log("wrong");
        playsound("Wrong")
        $("body").addClass("game-over")
        $("h1").text("Game Over, Press Any Key to Restart")
        setTimeout(function () {
            $("body").removeClass("game-over")
            $("h1").text("Press A Key to Start")
        }, 100)
        startOver()

    }
}

function startOver() {
    level=0
    gamePattern=[]
    
    started=false;
}