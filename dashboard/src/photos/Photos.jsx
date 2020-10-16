import React, { Component } from "react"
import axios from "axios";
import "./photos.css"
const PHOTOS_URL = `${process.env.REACT_APP_PHOTOS_URL}/next`
export default class Photos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageRefreshKey: Date.now()
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate() {
    if (!this.interval && this.props.isLoggedIn) {
      this.startSlideShow();
    }
  }

  startSlideShow = () => {
    this.runSlideShow();
    this.interval = setInterval(this.runSlideShow, 10000);
  }

  runSlideShow = async () => {
    if (!this.props.isLoggedIn) {
      return;
    }
    const { imageRefreshKey } = this.state
    try {
      const response = await axios.get(`${PHOTOS_URL}?${imageRefreshKey}`,
        {
          responseType: 'arraybuffer',
          headers: {
            'Authorization': window.dashboardJwt
          }
        });

      const image = btoa(
        new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      const mimetype = "image/jpeg";
      const dataURL = "data:" + mimetype + ";base64," + image;

      document.getElementById('photo-holder').innerHTML = `
            <img id="photo" src="${dataURL}" alt="Collinear Media" />
          `;

      this.setState({ imageRefreshKey: Date.now() });
    }
    catch (err) {
      console.error(`Error fetching image ${PHOTOS_URL}?${imageRefreshKey}:`, err);
    }
  }

  render() {
    return (
      <div className="slideshow-container box">
        <div className="slideshow-photo">
          {
            this.props.isLoggedIn &&
            <div id="photo-holder">
            </div>
          }
          {
            !this.props.isLoggedIn &&
            <span className="slideshow-notice">You must be logged in to see photos.</span>
          }

        </div>
      </div>
    )
  }
}
