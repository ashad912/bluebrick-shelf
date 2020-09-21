import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchActivities } from 'store/actions'

import { List, Paper } from '@material-ui/core'

import './Feed.scss'


export default () => {
    const activities = useSelector(state => state.activities)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchActivities())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div style={{ width: '100%' }} data-testid='feed_component'>
            <Paper className='PaperRoot'>
                <List data-testid="feed_list">

                    {activities.length ? activities.map((activity, index) => {
                        return (
                            <li key={index} data-testid='activity'>
                                <p>{activity.bookName} was ranked!</p>
                                <p>Rank: {activity.rank}</p>
                                {activity.review && <p>Review: {activity.review}</p>}
                            </li>
                        )
                    }) : (
                            <h1>No activities!</h1>
                        )}

                </List>
            </Paper>
        </div>
    )
}

