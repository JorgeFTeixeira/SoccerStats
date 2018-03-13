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
                    <li key={league.id} className="list-item">
                        {league.name}
                    </li>
                </Link>
            );
        });
    }

    render() {
        return (
            <div>
                <ul className="list-group"> {this.renderLeagues()} </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { leagues: state.leagues };
}

export default connect(mapStateToProps, { fetchLeagues })(Leagues);
