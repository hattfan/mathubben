typeaheadInit($('#searchBox-1 .typeahead'))
typeaheadInit($('#searchBox-2 .typeahead'))
typeaheadInit($("#modal-input"))

function typeaheadInit(searchHandler){
  var bestPictures = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Benämning'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '/js/preload/output2.json',
  });
  
  searchHandler.typeahead(null, {
    name: 'best-pictures',
    display: 'Benämning',
    source: bestPictures,
    templates: {
      suggestion: function (data) {
        return '<p><strong>' + data['Benämning'] + '</strong> - ' + data['LevArtNrMathubben'] + '</p>';
      }
    }
  }).on('typeahead:selected', function(event, selection) {
    this.dataset.id = selection['LevArtNrMathubben'];
    handleInputs();
  });
}