import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Email, Lock, AccountCircle, Cake, Close } from "@mui/icons-material";
import { Google as GoogleIcon} from "@mui/icons-material";
import axios from "axios";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider,  signInWithPopup } from "firebase/auth";
import SunCity from "../../assets/suncity.mp4";
import toast from 'react-hot-toast';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [img, setImg] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Username:", username);
    console.log("Birthday:", birthday);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("birthday", birthday);
    formData.append("img", img);

    try {
      const response = await axios.post("http://127.0.0.1:8000/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success("Signup successful!");
        setOtpDialogOpen(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Signup failed. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      await axios.post("http://127.0.0.1:8000/users/google-signup", { token });
      toast.success("Google signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Google signup failed");
    }
  };


  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/verify-email", { email, otp });
      if (response.status === 200) {
        toast.success("Email verification successful!");
        setOtpDialogOpen(false);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("OTP verification failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        minHeight: "140vh", // Ensure minimum height of 100% viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(180deg, #5e3967, #351742)",
        color: darkMode ? "#fff" : "#002a5a",
        margin: 0,
        padding: 0,
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: "1100px",
          minHeight: "80vh",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: 3,
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: 15,
            right: 15,
            color: "white",
            backgroundColor: "#451d6b",
            "&:hover": { backgroundColor: "#8c2fc7" },
          }}
        >
          <Close />
        </IconButton>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: "relative",
            borderRadius: "8px 0 0 8px",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.01)", 
            },
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(70%) contrast(100%) hue-rotate(240deg)", 
            }}
          >
            <source src={SunCity} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Grid>

        <Grid item xs={12} md={6} component={Paper} elevation={6} square  >
          <Box sx={{ p: 6, display: "flex", flexDirection: "column", alignItems: "center" , color: "#331540"}}>
            <Typography variant="h4" fontFamily="'Lilita One'" gutterBottom>
              SIGNUP
            </Typography>
            <Typography variant="subtitle1" fontFamily="'Lilita One'" gutterBottom>
              CREATE AN ACCOUNT TO CONTINUE
            </Typography>

            <Box component="form" onSubmit={handleSignup} sx={{ mt: 2, width: "100%" }}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ startAdornment: <Email /> }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ startAdornment: <Lock /> }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{ startAdornment: <AccountCircle /> }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Birthday"
                type="date"
                variant="outlined"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                InputProps={{ startAdornment: <Cake /> }}
                InputLabelProps={{ shrink: true }}
              />
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 2, mb: 2, fontFamily: "'Lilita One'", color: "white", backgroundColor: "#451d6b", "&:hover": { backgroundColor: "#8c2fc7" } }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </Button>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, fontFamily: "'Lilita One'", color: "white", backgroundColor: "#451d6b", "&:hover": { backgroundColor: "#8c2fc7" } }}>
                SIGNUP
              </Button>
            </Box>

            <Typography variant="body2" fontFamily="'Lilita One'">
              Or sign up with:
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <IconButton
                onClick={handleGoogleSignup}
                sx={{
                  backgroundColor: "#DB4437",
                  color: "white",
                  width: 50,
                  height: 50,
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "#C1351D" },
                }}
              >
                <GoogleIcon />
              </IconButton>
            </Box>

            <Typography variant="body2" sx={{ mt: 2, fontFamily: "'Lilita One'", color: "#331540" }}>
              Already have an account? <Button onClick={() => navigate("/login")} sx={{ color: "#331540", fontFamily: "'Lilita One'" }}>Login</Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* OTP Verification Dialog */}
      <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOtpDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleOtpSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Signup;