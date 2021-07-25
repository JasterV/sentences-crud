import sentencesData from './mock/sentences'
import supertest from 'supertest'
import app from './setup/app'
import { mockDb } from './mock/firebase'
import { mockConfig } from './mock/config'
import { mockAxios } from './mock/axios'

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

  it('lists all sentences', async () => {
    expect.assertions(2)
    const result = await request
      .get('/api/v1/sentences')
      .set('Authorization', `Bearer ${mockConfig.secret}`)
    expect(result.body).toMatchObject({
      success: true,
      data: expect.any(Array)
    })
    expect(result.body.data.length).toBe(Object.values(sentencesData).length)
  })

  it('lists all sentences order by category asc', async () => {
    expect.assertions(1)
    const result = await request
      .get('/api/v1/sentences?orderBy=category&order=asc')
      .set('Authorization', `Bearer ${mockConfig.secret}`)
    expect(result.body).toMatchObject({
      success: true,
      data: [
        expect.objectContaining({ category: 'beautiful' }),
        expect.objectContaining({ category: 'benefit' }),
        expect.objectContaining({ category: 'experience' }),
        expect.objectContaining({ category: 'humor' }),
        expect.objectContaining({ category: 'none' }),
        expect.objectContaining({ category: 'responsibility' }),
        expect.objectContaining({ category: 'soft' }),
        expect.objectContaining({ category: 'tech' }),
      ]
    })
  })


  it('lists all sentences order by category desc', async () => {
    expect.assertions(1)
    const result = await request
      .get('/api/v1/sentences?orderBy=category&order=desc')
      .set('Authorization', `Bearer ${mockConfig.secret}`)
    expect(result.body).toMatchObject({
      success: true,
      data: [
        expect.objectContaining({ category: 'tech' }),
        expect.objectContaining({ category: 'soft' }),
        expect.objectContaining({ category: 'responsibility' }),
        expect.objectContaining({ category: 'none' }),
        expect.objectContaining({ category: 'humor' }),
        expect.objectContaining({ category: 'experience' }),
        expect.objectContaining({ category: 'benefit' }),
        expect.objectContaining({ category: 'beautiful' }),
      ]
    })
  })

  it('create new sentence', async () => {
    expect.assertions(1)
    const result = await request
      .post('/api/v1/sentences')
      .set('Authorization', `Bearer ${mockConfig.secret}`)
      .send({ text: 'new sentence', category: 'terror' })
      .expect(201)
    expect(result.body).toMatchObject({
      success: true,
      data: expect.any(String)
    })
  })

  it('create new sentence wrong body', async () => {
    expect.assertions(1)
    const result = await request
      .post('/api/v1/sentences')
      .set('Authorization', `Bearer ${mockConfig.secret}`)
      .send({ wrong: 'new sentence' })
      .expect(400)
    expect(result.body).toMatchObject({
      success: false,
      errors: expect.arrayContaining([
        expect.objectContaining({ field: 'text', type: 'required' }),
        expect.objectContaining({ field: 'category', type: 'required' }),
      ])
    })
  })

  it('update sentence', async () => {
    expect.assertions(1)
    const newSentence = { text: 'Hello world', category: 'terror' }
    const result = await request
      .put('/api/v1/sentences/abc123')
      .set('Authorization', `Bearer ${mockConfig.secret}`)
      .send(newSentence)
      .expect(201)
    expect(result.body).toMatchObject({
      success: true,
      data: {
        id: 'abc123',
        ...newSentence
      }
    })
  })

  it('delete sentence', async () => {
    expect.assertions(1)
    const result = await request
      .delete('/api/v1/sentences/abc123')
      .set('Authorization', `Bearer ${mockConfig.secret}`)
      .expect(201)
    expect(result.body).toMatchObject({
      success: true,
      data: 'abc123'
    })
  })
});

