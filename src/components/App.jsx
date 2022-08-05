import React, { Component } from 'react';
import { Searchbar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { FetchImages } from './Fetch/Fetch';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';
const PAGE = 1;

export class App extends Component{
  state = {
    data:[],
    page: 1,
    value: '',
    isLoading: false,
    isModalOpen: false,
    urlPicture:''
  }
  getSnapshotBeforeUpdate() {
     const { offsetHeight } = document.querySelector('header');
      return window.innerHeight - offsetHeight * 2;
  }
  async componentDidUpdate(prevprops, prevstate, snapshot) {

    document.addEventListener('keyup', this.closeByEscape)
    if (prevstate.isLoading) {
      this.setState({ isLoading: false })
    } 
    if (this.state.page > 1) {
         window.scrollBy({
        top: snapshot,
        behavior: 'smooth',
      });
   }

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
    this.setState( { data: res.hits, value, page: PAGE })

  }
  openModal = (image) => {
      this.setState({ isModalOpen: true,urlPicture:image})
      document.documentElement.style.overflow = "hidden"
  }
  closeModal = (e) => {

    this.setState({ isModalOpen: false,urlPicture:'' });
    document.documentElement.style.overflow = null
    
  }

  render() {

    const { page, data, isModalOpen, urlPicture } = this.state

const isBtn=data.length/page===12&&data.length>0
    return (<>
      <Searchbar onSubmit={this.didFetch}/>
      <ImageGallery data={data} onClick={this.openModal} />
      <ToastContainer autoClose={2500} />
      {this.state.isLoading && <Loader />}
      {isBtn&&<Button page={this.loadMore} />}
      {isModalOpen && <Modal img={urlPicture} onClick={this.closeModal}/>}
    </>)
  }
}



