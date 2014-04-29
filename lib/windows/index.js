var INVENTORY_SLOT_COUNT = 36;

/* Load windows */
var Window = require('./window'),
  InventoryWindow = require('./inventoryWindow'),
  ChestWindow = require('./chestWindow'),
  CraftingTableWindow = require('./craftingTableWindow'),
  FurnaceWindow = require('./furnaceWindow'),
  DispenserWindow = require('./dispenserWindow'),
  EnchantmentTableWindow = require('./enchantmentTableWindow'),
  BrewingStandWindow = require('./brewingStandWindow');


module.exports = {
  createWindow: createWindow,
  Window: Window,
  InventoryWindow: InventoryWindow,
  ChestWindow: ChestWindow,
  CraftingTableWindow: CraftingTableWindow,
  FurnaceWindow: FurnaceWindow,
  DispenserWindow: DispenserWindow,
  EnchantmentTableWindow: EnchantmentTableWindow,
  BrewingStandWindow: BrewingStandWindow,
  INVENTORY_SLOT_COUNT: INVENTORY_SLOT_COUNT,
};

var windows = [
  ChestWindow,
  CraftingTableWindow,
  FurnaceWindow,
  DispenserWindow,
  EnchantmentTableWindow,
  BrewingStandWindow,
];

function createWindow(id, type, title, slotCount) {
  return new windows[type](id, title, slotCount);
}
