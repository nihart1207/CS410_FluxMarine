
import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmationForm from './ConfirmationForm';

function EditButtonWithDialog({ userId, handleEditRequest }) {
  const [open, setOpen] = React.useState(false);

  const handleAgree = () => {
    handleEditRequest(userId, (success, message) => {
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
        <EditIcon />
      </IconButton>
      {open && (
        <ConfirmationForm
          name="edit"
          open={open}
          setAgreed={handleAgree}
          setOpen={setOpen}
        />
      )}
    </>
  );
}

export default EditButtonWithDialog;
