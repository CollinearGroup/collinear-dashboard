import React, { PureComponent } from 'react';

class Kudo extends PureComponent {
  render() { 
    return this.renderKudo()
  }

  renderKudo = () => {
    const { message, from } = this.props
    return (
      <div id="kudo-container">
        <div id="kudo-float-container">
          <div id="kudo-message">"{message}"</div>
          <br />
          <div id="kudo-from">- {from || "Anonymous"}</div>
        </div>
      </div>
    )
  }
}
 
export default Kudo;