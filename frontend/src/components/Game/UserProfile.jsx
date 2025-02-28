import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Stack
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[3]
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaed 100%)',
  position: 'relative',
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1.5),
    color: theme.palette.primary.main,
  }
}));

const NavigationButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const GameButton = styled(NavigationButton)(({ theme }) => ({
  backgroundColor: '#4caf50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#43a047',
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const StartButton = styled(NavigationButton)(({ theme }) => ({
  backgroundColor: '#f44336',
  color: 'white',
  '&:hover': {
    backgroundColor: '#e53935',
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const NavigationContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  display: 'flex',
  gap: theme.spacing(2),
}));

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://127.0.0.1:8000/users/profile', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        
        setProfile(response.data.user);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const handleBackToGame = () => {
    navigate('/gameplay');
  };

  const handleBackToStart = () => {
    navigate('/start');
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6">No profile information available</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        textAlign: 'center', 
        mb: 4,
        fontWeight: 600,
        color: '#2c3e50'
      }}>
        User Profile
      </Typography>
      
      <ProfileCard elevation={3}>
        <NavigationContainer>
          <GameButton 
            startIcon={<SportsEsportsIcon />}
            onClick={handleBackToGame}
          >
            Back to Game
          </GameButton>
          <StartButton 
            startIcon={<HomeIcon />}
            onClick={handleBackToStart}
          >
            Back to Start
          </StartButton>
        </NavigationContainer>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ProfileAvatar 
              src={profile.img_path || '/default-avatar.png'} 
              alt={profile.username}
            />
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
              {profile.username}
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              size="small"
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2c3e50', fontWeight: 500 }}>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <InfoItem>
              <PersonIcon />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Username
                </Typography>
                <Typography variant="body1">
                  {profile.username}
                </Typography>
              </Box>
            </InfoItem>
            
            <InfoItem>
              <EmailIcon />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {profile.email}
                </Typography>
              </Box>
            </InfoItem>
            
            <InfoItem>
              <CakeIcon />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Birthday
                </Typography>
                <Typography variant="body1">
                  {formatDate(profile.birthday)}
                </Typography>
              </Box>
            </InfoItem>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
              Account ID: {profile._id}
            </Typography>
          </Grid>
        </Grid>

        {/* Mobile navigation buttons for better responsiveness */}
        <Stack 
          direction="row" 
          spacing={2} 
          sx={{ 
            mt: 4, 
            display: { md: 'none' },
            justifyContent: 'center'
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