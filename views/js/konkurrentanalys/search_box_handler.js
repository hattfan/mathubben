function addAnotherSearchBar() {

    searchBoxCounter = document.querySelectorAll('.search-box')

    console.log(searchBoxCounter.length)

    const addSearchBox1 = `  <div class="search-box" style="border-left: #f7f7f7 1px solid; border-right: #f7f7f7 1px solid">
                                <div class="search-color-blob" style="background-color: blue"></div>
                                    <input class="produkt-search" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                    <ul class="suggestions"></ul>
                            </div>`
    const addSearchBox2 = `  <div class="search-box" style="border-right: #f7f7f7 1px solid">
                                <div class="search-color-blob" style="background-color: red"></div>
                                    <input class="produkt-search" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                    <ul class="suggestions"></ul>
                            </div>`
    const addSearchBox3 = `  <div class="search-box" style="border-right: #f7f7f7 1px solid">
                            <div class="search-color-blob" style="background-color: DarkOrange"></div>
                                <input class="produkt-search" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                <ul class="suggestions"></ul>
                            </div>`
    const addSearchBox4 = `  <div class="search-box" style="border-right: #f7f7f7 1px solid">
                                <div class="search-color-blob" style="background-color: purple"></div>
                                <input class="produkt-search" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                <ul class="suggestions"></ul>
                            </div>`
    const addSearchBox5 = `  <div class="search-box" style="border-right: #f7f7f7 1px solid; border-right: #f7f7f7 1px solid">
                                <div class="search-color-blob" style="background-color: green"></div>
                                <input class="produkt-search" type="text" name="produkt-search" id="produkt-search" placeholder="Sök efter artikelnamn">
                                <ul class="suggestions"></ul>
                            </div>`


    switch (searchBoxCounter.length) {
        case 1:
            searchBoxContainer.innerHTML = `${addSearchBox1} ${addSearchBox2}`
            break;

        case 2:
            searchBoxContainer.innerHTML = `${addSearchBox1} ${addSearchBox2} ${addSearchBox3}`
            break;

        case 3:
            searchBoxContainer.innerHTML = `${addSearchBox1} ${addSearchBox2} ${addSearchBox3} ${addSearchBox4}`
            break

        case 4:
            searchBoxContainer.innerHTML = `${addSearchBox1} ${addSearchBox2} ${addSearchBox3} ${addSearchBox4} ${addSearchBox5}`
            document.querySelector('.add-another-searchbar').innerHTML = '';
            break;

        default:
            break;
    }
}