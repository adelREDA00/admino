import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Confirm({data,handleClose,handleDelete,currentname}) {




  return (
    <div>
 
      <Dialog
        open={data}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirmation !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Êtes-vous sûr(e) de vouloir supprimer <strong>{currentname}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
          Retour 
          </Button>
          <Button onClick={handleDelete} autoFocus>
          Supprimer 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
