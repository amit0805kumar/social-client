import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import TaskIcon from "@mui/icons-material/Task";
import { Avatar, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/authSlice";
import { updateUserService } from "../services/userService";

export default function EditProfile() {
  const [open, setOpen] = React.useState(false);
  const [relationshipStatus, setRelationshipStatus] = React.useState();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState("");
  const [coverPicture, setCoverPicture] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setProfilePicture(user.profilePicture || "");
      setCoverPicture(user.coverPicture || "");
      setCity(user.city || "");
      setState(user.state || "");
      setRelationshipStatus(user.relationshipStatus || 0);
    }
  }, [user]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      let updatedUser = await updateUserService(
        user._id,
        {
          firstName,
          lastName,
          profilePicture,
          coverPicture,
          city,
          state,
          relationshipStatus,
        },
        token
      );

      dispatch(updateUser({ user: updatedUser }));

    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "profilePicture":
        setProfilePicture(e.target.value);
        break;
      case "coverPicture":
        setCoverPicture(e.target.value);
        break;
      case "city":
        setCity(e.target.value);
        break;
      case "state":
        setState(e.target.value);
        break;
      case "relationshipStatus":
        setRelationshipStatus(e.target.value);
        break;
      default:
        break;
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
        <div className="main_modal modalEditProfile">
          <p className="heading">Update Profile</p>

          <div className="form">
            <div className="row">
              <TextField
                id="standard-basic"
                label="First Name"
                variant="standard"
                className="input"
                value={firstName}
                name="firstName"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                id="standard-basic"
                label="Last Name"
                variant="standard"
                className="input"
                value={lastName}
                name="lastName"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="row">
              <TextField
                id="standard-basic"
                label="Profile Picture"
                variant="standard"
                className="input urlInput"
                value={profilePicture}
                name="profilePicture"
                onChange={(e) => handleChange(e)}
              />
              <Avatar src={profilePicture} />
            </div>
            <div className="row">
              <TextField
                id="standard-basic"
                label="Cover Picture"
                variant="standard"
                className="input"
                value={coverPicture}
                name="coverPicture"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="row">
              <TextField
                id="standard-basic"
                label="City"
                variant="standard"
                className="input"
                value={city}
                name="city"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                id="standard-basic"
                label="State"
                variant="standard"
                className="input"
                value={state}
                name="state"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <FormControl className="dropdown" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Relationship
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={relationshipStatus}
                name="relationshipStatus"
                label="Relationship"
                onChange={handleChange}
              >
                <MenuItem value={0}>--Not Selected--</MenuItem>
                <MenuItem value={1}>Single</MenuItem>
                <MenuItem value={2}>Married</MenuItem>
                <MenuItem value={3}>Complicated</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              endIcon={<TaskIcon />}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
