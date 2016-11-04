(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.scrollIntent = factory());
}(this, (function () { 'use strict';

/* global $, jquery, jQuery */

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
var $document = $(document);
var $html = $('html');
var $window = $(window);

var defaults = {
  history_length: 100,
  history_max_age: 1000,
  threshold_pixels: 100
};

var options = defaults;
var dir = void 0; // 'up' or 'down'
var e = void 0; // last scroll event
var history = void 0; // data array
var pivotTime = void 0; // "high-water mark" time
var pivot = void 0; // "high-water mark"

var tick = function tickFunc() {
  var y = $window.scrollTop();
  var t = e.timeStamp;
  var furthest = dir === 'down' ? Math.max : Math.min;

  // Apply bounds to handle rubber banding
  var yMax = $document.height() - $window.height();
  y = Math.max(0, y);
  y = Math.min(yMax, y);

  // Update history
  history.push({ y: y, t: t });
  history.shift();

  // Are we continuing in the same direction?
  if (y === furthest(pivot, y)) {
    // Update "high-water mark" for current direction
    pivotTime = t;
    pivot = y;
    return;
  }
  // else we have backed off high-water mark

  // Find "high-water mark" in history since pivotTime/expiry
  var cutoffTime = Math.max(pivotTime, t - options.history_max_age);
  pivot = dir === 'down' ? 0 : Infinity;
  for (var i = 0; i < options.history_length; i += 1) {
    if (history[i] && history[i].t < cutoffTime) break;
    pivot = furthest(pivot, history[i].y);
  }

  // Have we exceeded threshold?
  if (Math.abs(y - pivot) > options.threshold_pixels) {
    pivot = y;
    pivotTime = t;
    dir = dir === 'down' ? 'up' : 'down';
    $html.attr('scroll-intent', dir);
  }
  return;
};

var handler = function handlerFunc(event) {
  e = event;
  window.requestAnimationFrame(tick);
};

function scrollIntent(o) {
  if (o === 'off' || (o || {}).off) return $window.off('scroll', handler);
  $.extend(options, o || {});
  dir = 'down';
  history = Array(options.history_length);
  pivotTime = 0;
  pivot = $window.scrollTop();
  $window.on('scroll', handler);
  return $html.attr('scroll-intent', dir);
}

var plugin = window.$ || window.jQuery || window.Zepto;
if (plugin) {
  plugin.fn.extend({
    scrollIntent: function scrollIntentFunc(o) {
      return scrollIntent(o);
    }
  });
} else {
  throw Error('scroll-intent requires jQuery or Zepto');
}

return scrollIntent;

})));
