// document.querySelector('.addition-box').addEventListener('click', addAnotherSearchBar)

// function addAnotherSearchBar() {

//     searchBoxCounter = document.querySelectorAll('.product-search-container')

//     const addSearchBox2 = `<div class="product-search-container" id="searchBox-2">
//                                 <p class="search-color-blob" style="background-color: red"></p>
//                                 <input class="typeahead" type="text" placeholder="Sök efter artikel">
//                             </div>`
//     const addSearchBox3 = `<div class="product-search-container" id="searchBox-3">
//                             <p class="search-color-blob" style="background-color: DarkOrange"></p>
//                             <input class="typeahead" type="text" placeholder="Sök efter artikel">
//                         </div>`
//     const addSearchBox4 = `<div class="product-search-container" id="searchBox-4">
//                             <p class="search-color-blob" style="background-color: purple"></p>
//                             <input class="typeahead" type="text" placeholder="Sök efter artikel">
//                         </div>`
//     const addSearchBox5 = `<div class="product-search-container" id="searchBox-5">
//                             <p class="search-color-blob" style="background-color: green"></p>
//                             <input class="typeahead" type="text" placeholder="Sök efter artikel">
//                         </div>`

//     switch (searchBoxCounter.length) {
//         case 1:
//             var addBox = document.querySelector('.addition-box');
//             addBox.insertAdjacentHTML('beforebegin', addSearchBox2);
//             typeaheadInit($('#searchBox-2 .typeahead'))
//             break;

//         case 2:
//         var addBox = document.querySelector('.addition-box');
//             addBox.insertAdjacentHTML('beforebegin', addSearchBox3);
//             typeaheadInit($('#searchBox-3 .typeahead'))
//             break;

//         case 3:
//         var addBox = document.querySelector('.addition-box');
//             addBox.insertAdjacentHTML('beforebegin', addSearchBox4);
//             typeaheadInit($('#searchBox-4 .typeahead'))
//             break;

//         case 4:
//         var addBox = document.querySelector('.addition-box');
//             addBox.insertAdjacentHTML('beforebegin', addSearchBox5);
//             typeaheadInit($('#searchBox-5 .typeahead'))
//             document.querySelector('.search-box-container').removeChild(document.querySelector('.addition-box'));
//             break;

//         default:
//             break;
//     }
// }