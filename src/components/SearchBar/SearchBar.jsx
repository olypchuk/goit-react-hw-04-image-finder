import React,{useState} from "react"
import { BsSearch } from 'react-icons/bs'
import PropTypes from "prop-types"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const  Searchbar=(props)=> {
  const [valueInput,setValueInput]=useState('')
 
  const handleChange = (e) => {
   setValueInput(e.currentTarget.value.toLowerCase().trim() ) 
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (valueInput.length=== 0) {
      toast.warn('please enter something')
    }
    if (valueInput.length > 0) {
      await props.onSubmit({ valueInput })

    }
 e.target.reset()
  }

    return (<header className="Searchbar">
  <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <BsSearch/>
      <span className="SearchForm-button-label">Search</span>
    </button>
        <input
        name="value"
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handleChange}/>
  </form>
</header>)
    

}

// export class Searchbar1 extends Component  {
//   state = {
//     value: '',
 
//   }
//   handleChange = (e) => {
//     this.setState({ value: e.currentTarget.value.toLowerCase().trim() })
//   }

//   handleSubmit = async(e) => {
//     e.preventDefault();
//     const { value } = this.state
//     if (value.length=== 0) {
//       toast.warn('please enter something')
//     }
//     if (value.length > 0) {

//       await this.props.onSubmit({ value })

//     }
//  e.target.reset()
//   }

//   render()
//   {
//     return (<header className="Searchbar">
//   <form className="SearchForm" onSubmit={this.handleSubmit}>
//         <button type="submit" className="SearchForm-button">
//           <BsSearch/>
//       <span className="SearchForm-button-label">Search</span>
//     </button>

//         <input
//         name="value"
//         className="SearchForm-input"
//         type="text"
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//         onChange={this.handleChange}
//     />
//   </form>
// </header>)
    
// }
// }



Searchbar.propTypes = {
  onChange: PropTypes.func,
  onSubmit:PropTypes.func.isRequired
}