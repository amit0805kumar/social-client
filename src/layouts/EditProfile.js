import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import TaskIcon from "@mui/icons-material/Task";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function EditProfile() {
    const [open, setOpen] = React.useState(false);
    const [relationShip, setRelationsShip] = React.useState('');
    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleChange = (e) => {
        switch (e.target.name) {
        }
      };
  return (
    <div className="tools">
      <div className="row" onClick={handleOpen}>
        <EditIcon />
        <div>Edit</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <div className="main_modal">
          <p className="heading">Update Profile</p>
          
          <TextField id="standard-basic" label="First Name" variant="standard" onChange={(e)=>handleChange(e)} />
          <TextField id="standard-basic" label="Last Name" variant="standard" onChange={(e)=>handleChange(e)} />
          <TextField id="standard-basic" label="Profile Picture" variant="standard" onChange={(e)=>handleChange(e)} />
          <TextField id="standard-basic" label="Cover Picture" variant="standard" onChange={(e)=>handleChange(e)} />
          <TextField id="standard-basic" label="City" variant="standard" onChange={(e)=>handleChange(e)} />
          <TextField id="standard-basic" label="State" variant="standard" onChange={(e)=>handleChange(e)} />
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={relationShip}
          label="Relationship"
          onChange={handleChange}
        >
          <MenuItem value={1}>Single</MenuItem>
          <MenuItem value={2}>Married</MenuItem>
          <MenuItem value={3}>Complicated</MenuItem>
        </Select>
      </FormControl>

          <Button
            variant="contained"
            endIcon={<TaskIcon />}
            onClick={handleClose}
          >
            Update
          </Button>
        </div>
      </Modal>
    </div>
  );
}
