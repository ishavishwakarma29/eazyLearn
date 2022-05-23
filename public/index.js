var questionNum = 2;

$(document).ready(function (){
  for (let index = 1;index<= 60; index++) { 
    const hour = "<option>"+index+"</option>";
    document.getElementById("hours").innerHTML += hour;
    const minute = "<option>"+index+"</option>";
    document.getElementById("minutes").innerHTML += minute;
    const second = "<option>"+index+"</option>";
    document.getElementById("seconds").innerHTML += second;
  }
});

function addCode() {
  document.getElementById("add_to_me").innerHTML += 
  " <textarea class='que' type='text' name='que"+questionNum+"'> Question "+questionNum+" </textarea>"
  document.getElementById("add_to_me").innerHTML += 
  "<div class='options-cont'>";
  document.getElementById("add_to_me").innerHTML += 
        "<p>1.<input class='option' type='text' placeholder='option 1' name='"+questionNum+"_1'/></p>";
  document.getElementById("add_to_me").innerHTML +=
        "<p>2.<input class='option' type='text' placeholder='option 2' name='"+questionNum+"_2'/></p>";
  document.getElementById("add_to_me").innerHTML += 
      "<p>3.<input class='option' type='text' placeholder='option 3' name='"+questionNum+"_3'/></p>"
  document.getElementById("add_to_me").innerHTML += 
        "<p>4.<input class='option' type='text' placeholder='option 4' name='"+questionNum+"_4'/></p></div>";
  document.getElementById("add_to_me").innerHTML +=
  "<p class='correctLbl'>Select correct option:<select name='' id='' class='correct'><option value='' selected id='"+questionNum+"_opt_1'>1</option><option value='' id='"+questionNum+"_opt_2'>2</option><option value='' id='"+questionNum+"_opt_3'>3</option><option value='' id='"+questionNum+"_opt_4'>4</option></select></p>";
  questionNum++;
}