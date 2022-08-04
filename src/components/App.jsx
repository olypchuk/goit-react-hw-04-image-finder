// import data from 'components/contacts.json'
// import { BtnContainer } from './BtnContainer';
import React, { Component } from 'react';
import styled from 'styled-components';
// import {BsSearch} from 'react-icons/bs'
import { Searchbar } from './SearchBar/SearchBar';
import { Audio } from  'react-loader-spinner'
import { FetchImages } from './Fetch/Fetch';

import { ImageGallery } from './ImageGallery/ImageGallery';
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
const PAGE = 1;

export const StyledLoader=styled.div`
margin: 0 auto;
     height:80px;
    width :180px;
`
export const Loader = () => { 
  return (<StyledLoader>
    <Audio
    height = "80"
    width = "180"
    radius = "9"
   color='#3f51b5'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
  
  />
  </StyledLoader>)
}

export const StyledButtonCont=styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  margin: 5px;
`
export const Button = ({ page }) => { 

  return (<StyledButtonCont> <button type="button" className='Button' onClick={page}> load more</button></StyledButtonCont>)
}

export class App extends Component{
  state = {
    data:[],
    page: 1,
    value: '',
    isLoading:false
  }
  
  async componentDidUpdate(prevprops, prevstate) {
  
  //  console.log('prevstate.value :>> ', prevstate.value);
  //  console.log('this.state.value :>> ', this.state.value);
  //  console.log('prevstate.page', prevstate.page)
  //  console.log('this.state.page :>> ', this.state.page);
    if (prevstate.isLoading) {
        this.setState({isLoading:false})
    }

  //   if (prevstate.page !== this.state.page||prevstate.value!==this.state.value) {
  //     console.log('fetchhh :>> ',);
  //       const res = await FetchImages(prevstate.page , prevstate.value)

  // this.setState({ data: res.hits,value:prevstate.value,page: PAGE,isLoading:false})
  //   }

}
  loadMore = async () => {
    const { page, value } = this.state
    this.setState((PrevState) => {
      return {page: PrevState.page + 1
    }
})
    this.setState({ page: this.state.page + 1 ,isLoading:true})

    const res= await FetchImages(page+1,value)
    this.setState({ data: [...this.state.data, ...res.hits]})  
   
  }
 

  didFetch = async ({ value }) => {
  this.setState({isLoading:true})
    const res = await FetchImages(PAGE, value)

  this.setState({ data: res.hits,value,page: PAGE,isLoading:false})

  }  
 
  render() {
    const { page,  data } = this.state
    console.log('page :>> ', page);
    console.log('data :>> ', data);
const isBtn=data.length/page===12&&data.length>0
    return (<>
      
      <Searchbar onSubmit={this.didFetch} />

      <ImageGallery data={data} />
      {this.state.isLoading && <Loader />}
      {isBtn&&<Button page={this.loadMore} />}

    </>)
  }
}



