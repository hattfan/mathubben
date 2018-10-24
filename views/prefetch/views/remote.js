var bestPictures = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Benämning'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'output.json',
});

// $('#remote .typeahead').typeahead(null, {
//   name: 'best-pictures',
//   display: 'Benämning',
//   source: bestPictures
// });

$('#remote .typeahead').typeahead(null, {
  name: 'best-pictures',
  display: 'Benämning',
  source: bestPictures,
  templates: {
    suggestion: function (data) {
      return '<p><strong>' + data['Benämning'] + '</strong> - ' + data['LevArtNrMathubben'] + '</p>';
    }
  }
}).on('typeahead:selected', function(event, selection) {
  
  // the second argument has the info you want
  // alert(selection);
  console.log(selection.LevArtNrMathubben)

});