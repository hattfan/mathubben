// instanciate new modal
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function (textBox) {
        console.log('modal open');
    },
    onClose: function () {
        console.log('modal closed');
    },
    beforeClose: function () {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
});

// set content
modal.setContent(
    `
    <h1>Välj produkt att undersöka</h1>
    <hr></hr>
    <div class="search-container">
        <div class="sök-box">
            <label for="produkt">Filtrera efter leverantör</label>
            <br>
            <input id="leverantör" class="typeahead" type="text" placeholder="Leverantör">
        </div>
        <div class="sök-box">
            <label for="produkt">Sök efter artikel</label>
            <br>
            <input id="artikel" class="typeahead" type="text" placeholder="Sök efter artikel">
        </div>
    </div>
    `
);

// add a button
modal.addFooterBtn('Ok', 'tingle-btn tingle-btn--primary', function () {
    
    document.querySelector(".trigger-button").innerText = document.querySelector("#artikel").value
    // here goes some logic
    modal.close();
});

// add another button
modal.addFooterBtn('Avbryt', 'tingle-btn tingle-btn--danger', function () {
    // here goes some logic
    modal.close();
});

// var btn = document.querySelector('.trigger-button');
// btn.addEventListener('click', function (e) {
//     console.log(this)
//     document.querySelector("#artikel").dataset.key = this.dataset.key;
//     modal.open(this);
// })