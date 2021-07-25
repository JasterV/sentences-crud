import sentencesData from './mock/sentences'
import supertest from 'supertest'
import app from './setup/app'
import { mockDb } from './mock/firebase'
import { mockConfig } from './mock/config'

const request = supertest(app)

beforeAll(() => {
  // Create a fake Firestore with sentences
  mockDb.mocker.loadCollection('sentences', sentencesData)
})

describe('Test sentences api', () => {

  it('can get sentence by Id', async () => {
    expect.assertions(1)
    const sentence = sentencesData['abc123']
    const result = await request
      .get('/api/v1/sentences/abc123')
      .set('Authorization', `Bearer ${mockConfig.secret}`)
    expect(result.body).toMatchObject({
      success: true,
      data: expect.objectContaining(sentence)
    })
  });

});
