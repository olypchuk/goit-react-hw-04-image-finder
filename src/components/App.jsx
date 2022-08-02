// import data from 'components/contacts.json'
// import { BtnContainer } from './BtnContainer';
import React, { Component } from 'react';
import styled from 'styled-components';
import {BsSearch} from 'react-icons/bs'

// export class TestSwitchBtn extends Component {

//   state = {
//     index:0
//   }
//   switchBtn = (value) => {
//     this.setState(state=>({index:state.index+value}))
//   }

//   render() {
//    const{data}=this.props
//     const { index } = this.state

//   return(  <>

//     <BtnContainer current={index+1} total={data.length} onClick={this.switchBtn} />
//     <p>{index + 1}/{data.length}</p>
//     {data.length>0&&<div><p>{data[index].id}</p>
//     <p>{data[index].label}</p>
//     <p>{data[index].percentage}</p></div>}
//     </>)
//   }
// }

const API_KEY = '27996406-97aa9c49a494d96b999a7c23c'

export class Searchbar extends Component  {
  state = {
    value:''
  }



  render()
  {  return(<header className="Searchbar">
  <form className="SearchForm" >
    <button type="submit" className="SearchForm-button">
      <span className="SearchForm-button-label"><BsSearch/>Search</span>
    </button>

    <input
      className="SearchForm-input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>)
    
}
}

export const ImageGallery = ({data,...otherPoprs}) => {
  
  const items = data.hits

  return (<>
    <ul className="ImageGallery">
      {items?.map(item => {
       
        return (<ImageGalleryItem key={item.id} item={item} {...otherPoprs} />)
      }
      )}
<BsSearch/>
</ul></>
  )
}
export class ImageGalleryItem extends Component {
  state = {
    isModalOpen:false
  }
componentDidUpdate(){
document.addEventListener('keyup', this.closeByEscape)

  }
  componentWillUnmount() {
    document.removeEventListener('keyup',this.closeByEscape)
  }
  openModal = (e) => {
    if (e.target.nodeName === 'IMG') {
     this.setState({ isModalOpen: true })
   }
    
  }
  closeByEscape = (e) => {
    if (e.key === 'Escape')  this.closeModal() }
  
  closeModal=()=>this.setState({isModalOpen:false})
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

export const Loader = () => { }

export const Button = () => { 
  return (<button type="button" className='Button'> load more</button>)
}

export const Modal = ({img,onClick}) => {

  return (<div className="Overlay" onClick={onClick}>
  <div className="Modal">
    <img src={img} alt=""/>
  </div>
</div>)
}
export class App extends Component{

  state = {
    data:[]
  
}
  async componentDidMount() {
    try {
      const response = await fetch(`https://pixabay.com/api/?page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
 
      const res = await response.json()
      
      this.setState({ data: res })
   console.log('this.state.data :>> ', this.state.data);
 
    return res
      
    } catch (error) {
      console.log('error.message :>> ', error.message);
    }
   
}
  render() {
    
    return (<>
      <Searchbar onSubmit={this.state.data} />
      <ImageGallery data={this.state.data}  />
      <Button/>
   
    </>)
  }
}



