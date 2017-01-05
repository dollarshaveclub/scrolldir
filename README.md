# ScrollDir 🔺 || 🔻

_ScrollDir_ is a micro Javascript library that perfectly describes user vertical scroll direction in a html data attribute. From there, do what want.💪

### Scrolldir is perfect for:
-  showing or hiding sticky elements based on scroll direction.
-  tracking events on scroll direction
-  **ignoring small scroll movements** that cause unwanted jitters. Scrolldir will only change direction when the user scrolls a significant vertical amount.

<!-- ## Installing from a package manager -->
## Package manager install directions coming very very very soonish. 🌴
<!-- 
npm
```sh
npm install scrolldir --save
```
bower
```sh
bower install scrolldir --save
```
yarn
```sh
yarn add scrolldir 
```
-->

## Setup 

Add **dist/scrolldir.min.js**.

## Basic Usage

```javascript
scrollDir();
```
By default ScrollDir will set the `data-scrolldir` attribute on the `<html>` element to `up` or `down`:

```html
<html data-scrolldir="up">
```
or
```html
<html data-scrolldir="down">
```

You can then change your styling based on vertical scroll direction.

```css
[data-scrolldir="down"] .my-fixed-header { display: none; }
```

## Options

To use an attribute besides `data-scrolldir`:
```javascript
scrolldir({attribute: 'new-attribute-name'});
```

To add the Scrolldir attribute to a different element:
```javascript
scrolldir({el: 'your-new-selector'});
```

To turn Scrolldir off:
```javascript
scrolldir({off});
```

## Examples coming very very very soonish 🌴



