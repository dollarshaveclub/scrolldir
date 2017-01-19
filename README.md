<figure align="center">
  <img alt="scrolldir banner" src="https://cloud.githubusercontent.com/assets/1074042/22093384/09f3c2a6-ddba-11e6-8706-7e63be185448.jpg" />
</figure>
<p align="center">Prefectly describes vertical scroll direction without the jitter</p>

<hr>

[![Build Status](https://travis-ci.org/dollarshaveclub/scrolldir.svg?branch=master)](https://travis-ci.org/dollarshaveclub/scrolldir/)
[![npm version](https://badge.fury.io/js/scrolldir.svg)](https://www.npmjs.com/package/scrolldir)
[![Bower version](https://badge.fury.io/bo/scrolldir.svg)](https://github.com/dollarshaveclub/scrolldir)
[![Share](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&maxAge=2592000)](https://twitter.com/home?status=ScrollDir%2C%20a%20micro%20JS%20lib%20that%20describes%20vertical%20scroll%20direction.%20https%3A%2F%2Fgithub.com%2Fdollarshaveclub%2Fscrolldir%20by%20%40pfisher42%20co%20%40yowainwright%20%40DSCEngineering)

<hr>

<h1>ScrollDir 🔺||🔻</h1>

_ScrollDir_ is a micro Javascript library that perfectly describes vertical scroll direction in a html data attribute. From there, do what want.&nbsp;💪

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
scrollDir({attribute: 'new-attribute-name'});
```

To add the Scrolldir attribute to a different element:
```javascript
scrollDir({el: 'your-new-selector'});
```

To turn Scrolldir off:
```javascript
scrollDir({off: true});
```

## Examples 🌴

- [scrolldir](http://codepen.io/yowainwright/pen/9d5a6c6dcf2c17e351dcccfe98158e8b) on codepen.

This is a modular version of [pwfisher](https://github.com/pwfisher)'s [scroll-intent](https://github.com/pwfisher/scroll-intent.js). ~TY!
