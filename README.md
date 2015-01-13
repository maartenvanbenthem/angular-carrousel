angular-carrousel
=================

A real simple lazy loading image carrousel directive for Angular. I made this app as an exersice for setting up an Angular application with unit tests and end to end testing. Also the directive is made available as a Bower package.

Install with [Bower](http://bower.io): `bower install dm-angular-carrousel`.

Demo: http://www.damsko-media.nl/angular-carrousel

## How to use :

Download the directive and the css file (or install with [Bower](http://bower.io): `bower install dm-angular-carrousel`) and make it available in your Angular application.

```
├── dist
	├── js
		|── DmCarrousel.js
├── 
	├── stylesheets
		├── style.css

```

Create an imageData object in the scope of your application with the image data objects in it like ie.:

```
var imageData = [
	{
        name: "Image 1",
        path: "http://lorempixel.com/600/300/nature/1"
    },
    {
        name: "Image 2",
        path: "http://lorempixel.com/600/300/nature/2"
    },
    {
        name: "Image 3",
        path: "http://lorempixel.com/600/300/nature/3"
    },
    {
        name: "Image 4",
        path: "http://lorempixel.com/600/300/nature/4"
    },
    {
        name: "Image 5",
        path: "http://lorempixel.com/600/300/nature/5"
    },
    {
        name: "Image 6",
        path: "http://lorempixel.com/600/300/nature/6"
    }
]
```

Then place the directive in your HTML and send the imageData object with it:

```
<dm-carrousel image-data="imageData"></dm-carrousel>
```
Make sure you have added the module to your app

```
var app = angular.module('App', [
	'dmCarrousel'
])
```


## Todo :
 - ~~basic setup~~
 - ~~create the carrousel directive~~
 	- ~~carrousel mechanism~~
 	- ~~lazyloading~~
 	- ~~updating css for animation~~
 	- converting css to js for rotating images?
 - ~~unit tests in karma~~
 - ~~end-to-end tests in protractor~~
 - ~~bower packaging~~
 


