const request = require('supertest');
const app = require('../src/app');
const itemService = require('../src/services/itemService');

beforeEach(() => {
  itemService.clear();
});

describe('Lista de Compras API', () => {
  describe('POST /items', () => {
    it('should create a new item (AC1)', async () => {
      const response = await request(app)
        .post('/items')
        .send({ name: 'Leite', quantity: 2 });
      
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Leite');
      expect(response.body.quantity).toBe(2);
      expect(response.body.status).toBe('pendente');
    });

    it('should return 400 for empty name (AC5)', async () => {
      const response = await request(app)
        .post('/items')
        .send({ name: '', quantity: 2 });
      
      expect(response.statusCode).toBe(400);
    });

    it('should return 400 for negative quantity (AC5)', async () => {
      const response = await request(app)
        .post('/items')
        .send({ name: 'Pão', quantity: -1 });
      
      expect(response.statusCode).toBe(400);
    });
  });

  describe('PATCH /items/:id/status', () => {
    it('should update item status to comprado (AC2)', async () => {
      const createRes = await request(app)
        .post('/items')
        .send({ name: 'Café', quantity: 1 });
      const id = createRes.body.id;

      const updateRes = await request(app)
        .patch(`/items/${id}/status`)
        .send({ status: 'comprado' });

      expect(updateRes.statusCode).toBe(200);
      expect(updateRes.body.status).toBe('comprado');
    });
  });

  describe('GET /items/pending', () => {
    it('should return only pending items (AC3)', async () => {
      await request(app).post('/items').send({ name: 'Leite', quantity: 2 });
      
      const createRes = await request(app).post('/items').send({ name: 'Pão', quantity: 1 });
      const id = createRes.body.id;
      await request(app).patch(`/items/${id}/status`).send({ status: 'comprado' });

      const response = await request(app).get('/items/pending');
      
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe('Leite');
    });
  });

  describe('DELETE /items/bought', () => {
    it('should remove all bought items (AC4)', async () => {
      await request(app).post('/items').send({ name: 'Leite', quantity: 2 });
      
      const createRes = await request(app).post('/items').send({ name: 'Pão', quantity: 1 });
      const id = createRes.body.id;
      await request(app).patch(`/items/${id}/status`).send({ status: 'comprado' });

      const response = await request(app).delete('/items/bought');
      
      expect(response.statusCode).toBe(204);

      const pendingRes = await request(app).get('/items/pending');
      expect(pendingRes.body.length).toBe(1);
      expect(pendingRes.body[0].name).toBe('Leite');
    });
  });
});
