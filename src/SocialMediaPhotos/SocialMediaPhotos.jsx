import React, { Component } from 'react'
import { Image, CloudinaryContext } from 'cloudinary-react';
import axios from 'axios'
import { debounce } from "lodash";
import './socialMediaPhotos.css'

export default class SocialMediaPhotos extends Component {
  state = {
    images: [],
    photoIndex: 0
  }

  constructor(props) {
    super(props);

    this.photo = React.createRef();

    this.state = {
      boundingRect: {
        height: 0,
        width: 0
      },
      photoIndex: 0,
      images: ['']
    }
  }

  async componentDidMount() {
    this.handlePhotoResize();
    this.debouncedResize = debounce(this.handlePhotoResize, 100);
    window.addEventListener("resize", this.debouncedResize, false);

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
    window.removeEventListener("resize", this.debouncedResize, false);
  }

  handlePhotoResize = () => {
    const boundingRect = this.photo.current.getBoundingClientRect();
    this.setState({ boundingRect });
  };

  startSlideShow = () => {
    this.interval = setInterval(() => {
      let newIndex = this.state.photoIndex > this.state.images.length - 2 ? 0 : this.state.photoIndex + 1
      this.setState({ photoIndex: newIndex })
    }, 10000)
  }

  render() {
    const { photoIndex, images, boundingRect } = this.state
    let style = {
      height: '100%',
      width: '100%',
    }
    return (
      <div className="slideshow-container" style={style}>
        <div className="slideshow-photo" style={style} ref={this.photo}>
          <CloudinaryContext cloudName="collinear-group" >
            <Image publicId={images[photoIndex]} width={ boundingRect.width } height={ boundingRect.height } radius="5" gravity="auto" background="auto" crop="fill_pad" />
          </CloudinaryContext>
        </div>
      </div>
    )
  }
}