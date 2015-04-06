var webpack = require('webpack');
var isDevServer = process.argv.join('').indexOf('webpack-dev-server') > -1;
var ReloadPlugin = require('webpack-reload-plugin');
var CordovaPlugin = require('webpack-cordova-plugin');

var pkg = require('./package.json');
var version = pkg.version;
var argv = require('optimist')
  //--env=XXX: sets a global ENV variable (i.e. window.ENV="XXX")
  .alias('e','env').default('e','dev')
  //--minify:  minifies output
  .alias('m','minify')
  .argv;

var config  = {
  entry: "./src/index.js",
  output: {
    path: './www',
    filename: "bundle.js",
    publicPath: isDevServer ? '../': '',
  },
  devServer: {
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version),
      ENV: JSON.stringify(argv.env)
    }),
    new ReloadPlugin(isDevServer? 'localhost': false)
  ]
};

if(argv.minify){
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle:false}));
}

if (argv.cordova) {
  config.plugins.push(new CordovaPlugin({
    config: 'config.xml',  // Location of Cordova' config.xml (will be created if not found) 
    src: 'index.html',     // Set entry-point of cordova in config.xml 
    platform: 'ios', // (or 'android') // Set `webpack-dev-server` to correct `contentBase` to use Cordova plugins. 
    version: true,         // Set config.xml' version. (true = use version from package.json) 
  }));
}

module.exports = config;