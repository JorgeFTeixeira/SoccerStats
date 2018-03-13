import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLeagues } from '../actions';

export class Leagues extends Component {
    componentDidMount() {
        this.props.fetchLeagues();
    }

    renderLeagues() {
        return _.map(this.props.leagues, league => {
            return (
                <Link to={`/league/${league.current_season_id}`}>
                    <div key={league.id} className="card w-50 col-md-6">
                        <div className="card-block">
                            <h3 className="card-title">{league.name}</h3>
                        </div>
                    </div>
                </Link>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 class="display-3">SoccerStats</h1>
                </div>
                <div className="row">
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
