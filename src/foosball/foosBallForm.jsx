import React, { PureComponent } from 'react';

export default class FoosBallForm extends PureComponent {
  state = {
    teamA1Id: null,
    teamA2Id: null,
    teamB1Id: null,
    teamB2Id: null,
    teamAScore: 0,
    teamBScore: 0
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input></input>
      </form>
    );
  }
}
