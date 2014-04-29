var util = require('util')
  , assert = require('assert')
  , Item = require('../item')
  , Window = require('./window');

function InventoryWindow(id, title, slotCount) {
  Window.call(this, id, null, title, slotCount);
}

module.exports = InventoryWindow;
util.inherits(InventoryWindow, Window);

InventoryWindow.prototype.inventorySlotStart = 9;

InventoryWindow.prototype.acceptUniqueClick = function(click) {
  if (click.slot === 0) {
    this.acceptCraftingClick(click);
  } else if (click.slot >= 1 && click.slot < 9) {
    this.acceptNonInventorySwapAreaClick(click);
  }
}