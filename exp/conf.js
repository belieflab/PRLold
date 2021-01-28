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
//var workerId = getParamFromURL( "workerId" );

// var workerId = prompt("enter subjectID:");
// var confirm_id = alert("You have entered:\n\n" + workerId + "\n\nIf incorrect, please refresh the browser and enter the correct ID.");


// if (!isEmpty(workerId)) {
//   Math.seedrandom(workerId);
// } else {
//   var this_seed = new Date().getTime();
//   Math.seedrandom(this_seed);
//   workerId = "AUNDEFINED_" + this_seed;
// }

// choose seed based on mturk info. XXX Implement seeding based on manually input worker ID
// if (!isEmpty(workerId)) {
//     Math.seedrandom(workerId);
// } else {
//     var this_seed = new Date().getTime();
//     Math.seedrandom(this_seed);
//     workerId = "AUNDEFINED_" + this_seed;
// }
var link = "https://survey.az1.qualtrics.com/SE/?SID=SV_5jt7BivBUleMhWl&Q_JFE=0&workerId=" +
workerId;

var refreshCount          = parseInt("<?php echo $_SESSION['refreshCount']; ?>");
var dataDirectory         = '../data/';
var stimulusDirectory     = '../stimuli/';
var csvPrefix             = "prl_";
var csvExtension          = '.csv';



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
var deckImagePrefix    = "../stimuli/A/deck_";
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
