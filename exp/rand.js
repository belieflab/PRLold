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