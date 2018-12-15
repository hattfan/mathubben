typeaheadInit($('#searchBox-1 .typeahead'))
typeaheadInit($('#searchBox-2 .typeahead'))
typeaheadInit($("#modal-input"))

function typeaheadInitRESERVE(searchHandler){
  var bestPictures = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Benamning'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '/js/preload/output5.json',
  });
  
  searchHandler.typeahead(null, {
    name: 'best-pictures',
    display: 'Benamning',
    source: bestPictures,
    templates: {
      suggestion: function (data) {
        return '<p><strong>' + data['Benamning'] + '</strong> - ' + data['LevArtNr'] + '</p>';
      }
    }
  }).on('typeahead:selected', function(event, selection) {
    this.dataset.id = selection['LevArtNr'];
    handleInputs();
  });
}


// Instantiate the Typeahead UI
// $('.typeahead').typeahead(null, {
//   displayKey: 'value',
//   source: movies.ttAdapter()
// });

function typeaheadInit(searchHandler) {
  var bestPictures = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Benamning'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    // prefetch: '../data/films/post_1960.json',
    remote: {
      url: '../artikellistning/%QUERY',
      wildcard: '%QUERY'
    }
  });
  
  searchHandler.typeahead(null, {
    name: 'best-pictures',
    display: 'Benamning',
    source: bestPictures,
    templates: {
      suggestion: function (data) {
        return '<p><strong>' + data['Benamning'] + '</strong> - ' + data['Fabrikat'] + '</p>';
      }
    }
  }).on('typeahead:selected', function(event, selection) {
    this.dataset.id = selection['LevArtNr'];
    handleInputs();
  });
}


// // Instantiate the Bloodhound suggestion engine
// var movies = new Bloodhound({
//   datumTokenizer: function (datum) {
//       return Bloodhound.tokenizers.whitespace(datum.value);
//   },
//   queryTokenizer: Bloodhound.tokenizers.whitespace,
//   remote: {
//       url: 'http://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=f22e6ce68f5e5002e71c20bcba477e7d',
//       filter: function (movies) {
//           // Map the remote source JSON array to a JavaScript object array
//           return $.map(movies.results, function (movie) {
//               return {
//                   value: movie.original_title
//               };
//           });
//       }
//   }
// });

// // Initialize the Bloodhound suggestion engine
// movies.initialize();
