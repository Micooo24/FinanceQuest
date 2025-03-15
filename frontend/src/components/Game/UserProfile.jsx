import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import PersonIcon from "@mui/icons-material/Person";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;

const ProfilePageWrapper = styled.div`
  font-family: "Oi", sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #451d6b, #331540);
  position: relative;
  overflow: hidden;
`;

const TiledBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  z-index: 0;
  
  div {
    width: 100%;
    height: 100%;
    background-color: #331540;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }

  div:nth-child(-n + 10):hover {
    background: linear-gradient(180deg, #331540, #451d6b);
  }
  div:nth-child(n + 11):nth-child(-n + 20):hover {
    background: linear-gradient(180deg, #331540, #451d6b);
  }
  div:nth-child(n + 21):nth-child(-n + 30):hover {
    background: linear-gradient(180deg, #331540, #451d6b);
  }
  div:nth-child(n + 31):nth-child(-n + 40):hover {
    background: linear-gradient(180deg, #451d6b, #8c2fc7);
  }
  div:nth-child(n + 41):nth-child(-n + 50):hover {
    background: linear-gradient(180deg, #451d6b, #8c2fc7);
  }
  div:nth-child(n + 51):nth-child(-n + 60):hover {
    background: linear-gradient(180deg, #8c2fc7, #00cac9);
  }
  div:nth-child(n + 61):nth-child(-n + 70):hover {
    background: linear-gradient(180deg, #8c2fc7, #00cac9);
  }
  div:nth-child(n + 71):nth-child(-n + 80):hover {
    background: linear-gradient(180deg, #00cac9, #331540);
  }
  div:nth-child(n + 81):nth-child(-n + 90):hover {
    background: linear-gradient(180deg, #00cac9, #331540);
  }
  div:nth-child(n + 91):nth-child(-n + 100):hover {
    background: linear-gradient(180deg, #00cac9, #331540);
  }
`;

const Content = styled.div`
  text-align: center;
  z-index: 1;
  padding: 50px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  height: 95%;
  border-radius: 25px;
  box-shadow: 0 0 20px rgba(140, 47, 199, 0.5);
`;

const GameTitle = styled.div`
  font-size: 50px;
  text-transform: uppercase;
  color: transparent;
  background: linear-gradient(45deg, #8c2fc7, #451d6b);
  -webkit-background-clip: text;
  -webkit-text-stroke: 1px #000;
  margin-bottom: 20px;
`;

const ProfileAvatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #8c2fc7;
  margin-bottom: 20px;
  object-fit: cover;
`;

const InfoItem = styled.div`
  display: flex;
  font-family: "Lora", sans-serif;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  width: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 10px;
  margin: 6px 0;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const IconWrapper = styled.span`
  margin-right: 15px;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #8c2fc7, #451d6b);
  border: 2px solid #000;
  color: white;
  font-size: 15px;
  font-family: "Lora", sans-serif;
  padding: 15px 40px;
  margin: 2px 0;
  border-radius: 25px;
  cursor: pointer;
  width: 250px;
  height: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(140, 47, 199, 0.5);
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(140, 47, 199, 0.8);
    background: linear-gradient(45deg, #451d6b, #8c2fc7);
  }
`;

const BackIconWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 2;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(140, 47, 199, 0.5);
  }
`;

const StyledBackIcon = styled(ArrowBackIcon)`
  font-size: 35px !important;
  color: white;
`;

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    birthday: "",
    img: null,
    previewImg: null, // Added for previewing the uploaded image
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) throw new Error("No authentication token found");

        const response = await axios.get("http://127.0.0.1:8000/users/profile", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

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

  const handleBackClick = () => {
    navigate("/start");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({
      username: profile.username,
      birthday: profile.birthday,
      img: null,
      previewImg: null,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ username: "", birthday: "", img: null, previewImg: null });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const previewUrl = URL.createObjectURL(file); // Create a preview URL
      setEditData((prev) => ({
        ...prev,
        img: file,
        previewImg: previewUrl,
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
        const updatedProfile = await axios.get(
          "http://127.0.0.1:8000/users/profile",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setProfile(updatedProfile.data.user);
        setEditData({ username: "", birthday: "", img: null, previewImg: null });
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <ProfilePageWrapper>
        <TiledBackground>
          {Array.from({ length: 100 }).map((_, index) => (
            <div key={index}></div>
          ))}
        </TiledBackground>
        <Content>
          <div>Loading...</div>
        </Content>
      </ProfilePageWrapper>
    );
  }

  if (error) {
    return (
      <ProfilePageWrapper>
        <TiledBackground>
          {Array.from({ length: 100 }).map((_, index) => (
            <div key={index}></div>
          ))}
        </TiledBackground>
        <Content>
          <div>{error}</div>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </Content>
      </ProfilePageWrapper>
    );
  }

  if (!profile) {
    return (
      <ProfilePageWrapper>
        <TiledBackground>
          {Array.from({ length: 100 }).map((_, index) => (
            <div key={index}></div>
          ))}
        </TiledBackground>
        <Content>
          <div>No profile information available</div>
        </Content>
      </ProfilePageWrapper>
    );
  }

  return (
    <>
      <GlobalStyle />
      <ProfilePageWrapper>
        <TiledBackground>
          {Array.from({ length: 100 }).map((_, index) => (
            <div key={index}></div>
          ))}
        </TiledBackground>
        <Content>
          <BackIconWrapper onClick={handleBackClick}>
            <StyledBackIcon />
          </BackIconWrapper>
          <GameTitle>User Profile</GameTitle>
          <ProfileAvatar
            src={
              editData.previewImg ||
              profile.img_path ||
              "/default-avatar.png"
            }
            alt={profile.username}
          />
          {!isEditing ? (
            <>
              <InfoItem>
                <IconWrapper>
                  <PersonIcon style={{ color: "#8c2fc7" }} />
                </IconWrapper>
                {profile.username}
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <EmailIcon style={{ color: "#8c2fc7" }} />
                </IconWrapper>
                {profile.email}
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <CakeIcon style={{ color: "#8c2fc7" }} />
                </IconWrapper>
                {formatDate(profile.birthday)}
              </InfoItem>
              <Button onClick={handleEditClick}>EDIT PROFILE</Button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={editData.username}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                style={{
                  width: "300px",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "25px",
                  border: "2px solid #8c2fc7",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  fontFamily: "Lora, sans-serif",
                  fontSize: "20px",
                }}
              />
              <Button as="label">
                UPLOAD NEW PICTURE
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              <Button onClick={handleSubmit}>SAVE</Button>
              <Button onClick={handleCancelEdit}>CANCEL</Button>
            </>
          )}
        </Content>
      </ProfilePageWrapper>
    </>
  );
};

export default UserProfile;