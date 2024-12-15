import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComplaintState } from "../context/ComplaintProvider";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPssword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { isAdmin } = ComplaintState();

  const navigate = useNavigate();

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

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitSignupForm = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill all fields");
      setOpen(true);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      setOpen(true);
      return;
    }

    try {
      const { data } = await axios.post("/home/signup", {
        username: name,
        email,
        password,
        isAdmin,
      });

      setMessage("Registration is Successful!");
      setOpen(true);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate(isAdmin ? "/ComplaintTable" : "/ComplaintForm");
    } catch (error) {
      setMessage(
        `Error Occurred: ${error.response?.data?.message || error.message}`
      );
      setOpen(true);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* FullName */}

      <TextField
        label="Full Name"
        type="text"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />

      {/* email */}

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* password */}

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

      {/* //ConfirmPassword */}

      <FormControl variant="outlined" fullWidth required>
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showConfirmPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showConfirmPassword
                    ? "hide the password"
                    : "display the password"
                }
                edge="end"
                onClick={handleClickShowConfirmPassword}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="ConfirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={submitSignupForm}
      >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>

      {/* snackbar */}

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

export default Signup;
