<div class="screening" style="background-color:lightgray; text-align:center; margin:35px; vertical-align:middle">
<br>
<h1 id ="hide" style="text-align:center;">CAPR Participant Intake</h1>
<!-- <input type="text" id="result"> -->
  <div id="intake">
    <p><b>Select your Research Site:</b></p>
    <select name="facility" id="siteid">
        <option value="">---</option>
        <option value="Maryland">Maryland</option>
        <option value="Northwestern">Northwestern</option>
        <option value="Temple">Temple</option>
        <option value="Georgia">Georgia</option>
        <option value="Yale">Yale</option>
        <option value="Emory">Emory</option>
    </select>
    <label for="facility"></label>
    <!-- <form name="myForm" action="/action_page.php" onsubmit="return validateForm()" method="post">
    Name: <input type="text" name="fname">
    <input type="submit" value="Submit">
    </form> -->
    <!-- <form action="/action_page.php" method="post">
        <input type="text" name="fname" required>
        <input type="submit" value="Submit">
    </form> -->
    <form action="<?php echo SIGNUP_VIEW ?>/post/intakeadd.php" method="post">
    <p><b>Subject ID Number:</b></p>
    <input required id="subjectid" type="number" name="consent_id">
</form>
    <!-- <button onclick="submitIntake()">submit subjectid</button> -->
    <!-- <p><b>Participant DOB</b></p>
    <p><b>Enter as MM/DD/YYYY</b></p>
    <p style="color:red">*must provide value</p>
    <input type="date">
    <form> -->
    <!-- <input type="checkbox"><p>Left</p> -->
  <form action="<?php echo SIGNUP_VIEW ?>/post/intakeadd.php" method="post">
    <p><b>Age:</b></p>
    <input required id="age" type="number" name="currentage">
</form>
<form>
  <p><strong>Please select your sex assigned at birth:</strong></p>
  <label for="male">Male</label>
  <input type="radio" id="male" name="sex" value="male" onclick="sexFinder(this.value)">
  <label for="female">Female</label>
  <input type="radio" id="female" name="sex" value="female" onclick="sexFinder(this.value)">
  </form>
<form>
    <p><b>Before proceeding to the task, please confirm that the following are true:</b></p>
    <label class="container">Screen brightness is up to 100% &nbsp&nbsp&nbsp&nbsp   
    <input type="checkbox">
    <br>
  </label>
  
  <!-- <label class="container">Headphones plugged in? &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp               
    <input type="checkbox"> 
    <br>
  </label>

  <label class="container">Headphones volume at 50%? &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp          
    <input type="checkbox"> 
    <br>
  </label>
</form>
<br> -->
<button id="submitButton" class="loadMain" onclick="submitIntake(), ageFinder()" type="button">submit</button>
</div>
<div id="validation" style="display: none">
    <br>
    <form>
</form>
</div>
<div>
<button id="nextButton" style="display: none" onclick="startExperiment()">START</button>
<!-- <p id="nextButton" style="display: none" >please make sure you are in a quiet place. When you are ready to begin, click 'START'</p>
<br> -->
</div>
<script type="text/javascript" src="//code.jquery.com/jquery-git.js"></script>
<script>$("button.loadMain").click(function(){
    // $.getScript("exp/conf.js");
    // $.getScript("exp/var.js");
    // setTimeout(1000);
    // $.getScript("exp/timeline.js");
    // setTimeout(1000);
    $.getScript("../code/card_task_01.js");
    // $.load("include/consent.php");
  }); </script>
<script>
</script>
<!-- <label class="container">One
  <input type="checkbox" checked="checked">
  <span class="checkmark"></span>
</label>
<label class="container">Two
  <input type="checkbox">
  <span class="checkmark"></span>
</label>
<label class="container">Three
  <input type="checkbox">
  <span class="checkmark"></span>
</label>
<label class="container">Four
  <input type="checkbox">
  <span class="checkmark"></span>
</label> -->