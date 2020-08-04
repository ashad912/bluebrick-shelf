import supertest from 'supertest'
import { connect, disconnect } from '@testUtils/mongoose'

let app
beforeAll(async () => {
    // Little hack to have loaders invoked, import/export is synchronous
    const server = await require('@loaders/express').default()
    app = () => supertest(server)

    await connect()
})

test('Not found route shound return 404 for GET request', async () => {
    await app()
            .get('/noendpoint')
            .send()
            .expect(404)
})

test('Not found route shoud return 404 for POST request', async () => {
    await app()
            .post('/noendpoint')
            .send()
            .expect(404)
})

afterAll(async () => {
    await disconnect()
})
