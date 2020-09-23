import { FETCH_ACTIVITIES } from "store/actions/types"

export default (state = [], action) => {
    switch(action.type){
        case FETCH_ACTIVITIES:
            return [...action.feed]
        default:
            return state
    }
}