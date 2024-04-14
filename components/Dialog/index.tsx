import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IDialogProps{
children: ReactNode;
onClose: () => void;
handleClickOpen: () => void;
open: boolean;
}
export default function ModalDialog({open, onClose, handleClickOpen, children}: IDialogProps) {



  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        {children}
      </Dialog>
    </div>
  );
}
