//Variabler & queryselectors
const artiklar = artikelNamn
const graphOptionsBar = document.querySelector('.selection-container')
const suggestions = document.querySelector('.suggestions');
const searchBox = document.querySelector('.search-box')
let searchBoxCounter = document.querySelectorAll('.search-box')
const searchInput = document.querySelector('[name=produkt-search]')
const searchAdd = document.querySelector('.addition-box')
const searchBoxContainer = document.querySelector('.search-box-container')

function addListenersToSuggestions() {
    console.log('här')
    const searchInputs = document.querySelectorAll('[name=produkt-search]')
    searchInputs.forEach(searchInput => {
        // searchInput.addEventListener('keyup', displayMatches)
        // searchInput.addEventListener('change', displayMatches)
        searchInput.addEventListener('keyup', function(){
            console.log(this.parentNode.getElementsByClassName('suggestions'))
            debugger;
        })

    })
}

addListenersToSuggestions()
//Eventlisteners
// searchInput.addEventListener('keyup', displayMatches)
// searchInput.addEventListener('change', displayMatches)
searchAdd.addEventListener('click', addAnotherSearchBar)

//Lägger till no-show i JS utifall något skumt
graphOptionsBar.classList.add('no-show')

function logSearchBoxes(){
    const searchBoxes = document.querySelectorAll('.search-box')
    console.log(searchBoxes)
}

//findMatches matchar ordet som sökt mot artikelNamn
function findMatches(wordToMatch) {
    return artikelNamn.filter(artikel => {
        const regEx = new RegExp(wordToMatch, 'gi')
        return artikel.match(regEx)
    })
}

//displayMatches lägger till förslagen som en ul-lista
function displayMatches() {
    suggestions.style.width = `${searchBox.offsetWidth}px`
    
    if (this.value.length === 0) {
        suggestions.innerHTML = '';
        suggestions.classList.contains('active') ? suggestions.classList.remove('active') : null
        return
    }

    suggestions.classList.contains('active') && suggestions.innerHTML === '' ? null : suggestions.classList.add('active')
    matchArray = findMatches(this.value, artiklar)
    const html = matchArray.map(artikel => {
        const regex = new RegExp(this.value, 'gi');
        const artikelNamnReplaced = artikel.replace(regex, `<span class='hl'>${this.value}</span>`);
        //! Kan ändras till att matcha leverantör 
        // const stateName = .replace(regex, `<span class='hl'>${this.value}</span>`);
        return `
        <div suggestion-list-item-container>
            <p class='suggestion-list-item'>
                ${artikel}
            </p>
        </div>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

//showGraphOptions fäller ner bar:en för graf-val efter att användaren har sökt
function showGraphOptions() {
    graphOptionsBar.classList.contains('no-show') ? graphOptionsBar.classList.removeClass('no-show') : null
}

suggestions.addEventListener('click', function (e) {
    searchInput.value = e.target.innerHTML.replace(/  /g, '');
    suggestions.innerHTML = '';
    suggestions.classList.contains('active') ? suggestions.classList.remove('active') : null

    if (graphOptionsBar.classList.contains('no-show')) {
        graphOptionsBar.classList.remove('no-show')
        graphOptionsBar.classList.add('show-bar')
    }

    var routeRequest = ('/produkter/' + 'Menigo - 739746')
    fetch(routeRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            
        });
})

window.addEventListener("resize", function() {
    suggestions.style.width = `${searchBox.offsetWidth}px`
});