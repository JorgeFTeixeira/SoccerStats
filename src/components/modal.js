import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import { store } from '../index';
import { Provider } from 'react-redux';

export class Modal extends Component {

    componentDidMount() {
        this.modalTarget = document.createElement('div');
        document.body.classList.add('overlay');
        this.modalTarget.className = 'modal';
        document.body.appendChild(this.modalTarget);
        this._render();
    }

    componentWillUpdate() {
        this._render();
    }

    componentWillUnmount() {
        document.body.classList.remove('overlay');
        ReactDOM.unmountComponentAtNode(this.modalTarget);
        document.body.removeChild(this.modalTarget);
    }

    render() {
        return <noscript />
    }

    _render() {
        ReactDOM.render(
                <div>
                    {this.props.children}
                </div>,
            this.modalTarget
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;
