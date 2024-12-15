import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { ComplaintState } from "../context/ComplaintProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPssword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { isAdmin } = ComplaintState();

  const handleClickShowPassword = () => {
    setShowPssword(!showPassword);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setMessage("");
  };

  const submitLogInForm = async () => {
    setLoading(true);
    if (!email || !password) {
      setOpen(true);
      setMessage("Kindly enter email and password!");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/home/login", {
        email,
        password,
        isAdmin,
      });

      if (!data) {
        setMessage(data.message || "Unknown Error");
        setOpen(true);
        setLoading(false);
        return;
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setMessage("Login Successful!");
      navigate(isAdmin ? "/ComplaintTable" : "/ComplaintForm");
    } catch (error) {
      console.log(error);
      setMessage(`Error Occured: ${error.response.data.error}`);
      setOpen(true);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl variant="outlined" fullWidth required>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                edge="end"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={submitLogInForm}
      >
        {loading ? <CircularProgress size={24} /> : "LoGIn"}
      </Button>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Box>
  );
};

export default Login;
