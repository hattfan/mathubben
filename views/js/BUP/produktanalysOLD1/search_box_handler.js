document.querySelector('.addition-box').addEventListener('click', addAnotherSearchBar)

function addAnotherSearchBar() {
    searchBoxCounter = document.querySelectorAll('.trigger-button')
    console.log(searchBoxCounter.length);

    // const addSearchBox2 = `<div class="product-search-container" id="searchBox-2">
    //                             <p class="search-color-blob" style="background-color: red"></p>
    //                             <input class="typeahead" type="text" placeholder="Sök efter artikel">
    //                         </div>`
    const addSearchBox3 =`<p class="search-color-blob" style="background-color: darkOrange"></p>
                        <div data-key="darkOrange" class="trigger-button" style="border: 2px solid #ccc; padding: 10px;border-radius: 7px; cursor: pointer;color: dimgray">Lägg till Produkt</div>
                        `
    const addSearchBox4 = `<p class="search-color-blob" style="background-color: purple"></p>
                            <div data-key="purple" class="trigger-button" style="border: 2px solid #ccc; padding: 10px;border-radius: 7px; cursor: pointer;color: dimgray">Lägg till Produkt</div>
                            `
    const addSearchBox5 = `<p class="search-color-blob" style="background-color: green"></p>
                            <div data-key="green" class="trigger-button" style="border: 2px solid #ccc; padding: 10px;border-radius: 7px; cursor: pointer;color: dimgray">Lägg till Produkt</div>
                            `

    switch (searchBoxCounter.length) {
        // case 1:
        //     var addBox = document.querySelector('.addition-box');
        //     addBox.insertAdjacentHTML('beforebegin', addSearchBox2);
        //     typeaheadInit($('#searchBox-2 .typeahead'))
        
        //     break;

        case 2:
        var addBox = document.querySelector('.addition-box');
            addBox.insertAdjacentHTML('beforebegin', addSearchBox3);
            addTriggerClickListeners()
            break;

        case 3:
        var addBox = document.querySelector('.addition-box');
            addBox.insertAdjacentHTML('beforebegin', addSearchBox4);
            addTriggerClickListeners()
            break;

        case 4:
        var addBox = document.querySelector('.addition-box');
            addBox.insertAdjacentHTML('beforebegin', addSearchBox5);
            addTriggerClickListeners()
            document.querySelector('.search-box-container').removeChild(document.querySelector('.addition-box'));
            break;

        default:
            break;
    }
}

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