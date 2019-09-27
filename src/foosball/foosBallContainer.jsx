import React, { Component } from 'react';
import db from './data/fireStore';
import FoosBallForm from './foosBallForm';
import './foosBallContainer.scss';
export default class FoosBallContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      matches: null
    };
    this.USERS_COLLECTION = db.collection('users');
    this.MATCHES_COLLECTION = db.collection('matches');
    this.listener = this.MATCHES_COLLECTION.onSnapshot(
      this.handleMatchesChange
    );
  }

  async componentDidMount() {
    const usersSnapshot = await this.USERS_COLLECTION.get();
    const users = this.returnDataFromSnapshot(usersSnapshot);
    this.setState({ users });
  }

  componentWillUnmount() {
    // This is used to remove the listener
    this.listener();
  }

  handleMatchesChange = res => {
    let newMatches = this.state.matches ? [...this.state.matches] : [];
    res.docChanges().forEach(change => {
      if (change.type === 'added') {
        newMatches.push({ ...change.doc.data(), id: change.doc.id });
      } else if (change.type === 'modified') {
        const index = newMatches.indexOf(el => el.id === change.doc.id);
        newMatches.splice(index, 1, {
          ...change.doc.data(),
          id: change.doc.id
        });
      } else if (change.type === 'removed') {
        newMatches = newMatches.filter(el => el.id !== change.doc.id);
      }
    });
    this.setState({ matches: newMatches });
  };

  returnDataFromSnapshot = snapshot => {
    const data = [];
    snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
    return data;
  };

  isLoaded = () => {
    return Array.isArray(this.state.matches) && Array.isArray(this.state.users);
  };

  render() {
    const isLoaded = this.isLoaded();
    return (
      <div className="full-width">
        {isLoaded && <FoosBallForm users={this.state.users} />}
      </div>
    );
  }
}
