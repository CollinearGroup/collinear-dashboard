import React, { Component } from 'react'
import { Image, CloudinaryContext } from 'cloudinary-react';
import axios from 'axios'
import './socialMediaPhotos.css'

export default class SocialMediaPhotos extends Component {
  state = {
    images: [],
    photoIndex: 0
  }

  async componentDidMount() {
    try {
      let res = await axios.get("/images", {
        auth: {
          username: process.env.CLOUDINARY_USER,
          password: process.env.CLOUDINARY_PW
        },
        mode: 'no-cors'
      })
      let ids = res.data.resources.map(img => img.public_id)
      this.setState({ images: ids }, console.log(this.state.images))
    } catch (err) {
      console.log('heeeey', err)
    }
    this.startSlideShow()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  startSlideShow = () => {
    this.interval = setInterval(() => {
      let newIndex = this.state.photoIndex > this.state.images.length - 2 ? 0 : this.state.photoIndex + 1
      this.setState({ photoIndex: newIndex })
    }, 10000)
  }

  render() {
    const { photoIndex, images } = this.state
    let style = {
      height: '100%',
      width: '100%',
    }
    return (
      <div className="slideshow-container" style={style}>
        <div className="slideshow-photo" style={style}>
          <CloudinaryContext cloudName="collinear-group" >
            <Image publicId={images[photoIndex]} width="540" height="300" gravity="auto" background="auto" crop="fill_pad" />
          </CloudinaryContext>
        </div>
      </div>
    )
  }
}