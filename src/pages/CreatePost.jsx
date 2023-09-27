import React, { useRef,useEffect,useState } from 'react';
import {  Autocomplete,TextField, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TransitionAlerts from "../components/TransitionAlerts"
import EditorFull from "../components/EditorFull"



import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
//import  DragDrop from "../components/DragDrop";


const CreatePostForm = () => {
  const [qcontent, setContent] = useState('');

  const [file, setFile] = useState(null);


  const { token,user } = useContext(AuthContext);
// !!!!!---get the user name from the token ---!!!!

  const [postValues, setPostValues] = useState({
    title: '',
    desc: '',
    content: '',
    categories: [],
    tags: [],
    player: [],
    country: null,
    league: null,
    club:null,
    photo:'',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const [openE, setOpenE] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);


  const handleCloseEditor = () => {
    setOpenEditor(!openEditor)
  };


  const handleCloseE = () => {
    setOpenE(!openE)
  };

  const handleSubmit = async () => {
    const postData = {
      title: postValues.title,
      desc: postValues.desc,
      content: qcontent,
      //video: postValues.video,
      user: user._id,
      club: postValues.club, //*--------
      categories: postValues.categories.map((cat) => cat._id),        
      tags: postValues.tags.map((tag) => tag._id), 
      player: postValues.player.map((pl) => pl._id),        
      country: postValues.country,//*--------
      league: postValues.league,//*--------
    };

      const key = token; // Replace with your actual authentication token
      const config = {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      };

      if (file) {
        const data =new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        postData.photo = filename;
        try {
          await axios.post("http://localhost:5000/api/upload", data);
        } catch (err) {}
      }

      try {
         
       const res =  await axios.post('https://apiblognode.onrender.com/api/posts/', postData, config);

        // Handle success or any additional logic
      
        //open the success
        setOpenE(true)
        

      } catch (err) {
        console.log(err);
      }
  
     
      

    
  };

//quil content
  const handleEditorChange = (value) => {
    setContent(value);
  };

  






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

  const [categories, setCategories] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [leagues, setLeague] = useState([]);
  const [Country, setCountry] = useState([]);
  const [tags, setTags] = useState([]);
  const [player, setPlayer] = useState([]);



  useFetchData('https://apiblognode.onrender.com/api/categories/', setCategories);
  useFetchData('https://apiblognode.onrender.com/api/club/', setClubs);
  useFetchData('https://apiblognode.onrender.com/api/league/', setLeague);
  useFetchData('https://apiblognode.onrender.com/api/country/', setCountry);
  useFetchData('https://apiblognode.onrender.com/api/tags/', setTags);
  useFetchData('https://apiblognode.onrender.com/api/player/', setPlayer);


  const handleTagChange = (event, selectedTags) => {
    setPostValues({ ...postValues, tags: selectedTags });
  };

  const handlePlayerChange = (event, selectedPlayer) => {
    setPostValues({ ...postValues, player: selectedPlayer });
  };

  const handleCatChange = (event, selectedCat) => {
    setPostValues({ ...postValues, categories: selectedCat });
  };


  //drag&drop
  //drag&drop




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

  return (
<Box className="createPost">


    {/* Left Section */}
    <div className="left" >

      <TextField
        name="title"
        label="Titre du post"
        fullWidth
        variant="outlined"
        placeholder="Titre du post"
        value={postValues.title}
        onChange={handleInputChange}
      />

      <Box mt={2}>
        <TextField
          name="desc"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          label="Description"
          placeholder="Description"
          value={postValues.desc}
          onChange={handleInputChange}
        />
      </Box>

      <Box mt={2} style={{ height: '90px' }}>
      <Typography variant="h6" gutterBottom style={{ color: 'grey', opacity: 0.9 }}>
  Content
</Typography>
<div className="create_btn">
<button className="continue-application" onClick={()=>{
  setOpenEditor(true)
}}>
    <div>
        <div className="pencil"></div>
        <div className="folder">
            <div className="top">
                <svg viewBox="0 0 24 27">
                    <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                </svg>
            </div>
            <div className="paper"></div>
        </div>
    </div>
    Commencer à écrire
</button>
</div>


   <EditorFull openEditor={openEditor} qcontent={qcontent} handleCloseEditor={handleCloseEditor} handleEditorChange={handleEditorChange} />
      </Box>

     


      <Box mt={6}>
      <Typography variant="h6" gutterBottom style={{ color: 'grey', opacity: 0.9 }}>
  Cover
</Typography>
        {/* Additional logic for handling image upload */}
        <div className='Card' onClick={handleBrowseClick} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <div className="top">
        <p>Drop or Select file</p>
      </div>
      <div className="drag-area">
   
        <span className="select" >
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
      </Box>
    </div>

    {/* Right Section */}
    <div className="right"  >


    
    <Box mt={2} ml={2}>
        <FormControl fullWidth variant="outlined">
          <Autocomplete
            multiple
            limitTags={2}
            id="Categories"
            options={categories}
            getOptionLabel={(option) => option.name}
            onChange={handleCatChange}
            value={postValues.categories}
            renderInput={(params) => (
              <TextField {...params} label="catégorie " placeholder="Favorites" />
            )}
            classes={{ tag: 'small-font' }}
          />
        </FormControl>
      </Box>

      <Box mt={2} ml={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Pays </InputLabel>
          <Select
            name="country"
            label="Pays "
            value={postValues.country}
            onChange={handleInputChange}
          >
            {Country.map((country) => (
            <MenuItem key={country._id} value={country._id}>
              {country.name}
            </MenuItem>
          ))}
            {/* Add more menu items for countries */}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2} ml={2}>
        <FormControl fullWidth variant="outlined">
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={tags}
            getOptionLabel={(option) => option.name}
            onChange={handleTagChange}
            value={postValues.tags}
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="Favorites" />
            )}
            classes={{ tag: 'small-font' }}
          />
        </FormControl>
      </Box>

      <Box mt={2} ml={2}>
        <FormControl fullWidth variant="outlined">
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={player}
            getOptionLabel={(option) => option.name}
            onChange={handlePlayerChange}
            value={postValues.player}
            renderInput={(params) => (
              <TextField {...params} label="player" placeholder="Favorites" />
            )}
            classes={{ tag: 'small-font' }}
          />
        </FormControl>
      </Box>

      <Box mt={2} ml={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>League</InputLabel>
          <Select
            name="league"
            label="Leagues"
            value={postValues.league}
            onChange={handleInputChange}
          >
            {leagues.map((league) => (
            <MenuItem key={league._id} value={league._id}>
            {league.name}
          </MenuItem>          
          ))}
            {/* Add more menu items for leagues */}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2} ml={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Club</InputLabel>
          <Select
            name="club"
            label="club"
            value={postValues.club}
            onChange={handleInputChange}
          >
             {clubs.map((club) => (
            <MenuItem key={club._id} value={club._id}>
              {club.name}
            </MenuItem>
          ))}
            {/* Add more menu items for leagues */}
          </Select>
        </FormControl>
      </Box>

      <br />
      <div className="btn">
   

        <button onClick={handleSubmit} class="cssbuttons-io-button">  Publier 
  <div class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
  </div>
</button>
          <TransitionAlerts text={"L'article a été enregistré avec succès"} openE={openE} handleCloseE={handleCloseE}  />
      </div>


    </div>
  
</Box>

  );
};

export default CreatePostForm;
