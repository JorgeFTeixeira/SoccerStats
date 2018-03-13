import _ from 'lodash';
import { FETCH_LEAGUES } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_LEAGUES:
            return _.mapKeys(action.payload.data.data, 'country_id');
        default:
            return state;
    }
}