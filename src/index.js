// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var InputSurface = require('famous/surfaces/InputSurface');

// create the main context
var mainContext = Engine.createContext();

// your app here
var logo = new ImageSurface({
  size: [200, 200],
  content: 'images/famous_logo.png',
  classes: ['backfaceVisibility']
});

var ipt = new InputSurface({
  type: 'range'
});

var initialTime = Date.now();
var centerSpinModifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return Transform.rotateY((.008 - ((100 - ipt.getValue()) / 10000)) * (Date.now() - initialTime));
  }
});

var centered = new Modifier({
  align: [0.5, 0.8],
  origin: [0.5, 0.5],
  size: [200, 50],
});

mainContext.add(centered).add(ipt);

mainContext.add(centerSpinModifier).add(logo);
