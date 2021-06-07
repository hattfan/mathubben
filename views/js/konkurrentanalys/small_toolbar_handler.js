// var smallBoxProduct = `<div class="small-box">
//                         <p class="search-color-blob" style="background-color: blue"></p>
//                     </div>
//                     <div class="product-small">
//                         <span class="product-small-name" id="product-small-name-blue"></span>
//                         <br>
//                         <span class="product-small-fabrikat" id="product-small-fabrikat-blue"></span>
//                     </div>
//                     <div class="split-radio-buttons"></div>`

// document.querySelector("#slider-block").insertAdjacentHTML('afterend', smallBoxProduct)
//Sätt marginLeft till storleken
document.querySelector("#small-product-indication-bar").style.marginLeft = -document.querySelector("#small-product-indication-bar").offsetWidth

window.addEventListener("scroll", function () {
    if (window.scrollY > 158 && window.innerWidth > 500) {
        // document.querySelector('#produkt-search-toolbar').classList.remove('margin-toolbar')
        document.querySelector('#small-toolbar').style.display = 'flex'
    } else {
        // document.querySelector('#produkt-search-toolbar').classList.add('margin-toolbar')
        document.querySelector('#small-toolbar').style.display = 'none'
    }
})

// TODO Animera ut pilen
$("#arrow-right").click(function () {
    $("#arrow-right").fadeOut("fast", function () {
        $("#close-toolbar").fadeIn("slow", function () {
            // Animation complete.
        });
    });
});

// document.querySelector('#arrow-right').addEventListener('click', function () {
//     // debugger;
//     document.querySelector('#small-product-indication-bar').classList.add('animate-in');
// })
