import { FETCH_TEAMS } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_TEAMS:            
            return action.payload.data != null ? action.payload.data : state;
        default:
            return state;
    }
}