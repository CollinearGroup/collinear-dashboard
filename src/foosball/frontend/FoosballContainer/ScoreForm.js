import React, { Component } from "react";
import "./ScoreForm.scss";

import { FoosballDropdown } from "./ScoreForm/FoosballDropdown";

class ScoreForm extends Component {
  constructor(props) {
    super(props);
    this.DEFAULT_STATE = {
      red_off: "",
      black_off: "",
      red_def: "",
      black_def: "",
      red_points: 0,
      black_points: 0,
      newUserInput: "",
      isFormView: false
    };
    this.state = { ...this.DEFAULT_STATE };
  }

  getIdFromFullName = name => {
    const nameArray = name.split(" ");
    const foundUser = this.props.users.find(user => {
      return (
        user.first_name === nameArray[0] && user.last_name === nameArray[1]
      );
    });
    if (!foundUser) {
      return undefined;
    }
    return foundUser.id;
  };

  onSubmit = async e => {
    e.preventDefault();
    const payload = {
      red_off: this.getIdFromFullName(this.state.red_off),
      red_def: this.getIdFromFullName(this.state.red_def),
      black_off: this.getIdFromFullName(this.state.black_off),
      black_def: this.getIdFromFullName(this.state.black_def),
      red_points: parseInt(this.state.red_points, 10),
      black_points: parseInt(this.state.black_points, 10)
    };
    console.log("Submitting", payload);
    await this.props.submitGame(payload);
    this.setState(this.DEFAULT_STATE);
  };

  updateForm = formData => this.setState(formData);

  scoreOptions = [0, 1, 2, 3, 4, 5];

  userText = "-SELECT OPTION-";

  isFormValid = () => {
    const { red_off, black_off } = this.state;
    if (!red_off || !black_off) {
      return false;
    }

    if (this.areThereDuplicatePlayers()) {
      return false;
    }

    if (!this.areScoresNumbers()) {
      return false;
    }

    return this.isOneScore5();
  };

  areThereDuplicatePlayers = () => {
    let seenUsers = {};
    const { red_points, black_points, ...selectedUsers } = this.state;
    for (let user in selectedUsers) {
      const value = selectedUsers[user];
      if (value === "") {
        continue;
      }
      if (!seenUsers[value]) {
        seenUsers[value] = true;
      } else {
        return true;
      }
    }

    return false;
  };

  areScoresNumbers = () => {
    const { red_points, black_points } = this.state;
    if (
      !Number.isInteger(parseInt(red_points, 10)) ||
      !Number.isInteger(parseInt(black_points, 10))
    ) {
      return false;
    }
    return true;
  };

  isOneScore5 = () => {
    const { red_points, black_points } = this.state;
    let count = 0;
    if (parseInt(red_points, 10) === 5) {
      count++;
    }
    if (parseInt(black_points, 10) === 5) {
      count++;
    }

    return count === 1;
  };

  submitNewUser = e => {
    e.preventDefault();
    const nameArray = this.state.newUserInput.split(" ");
    const newUser = {
      first_name: nameArray[0],
      last_name: nameArray[1] || "isDumb"
    };
    this.props.submitNewUser(newUser);
  };

  render() {
    this.getIdFromFullName("stuff ");
    const {
      red_off,
      red_def,
      black_off,
      black_def,
      red_points,
      black_points
    } = this.state;
    const isValid = this.isFormValid();
    const selectedPlayers = [red_off, red_def, black_off, black_def].filter(
      player => player !== ""
    );
    const playerNamesArray = this.props.users.map(
      player => `${player.first_name} ${player.last_name}`
    );

    return (
      <div className="score-form-container">
        <form onSubmit={this.onSubmit}>
          <div className="red-team">
            <h4 style={{ margin: "5px 0" }}>Red Team</h4>
            <div className="flex-row">
              <FoosballDropdown
                list={playerNamesArray}
                value={red_off}
                updateForm={this.updateForm}
                formKey="red_off"
                labelText="Offense"
                defaultText={this.userText}
                alreadySelected={selectedPlayers}
              />
              <FoosballDropdown
                list={playerNamesArray}
                value={red_def}
                updateForm={this.updateForm}
                formKey="red_def"
                labelText="Defense"
                defaultText={this.userText}
                alreadySelected={selectedPlayers}
              />
              <FoosballDropdown
                list={this.scoreOptions}
                value={red_points}
                updateForm={this.updateForm}
                formKey="red_points"
                labelText="Score"
                defaultText={"-"}
              />
            </div>
          </div>
          <div className="black-team">
            <h4 style={{ margin: "5px 0" }}>Black Team</h4>
            <div className="flex-row">
              <FoosballDropdown
                list={playerNamesArray}
                value={black_off}
                updateForm={this.updateForm}
                formKey="black_off"
                labelText="Offense"
                defaultText={this.userText}
                alreadySelected={selectedPlayers}
              />
              <FoosballDropdown
                list={playerNamesArray}
                value={black_def}
                updateForm={this.updateForm}
                formKey="black_def"
                labelText="Defense"
                defaultText={this.userText}
                alreadySelected={selectedPlayers}
              />
              <FoosballDropdown
                list={this.scoreOptions}
                value={black_points}
                updateForm={this.updateForm}
                formKey="black_points"
                labelText="Score"
                defaultText={"-"}
              />
            </div>
          </div>
          <div className="submit-button">
            <button disabled={!isValid} type="submit">
              Submit Game
            </button>
          </div>
        </form>
        <form style={{ padding: "5px 0 0 2rem" }} onSubmit={this.submitNewUser}>
          <div>Add New User</div>
          <input
            value={this.state.newUserInput}
            onChange={e => {
              this.setState({ newUserInput: e.target.value });
            }}
          ></input>
          <button
            type="submit"
            disabled={this.state.newUserInput.trim() === ""}
            style={{ marginLeft: "1rem" }}
          >
            Submit New User
          </button>
        </form>
      </div>
    );
  }
}

export default ScoreForm;
