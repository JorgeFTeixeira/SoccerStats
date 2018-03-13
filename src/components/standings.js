import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './modal';
import Squad from './squad';
import { fetchStandings, fetchTeams } from '../actions';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import { createStore } from 'redux';

export class Standings extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, Standings: [], reverse: false };

    }

    componentDidMount() {
        var id = this.props.match.params.id;
        this.props.fetchStandings(id).then(() => {
            this.sortTable("position");
        });
    }

    closeModal = () => {
        this.setState({
            isOpen: false
        });
    }

    getTeam(stand) {
        this.props.fetchTeams(stand.team_id).then(
            res => this.setState({ teams: res.payload.data.data, isOpen: true })
        )
    }

    sortTable(col) {

        this.setState(() => {
            return {
                league: this.state.reverse ? _.sortBy(this.props.standings,col).reverse() : _.sortBy(this.props.standings,col),
                reverse: !this.state.reverse
            }
        });

    }

    renderStandings() {
        return _.map(this.state.league, stand => {
            return (
                <tr key={stand.team_id} onClick={this.getTeam.bind(this, stand)}>
                    <th>{stand.position}</th>
                    <th>{stand.team_name}</th>
                    <th>{stand.overall.games_played}</th>
                    <th>{stand.overall.won}</th>
                    <th>{stand.overall.draw}</th>
                    <th>{stand.overall.lost}</th>
                    <th>{stand.total.goal_difference}</th>
                    <th>{stand.points}</th>
                </tr>
            );
        });
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <nav className="navbar navbar-light bg-faded">
                    <Link className="" to="/">&lt; Back</Link>
                    <span className="navbar-text nav-title">
                        SoccerStats
                    </span>
                </nav>

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th onClick={this.sortTable.bind(this, "position")}>#</th>
                            <th onClick={this.sortTable.bind(this, "team_name")}>Team</th>
                            <th onClick={this.sortTable.bind(this, "overall.games_played")}>MP</th>
                            <th onClick={this.sortTable.bind(this, "overall.won")}>W</th>
                            <th onClick={this.sortTable.bind(this, "overall.draw")}>D</th>
                            <th onClick={this.sortTable.bind(this, "overall.lost")}>L</th>
                            <th onClick={this.sortTable.bind(this, "total.goal_difference")}>G</th>
                            <th onClick={this.sortTable.bind(this, "overall.points")}>Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderStandings()}
                    </tbody>
                </table>
                {this.state.isOpen && this.state.teams && (
                    <Modal
                        show={this.state.isOpen}
                        onClose={this.closeModal}>

                        <nav className="navbar navbar-light bg-light">
                            <div className="container-fluid">
                                <div className="navbar-header row modal-header">
                                    <h3 className="col-md-11">{this.state.teams.name}</h3>
                                    <button className="btn btn-primary btn-sm" onClick={this.closeModal}>x</button>
                                </div>
                            </div>
                        </nav>

                        <div className="row">
                            <div className="col-md-3">
                                <img className="team-logo" src={this.state.teams.logo_path} alt={this.state.teams.name} />
                            </div>
                            <div className="col-md-8">
                                <Provider store={createStore(reducers)}>
                                    <Squad team={this.state.teams.squad} />
                                </Provider>
                            </div>
                        </div>

                    </Modal>)
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { standings: state.standings };
}

export default connect(mapStateToProps, { fetchStandings, fetchTeams })(Standings);
