import React, { Component } from "react"
import FoosBallForm from "./foosBallForm"
import FoosBallMatches from "./foosBallMatches"
import "./foosBallContainer.scss"
import {
  getUsers,
  getMatches,
  onMatchUpdate,
  clearMatches
} from "./data/foosballService"
export default class FoosBallContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: null,
      matches: null,
      editMode: false
    }
  }

  async componentDidMount() {
    onMatchUpdate(this.onMatchUpdate)
    const users = await getUsers()
    const matches = await getMatches()
    this.setState({ users, matches })
  }

  onMatchUpdate = match => {
    let newMatches = this.state.matches ? [...this.state.matches] : []
    newMatches.push(match)
    newMatches = newMatches.sort((a, b) => b.date - a.date)
    this.setState({ matches: newMatches })
  }

  clearAllDataHandler = async () => {
    await clearMatches()
    this.setState({ matches: [] })
  }

  isLoaded = () => {
    return Array.isArray(this.state.matches) && Array.isArray(this.state.users)
  }

  renderContent = () => {
    if (this.state.editMode) {
      return (
        <FoosBallForm
          users={this.state.users}
          clearAllDataHandler={this.clearAllDataHandler}
        />
      )
    }
    return (
      <FoosBallMatches matches={this.state.matches} users={this.state.users} />
    )
  }

  toggleEditMode = () => this.setState({ editMode: !this.state.editMode })

  render() {
    const isLoaded = this.isLoaded()
    return (
      <div className="foosball-container">
        <div style={{ paddingBottom: "0.5rem" }}>
          <button style={{ float: "right" }} onClick={this.toggleEditMode}>
            {this.state.editMode
              ? "Toggle to View Rank"
              : "Toggle to Input Score"}
          </button>
          <h3>
            {this.state.editMode
              ? "Foosball Scoring Form"
              : "Foosball Ranking (Top 6 By Average Score per Game)"}
          </h3>
        </div>
        {isLoaded && this.renderContent()}
      </div>
    )
  }
}
