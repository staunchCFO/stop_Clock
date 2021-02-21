/**
 * Programming a simple stop clock with a tone after the timer finishes counting..
 * Developer : Emeka Okezie
 * Organization : Gibbins.com
 * Date : 31-July-2020
 */

let timerObj = {
    minutes : 0,
    seconds : 0,
    timerId : 0 //The timerId is used to be able to either Pause or Stop the timer
}

/**
 * Creating the Sound Alarm Function;
 * setting up of the sound to be played after the timer finishes.
 */

function soundAlarm(){
    let amount = 3;
    let audio = new Audio("NF-Outro.mp3");

    function playSound() {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
    for(let i = 0; i < amount; i++){
        setTimeout(playSound, 1200 * i)
    }
}

/**
 * Function to update the timerObj variable and the HTML 
 * @param {*} key 
 * @param {*} value 
 */
function updateValue(key , value){
    if(value < 0) {
        value = 0;
    }
    /**
     * This conditional statement, checks for the key parameter, to check is the value assigned to it is less than 10, if so, it adds 
     * "0" to any value selected for seconds thats lezz than 10.
     */
    if(key == "seconds") {
        if(value < 10) { 
            value = "0" + value
        }
        //this conditional statement, makes sure the seconds timer doesnt countdown values above 59, even when a user
        //inputs more than such values 
        if(value > 59){
            value = 59;
        }
    }
    //I then targeted the ID's for minutes and seconds using this code, setting it to either the value inputted or zero.
    $("#" + key).html(value || 0);
    timerObj[key] = value; 
}

/**
 * a new syntax in javaScript for declaring a function and calling it at the same time.
 */
(function detectChanges(key) {

    let input = "#" + key + "-input";
    $(input).change(function(){
        updateValue(key , $(input).val());
    });
    
    $(input).keyup(function(){
        updateValue(key , $(input).val());
    });

    return arguments.callee
})("minutes")("seconds");


/**
 * Setting up the startTimer button, this freezes the input sesctions and all disables every other button
 * ---This button also triggers the soundAlarm() function once the timer finishes counting and seconds reads @zero
 * --- The stops the timer immediately.
 */

function startTimer(){
    buttonManager(["start", false], ["pause", true], ["stop", true]);
    freezeInputs();
    //This function helps in stopping the timer when the minutes value is zero and seconds value counts to zero
    timerObj.timerId = setInterval(function() {
        timerObj.seconds--;
        if(timerObj.seconds < 0){
            if(timerObj.minutes == 0) {
                soundAlarm();
                return stopTimer();
            }
            timerObj.seconds =  59;
            timerObj.minutes --;
        }
        updateValue("minutes", timerObj.minutes);
        updateValue("seconds", timerObj.seconds);

    }, 1000);
}

/**
 * The pauseTimer() function, pauses the timer and also enabling the Start and the Stop button at the same time,
 * this also freezes the counter at the same time.
 */
function pauseTimer(){
    buttonManager(["start", true], ["pause", false], ["stop", true]);
    clearInterval(timerObj.timerId)
}

/**
 * The stopTimer() functions,stop this timer from counting, and also unfreeze the input section at 
 * the same time also...
 */
function stopTimer(){
    clearInterval(timerObj.timerId);
    buttonManager(["start", true], ["pause", false], ["stop", false]);
    unfreezeInputs();
    updateValue("minutes", $("#minutes-input").val());
    let seconds = $("#seconds-input").val() || "0";
       updateValue("seconds", seconds);

}

//Here i used the rest operator
/**
 * Here i set up the buttonManager function, this helps in managing the Start, Pause & Stop button functionality
 * @param  {...any} . the rest operator {buttonsArray} was passed into buttonManageras a parameter
 * The Rest Operator lets you pass in as many arguments as one wants into a function
 */
function buttonManager(...buttonsArray){

    for(let i = 0; i < buttonsArray.length; i++){
         let button = "#" + buttonsArray[i][0] + "-button";
         if(buttonsArray[i][1]){
             $(button).removeAttr("disabled");
         }else{
             $(button).attr("disabled" , "disabled");
         }
    }
}

/**
 * Function to freeze and unfreeze the input section when the timer is counting and finishes counting also.
 */
function freezeInputs(){
    $("#minutes-input").attr("disabled" , "disabled")
    $("#seconds-input").attr("disabled" , "disabled")
}

function unfreezeInputs(){
    $("#minutes-input").removeAttr("disabled")
    $("#seconds-input").removeAttr("disabled")
}