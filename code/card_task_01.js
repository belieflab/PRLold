//EJF edited on 8 March 2018 to set to constant 90-50-10 (task version1):
// Altered "Choose condition" to set probabilities to [0,0] for both halves
//original settings below:
//var probabilities           = [ [0.9, 0.5, 0.1], [0.8, 0.4, 0.2] ];
//var firstHalfProbabilities  = probabilities[randomIntFromInterval(0, 1)];
//var secondHalfProbabilities = probabilities[randomIntFromInterval(0, 1)];
// TO DO:
//  - exclusion based on refresh et al - CHECK

// NICE TO HAVE:
//	- card flipping
//  - input MTurk ID if it isn't found

// TO DO (survey):
//	- CRT with wording modified (check for citation), but question about if they've seen these Qs before

// CONSTANTS
var keyMap = {
	left: 49,     // 1
  middle: 50,   // 2
  right: 51,    // 3
  continue: 48  // 48 = zero, 32 = space, but problematic on firefox for triggering button presses!
};



//subject ID popup
//var worker_id = getParamFromURL( "workerId" );

var worker_id = prompt("enter subjectID:");
var confirm_id = alert("You have entered:\n\n" + worker_id + "\n\nIf incorrect, please refresh the browser and enter the correct ID.");


if (!isEmpty(worker_id)) {
  Math.seedrandom(worker_id);
} else {
  var this_seed = new Date().getTime();
  Math.seedrandom(this_seed);
  worker_id = "AUNDEFINED_" + this_seed;
}

// choose seed based on mturk info. XXX Implement seeding based on manually input worker ID
if (!isEmpty(worker_id)) {
    Math.seedrandom(worker_id);
} else {
    var this_seed = new Date().getTime();
    Math.seedrandom(this_seed);
    worker_id = "AUNDEFINED_" + this_seed;
}
var link = "https://survey.az1.qualtrics.com/SE/?SID=SV_5jt7BivBUleMhWl&Q_JFE=0&workerId=" +
worker_id;

var refreshCount          = parseInt("<?php echo $_SESSION['refreshCount']; ?>");
var dataDirectory         = '../data/';
var stimulusDirectory     = '../stimuli/';
var csvPrefix             = "card_task_01_";
var csvExtension          = '.csv';
var subjectFileName       = dataDirectory + csvPrefix + worker_id + csvExtension;
var excludedCSVName       = dataDirectory + csvPrefix + worker_id + "_excluded.csv";
var attritionListFileName = dataDirectory + csvPrefix + "attrition_list.csv";


var startDate           = new Date(); //.toISOString() makes it a UTC string...
var percentile          = 25; // cut-off performance percentile for bonus
var bonus               = 2; // in dollars
var possiblePoints      = [100, -50];
var feedbackDuration    = 1;
var feedbackDuration_ms = feedbackDuration * 1000;
var ITI                 = 0.5;
var ITI_ms              = ITI * 1000;
var responseKeyList     = [keyMap.left, keyMap.middle, keyMap.right];
var continueKeyList     = [keyMap.continue]; // 32
var red                 = "#C23818";
var green               = "#22C228";
var win                 = randomIntFromInterval(0, 1) > 0.5; // convert to boolean
var feedbackColor       = win ? green : red; // green if win, red if loss
var winPoints           = 100;
var losePoints          = -50;
var points              = win ? winPoints : losePoints;
var score               = 0;

var keysAllowed         = false;
var breakOn             = false;
var response;

// Choose condition
var probabilities           = [ [0.9, 0.5, 0.1], [0.8, 0.4, 0.2] ];
// 0 = [0.9, 0.5, 0.1]; 1=[0.8, 0.4, 0.2]
// var firstHalfProbabilities  = probabilities[randomIntFromInterval(0, 1)];
var firstHalfProbabilities  = probabilities[randomIntFromInterval(0, 0)];
// var secondHalfProbabilities = probabilities[randomIntFromInterval(0, 1)];
var secondHalfProbabilities = probabilities[randomIntFromInterval(1, 1)];
var numBlocks               = 4;
var trialsPerBlock          = 40;
var totalTrials             = numBlocks * trialsPerBlock;
var breakTrials             = [];
var trial                   = 0;
var practiceTrial 					= 0;
var totalPracticeTrials     = 3;
var streak                  = 0;
var maxStreak               = 9;
var strikes                 = 0;
var maxStrikes              = 2;
var randomizeDecksOn        = false;
var practiceOn 							= false;
var interactiveInstructionsOn = false;

// Data output structure
var trialInfo = {
  deckColors: [],
  deckPositions: [],
  deckProbabilities:[],
  deckProbabilityOrder: [],
  colors: [],
  keys: [],
  positions: [],
  probabilities: [],
  results: [],
  reversals: [],
  trialNums: [],
  RT: [],
  score: []
};

var excludeThisSubject = false;
var excludedReason = "NA";

// Set up evenly spaced breaks at start of each new block
for (var i = trialsPerBlock; i <= totalTrials; i += trialsPerBlock) {
	breakTrials.push(i);
}

// Choose deck placement
var deckImagePrefix    = "../stimuli/deck_";
var deckImageExtension = ".jpg";
var probabilityNames   = ['high', 'medium', 'low'];
var probabilityOrder   = shuffle(deepCopy(probabilityNames));
var deckPositions      = ['left', 'middle', 'right'];
var deckColorOrder     = shuffle(['red', 'black', 'blue']);

var probabilityToColor    = _.zipObject(probabilityOrder, deckColorOrder);
var positionToProbability = _.zipObject(deckPositions, probabilityOrder);
var probabilityToPosition = _.zipObject(probabilityOrder, deckPositions);
var positionToColor       = _.zipObject(deckPositions, deckColorOrder);
var keyToPosition         = _.zipObject(responseKeyList, deckPositions);
var keyToProbability      = _.zipObject(responseKeyList, probabilityOrder);
var theseProbabilities    = _.zipObject(probabilityNames, firstHalfProbabilities);

var trialProbabilityArray = [];

// Randomize deck position
for (var position in positionToColor) {
  var thisID = "#" + position + "DeckImage";
  var color  = positionToColor[position];
  $(thisID).attr('src', deckImagePrefix + color + deckImageExtension);
}

var infix          = "-pr1-";
var suffix         = "-a";
var completionCode = generateCompletionCode(infix, suffix);

// preload images
var images = [];
images = preloadImages(deckImagePrefix, deckColorOrder, deckImageExtension);
//-------------------------------------------
// INSTRUCTIONS
//-------------------------------------------

// Attrition instructions
var attrition_instructions =  "Please type the following sentence into the box below exactly as written " +
"to proceed: " + 
"<i>I am ready to begin this task.</i>" +
"<br /><br />";

var instr1 = "Welcome! Before we begin, please make your window as large as possible. " +
"Please do not leave the task page, do not use the back button, and do not refresh the page, as you " +
"may be locked out from completing the task." +
"<br /><br />" +
"Please press the zero (0) key to continue.";

var instr2 = "In this study, you will play a card game, and your goal " +
"is to win as many points as you can." +
"<br /><br />" +
"If your score lands you in the top " + percentile + "% of participants, you will " +
"get an extra $" + bonus + " bonus, so please do your best!" +
"<br /><br />" +
"Please press the zero (0) key to continue.";

var instr3 = "The card game is very simple: on each turn you will choose one of the " +
"three decks below, so you can draw a card from it. You can choose a deck " +
"using the ‘1’, ‘2’, or ‘3’ keys on your keyboard to choose the " +
"left, middle, or right deck respectively." +
"<br /><br />" +
"Let's practice choosing decks. Please choose the <b>left</b> deck by pressing the '1' key.";

var instr4 = "Great! Now choose the <b>middle</b> deck by pressing the '2' key.";

var instr5 = "Excellent! Now choose the <b>right</b> deck by pressing the '3' key.";

var instr6 = "Good job! You have successfully practiced selecting decks." +
"<br /><br />" +
"After you select a deck, the top card will turn over. This card can either win you " +
"an additional 100 points ('winning' cards) or take away 50 points ('losing' cards). " +
"Below you can see what those cards look like." +
"<br /><br />" +
"<b>Note that each deck contains both winning and losing cards, but in different amounts. </b>" +
"Your job is to figure out which deck is the best deck, so that you can get as many points " +
"as possible." +
"<br /><br />" +
"Please press the zero (0) key to continue.";

var instr7 = "However, there is one final catch: <b>there may be times when the best deck will change.</b>" +
"<br /><br />" +
"If you think the best deck has changed from what it was before, then try to find out the new best deck." +
"<br /><br />" +
"The following is a practice round of just 3 turns. The points you get here won’t change your final score, " +
"and the best deck will change between the practice round and when the real game starts." +
"<br /><br />" +
"Please click the 'Next' button to start the practice round.";

var endPracticeInstructions = "You have now completed the practice round. " +
"The main task will take approximately another 10 minutes, with longer individual rounds than the practice. " +
"<br /><br />" +
"Please click 'Next' whenever you are ready to start the main task.";


var task_instructions = [];
task_instructions.push(instr1);
task_instructions.push(instr2);
task_instructions.push(instr3);
task_instructions.push(instr4);
task_instructions.push(instr5);
task_instructions.push(instr6);
task_instructions.push(instr7);

var progressAllowed        = true;
var nextButtonClickCounter = 0;
var currInstructions       = 0;
var currPhase              = 0;
var RT                     = 0;
var trialStartTime         = 0;

//-------------------------------------------
// SHOW INSTRUCTIONS ON PRESSING CONSENT
//-------------------------------------------
// Set instructions
$("#instructions1").html(task_instructions[0]);

// Set attritionInstructions
$("#attritionInstructions").html(attrition_instructions);

document.getElementById('nextButton').onclick = function() {
  if (progressAllowed) {
    nextButtonClickCounter += 1;
  }

  // Consent phase end, attrition phase start
  if (nextButtonClickCounter == 1) {
  	// Hide consent stuff
    $(".consent").css({"display": "none"});

    // Show attrition stuff
    $(".attrition").css({"display": "block"});

    // reword next button
		$('#nextButton').text("Next");

  // Attrition phase end, instructions phase start
  } else if (nextButtonClickCounter == 2) {
		// validate attrition ans
		progressAllowed = validateAttritionAns();

		// hide attrition stuff, show main instructions
		if (progressAllowed) {
			$(".attrition").css({"display": "none"});
			$(".instructions").css({"display": "block"});
      $("#nextButton").css({"display": "none"});
      interactiveInstructionsOn = true;
      keysAllowed = true;
      practiceOn = false;
      addToParticipantList(worker_id, firstHalfProbabilities, secondHalfProbabilities,
      startDate, startDate, attritionListFileName); // add to attrition list since they saw the instructions

    }

  // Instructions phase end, practice phase start
  } else if (nextButtonClickCounter == 3) {
		keysAllowed = true;
    practiceOn = true;
    interactiveInstructionsOn = false;
    $(".instructions").css({"display": "none"});
    $("#instructions1").html(endPracticeInstructions);
    $('#nextButton').css({display: "none"});
    $("#rightDeck").css({display: 'block'});
    // show fixation after feedback is done
    showFixationOnly();
    // reset display once ITI is done
    Timeout.set(reset, ITI_ms);

  // Practice phase end, task phase start
  } else if (nextButtonClickCounter == 4) {
  	keysAllowed = true;
    practiceOn = false;
    interactiveInstructionsOn = false;
    $(".instructions").css({"display": "none"});
    $('#nextButton').css({display: "none"});
    // show fixation after feedback is done
    showFixationOnly();
    // reset display once ITI is done
    Timeout.set(reset, ITI_ms);
  }
};

var allowedKey, thisProbability, thisKey;
var lastPressedTime = 0;
var thisPressedTime = 0;
var minPressInterval = 300; // time mandated between button presses for instructions, in ms
var thisPressInterval = 0;
$(document).keypress(function(key) {
	thisPressedTime = Date.now();
  RT = thisPressedTime - trialStartTime;
  thisPressInterval = thisPressedTime - lastPressedTime;
  thisKey = key.which;

  if (keysAllowed) {
    if (interactiveInstructionsOn) {
      // the parts where you need to make a specific button press
      if (currInstructions >= 2 && currInstructions <= 4 ) {
        currPhase = currInstructions - 2;
        allowedKey = responseKeyList[currPhase];
      } else {
        allowedKey = continueKeyList[0];
      }

      if ( (thisKey == allowedKey) && (thisPressInterval > minPressInterval) ) {
        currInstructions += 1;
      }

      $("#instructions1").html(task_instructions[currInstructions]);

      if (currInstructions == 2){
        showDecks();
      }

      if (currInstructions == 5){
        showFeedback("left", 100, true);
        showFeedback("middle", -50, false);
        $("#rightDeck").css({display: 'none'});
      }

      if (currInstructions >= task_instructions.length - 1) {
        keysAllowed = false;
        hideDecks();
        hideFeedback();
        $("#nextButton").css({"display": "block"});
      }

    } else if (practiceOn) {
      if (practiceTrial < totalPracticeTrials) {
        if (!breakOn && responseKeyList.includes(thisKey) && (thisPressInterval > minPressInterval)) { // keysAllowed
          keysAllowed = false;
          practiceTrial += 1;

          trialProbabilityArray = firstHalfProbabilities;
          theseProbabilities = _.zipObject(probabilityNames, trialProbabilityArray);
          thisProbability = keyToProbability[thisKey];

          response    = probabilityToPosition[thisProbability];
          win         = Math.random() <= theseProbabilities[thisProbability];
          points      = win ? winPoints : losePoints;

          showFeedback(response, points, win);

          // show fixation after feedback is done
          Timeout.set(showFixationOnly, feedbackDuration_ms);
          // reset display once ITI is done
          Timeout.set(reset, ITI_ms + feedbackDuration_ms);
        }
      }
    } else {
      if (trial < totalTrials) {
        if (!breakOn && responseKeyList.includes(thisKey) && (thisPressInterval > minPressInterval)) { //keysAllowed
          keysAllowed = false;

          trial += 1;

          // Check if we're using the first or second half's probabilites
          trialProbabilityArray = trial <= (totalTrials/2) ? firstHalfProbabilities : secondHalfProbabilities;

          theseProbabilities = _.zipObject(probabilityNames, trialProbabilityArray);

          thisProbability = keyToProbability[thisKey];

          if (thisProbability == "high") {
            streak += 1;
          } else {
          	if (streak > 0) {
			  strikes += 1;
          	}


            if (strikes >= maxStrikes) {
              streak = 0;
              strikes = 0;
            }
          }

          if (streak >= maxStreak) {
            randomizeDecksOn = true;
          }

          response    = probabilityToPosition[thisProbability];
          win         = Math.random() <= theseProbabilities[thisProbability];
          points      = win ? winPoints : losePoints;
          score += points;

          // Add trial info
          trialInfo.deckColors.push(deckColorOrder);
          trialInfo.deckPositions.push(deckPositions);
          trialInfo.deckProbabilities.push(trialProbabilityArray);
          trialInfo.deckProbabilityOrder.push(probabilityOrder);
          trialInfo.colors.push(probabilityToColor[thisProbability]);
          trialInfo.keys.push(thisKey);
          trialInfo.positions.push(keyToPosition[thisKey]);
          trialInfo.probabilities.push(thisProbability);
          trialInfo.results.push(win);
          trialInfo.reversals.push(randomizeDecksOn);
          trialInfo.trialNums.push(trial);
          trialInfo.RT.push(RT);
          trialInfo.score.push(score);

          showFeedback(response, points, win);

          // show fixation after feedback is done
          Timeout.set(showFixationOnly, feedbackDuration_ms);
          // reset display once ITI is done
          Timeout.set(reset, ITI_ms + feedbackDuration_ms);
        } else if (breakOn && continueKeyList.includes(thisKey) && (thisPressInterval > minPressInterval) ) {
          breakOn = false;
          var index = breakTrials.indexOf(trial);
          breakTrials.splice(index, 1);
          // show fixation
          showFixationOnly();
          // reset display once ITI is done
          Timeout.set(reset, ITI_ms);
        }
      }
    }
    // lastPressedTime = thisPressedTime;
  }
  lastPressedTime = thisPressedTime;
});

//-------------------------------------------
// Worker ID & Browser validation
//-------------------------------------------
var user_agent_string          = navigator.userAgent;
var mobile_browser_error_id    = "#mobileBrowserErrorMessage";
var worker_id_error_id         = "#workerIDErrorMessage";
var pastParticipantListCSVName = '../data/past_participant_list.csv';
var pastParticipantList        = [];
var csvData, pastParticipantList;

getCSV(pastParticipantListCSVName);
pastParticipantList = csvData;
pastParticipantList = flatten(pastParticipantList);

//get worker ID if embedded in URL
var worker_id_valid = validate_worker_id( worker_id );
var worker_id_used_before = check_worker_id_used_before( worker_id, pastParticipantList );

//check that user is not on a mobile device, and if they're not, begin instructions
if (!validate_browser(user_agent_string))
{
  $('.error').css({'display': 'block'});
  $(mobile_browser_error_id).css({'display': 'block'});
  $(worker_id_error_id).css({'display': 'none'});
  $('.buttonHolder').css({'display': 'none'});
  $('.consent').css({'display': 'none'});
  $('.instructions').css({'display': 'none'});
  $('.task').css({'display': 'none'});

}

if (worker_id_used_before) {
  $('.error').css({'display': 'block'});
  $(mobile_browser_error_id).css({'display': 'none'});
  $(worker_id_error_id).css({'display': 'block'});
  $('.buttonHolder').css({'display': 'none'});
  $('.consent').css({'display': 'none'});
  $('.instructions').css({'display': 'none'});
  $('.task').css({'display': 'none'});

}


function showDecks() {
	$(".deckContainer").css({display: 'block'});
}

function hideDecks() {
	$(".deckContainer").css({display: 'none'});
}

function showFixation() {
	$('.fixation').css({display: 'block'});
}

function hideFixation() {
	$('.fixation').css({display: 'none'});
}

function showFeedback(deck_position, deck_points, deck_win) {
  var this_feedback_id = "#" + deck_position + "Feedback";
  var feedback_color   = deck_win ? green : red;
  $(this_feedback_id).text(deck_points);
  $(this_feedback_id).css({color: feedback_color, display: 'block'});
}

function hideFeedback() {
	$(".feedback").css({display: 'none'});
}

function showFixationOnly() {
	showFixation();
  hideDecks();
  hideFeedback();
  hideBreakText();
}

function setBreakText(text) {
	$(".break").html(text); // xxx .text
}
function showBreakText() {
  $(".break").css({display: 'block'});
}

function hideBreakText() {
  $(".break").css({display: 'none'});
}

function reset() {
  trialStartTime = Date.now();
	if (breakTrials.includes(trial)) {
  	breakOn = true;
    keysAllowed = true;

    // re-randomize deck contingencies
    randomizeDecksOn = true;

    var percentComplete = trial/totalTrials * 100;
    var breakText;
    if (percentComplete < 100) {
    	breakText = "You are now " + percentComplete + "% done. Please press the zero (0) key to continue.";
    } else {
    	breakText = "You have completed the task. Your final score is " + score + " ." +
      "<br><br>";

      // save data
      endDate = new Date();

      // check if we're excluding data
      var this_worker_id_used_before = check_worker_id_used_before( worker_id, pastParticipantList );

      if ( (this_worker_id_used_before) || (refreshCount > 0) ) {
        excludeThisSubject = true;
        if (this_worker_id_used_before) {
          excludedReason = 'duplicate_worker';
        } else if (refreshCount > 0) {
          excludedReason = 'refreshed_experiment_page';
        }
      }

      saveData();
      addToParticipantList(worker_id, firstHalfProbabilities, secondHalfProbabilities,  startDate, endDate, pastParticipantListCSVName); // XXX
    }

    setBreakText(breakText);
    showBreakText();
    hideDecks();
    hideFixation();
    hideFeedback();
  } else {
  	showDecks();
    hideFixation();
    hideFeedback();
    hideBreakText();
    breakOn = false;
    keysAllowed = true;
  }

  if (practiceOn && (practiceTrial == totalPracticeTrials)) {
    breakOn = true;
    keysAllowed = false;

    // re-randomize deck contingencies
    randomizeDecksOn = true;

    hideDecks();
    hideFixation();
    hideFeedback();

    currInstructions += 1;
    $('#instructions1').html(task_instructions[currInstructions]);
    $('#instructionsHolder').css({display: 'block'});
    $('#instructions1').css({display: 'block'});
    $('#nextButton').css({display: 'block'});
  }

  // randomize deck contingencies
  if (randomizeDecksOn) {
  	var tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
    while (tempProbabilityOrder.indexOf("high") == probabilityOrder.indexOf("high")) {
    	tempProbabilityOrder = shuffle(tempProbabilityOrder);
    }

    probabilityOrder = tempProbabilityOrder;

    probabilityToColor    = _.zipObject(probabilityOrder, deckColorOrder);
    positionToProbability = _.zipObject(deckPositions, probabilityOrder);
    probabilityToPosition = _.zipObject(probabilityOrder, deckPositions);
    positionToColor       = _.zipObject(deckPositions, deckColorOrder);
    keyToPosition         = _.zipObject(responseKeyList, deckPositions);
    keyToProbability      = _.zipObject(responseKeyList, probabilityOrder);
    trialProbabilityArray = trial <= (totalTrials/2) ? firstHalfProbabilities : secondHalfProbabilities;
    // theseProbabilities    = _.zipObject(probabilityNames, firstHalfProbabilities);
    theseProbabilities    = _.zipObject(probabilityNames, trialProbabilityArray);

    // make sure we don't do this twice in a row, and reset the streak
    randomizeDecksOn = false;
    streak = 0;
    strikes = 0;
  }

}

// Generates random integer between min and max
function randomIntFromInterval(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Shuffles an array.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex  = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue      = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex]  = temporaryValue;
  }

  return array;
}

// Makes a deep copy of an object or array
function deepCopy(obj) {
	if (Object.prototype.toString.call(obj) === '[object Array]') {
	    var out = [], i = 0, len = obj.length;
	    for ( ; i < len; i++ ) {
	        out[i] = arguments.callee(obj[i]);
	    }
	    return out;
	}
	if (typeof obj === 'object') {
	    var out = {}, i;
	    for ( i in obj ) {
	        out[i] = arguments.callee(obj[i]);
	    }
	    return out;
	}
	return obj;
}

function validateAttritionAns() {
  var valid = false;
  field = "#attritionAns";
  var response = $(field).val().trim(); // remove white space

  var modelResponse = "I am ready to begin this task.";
  var almostModelResponse = "I am ready to begin this task";
  if ( (response == modelResponse) || (response==almostModelResponse)) {
    valid = true;
  } else {
    valid = false;
    return alertAndFocus(field, "Please enter the requested text exactly into the box before clicking next!");
  }
  return valid;
}

function alertAndFocus(field, message) {
  alert(message);
  $(field).focus();
  return false;
}

function generateCompletionCode(infix, suffix){
  var thisNum, thisChar;
  var thisCode = "";
  for (var i = 0; i < 9; i++) {
    thisNum = randomIntFromInterval(0,9);
    thisChar = String(thisNum);
    thisCode = thisCode + thisChar;
  }

  thisCode = thisCode + infix;

  for (var i = 0; i < 7; i++) {
    thisNum = randomIntFromInterval(0,9);
    thisChar = String(thisNum);
    thisCode = thisCode + thisChar;
  }

  thisCode = thisCode + suffix;

  return thisCode;
}

// Check that the worker ID has been used before
function check_worker_id_used_before( id_str, list )
{
  var inArray = $.inArray(id_str, list);
  if (inArray == -1) {
  return false;
  } else {
  return true;
  }

}

// validates the worker ID
function validate_worker_id( id_str )
{
  var min_length = 8;
  var max_length = 25;
  var bad_reg_ex = /\W/;

  if (id_str.length < min_length)
  return false;

  if (id_str.length > max_length)
  return false;

  if (id_str.charAt(0) != 'A' && id_str.charAt(0) != 'a')
  return false;

  if (bad_reg_ex.test(id_str))
  return false;

  return true;
}


// make sure browser isn't mobile
function validate_browser( uas )
{
  var regex1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
  var regex2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
  var r2_substr_length = 4;
  var uas_sub = uas.substr(0, r2_substr_length);

  if (regex1.test(uas))
  return false;

  if (regex2.test(uas_sub))
  return false;

  return true;
}

// Preloads the images
function preloadImages(prefix, colorList, extension){
  var images = [];
  for (i = 0; i < colorList.length; i++) {
    images[i] = new Image();
    thisImageName = prefix + colorList[i] + extension;
    images[i].src = thisImageName;
  }

  return images;
}

// XXX implement python
function addToParticipantList(workerID, firstHalfProbabilities, secondHalfProbabilities, startDate, endDate, fileName){
  $.ajax({
    type:'post',
    async: false,
    cache: false,
    url: 'addToParticipantList.py', // this is the path to the PHP script that will handle saving data
    data: {
      workerID: workerID,
      fileName: fileName,
      firstHalfProbabilities: JSON.stringify(firstHalfProbabilities),
      secondHalfProbabilities: JSON.stringify(secondHalfProbabilities),
      startDate: startDate,
      endDate: endDate
    }
  });
}

// XXX implement this and the other python scripts
function saveData(){
  $.ajax({
    type:'post',
    async: false,
    cache: false,
    url: 'saveData.py', // this is the path to the PHP script that will handle saving data
    data: {
      fileName: subjectFileName,
      excludedFileName: excludedCSVName,
      excludedReason: excludedReason,
      startDate: startDate,
      endDate: endDate,
      autoWorkerID: worker_id,
      userAgentString: user_agent_string,
      firstHalfProbabilities: JSON.stringify(firstHalfProbabilities),
      secondHalfProbabilities: JSON.stringify(secondHalfProbabilities),
      deckColors: JSON.stringify(trialInfo.deckColors),
      deckPositions: JSON.stringify(trialInfo.deckPositions),
      deckProbabilities: JSON.stringify(trialInfo.deckProbabilities),
      deckProbabilityOrder: JSON.stringify(trialInfo.deckProbabilityOrder),
      colors: JSON.stringify(trialInfo.colors),
      keys: JSON.stringify(trialInfo.keys),
      positions: JSON.stringify(trialInfo.positions),
      probabilities: JSON.stringify(trialInfo.probabilities),
      results: JSON.stringify(trialInfo.results),
      reversals: JSON.stringify(trialInfo.reversals),
      trialNums: JSON.stringify(trialInfo.trialNums),
      RT: JSON.stringify(trialInfo.RT),
      score: JSON.stringify(trialInfo.score)
    }
  });
}

function getCSV(csvName){
  $.ajax({
    async: false,
    url: csvName,
    success: function(file_content){
      csvData = $.csv.toArrays(file_content);
    }
  });
}

// BELOW COURTESY OF GARY LUPYAN -- COPIED FROM
//  http://sapir.psych.wisc.edu/wiki/index.php/MTurk
function getParamFromURL( name ) {
  name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
  var regexS = "[\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
  return "";
  else
  return results[1];
}


function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

// flattens an n-dimensional array into a 1-dimensional one
function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
  return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

// Checks if string is empty, null, or undefined
function isEmpty(str) {
  return (!str || !str.length);
}
