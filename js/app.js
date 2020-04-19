var sass = new Sass();

var files = [
  // "_alert.scss",
  "_badge.scss",
  // "_breadcrumb.scss",
  "_button-group.scss",
  "_buttons.scss",
  // "_card.scss",
  // "_carousel.scss",
  // "_close.scss",
  "_code.scss",
  // "_custom-forms.scss",
  // "_dropdown.scss",
  "_forms.scss",
  "_functions.scss",
  "_grid.scss",
  "_images.scss",
  "_input-group.scss",
  // "_jumbotron.scss",
  // "_list-group.scss",
  // "_media.scss",
  "_mixins.scss",
  // "_modal.scss",
  // "_nav.scss",
  // "_navbar.scss",
  // "_pagination.scss",
  // "_popover.scss",
  // "_print.scss",
  // "_progress.scss",
  "_reboot.scss",
  "_root.scss",
  // "_spinners.scss",
  // "_tables.scss",
  // "_toasts.scss",
  // "_tooltip.scss",
  // "_transitions.scss",
  "_type.scss",
  "_utilities.scss",
  "_variables.scss",
  "bootstrap-grid.scss",
  "bootstrap-reboot.scss",
  "bootstrap.scss",

  "mixins/_alert.scss",
  "mixins/_background-variant.scss",
  "mixins/_badge.scss",
  "mixins/_border-radius.scss",
  "mixins/_box-shadow.scss",
  "mixins/_breakpoints.scss",
  "mixins/_buttons.scss",
  "mixins/_caret.scss",
  "mixins/_clearfix.scss",
  "mixins/_deprecate.scss",
  "mixins/_float.scss",
  "mixins/_forms.scss",
  "mixins/_gradients.scss",
  "mixins/_grid-framework.scss",
  "mixins/_grid.scss",
  "mixins/_hover.scss",
  "mixins/_image.scss",
  "mixins/_list-group.scss",
  "mixins/_lists.scss",
  "mixins/_nav-divider.scss",
  "mixins/_pagination.scss",
  "mixins/_reset-text.scss",
  "mixins/_resize.scss",
  "mixins/_screen-reader.scss",
  "mixins/_size.scss",
  "mixins/_table-row.scss",
  "mixins/_text-emphasis.scss",
  "mixins/_text-hide.scss",
  "mixins/_text-truncate.scss",
  "mixins/_transition.scss",
  "mixins/_visibility.scss",

  "utilities/_align.scss",
  "utilities/_background.scss",
  "utilities/_borders.scss",
  "utilities/_clearfix.scss",
  "utilities/_display.scss",
  "utilities/_embed.scss",
  "utilities/_flex.scss",
  "utilities/_float.scss",
  "utilities/_overflow.scss",
  "utilities/_position.scss",
  "utilities/_screenreaders.scss",
  "utilities/_shadows.scss",
  "utilities/_sizing.scss",
  "utilities/_spacing.scss",
  "utilities/_stretched-link.scss",
  "utilities/_text.scss",
  "utilities/_visibility.scss",

  "vendor/_rfs.scss",
];

var tasks = [];

files.forEach((file) => {
  $.get("../scss/" + file, function (data) {
    //var result = data;
    //console.log(data);

    sass.writeFile("scss/" + file, data, function () {
      console.log('wrote "scss/' + file + '"');
    });
  });
});

var appScss = "";
var appOptions = {
  columns: 12,
  gridGutterWidth: 30,
  headingsColor: "black",
};

function compile(options = {}) {
  var options2 = Object.assign(appOptions, options);

  var string = `
          $grid-columns: ${options2.columns};
          $grid-gutter-width: ${options2.gridGutterWidth}px;
          $headings-color: ${options2.headingsColor};`;

  var promise = new Promise(function (resolve, reject) {
    sass.compile(string + '@import "scss/bootstrap";' + appScss, function (
      result
    ) {
      console.log("compiled", result);
      var css = result.text;

      if (result.text) {
        resolve(css);
      } else {
        reject(Error("It broke"));
      }
    });
  });

  return promise;
}

function setStyle(css) {
  var styleTag = document.getElementById("style");
  styleTag.innerHTML = "";
  var newContent = document.createTextNode(css);
  styleTag.appendChild(newContent);
}

// compile({
//   gridGutterWidth: '100px'
// });

// $("button").click(function () {
//   compile({
//     gridGutterWidth: "100px",
//   });
// });

const factors = (number) =>
  Array.from(Array(number + 1), (_, i) => i).filter((i) => number % i === 0);

console.log(factors(12));

function row(cols) {
  var rowHolder = document.getElementById("row-holder");
  var row = document.createElement("div");
  row.setAttribute("class", "row");
  rowHolder.appendChild(row);
  for (let i = 0; i < cols; i++) {
    var col = document.createElement("div");
    col.setAttribute("class", "col");
    col.innerHTML = "<div>" + (i + 1) + "</div>";
    row.appendChild(col);
  }

  var rowHolder2 = document.getElementById("row-holder-2");
  var row2 = document.createElement("div");
  row2.setAttribute("class", "row");
  rowHolder2.appendChild(row2);
  for (let i = 0; i < cols; i++) {
    var col = document.createElement("div");
    col.setAttribute("class", "col");
    col.innerHTML = "<div>" + (i + 1) + "</div>";
    row2.appendChild(col);
  }
}

function run(options = {}) {
  $('body').addClass('loading');
  var options2 = Object.assign(appOptions, options);
  compile(options2).then(function (css) {
    $("#row-holder").html("");
    $("#row-holder-2").html("");
    var gridFactors = factors(options2.columns);
    gridFactors.reverse().forEach((element) => {
      row(element);
    });
    setStyle(css);
    resize();
    $('body').removeClass('loading');
  });
}

//run(12);

$("form").submit(function (e) {
  e.preventDefault();
  var cols = parseInt($("#columns").val());
  var gutterWidth = parseInt($("#gutter-width").val());
  console.log(cols);
  run({
    columns: cols,
    gridGutterWidth: gutterWidth,
  });
});

function init() {
  $.get("../style.scss", function (data) {
    console.log("Load was performed.");
    appScss = data;
    // compile().then(function (css) {
    //   setStyle(css);
      run({
        //columns: 9
      });
    //});
  });
}
init();









function resize() {
  var windowWidth = $(window).width();
  $('#window-width').text(windowWidth);
  $('#container-width').text($('#container').width());
  $('#container-fluid-width').text($('#container-fluid').width());

  var breakpoint = "";
  if(windowWidth >= 1200) {
    breakpoint = "xl";
  } else if(windowWidth >= 992) {
    breakpoint = "lg";
  } else if(windowWidth >= 768) {
    breakpoint = "md";
  } else if(windowWidth >= 576) {
    breakpoint = "sm";
  } else {
    breakpoint = "xs";
  }

  $('#window-breakpoint').text(breakpoint);
}

$(window).resize( function() {
  resize();
});