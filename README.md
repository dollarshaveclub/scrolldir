# scroll-intent.js

> Scroll Intent maintains whether a webpage is being scrolled up or down

Scroll intent is a jQuery plugin that maintains a webpages scrolled direction by setting an attribute in the <html> tag to _up_ or _down_.

In example:
```
<html scroll-intent="up">
```
or
```
<html scroll-intent="down">
```
It's that simple! And it works simply well!💪

## Usage
```
$(window).scrollIntent();
```
## Example
[JS Bin demo](http://jsbin.com/zeriyu/)

## In the wild
[Dollarshaveclub Content](http://content.dollarshaveclub.com)

## Notes
Scroll Intent is a micro jQuery lib that is meant to do 1 thing perfectly, maintain whether a webpage is scrolling up or down. This is useful for tracking events and dealing with sticky or fixed elements.
