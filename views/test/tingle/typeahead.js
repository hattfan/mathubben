var artiklar = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'output.json'
});

// passing in `null` for the `options` arguments will result in the default
// options being used
$('.typeahead').typeahead(null, {
  name: 'Artiklar',
  display: 'Benämning',
  source: bestPictures,
  templates: {
    suggestion: function (data) {
      return '<p><strong>' + data['Benämning'] + '</strong> - ' + data['LevArtNrMathubben'] + '</p>';
    }
  }
})