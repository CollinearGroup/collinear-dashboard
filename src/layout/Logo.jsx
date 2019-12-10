import React from "react"

export default class Logo extends React.Component {

  fullscreen() {
    document.documentElement.requestFullscreen();
  }

  render() {
    return (
      <div id="logo-container" className="padding" onClick={ () => this.fullscreen() } style={{ cursor: 'pointer' }}>
        <div id="logo-primary">
          collinear
          <div id="logo-secondary">GROUP</div>
        </div>
      </div>
    )
  }
}
