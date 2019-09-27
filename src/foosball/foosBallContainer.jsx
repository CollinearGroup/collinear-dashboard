import React, { Component } from 'react';
import db from './data/fireStore';
import FoosBallForm from './foosBallForm';
export default class FoosBallContainer extends Component {
  constructor(props) {
    super(props);
    this.USERS = db.collection('users');
    this.MATCHES = db.collection('matches');
    this.state = {
      users: [],
      matches: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const users = await this.USERS.get();
    const matches = await this.MATCHES.get();

    this.setState({ users, matches });
  }

  render() {
    return (
      <div>
        <FoosBallForm />
      </div>
    );
  }
}
