import React from 'react'
import './Modal.css'


const Backdrop=(props)=>{
   return  <div className='backdrop'></div>
  }
  
  const ModalOverlay=(props)=>{
   return <div className='modal'>
    <div className='content'>{props.children}</div>
    </div>
  }



function Modal(props) {

  return (
    <>
    <Backdrop onClose = {props.onClose}/>
    <ModalOverlay>{props.children}</ModalOverlay>
    </>
  )
}

export default Modal