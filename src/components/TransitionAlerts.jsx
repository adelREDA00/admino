import React from 'react';
import Dialog from '@mui/material/Dialog';


export default function TransitionAlerts({handleCloseE,openE,text}) {

 


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
         <p className="message">Superbe ! Votre article  <br /> a été créé avec succès</p> 
         </div> 
         <div className="actions">
            <button className="history" type="button">View </button> 
            <button className="track" type="button">Modifier</button> 
            </div> 
            </div> 
            </div>


      </Dialog>
    </div>
  );
}
