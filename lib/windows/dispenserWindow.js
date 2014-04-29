var util = require('util')
  , assert = require('assert')
  , Item = require('../item')
  , Window = require('./window');

function DispenserWindow(id, title, slotCount) {
  Window.call(this, id, 3, title, slotCount);
}

module.exports = DispenserWindow;
util.inherits(DispenserWindow, Window);

DispenserWindow.prototype.inventorySlotStart = 9;

DispenserWindow.prototype.dispenserItems = function() {
  return this.itemsRange(0, this.inventorySlotStart);
};

DispenserWindow.prototype.dispenserCount = function(itemType, metadata) {
  itemType = parseInt(itemType, 10); // allow input to be a string
  return this.countRange(0, this.inventorySlotStart, itemType, metadata);
};

DispenserWindow.prototype.acceptUniqueClick = function(click) {
  assert.ok(click.slot >= 0);
  assert.ok(click.slot < this.inventorySlotStart);
  this.acceptNonInventorySwapAreaClick(click);
};
