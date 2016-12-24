export default function scrollDir(opts) {
  const defaults = {
    el: document.documentElement,
    attribute: 'data-scrolldir',
  };
  const el = (opts && opts.el) || defaults.el;
  const attribute = (opts && opts.attribute) || defaults.attribute;
  if (opts && opts.off === true) {
    return el.setAttribute('data-scrolldir', 'off');
  }
  const body = document.body;
  const historyLength = 32; // Ticks to keep in history.
  const historyMaxAge = 512; // History data time-to-live (ms).
  const thresholdPixels = 64; // Ignore moves smaller than this.
  const history = Array(historyLength);
  let dir = 'down'; // 'up' or 'down'
  let e; // last scroll event
  let pivot; // "high-water mark"
  let pivotTime = 0;

  const tick = function tickFunc() {
    let y = window.scrollY;
    const t = e.timeStamp;
    const furthest = dir === 'down' ? Math.max : Math.min;

    // Apply bounds to handle rubber banding
    const yMax = body.offsetHeight - window.innerHeight;
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
      el.setAttribute(attribute, dir);
    }
  };

  const handler = function handlerFunc(event) {
    e = event;
    window.requestAnimationFrame(tick);
  };

  pivot = window.scrollY;
  el.setAttribute(attribute, dir);
  return window.addEventListener('scroll', handler);
}
