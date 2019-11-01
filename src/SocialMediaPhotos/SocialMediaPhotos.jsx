import React, { Component } from 'react'
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

import axios from 'axios'

// replace these with the photos we actually wanna use
// import img2 from './images/dog2.jpeg'
// import img3 from './images/dog3.jpeg'
// import img4 from './images/dog4.jpeg'
// import img5 from './images/dog5.jpeg'
// import img6 from './images/dog6.jpeg'
// import img7 from './images/dog7.jpeg'
// import img8 from './images/dog8.jpeg'
import './socialMediaPhotos.css'
let img1 = 'https://www.dropbox.com/sh/z5pa1ntcberp7c3/AACA73SJ1t1ooh40080-TqK0a?dl=0&preview=20190803_141205_resized.jpg'

export default class SocialMediaPhotos extends Component {
  state = {
    images: [],
    photoIndex: 0
  }

  async componentDidMount() {
    try{
      let res = await axios.get("/images", {
        auth: {
          username:228249614672283,
          password:'Y4d_pgKoR1-XkktifCFxh7KbdLI'
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
            <Image publicId={images[photoIndex]} width="300" crop="scale" />
          </CloudinaryContext>
        </div>
      </div>
    )
  }
}