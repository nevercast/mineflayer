var util = require('util')
  , assert = require('assert')
  , Item = require('../item')
  , Window = require('./window');

function CraftingTableWindow(id, title, slotCount) {
  Window.call(this, id, 1, title, slotCount);
}
module.exports = CraftingTableWindow;
util.inherits(CraftingTableWindow, Window);

CraftingTableWindow.prototype.inventorySlotStart = 10;

CraftingTableWindow.prototype.acceptUniqueClick = function(click) {
  if (click.slot === 0) {
    this.acceptCraftingClick(click);
  } else if (click.slot >= 1 && click.slot < 10) {
    this.acceptNonInventorySwapAreaClick(click);
  }
};