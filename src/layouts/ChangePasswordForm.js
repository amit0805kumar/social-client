import {  useState } from "react";
import { Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PasswordIcon from "@mui/icons-material/Password";

import {  useSelector } from "react-redux";
import { changePasswordService } from "../services/userService";

export default function ChangePasswordForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [dpassword, setDpassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "password":
        setPassword(e.target.value);
        break;
      case "dpassword":
        setDpassword(e.target.value);
        break;
    }
  };

  const handleChangePassword = async () => {
    try {
      if (password !== "" && dpassword !== "" && password === dpassword) {
        const res = await changePasswordService(user._id,oldPassword, password);
        if (res.success) {
          alert("Password changed successfully");
          setDpassword("");
          setPassword("");
          setOldPassword("");
          handleClose();
        }else{
            setError(res.message || "Failed to change password");
        }
      } else {
        setError("Passwords do not match or fields are empty");
      }
    } catch (error) {
      console.error("Change password failed:", error);
    }
  };

  return (
    <div className="tools">
      <div className="row"  onClick={handleOpen}>
        <PasswordIcon />
        <div>Change Password</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <div className="main_modal modalChangePassword">
          <p className="heading">Change Password</p>

          <div className="formWrapper">
            <input
              name="oldPassword"
              required
              placeholder="Old Password"
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
            />
            <input
              name="password"
              required
              placeholder="Password"
              type="password"
              onChange={(e) => handleChange(e)}
              value={password}
            />
            <input
              name="dpassword"
              required
              placeholder="Confirm Password"
              type="password"
              onChange={(e) => handleChange(e)}
              value={dpassword}
            />
            {error && <p className="errorMessage">*{error}</p>}
            <Button
              variant="contained"
              size="large"
              color="success"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
