import React, { Component } from 'react';
import './ExampleUsage.css';
import MessageBoard from './containers/MessageBoard';
import MessageBoardForm from './containers/MessageBoardForm';

class App extends Component {
  state = {
    editMode: false
  }

  toggleModeHandler = () => {
    this.setState( { editMode: !this.state.editMode } )
  }

  render() {
    if (this.state.editMode) {
      return (
        <div className="App">

          <MessageBoardForm switchMode={this.toggleModeHandler} />
        </div>
      );
    }
    else {
      return (
        <div className="App">

          <MessageBoard switchMode={this.toggleModeHandler} />
        </div>
      );
    }
  }
}

export default App;
