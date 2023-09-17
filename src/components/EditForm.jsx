import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';


export default function EditForm( {cat,handleEdit,currentname,datae,handleCloseE} ) {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleInputChange = (event) => {
    setNewCategoryName(event.target.value);
 
  };


  return (
    <div>
 
      <Dialog open={datae} >
        <DialogTitle>  Modifier </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Veuillez entrer votre nouvelle {cat} ici 
          </DialogContentText>
          <TextField
          
            margin="dense"
            id="name"
            label={currentname}
            type="email"
            fullWidth
            variant="standard"
            value={newCategoryName}
           onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseE}>Annuler </Button>
          <Button onClick={()=>{
            handleEdit(newCategoryName)
          }}>Modifier </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
