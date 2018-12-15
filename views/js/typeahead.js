// typeaheadInit($('#searchBox-1 .typeahead'))
// typeaheadInit($('#searchBox-2 .typeahead'))
typeaheadInit($("#artikel"))
fabrikatInit($("#leverantör"))

function typeaheadInit(searchHandler) {
  var bestPictures = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Benamning'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: '../artikellistning/%QUERY',
      wildcard: '%QUERY'
    }
  });

  searchHandler.typeahead(null, {
    name: 'artikel-search',
    limit: Infinity,
    display: 'Benamning',
    source: bestPictures,
    templates: {
      suggestion: function (data) {
        return '<p><strong>' + data['Benamning'] + '</strong> - ' + data['Fabrikat'] + '</p>';
      }
    }
  }).on('typeahead:selected', function (event, selection) {
    actualSelection.Benamning = selection['Benamning'], actualSelection.Fabrikat = selection['Fabrikat'], actualSelection['LevArtNr'] = selection['LevArtNr'];
    document.querySelector(".ok-btn").style.display = "inline"
    // handleInputs();
  });
}

function fabrikatInit(searchHandler) {
  var bestPictures = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Fabrikat'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: '../fabrikatlistning/%QUERY',
      wildcard: '%QUERY'
    }
  });

  searchHandler.typeahead(null, {
    name: 'fabrikat-search',
    limit: Infinity,
    display: 'Fabrikat',
    source: bestPictures,
    templates: {
      suggestion: function (data) {
        return '<p><strong>' + data['Fabrikat'] + '</strong></p>';
      }
    }
  }).on('typeahead:selected', function (event, selection) {
    actualSelection.Fabrikat = selection['Fabrikat'];
    getArticlesFromFabrikat(selection['Fabrikat']);
  });
}

// function fabrikatFilterListning(searchHandler) {
//   url = 
//   var bestPictures = new Bloodhound({
//     datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Fabrikat'),
//     queryTokenizer: Bloodhound.tokenizers.whitespace,
//     remote: {
//       url: '../fabrikatfilter/',
//       wildcard: '%QUERY'
//     }
//   });

//   searchHandler.typeahead(null, {
//     name: 'fabrikat-search',
//     limit: Infinity,
//     display: 'Fabrikat',
//     source: bestPictures,
//     templates: {
//       suggestion: function (data) {
//         return '<p><strong>' + data['Fabrikat'] + '</strong></p>';
//       }
//     }
//   }).on('typeahead:selected', function(event, selection) {
//     handleInputs();
//   });
// }

function getArticlesFromFabrikat(fabrikat) {
  //Spinner här
  document.querySelector(".spinner").style.display = "flex"
  fetch('../artikelperfabrikat/' + fabrikat)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      document.querySelector("#produkt-select").style.display = "inline";
      var list = document.getElementById("produkt-options");
      myJson.forEach(fab => {
        list.add(new Option(fab['Benamning'] + ' - ' + fab['LevArtNr'], fab['LevArtNr']));
      })
    document.querySelector(".spinner").style.display = "none"
    });
}