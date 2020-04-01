import React, { Component } from "react"

class AddForm extends Component {
  state = {
    message: "I posted on " + Date.now(),
    from: "Dan",
    password: "development"
  }

  fieldHandler = (stateFieldKey, e) => {
    const { value } = e.target
    this.setState({ [stateFieldKey]: value })
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <textarea
          style={{ width: "60%" }}
          rows="5"
          placeholder="Kudos text"
          value={this.state.message}
          onChange={this.fieldHandler.bind(this, "message")}
        ></textarea>
        <br />
        <input
          type="text"
          placeholder="From"
          value={this.state.from}
          onChange={this.fieldHandler.bind(this, "from")}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.fieldHandler.bind(this, "password")}
        />
        <br />
        <button onClick={this.saveHandler}>Save</button>
      </div>
    )
  }

  saveHandler = () => {
    const kudoData = {
      message: this.state.message,
      from: this.state.from
    }
    const password = this.state.password
    this.props.onSave(kudoData, password)
  }
}

export default AddForm
