
import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationForm from './ConfirmationForm';

function DeleteButtonWithDialog({ userId, handleRequest }) {
  const [open, setOpen] = React.useState(false);

  const handleAgree = () => {
    handleRequest(userId, (success, message) => {
      if (success) {
        setOpen(false);
      } else {
        // Display the error message
        console.error(message);
      }
    });
  };

  return (
    <>
      <IconButton color="secondary" aria-label="edit" onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>
      {open && (
        <ConfirmationForm
          name="delete"
          open={open}
          setAgreed={handleAgree}
          setOpen={setOpen}
        />
      )}
    </>
  );
}

export default DeleteButtonWithDialog;
