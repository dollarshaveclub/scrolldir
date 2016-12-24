# ScrollDir

_ScrollDir_ is a micro Javascript library that perfectly describes a user vertical scroll direction in a `data attribute`. From there, you can do what you want with scrolldir.

### Scrolldir is perfect for:
-  showing or hiding fixed or sticky elements based on scroll direction.
-  tracking scroll direction
-  **ignore small movements** that cause unwanted sticky and fixed things to jitter or showup. Scrolldir will only change direction when the user scrolls a significant vertical amount.

## Installing from a package manager

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
[data-scrolldir="down"] #my-fixed-header { display: none; }
```

## Options

To use an attribute besides `data-scrolldir`:
```javascript
scrolldir({attribute: 'new-attribute-name'});

To add the Scrolldir attribute to a different element:
```javascript
scrolldir({el: 'your-new-selector'});

To turn Scrolldir off:
```javascript
scrolldir({off});

## Examples
TODO

