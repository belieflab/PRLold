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
  <title>Mechanical Turk HIT</title>
  
</head>

<body>
  <div id="consentHolder" class="consent centeredDiv">
  <h3 id="consentPreamble" class="consent">In order for us to conduct this test online, we need to include the standard consent form below. <br /> <br /> </h3>
  <div id="consentForm" class="consent consent-box"> 
    <h1 id="consentHeading" class="consent">Informed Consent Form</h1> 
    <h2 id="consentParticipantType" class="consent">(For paid, online participants)</h2>
    <p id="consentInstructions" class="consent">
      This research project concerns psychological processes. The experiment will ask you to answer simple questions
      and/or perform simple tasks by interacting with a Web survey. Your data will be pooled with those of others,
      and your responses will be completely anonymous. However, we will keep the data obtained for all subjects indefinitely,
      for possible use in other scientific publications. <br /> <br />

      The experiment will take only a few minutes and carries no risks.  <br /> <br />

      Due to the nature of psychology experiments, we cannot explain the precise purpose of
      the experiment until after the session is over. However, afterwards the experimenter will
      be happy to answer any questions you might have about the procedure. You will receive
      the reward specified on the Mechanical-Turk HIT for participating. Your participation is
      completely voluntary. You are free to decline to participate to end participation at any
      time for any reason, or to refuse to answer any individual question without penalty or loss
      of compensation.  <br /> <br />

      If you have any questions or concerns regarding this experiment, you may contact us here
      at the lab. If you have general questions about your rights as a research participant, you
      may contact the Yale University Human Subjects Committee (HSC# 1312013114). <br /> <br />


      Yale Univ. Human Subjects Com.<br />
      55 College St. (P.O. Box 208010)<br />
      New Haven, CT 06520-8010<br />
      203-785-4688<br />
      human.subjects@yale.edu <br />
      <br />
      <br />

      <b>By clicking the "Consent", "Next", and/or relevant radio buttons below,
        you acknowledge that you have read and understood the above and agree to participate.</b>
      <br /> <br />

      You can also contact the experimenter if you have any questions:<br />
      Stefan Uddenberg, Graduate Student <br />
      SSS 312 <br />
      stefan.uddenberg@yale.edu
    </p>
  </div>


</div>
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
        <img id="leftDeckImage" src="https://perceptionexperiments.net/SDU/PR/PR01/stimuli/deck_red.jpg" height="270px" width="200px"/>
        <div class="feedback" id="leftFeedback">100</div>
    </div>
    
    <div class="imgContainer" id="middleDeck">
        <img id="middleDeckImage" src="https://perceptionexperiments.net/SDU/PR/PR01/stimuli/deck_black.jpg" height="270px" width="200px"/>
        <div class="feedback" id="middleFeedback">-50</div>
    </div>
    
    <div class="imgContainer" id="rightDeck">
         <img id="rightDeckImage" src="https://perceptionexperiments.net/SDU/PR/PR01/stimuli/deck_blue.jpg" height="270px" width="200px"/>
         <div class="feedback" id="rightFeedback">-50</div>
    </div>
    
</div>
<div class="fixation task"> + </div>
<div class="break task"> Take a break </div>
<div id="nextButtonHolder" class="buttonHolder">
  <button id="nextButton">CONSENT/NEXT</button>
</div>

<!-- </body> -->

<script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/Timeout.js"></script>
<script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/lodash.js"></script>
<script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/seedrandom.js"></script>
<!-- <script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/numjs.min.js"></script> -->
<script type="text/javascript" src="//code.jquery.com/jquery-git.js"></script>
<script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/jquery.csv.js"></script>
<script type="text/javascript" src="card_task_01.js"></script>

</body>

</html>

