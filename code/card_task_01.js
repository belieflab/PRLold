// instantiate data saving
var subjectFileName       = dataDirectory + csvPrefix + workerId + csvExtension;
var excludedCSVName       = dataDirectory + csvPrefix + workerId + "_excluded.csv";
var attritionListFileName = dataDirectory + csvPrefix + "attrition_list.csv";

//-------------------------------------------
// INSTRUCTIONS
//-------------------------------------------

// Attrition instructions
var attrition_instructions =  "Please type the following sentence into the box below exactly as written " +
"to proceed: " + "<br>" +
"<i>I am ready to begin this task.</i>" +
"<br /><br />";

var instr1 = "Welcome! Before we begin, please make your window as large as possible. " +
"Please do not leave the task page, do not use the back button, and do not refresh the page, as you " +
"may be locked out from completing the task." +
"<br /><br />" +
"Please press the zero (0) key to continue.";

// var instr2 = "In this study, you will play a card game, and your goal " +
// "is to win as many points as you can." +
// "<br /><br />" +
// "If your score lands you in the top " + percentile + "% of participants, you will " +
// "get an extra $" + bonus + " bonus, so please do your best!" +
// "<br /><br />" +
// "Please press the zero (0) key to continue.";

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
"Please click the 'Begin' button to start the practice round.";

var endPracticeInstructions = "You have now completed the practice round. " +
"The main task will take approximately another 10 minutes, with longer individual rounds than the practice. " +
"<br /><br />" +
"Please click 'Begin' whenever you are ready to start the main task.";


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
		$('#nextButton').text("BEGIN");

  // Attrition phase end, instructions phase start
  } else if (nextButtonClickCounter == 2) {
		// validate attrition ans
		progressAllowed = validateAttritionAns();

		// hide attrition stuff, show main instructions
		if (progressAllowed) {
			$(".attrition").css({"display": "none"});
			$(".instructions").css({"display": "block"});
      $("#nextButton").css({"display": "none"});
      $("#hide").css({"display": "none"});
      $(".screening").css({"background-color": "gray"});
      interactiveInstructionsOn = true;
      keysAllowed = true;
      practiceOn = false;
      addToParticipantList(workerId, firstHalfProbabilities, secondHalfProbabilities,
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
var workerId_error_id         = "#workerIDErrorMessage";
var pastParticipantListCSVName = '../data/past_participant_list.csv';
var pastParticipantList        = [];
var csvData, pastParticipantList;

getCSV(pastParticipantListCSVName);
pastParticipantList = csvData;
pastParticipantList = flatten(pastParticipantList);

//get worker ID if embedded in URL
// var workerId_valid = validate_workerId( workerId );
var workerId_used_before = check_workerId_used_before( workerId, pastParticipantList );

//check that user is not on a mobile device, and if they're not, begin instructions
if (!validate_browser(user_agent_string))
{
  $('.error').css({'display': 'block'});
  $(mobile_browser_error_id).css({'display': 'block'});
  $(workerId_error_id).css({'display': 'none'});
  $('.buttonHolder').css({'display': 'none'});
  $('.consent').css({'display': 'none'});
  $('.instructions').css({'display': 'none'});
  $('.task').css({'display': 'none'});

}

if (workerId_used_before) {
  $('.error').css({'display': 'block'});
  $(mobile_browser_error_id).css({'display': 'none'});
  $(workerId_error_id).css({'display': 'block'});
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
      var this_workerId_used_before = check_workerId_used_before( workerId, pastParticipantList );

      if ( (this_workerId_used_before) || (refreshCount > 0) ) {
        excludeThisSubject = true;
        if (this_workerId_used_before) {
          excludedReason = 'duplicate_worker';
        } else if (refreshCount > 0) {
          excludedReason = 'refreshed_experiment_page';
        }
      }

      saveData();
      addToParticipantList(workerId, firstHalfProbabilities, secondHalfProbabilities,  startDate, endDate, pastParticipantListCSVName); // XXX
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


