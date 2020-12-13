<?php 
session_start();
if (!isset($_SESSION['refreshCount']))    {
    $_SESSION['refreshCount'] = 0;
}
elseif ($_SESSION['refreshCount'] >= 0)    {
    $_SESSION['refreshCount']++;
}
header('Access-Control-Allow-Origin: *'); #necessary to make CSV downloading work
?>


<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta name="robots" content="noindex, nofollow">
  <meta name="googlebot" content="noindex, nofollow">
  <link rel="stylesheet" type="text/css" href="card_task_01.css">
  <!-- <title>Probabalistic Reversal Task</title> -->
  <title>3-PRLT</title>
  <script>

    //onbeforeunload in body
    function areYouSure() {
    return "Write something clever here...";
  }
  areYouSure();
  </script>
  
</head>

<body onbeforeunload="return areYouSure()">
<?php include_once "../include/intake.php"?>
<div id="attritionHolder" class="attrition centeredDiv"> 
  <p id="attritionInstructions" class="attrition"></p>
  <input required type="text" id="attritionAns" class="attrition" size="60" style="width:inherit; height:17px; font-size:15px; margin: 0 auto;" />
</div>
<div id="errorMessageHolder" class="error centeredDiv">
  <p id="mobileBrowserErrorMessage">You cannot access this test from a mobile browser. Please use a desktop computer to complete the task.</p>
  <p id="workerIDErrorMessage">You are ineligible for this task, since your worker ID has been recorded as participating in this task already. 
    Please return the HIT.</p>
</div>

<div id="instructionsHolder" class="instructions centeredDiv">
  <p id="instructions1" class="instructions">Test instructions!</p>
  <!-- <p id="errorInstructions" class="error instructions">Error instructions</p> -->
</div>

<div class="filler"> </div>
<div class="deckContainer task">
    <div class="imgContainer" id="leftDeck">
        <img id="leftDeckImage" src="../stimuli/deck_red.jpg" height="270px" width="200px"/>
        <div class="feedback" id="leftFeedback">100</div>
    </div>
    
    <div class="imgContainer" id="middleDeck">
        <img id="middleDeckImage" src="../stimuli/deck_black.jpg" height="270px" width="200px"/>
        <div class="feedback" id="middleFeedback">-50</div>
    </div>
    
    <div class="imgContainer" id="rightDeck">
         <img id="rightDeckImage" src="../stimuli/deck_blue.jpg" height="270px" width="200px"/>
         <div class="feedback" id="rightFeedback">-50</div>
    </div>
    
</div>
<div class="fixation task"> + </div>
<div class="break task"> Take a break </div>
<!-- <div id="nextButtonHolder" class="buttonHolder">
  <button id="nextButton">WELCOME</button>
</div> -->

<!-- </body> -->
<script type="text/javascript" src="../db/submit.js"></script>

<script type="text/javascript" src="../libraries/Timeout.js"></script>
<script type="text/javascript" src="../libraries/lodash.js"></script>
<script type="text/javascript" src="../libraries/seedrandom.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-git.js"></script>
<script type="text/javascript" src="../libraries/jquery.csv.js"></script>
<script type="text/javascript" src="../exp/fn.js"></script>
<script type="text/javascript" src="../exp/conf.js"></script>

<script>
  // show page when loaded 
  window.onload = function() {
    $(".loading").css({display: "none"});
    $(".consent").css({display: "block"});
    $(".buttonHolder").css({display: "block"});
  };
  
</script>
<script type="text/javascript">
    let feedbackLink = "https://belieflab.yale.edu/omnibus/eCRFs/feedback/tasks/prl.php?candidateId=<?php echo $candidateId?>&studyId=<?php echo $studyId?>";
    </script>


</body>

</html>

