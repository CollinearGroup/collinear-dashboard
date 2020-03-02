import React, { Component } from "react"
import "./socialMediaPhotos.css"

export default class SocialMediaPhotos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageRefreshKey: Date.now()
    }
  }

  async componentDidMount() {
    this.startSlideShow()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  startSlideShow = () => {
    this.interval = setInterval(() => {
      this.setState({ imageRefreshKey: Date.now() })
    }, 10000)
  }

  render() {
    const { imageRefreshKey } = this.state

    return (
      <div className="slideshow-container box">
        <img
          key={imageRefreshKey}
          src="http://localhost:3200/next"
          alt="Collinear Media"
          width={"100%"}
        />
      </div>
    )
  }
}
