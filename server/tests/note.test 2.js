import request from 'supertest';
import app from '../server.mjs';
import { expect } from 'chai';

describe('Note Routes Tests', () => {
  let testNoteId;

  it('should get all notes', async () => {
    const response = await request(app).get('/note');
    expect(response.status).to.equal(200);
  });

  it('should add a new note', async () => {
    const newNote = {
      note: 'Test Note',
      starred: false,
      pinned: false,
    };

    const response = await request(app).post('/note/add').send(newNote);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('insertedCount', 1);

    testNoteId = response.body.insertedId;
  });

  it('should get a specific note by ID', async () => {
    const response = await request(app).get(`/note/${testNoteId}`);
    expect(response.status).to.equal(200);
  });

  it('should update the star status of a note', async () => {
    const response = await request(app)
      .put(`/updateStar/${testNoteId}`)
      .send({ starred: true });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('modifiedCount', 1);
  });

  it('should update the pin status of a note', async () => {
    const response = await request(app)
      .put(`/updatePin/${testNoteId}`)
      .send({ pinned: true });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('modifiedCount', 1);
  });

  it('should delete a note by ID', async () => {
    const response = await request(app).delete(`/${testNoteId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('deletedCount', 1);
  });
});
