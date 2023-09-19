import React, { useContext,useRef,useEffect, useState } from 'react';
import {  Box, FormControl, InputLabel,Select, MenuItem } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import CloseIcon from '@mui/icons-material/Close';


const CatModalObjPlayer = ({icon , name,handleAddCategory,handleClose }) => {

    const [inputValue, setInputValue] = useState('');
    const [selectedClubs, setSelectedClubs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleClubChange = (event) => {
      setSelectedClubs(Array.from(event.target.selectedOptions, (option) => option.value));
    };
  

 //drag&drop
  //drag&drop


  const [file, setFile] = useState(null);
  const [filedata, setFileData] = useState("");
  const [imgdata, setImgData] = useState(null);





  const handleDeleteImage = () => {
    setFile(null)
   };
 
   const handleDrop = (event) => {
     event.preventDefault();
     const files = event.dataTransfer.files;
     setFile(files[0])
   };
 
   const fileInputRef = useRef(null);
 
   const handleBrowseClick = () => {
     fileInputRef.current.click();
   };


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      setImgData(data);
      setFileData(filename);
  
      setSelectedCards([
        {
          id: 0,
          country_id: selectedClubs[0],
          image_path: filename,
          name: inputValue,
        },
      ]);
    } else {
      setSelectedCards([
        {
          id: 0,
          country_id: selectedClubs[0],
          image_path: "",
          name: inputValue,
        },
      ]);
    }

  }, [inputValue, file]);
  
  


  const useFetchData = (url, setter) => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setter(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [url, setter]);
  };


  const [clubs, setClubs] = useState([]);
  useFetchData('https://api-blog-ten.vercel.app/api/club/', setClubs);


  return (
    <div className="modal">
      <div className="wrapper">
        <div className="title">
          <div className="first">
          <DirectionsRunIcon />
            <h2> jouer </h2>
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
          <ul className='droClub'>

          <div className={`custom-dropdown ${isOpen ? 'open' : ''}`}>
              <div className="selected-item" onClick={toggleDropdown}>
                {selectedClubs.length > 0 ? (
                  selectedClubs.map((clubId) => {
                    const club = clubs.find((club) => club._id === clubId);
                    return <span key={club._id}>{club.name}</span>;
                  })
                ) : (
                  <span className="placeholder">Select clubs</span>
                )}
                <span className="arrow-icon">{isOpen ? '▲' : '▼'}</span>
              </div>
              {isOpen && (
                <div className="dropdown-list">
                  <select multiple value={selectedClubs} onChange={handleClubChange}>
                    {clubs.map((club) => (
                      <option key={club._id} value={club._id}>
                        {club.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

          </ul>
          <ul>
          <div className='Card' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <div className="top">
        <p>Drop or Select file</p>
      </div>
      <div className="drag-area">
   
        <span className="select" onClick={handleBrowseClick}>
        Drop files here or click <span>browse</span>  thorough your machine
        </span>
        <input
          name="file"
          type="file"
          className="file"
          id="fileInput"
          multiple
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="container">
      {file && (
          <div className="image" >
            <span className="delete" onClick={() => handleDeleteImage()}>
              &times;
            </span>
            
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />

          </div>
         )}
      </div>

    </div>
          </ul>
        </div>
        <div className="details">
     
     

          <button type="button" className="button">
  <span className="button__text">Add </span>

  <span    onClick={() => {
    handleAddCategory(selectedCards, file, imgdata);
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

export default CatModalObjPlayer;