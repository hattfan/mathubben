const artiklar = artikelNamn

function findMatches(wordToMatch) {

    return artikelNamn.filter(artikel => {

        const regEx = new RegExp(wordToMatch, 'gi')
        return artikel.match(regEx)

    })
}

function clickableLists() {
    const clickItems = document.querySelectorAll('.suggestionListItem')

    clickItems.forEach(clickItem => {
        clickItem.addEventListener("click", 
        console.log(this.value))
    })
}

function displayMatches() {
    if (this.value.length === 0) return suggestions.innerHTML = "";

    clickableLists()
    // console.log('run') 
    matchArray = findMatches(this.value, artiklar)
    const html = matchArray.map(artikel => {
        const regex = new RegExp(this.value, 'gi');
        const artikelNamnReplaced = artikel.replace(regex, `<span class="hl">${this.value}</span>`);
        // console.log(artikelNamnReplaced)
        //! Kan ändras till att matcha leverantör 
        // const stateName = .replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li class="suggestionListItem">
            <span class="name">${artikel}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;

}


const suggestions = document.querySelector('.suggestions');
var searchInput = document.querySelector('[name=produkt-search]')

searchInput.addEventListener("keyup", displayMatches)
searchInput.addEventListener("change", displayMatches)

