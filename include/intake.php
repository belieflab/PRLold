<div class="screening" style="background-color:darkgray; text-align:center; margin:35px; vertical-align:middle">
<br>
<h1 id="hide" style="text-align:center;">CAPR Participant Intake</h1>
<!-- <input type="text" id="result"> -->
  <div id="intake">
    <p><b>Select your Research Site:</b></p>
    <select name="facility" id="siteid">
        <option value="none">---</option>
        <option value="Maryland">UMBC</option>
        <option value="Northwestern">NU</option>
        <option value="Temple">Temple</option>
        <option value="Georgia">UGA</option>
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
    <p><b>CAPR ID:</b></p>
    <input required id="subjectid" type="text" name="consent_id" plattern="\d*" minlength="5" maxlength="5">
    
    <!-- GUID -->
    <input required type="hidden" id="guid" name="guid" value="<?php echo $guid ?>">

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
    <p><strong>Please select your sex assigned at birth:</strong></p>
    <label for="male">Male</label>
    <input type="radio" id="male" name="sex" value="male" onclick="sexFinder(this.value)">
    <label for="female">Female</label>
    <input type="radio" id="female" name="sex" value="female" onclick="sexFinder(this.value)">
    </form>
    <form>

<form>
    <!-- <label for="handedness"><b>Are you right or left handed?</b></label> -->
    <p><b>Which is your dominant hand?</b></p>
        <label for="right">Right</label>
        <input type="radio" name="handedness" id="rightHanded" value="rightHanded">

        <label for="left">Left</label>
        <input type="radio" name="handedness" id="leftHanded" value="leftHanded">

        <!-- <span class="checkmark"></span> -->
  </form>
    <p><b>Before proceeding to the task, please confirm the following are true:</b></p>
    <label class="container">Screen brightness is up to 100% &nbsp&nbsp&nbsp&nbsp  
    <input type="hidden" name="brightness" id="brightness" value="0" />
    <input type="checkbox" name="brightness" id="brightness" value="1"/>
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
<button id="submitButton" class="loadMain" onclick="validateSite(), submitIntake(), guidBuilder(), ageFinder(), validateSex(), validateHandedness(), validateBrightness()" type="button">submit</button>
</div>
<div id="validation" style="display: none">
    <br>
    <form>
</form>
</div>
<div>
<button id="nextButton" class="noCursor" style="display: none" onclick="startExperiment()">START</button>
<!-- <p id="nextButton" style="display: none" >please make sure you are in a quiet place. When you are ready to begin, click 'START'</p> -->
<br>
</div>
<script type="text/javascript" src="//code.jquery.com/jquery-git.js"></script>
<script>$("button.loadMain").click(function(){
      $.getScript("../code/card_task_01.js");
  }); </script>
<script>

</script>
