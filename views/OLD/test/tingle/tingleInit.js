// instanciate new modal
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function () {
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
// modal.setContent(
//   `
//   <h1>Välj produkt att undersöka</h1>
//   <hr></hr>
//   <input class="typeahead" type="text" placeholder="Sök efter artikel">

//   `
// );

// add a button
modal.addFooterBtn('Ok', 'tingle-btn tingle-btn--primary', function () {
    // here goes some logic
    modal.close();
});

// add another button
modal.addFooterBtn('Avbryt', 'tingle-btn tingle-btn--danger', function () {
    // here goes some logic
    modal.close();
});

var btn = document.querySelector('.trigger-button');
btn.addEventListener('click', function () {
    modal.open();
})