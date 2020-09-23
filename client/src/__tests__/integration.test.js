import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from '@testing-library/react'

import ReduxRoot from 'ReduxRoot'
import App from 'App'



const server = setupServer(
    rest.get('/api/me', (req, res, ctx) => {
        return res(
            ctx.json({ _id: 'something' }),
            ctx.status(200)
        )
    }),
    rest.get('/api/feed', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    createdAt: new Date(),
                    bookName: 'TypeScript Handbook',
                    imageUrl: '1.png',
                    rate: 8,
                    review: 'Addictive!'
                },
                {
                    createdAt: new Date(),
                    bookName: 'JavaScript Handbook',
                    imageUrl: '2.png',
                    rate: 9,
                    review: 'Super addictive!'
                }
            ]),
            ctx.status(200)
        )
    })
)

// establish API mocking before all tests
beforeAll(() => server.listen())

beforeEach(async () => {

    render(<ReduxRoot><App /></ReduxRoot>);

    await waitFor(() => screen.getByTestId('navbar_container'))
    await waitFor(() => screen.getAllByTestId('activity'))
})




it('fetch and render two activities', async () => {

    expect(screen.getAllByTestId('activity').length).toEqual(2)

})

afterEach(() => server.resetHandlers())


afterAll(() => server.close())
