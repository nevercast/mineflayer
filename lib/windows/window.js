var util = require('util')
  , assert = require('assert')
  , Item = require('../item')

function Window(id, type, title, slotCount) {
  this.id = id;
  this.type = type;
  this.title = title;
  this.slots = new Array(slotCount);
  // in vanilla client, this is the item you are holding with the
  // mouse cursor
  this.selectedItem = null;
}

module.exports = Window;

Window.prototype.findItemRange = function(start, end, itemType, metadata, notFull) {
  assert.notEqual(itemType, null);
  for (var i = start; i < end; ++i) {
    var item = this.slots[i];
    if (item && itemType === item.type &&
       (metadata == null || metadata === item.metadata) &&
       (!notFull || item.count < item.stackSize))
    {
      return item;
    }
  }
  return null;
};

Window.prototype.findInventoryItem = function(itemType, metadata, notFull) {
  assert.ok(this.inventorySlotStart != null);

  var end = this.inventorySlotStart + INVENTORY_SLOT_COUNT;
  return this.findItemRange(this.inventorySlotStart, end, itemType, metadata, notFull);
};

Window.prototype.firstEmptySlotRange = function(start, end) {
  for (var i = start; i < end; ++i) {
    if (!this.slots[i]) return i;
  }
  return null;
};

Window.prototype.firstEmptyInventorySlot = function() {
  var end = this.inventorySlotStart + INVENTORY_SLOT_COUNT;
  return this.firstEmptySlotRange(this.inventorySlotStart, end);
};

Window.prototype.acceptClick = function(click) {
  assert.ok(click.mouseButton === 0 || click.mouseButton === 1);
  var invSlotEnd = this.inventorySlotStart + INVENTORY_SLOT_COUNT;
  if (click.slot === -999) {
    this.acceptOutsideWindowClick(click);
  } else if (click.slot >= this.inventorySlotStart && click.slot < invSlotEnd) {
    this.acceptInventoryClick(click);
  } else {
    this.acceptUniqueClick(click);
  }
};

Window.prototype.acceptOutsideWindowClick = function(click) {
  assert.strictEqual(click.mode, 0, "unimplemented");
  if (click.mouseButton === 0) {
    this.selectedItem = null;
  } else if (click.mouseButton === 1) {
    this.selectedItem.count -= 1;
    if (! this.selectedItem.count) this.selectedItem = null;
  } else {
    assert.ok(false, "unimplemented");
  }
}

Window.prototype.acceptInventoryClick = function(click) {
  if (click.mouseButton === 0) {
    if (click.mode > 0) {
      assert.ok(false, "unimplemented");
    } else {
      this.acceptSwapAreaLeftClick(click);
    }
  } else if (click.mouseButton === 1) {
    this.acceptSwapAreaRightClick(click);
  } else {
    assert.ok(false, "unimplemented");
  }
};

Window.prototype.acceptNonInventorySwapAreaClick = function(click) {
  assert.strictEqual(click.mode, 0, "unimplemented");
  if (click.mouseButton === 0) {
    this.acceptSwapAreaLeftClick(click);
  } else if (click.mouseButton === 1) {
    this.acceptSwapAreaRightClick(click);
  } else {
    assert.ok(false, "unimplemented");
  }
};


Window.prototype.acceptSwapAreaRightClick = function(click) {
  assert.strictEqual(click.mouseButton, 1);
  assert.strictEqual(click.mode, 0);

  var item = this.slots[click.slot];
  if (this.selectedItem) {
    if (item) {
      if (item.type === this.selectedItem.type &&
          item.metadata === this.selectedItem.metadata)
      {
        item.count += 1;
        this.selectedItem.count -= 1;
        if (this.selectedItem.count === 0) this.selectedItem = null;
      } else {
        // swap selected item and window item
        this.updateSlot(click.slot, this.selectedItem);
        this.selectedItem = item;
      }
    } else {
      if (this.selectedItem.count === 1) {
        this.updateSlot(click.slot, this.selectedItem);
        this.selectedItem = null;
      } else {
        this.updateSlot(click.slot, new Item(this.selectedItem.type, 1,
              this.selectedItem.metadata, this.selectedItem.nbt));
        this.selectedItem.count -= 1;
      }
    }
  } else if (item) {
    // grab 1/2 of item
    this.selectedItem = new Item(item.type, Math.ceil(item.count / 2),
        item.metadata, item.nbt);
    item.count -= this.selectedItem.count;
    if (item.count === 0) this.updateSlot(item.slot, null);
  }
}

Window.prototype.acceptSwapAreaLeftClick = function(click) {
  assert.strictEqual(click.mouseButton, 0);
  assert.strictEqual(click.mode, 0);
  var item = this.slots[click.slot];
  if (item && this.selectedItem &&
      item.type === this.selectedItem.type &&
      item.metadata === this.selectedItem.metadata)
  {
    // drop as many held item counts into the slot as we can
    var newCount = item.count + this.selectedItem.count;
    var leftover = newCount - item.stackSize;
    if (leftover <= 0) {
      item.count = newCount;
      this.selectedItem = null;
    } else {
      item.count = item.stackSize;
      this.selectedItem.count = leftover;
    }
  } else {
    // swap selected item and window item
    var tmp = this.selectedItem;
    this.selectedItem = item;
    this.updateSlot(click.slot, tmp);
  }
};

Window.prototype.updateSlot = function (slot, newItem) {
  if (newItem) newItem.slot = slot;
  this.slots[slot] = newItem;
};

Window.prototype.acceptUniqueClick = function(click) {
  assert.ok(false, "override this method");
};

Window.prototype.countRange = function(start, end, itemType, metadata) {
  var sum = 0;
  for (var i = start; i < end; ++i) {
    var item = this.slots[i];
    if (item && itemType === item.type &&
       (metadata == null || item.metadata === metadata))
    {
      sum += item.count;
    }
  }
  return sum;
};

Window.prototype.itemsRange = function(start, end) {
  var results = [];
  for (var i = start; i < end; ++i) {
    var item = this.slots[i];
    if (item) results.push(item);
  }
  return results;
};

Window.prototype.count = function(itemType, metadata) {
  itemType = parseInt(itemType, 10); // allow input to be string
  assert.ok(this.inventorySlotStart != null);

  var end = this.inventorySlotStart + INVENTORY_SLOT_COUNT;
  return this.countRange(this.inventorySlotStart, end, itemType, metadata);
};

Window.prototype.items = function() {
  assert.ok(this.inventorySlotStart != null);
  var end = this.inventorySlotStart + INVENTORY_SLOT_COUNT;
  return this.itemsRange(this.inventorySlotStart, end);
};

Window.prototype.emptySlotCount = function() {
  var end = this.inventorySlotStart + INVENTORY_SLOT_COUNT;
  var count = 0;
  for (var i = this.inventorySlotStart; i < end; ++i) {
    if (!this.slots[i]) count += 1;
  }
  return count;
};

Window.prototype.transactionRequiresConfirmation = function(click) {
  return true;
};

Window.prototype.acceptCraftingClick = function(click) {
  assert.strictEqual(click.mouseButton, 0);
  assert.strictEqual(click.mode, 0);
  assert.equal(this.selectedItem, null);
  this.acceptNonInventorySwapAreaClick(click);
};
