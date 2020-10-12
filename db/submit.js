// function to store subject number on submit
let workerId;

// instructions will change based on reward condition
let instr2;
let reward;

// let sexMale;
// let sexFemale;
// let age;
let ageAtAssessment;
// let age;
let sexAtBirth;
// let currentAge;
// let handedness;
// let antihandedness;
// let EasyKey_uCase;
// let HardKey_uCase;
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

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

function sexFinder() {
    // document.getElementById("sex").value = sex;
    if (document.getElementById("male").checked === true) {
        sexAtBirth = "M";
    } else if (document.getElementById("female").checked === true) {
        sexAtBirth = "F";
    }
}

function ageFinder() {
    // document.getElementById("sex").value = sex;
    if (document.getElementById("age").value !== '') {
        let currentAge = document.getElementById("age").value;
        ageAtAssessment = parseInt(currentAge);
    } else {
        alert("please enter your current age");

    }
}



function submitIntake() {

    let subjectID = document.getElementById("subjectid").value;
    let siteID = document.getElementById("siteid");
    

    switch(siteID.options[siteID.selectedIndex].value){
        case "Maryland":
            siteNumber = "01";
            break;
        case "Northwestern":
            siteNumber = "02";
            break;
        case "Temple":
            siteNumber = "03";
            break;
        case "Georgia":
            siteNumber = "04";
            break;
        case "Yale":
            siteNumber = "05";
            break;
        case "Emory":
            siteNumber = "06";
            break;
        default:
            siteNumber = "00";
    }

    // if(siteID.options[siteID.selectedIndex].value == "Yale") {
    //     siteNumber = "10"
    // }

    if(subjectID == "") {
        alert("Please enter a valid subjectid")
    } else {
        alert("your subjectid is " + siteNumber + subjectID);
        workerId = parseInt(siteNumber + subjectID);
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
