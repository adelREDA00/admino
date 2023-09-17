import { filter } from 'lodash';
import axios from 'axios';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import Confirm from './Confirm';
import { useNavigate } from 'react-router-dom';



// @mui
import {
  Card,
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
import { EditContext } from "../context/EditConetext";



// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Titre ', alignRight: false },
  { id: 'Auther', label: 'Auteur', alignRight: false },
  { id: 'updated At', label: 'Créé le', alignRight: false },
  { id: 'created At', label: 'Mis à jour le', alignRight: false },
  { id: 'status', label: 'Statut ', alignRight: false },
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
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Tabel({posts,reFetch}) {
  const navigate = useNavigate();

  const { token ,user} = useContext(AuthContext);

  const { Id,dispatchEdit} = useContext(EditContext);





  const USERLIST = posts
//tracking the current cat id
const [currentId , setcurrentId] = useState(null)
const [currentname , setcurrentname] = useState('')

const trackId = (id,name)=>{
  setcurrentId(id)
  setcurrentname(name)
}
  
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/posts/${currentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          userid: user._id, // Pass the username in the request body
        },
      });
      // Refresh the data after deleting the league
      reFetch();
      //close the edit&delete popUp
      setOpen(null)
    } catch (error) {
      console.error('Error deleting post:', error);
    }
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
      const res = await axios.delete("/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { postsIds: selectedIds }, // Pass the array of selected IDs in the request body
      });
      // Refresh the data after deleting the categories
      reFetch();
      setSelected([])
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = ()=>{
    dispatchEdit({ type: "EDIT_START", payload: currentId });
    navigate('/dashboard/edit');


  }


  return (
    <>
      <Container>

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
    const { _id, user, createdAt,updatedAt,title } = row;
    const selectedUser = selected.indexOf(_id) !== -1; // Use _id instead of name

    return (
      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
        <TableCell padding="checkbox">
          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, _id)} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <CircleIcon className='test' />
            <Typography variant="subtitle2" Wrap>
              {title}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left">{user.username}</TableCell>

        <TableCell align="left">{createdAt.split("T")[0]}</TableCell>
        <TableCell align="left">{updatedAt.split("T")[0]}</TableCell>


        <TableCell align="left">
          <Label color={(!title && 'error') || 'success'}>{"Publié "}</Label>
        </TableCell>

        <TableCell onClick={() => {
          trackId(_id,title)
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
        <MenuItem onClick={handleEdit}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
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