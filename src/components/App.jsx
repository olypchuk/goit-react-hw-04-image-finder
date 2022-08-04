import React, { Component } from 'react';
import { Searchbar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { FetchImages } from './Fetch/Fetch';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PAGE = 1;

export class App extends Component{
  state = {
    data:[],
    page: 1,
    value: '',
    isLoading:false
  }
  
  async componentDidUpdate(prevprops, prevstate) {

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
      return {page: PrevState.page + 1 }})
    this.setState({ page: this.state.page + 1 ,isLoading:true})
    const res= await FetchImages(page+1,value)
    this.setState({ data: [...this.state.data, ...res.hits]})  
   
  }
 

  didFetch = async ({ value }) => {
    this.setState({ isLoading: true })
    const res = await FetchImages(PAGE, value)
     if (res.hits.length ===0) {
       toast.error("no matches for this request")
     }
    this.setState( { data: res.hits, value, page: PAGE, isLoading: false })

  }

  render() {

const { page,  data } = this.state
const isBtn=data.length/page===12&&data.length>0
    return (<>
      <Searchbar onSubmit={this.didFetch}/>
      <ImageGallery data={data} />
      <ToastContainer autoClose={2500} />
      {this.state.isLoading && <Loader />}
      {isBtn&&<Button page={this.loadMore} />}

    </>)
  }
}



