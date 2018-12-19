function handleInputs() {
    const searchboxValues = [];
    var triggerButtons = document.querySelectorAll('.trigger-button');
    
    triggerButtons.forEach(triggerButton => {
        if(triggerButton.value){
            // console.log(triggerButton.value);
            searchboxValues.push(triggerButton.value)
        }
    })
    
    

    // searchboxesWithValues.forEach(searchboxWithValues => {
    //     searchboxValues[searchboxWithValues.parentElement.parentElement.id] = searchboxWithValues.dataset.id;
    // })'


    if (triggerButtons.length === searchboxValues.length) {
        switch (searchboxValues.length) {
            case 1:
                var apiRequest1 = fetch(`/konkurrentanalysartiklarPerKommun/${searchboxValues[0]}`).then(function (response) {
                    return response.json()
                });
                var apiRequest2 = fetch(`/konkurrentanalysartiklarPerLaen/${searchboxValues[0]}`).then(function (response) {
                    return response.json()
                });
                var apiRequest3 = fetch(`/konkurrentanalysartiklarSverige/${searchboxValues[0]}`).then(function (response) {
                    return response.json()
                });
                Promise.all([apiRequest1, apiRequest2, apiRequest3]).then(function (values) {
                    drawGraphs(values[0], values[1], values[2])
                });
            case 2:
                var apiRequest1 = fetch(`/konkurrentanalysartiklarPerKommun/${searchboxValues[0]}/${searchboxValues[1]}`).then(function (response) {
                    return response.json()
                });
                var apiRequest2 = fetch(`/konkurrentanalysartiklarPerLaen/${searchboxValues[0]}/${searchboxValues[1]}`).then(function (response) {
                    return response.json()
                });
                var apiRequest3 = fetch(`/konkurrentanalysartiklarSverige/${searchboxValues[0]}/${searchboxValues[1]}`).then(function (response) {
                    return response.json()
                });
                Promise.all([apiRequest1, apiRequest2, apiRequest3]).then(function (values) {
                    // console.log(values);
                    drawGraphs(values[0], values[1], values[2])
                });

                break;
            case 3:
                var apiRequest1 = fetch(`/konkurrentanalysartiklarPerKommun/${searchboxValues[0]}/${searchboxValues[1]}/${searchboxValues[2]}`).then(function (response) {
                    return response.json()
                });
                var apiRequest2 = fetch(`/konkurrentanalysartiklarPerLaen/${searchboxValues[0]}/${searchboxValues[1]}/${searchboxValues[2]}`).then(function (response) {
                    return response.json()
                });
                var apiRequest3 = fetch(`/konkurrentanalysartiklarSverige/${searchboxValues[0]}/${searchboxValues[1]}/${searchboxValues[2]}`).then(function (response) {
                    return response.json()
                });
                Promise.all([apiRequest1, apiRequest2, apiRequest3]).then(function (values) {
                    drawGraphs(values[0], values[1], values[2])
                });
                break;
            case 4:
                var apiRequest1 = fetch(`/konkurrentanalysartiklarPerKommun/${searchboxValues[0]}/${searchboxValues[1]}/${searchboxValues[2]}/${searchboxValues[3]}`).then(function (response) {
                    return response.json()
                });
                var apiRequest2 = fetch(`/konkurrentanalysartiklarPerLaen/${searchboxValues[0]}/${searchboxValues[1]}/${searchboxValues[2]}/${searchboxValues[3]}`).then(function (response) {
                    return response.json()
                });
                var apiRequest3 = fetch(`/konkurrentanalysartiklarSverige/${searchboxValues[0]}/${searchboxValues[1]}/${searchboxValues[2]}/${searchboxValues[3]}`).then(function (response) {
                    return response.json()
                });
                Promise.all([apiRequest1, apiRequest2, apiRequest3]).then(function (values) {
                    drawGraphs(values[0], values[1], values[2])
                });
                break;

            case 5:
                var apiRequest1 = fetch(`/konkurrentanalysartiklarPerKommun/${searchboxValues[0]}/${searchboxValues[1]}/${searchboxValues[2]}/${searchboxValues[3]}/${searchboxValues[4]}`).then(function (response) {
                    return response.json()
                });
                var apiRequest2 = fetch(`/konkurrentanalysartiklarPerLaen/${searchboxValues[0]}/${searchboxValues[1]}/${searchboxValues[2]}/${searchboxValues[3]}/${searchboxValues[4]}`).then(function (response) {
                    return response.json()
                });
                var apiRequest3 = fetch(`/konkurrentanalysartiklarSverige/${searchboxValues[0]}/${searchboxValues[1]}/${searchboxValues[2]}/${searchboxValues[3]}/${searchboxValues[4]}`).then(function (response) {
                    return response.json()
                });
                Promise.all([apiRequest1, apiRequest2, apiRequest3]).then(function (values) {
                    drawGraphs(values[0], values[1], values[2])
                });
                break;
            
            default:
                break;
        }
    }
}