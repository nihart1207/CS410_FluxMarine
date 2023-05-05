import React from 'react';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DateRangeDialog from './DateRangeDialog';

export default function ExportButtonForm() {

    const [open, setOpen] = React.useState(false);

    const onClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Button
        color="secondary"
        size="large"
        onClick={()=>setOpen(true)}
        variant="outlined"
        startIcon={<FileDownloadIcon />}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
          },
            }}>Export</Button>
            {open &&  <DateRangeDialog open={open}  onClose={onClose} /> }
        </div>
    )
}