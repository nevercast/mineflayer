var util = require('util')
  , assert = require('assert')
  , Item = require('../item')
  , Window = require('./window');

function FurnaceWindow(id, title, slotCount) {
  Window.call(this, id, 2, title, slotCount);
}

module.exports = FurnaceWindow;
util.inherits(FurnaceWindow, Window);

FurnaceWindow.prototype.inventorySlotStart = 3;

FurnaceWindow.prototype.acceptUniqueClick = function(click) {
  this.acceptNonInventorySwapAreaClick(click);
}