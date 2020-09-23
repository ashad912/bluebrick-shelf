import activitiesReducer from 'store/reducers/activities'
import { FETCH_ACTIVITIES } from 'store/actions/types'

it('handles actions of type FETCH_ACTIVITIES', () => {
    const action = {
        type: FETCH_ACTIVITIES,
        feed: [
            {
                createdAt: new Date(),
                bookName: 'TypeScript Handbook',
                imageUrl: '1.png',
                rate: 8,
                review: 'Addictive!'
            }
        ]
    }

    const newState = activitiesReducer([], action)
    expect(newState).toEqual(action.feed)
})

it('handles action with unknown type', () => {
    const newState = activitiesReducer([], { type: 'dasdacozi' })

    expect(newState).toEqual([])

})
