import * as React from 'react';
import {useState} from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Card from './Card';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ ApiData,data1,handleAddCategory,open,handleCloseFullModal }) {



 


  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardClick = (data) => {
    const isSelected = selectedCards.some((card) => card.id === data.id) || data1.some((selected) => selected.id === data.id);
    if (isSelected) {
      const updatedCards = selectedCards.filter((card) => card.id !== data.id);
      setSelectedCards(updatedCards);
    } else {
      const updatedCards = [...selectedCards, data];
      setSelectedCards(updatedCards);
    }
  };

  return (
    <div >
    
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseFullModal}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ backgroundColor: 'black', position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseFullModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} className='tut'
            component="div">
            Choisissez les articles, puis cliquez sur 'ajouter'
            

            </Typography>
            <Button autoFocus color="inherit" onClick={()=>{
              handleAddCategory(selectedCards)
            }}>
              Ajouter
            </Button>
          </Toolbar>
        </AppBar>



        <div className="card_container">


        

    
        <div className="drop">
      <div className="drop__container" id="drop-items">
        {ApiData.map((data) => {
          const isSelected = selectedCards.some((card) => card.id === data.id) || data1.some((selected) => selected.id === data.id);
          const cardClasses = `drop__card ${isSelected ? 'active' : ''}`;

          return (
            <div
              key={data.id}
              className={cardClasses}
              onClick={() => handleCardClick(data)}
            >
              <div className="drop__data">
                <img src={data.image_path} alt="" className="drop__img" />
                <div>
                  <h1 className="drop__name">{data.name}</h1>
                  <span className="drop__profession">{data.type}</span>
                </div>
              </div>

              <div>
                <a href="#" className="drop__social">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="#" className="drop__social">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="#" className="drop__social">
                  <i className="bx bxl-twitter"></i>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>



        </div>

      </Dialog>
    </div>
  );
}
