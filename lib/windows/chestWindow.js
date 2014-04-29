var util = require('util')
  , assert = require('assert')
  , Item = require('../item')
  , Window = require('./window');

function ChestWindow(id, title, slotCount) {
  Window.call(this, id, 0, title, slotCount);

  this.inventorySlotStart = slotCount > 62 ? 54 : 27;
}

module.exports = ChestWindow;
util.inherits(ChestWindow, Window);

ChestWindow.prototype.chestItems = function() {
  return this.itemsRange(0, this.inventorySlotStart);
};

ChestWindow.prototype.chestCount = function(itemType, metadata) {
  itemType = parseInt(itemType, 10); // allow input to be a string
  return this.countRange(0, this.inventorySlotStart, itemType, metadata);
};

ChestWindow.prototype.findChestItem = function(itemType, metadata, notFull) {
  itemType = parseInt(itemType, 10); // allow input to be a string
  return this.findItemRange(0, this.inventorySlotStart, itemType, metadata, notFull);
};

ChestWindow.prototype.firstEmptyChestSlot = function() {
  return this.firstEmptySlotRange(0, this.inventorySlotStart);
};

ChestWindow.prototype.acceptUniqueClick = function(click) {
  assert.ok(click.slot >= 0);
  assert.ok(click.slot < this.inventorySlotStart);
  this.acceptNonInventorySwapAreaClick(click);
};