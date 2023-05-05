import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CreateOrderForm from '../Forms/CreateOrderForm';
import CreateNewUserForm from "../Forms/CreateNewUserForm";
import CreateNewSupplierForm from "../Forms/CreateNewSupplierForm"
import CreateNewPartForm from "../Forms/CreateNewPart";

export default function ActionBar({ role, name , data, setData}) {
  const [popup, setPopup] = React.useState(false);

  const handleClose = () => {
    setPopup(false);
  }

  const renderPopup = () => {
    return (
      <div>
        {name === "Orders" && <CreateOrderForm popup={popup} setPopup={setPopup} data={data} setData={setData} />}
        {name === "Users" && <CreateNewUserForm open={popup} handleClose={handleClose} data={data} setData={setData} />}
        {name === "Suppliers" && <CreateNewSupplierForm open={popup} handleClose={handleClose} data={data} setData={setData} />}
        {name === "Parts" && <CreateNewPartForm open={popup} handleClose={handleClose} data={data} setData={setData} />}
      </div>
    )
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
        (<Box sx={{ ml: 3 }}> 
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
      {name === "Orders" &&
        (<Box sx={{ ml: 3 }}> 
        </Box>)}

     {/* exporting to excel button */}
     {name === "Orders" &&
        (<Button
        color="secondary"
        size="large"
        variant="outlined"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
          },
            }}>Update</Button>)}

      {/* Add spacing between buttons */}
      {name !== "Dashboard" &&
        (<Box sx={{ ml: 3 }}> 
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


