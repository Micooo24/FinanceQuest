import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Container,
  Grid,
  Divider,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { styled, keyframes } from "@mui/material/styles";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: `4px solid transparent`,
  background: `linear-gradient(white, white) padding-box,
              linear-gradient(45deg, #00cac9, #5e3967) border-box`,
  boxShadow: "0 8px 32px rgba(0, 202, 201, 0.2)",
  transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  "&:hover": {
    transform: "scale(1.08) rotate(5deg)",
    boxShadow: "0 12px 40px rgba(0, 202, 201, 0.3)",
  },
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(53, 23, 66, 0.1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #00cac9, #5e3967)",
    animation: `${shimmer} 4s infinite linear`,
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  "& .MuiSvgIcon-root": {
    marginRight: theme.spacing(1.5),
    color: "#00cac9",
  },
  transform: "translateX(-20px)",
  opacity: 0,
  animation: `${fadeInUp} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
  padding: "12px 16px",
  borderRadius: 12,
  background: "rgba(255, 255, 255, 0.8)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.95)",
    transform: "translateX(5px)",
    boxShadow: "0 4px 20px rgba(53, 23, 66, 0.08)",
  },
}));

const NavigationButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: "10px 24px",
  textTransform: "none",
  fontWeight: 600,
  letterSpacing: "0.5px",
  overflow: "hidden",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.1)",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease",
  },
  "&:hover::before": {
    transform: "translateX(0)",
  },
  "&:active": {
    transform: "scale(0.96)",
  },
}));

const GameButton = styled(NavigationButton)(({ theme }) => ({
  backgroundColor: "#5e3967",
  color: "white",
  "&:hover": {
    backgroundColor: "#351742",
  },
}));

const StartButton = styled(NavigationButton)(({ theme }) => ({
  backgroundColor: "#00cac9",
  color: "white",
  "&:hover": {
    backgroundColor: "#00a3a2",
  },
}));

const NavigationContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  display: "flex",
  gap: theme.spacing(2),
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: "#00cac9",
  animation: `${rotateAnimation} 1.5s linear infinite`,
  "& .MuiCircularProgress-circle": {
    strokeLinecap: "round",
  },
}));

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    birthday: "",
    img: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/users/profile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setProfile(response.data.user);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile information");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const handleBackToGame = () => {
    navigate("/gameplay");
  };

  const handleBackToStart = () => {
    navigate("/start");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({
      username: profile.username,
      birthday: profile.birthday,
      img: null,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      username: "",
      birthday: "",
      img: null,
    });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setEditData((prev) => ({
        ...prev,
        img: event.target.files[0],
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      if (editData.username) formData.append("username", editData.username);
      if (editData.birthday) formData.append("birthday", editData.birthday);
      if (editData.img) formData.append("img", editData.img);

      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://127.0.0.1:8000/users/update-profile/${profile._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setIsEditing(false);
        // Refresh profile data
        const updatedProfile = await axios.get(
          "http://127.0.0.1:8000/users/profile",
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setProfile(updatedProfile.data.user);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          animation: `${fadeInUp} 0.4s ease-out`,
        }}
      >
        <StyledCircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6">No profile information available</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
        mb: 5,
        position: "relative",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at top right, rgba(94, 57, 103, 0.1), transparent),
                    radial-gradient(circle at bottom left, rgba(0, 202, 201, 0.1), transparent)`,
          zIndex: -1,
        },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: 600,
          color: "#351742",
          textShadow: "2px 2px 4px rgba(53, 23, 66, 0.1)",
        }}
      >
        User Profile
      </Typography>

      <ProfileCard elevation={3}>
        <NavigationContainer>
          <GameButton
            startIcon={<SportsEsportsIcon sx={{ fontSize: "1.2rem" }} />}
            onClick={handleBackToGame}
            sx={{
              borderRadius: "20px",
              padding: "6px 16px",
              textTransform: "none",
              fontWeight: 600,
              letterSpacing: "0.5px",
              fontSize: "0.875rem",
              minWidth: "120px",
              height: "32px",
              "&:hover": {
                backgroundColor: "#351742",
                transform: "scale(0.98)",
              },
            }}
          >
            Back to Game
          </GameButton>
          <StartButton
            startIcon={<HomeIcon sx={{ fontSize: "1.2rem" }} />}
            onClick={handleBackToStart}
            sx={{
              borderRadius: "20px",
              padding: "6px 16px",
              textTransform: "none",
              fontWeight: 600,
              letterSpacing: "0.5px",
              fontSize: "0.875rem",
              minWidth: "120px",
              height: "32px",
              "&:hover": {
                backgroundColor: "#00a3a2",
                transform: "scale(0.98)",
              },
            }}
          >
            Back to Start
          </StartButton>
        </NavigationContainer>

        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              "& .MuiButton-root": {
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              },
              "& .MuiTypography-root": {
                transition: "all 0.3s ease",
              },
            }}
          >
            <ProfileAvatar
              src={profile.img_path || "/default-avatar.png"}
              alt={profile.username}
            />
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
              {profile.username}
            </Typography>
            {!isEditing ? (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ mt: 2 }}
                onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            ) : (
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </Stack>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={8}
            sx={{
              "& .MuiTextField-root": {
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              },
              "& .MuiTypography-root": {
                transition: "all 0.3s ease",
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#5e3967",
                fontWeight: 500,
                borderBottom: "2px solid #00cac9",
                paddingBottom: 1,
                marginBottom: 3,
              }}
            >
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {isEditing ? (
              <Stack
                spacing={2}
                sx={{
                  "& .MuiTextField-root": {
                    opacity: 0,
                    animation: `${fadeInUp} 0.4s ease-out forwards`,
                    "&:nth-of-type(1)": { animationDelay: "0.2s" },
                    "&:nth-of-type(2)": { animationDelay: "0.3s" },
                  },
                  "& .MuiButton-root": {
                    opacity: 0,
                    animation: `${fadeInUp} 0.4s ease-out forwards`,
                    animationDelay: "0.4s",
                  },
                }}
              >
                <TextField
                  label="Username"
                  value={editData.username}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#00cac9",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#5e3967",
                    },
                  }}
                />

                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    backgroundColor: "#00cac9",
                    "&:hover": {
                      backgroundColor: "#00a3a2",
                    },
                  }}
                >
                  Upload New Picture
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </Stack>
            ) : (
              <>
                <InfoItem>
                  <PersonIcon />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#5e3967", fontWeight: 500 }}
                    >
                      Username
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#351742" }}>
                      {profile.username}
                    </Typography>
                  </Box>
                </InfoItem>

                <InfoItem>
                  <EmailIcon />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#5e3967", fontWeight: 500 }}
                    >
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#351742" }}>
                      {profile.email}
                    </Typography>
                  </Box>
                </InfoItem>

                <InfoItem>
                  <CakeIcon />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#5e3967", fontWeight: 500 }}
                    >
                      Birthday
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#351742" }}>
                      {formatDate(profile.birthday)}
                    </Typography>
                  </Box>
                </InfoItem>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 4 }}
                >
                  Account ID: {profile._id}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>

        {/* Mobile navigation buttons for better responsiveness */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 4,
            display: { md: "none" },
            justifyContent: "center",
          }}
        >
          <GameButton
            startIcon={<SportsEsportsIcon />}
            onClick={handleBackToGame}
            fullWidth
          >
            Back to Game
          </GameButton>
          <StartButton
            startIcon={<HomeIcon />}
            onClick={handleBackToStart}
            fullWidth
          >
            Back to Start
          </StartButton>
        </Stack>
      </ProfileCard>
    </Container>
  );
};

export default UserProfile;
