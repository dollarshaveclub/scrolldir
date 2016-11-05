/* global $ */

//
// scrollIntent
//
// Sets html[scroll-intent="up"] or html[scroll-intent="down"]
//
const $document = $(document);
const $html = $('html');
const $window = $(window);
const historyLength = 32; // Ticks to keep in history.
const historyMaxAge = 512; // History data time-to-live (ms).
const thresholdPixels = 64; // Ignore moves smaller than this.
const history = Array(historyLength);
let dir = 'down'; // 'up' or 'down'
let e; // last scroll event
let pivot; // "high-water mark"
let pivotTime = 0;

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
  const cutoffTime = t - historyMaxAge;
  if (cutoffTime > pivotTime) {
    pivot = y;
    for (let i = 0; i < historyLength; i += 1) {
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

const handler = function handlerFunc(event) {
  e = event;
  window.requestAnimationFrame(tick);
};

export default function scrollIntent(o) {
  if (o === 'off') return $window.off('scroll', handler);
  pivot = $window.scrollTop();
  $html.attr('scroll-intent', dir);
  return $window.on('scroll', handler);
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
