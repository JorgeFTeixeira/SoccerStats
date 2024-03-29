import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLeagues } from '../actions';
import { ROOT_URL } from '../actions';
import { API_KEY } from '../actions';
import axios from 'axios';

export class Leagues extends Component {
    componentDidMount() {
        this.props.fetchLeagues();
    }

    renderLeagues() {
        return _.map(this.props.leagues, league => {
            return (
                <Link to={`/league/${league.current_season_id}`}>
                    <div key={league.id} className="card w-50 col-md-4 col-md-offset-1">
                        <div className="card-block">
                            <h3 className="card-title">{league.name}</h3>
                        </div>
                    </div>
                </Link>
            );
        });
    }

    render() {
        if (!this.props.leagues)
            return <div>Loading...</div>

        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">SoccerStats</h1>
                </div>
                <div className="row leagues">
                    {this.renderLeagues()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { leagues: state.leagues };
}

export default connect(mapStateToProps, { fetchLeagues })(Leagues);
