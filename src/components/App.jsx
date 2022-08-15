import React, { useEffect, useState,useCallback } from 'react';
import  Searchbar  from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { FetchImages } from './Fetch/Fetch';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';

export function App() {
  const [data, setData] = useState([])
  const [page, SetPage] = useState(1)
  const [value, setValue] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [isModalOpen, setisModalOpen] = useState(false)
  const [urlPicture, seturlPicture] = useState('')
  const [isVisible, setisVisible] = useState(false)

  useEffect(() => {
    if (!value) return

    const didFetch = async () => {
      try {
         setisLoading(true)
      const res = await FetchImages(page, value)
      if (res.hits.length === 0) {
        toast.error("no matches for this request")
      }
      setData(data => [...data, ...res.hits])
      setisVisible(page < Math.ceil(res.total / 12))
      setisLoading(false)
      } catch (error) {
        console.log('error :>> ', error);
      }
      finally {
        if (page !== 1) {
         let timer= setTimeout(() => {
            window.scrollBy({
            top: 500,
            behavior: 'smooth'
          });
         }, 400)
              return () => {
  clearInterval(timer)
}
        }
      }
     
    }
    didFetch()

  }, [value, page])

  const handleSubmit =useCallback( ({ valueInput }) => {
    if (value === valueInput) return toast.error('You wrote the same value')
    SetPage(1)
    setisVisible()
    setValue(valueInput)
    setData([])
  },[value])
  const loadMore = useCallback(async () => {
    SetPage(page + 1)

  },[page])

  const openModal = useCallback((image) => {
    setisModalOpen(true)
    seturlPicture(image)
    document.documentElement.style.overflow = "hidden"
  },[])
  const closeModal =useCallback( () => {
    setisModalOpen(false)
    seturlPicture('')
    document.documentElement.style.overflow = null

  },[])
  return (<>
    <Searchbar onSubmit={handleSubmit} />
    <ImageGallery data={data} onClick={openModal} />
    <ToastContainer autoClose={2500} />
    {isLoading && <Loader />}
    {isVisible && <Button page={loadMore} />}
    {isModalOpen && <Modal img={urlPicture} onClick={closeModal} />}
  </>)

}
