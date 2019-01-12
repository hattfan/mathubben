//Variabler & queryselectors
// const artiklar = artikelNamn
const graphOptionsBar = document.querySelector('.selection-container')
const searchAdd = document.querySelector('.addition-box')

function ToSuggestions() {
    const searchInputs = document.querySelectorAll('[name=produkt-search]')
    
    searchInputs.forEach(searchInput => {
        // console.log(searchInput)
        // searchInput.addEventListener('keyup', displayMatches)
        // searchInput.addEventListener('change', displayMatches)
        searchInput.addEventListener('keyup', function(){
            
            const inputId = this.getAttribute('data-id')
            const suggestionWithId = document.querySelector(`[data-suggestion-id="${inputId}"]`)
            
            displayMatches(suggestionWithId, this)

            suggestionWithId.addEventListener('click', function (e) {
                // console.log(e.target.innerText)
                
                searchInput.value = e.target.parentElement.innerText.replace(/  /g, '');
                // searchInput.value = e.target.innerHTML;
                suggestionWithId.innerHTML = '';
                suggestionWithId.classList.contains('active') ? suggestionWithId.classList.remove('active') : null
            
                if (graphOptionsBar.classList.contains('no-show')) {
                    graphOptionsBar.classList.remove('no-show')
                    graphOptionsBar.classList.add('show-bar')
                }
                // var routeRequest = ('/produkter/' + 'Menigo - 739746')
                // fetch(routeRequest)
                //     .then(function (response) {
                //         return response.json();
                //     })
                //     .then(function (myJson) {
                        
                //     });
            })
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


//findMatches matchar ordet som sökt mot artikelNamn
function findMatches(wordToMatch, artiklar) {
    
    return artiklar.filter(artikel => {
        const regEx = new RegExp(wordToMatch, 'gi')
        return artikel.match(regEx)
    })
}

//displayMatches lägger till förslagen som en ul-lista
function displayMatches(currentSuggestion, inputValue) {
    const width = document.querySelector('.search-box').offsetWidth
    currentSuggestion.style.width = `${width}px`

    if (inputValue.value.length === 0) {
        currentSuggestion.innerHTML = '';
        currentSuggestion.classList.contains('active') ? currentSuggestion.classList.remove('active') : null
        return
    }

    currentSuggestion.classList.contains('active') && currentSuggestion.innerHTML === '' ? null : currentSuggestion.classList.add('active')
    matchArray = findMatches(inputValue.value, artiklar)
    let reducedArray = [], loops;
    matchArray.length > 7 ? loops = 7 :loops = matchArray.length
    for (let i = 0; i < loops; i++) matchArray !== undefined ?reducedArray.push(matchArray[i]):null
    
    const html = reducedArray.map(artikel => {
        const regex = new RegExp(inputValue.value, 'gi');
        // const regex = new RegExp(inputValue.value);
        // console.log(regex)
        // const artikelNamnReplaced = artikel.replace(regex, `<span class='hl'>${inputValue.value}</span>`);
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
    currentSuggestion.innerHTML = html;
}

//showGraphOptions fäller ner bar:en för graf-val efter att användaren har sökt
function showGraphOptions() {
    graphOptionsBar.classList.contains('no-show') ? graphOptionsBar.classList.removeClass('no-show') : null
}

window.addEventListener("resize", function() {
    suggestions.style.width = `${searchBox.offsetWidth}px`
});