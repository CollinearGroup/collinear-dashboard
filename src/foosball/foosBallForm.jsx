import React, { PureComponent } from 'react';
import { FoosBallDropdown } from './foosBallDropdown';
import { FoosBallNumber } from './foosBallNumber';
import './foosBallForm.scss';
export default class FoosBallForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      p1A: '',
      p1B: '',
      p2A: '',
      p2B: '',
      aScore: 0,
      bScore: 0
    };
  }

  onSubmit = e => {
    e.preventDefault();
    // add date here
  };

  updateForm = formData => this.setState(formData);

  scoreOptions = [0, 1, 2, 3, 4, 5];

  userText = '-SELECT OPTION-';

  isFormValid = () => {
    const { p1A, p1B } = this.state;
    if (!p1A || !p1B) {
      return false;
    }

    if (!this.areScoresNumbers()) {
      return false;
    }

    return this.isOneScore5();
  };

  areScoresNumbers = () => {
    const { aScore, bScore } = this.state;
    if (
      !Number.isInteger(parseInt(aScore, 10)) ||
      !Number.isInteger(parseInt(bScore, 10))
    ) {
      return false;
    }
    return true;
  };

  isOneScore5 = () => {
    const { aScore, bScore } = this.state;
    let count = 0;
    if (parseInt(aScore, 10) === 5) {
      count++;
    }
    if (parseInt(bScore, 10) === 5) {
      count++;
    }

    return count === 1;
  };

  render() {
    const { p1A, p2A, p1B, p2B, aScore, bScore } = this.state;
    const isValid = this.isFormValid();
    return (
      <form className="flex-column" onSubmit={this.onSubmit}>
        <div className="flex-row flex-justify-space-between">
          <div className="flex-column">
            <h4>Team A</h4>
            <FoosBallDropdown
              list={this.props.users}
              listKey={'name'}
              value={p1A}
              updateForm={this.updateForm}
              formKey="p1A"
              labelText="Player 1"
              defaultText={this.userText}
            />
            <FoosBallDropdown
              list={this.props.users}
              listKey={'name'}
              value={p2A}
              updateForm={this.updateForm}
              formKey="p2A"
              labelText="Player 2"
              defaultText={this.userText}
            />
            <FoosBallDropdown
              list={this.scoreOptions}
              value={aScore}
              updateForm={this.updateForm}
              formKey="aScore"
              labelText="FINAL SCORE:"
              defaultText={'-'}
            />
          </div>
          <div className="flex-column">
            <h4>Team B</h4>
            <FoosBallDropdown
              list={this.props.users}
              listKey={'name'}
              value={p1B}
              updateForm={this.updateForm}
              formKey="p1B"
              labelText="Player 1"
              defaultText={this.userText}
            />
            <FoosBallDropdown
              list={this.props.users}
              listKey={'name'}
              value={p2B}
              updateForm={this.updateForm}
              formKey="p2B"
              labelText="Player 2"
              defaultText={this.userText}
            />
            <FoosBallDropdown
              list={this.scoreOptions}
              value={bScore}
              updateForm={this.updateForm}
              formKey="bScore"
              labelText="FINAL SCORE:"
              defaultText={'-'}
            />
          </div>
        </div>
        <div className="flex-justify-center">
          <button disabled={!isValid} type="submit">
            Submit Game
          </button>
        </div>
      </form>
    );
  }
}
