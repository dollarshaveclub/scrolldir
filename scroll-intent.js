//
// scrollIntent
//
// Sets html[scroll-intent="up"] or html[scroll-intent="down"]
//
// Options:
// off {bool} If true, removes scroll listener.
// history_length {int} Ticks to keep in history.
// history_max_age {int} History data time-to-live (ms).
// threshold_pixels {int} Ignore moves smaller than this.
//

(function($) {

  var $html = $('html');
  var $window = $(window);
  var defaults = {
    history_length: 100,
    history_max_age: 1000,
    threshold_pixels: 100
  };
  var dir; // 'up' or 'down'
  var e; // last scroll event
  var history; // data array
  var i;
  var options = defaults;
  var pivotTime;
  var pivot;

  $.fn.scrollIntent = function (o) {
    if (o === 'off' || (o || {}).off) return $window.off('scroll', handler);
    $.extend(options, o || {});
    dir = 'down';
    history = Array(options.history_length);
    pivotTime = 0;
    pivot = $window.scrollTop();
    $window.on('scroll', handler);
    $html.attr('scroll-intent', dir);
  };

  var handler = function (event) {
    e = event;
    window.requestAnimationFrame(tick);
  };

  var tick = function () {

    var y = $window.scrollTop();
    var t = e.timeStamp;
    var max = dir === 'down' ? Math.max : Math.min;
    var min = dir === 'down' ? Math.min : Math.max;
    var zero = dir === 'down' ? 0 : Infinity;

    // Update history
    history.push({ y: y, t: t });
    history.shift();

    // Are we continuing in the same direction?
    if (y === max(pivot, y)) {
      // Update "high water mark" for current direction
      pivotTime = t;
      pivot = y;
      return;
    }
    // else we have backed off high water mark

    // Apply max age to find current reference point
    var cutoffTime = Math.max(pivotTime, e.timeStamp - options.history_max_age);
    pivot = zero;
    for (i = 0; i < options.history_length; i++) {
      if (history[i] && history[i].t > cutoffTime) {
        pivot = max(pivot, history[i].y);
      }
    }

    // Have we exceeded threshold, based on current reference point?
    if (Math.abs(y - pivot) > options.threshold_pixels) {
      pivot = y;
      pivotTime = t;
      dir = dir === 'down' ? 'up' : 'down';
      $html.attr('scroll-intent', dir);
    }
  };

}(jQuery));

$(window).scrollIntent();
