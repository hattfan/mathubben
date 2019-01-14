function addAnotherSearchBar() {

    searchBoxCounter = document.querySelectorAll('.search-box')

    const addSearchBox2 = `  <div class="search-box" id="search-box-2" style="border-right: #f7f7f7 1px solid">
                                <div class="search-color-blob" style="background-color: red"></div>
                                    <input class="produkt-search" data-id="2" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                    <ul class="suggestions" data-suggestion-id="2" id="search-box2"></ul>
                            </div>`
    const addSearchBox3 = `  <div class="search-box" id="search-box-3" style="border-right: #f7f7f7 1px solid">
                            <div class="search-color-blob" style="background-color: DarkOrange"></div>
                                <input class="produkt-search" data-id="3" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                <ul class="suggestions" data-suggestion-id="3" id="search-box3"></ul>
                            </div>`
    const addSearchBox4 = `  <div class="search-box" id="search-box-4" style="border-right: #f7f7f7 1px solid">
                                <div class="search-color-blob" style="background-color: purple"></div>
                                <input class="produkt-search" data-id="4" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                <ul class="suggestions" data-suggestion-id="4" id="search-box4"></ul>
                            </div>`
    const addSearchBox5 = `  <div class="search-box" id="search-box-5" style="border-right: #f7f7f7 1px solid; border-right: #f7f7f7 1px solid">
                                <div class="search-color-blob" style="background-color: green"></div>
                                <input class="produkt-search" data-id="5" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                <ul class="suggestions" data-suggestion-id="5" id="search-box5"></ul>
                            </div>`

    const additionBox = `<div class="addition-box">
                            <div class="plus-icon">
                            <p><i class="fa fa-plus-circle addition" aria-hidden="true"></i> Lägg till fler artiklar</p>
                            </div>
                        </div>`

    switch (searchBoxCounter.length) {
        case 1:
            var searchBox = document.getElementById('search-box-1');
            searchBox.insertAdjacentHTML('afterend', addSearchBox2);
            addListenersToSuggestions()
            break;

        case 2:
            var searchBox = document.getElementById('search-box-2');
            searchBox.insertAdjacentHTML('afterend', addSearchBox3);
            addListenersToSuggestions()
            break;

        case 3:
            var searchBox = document.getElementById('search-box-3');
            searchBox.insertAdjacentHTML('afterend', addSearchBox4);
            addListenersToSuggestions()
            break;

        case 4:
            var searchBox = document.getElementById('search-box-4');
            searchBox.insertAdjacentHTML('afterend', addSearchBox5);
            document.querySelector('.search-box-container').removeChild(document.querySelector('.addition-box'));
            addListenersToSuggestions()
            break;

        default:
            break;
    }
}