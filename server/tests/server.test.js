import { expect } from 'chai';
import app from '../server.mjs';
import supertest from 'supertest';
import { createServer } from 'http';

const request = supertest(createServer(app));

describe('App', () => {
  it('should start the server and return "Server is running on port: 8080"', async () => {
    const res = await request.get('/');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Server is running on port: 8080');
  });
});