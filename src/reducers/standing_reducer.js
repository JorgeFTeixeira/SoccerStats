import { FETCH_STANDINGS } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_STANDINGS:            
            return action.payload.data.data[0].standings.data;
        default:
            return state;
    }
}