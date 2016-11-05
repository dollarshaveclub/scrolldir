(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.scrollIntent = factory());
}(this, (function () { 'use strict';

/* global $ */

//
// scrollIntent
//
// Sets html[scroll-intent="up"] or html[scroll-intent="down"]
//
var $document = $(document);
var $html = $('html');
var $window = $(window);
var historyLength = 32; // Ticks to keep in history.
var historyMaxAge = 512; // History data time-to-live (ms).
var thresholdPixels = 64; // Ignore moves smaller than this.
var history = Array(historyLength);
var dir = 'down'; // 'up' or 'down'
var e = void 0; // last scroll event
var pivot = void 0; // "high-water mark"
var pivotTime = 0;

var tick = function tickFunc() {
  var y = $window.scrollTop();
  var t = e.timeStamp;
  var furthest = dir === 'down' ? Math.max : Math.min;

  // Apply bounds to handle rubber banding
  var yMax = $document.height() - $window.height();
  y = Math.max(0, y);
  y = Math.min(yMax, y);

  // Update history
  history.unshift({ y: y, t: t });
  history.pop();

  // Are we continuing in the same direction?
  if (y === furthest(pivot, y)) {
    // Update "high-water mark" for current direction
    pivotTime = t;
    pivot = y;
    return;
  }
  // else we have backed off high-water mark

  // Apply max age to find current reference point
  var cutoffTime = t - historyMaxAge;
  if (cutoffTime > pivotTime) {
    pivot = y;
    for (var i = 0; i < historyLength; i += 1) {
      if (!history[i] || history[i].t < cutoffTime) break;
      pivot = furthest(pivot, history[i].y);
    }
  }

  // Have we exceeded threshold?
  if (Math.abs(y - pivot) > thresholdPixels) {
    pivot = y;
    pivotTime = t;
    dir = dir === 'down' ? 'up' : 'down';
    $html.attr('scroll-intent', dir);
  }
};

var handler = function handlerFunc(event) {
  e = event;
  window.requestAnimationFrame(tick);
};

function scrollIntent(o) {
  if (o === 'off') return $window.off('scroll', handler);
  pivot = $window.scrollTop();
  $html.attr('scroll-intent', dir);
  return $window.on('scroll', handler);
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
