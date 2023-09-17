import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CategoryIcon from '@mui/icons-material/Category';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PublicIcon from '@mui/icons-material/Public';
import { Link } from 'react-router-dom';


const MultipleSelect = () => {


  return (
    <div className="ag-format-container">
    <div className="ag-courses_box">
      <div className="ag-courses_item">
        <Link to={'/dashboard/addClub'} className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
          ⚽ Clubs
          </div>
  
          <div className="ag-courses-item_date-box">
          <SportsSoccerIcon/>
            <span className="ag-courses-item_date">
          add
            </span>
          </div>
        </Link>
      </div>
  
      <div className="ag-courses_item">
        <Link  to={'/dashboard/addLeague'} className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
          🏆 League
          </div>
  
          <div className="ag-courses-item_date-box">
          <EmojiEventsIcon/>
            <span className="ag-courses-item_date">
            add
            </span>
          </div>
        </Link>
      </div>
  
      <div className="ag-courses_item">
        <Link to={'/dashboard/addCat'} className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
          🔠 Categories
          </div>
  
          <div className="ag-courses-item_date-box">
          <CategoryIcon/>
            <span className="ag-courses-item_date">
            add
            </span>
          </div>
        </Link>
      </div>
  
      <div className="ag-courses_item">
        <Link to={'/dashboard/AddCountry'} className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
          🌍 Pays
          </div>
  
          <div className="ag-courses-item_date-box">
          <PublicIcon/> 
            <span className="ag-courses-item_date">
            add
            </span>
          </div>
        </Link>
      </div>
  
      <div className="ag-courses_item">
        <Link to={'/dashboard/Addtag'} className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
          🏷️ Tags
          </div>
  
          <div className="ag-courses-item_date-box">
          <LocalOfferIcon/>
            <span className="ag-courses-item_date">
            add
            </span>
          </div>
        </Link>
      </div>
  
  
    </div>
  </div>
  );
};



export default MultipleSelect;
