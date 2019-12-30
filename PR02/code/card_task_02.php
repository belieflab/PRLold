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
  <link rel="stylesheet" type="text/css" href="card_task_02.css">
  <!-- <title>Probabalistic Reversal Task</title> -->
  <title>Mechanical Turk HIT</title>
  
</head>

<body>
  <!-- Loading screen -->
  <div class="loading centeredDiv">
    <h1 class="loading">Loading...</h1>
  </div>

  <!-- Consent -->
  <div id="consentHolder" class="consent centeredDiv">
  <h3 id="consentPreamble" class="consent">In order for us to conduct this test online, we need to include the standard consent form below. <br /> <br /> </h3>
  <div id="consentForm" class="consent consent-box"> 
    <h2 id="consentHeading" class="consent">
      CONSENT FOR PARTICIPATION IN A RESERCH PROJECT 200 FR. 1 (2016-2)
      <br>
      YALE UNIVERSITY SCHOOL OF MEDICINE CONNECTICUT MENTAL HEALTH CENTER
    </h2> 

    <h2>
      
    </h2>
    <p id="consentInstructions" class="consent">
      <b>XXX: CHECK IF IRB IS OKAY WITH NEW CONSENT FORM</b>
      <b>Study Title:</b> Beliefs and Personality Traits
      <br><br>
      <b>Principal Investigator:</b> Philip R. Corlett, PhD
      <br><br>
      <b>Funding Source:</b> department funds
      <br><br>
      <u><b>Invitation to Participate and Description of Project</b></u>
      <br>
      You are invited to participate in a research study that concerns psychological processes related to beliefs and personality traits. Due to the nature of psychology experiments, we cannot explain the precise purpose of the experiment until after the session is over. Afterwards, the experimenter will be happy to answer any questions you might have about the purpose of the study.
      <br><br>
      <u><b>Description of Procedures</b></u>
      <br>
      If you agree to participate in this study, you will be required  to (1) play a computer game using the computer mouse or keys on your keyboard and (2) answer simple questions about your demographics, health (including mental health), beliefs, and personality through an interactive web survey. You will never be asked for personally identifiable information such as your name, address, or date of birth. However, you will need to provide the email address associated with your Paypal account in order to receive payment for your participation.
      <br>
      The experiment is designed to take approximately 1 hour. You will have up to six hours to complete the experiment and submit codes for payment. 
      <br><br>
      <u><b>Risks and Inconveniences</b></u>
      <br>
      There are little to no risks associated with this study. Some individuals may experience mild boredom. 
      <br><br>
      <u><b>Economic Considerations</b></u>
      <br>
      You will receive the reward specified in the recruitment advertisement for completing both the game and the questionnaire. Payment for completion of the task on this web page is $6.00 with a $2.00 bonus to individuals who score in the top 25% on the card game. Upon finishing the game and submitting the questionnaire, you will receive code numbers. Please record these two code numbers and submit them for payment. 
      <br><br>
      <u><b>Confidentiality</b></u>
      <br>
      We will never ask for your name, birth date, or any other identifying piece of information. Your data will be pooled with those of others, and your responses will be completely anonymous. We will keep this data indefinitely for possible use in scientific publications and presentations. 
      <br>
      The researcher will not know your name, and no identifying information will be connected to your survey answers in any way. The survey is therefore anonymous. However, the researcher needs to be able to see your Paypal-associated email address in order to pay you, and in some cases this could be searched and tied to your identity. For this reason, though the researcher will not be looking at anyone’s emails or contacting you personally, the fact of your participation in the research (as opposed to your actual survey responses) is technically considered “confidential” rather than truly anonymous.
      <br><br>
      <u><b>Voluntary Participation</b></u>
      <br>
      Your participation in this study is completely voluntary. You are free to decline to participate or to end participation at any time by simply closing your browser window. However, please note that you must submit both the computer game and questionnaire in order to receive payment. You may decline answering any question by selecting the designated alternative response (e.g., “I do not wish to answer”). Declining questions will not affect payment.
      <br><br>
      <u><b>Questions or Concerns</b></u>
      <br>
      If you have any questions or concerns regarding the experiment, you may contact us here at the lab by emailing BLAMLabRequester@gmail.com If you have general questions about your rights as a research participant, you may contact the Yale University Human Investigation Committee at 203-785-4688 or human.subjects@yale.edu (HSC# 2000022111 XXX).

    </p>
  </div>


</div>

<!-- Reminder about Paypal email -->
<div id="emailInstructionsHolder" class="emailReminder centeredDiv"> 
  <p id="emailInstructions" class="emailReminder">Reminder: You will only be paid for your participation if you were explicitly recruited by the experimenter, and if you provide the same valid Paypal-linked email address that the experimenter originally recruited you through. <b>If you use a different email address, you will not be paid!</b> Click "Next" after you have entered your email below.</p>
  <label id="emailQ" class="emailReminder">What is your Paypal email?</label>
  <input required type="text" id="emailAns" name="emailAns" class="emailReminder" size="40" style="width:300px; height:17px; font-size:15px;" />
</div>


<!-- Attrition instructions -->
<div id="attritionHolder" class="attrition centeredDiv"> 
  <p id="attritionInstructions" class="attrition"></p>
  <input required type="text" id="attritionAns" class="attrition" size="60" style="width:inherit; height:17px; font-size:15px; margin: 0 auto;" />
</div>

<!-- Error message -->
<div id="errorMessageHolder" class="error centeredDiv">
  <p id="mobileBrowserErrorMessage">You cannot access this test from a mobile browser. Please use a desktop computer to complete the task.</p>
  <p id="emailErrorMessage">You are ineligible for payment on this task, since your email is either not on the list of approved emails, or has been recorded as participating in this task already. </p>
</div>

<!-- Main instructions -->
<div id="instructionsHolder" class="instructions centeredDiv">
  <p id="instructions1" class="instructions">Test instructions!</p>
</div>

<!-- Task -->
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

<!-- Debriefing survey -->
<div id="debriefingSurveyHolder" class="survey centeredDiv debriefing">
  <p id="debriefingIntro" class="debriefing"></p>
<!--   <label id="emailQ" class="debriefing">What is your Paypal email? Note that you will only be paid if your 
  email is on our list of already-approved emails!</label>
    <input required type="text" name="emailAns" class="debriefing response" size="40" style="width:300px; height:17px; font-size:15px;" /> -->
  <label id="interruptionQ" class="debriefing">Did you interrupt your completion of the survey in any way (e.g. by switching to other windows or tabs on your computer, or by refreshing the task page)?  (Your work will still be accepted even if you answer "Yes" here. Please be honest! Thanks!)</label>
    <select required id="interruptionAns" name="interruptionAns" class="debriefing response">
      <option value="">Select here</option>
      <option value="Yes">Yes, I did.</option>
      <option value="No">No, I did not.</option>
    </select>
  <label id="issues" class="debriefing">Was any part of the procedure unclear? Did you have any problems completing the task? (Your work will be accepted regardless of your answer. Please be honest! Thanks!</label>
    <input required type="text" name="comments" class="debriefing response" size="40" style="width:300px; height:17px; font-size:15px;" />
  <label id="anyStrategies" class="debriefing">Did you use any particular strategies, or is there anything else you can tell us about how you did the task? Please answer in one or two sentences.</label>
    <input required type="text" name="surveyThoughts" size="40" class="debriefing response" style="width:300px; height:17px; font-size:15px;" />
  <label id="estimatedPerformanceQ" class="debriefing">How well do you think you did on the task? Please answer by entering a number on a scale from 1 to 7, where 1 = "very poor" and 7 = "perfect"</label>
    <input required type="number" maxlength="1" name="estimatedPerformanceAns" class="debriefing response" size="40" style="width:300px; height:17px; font-size:15px;" />
</div>

<div id="nextButtonHolder" class="buttonHolder">
  <button id="nextButton">CONSENT/NEXT</button>
</div>

<!-- Scripts -->
<script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/Timeout.js"></script>
<script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/lodash.js"></script>
<script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/seedrandom.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-git.js"></script>
<script src="https://d3js.org/d3.v3.min.js"></script>
<script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/jquery.csv.js"></script>
<script type="text/javascript" src="card_task_02.js"></script>
<script>
  // show page when loaded 
  window.onload = function() {
    $(".loading").css({display: "none"});
    $(".consent").css({display: "block"});
    $(".buttonHolder").css({display: "block"});
  };
</script>


</body>

</html>

