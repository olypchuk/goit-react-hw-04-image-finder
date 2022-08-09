import React, { Component, useEffect,useLayoutEffect } from 'react';
import { Searchbar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { FetchImages } from './Fetch/Fetch';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';
import { useState } from 'react';


const PAGE = 1;
export function App() {
  const [data, setData] = useState([])
  const [page, SetPage] = useState(1)
  const [value, setValue] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [isModalOpen, setisModalOpen] = useState(false)
  const [urlPicture, seturlPicture] = useState('')
  const [isVisible, setisVisible] = useState(false)
  // const getSnapshotBeforeUpdate=()=> {
  //    const { offsetHeight } = document.querySelector('header');
  //     return window.innerHeight - offsetHeight * 2;
  // }
  // useEffect(() => {
  //  if(isLoading) setisLoading(false) 
  // },[isLoading])
  
  // useLayoutEffect(() => {
  //    if (page > 1) {
  //        window.scrollBy({
  //       top: getSnapshotBeforeUpdate(),
  //       behavior: 'smooth',
  //     });
  //  }
  // },[page])

  const loadMore = async () => {

   SetPage(page + 1)
   setisLoading(true)
   const res = await FetchImages(page + 1, value)
   
   setData([...data, ...res.hits])
   setisVisible(page + 1 < Math.ceil(res.total / 12))
   setisLoading(false)
  }
  const didFetch = async ({ valueInput}) => {
    SetPage(1)
    setisLoading(true)
    if(value===valueInput)return toast.error('You wrote the same value')

    const res = await FetchImages(PAGE, valueInput)
    if (res.hits.length ===0) {
    toast.error("no matches for this request")
    }
    setData(res.hits)
    setValue(valueInput)
    setisVisible(page<Math.ceil(res.total/12))
    setisLoading(false)
  }
  const openModal = (image) => {
    setisModalOpen(true)
    seturlPicture(image)
    document.documentElement.style.overflow = "hidden"
  }
  const  closeModal = () => {
    setisModalOpen(false)
    seturlPicture('')
    document.documentElement.style.overflow = null
    
  }
    return (<>
      <Searchbar onSubmit={didFetch}/>
      <ImageGallery data={data} onClick={openModal} />
      <ToastContainer autoClose={2500} />
      {isLoading && <Loader />}
      {isVisible&&<Button page={loadMore} />}
      {isModalOpen && <Modal img={urlPicture} onClick={closeModal}/>}
    </>)

}
// export class Apps extends Component {
//   state = {
//     data: [],
//     page: 1,
//     value: '',
//     isLoading: false,
//     isModalOpen: false,
//     urlPicture: '',
//     isVisible: false
//   }
//   getSnapshotBeforeUpdate() {
//     const { offsetHeight } = document.querySelector('header');
//     return window.innerHeight - offsetHeight * 2;
//   }
//   async componentDidUpdate(prevprops, prevstate, snapshot) {

//     // document.addEventListener('keyup', this.closeByEscape)
//     if (prevstate.isLoading) {
//       this.setState({ isLoading: false })
//     }

//     ////    useLayoutEffect

//     if (this.state.page > 1) {
//       window.scrollBy({
//         top: snapshot,
//         behavior: 'smooth',
//       });
//     }

//   }
  

//   loadMore = async () => {
//     const { page, value } = this.state
//     this.setState((PrevState) => {
//       return { page: PrevState.page + 1 }
//     })
//     this.setState({ page: this.state.page + 1, isLoading: true })
//     const res = await FetchImages(page + 1, value)
//     this.setState({ data: [...this.state.data, ...res.hits], isVisible: this.state.page < Math.ceil(res.total / 12) })
   
//   }
 

//   didFetch = async({value }) => {

//     if(this.state.value===value)return toast.error('You wrote the same value')
//     this.setState({ isLoading: true })
//     const res = await FetchImages(PAGE, value)
//      if (res.hits.length ===0) {
//        toast.error("no matches for this request")
//     }

//     this.setState( { data: res.hits, value, page:this.state.page,isVisible: this.state.page<Math.ceil(res.total/12) })

//   }
//   openModal = (image) => {
//       this.setState({ isModalOpen: true,urlPicture:image})
//       document.documentElement.style.overflow = "hidden"
//   }
//   closeModal = (e) => {

//     this.setState({ isModalOpen: false,urlPicture:'' });
//     document.documentElement.style.overflow = null
    
//   }

//   render() {

//     const { isLoading, data, isModalOpen, urlPicture,isVisible } = this.state


//     return (<>
//       <Searchbar onSubmit={this.didFetch}/>
//       <ImageGallery data={data} onClick={this.openModal} />
//       <ToastContainer autoClose={2500} />
//       {isLoading && <Loader />}
//       {isVisible&&<Button page={this.loadMore} />}
//       {isModalOpen && <Modal img={urlPicture} onClick={this.closeModal}/>}
//     </>)
//   }
// }



