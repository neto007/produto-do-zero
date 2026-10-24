const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const itemService = require('./services/itemService');

app.use(bodyParser.json());

// AC1, AC5: Adicionar novo item
app.post('/items', (req, res) => {
  const { name, quantity } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ error: 'Quantidade deve ser um número positivo' });
  }

  const newItem = itemService.addItem(name, quantity);
  res.status(201).json(newItem);
});

// AC2: Marcar como comprado
app.patch('/items/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  if (status !== 'comprado') {
    return res.status(400).json({ error: 'Status inválido' });
  }

  const item = itemService.findItemById(id);
  if (!item) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  item.status = 'comprado';
  res.status(200).json(item);
});

// AC3: Consultar pendentes
app.get('/items/pending', (req, res) => {
  const pending = itemService.findPendingItems();
  res.status(200).json(pending);
});

// AC4: Limpar comprados
app.delete('/items/bought', (req, res) => {
  const wasRemoved = itemService.removeBoughtItems();
  if (wasRemoved) {
    res.status(204).send();
  } else {
    res.status(200).json({ message: 'Nenhum item comprado para remover' });
  }
});

module.exports = app;
