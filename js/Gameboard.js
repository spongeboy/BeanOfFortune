
var startInterval = 800;
var interval = startInterval; //also the start interval
var intervalChange = 60;
var intervalFactor = 0.9;
var endInterval = 200;


/*
ordering[1][0] = 2;
ordering[1][1] = 6;
ordering[2][1] = 2;
ordering[2][1] = 2;
*/

/*
 1  2  3  4  5
 6           7
 8           9
10          11
12 13 14 15 16
*/

var ll = new Array(17);
ll[1] = { next: 2, prev: 6 };
ll[2] = { next: 3, prev: 1 };
ll[3] = { next: 4, prev: 2 };
ll[4] = { next: 5, prev: 3 };
ll[5] = { next: 7, prev: 4 };
ll[6] = { next: 1, prev: 8 };
ll[7] = { next: 9, prev: 5 };
ll[8] = { next: 6, prev: 10 };
ll[9] = { next: 11, prev: 7 };
ll[10] = { next: 8, prev: 12 };
ll[11] = { next: 16, prev: 9 };
ll[12] = { next: 10, prev: 13 };
ll[13] = { next: 12, prev: 14 };
ll[14] = { next: 13, prev: 15 };
ll[15] = { next: 14, prev: 16 };
ll[16] = { next: 15, prev: 11 };



function startChangingSquares() {

    if (!$("#gameboard.stopped").length) {
        setTimeout("nextSquare()", interval);
        if (interval > endInterval) { interval = interval * intervalFactor; }
        $("").delay(interval);
    }

    
}

function stopOrStart() {
    $("#gameboard").toggleClass("stopped");

    //Stop game
    if ($("#gameboard").is('.stopped')) {
        //console.log($selectedSquare.children(".centre").innertext);
        $("#centre").html($(".centre", $selectedSquare).html());
        $halfway = 0;
        highlightClockwise($selectedNumber, $selectedNumber, $selectedNumber, 0);
    } 
    //Start game again
    else {
        $("#centre").html($("#centreStandby").html());
        startChangingSquares();
        interval = startInterval;
    }
    
}

var curentSquare = 0;
function nextSquare() {

    if (!$("#gameboard.stopped").length ){
        $gameSquares = $("div[id^='square']");

        $gameSquares.removeClass("selected");

        var randNum = curentSquare;

        while (randNum == curentSquare) {
            randNum = Math.floor(Math.random() * $gameSquares.length + 1);
        }

        // show image that is nth child of image array
        $selectedSquare = $gameSquares.eq(randNum - 1);
        $selectedSquare.addClass("selected");
        $selectedNumber = randNum;

        curentSquare = randNum;

        startChangingSquares();
    }
} 

var numberOfSquares = 16;
function highlightClockwise(startSquare, currentSquare, currentSquareCC, rounds) {

    if ($halfway != 0) {
        $gameSquares.eq($halfway - 1).toggleClass("highlighted");
        $halfway = 0;
    }

    if (currentSquare > numberOfSquares) {
        currentSquare = 1;
    }

    if (currentSquare == startSquare) {
        rounds++;
    }

    if (rounds < 2) {

        $gameSquares = $("div[id^='square']");
        $selectedSquare = $gameSquares.eq(currentSquare - 1);
        $selectedSquare.toggleClass("highlighted");

        $gameSquares.eq(currentSquareCC - 1).toggleClass("highlighted");

        


        $nextSquare = 0;
        $prevSquare = 0;

        //console.log("CS:" + currentSquare + "|CSCC:" + currentSquareCC + "|R:" + rounds + "|NS:" + $nextSquare);

        $nextSquare = ll[currentSquare].next;
        $prevSquare = ll[currentSquareCC].prev;

        if (currentSquare != currentSquareCC) {
            setTimeout(
            function () { highlightClockwise(startSquare, $nextSquare, $prevSquare, rounds) },
            50);
        } else {
            $gameSquares.eq(currentSquareCC - 1).toggleClass("highlighted");
            setTimeout(
            function () { highlightClockwise(startSquare, $nextSquare, $prevSquare, rounds) },
            200);
            $halfway = currentSquareCC;
        }

    } else {
        $gameSquares.removeClass("highlighted");
    }

}

$gameSquares = $("div[id^='square']");


$(document).keypress(function (e) {
    switch (e.which) {
        case 32:
            stopOrStart();
            break;
    }
});

$(document).ready(function () {


    $("#centre").html($("#centreStandby").html());
    startChangingSquares();

});

