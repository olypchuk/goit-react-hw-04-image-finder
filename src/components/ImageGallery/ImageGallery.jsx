import React from "react"
import PropTypes from "prop-types"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"

export const ImageGallery = ({ data, ...otherPoprs }) => {
  return (<>
    <ul className="ImageGallery">
      {data?.map(item =>(<ImageGalleryItem key={item.id} item={item} {...otherPoprs} />)
      
      )}

</ul></>
  )
}
ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
}