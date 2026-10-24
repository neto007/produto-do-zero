const Item = require('../models/item');
const items = [];

module.exports = {
  items,
  addItem: (name, quantity) => {
    const newItem = new Item(name, quantity);
    items.push(newItem);
    return newItem;
  },
  findItemById: (id) => items.find(item => item.id === id),
  findPendingItems: () => items.filter(item => item.status === 'pendente'),
  removeItemById: (id) => {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      return items.splice(index, 1)[0];
    }
    return null;
  },
  removeBoughtItems: () => {
    const initialLength = items.length;
    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i].status === 'comprado') {
        items.splice(i, 1);
      }
    }
    return items.length < initialLength;
  },
  clear: () => {
    items.length = 0;
  }
};
