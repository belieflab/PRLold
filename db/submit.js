// function to store subject number on submit
let workerId;

let handedness;
let antihandedness;
let EasyKey_uCase;
let HardKey_uCase;

let ageAtAssessment;

let sexAtBirth;

let GUID;

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
todayStandard = yyyy + '-' + mm + '-' + dd;

function ageFinder(){
    if (document.getElementById("dob").value !== '') {
        let DOB = dob.value;
        let DOByyyy = DOB.slice(0,4);
        let DOBmm = DOB.slice(5,7);
        // let DOBdd = DOB.slice(8,10);
        let ageInMonths = ((yyyy*12)-(DOByyyy*12)+(mm-DOBmm));
        ageAtAssessment = parseInt(ageInMonths);
    } else {
        alert("Please enter your date of birth.");
    }

}

function guidBuilder(){
    if (document.getElementById("guid").value !== '') {
        GUID = guid.value;
    } else {
        alert("ERROR: No GUID record in database! \nAssessor: Please generate GUID and refresh this page before proceeding.");
    }

}

function validateIntake() {
    let intake = document.getElementById("intake");
    let consent = document.getElementById("nextButton");
    if (intake.style.display === "none") {
      intake.style.display = "block";
    } else {
      intake.style.display = "none";
      consent.style.display = "block";
    }
  }

  function validateSite() {
    // document.getElementById("sex").value = sex;
    if (document.getElementById("siteid").value === 'none') {
        alert("Please select a valid research site.");

    }
}

function validateBrightness() {
    // document.getElementById("sex").value = sex;
    if (document.getElementById("brightness").value == '0') {
        alert("Please confirm you have turned your screen brightness up to 100%");

    }
}

function sexFinder() {
    // document.getElementById("sex").value = sex;
    if (document.getElementById("male").checked === true) {
        sexAtBirth = "M";
    } else if (document.getElementById("female").checked === true) {
        sexAtBirth = "F";
    } 
}

function validateSex() {
    if (document.getElementById("male").checked === false && document.getElementById("female").checked === false ) {
        alert("Please enter the sex you were assigned at birth.");
    }
}

function validateHandedness() {
    if (document.getElementById("rightHanded").checked === false && document.getElementById("leftHanded").checked === false ) {
        alert("Please select your dominant hand.");
    }
}

function submitIntake() {
    let subjectID = document.getElementById("subjectid").value;
    let rightHandedness = document.getElementById("rightHanded").checked;
    let leftHandedness = document.getElementById("leftHanded").checked;
    let siteID = document.getElementById("siteid");

    if (rightHandedness === true) {
        handedness = "right";
    } else if (leftHandedness === true) {
        handedness = "left";
    }

    const zeroPad = (num, places) => String(num).padStart(places, '0');
    switch(siteID.options[siteID.selectedIndex].value){
        case "Maryland":
            // siteNumber = zeroPad(1,2);
            siteNumber = 1;
            break;
        case "Northwestern":
            // siteNumber = zeroPad(2,2);
            siteNumber = 2;
            break;
        case "Temple":
            // siteNumber = zeroPad(3,2);
            siteNumber = 3;
            break;
        case "Georgia":
            // siteNumber = zeroPad(4,2);
            siteNumber = 4;
            break;
        case "Yale":
            // siteNumber = zeroPad(5,2);
            siteNumber = 5;
            break;
        case "Emory":
            // siteNumber = zeroPad(6,2);
            siteNumber = 6;
            break;
        default:
            // siteNumber = zeroPad(0,2);
    }

  

    if(subjectID == "") {
        alert("Please enter a valid SubjectID.")
    } else {
        // alert("your subjectid is " + siteNumber + subjectID);
        workerId = parseInt(subjectID);
        switch(workerId%2){
            case 0:
              reward = 'money';
              instr2 = "In this study, you will play a card game, and your goal " +
                        "is to win as many points as you can." +
                        "<br /><br />" +
                        "If your score lands you in the top " + percentile + "% of participants, you will " +
                        "get an extra $" + bonus + " bonus, so please do your best!" +
                        "<br /><br />" +
                        "Please press the zero (0) key to continue.";
              break;
            case 1:
              reward = 'nothing';
              instr2 = "In this study, you will play a card game, and your goal " +
                        "is to win as many points as you can." +
                        "<br /><br />" +
                        "Please press the zero (0) key to continue.";
              break;
        }
        validateIntake();
    }

}

