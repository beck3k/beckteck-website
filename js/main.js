var names = ["Beck", "B", "Teck", "T"];

class logoTweaks {
  changeText(old, newn) {
    $('svg.scroll-shrinkable').find("tspan:contains('" + old + "')").text(newn);
  }
  moveText(text, x, y) {
    $('svg.scroll-shrinkable').find("tspan:contains('" + text + "')").attr("x", x);
    $('svg.scroll-shrinkable').find("tspan:contains('" + text + "')").attr("y", y);
  }
}

lt = new logoTweaks();

$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav.scroll-shrinkable').addClass('nav-small');
    $('svg.scroll-shrinkable').addClass('svg-small');
    lt.changeText(names[0], names[1]);
    lt.changeText(names[2], names[3]);
    lt.moveText("T", 495.95773, 500);//Text small, centered, and same line
    lt.moveText("B", 432.95773, 500)
  } else {
    $('nav.scroll-shrinkable').removeClass('nav-small');
    $('svg.scroll-shrinkable').removeClass('svg-small');
    lt.changeText(names[1], names[0]);
    lt.changeText(names[3], names[2]);
    lt.moveText("Teck", 432.95773, 908.80585);
    lt.moveText("Beck", )
  }
});
