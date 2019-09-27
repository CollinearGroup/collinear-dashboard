import React, { PureComponent } from 'react';
import FoosBallForm from './foosBallForm';
export default class FoosBallContainer extends PureComponent {
  state = {
    editMode: true
  };

  render() {
    return (
      <div>
        <FoosBallForm />
      </div>
    );
  }
}
