import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Button, Box, Typography } from '@mui/material';

const VideoLecture = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [openModal, setOpenModal] = useState(false); // For modal (if you still want it)
  const [loading, setLoading] = useState(true); // For loading spinner (if you still want it)

  const handleOpenModal = (subject) => {
    let path = '';

    switch (subject) {
      case 'Physics':
        path = '/video/track/physics';
        break;
      case 'Chemistry':
        path = '/video/track/chemistry';
        break;
      case 'Math':
        path = '/video/track/math';
        break;
      default:
        break;
    }

    // Navigate to the corresponding route
    if (path) {
      navigate(path); // Navigates to /video/track/subject
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        p: 2,
        maxHeight: { xs: '65vh', md: '45vh' },
      }}
    >
      <Box
        sx={{
          p: 4,
          backgroundColor: '#fff',
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          height: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Video Lecture
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal('Physics')}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Physics
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpenModal('Chemistry')}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Chemistry
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenModal('Math')}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Math
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoLecture;
