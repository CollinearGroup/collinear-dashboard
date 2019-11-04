import React, { Component } from 'react'
import { Image, CloudinaryContext } from 'cloudinary-react';

import axios from 'axios'

import './socialMediaPhotos.css'

const IMAGES_URL = process.env.IMAGES_URL || '/images'
const IMAGES_USERNAME = process.env.IMAGES_USERNAME
const IMAGES_PASSWORD = process.env.IMAGES_PASSWORD

export default class SocialMediaPhotos extends Component {
  state = {
    images: [],
    photoIndex: 0
  }

  async componentDidMount() {
    try{
      let res = await axios.get(IMAGES_URL, {
        auth: {
          username: IMAGES_USERNAME,
          password: IMAGES_PASSWORD
        },
        mode:'no-cors'
      })
      let ids = res.data.resources.map(img => img.public_id)
      this.setState({images: ids}, console.log(this.state.images))
    }catch(err) {
      console.log('heeeey',err)
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
          <CloudinaryContext cloudName="collinear" >
            <Image publicId={images[photoIndex]} width="540" height="300" gravity="auto" background="auto" crop="fill_pad" />
          </CloudinaryContext>
        </div>
      </div>
    )
  }
}