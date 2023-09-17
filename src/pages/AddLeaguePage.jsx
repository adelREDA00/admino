import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import axios from 'axios';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import { useFetch } from "../hooks/useFetch";
import CircleIcon from '@mui/icons-material/Circle';
import CatModalObj from '../components/CatModalObj';
import Confirm from '../components/Confirm';
import EditForm from '../components/EditForm';
import  FullScreenDialog from '../components/FullModal'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateIcon from '@mui/icons-material/Create';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';



// @mui
import {
  Card,
  Avatar,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nom', alignRight: false },
  { id: 'Created At', label: 'Créé le', alignRight: false },
  { id: 'updated At', label: 'Mis à jour le ', alignRight: false },
  { id: 'status', label: 'Utilisation', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AddingPage() {

  const PF = "http://localhost:5000/images/";


  const { token } = useContext(AuthContext);
  const { data1, loading1, error1, reFetch } = useFetch("/api/league/", token);

  const USERLIST = data1
  //tracking the current cat id
   const [currentId , setcurrentId] = useState(null)
   const [currentname , setcurrentname] = useState('')
 
   const trackId = (id,name)=>{
     setcurrentId(id)
     setcurrentname(name)
   }
  
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/league/${currentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh the data after deleting the category
      reFetch();
      //close the edit&delete popUp
      setOpen(null)
    } catch (error) {
      console.error('Error deleting leagues:', error);
    }
  };
  //close the model
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseFullModal = () => {
    setIsFullModalOpen(false);
  };

  //adding cat 


  const handleAddObj = async (inputValue, file, data) => {
    let clubsData = inputValue.map(({ id, country_id, image_path, name }) => ({
      id,
      country_id,
      image_path,
      name,
    }));
  
    // Check if file exists and add it to the data object
    if (file) {
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }
  
    try {
      const res = await axios.post(
        "/api/league",
        clubsData, // Send the modified array of club objects
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      reFetch();
      // Close the modal
      handleCloseFullModal();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding league:", error);
    }
  };
  
  


    const [isActive, setIsActive] = useState(false);
  
    const toggleMenu = () => {
      setIsActive(!isActive);
    };



  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);

  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n._id); // Use _id instead of name
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  
  const handleClick = (event, _id) => { // Remove the name parameter
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenFullModal = () => {
    setIsFullModalOpen(true);
  };

  
  const [ApiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    
      const API = 'jq2m1ECINqEAsH0B9oaGQQ1nVqkMM4PkqRhR6lCClQi6Hppxd4npdZCk2CXX' 
  
      try {
        const response = await axios.get(`/api/football/leagues?api_token=${API} `);
        setApiData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);



 
  const [opend, setOpend] = useState(false);

     //delete
     const handleDeleteconf = async () => {
      setOpend(true)
    };

  const handleClose = () => {
    setOpend(false);
    setOpen(null)
  };


  
  const handleDeleteall = async () => {
    try {
      const selectedIds = selected.map((id) =>id); // Assuming the selected IDs are stored in the "selected" array
    
      const res = await axios.delete("/api/league", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { leagueIds: selectedIds }, // Pass the array of selected IDs in the request body
      });
      // Refresh the data after deleting the categories
      reFetch();
      setSelected([])
    } catch (error) {
      console.error("Error deleting league:", error);
    }
  }; 


  const cat = "league"

   const [openE, setOpenE] = useState(false);


  const handleCloseE = () => {
    setOpenE(null)
    setOpen(null)
  };

  const handleEditopen = async () => {
    setOpenE(true)
    };
    
    const handleEdit = async (name) => {
      try {
        const updatedCategory = {
          name: name
        };
        
        const response = await axios.put(`/api/league/${currentId}`, updatedCategory, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        reFetch();
        setOpenE(false)
        setOpen(false)
  
      } catch (error) {
        console.error('Error updating league:', error);
      }
    };
    
  return (
    <>
      {isModalOpen && <CatModalObj name={"league"} handleAddCategory={handleAddObj}  icon={<EmojiEventsIcon/>} open={true} handleClose={handleCloseModal} />}

      {isFullModalOpen &&
        <FullScreenDialog open={true} data1={data1} handleAddCategory={handleAddObj} ApiData={ApiData} handleCloseFullModal={handleCloseFullModal} />
} 
      <Helmet>
        <title> add | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack  direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography className='topTitle' variant="h4" gutterBottom>
        <EmojiEventsIcon /> Ligue
          </Typography>
        <div className="floating">
      <div className={`floating__container `}>
        <div className={`floating__toggle ${isActive ? 'active' : ''} `} id="floating-toggle" onClick={toggleMenu}>
          <AddCircleIcon className="icon"/>
        </div>
       

        <ul>
          <a href="#" className="floating__link">
            <div className="floating__icon">
            <EmojiEventsIcon onClick={handleOpenFullModal}/>
            </div>
          </a>

          <a href="#" className="floating__link">
            <div className="floating__icon">
      
            </div>
          </a>

          <a href="#" className="floating__link" onClick={handleOpenModal}>
            <div className="floating__icon">
            <CreateIcon />
            </div>
          </a>
        </ul>
      </div>
    </div>
          

       

   
        </Stack>



        <Card>
          <UserListToolbar numSelected={selected.length} ids={handleDeleteall} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
     <TableBody>
  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
    const { _id, name,id, createdAt,image_path, updatedAt } = row;
    const selectedUser = selected.indexOf(_id) !== -1; // Use _id instead of name
    let imgSrc;
    if(id===0){
      imgSrc = PF + image_path
    }else{
      imgSrc = image_path
    }
    return (
      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
        <TableCell padding="checkbox">
          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, _id)} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar className='av' alt={name} src={imgSrc} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{createdAt.split("T")[0]}</TableCell>

        <TableCell align="left">{updatedAt.split("T")[0]}</TableCell>


        <TableCell align="left">
          <Label color={(!name && 'error') || 'success'}>{"utilisée"}</Label>
        </TableCell>

        <TableCell onClick={() => {
          trackId(_id,name)
        }} align="right">
          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
            <Iconify icon={'eva:more-vertical-fill'} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  })}

  {emptyRows > 0 && (
    <TableRow style={{ height: 53 * emptyRows }}>
      <TableCell colSpan={6} />
    </TableRow>
  )}
</TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
         <EditForm cat={cat}  handleEdit={handleEdit} currentname={currentname} datae={openE} handleCloseE={handleCloseE} />
        <MenuItem  onClick={handleEditopen} >
          <Iconify   icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Modifier
        </MenuItem>

        <MenuItem onClick={handleDeleteconf} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Supprimer
        </MenuItem>
        <Confirm data={opend} handleClose={handleClose} handleDelete={handleDelete} currentname={currentname} />
      </Popover>
    </>
  );
}