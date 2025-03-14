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
} from "@mui/material";
import { Email, Lock, Close } from "@mui/icons-material";
import { Google as GoogleIcon } from "@mui/icons-material";
import axios from "axios";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SunCity from "../../assets/suncity.mp4";
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/login", {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        const { access_token } = response.data;
        localStorage.setItem("email", values.email);
        localStorage.setItem("authToken", access_token);
        toast.success("Login successful!");
  
        // Fetch user details
        const userResponse = await axios.get("http://127.0.0.1:8000/admin/get-users", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const user = userResponse.data.users.find(user => user.email === values.email);
        const userRole = user.role;
        const userId = user._id;
        const username = user.username
        
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username)
        
        console.log("User ID:", userId);
  
        if (userRole === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/loading");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error("Your Account is Deactivated");
      } else if (err.response && err.response.status === 400) {
        toast.error("Email not verified. Please check your email to verify your account.");
      } else {
        toast.error("Error Login.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const response = await axios.post("http://127.0.0.1:8000/users/google-login", { token });
      if (response.status === 200) {
        
        const { access_token } = response.data;
        localStorage.setItem("authToken", access_token);
        toast.success("Google login successful!");

        // Fetch user details
        const userResponse = await axios.get("http://127.0.0.1:8000/admin/get-users", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const user = userResponse.data.users.find(user => user.email === result.user.email);
        const userRole = user.role;
        const userId = user._id;
        const useremail = user.email;
        const username = user.username;

        localStorage.setItem("email", useremail);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);

        console.log("User ID:", userId);

        if (userRole === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/loading"); 
        }
      }
    } catch (error) {
      console.error("Google login error", error);
      if (error.response && error.response.status === 403) {
        toast.error("Your account has been deactivated. Please contact support.");
      } else{
      toast.error("Google login failed");
      }
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(180deg, #5e3967, #351742)",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
  
      <Grid
        container
        sx={{
          maxWidth: "1000px",
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
              backgroundColor: "rgba(0, 0, 0, 0.01)", // Dark bluish overlay
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

        <Grid item xs={12} md={6} component={Paper} elevation={6} square>
          <Box sx={{ p: 6, display: "flex", flexDirection: "column", alignItems: "center", color: "#331540" }}>
            <Typography variant="h4" fontFamily="'Lilita One'" gutterBottom>
              LOGIN
            </Typography>
            <Typography variant="subtitle1" fontFamily="'Lilita One'" gutterBottom>
              SIGN IN TO CONTINUE
            </Typography>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting, touched, errors }) => (
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, fontFamily: "'Lilita One'", color: "white", backgroundColor: "#451d6b", "&:hover": { backgroundColor: "#8c2fc7" } }}
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>

            <Typography variant="body2" fontFamily="'Lilita One'">
              Or sign in with:
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <IconButton
                onClick={handleGoogleLogin}
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

            <Typography variant="body2" sx={{ mt: 1, fontFamily: "'Lilita One'", color: "#331540" }}>
              Don't have an account? <Button onClick={() => navigate("/signup")} sx={{ color: "#331540", fontFamily: "'Lilita One'" }}>Signup</Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;