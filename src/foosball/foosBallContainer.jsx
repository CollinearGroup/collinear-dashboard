import React, { Component } from "react";
import db from "./data/fireStore";
import FoosBallForm from "./foosBallForm";
import FoosBallMatches from "./foosBallMatches";
import "./foosBallContainer.scss";
export default class FoosBallContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      matches: null,
      editMode: false
    };
    this.USERS_COLLECTION = db.collection("users");
    this.MATCHES_COLLECTION = db.collection("matches");
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
      if (change.type === "added") {
        newMatches.push({ ...change.doc.data(), id: change.doc.id });
      } else if (change.type === "modified") {
        const index = newMatches.indexOf(el => el.id === change.doc.id);
        newMatches.splice(index, 1, {
          ...change.doc.data(),
          id: change.doc.id
        });
      } else if (change.type === "removed") {
        newMatches = newMatches.filter(el => el.id !== change.doc.id);
      }
    });
    newMatches = newMatches.sort((a, b) => b.date - a.date);

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

  renderContent = () => {
    if (this.state.editMode) {
      return <FoosBallForm users={this.state.users} />;
    }
    return (
      <FoosBallMatches matches={this.state.matches} users={this.state.users} />
    );
  };

  toggleEditMode = () => this.setState({ editMode: !this.state.editMode });

  render() {
    const isLoaded = this.isLoaded();
    return (
      <div className="full-width">
        <div style={{ paddingBottom: "0.5rem" }}>
          <button
            style={{
              width: "10rem",
              display: "inline-block",
              verticalAlign: "top"
            }}
            onClick={this.toggleEditMode}
          >
            {this.state.editMode
              ? "Toggle to View Rank"
              : "Toggle to Input Score"}
          </button>
          <div
            style={{
              display: "inline-block",
              width: "calc( 100% - 12rem)",
              textAlign: "center"
            }}
          >
            {this.state.editMode
              ? "Foosball Scoring Form"
              : "Foosball Ranking (Top 6 By Average Score per Game)"}
          </div>
        </div>
        {isLoaded && this.renderContent()}
      </div>
    );
  }
}
