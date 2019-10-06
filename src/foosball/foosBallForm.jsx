import React, { PureComponent, Fragment } from "react"
import { FoosBallDropdown } from "./foosBallDropdown"
import { addMatch } from "./data/foosballService"
import "./foosBallForm.scss"
export default class FoosBallForm extends PureComponent {
  constructor(props) {
    super(props)
    this.DEFAULT_STATE = {
      p1A: "",
      p1B: "",
      p2A: "",
      p2B: "",
      aScore: 0,
      bScore: 0
    }
    this.state = { ...this.DEFAULT_STATE }
  }

  onSubmit = async e => {
    e.preventDefault()
    // add date here
    const payload = {
      ...this.state,
      aScore: parseInt(this.state.aScore, 10),
      bScore: parseInt(this.state.bScore, 10),
      date: new Date().valueOf()
    }
    await addMatch(payload)
    this.setState(this.DEFAULT_STATE)
  }

  updateForm = formData => this.setState(formData)

  scoreOptions = [0, 1, 2, 3, 4, 5]

  userText = "-SELECT OPTION-"

  isFormValid = () => {
    const { p1A, p1B } = this.state
    if (!p1A || !p1B) {
      return false
    }

    if (this.areThereDuplicatePlayers()) {
      return false
    }

    if (!this.areScoresNumbers()) {
      return false
    }

    return this.isOneScore5()
  }

  areThereDuplicatePlayers = () => {
    let seenUsers = {}
    const { aScore, bScore, ...selectedUsers } = this.state
    for (let user in selectedUsers) {
      const value = selectedUsers[user]
      if (value === "") {
        continue
      }
      if (!seenUsers[value]) {
        seenUsers[value] = true
      } else {
        return true
      }
    }

    return false
  }

  areScoresNumbers = () => {
    const { aScore, bScore } = this.state
    if (
      !Number.isInteger(parseInt(aScore, 10)) ||
      !Number.isInteger(parseInt(bScore, 10))
    ) {
      return false
    }
    return true
  }

  isOneScore5 = () => {
    const { aScore, bScore } = this.state
    let count = 0
    if (parseInt(aScore, 10) === 5) {
      count++
    }
    if (parseInt(bScore, 10) === 5) {
      count++
    }

    return count === 1
  }

  render() {
    const { p1A, p2A, p1B, p2B, aScore, bScore } = this.state
    const isValid = this.isFormValid()
    const selectedPlayers = [p1A, p2A, p1B, p2B].filter(player => player !== "")

    return (
      <Fragment>
        <form className="flex-column" onSubmit={this.onSubmit}>
          <div className="flex-row flex-justify-space-evenly">
            <div className="flex-column">
              <h4 style={{ margin: "5px 0" }}>Team A</h4>
              <FoosBallDropdown
                list={this.props.users}
                listKey={"name"}
                value={p1A}
                updateForm={this.updateForm}
                formKey="p1A"
                labelText="Player 1"
                defaultText={this.userText}
                alreadySelected={selectedPlayers}
              />
              <FoosBallDropdown
                list={this.props.users}
                listKey={"name"}
                value={p2A}
                updateForm={this.updateForm}
                formKey="p2A"
                labelText="Player 2"
                defaultText={this.userText}
                alreadySelected={selectedPlayers}
              />
              <FoosBallDropdown
                list={this.scoreOptions}
                value={aScore}
                updateForm={this.updateForm}
                formKey="aScore"
                labelText="FINAL SCORE:"
                defaultText={"-"}
              />
            </div>
            <div className="flex-column">
              <h4 style={{ margin: "5px 0" }}>Team B</h4>
              <FoosBallDropdown
                list={this.props.users}
                listKey={"name"}
                value={p1B}
                updateForm={this.updateForm}
                formKey="p1B"
                labelText="Player 1"
                defaultText={this.userText}
                alreadySelected={selectedPlayers}
              />
              <FoosBallDropdown
                list={this.props.users}
                listKey={"name"}
                value={p2B}
                updateForm={this.updateForm}
                formKey="p2B"
                labelText="Player 2"
                defaultText={this.userText}
                alreadySelected={selectedPlayers}
              />
              <FoosBallDropdown
                list={this.scoreOptions}
                value={bScore}
                updateForm={this.updateForm}
                formKey="bScore"
                labelText="FINAL SCORE:"
                defaultText={"-"}
              />
            </div>
          </div>
          <div className="flex-justify-center">
            <button disabled={!isValid} type="submit">
              Submit Game
            </button>
          </div>
        </form>
        <button
          disabled={isValid}
          type="submit"
          onClick={this.props.clearAllDataHandler}
        >
          Clear ALL Data
        </button>
      </Fragment>
    )
  }
}
