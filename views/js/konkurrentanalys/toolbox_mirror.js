document.getElementById("male1").onclick=clickMale;
document.getElementById("male2").onclick=clickMale;
document.getElementById("female1").onclick=clickFemale;
document.getElementById("female2").onclick=clickFemale;

function clickMale(){
  document.getElementById("male1").checked=true;
  document.getElementById("male2").checked=true;
}
function clickFemale(){
  document.getElementById("female1").checked=true;
  document.getElementById("female2").checked=true;
}