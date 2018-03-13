import axios from 'axios';

export const FETCH_LEAGUES = "fetch_leagues";
export const FETCH_STANDINGS = "fetch_standings";
export const FETCH_TEAMS = "fetch_teams";

const ROOT_URL = "https://soccer.sportmonks.com/api/v2.0";
const API_KEY = "?api_token=HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC";

export function fetchLeagues() {
    const request = axios.get(`${ROOT_URL}/leagues${API_KEY}`);
    return {
        type: FETCH_LEAGUES,
        payload: request
    };
}

export function fetchStandings(season_id) {
    const request = axios.get(`${ROOT_URL}/standings/season/${season_id}${API_KEY}`);
    return {
        type: FETCH_STANDINGS,
        payload: request
    };
}

export function fetchTeams(team_id) {
    const request = axios.get(`${ROOT_URL}/teams/${team_id}${API_KEY}&include=squad`);
    return {
        type: FETCH_TEAMS,
        payload: request
    };
}