function dataTypeLarge(dataType) {
    //!Stor toolbar data-type
    document.querySelectorAll('input[name="data-type-small"]').forEach(input => {
        if (input.value === dataType) input.checked = true;
    });
}

function dataTypeSmall(dataType) {
    //!Stor toolbar data-type
    document.querySelectorAll('input[name="data-type"]').forEach(input => {
        if (input.value === dataType) input.checked = true;
    });
}

function calculationTypeLarge(calculationType) {
    //!Stor toolbar data-type
    document.querySelectorAll('input[name="calculation-type-small"]').forEach(input => {
        if (input.value === calculationType) input.checked = true;
    });
}

function calculationTypeSmall(calculationType) {
    //!Stor toolbar data-type
    document.querySelectorAll('input[name="calculation-type"]').forEach(input => {
        if (input.value === calculationType) input.checked = true;
    });
}
    // //!Stor toolbar
    // d3.selectAll('input[name="data-type"]')
    //     .on("change", () => {
    //         console.log('Försöker');            
    //         currentDataType = d3.event.target.value;
    //         document.querySelectorAll('input[name="data-type-small"]').forEach(input => {
    //             if (input.value === currentDataType) input.checked = true;
    //         });
    //     });
    // //!Liten toolbar
    // d3.selectAll('input[name="data-type-small"]')
    //     .on("change", () => {
    //         console.log('Försöker');            
    //         currentDataType = d3.event.target.value;
    //         document.querySelectorAll('input[name="data-type"]').forEach(input => {
    //             if (input.value === currentDataType) input.checked = true;
    //         });
    //     });

    // //!Stor toolbar
    // d3.selectAll('input[name="calculation-type"]')
    //     .on("change", () => {
    //         console.log('Försöker');            
    //         currentCalculationType = d3.event.target.value;
    //         document.querySelectorAll('calculation-type-small').forEach(input => {
    //             if (input.value === currentDataType) input.checked = true;
    //         });

    //     });
    // //!Liten toolbar
    // d3.selectAll('input[name="calculation-type-small"]')
    //     .on("change", () => {
    //         console.log('Försöker');            
    //         currentCalculationType = d3.event.target.value;
    //         document.querySelectorAll('calculation-type').forEach(input => {
    //             if (input.value === currentDataType) input.checked = true;
    //         });
    //     });

function mirrorSlider(startPos) {
    //!Stor slider
    $("#slider").on("slidestop", function (event, ui) {
        var endPos = ui.value;
        if (startPos != endPos) {
            currentYear = endPos;
            $("#small-slider").slider("value", currentYear)
        }
        startPos = endPos;
    });

    $("#small-slider").on("slidestop", function (event, ui) {
        var endPos = ui.value;
        if (startPos != endPos) {
            currentYear = endPos;
            $("#slider").slider("value", currentYear)
        }
        startPos = endPos;
    });
}