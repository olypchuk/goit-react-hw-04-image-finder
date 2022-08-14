import PropTypes from "prop-types"
import { useEffect } from "react"
import { createPortal } from "react-dom"

export const Modal = ({ img, onClick }) => {
  useEffect(() => {
    document.addEventListener('keyup', closeByEscape)
    return () => {
      document.removeEventListener('keyup', closeByEscape)
  }
  })

  const closeByEscape = (e) => {
    if (e.key === 'Escape') onClick()
  }
  const closeByBackdrop = (e) => {
     if (e.target === e.currentTarget) onClick()
  }
    return createPortal(<div className="Overlay" onClick={closeByBackdrop}>
      <div className="Modal">
        <img src={img} alt={img} loading='lazy' />
      </div>
    </div>,document.querySelector('#modal'))
  
}




// export class oldModal extends Component {
//   componentDidMount() {
//   document.addEventListener('keyup', this.closeByEscape)
// }
//   componentWillUnmount() {
//   document.removeEventListener('keyup', this.closeByEscape)
  
//   }
//   closeByEscape = (e) => {
//     if (e.key === 'Escape') this.props.onClick()
//   }
//   closeByBackdrop = (e) => {
//      if (e.target === e.currentTarget)this.props.onClick()
//   }

//   render() {
//   const {img}=this.props
//     return (<div className="Overlay" onClick={this.closeByBackdrop}>
//       <div className="Modal">
//         <img src={img} alt={img} loading='lazy' />
//       </div>
//     </div>)
//   }
// }

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onClick:PropTypes.func.isRequired
}

