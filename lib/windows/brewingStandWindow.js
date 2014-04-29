var util = require('util')
  , assert = require('assert')
  , Item = require('../item')
  , Window = require('./window');


function BrewingStandWindow(id, title, slotCount) {
  Window.call(this, id, 5, title, slotCount);
}

module.exports = BrewingStandWindow;
util.inherits(BrewingStandWindow, Window);

BrewingStandWindow.prototype.inventorySlotStart = 5;