# wHumanMsg.js

A jQuery humanized message plugin. [Check out the live demo](http://www.websanova.com/plugins/humanmsg/jquery).


## Settings

Available options with notes, the values here are the defaults.

```javascript
$('#elem').wHumanMsg({
    theme           : 'black',      // set theme (color)
    opacity         : 0.8,          // set background opacity
    fadeIn          : 1000,         // set fade in speed in milliseconds
    fadeOut         : 1000,         // set fade out speed in milliseconds
    displayLength   : 5000,         // set length of time message will stay before fadeOut in milliseconds
    html            : true,         // set html flag to true/false
    fixed           : true,         // set fixed positioning to keep message at top of screen even when scrolling
    offsetTop       : 0,            // set offset from top
    showCloseButton : true          // toggle message close button
});
```

Update settings on the fly:

```javascript
$('#elem').wHumanMsg('opacity', 0.6);
```

Retrieve settings, if more than one it will return an array otherwise just the value.

```javascript
console.log($('#elem').wHumanMsg('opacity'));            // "0.8"
console.log($('.elem').wHumanMsg('opacity'));            // ["0.8", "0.5"]
```

## Methods

```html
$('#elem').wHumanMsg('reset');
```


## Examples

Init and display message:

```javascript
$("body").wHumanMsg();
$("body").wHumanMsg('Hello World');
```

Init some settings:

```javascript
$("body").wHumanMsg({fixed: false, offsetTop: 20, showCloseButton: false, theme:'green');
$('body').wHumanMsg('Hello World!');
```

Change color on the fly:

```javascript
$("body").wHumanMsg();
$('body').wHumanMsg('Hello World!', {theme: 'red'});
```


## Resources

* [jQuery Plugin Development Boilerplate](http://www.websanova.com/tutorials/jquery/jquery-plugin-development-boilerplate)
* [The Ultimate Guide to Writing jQuery Plugins](http://www.websanova.com/tutorials/jquery/the-ultimate-guide-to-writing-jquery-plugins)


## License

MIT licensed

Copyright (C) 2011-2012 Websanova http://www.websanova.com