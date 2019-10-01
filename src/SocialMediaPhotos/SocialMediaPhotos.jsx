import React, { Component } from 'react'
// replace these with the photos we actually wanna use
import cat1 from './images/cat1.jpeg'
import cat2 from './images/cat2.jpg'
import cat3 from './images/cat3.jpg'
import cat4 from './images/cat4.jpg'
import cat5 from './images/cat5.jpg'
import './socialMediaPhotos.css'


export default class SocialMediaPhotos extends Component{
  state = {
    images: [cat1, cat2, cat3, cat4, cat5],
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
    }, 3000)
  }


  render(){
    const {photoIndex, images} = this.state
    return (
      <div className=" slideshow-container">
        <div className="slideshow-photo">
          <img src={images[photoIndex]} alt="pix"/>
        </div>
      </div>
    )
  }
}