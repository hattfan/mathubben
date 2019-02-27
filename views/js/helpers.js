document.querySelector("#refresh-box").addEventListener("click", function() {
  window.location.reload(false); 

});

function resetAll(){
  d3.select("#map").selectAll("*").remove();
  d3.select("#line").selectAll("*").remove();
  d3.select("#kommun-map").selectAll("*").remove();
  d3.select("#pie").selectAll("*").remove();
}