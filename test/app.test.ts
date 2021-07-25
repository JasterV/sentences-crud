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

  it('returns unauthorized if no auth provided', async () => {
    expect.assertions(1)
    const result = await request.get('/api/v1/sentences').expect(401)
    expect(result.body).toMatchObject({
      success: false,
      msg: 'Unauthorized'
    })
  })

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

  it('returns error 404 if sentence not found', async () => {
    expect.assertions(1)
    const result = await request
      .get('/api/v1/sentences/patata')
      .set('Authorization', `Bearer ${mockConfig.secret}`)
    expect(result.body).toMatchObject({
      success: false,
      msg: 'Sentence with id patata not found'
    })
  })

});
