$(document).ready(function () {
  var slidertoggle = $("#slider")

  slidertoggle.slider({
    value: 2017,
    min: 2015,
    max: 2017,
    step: 1
  })
    .each(function () {
      // Get the options for this slider
      var opt = $(this).data().uiSlider.options;

      // Get the number of possible values
      var vals = opt.max - opt.min;

      // Space out values
      for (var i = 0; i <= vals; i++) {
        var year = i + 2015
        var el = $('<label>' + (year) + '</label>').css('left', (i / vals * 100) + '%');
        $("#slider").append(el);
      }

    });

  slidertoggle.on("change", function () {
    var slidervalue = $("#slider").slider("option", "value");
  })

  //! 
  var slidertoggle = $("#small-slider")

  slidertoggle.slider({
    value: 2017,
    min: 2015,
    max: 2017,
    step: 1
  })
    .each(function () {
      // Get the options for this slider
      var opt = $(this).data().uiSlider.options;

      // Get the number of possible values
      var vals = opt.max - opt.min;

      // Space out values
      for (var i = 0; i <= vals; i++) {
        var year = i + 2015
        var el = $('<label>' + (year) + '</label>').css('left', (i / vals * 100) + '%');
        $("#small-slider").append(el);
      }

    });

  slidertoggle.on("change", function () {
    var slidervalue = $("#small-slider").slider("option", "value");
  })

})