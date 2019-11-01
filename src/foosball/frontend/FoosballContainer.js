import React, { Component } from 'react';
import './FoosballContainer.scss'

import ScoreForm from './FoosballContainer/ScoreForm'
import Ranking from './FoosballContainer/Ranking'

class FoosballContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFormView: true
        }
    }

    render() {
        return (
            <div className="foosball-container">
                <button className='toggle-button' onClick={() => this.setState({ isFormView: !this.state.isFormView })}>{`Toggle to ${this.state.isFormView ? 'Ranking' : 'Form'}`}</button>
                {this.state.isFormView ? <ScoreForm /> : <Ranking />}
            </div>
        );
    }
}

export default FoosballContainer;