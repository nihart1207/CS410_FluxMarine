import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CreateOrderForm from '../Forms/CreateOrderForm';

export default function ActionBar({ role, name }) {
  const [popup, setPopup] = React.useState(false);

  const renderPopup = () => {
    if (name === "Orders") {
        return <CreateOrderForm popup={popup} setPopup={setPopup}/>
    }
  }

  return (
    
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: '64px', // Set the fixed height
        pl: 1, // Add spacing between buttons
        backgroundColor: 'white',
      }}
    >  

      {/* Add spacing between buttons */}
      {name === "Orders" &&
        (<Box sx={{ ml: 2 }}> 
        </Box>)}

     {/* exporting to excel button */}
     {name === "Orders" &&
        (<Button
        color="secondary"
        size="large"
        variant="outlined"
        startIcon={<FileDownloadIcon />}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
          },
            }}>Export</Button>)}

      {/* Add spacing between buttons */}
      {name !== "Dashboard" &&
        (<Box sx={{ ml: 2 }}> 
        </Box>)}
        
        {/* Adding new item button */}
        {name !== "Dashboard" && 
          (<Button
        color="secondary"
        size="large"
        onClick={()=>setPopup(true)}
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
          },
            }}>Add</Button>)}
    
        {/* rendering form based on name */}
        {popup && renderPopup()}
    </Box>
  );
}
