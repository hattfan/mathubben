// instanciate new modal
var activationButton;
var actualSelection = {}
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function () {
        // console.log('modal open');
    },
    onClose: function () {
        // console.log('modal closed');
        document.querySelector(".ok-btn").style.display = "none"
    },
    beforeClose: function () {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
});

{/* <div style="display:flex">
            <p class="buttonSelection" style="cursor: pointer; color: white; padding: 10px; border-radius: 5px; background: blue; margin:3px" data-key="MENIGO FOG - MENY545">Banan EKO</p>
            <p class="buttonSelection" style="cursor: pointer; color: white; padding: 10px; border-radius: 5px; background: blue; margin:3px" data-key="Arla Ko - 7180">Mellanmjölk 1,5% KRAV</p>
            <p class="buttonSelection" style="cursor: pointer; color: white; padding: 10px; border-radius: 5px; background: blue; margin:3px" data-key="Brakes - 900112">Gouda 30% skiv EKO</p>
            <p class="buttonSelection" style="cursor: pointer; color: white; padding: 10px; border-radius: 5px; background: blue; margin:3px" data-key="Felix FriFrån - 8859">Köttbullar nöt 12g KRAV</p>
            <p class="buttonSelection" style="cursor: pointer; color: white; padding: 10px; border-radius: 5px; background: blue; margin:3px" data-key="MENIGO FOG - 729459">Banan Rättvise EKO</p>
        </div> */}

// set content
modal.setContent(
    `
    <h1>Välj produkt att undersöka</h1>
    <hr></hr>
    <div class="search-container">

        <div class="sök-box" id="standard-box">
            <label for="produkt">Sök efter artikel</label>
            <br>
            <div id="scrollable-dropdown-menu">
                <input id="artikel" class="typeahead" type="text" placeholder="Sök efter artikel"><br>
                <small> <strong>Artiklar i demo-versionen</strong><br>
                Nötfärs 10% SE KRAV<br>
                Köttbullar nöt 12g KRAV<br>
                Nötfärs 10% vackad<br>
                Torskfile bfr MSC<br>
                Kycklinglårfile<br>
                </small>
            </div>

        </div>
        
        <div class="filter-container">
            <div class="sök-box" id="filter-box">
                <label for="filter-box">Filtrera efter leverantör</label>
                <br>
            <div id="scrollable-dropdown-menu">
                <input id="leverantör" class="typeahead" type="text" placeholder="Leverantör">
            </div>
            </div>
            <div class="spinner"></div>
            <div id="produkt-select">
                <label for="filter-box">Välj produkt</label>
                <br>
                <select onchange="selectionHandler()" id="produkt-options" class="typeahead" style="padding:13px 12px">
                    <option></option>
                </select>
            </div>
        </div>
        <hr>
    </div>
    <button id="filter-btn" class="tingle-btn">Filtrera efter leverantör</button>
    `
);



// add a button
modal.addFooterBtn('Ok', 'tingle-btn tingle-btn--primary ok-btn', function () {

    // document.querySelector(".trigger-button").innerText = document.querySelector("#artikel").value
    // here goes some logic
    // document.querySelector(`#product-small-name-${activationButton.dataset.key}`).innerText = (`${actualSelection['Benamning']}`)
    // document.querySelector(`#product-small-fabrikat-${activationButton.dataset.key}`).innerText = (`${actualSelection['Fabrikat']}`)

    activationButton.innerHTML = `<strong>${actualSelection['Benamning']}</strong>
                                    <br> 
                                <small>${actualSelection['Fabrikat']}</small>`;
    activationButton.value = actualSelection['LevArtNr'];
    document.querySelector("#artikel").value = "";
    resetModalSettings();
    // reDrawGraphs();
    handleInputs();
    modal.close();
});

// add another button
modal.addFooterBtn('Avbryt', 'tingle-btn tingle-btn--danger', function () {
    // here goes some logic
    document.querySelector("#artikel").value = "";
    resetModalSettings();
    modal.close();
});

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

document.querySelector(".ok-btn").style.display = "none"
//!Tingleselectors
var filterBox = document.querySelector('.filter-container');
var standardBox = document.querySelector('#standard-box');
var filterButton = document.querySelector('#filter-btn');

var buttonFlag = true;
document.querySelector('#filter-btn').addEventListener("click", function() {
    filterButtonClick()
})

function filterButtonClick(){
    
    if(buttonFlag){
        filterBox.style.display = "inline";
        standardBox.style.display = "none";
        filterButton.innerText = "Sök efter artikel";
        buttonFlag = !buttonFlag;
    } else if (!buttonFlag){
        filterBox.style.display = "none";
        standardBox.style.display = "inline";
        filterButton.innerText = "Filtrera efter leverantör";
        buttonFlag = !buttonFlag;
    }
}

function resetModalSettings(){
    filterBox.style.display = "none";
    standardBox.style.display = "inline";
    filterButton.innerText = "Filtrera efter leverantör";
}

function selectionHandler(){
    var selectedOption = document.querySelector("#produkt-options")
    actualSelection.Benamning = selectedOption.options[selectedOption.selectedIndex].text
    actualSelection.LevArtNr = selectedOption.options[selectedOption.selectedIndex].value
    document.querySelector(".ok-btn").style.display !== "inline" ? document.querySelector(".ok-btn").style.display = "inline" : null;
}

function buttonSelectionHandler(){
    actualSelection.Benamning = this.textContent;
    actualSelection.LevArtNr = this.dataset.key;
    document.querySelector(".ok-btn").style.display !== "inline" ? document.querySelector(".ok-btn").style.display = "inline" : null;
}

function reDrawGraphs(){
    if(initGraphCreated){
        d3.select("#line").selectAll("*").remove();
        d3.select("#map").selectAll("*").remove();
        d3.select("#pie").selectAll("*").remove();
        d3.select("#kommun-map").selectAll("*").remove();
    }
}

document.querySelectorAll(".buttonSelection").forEach(button => {
    button.addEventListener("click", buttonSelectionHandler)
})