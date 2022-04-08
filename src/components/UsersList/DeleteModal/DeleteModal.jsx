import React, {useEffect, useState} from 'react';
import './DeleteModal.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {useDispatch} from "react-redux";
import {requestToDeleteUser} from "../../../store/actions/usersAction";

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(props.open);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
    props.setOpen(false);
    props.setId(null);
  };

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])
  return <>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Are you sure?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to delete user with id {props.id}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant="contained">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClose()
            dispatch(requestToDeleteUser(props.id))
          }} autoFocus variant="contained" color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  </>
}

export default DeleteModal;
