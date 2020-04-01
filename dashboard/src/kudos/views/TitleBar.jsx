import React, { PureComponent } from 'react';

class TitleBar extends PureComponent {
  render() { 
    return this.renderTitleBar()
  }
  renderTitleBar = () => {
    return (
      <div id="title-bar">
        {this.renderTitle()}
        {this.renderCount()}
      </div>
    )
  }
  renderTitle = () => {
    return <div id="title">Weekly Kudos</div>
  }
  renderCount = () => {
    const {displayedIndex, total} = this.props
    return <div id="message-tracking-display">Showing {displayedIndex} of {total}</div>
  }
}
 
export default TitleBar;