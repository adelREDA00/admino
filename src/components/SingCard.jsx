import React from 'react';
import Dialog from '@mui/material/Dialog';


export default function SingCard({handleCloseE,handlePushToLogin,openE,username,btn,text,desc}) {

 


  return (
    <div>
 
      <Dialog
        open={openE}
        onClose={handleCloseE}
        aria-labelledby="responsive-dialog-title"
        className='suc_model'
      >

<div className="card"> 
  <button className="dismiss" type="button" onClick={handleCloseE}>×</button> 
  <div className="header"> 
    <div className="image">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </div> 
      <div className="content">
         <span className="title"> {text} </span> 
         <p className="message"> {desc} <br /> <strong> @{username}</strong> </p> 
         </div> 
         <div className="actions">
            <button onClick={handlePushToLogin} className="history" type="button"> {btn} </button> 
            
            </div> 
            </div> 
            </div>


      </Dialog>
    </div>
  );
}
