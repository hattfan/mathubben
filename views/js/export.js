var databasBtn = document.getElementById("varugrupp");
// databasBtn.onclick = dataFetch();
document.getElementById("renderGraph").addEventListener("click", function() { dataFetch() }, false)

databasVal = "dashtest";

dataFetch();

function dataFetch(){
databasVal = databasBtn.options[databasBtn.selectedIndex].value;
var routeRequest = ('http://localhost:3030/databaser/' + databasVal);
}