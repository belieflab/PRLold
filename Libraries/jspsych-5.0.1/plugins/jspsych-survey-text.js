/**
 * jspsych-survey-text
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */

 /*
  Customized by Stefan Uddenberg — 01/28/2016

  FEATURE LOG:
    - Can specify text field IDs (makes text validation possible) — trial.field_IDs
    - Can specify function to run on button press — trial.on_submit
    - Using the above, can specify text validation (allowed_to_continue is a variable saying whether the expt should
        continue based on the current text function to run — I specify it in other validation programs)
    
 */


jsPsych.plugins['survey-text'] = (function() {
  
  var plugin = {};

  plugin.trial = function(display_element, trial) {

    trial.preamble = typeof trial.preamble == 'undefined' ? "" : trial.preamble;

    // EXPERIMENTAL
    trial.required = typeof trial.required == 'undefined' ? null : trial.required;

    var required = "";

    if (trial.required == true) {
      required = "required";
    };


    if (typeof trial.rows == 'undefined') {
      trial.rows = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.rows.push(1);
      }
    }
    if (typeof trial.columns == 'undefined') {
      trial.columns = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.columns.push(40);
      }
    }

    //**************************************************************************
    // CUSTOM FIELDS

    var default_continuation = false;
    if (typeof(trial.allowed_to_continue)=='undefined') {
      trial.allowed_to_continue = default_continuation;
    }; 
    allowed_to_continue = trial.allowed_to_continue; // set to true by default   

    if (typeof trial.field_IDs == 'undefined') {
      trial.field_IDs = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.field_IDs.push(" ");
      }
    }

    if (typeof trial.on_click == 'undefined') {
      trial.on_click = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.on_click.push(" ");
      }
    }

    if (typeof trial.on_submit == 'undefined') {
      trial.on_submit = " ";
    }

    //**************************************************************************
    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    // show preamble text
    display_element.append($('<div>', {
      "id": 'jspsych-survey-text-preamble',
      "class": 'jspsych-survey-text-preamble'
    }));

    $('#jspsych-survey-text-preamble').html(trial.preamble);

    // add questions
    for (var i = 0; i < trial.questions.length; i++) {
      // create div
      display_element.append($('<div>', {
        "id": 'jspsych-survey-text-' + i,
        "class": 'jspsych-survey-text-question'
      }));

      // add question text
      $("#jspsych-survey-text-" + i).append('<p class="jspsych-survey-text">' + trial.questions[i] + '</p>');

      // add text box
      $("#jspsych-survey-text-" + i).append('<textarea name="#jspsych-survey-text-response-' + i + '" cols="' + trial.columns[i] + '" rows="' + trial.rows[i] + '"' + required + ' id="' + trial.field_IDs[i] + '" onClick="' + trial.on_click[i] + '"></textarea>');
    }

    // add submit button
    display_element.append($('<button>', {
      'id': 'jspsych-survey-text-next',
      'class': 'jspsych-btn jspsych-survey-text',
      'onClick': trial.on_submit
    }));
    $("#jspsych-survey-text-next").html('Submit Answers');
    $("#jspsych-survey-text-next").click(function() {

    if (allowed_to_continue==true) {
      // measure response time
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      // create object to hold responses
      var question_data = {};
      $("div.jspsych-survey-text-question").each(function(index) {
        var id = "Q" + index;
        var val = $(this).children('textarea').val();
        var obje = {};
        obje[id] = val;
        $.extend(question_data, obje);
      });

      // save data
      var trialdata = {
        "rt": response_time,
        "responses": JSON.stringify(question_data)
      };

      display_element.html('');

      // next trial
      jsPsych.finishTrial(trialdata);
      allowed_to_continue = default_continuation; // reset this to the default
    };
    
    });
    

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
