<div class="screening" style="background-color:darkgray; text-align:center; margin:35px; vertical-align:middle">
<br>
<h1 id="hide" style="text-align:center;">Participant Intake</h1>
<!-- <input type="text" id="result"> -->
  <div id="intake">
    <p><b>Research Site:</b></p>
    <select name="facility" id="siteid">
        <option value="none">---</option>
        <option value="Maryland">UMBC</option>
        <option value="Northwestern">NU</option>
        <option value="Temple">Temple</option>
        <option value="Georgia">UGA</option>
        <option value="Yale">Yale</option>
        <option value="Emory">Emory</option>
        <option value="Vanderbilt">Vanderbilt</option>
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
    <p><b>Subject ID:</b></p>
    <input required id="subjectid" type="text" name="subjectid" minlength="5" maxlength="5">
    
    <!-- GUID -->
    <p><b>GUID:</b></p>
    <input required id="guid" type="text" name="guid" minlength="12" maxlength="12">
    <!-- <input required type="hidden" id="guid" name="guid" value="< ?php echo $guid ?>"> -->

    </form>
    <!-- <button onclick="submitIntake()">submit subjectid</button> -->
    <p><b>Date of Birth:</b></p>
    <!-- <p><b>Enter as MM/DD/YYYY</b></p> -->
    <!-- <p style="color:red">*must provide value</p> -->
    <input required id="dob" type="date">
    <!-- <form>
    <p><b>Age:</b></p>
    <input required id="age" type="text" name="currentage" plattern="\d*" minlength="1" maxlength="3">
    </form> -->
    <form>
    <p><strong>Sex at Birth:</strong></p>
    <label for="male">Male</label>
    <input type="radio" id="male" name="sex" value="male" onclick="validateSex(this.value)">
    <label for="female">Female</label>
    <input type="radio" id="female" name="sex" value="female" onclick="validateSex(this.value)">
    </form>
    <form>

<form>
    <!-- <label for="handedness"><b>Are you right or left handed?</b></label> -->
    <p><b>Dominant Hand:</b></p>
        <label for="right">Right</label>
        <input type="radio" name="handedness" id="rightHanded" value="rightHanded">

        <label for="left">Left</label>
        <input type="radio" name="handedness" id="leftHanded" value="leftHanded">

        <!-- <span class="checkmark"></span> -->

    <p><b>Before proceeding to the task, please confirm the following are true:</b></p>
    <label class="container">Screen brightness is up to 100% &nbsp&nbsp&nbsp&nbsp  
    <input type="checkbox" name="brightness" id="brightness" value="1"/>
    </label>
    <!-- <br>
    <label class="container">Headphones plugged in? &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp      
    <input type="checkbox" name="headphones" id="headphones" value="1"/>
    </label>
    <br>
    <label class="container">Headphone volume is set to 50% &nbsp&nbsp&nbsp  
    <input type="checkbox" name="volume" id="volume" value="1"/>
  </label> -->
  </form>
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
<button id="submitButton" class="loadMain" onclick="validateSite(), validateSubject(), validateGUID(), validateAge(), validateSex(), validateHandedness(), validateBrightness(), /*validateHeadphones(), validateVolume(),*/ submitIntake()" type="button">SUBMIT</button>
</div>
<div id="validation" style="display: none">
    <br>
    <form>
</form>
</div>
<div>

<div id="load" style="display: none">
<h3 id='pass'>All validation rules were passed successfully. Click to load the experiment.</h3>
<button id="nextButton" class="noCursor" onclick="startExperiment()">LOAD</button>
<!-- <p id="nextButton" style="display: none" >please make sure you are in a quiet place. When you are ready to begin, click 'START'</p> -->
<br>
</div>
<script type="text/javascript" src="../js/jquery-3.5.1.min.js"></script>
<script>$("button.loadMain").click(function(){
      $.getScript("../exp/rand.js");
      $.getScript("../code/card_task_01.js");
  }); </script>
<script>
</script>
