function addAnotherSearchBar() {

    
    searchBoxCounter = document.querySelectorAll('.search-box')

    const addSearchBox1 = `  <div class="search-box" style="border-left: #f7f7f7 1px solid; border-right: #f7f7f7 1px solid">
                                <div class="search-color-blob" style="background-color: blue"></div>
                                    <input class="produkt-search" data-id="1" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                    <ul class="suggestions" data-suggestion-id="1" id="search-box1"></ul>
                            </div>`
    const addSearchBox2 = `  <div class="search-box" style="border-right: #f7f7f7 1px solid">
                                <div class="search-color-blob" style="background-color: red"></div>
                                    <input class="produkt-search" data-id="2" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                    <ul class="suggestions" data-suggestion-id="2" id="search-box2"></ul>
                            </div>`
    const addSearchBox3 = `  <div class="search-box" style="border-right: #f7f7f7 1px solid">
                            <div class="search-color-blob" style="background-color: DarkOrange"></div>
                                <input class="produkt-search" data-id="3" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                <ul class="suggestions" data-suggestion-id="3" id="search-box3"></ul>
                            </div>`
    const addSearchBox4 = `  <div class="search-box" style="border-right: #f7f7f7 1px solid">
                                <div class="search-color-blob" style="background-color: purple"></div>
                                <input class="produkt-search" data-id="4" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                <ul class="suggestions" data-suggestion-id="4" id="search-box4"></ul>
                            </div>`
    const addSearchBox5 = `  <div class="search-box" style="border-right: #f7f7f7 1px solid; border-right: #f7f7f7 1px solid">
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
            searchBoxContainer.innerHTML = `${addSearchBox1} ${addSearchBox2} ${additionBox}`
            document.querySelector('.addition-box').addEventListener('click', addAnotherSearchBar)
            addListenersToSuggestions()
            
            break;

        case 2:
            searchBoxContainer.innerHTML = `${addSearchBox1} ${addSearchBox2} ${addSearchBox3}  ${additionBox}`
            document.querySelector('.addition-box').addEventListener('click', addAnotherSearchBar)
            addListenersToSuggestions()
            break;

        case 3:
            searchBoxContainer.innerHTML = `${addSearchBox1} ${addSearchBox2} ${addSearchBox3} ${addSearchBox4}  ${additionBox}`
            document.querySelector('.addition-box').addEventListener('click', addAnotherSearchBar)
            addListenersToSuggestions()
            break

        case 4:
            searchBoxContainer.innerHTML = `${addSearchBox1} ${addSearchBox2} ${addSearchBox3} ${addSearchBox4} ${addSearchBox5}`
            addListenersToSuggestions()
            break;

        default:
            break;
    }
}