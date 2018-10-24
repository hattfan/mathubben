function handleInputs() {
    const searchboxes = document.querySelectorAll(".tt-input");
    const searchboxesWithValues = document.querySelectorAll('[data-id]');
    const searchboxValues = {};
    searchboxesWithValues.forEach(searchboxWithValues => {
        searchboxValues[searchboxWithValues.parentElement.parentElement.id] = searchboxWithValues.dataset.id;
    })

    if (searchboxes.length === searchboxesWithValues.length) {
        switch (searchboxesWithValues.length) {
            case 2:
                fetch(`/konkurrentanalysartiklar/${searchboxValues['searchBox-1']}/${searchboxValues['searchBox-2']}`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (myJson) {
                        testFetch(myJson)
                    });
                break;
            case 3:
                fetch(`/konkurrentanalysartiklar/${searchboxValues['searchBox-1']}/${searchboxValues['searchBox-2']}/${searchboxValues['searchBox-3']}`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (myJson) {
                        testFetch(myJson)
                    });
                break;
            case 4:
                fetch(`/konkurrentanalysartiklar/${searchboxValues['searchBox-1']}/${searchboxValues['searchBox-2']}/${searchboxValues['searchBox-3']}/${searchboxValues['searchBox-4']}`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (myJson) {
                        testFetch(myJson)
                    });
                break;
            case 5:
                fetch(`/konkurrentanalysartiklar/${searchboxValues['searchBox-1']}/${searchboxValues['searchBox-2']}/${searchboxValues['searchBox-3']}/${searchboxValues['searchBox-4']}//${searchboxValues['searchBox-5']}`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (myJson) {
                        testFetch(myJson)
                    });
                break;
            default:
                break;
        }
    }
}