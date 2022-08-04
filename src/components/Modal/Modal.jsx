import PropTypes from "prop-types"
export const Modal = ({ img, onClick }) => {

  return (<div className="Overlay" onClick={onClick}>
  <div className="Modal">
    <img src={img} alt=""/>
  </div>
</div>)
}

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onClick:PropTypes.func.isRequired
}