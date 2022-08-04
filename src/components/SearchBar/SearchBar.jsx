import React,{Component} from "react"
import { BsSearch } from 'react-icons/bs'
import PropTypes from "prop-types"
export class Searchbar extends Component  {
  state = {
    value: '',
 
  }
  handleChange = (e) => {
    this.setState({ value: e.currentTarget.value.toLowerCase().trim() })
  }
//   componentDidUpdate(p,prev) {
// const {value}=this.state
//     console.log('prev.value :>> ', prev.value);
//     console.log('this.state.value :>> ', value);
//     if (prev.value !== value) {
//       this.props.onSubmit({ value })
//     }
//   }
  handleSubmit = async(e) => {
    e.preventDefault();
 
    // this.setState({ value: e.currentTarget.value.value })

    const { value } = this.state
    if (value.length=== 0) {
      alert('введи запрос')
    }
    if (value.length > 0) {

      await this.props.onSubmit({ value })

    }
 e.target.reset()
  }

  render()
  {
    return (<header className="Searchbar">
  <form className="SearchForm" onSubmit={this.handleSubmit}>
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
        onChange={this.handleChange}
    />
  </form>
</header>)
    
}
}
Searchbar.propTypes = {
  onChange: PropTypes.func,
  onSubmit:PropTypes.func.isRequired
}