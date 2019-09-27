import React, { Component } from 'react';
import db from './data/fireStore';
import FoosBallForm from './foosBallForm';
import './foosBallContainer.scss';
export default class FoosBallContainer extends Component {
  constructor(props) {
    super(props);
    this.USERS_COLLECTION = db.collection('users');
    this.MATCHES_COLLECTION = db.collection('matches');
    this.state = {
      users: [],
      matches: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const usersSnapshot = await this.USERS_COLLECTION.get();
    const matchesShapshot = await this.MATCHES_COLLECTION.get();
    const users = this.returnDataFromSnapshot(usersSnapshot);
    const matches = this.returnDataFromSnapshot(matchesShapshot);
    this.setState({ users, matches, isLoading: false });
  }

  returnDataFromSnapshot = snapshot => {
    const data = [];
    snapshot.forEach(doc => data.push(doc.data()));
    return data;
  };

  render() {
    return (
      <div className="full-width">
        <FoosBallForm users={this.state.users} />
      </div>
    );
  }
}
