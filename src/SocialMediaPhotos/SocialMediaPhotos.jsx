import React, { Component } from 'react'
// replace these with the photos we actually wanna use
import img1 from './images/dog1.jpeg'
import img2 from './images/dog2.jpeg'
import img3 from './images/dog3.jpeg'
import img4 from './images/dog4.jpeg'
import img5 from './images/dog5.jpeg'
import img6 from './images/dog6.jpeg'
import img7 from './images/dog7.jpeg'
import img8 from './images/dog8.jpeg'
import './socialMediaPhotos.css'


export default class SocialMediaPhotos extends Component{
  state = {
    images: [img1, img7, img3, img4, img5, img6, img2, img8],
    photoIndex: 0
  }
  componentDidMount(){
    this.startSlideShow()
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  startSlideShow=()=>{
    this.interval = setInterval( () => {
      let newIndex = this.state.photoIndex > this.state.images.length - 2 ? 0 : this.state.photoIndex + 1
      this.setState({photoIndex: newIndex})
    }, 10000)
  }


  render(){
    const {photoIndex, images} = this.state
    let style = {
      height: '100%',
      width: '100%',
    }
    return (
      <div className="slideshow-container" style={style}>
        <div className="slideshow-photo" style={style}>
          <img src={images[photoIndex]} alt="pix"/>
        </div>
      </div>
    )
  }
}