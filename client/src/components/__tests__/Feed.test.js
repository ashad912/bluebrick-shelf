import React from 'react'

import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import ReduxRoot from 'ReduxRoot'
import Feed from 'components/Feed'

beforeEach(() => {
    
    const initialState = {
        activities: [
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
        ]
    }

    const {container} = render(
        <ReduxRoot initialState={initialState}>
            <Feed/>
        </ReduxRoot>
    )
    

    screen.container = container
})

it('creates as many activities as assumed', () => {
    expect(screen.getAllByTestId('activity').length).toEqual(2)
})

it('shows the bookname for each activity', () => {
    expect(screen.getByTestId('feed_list')).toHaveTextContent('TypeScript Handbook')
    expect(screen.getByTestId('feed_list')).toHaveTextContent('JavaScript Handbook')
})