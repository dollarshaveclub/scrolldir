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
const $document = $(document);
const $html = $('html');
const $window = $(window);

const defaults = {
  history_length: 100,
  history_max_age: 1000,
  threshold_pixels: 100,
};

const options = defaults;
let dir; // 'up' or 'down'
let e; // last scroll event
let history; // data array
let pivotTime; // "high-water mark" time
let pivot; // "high-water mark"

const tick = function tickFunc() {
  let y = $window.scrollTop();
  const t = e.timeStamp;
  const furthest = dir === 'down' ? Math.max : Math.min;

  // Apply bounds to handle rubber banding
  const yMax = $document.height() - $window.height();
  y = Math.max(0, y);
  y = Math.min(yMax, y);

  // Update history
  history.unshift({ y, t });
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
  const cutoffTime = t - options.history_max_age;
  if (cutoffTime > pivotTime) {
    pivot = y;
    for (let i = 0; i < options.history_length; i += 1) {
      if (!history[i] || history[i].t < cutoffTime) break;
      pivot = furthest(pivot, history[i].y);
    }
  }

  // Have we exceeded threshold?
  if (Math.abs(y - pivot) > options.threshold_pixels) {
    pivot = y;
    pivotTime = t;
    dir = dir === 'down' ? 'up' : 'down';
    $html.attr('scroll-intent', dir);
  }
};

const handler = function handlerFunc(event) {
  e = event;
  window.requestAnimationFrame(tick);
};

export default function scrollIntent(o) {
  if (o === 'off' || (o || {}).off) return $window.off('scroll', handler);
  $.extend(options, o || {});
  dir = 'down';
  history = Array(options.history_length);
  pivotTime = 0;
  pivot = $window.scrollTop();
  $window.on('scroll', handler);
  return $html.attr('scroll-intent', dir);
}

const plugin = window.$ || window.jQuery || window.Zepto;
if (plugin) {
  plugin.fn.extend({
    scrollIntent: function scrollIntentFunc(o) {
      return scrollIntent(o);
    },
  });
} else {
  throw Error('scroll-intent requires jQuery or Zepto');
}
