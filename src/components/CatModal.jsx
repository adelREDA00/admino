import React, { useContext, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import CloseIcon from '@mui/icons-material/Close';


const CatModal = ({icon , name,handleAddCategory,handleClose }) => {
  const [inputValue, setInputValue] = useState('');


 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="modal">
      <div className="wrapper">
        <div className="title">
          <div className="first">
            {icon}
            <h2> {name} </h2>
          </div>
          <div onClick={handleClose} className="second">
            <CloseIcon />
          </div>
        </div>
        <div className="content">
          <p>Veuillez entrer le nom dans le champ de saisie</p>
          <ul>
            <input
              type="text"
              spellCheck="false"
              autoFocus
              value={inputValue}
              onChange={handleInputChange}
              className='first'
            />
          </ul>
     
        </div>
        <div className="details">
          <p>
           
          </p>
     

          <button type="button" className="button">
  <span className="button__text">Add </span>

  <span  onClick={()=>{
            handleAddCategory(inputValue)
          }} className="button__icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg">
      <line y2="19" y1="5" x2="12" x1="12"></line>
      <line y2="12" y1="12" x2="19" x1="5"></line>
  
  </svg>
  
  </span>
</button>
        </div>
      </div>
    </div>
  );
};

export default CatModal;