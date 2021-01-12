'use strict';

// jsPsych API for NDA variables

// function to store subject number for turk.js on submit
let workerId;

// declare handedness, assoc vars
let handedness;
let antihandedness;
let EasyKey_uCase;
let HardKey_uCase;

// assign date, assoc vars
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
let todayStandard = yyyy + '-' + mm + '-' + dd;

// these functions are called when db_connection === true (e.g. omnibus.local or omnibus.yale) && db_connection === true

function validateIntake() {
    let intake = document.getElementById("intake");
    let consent = document.getElementById("load");
    if (intake.style.display === "none") {
        intake.style.display = "block";
    } else {
        intake.style.display = "none";
        consent.style.display = "block";
    }
}

function validateHandedness() {
    if (document.getElementById("rightHanded").checked === false && document.getElementById("leftHanded").checked === false) {
        alert("Please select your dominant hand.");
    }
}

function validateBrightness() {
    if (document.getElementById("brightness").checked === false) {
        alert("Please confirm your screen brightness is 100%");
    }
}

// function validateHeadphones() {
//     if (document.getElementById("headphones").checked === false) {
//         alert("Please confirm your headphones are plugged in.");
//     }
// }

// function validateVolume() {
//     if (document.getElementById("volume").checked === false) {
//         alert("Please confirm your headphone volume is 50%");
//     }
// }

// these functions only run when db_connection === false (e.g. omnibus.foo does not exist on server)
// this is useful for development environments and running the task on a standalone web server with no omnibus integration

function validateSubject() {
    if (document.getElementById("subjectid").value !== '') {
        subjectID = subjectid.value;
    } else {
        alert("Please enter a valid subject id.");
    }
}

function validateSex() {
    if (document.getElementById("male").checked === true) {
        sexAtBirth = "M";
    } else if (document.getElementById("female").checked === true) {
        sexAtBirth = "F";
    } else {
        alert("Please select your sex assigned at birth.");
    }
}

function validateSite() {
    let siteID = document.getElementById("siteid");

    if (document.getElementById("siteid").value === 'none') {
        alert("Please select a valid research site.");
    }

    const zeroPad = (num, places) => String(num).padStart(places, '0');
    switch(siteID.options[siteID.selectedIndex].value){
        case "Maryland":
            siteNumber = 'Maryland';
            break;
        case "Northwestern":
            siteNumber = 'NU';
            break;
        case "Temple":
            siteNumber = 'Temple';
            break;
        case "Georgia":
            siteNumber = 'Georgia';
            break;
        case "Yale":
            siteNumber = 'Yale';
            break;
        case "Emory":
            siteNumber = 'Emory';
            break;
        default:
            siteNumber = zeroPad(0,2);
    }
}

function validateGUID() {
    if (document.getElementById("guid").value !== '') {
        GUID = guid.value;
    } else {
        alert("Please enter the GUID provided to you by the researcher.");
    }
}

function validateAge() {
    if (document.getElementById("dob").value !== '') {
        let DOB = dob.value;
        let DOByyyy = DOB.slice(0, 4);
        let DOBmm = DOB.slice(5, 7);
        // let DOBdd = DOB.slice(8, 10);
        let ageInMonths = ((yyyy * 12) - (DOByyyy * 12) + (mm - DOBmm));
        ageAtAssessment = parseInt(ageInMonths);
    } else {
        alert("Please enter your date of birth.");
    }

}

// this function runs when the submit button is pressed

function submitIntake() {

    let rightHandedness = document.getElementById("rightHanded").checked;
    let leftHandedness = document.getElementById("leftHanded").checked;


    if (rightHandedness === true) {
        handedness = "right";
        antihandedness = "left";
    } else if (leftHandedness === true) {
        handedness = "left";
        antihandedness = "right";
    }

    if (document.getElementById("brightness").checked === false /*|| document.getElementById("headphones").checked === false || document.getElementById("volume").checked === false*/) {
        // do nothing
    } else {
        // alert("your subjectid is " + subjectID);
        workerId = parseInt(subjectID);
        validateIntake();
    }
}
