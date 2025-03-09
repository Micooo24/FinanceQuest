import React, { useState, useEffect } from "react";
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
import { Google as GoogleIcon } from "@mui/icons-material";
import axios from "axios";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SunCity from "../../assets/suncity.mp4";
import toast from 'react-hot-toast';

const Signup = () => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // Initialize as an array of empty strings
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignup = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("username", values.username);
    formData.append("birthday", values.birthday);
    formData.append("img", values.img);

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
    } finally {
      setSubmitting(false);
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
      const response = await axios.post("http://127.0.0.1:8000/users/verify-email", { email: values.email, otp: otp.join("") });
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

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Ensure only one character
    setOtp(newOtp);

    // Automatically move to the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    birthday: Yup.date()
      .required("Required")
      .test("age", "You must be at least 18 years old", function (value) {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          return age - 1 >= 18;
        }
        return age >= 18;
      }),
    img: Yup.mixed().required("Required"),
  });

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

            <Formik
              initialValues={{ email: "", password: "", username: "", birthday: "", img: null }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({ setFieldValue, isSubmitting, touched, errors }) => (
                <Form style={{ width: "100%" }}>
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="Email"
                    variant="outlined"
                    name="email"
                    InputProps={{ startAdornment: <Email /> }}
                    helperText={<ErrorMessage name="email" />}
                    error={touched.email && Boolean(errors.email)}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    InputProps={{ startAdornment: <Lock /> }}
                    helperText={<ErrorMessage name="password" />}
                    error={touched.password && Boolean(errors.password)}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="Username"
                    variant="outlined"
                    name="username"
                    InputProps={{ startAdornment: <AccountCircle /> }}
                    helperText={<ErrorMessage name="username" />}
                    error={touched.username && Boolean(errors.username)}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="Birthday"
                    type="date"
                    variant="outlined"
                    name="birthday"
                    InputProps={{ startAdornment: <Cake /> }}
                    InputLabelProps={{ shrink: true }}
                    helperText={<ErrorMessage name="birthday" />}
                    error={touched.birthday && Boolean(errors.birthday)}
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
                      onChange={(e) => setFieldValue("img", e.target.files[0])}
                    />
                  </Button>
                  <ErrorMessage name="img" component="div" style={{ color: 'red' }} />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, fontFamily: "'Lilita One'", color: "white", backgroundColor: "#451d6b", "&:hover": { backgroundColor: "#8c2fc7" } }} disabled={isSubmitting}>
                    SIGNUP
                  </Button>
                </Form>
              )}
            </Formik>

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
  <Dialog
        open={otpDialogOpen}
        onClose={() => setOtpDialogOpen(false)}
        style={{ textAlign: "center", padding: "20px" }}
      >
        <DialogTitle
          style={{ fontSize: "1.5rem", color: "#5e3967", fontWeight: "bold" }}
        >
          Verify Your Email Address
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              margin: "20px 0",
            }}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                maxLength={1}
                style={{
                  width: "40px",
                  height: "40px",
                  fontSize: "1.2rem",
                  textAlign: "center",
                  border: "2px solid #351742",
                  borderRadius: "8px",
                  backgroundColor: "#fdfdfd",
                  outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00cac9")}
                onBlur={(e) => (e.target.style.borderColor = "#351742")}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1px",
            margin: "5px",
          }}
        >
          <Button
            onClick={() => setOtpDialogOpen(false)}
            style={{
              backgroundColor: "#5e3967",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "8px",
              margin: "0 5px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleOtpSubmit(otp.join(""))}
            style={{
              backgroundColor: "#00cac9",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "8px",
              margin: "0 5px",
            }}
          >
            Verify Email
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Signup;