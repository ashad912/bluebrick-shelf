import React from 'react'
import App from 'App'

import ReduxRoot from 'ReduxRoot'

import { render, fireEvent, waitFor, screen } from '@testing-library/react'

beforeEach(() => {
    
    render(<ReduxRoot><App /></ReduxRoot>);
})


it('shows a feed header', () => {
     
    const component = screen.getByTestId('feed_header');
    expect(component).toBeInTheDocument();
})

it('shows a feed list', () => {
    
    const component = screen.getByTestId('feed_list');
    expect(component).toBeInTheDocument();
})