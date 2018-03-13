import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTeams } from '../actions';

export class Teams extends Component {
    componentDidMount() {
        var id = this.props.match.params.id;
        this.props.fetchTeams(id);
    }

    renderTeams() {
        console.log(this.props.teams);
        return (
            <h3>{this.props.teams.name}</h3>
        );
    }

    render() {
        return (
            <div>
                {this.renderTeams()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { teams: state.teams };
}

export default connect(mapStateToProps, { fetchTeams })(Teams);
