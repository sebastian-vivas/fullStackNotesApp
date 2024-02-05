import * as chai from 'chai';
import noteRoutes from '../routes/notes.mjs';
import supertest from 'supertest';

const { expect } = chai;
const request = supertest(noteRoutes);

describe('Note Routes', () => {
  const testNoteId = 'foo';

  it('should get notes', async () => {
    const res = await request.get('/note');
    expect(res).to.have.status(200);
  });

  it('should get a note by ID', async () => {
    const res = await request.get(`/note/${testNoteId}`);
    expect(res).to.have.status(200);
  });

  it('should add a new note', async () => {
    const res = await request.post('/note/add').send({ note: 'Your new note' });
    expect(res).to.have.status(200);
  });

  it('should update star status of a note', async () => {
    const res = await request.put(`/updateStar/${testNoteId}`).send({ starred: true });
    expect(res).to.have.status(200);
  });

  it('should update pin status of a note', async () => {
    const res = await request.put(`/updatePin/${testNoteId}`).send({ pinned: true });
    expect(res).to.have.status(200);
  });

  it('should delete a note by ID', async () => {
    const res = await request.delete(`/note/${testNoteId}`);
    expect(res).to.have.status(200);
  });
});