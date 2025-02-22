import {
  Box,
  Button,
  Typography,
  Modal,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { buttonClasses } from "@mui/base/Button";
import "./mentorprofile.css";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ListItem from "@mui/material/ListItem";
import SchoolIcon from "@mui/icons-material/School";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import MentorIntro from "./MentorIntro";
import Authenticity from "./Authenticity";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../action/userAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import {
  clearError,
  getSuccessMentorConnection,
} from "../../action/metorListAction";



import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import toast from "react-hot-toast";
import RatingMentor from "./RatingMentor";
import ConfirmMentorShipPayment from "../ConfirmMentorShipPayment/ConfirmMentorShipPayment";
import MetaData from "../../utils/Metadata";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const options = ['1 month', '3 month', '6 month'];

const MentorProfile = () => {




const [openBtn, setOpenBtn] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked on ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenBtn(false);
    console.log(index);
  };

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenBtn((prevOpen) => !prevOpen);
  };

  const handleCloseBtn = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      return;
    }
    setOpenBtn(false);
  };






  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, user } = useSelector((state) => state.mentorDeatil);
  const {
    loading: menLoading,
    user: mentor,
    isAuthenticated: menAuth,
  } = useSelector((state) => state.mentor);
  const {
    loading: stuLoading,
    user: stuUser,
    isAuthenticated,
  } = useSelector((state) => state.student);
  const {
    error: cError,
    loading: cLoading,
    connection,
  } = useSelector((state) => state.connectionCount);
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getSuccessMentorConnection(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (cError) {
      toast.error(cError.message);
      dispatch(clearError());
    }
  });

  const [showPage, setShowPage] = useState(false);
  const [subscription, setSubscription] = useState({});
  const blue = {
    50: "#F0F7FF",
    100: "#C2E0FF",
    200: "#80BFFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B2",
    800: "#004C99",
    900: "#003A75",
  };
  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };
  const Tab = styled(BaseTab)`
    font-family: "IBM Plex Sans", sans-serif;
    color: #fff;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: transparent;
    width: 100%;
    padding: 10px 12px;
    margin: 6px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: ${blue[400]};
    }

    &:focus {
      color: #fff;
      outline: 3px solid ${blue[200]};
    }

    &.${tabClasses.selected} {
      background-color: #fff;
      color: ${blue[600]};
    }

    &.${buttonClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
  const TabPanel = styled(BaseTabPanel)(
    ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.9;
  `
  );
  const TabsList = styled(BaseTabsList)(
    ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
  );
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    outline: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 1,
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 13px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/lists/mentors");
  };
  useEffect(() => {
    console.log(selectedIndex);
    
    if (!isAuthenticated && !menAuth && !menLoading && !stuLoading) {
      setOpen(true);
    }
  }, [open, isAuthenticated, menAuth, menLoading, stuLoading]);
  const childRef = useRef(null);
  const [parentHeight, setParentHeight] = useState("1");

  useLayoutEffect(() => {
    const updateParentHeight = () => {
      if (childRef?.current) {
        setTimeout(() => {
          const childHeight = childRef?.current?.offsetHeight;
          setParentHeight(`${childHeight}px`);
        }, 1500);
       
      }
    };

    // Update the height after the component is fully rendered
    updateParentHeight();

    // Update height on window resize
    // window.addEventListener('load', updateParentHeight);

    // // Clean up event listener on component unmount
    // return () => {
    //   window.removeEventListener('load', updateParentHeight);
    // };
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <MetaData
        title={
          !isAuthenticated && !menAuth ? "Please Login" : `About ${user?.name}`
        }
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          {loading === false && !isAuthenticated && !menAuth && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box
                  sx={{
                    width: { xs: "90%", md: "40%" },
                    height: { xs: "80%", md: "60%" },
                    bgcolor: "white",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Link to="/lists/mentors">
                    <CloseIcon
                      sx={{ position: "absolute", top: "10px", right: "10px" }}
                    />
                  </Link>
                  <Typography
                    component="h2"
                    variant="p"
                    sx={{ color: "grey", mb: "2vmax", textAlign: "center " }}
                  >
                    Please login to view mentor's details
                  </Typography>
                  <Link to="/login">
                    <Button
                      variant="contained"
                      startIcon={<LoginIcon sx={{ fontSize: "2vmax" }} />}
                      sx={{
                        width: { xs: "24vmax", md: "14vmax" },
                        height: { xs: "8vmax", md: "5vmax" },
                        fontSize: { xs: "2.1vmax", md: "1.1vmax" },
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Modal>
          )}

          {showPage ? (
            <ConfirmMentorShipPayment
              item={user}
              sub={subscription}
              stu={stuUser?.user}
            />
          ) : (
            <Box>
              <Box height="45vh" maxWidth="100vw">
                <Box
                  component="img"
                  src={user?.coverImg?.public_URI}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                ></Box>
              </Box>
              <Box
                sx={{ minHeight: parentHeight }}
                position="relative"
                maxWidth="100vw"
              >
                <Box
                  ref={childRef}
                  position="absolute"
                  width="98%"
                  sx={{
                    top: "-40px",
                    borderRadius: "1vmax",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      top: 0,
                      left: 0,
                      zIndex: 1,
                      backdropFilter: "blur(20px)",
                      bgcolor: "#ffffffc4",
                      borderRadius: "0.8vmax",
                      minHeight: "100vh",
                    }}
                  ></Box>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      zIndex: 2,
                      borderRadius: "1vmax",
                      boxShadow:
                        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        isAuthenticated || menAuth
                          ? user?.avatar?.public_URI
                          : "/images/profile.png"
                      }
                      sx={{
                        width: 130,
                        aspectRatio: "1/1",
                        borderRadius: "50%",
                        objectFit: "cover",
                        objectPosition: "center",
                        position: "absolute",
                        top: -70,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        width: "100%",
                        mt: "60px",
                        p: { xs: "1vmax 2vmax", md: "5vmax 25vmax" },
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "center" },
                      }}
                    >
                      <Typography component="h1" variant="p">
                        {(isAuthenticated || menAuth) && user?.name}
                      </Typography>
                      <Typography
                        component="p"
                        variant="p"
                        sx={{
                          fontSize: { xs: "1.8vmax", md: "2vmax" },
                          margin: "12px auto",
                          fontWeight: 700,
                          fontStyle: "italic",
                          display: { xs: "block", md: "none" },
                        }}
                      >
                        &#x275D;{" "}
                        {(isAuthenticated || menAuth) &&
                          user?.desc?.slice(0, 35)}{" "}
                        &#x275E;
                      </Typography>
                      {(isAuthenticated || menAuth) &&
                      !stuUser?.user?.mentorAssigned ? (
                        <Box sx={{ display: "flex", flexDirection: "row"  ,alignItems: "center", }}>
    
                          <Button
                            variant="outlined"
                            sx={{ width: { xs: "18vmax", md: "12vmax" } }}
                            onClick={() => navigate('/features')} 
                            // onClick={() => {
                            //   if (
                            //     isAuthenticated &&
                            //     !(user?.activeMentee >= 3)
                            //   ) {
                            //     setShowPage(true);
                            //     setSubscription({
                            //       type: "daily",
                            //       api: "xyz",
                            //       price: user?.ppd,
                            //     });
                            //   } else if (
                            //     mentor?.user?.signedUpFor === "mentor"
                            //   ) {
                            //     toast.error("Mentors Can't Buy Mentorship");
                            //   } else if (user?.activeMentee >=3) {
                            //     toast(
                            //       `Oops! ${
                            //         user?.name?.split(" ")[0]
                            //       } is busy with other mentees. Try again later or explore other mentorships!`,
                            //       {
                            //         id: "month",

                            //         icon: (
                            //           <EventAvailableIcon
                            //             sx={{ color: "var(--button2)" }}
                            //           />
                            //         ),
                            //       }
                            //     );
                            //   } else {
                            //     toast(" Login To Buy Your Mentorship");
                            //     navigate("/login");
                            //   }
                            // }}
                          >
                          
                            Features
                          </Button>
                          {/* <Button
                            variant="contained"
                            sx={{
                              width: { xs: "18vmax", md: "12vmax" },
                              ml: "1vmax",
                              mt: 0,
                            }}
                            onClick={() => {
                              if (
                                isAuthenticated &&
                                !(user?.activeMentee >= 3)
                              ) {
                                setShowPage(true);
                                setSubscription({
                                  type: "weekly",
                                  api: "xyz",
                                  price: user?.ppm,
                                });
                              } else if (
                                mentor?.user?.signedUpFor === "mentor"
                              ) {
                                toast.error("Mentors Can't Buy Mentorship");
                              } else if (user?.activeMentee >= 3) {
                                toast(
                                  `Oops! ${
                                    user?.name?.split(" ")[0]
                                  } is busy with other mentees. Try again later or explore other mentorships!`,
                                  {
                                    id: "month",
                                    icon: (
                                      <EventAvailableIcon
                                        sx={{ color: "var(--button2)" }}
                                      />
                                    ),
                                  }
                                );
                              } else {
                                toast(" Login To Buy Your Mentorship");
                                navigate("/login");
                              }
                            }}
                          >
                            &#8377;
                            {Intl.NumberFormat("en-IN").format(user?.ppm)}/month
                          </Button> */}






                          <React.Fragment>
      <ButtonGroup
        variant="contained"
        aria-label="Button group with a nested menu"
        sx={{
          display: 'flex',
          '& .MuiButton-root:first-of-type': {
            flexGrow: 1, // Make the main button take more space
           
            width: { xs: "18vmax", md: "10vmax" },
          
          },
          '& .MuiButton-root:last-of-type': {
            flexGrow: 0.3, // Allocate smaller space to the arrow button
            padding: 0, // Remove padding for a compact look
            width: '4.5vmax', // Match height for visual alignment

          },
        }}
      >
        <Button 
        
        onClick={() => { handleClick();
          if (
            isAuthenticated &&
            !(user?.activeMentee >= 3)
          ) {
            console.log("hi");
              if( options[selectedIndex] == "1 month"){
                setShowPage(true);
                setSubscription({
                  type: "1month",
                  api: "xyz",
                  price: user?.ppm,
                  
                });               
              }
              else if(options[selectedIndex] == "3 month"){
                setShowPage(true);
                setSubscription({
                  type: "3month",
                  api: "xyz",
                  price: (() => {
                    const basePrice = user?.ppm; // Get ppm value, default to 0 if undefined
                    const multipliedValue = basePrice * 3; // Multiply by 3
                    const discount = multipliedValue * 0.03; // Calculate 3% discount
                    console.log("Calculated Price:", multipliedValue - discount);
                    return multipliedValue - discount; // Subtract discount and return the final price
                  })(),
                });  
                
              }

              else if(options[selectedIndex] == "6 month"){
                setShowPage(true);
                setSubscription({
                  type: "6month",
                  api: "xyz",
                  price: (() => {
                    const basePrice = user?.ppm ; // Get ppm value, default to 0 if undefined
                    const multipliedValue = basePrice * 6; // Multiply by 3
                    const discount = multipliedValue * 0.06; // Calculate 6% discount
                    console.log("Calculated Price:", multipliedValue - discount);
                    return multipliedValue - discount; // Subtract discount and return the final price
                  })(),
                });  
                
              }
          } 
          else if (
            mentor?.user?.signedUpFor === "mentor"
          ) {
            toast.error("Mentors Can't Buy Mentorship");
          } else if (user?.activeMentee >= 3) {
            toast(
              `Oops! ${
                user?.name?.split(" ")[0]
              } is busy with other mentees. Try again later or explore other mentorships!`,
              {
                id: "month",
                icon: (
                  <EventAvailableIcon
                    sx={{ color: "var(--button2)" }}
                  />
                ),
              }
            );
          } else {
            toast(" Login To Buy Your Mentorship");
            navigate("/login");
          }

        }
      }

        >
          {/* {options[selectedIndex]}   */}
          &#8377;{Intl.NumberFormat("en-IN").format(user?.ppm)}/month
        </Button>
        <Button
          aria-controls={openBtn ? 'split-button-menu' : undefined}
          aria-expanded={openBtn ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon fontSize="small" />
        </Button>
      </ButtonGroup>
      <Menu
        anchorEl={anchorEl}
        open={openBtn}
        onClose={handleCloseBtn}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            maxHeight: 250,
            width: '20ch',
            marginLeft: 10,
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
                          </React.Fragment>


                        
                          
                          {isAuthenticated && <>
                      <Button
                       sx={{
                        backgroundColor: "var(--button1)",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "var(--button1Hover)",
                        },
                        width: { xs: "18vmax", md: "12vmax" },
                        ml: "1vmax",
                        mt: 0,
                      }}
                      onClick={() => {
                            navigate('/chat', { state: { reciverId: id, name:user?.name, avatar:user?.avatar?.public_URI } });

                      }}>Chat with {user?.name?.split(" ")[0]}</Button>
                     </>}
                        </Box>
                      ) : (
                        (isAuthenticated || menAuth) && (
                          <Typography
                            variant="p"
                            textAlign={"center"}
                            color={"green"}
                          >
                            You already have an active mentorship{" "}
                          </Typography>
                        )
                      )}
                     
                    </Box>
                    {isAuthenticated || menAuth ? (
                      <>
                        <Box
                          width="100%"
                          sx={{ p: { xs: "1vmax", md: "0 25vmax" } }}
                        >
                          <Box
                            display="flex"
                            sx={{
                              justifyContent: {
                                xs: "center",
                                md: "flex-start",
                              },
                            }}
                          >
                            <Typography
                              textAlign={"center"}
                              component="span"
                              variant="p"
                              mr="1vmax"
                            >
                              <strong>
                                {cLoading === false && connection?.count}{" "}
                              </strong>
                              Mentee
                            </Typography>
                            <Typography
                              textAlign={"center"}
                              component="span"
                              variant="p"
                              mr="1vmax"
                            >
                              <strong>{user?.ratings} </strong>
                              Ratings
                            </Typography>
                            <Typography
                              textAlign={"center"}
                              component="span"
                              variant="p"
                              mr="1vmax"
                            >
                              <strong>{user?.yearOfStudy} </strong>
                              Present Year
                            </Typography>
                          </Box>
                          <Box mt={"2vmax"}>
                            <Typography
                              component="p"
                              variant="p"
                              sx={{
                                fontSize: { md: "1.2vmax" },
                                margin: "12px auto",
                                fontWeight: 800,
                                fontStyle: "italic",
                                display: { xs: "none", md: "block" },
                              }}
                            >
                              &#x275D;{" "}
                              {(isAuthenticated || menAuth) &&
                                user?.desc?.slice(0, 35)}{" "}
                              &#x275E;
                            </Typography>
                            <Typography
                              component="p"
                              variant="p"
                              sx={{
                                lineHeight: 1.8,
                                letterSpacing: 0.5,
                                fontSize: { xs: "2vmax", md: "1.5vmax" },
                                fontWeight: 300,
                              }}
                            >
                              {user?.about?.slice(0, 400)}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              mt: { xs: "3vmax", md: "2vmax" },
                              fontSize: { xs: "2.5vmax", md: "1.5vmax" },
                              fontWeight: "700",
                            }}
                          >
                            Academic Background
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar sx={{ bgcolor: "#5c5c5c" }}>
                                  <SchoolIcon />
                                </Avatar>
                              </ListItemAvatar>
                              {(isAuthenticated || menAuth) && (
                                <ListItemText
                                  primary="College"
                                  secondary={`${user?.college}(${user?.branch})`}
                                />
                              )}
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar sx={{ bgcolor: "#5c5c5c" }}>
                                  <MilitaryTechIcon />
                                </Avatar>
                              </ListItemAvatar>
                              {(isAuthenticated || menAuth) && (
                                <ListItemText
                                  primary="Rank"
                                  secondary={`${
                                    user?.exam?.name === "jeemains"
                                      ? "JEE MAINS"
                                      : user?.exam?.name === "jeeadv"
                                      ? "JEE ADVANCE"
                                      : "BITSAT"
                                  }(${user?.exam?.rank})`}
                                />
                              )}
                            </ListItem>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            maxWidth: { xs: "100vw" },
                            p: { xs: "1vmax", md: "2vmax 10vmax" },
                            mt: { xs: "3vmax", md: "5vmax" },
                          }}
                        >
                          <Tabs defaultValue={0}>
                            <TabsList
                              sx={{ minWidth: "10px", width: { xs: "100%" } }}
                            >
                              <Tab value={0}>Mentor Video</Tab>
                              <Tab value={1}>Authenticity</Tab>
                              <Tab value={2}>Ratings</Tab>
                            </TabsList>
                            <TabPanel value={0}>
                              <MentorIntro />
                            </TabPanel>
                            <TabPanel value={1}>
                              <Authenticity
                                mentorName={user?.name}
                                idcard={user?.idCard}
                              />
                            </TabPanel>
                            <TabPanel value={2} sx={{maxHeight:{xs:'350px', md:'600px', overflowY:'scroll'}}}>
                              <RatingMentor
                                mentorId={user?.id}
                                student={stuUser?.user}
                              />
                            </TabPanel>
                          </Tabs>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography component="h2">
                          Please Login To View Mentor Details
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default MentorProfile;
