import React from "react"
import PropTypes from "prop-types"

export const ImageGalleryItem =({item,onClick})=> {

  const { id, webformatURL, largeImageURL, user } = item
    
  return (<li key={id} className="ImageGalleryItem" onClick={()=>onClick(largeImageURL)}>
    <img src={webformatURL} alt={user} className="ImageGalleryItem-image" /></li>)}


ImageGalleryItem.propTypes = {
  onClick:PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
     
  })
}