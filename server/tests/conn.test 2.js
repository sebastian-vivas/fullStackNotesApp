import { expect } from 'chai';
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { connectToServer, getDb } from '../db/conn.mjs';

chai.use(chaiHttp);

describe('MongoDB Connection', () => {
  it('should connect to MongoDB successfully', (done) => {
    connectToServer((err) => {
      expect(err).to.be.null;
      done();
    });
  });

  it('should return MongoDB database', () => {
    const db = getDb();
    expect(db).to.exist;
  });
});
