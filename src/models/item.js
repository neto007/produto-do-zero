class Item {
  constructor(name, quantity) {
    this.id = parseInt(Math.random() * 1000000, 10); // Simple numeric ID for now
    this.name = name;
    this.quantity = quantity;
    this.status = 'pendente';
  }
}

module.exports = Item;
