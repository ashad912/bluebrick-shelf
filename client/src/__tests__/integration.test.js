import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from '@testing-library/react'

import ReduxRoot from 'ReduxRoot'
import App from 'App'

const server = setupServer(
    rest.get('*', (req, res, ctx) => {
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



it('fetch and render two activities', async () => {

    const {container} = render(
        <ReduxRoot>
            <App/>
        </ReduxRoot>
    )

    screen.container = container
   

    await waitFor(() => screen.getAllByTestId('activity'))

    expect(screen.getAllByTestId('activity').length).toEqual(2)

})

afterEach(() => server.resetHandlers())


afterAll(() => server.close())
