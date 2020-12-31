<div class="screening" style="background-color:darkgray; text-align:center; margin:35px; vertical-align:middle">
<br>
<h1 id="hide" style="text-align:center;">CAPR Participant Intake</h1>
<!-- <input type="text" id="result"> -->
  <div id="intake">
    

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
<button id="submitButton" class="loadMain" onclick="submitIntake(), validateHandedness(), validateBrightness()" type="button">submit</button>
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
