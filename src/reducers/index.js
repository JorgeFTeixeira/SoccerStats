import { combineReducers } from 'redux';
import LeagueReducer from './league_reducer';
import StandingReducer from './standing_reducer';
import TeamsReducer from './teams_reducer';

const rootReducer = combineReducers({
  leagues: LeagueReducer,
  standings: StandingReducer,
  teams: TeamsReducer
});

export default rootReducer;
