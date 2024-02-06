import request from 'supertest';
import app from '../server.mjs';
import { expect } from 'chai';

describe('Server Tests', () => {
  it('should connect to MongoDB and respond with 200 on /note endpoint', async () => {
    const response = await request(app).get('/note');
    expect(response.status).to.equal(200);
  });

  it('should respond with 404 for an endpoint that doesnt exist', async () => {
    const response = await request(app).get('/non-existing-endpoint');
    expect(response.status).to.equal(404);
  });
});
