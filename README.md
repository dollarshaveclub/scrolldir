
[![Build Status](https://travis-ci.org/dollarshaveclub/scrolldir.svg?branch=master)](https://travis-ci.org/dollarshaveclub/scrolldir/)

# ScrollDir 🔺||🔻

_ScrollDir_ is a micro Javascript library that perfectly describes user vertical scroll direction in a html data attribute. From there, do what want.&nbsp;💪

### ScrollDir is perfect for:
-  showing or hiding sticky elements based on scroll direction.
-  tracking events on scroll direction
-  **ignoring small scroll movements** that cause unwanted element jitters. 
  -  Scrolldir will only change direction when the user scrolls a significant vertical amount.

## Installing from a package manager 🌴

npm
```sh
npm install scrollDir --save
```
bower
```sh
bower install scrollDir --save
```
yarn
```sh
yarn add scrolldir 
```

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
scrolldir({off: true});
```

## Examples 🌴

- [scrolldir](http://codepen.io/yowainwright/pen/9d5a6c6dcf2c17e351dcccfe98158e8b) on codepen.

This is a modular version of [pwfisher](https://github.com/pwfisher)'s [scroll-intent](https://github.com/pwfisher/scroll-intent.js). ~TY!



