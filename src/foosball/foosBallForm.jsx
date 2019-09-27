import React, { PureComponent } from 'react';
import { FoosBallDropdown } from './foosBallDropdown';
export default class FoosBallForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      teamA1Id: null,
      teamA2Id: null,
      teamB1Id: null,
      teamB2Id: null,
      teamAScore: 0,
      teamBScore: 0
    };
  }

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FoosBallDropdown />
      </form>
    );
  }
}
