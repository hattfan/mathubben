//! OM SEED VÄRDEN handleInputs(true);
function handleInputs(seed) {
    const searchboxValues = [];
    var triggerButtons = document.querySelectorAll('.trigger-button');
    
    triggerButtons.forEach(triggerButton => {
        if(triggerButton.value){
            // console.log(triggerButton.value);
            searchboxValues.push(triggerButton.value)
        }
    })
    
    if(seed){
        var apiRequest1 = fetch(`/konkurrentanalysartiklarPerKommun/Arla Ko - 7180/MENIGO FOG - MENY545`).then(function (response) {
            return response.json()
        });
        var apiRequest2 = fetch(`/konkurrentanalysartiklarPerLaen/Arla Ko - 7180/MENIGO FOG - MENY545`).then(function (response) {
            return response.json()
        });
        var apiRequest3 = fetch(`/konkurrentanalysartiklarSverige/Arla Ko - 7180/MENIGO FOG - MENY545`).then(function (response) {
            return response.json()
        });
        Promise.all([apiRequest1, apiRequest2, apiRequest3]).then(function (values) {
            // console.log(values);
            colors = assignLevartToColor(['Arla Ko - 7180','MENIGO FOG - MENY545'])
            drawGraphs(values[0], values[1], values[2], colors)
        });
    }

    if (triggerButtons.length === searchboxValues.length) {
        //assign colors here
        document.querySelectorAll('.text-spinner').forEach(spinner => spinner.style.display = 'inline')
        
        colors = assignLevartToColor(searchboxValues);

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
                    drawGraphs(values[0], values[1], values[2], colors)
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
                    drawGraphs(values[0], values[1], values[2], colors)
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
                    drawGraphs(values[0], values[1], values[2], colors)
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
                    drawGraphs(values[0], values[1], values[2], colors)
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
                    drawGraphs(values[0], values[1], values[2], colors)
                });
                break;
            
            default:
                break;
        }
    }
}

function assignLevartToColor(levArtNrs){
    var classNames = ['blue','red','DarkOrange', 'purple', 'green']
    var colors = {};
    for (let i = 0; i < levArtNrs.length; i++) {
        const levArtNr = levArtNrs[i];
        colors[levArtNr] = classNames[i]
    }
    return colors;
}