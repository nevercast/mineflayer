var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , assert = require('assert')


module.exports = Tile;
function Tile() {
  EventEmitter.call(this);

  this.window = null;
}

util.inherits(Tile, EventEmitter);