import React, { Component } from "react";
import axios from "axios";
import "./FoosballContainer.scss";

import ScoreForm from "./FoosballContainer/ScoreForm";
import Ranking from "./FoosballContainer/Ranking";

const foosballRankingURL = process.env.FOOSBALL_API_URL || "/foosball-api";

class FoosballContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormView: true,
      users: []
    };
  }

  async componentDidMount() {
    await this.updateUsers();
  }

  submitGame = async payload => {
    await axios.post(`${foosballRankingURL}/games`, payload);
    await this.updateUsers();
  };

  updateUsers = async () => {
    const response = await axios.get(`${foosballRankingURL}/users`);
    this.setState({ users: response.data.users });
  };

  submitNewUser = async newUser => {
    await axios.post(`${foosballRankingURL}/users`, newUser);
    await this.updateUsers();
  };

  render() {
    return (
      <div className="foosball-container">
        <button
          className="toggle-button"
          onClick={() => this.setState({ isFormView: !this.state.isFormView })}
        >{`Toggle to ${this.state.isFormView ? "Ranking" : "Form"}`}</button>
        {this.state.isFormView ? (
          <ScoreForm
            users={this.state.users}
            submitGame={this.submitGame}
            submitNewUser={this.submitNewUser}
          />
        ) : (
          <Ranking users={this.state.users} />
        )}
      </div>
    );
  }
}

export default FoosballContainer;
