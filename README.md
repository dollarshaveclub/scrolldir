# scroll-intent.js

__Scroll-Intent__ is a micro library that does one thing __perfectly__: track whether a user is scrolling up or down.
This is useful for tracking events and dealing with sticky or fixed elements.

Ever been annoyed by fixed headers which pop up if you accidentally touch your screen the wrong way?
Or you scroll down but your finger drifts up just a little bit at the end and now your view is blocked by huge toolbars?

The key logic which makes this plugin special is its ability to ignore small movements.
It will only change direction when the user scrolls a significant amount, when the user has __intent__ to scroll in that direction.

## Usage
Scroll-Intent is dead simple to use.

```javascript
$(window).scrollIntent();
```

Scroll-intent will set the `scroll-intent` attribute on the `<html>` element to `up` or `down`:

```html
<html scroll-intent="up">
```
or
```html
<html scroll-intent="down">
```

Now you have a hook to use in your CSS.

```css
[scroll-intent="down"] #my-fixed-header { display: none; }
```

It’s that simple! It just works. Perfectly. Like magic.

### Example
[JS Bin demo](http://jsbin.com/xoxiniwumi)

### In the wild
[Dollarshaveclub Content](http://content.dollarshaveclub.com)

## Notes

If you want to stop the scroll event handler when it is not needed (for optimal performance):
```javascript
$(window).scrollIntent('off');
```

### Contributing

```
rollup -c           # build `dist/scroll-intent.js`
gulp                # test and build `dist/scroll-intent.min.js`
```
