var util = require('util')
  , assert = require('assert')
  , Item = require('../item')
  , Window = require('./window');

function EnchantmentTableWindow(id, title, slotCount) {
  // this window incorrectly reports the number of slots as 9. it should be 1.
  Window.call(this, id, 4, title, 1);
}

module.exports = EnchantmentTableWindow;
util.inherits(EnchantmentTableWindow, Window);

EnchantmentTableWindow.prototype.inventorySlotStart = 1;

EnchantmentTableWindow.prototype.acceptUniqueClick = function(click) {
  if (click.slot === 0) {
    // this is technically incorrect. there are some exceptions to enchantment
    // table slot clicks but we're going to bank on them not being used.
    this.acceptNonInventorySwapAreaClick(click);
  }
}