import './homeTop.css';
import { Box, Button, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CastleIcon from '@mui/icons-material/Castle';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FlipBook from './FlipBook';
import Roles from './Roles.jsx';
import { useSelector } from 'react-redux';
import TextAnimation from '../Components/TextAnimation/TextAnimation.jsx';
import BlobButton from '../Components/BlobButton/BlobButton.jsx';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import LineButton from "../Components/LineButton/LineButton.jsx";



const HomeTop = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Animation will only run once
    });
  }, []);

  const HomeTopSecond = [
    {
      icon: <ImportContactsIcon />,
      heading: 'Preparing For JEE ',
      para: 'Boost the chances of selection with the help of veterans themselves',
      link: 'somelink',
    },
    {
      icon: <CastleIcon />,
      heading: 'Searching For College',
      para: "Seize top college opportunities with expert guidance! Don't settle for less",
      link: 'somelink',
    },
    {
      icon: <SchoolIcon />,
      heading: 'College Students',
      para: 'Earn by guiding your juniors and help them thrive from your experience',
      link: 'somelink',
    },
  ];
  const { loading: menLoading, isAuthenticated: menAuth } = useSelector(
    (state) => state.mentor
  );
  const { loading: stuLoading, isAuthenticated } = useSelector(
    (state) => state.student
  );
  // const [, setSrc] = useState(window.innerWidth)
  // const [src, setSrc] = useState(window.innerWidth)
  // useEffect(() => {
  //   if(window.innerWidth <= 850){
  //     setSrc("/images/path.jpg")
  //   }
  //   else{
  //     setSrc("/images/home.png")
  //   }
  // }, [window.innerWidth])
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100vh',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: 1,
    background: 'rgba( 255, 255, 255, 0.25 )',
    boxShadow: ' 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 13px )',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
  };
  const [open, setOpen] = React.useState(false);
  const [openJoin, setOpenJoin] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handleCloseJoin = () => {
    setOpenJoin(false);
  };
  const handleOpenJoin = () => {
    setOpenJoin(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <div className='_home-top-first'>
        <div className='_home-top-left'>
          <h2>
            A platform that empowers you with the{' '}
            <Typography
              component='p'
              variant='p'
              sx={{
                color: 'var(--button2)',
                fontSize: { xs: '3.5vmax', md: '2vmax' },
                display: { xs: 'block', md: 'inline' },
                fontWeight: { xs: 900 },
              }}
            >
              FREEDOM
            </Typography>{' '}
            of choice
            <TextAnimation />
          </h2>

          {/* <h2> That Empowers You</h2> */}
          <p>
            {/* Top mentors from IIT and Tier 1 colleges ready to make you thrive!!! */}
            Connect with IIT-JEE Toppers through PrepSaarthi and take your
            preparation to next level
          </p>

          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box component={Link} to='/lists/mentors'>
              <button className='firBtn'>Explore Your Mentor</button>
            </Box>
            <Box
              className='secBtn'
              sx={{ position: 'relative', display: 'inline-block' }}
            >
              <BlobButton text='Products' />
            </Box>
          </div> */}

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "center", md: "space-between" },
              alignItems: "center",
              gap: { xs: 2, md: 3 },
              mt: 3,
              width: "100%",
            }}
          >
            {/* Explore Your Mentor Button */}
            <Box
              component={Link}
              to="/lists/mentors"
              sx={{
                textAlign: "center",
                width: "19vmax",
                height: "5vmax",
                marginLeft: { xs: "10px", md: "0px" },
              }}
            >
              <Button
                sx={{
                  zIndex: 1,
                  position: "relative",
                  textTransform: "uppercase",
                  color: "white",
                  fontSize: "1.2vmax",
                  fontWeight: "bold",
                  backgroundColor: "#3A5AFF",
                  marginTop: "21.5px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "30px",
                  width: "19vmax",
                  height: "5vmax",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    backgroundColor: "#2a48e5",
                    color: "#ffcc00",
                    transform: "scale(1.1)",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    border: "2px solid #0505A9",
                    borderRadius: "30px",
                  },
                  "&::after": {
                    content: '""',
                    zIndex: -2,
                    position: "absolute",
                    left: "3px",
                    top: "3px",
                    width: "calc(100% - 6px)",
                    height: "calc(100% - 6px)",
                    transition: "all 0.3s 0.2s",
                    borderRadius: "30px",
                  },
                }}
              >
                Explore Your Mentor
              </Button>
            </Box>

            {/* Products Button */}
            <Box
              className="secBtn"
              sx={{
                textAlign: "center",
                width: "19vmax",
                height: "5vmax",
              }}
              onClick={handleOpen}
            >
              <BlobButton text="Products" />
            </Box>
          </Box>


          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <CloseIcon
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    zIndex: 1111,
                  }}
                />
                {menLoading === false &&
                  stuLoading === false &&
                  !isAuthenticated &&
                  !menAuth && (
                    <Box
                      sx={{
                        bgcolor: '#ffc43b',
                        borderRadius: 2,
                        p: 3,
                        boxShadow: 2,
                        textAlign: 'center',
                        width: { xs: '100%', md: '100%' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant='h5'
                        component='div'
                        sx={{ mb: 2, color: '#1976d2' }}
                      >
                        Login to Avail Free Products
                      </Typography>
                      <Typography variant='body2' sx={{ mb: 3, color: '#555' }}>
                        Unlock exclusive access to our collection of free
                        products by logging in now!
                      </Typography>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                          navigate('/login');
                        }}
                      >
                        Login
                      </Button>
                    </Box>
                  )}

                {menLoading === false && stuLoading === false && menAuth && (
                  <Box
                    sx={{
                      bgcolor: '#ff766c',
                      borderRadius: 2,
                      p: 3,
                      boxShadow: 2,
                      textAlign: 'center',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant='h5'
                      component='div'
                      sx={{ mb: 2, color: '#fff' }}
                    >
                      Hey Mentors! 🌟
                    </Typography>
                    <Typography variant='body2' sx={{ color: '#fff' }}>
                      Our products are currently on a little vacation with the
                      students! 🏖️
                      <br />
                      But don’t worry, new products will be available for you
                      soon. <br />
                      <strong>Thanks for your patience!</strong>
                    </Typography>
                  </Box>
                )}
                {menLoading === false &&
                  stuLoading === false &&
                  isAuthenticated && <FlipBook />}
              </Box>
            </Box>
          </Modal>
        </div>
        <div data-aos='fade-left' className='_home-top-right'>
          <img className='_mob' src='/images/boy.png' alt='homepage' />
          {/* <img src="/images/path.jpg" alt="homepage" /> */}
        </div>
      </div>

      <div className='_home-top-second'>
        <h2 className='_home-middle-heading'>Who is PrepSaarthi for?</h2>
        <div>
          {HomeTopSecond.map((item, index) => (
            <div className='_suitable-for-whom' data-aos='zoom-in' key={index}>
              {item.icon}
              <h3>{item.heading}</h3>
              <p>{item.para}</p>
            </div>
          ))}
        </div>
        {/* <Box
          display={"flex"}
          alignSelf={"center"}
          component={Link}
          to="/signup"
        > */}
        {/* <Button
            size="large"
            sx={{
              width: { xs: "18vmax", sm: "12vmax" },
              height: { xs: "6vmax", sm: "4vmax" },
              mt: { xs: "1vmax", md: "4vmax" },
              mb: "3vmax",
              alignSelf: "center",
              bgcolor: "#ffc43b",
              fontWeight: 700,
              fontSize: { xs: "2vmax",sm:'1.2vmax', md: "1vmax" },
              "&:hover": { bgcolor: "#ffce5d" },
            }}
            className="_home-top-button"
            variant="contained"
            
          >
            Join Us
          </Button> */}

        <Box
          onClick={handleOpenJoin}
          display={'flex'}
          alignSelf={'center'}
          component={Link}
        >
          <LineButton />
        </Box>
        <Modal
          open={openJoin}
          onClose={handleCloseJoin}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Box
              sx={{
                width: { xs: '90%', md: '40%' },
                height: { xs: '80%', md: '60%' },
                bgcolor: 'white',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <CloseIcon
                onClick={handleCloseJoin}
                sx={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  cursor: 'pointer',
                }}
              />
              <Roles />
            </Box>
          </Box>
        </Modal>
        {/* </Box> */}
      </div>
    </>
  );
};

export default HomeTop;
