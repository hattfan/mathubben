
function addTriggerClickListeners(){
    // d3.select("#map").selectAll("*").remove();
    d3.select("#line").selectAll("*").remove();
    var btns = document.querySelectorAll('.trigger-button');
    btns.forEach(btn => 
        btn.addEventListener('click', function (e) {
            // console.log(this)
            document.querySelector("#artikel").innerText = '';
            document.querySelector("#artikel").dataset.key = this.dataset.key;
            activationButton = this;
            modal.open(this);
        })
    )
}