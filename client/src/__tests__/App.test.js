import React from 'react'
import App from 'App'

import ReduxRoot from 'ReduxRoot'

import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import { rest } from 'msw'
import { setupServer } from 'msw/node'


const server = setupServer(
    rest.get('/api/me', (req, res, ctx) => {
        return res(
            ctx.json({ _id: 'something' }),
            ctx.status(200)
        )
    })
)

// establish API mocking before all tests
beforeAll(() => server.listen())

beforeEach(async () => {

    render(<ReduxRoot><App /></ReduxRoot>);

    await waitFor(() => screen.getByTestId('navbar_container'))
})

it('shows a navbar container', () => {


    const component = screen.getByTestId('navba_container');
    expect(component).toBeInTheDocument();
})

it('shows a app title', () => {

    const component = screen.getByTestId('app_title');
    expect(component).toBeInTheDocument();
})


afterEach(() => server.resetHandlers())


afterAll(() => server.close())