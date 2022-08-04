import React, { Component } from "react"
import { Modal } from "components/Modal/Modal"
import PropTypes from "prop-types"

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen:false
  }
  componentDidUpdate(){
  document.addEventListener('keyup', this.closeByEscape)

  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.closeByEscape)
  
  }
  openModal = (e) => {
    if (e.target.nodeName === 'IMG') {
      this.setState({ isModalOpen: true })
      document.documentElement.style.overflow = "hidden"
   }
    
  }
  closeByEscape = (e) => {
    if (e.key === 'Escape')  this.closeModal() }
  
  closeModal = () => {
    this.setState({ isModalOpen: false });
    document.documentElement.style.overflow = null
  }
  render() {
    const { isModalOpen } = this.state
 
    const{item}=this.props
    const { id, webformatURL, largeImageURL, user } = item
    
  return (<li key={id} className="ImageGalleryItem" onClick={this.openModal}>
    <img src={webformatURL} alt={user} className="ImageGalleryItem-image" />
    {isModalOpen && <Modal img={largeImageURL} onClick={this.closeModal}/>}
</li>)
  }

}
ImageGalleryItem.propTypes = {
  onClick:PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
     
  })
}