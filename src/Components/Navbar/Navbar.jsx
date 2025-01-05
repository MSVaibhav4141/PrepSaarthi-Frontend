import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Drawer from "@mui/material/Drawer";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import HandshakeIcon from "@mui/icons-material/Handshake";
import MailIcon from "@mui/icons-material/Mail";
import SchoolIcon from "@mui/icons-material/School";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import { clearError, clearMessage, getAllNotification, getAllNotificationStu, logoutUser } from "../../action/userAction";
import {
  clearError as stuErrorClear,
  clearMessage as stuClrMssg,
  logoutUser as stuLogout,
} from "../../action/studentAction";
import toast from "react-hot-toast";
import { Badge, CardMedia } from "@mui/material";
// import './navbar'
const drawerWidth = 240;
let navbarRef = null;
let previosPos = 0;
const readScroll = () => {
  if (navbarRef) {
    if (window.scrollY > 270 && window.scrollY > previosPos) {
      navbarRef.style.top = "-100px";
    }
    if (window.scrollY < previosPos) {
      navbarRef.style.top = "0px";
    }
    previosPos = window.scrollY;
  }
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
window.addEventListener("scroll", readScroll);
function ResponsiveAppBar(props) {
  const navbarRefInternal = React.useRef(null);
  React.useEffect(() => {
    navbarRef = navbarRefInternal.current;
    return () => {
      navbarRef = null;
    };
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification,setNot] = React.useState([])
  const { message, user, isAuthenticated, error } = useSelector(
    (state) => state.mentor
  );
  const {notificatioin} = useSelector((state) => state.notification)


  const {
    message: stuMessage,
    user: stuUser,
    isAuthenticated: stuAuth,
    error: stuError,
  } = useSelector((state) => state.student);
  const [loggedIn, setLogin] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const pathname = location.pathname;
  const navItems = [
    { item: "Our Mentors", link: "/lists/mentors", icon: <SchoolIcon /> },
    {
      item: "Become a mentor",
      link: "/bm?content=1",
      icon: <HandshakeIcon />,
    },
    { item: "FAQs", link: "/faq#_faq-end", icon: <QuestionAnswerIcon /> },
    {
      item: "About Us",
      link: "/about",
      icon: <PersonPinIcon />,
    },
  ];

  React.useEffect(() => {
    // console.log(user?.isAuthenticated,stuUser?.isAuthenticated )
    if(isAuthenticated){
      dispatch(getAllNotification(user?.user?._id))
    }
    if(stuAuth){
      dispatch(getAllNotificationStu(stuUser?.user?._id))
    }
  }, [user,stuUser])

   React.useEffect(() => {
    if(notificatioin){
    setNot(notificatioin)
    }
  }, [notificatioin])
  React.useEffect(() => {
    if (isAuthenticated || stuAuth) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [isAuthenticated, stuAuth]);

  React.useEffect(() => {
    if (error) {
      // toast.error(error)
      dispatch(clearError());
    }
    if (stuError) {
      // toast.error(error)
      dispatch(stuErrorClear());
    }
    if (message) {
      dispatch(clearMessage());
      toast.success(message);
      navigate("/login");
    }
    if (stuMessage) {
      dispatch(stuClrMssg());
      toast.success(stuMessage);
      navigate("/login");
    }
  }, [message, error, dispatch, navigate, stuMessage, stuError]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const [open, setOpen] = React.useState(false);
 
  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
  };
  const handleNavigation = (e) => {
    setAnchorElUser(null);
    navigate("/role/mentor/final");
  };

  const handleOpen = () => {setOpen(true)};
  const handleClose = () =>{ setOpen(false)

  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  React.useEffect(() => {
    setNot((prev) => {
      // Find the index of the notification if it exists
      const index = prev?.findIndex(item => item._id === props.notification._id);

      // If the notification exists, reorder it at the top
      if (index !== -1) {
        const arr = [...prev];
        const notToMove = arr.splice(index, 1)[0];
        return [notToMove, ...arr]; // Move the notification to the top
      }

      // Otherwise, add the new notification to the top
      return [props.notification, ...prev];
    });

  }, [props.notification])
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", minHeight: "100vh", bgcolor: "#fefeff" }}
    >
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          fontWeight: 700,
          color: "grey",
          textAlign: "start",
          pl: "18px",
        }}
      >
        PrepSaarthi
      </Typography>
      <Divider />
      <List
        sx={{
          flexDirection: "column",
          justifyContent: "space-between",
          height: "calc(85% - 50px)",
          pt: 0,
        }}
      >
        {isAuthenticated || stuAuth ? (
          <Link to={`/user/${stuUser?.user?._id || user?.user?._id}`}>
            <ListItem sx={{ p: 0, width: 240 }}>
              <ListItemButton
                sx={
                  pathname === `/user/${stuUser?.user?._id || user?.user?._id}`
                    ? {
                        textAlign: "start",
                        color: "black",
                        "& .MuiSvgIcon-root": { color: "grey" },
                        bgcolor: "#d1e8ff",
                      }
                    : {
                        textAlign: "start",
                        color: "black",
                        "& .MuiSvgIcon-root": { color: "grey" },
                      }
                }
              >
                <AccountCircleIcon />
                <ListItemText
                  sx={{
                    ml: "1.5vmax",
                    color: "grey",
                    "& .MuiTypography-root": {
                      fontWeight: 700,
                      fontSize: "2.2vmax",
                    },
                  }}
                  primary="Your Profile"
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : (
          <Link to="/">
            <ListItem sx={{ p: 0, width: 240 }}>
              <ListItemButton
                sx={
                  pathname === "/"
                    ? {
                        textAlign: "start",
                        color: "black",
                        "& .MuiSvgIcon-root": { color: "grey" },
                        bgcolor: "#d1e8ff",
                      }
                    : {
                        textAlign: "start",
                        color: "black",
                        "& .MuiSvgIcon-root": { color: "grey" },
                      }
                }
              >
                <HomeIcon />
                <ListItemText
                  sx={{
                    ml: "1.5vmax",
                    color: "grey",
                    "& .MuiTypography-root": {
                      fontWeight: 700,
                      fontSize: "2.2vmax",
                    },
                  }}
                  primary="Home"
                />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        <Box sx={{ width: "100%" }}>
          {navItems.map((item, i) => (
            <Link to={item.link}>
              <ListItem key={i} disablePadding>
                <ListItemButton
                  sx={
                    pathname === item.link.split("#")[0] ||
                    pathname === item.link?.split("?")[0]
                      ? {
                          textAlign: "start",
                          color: "black",
                          "& .MuiSvgIcon-root": { color: "grey" },
                          bgcolor: "#d1e8ff",
                        }
                      : {
                          textAlign: "start",
                          color: "black",
                          "& .MuiSvgIcon-root": { color: "grey" },
                        }
                  }
                >
                  {item.icon}
                  <ListItemText
                    primary={item.item}
                    sx={{
                      ml: "1.5vmax",
                      color: "grey",
                      "& .MuiTypography-root": {
                        fontWeight: 700,
                        fontSize: "2.2vmax",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Divider />
          {Boolean(loggedIn) || Boolean() ? (
            <Box sx={{ mt: "3vmax" }}>
              <Link to="/settings">
                <ListItem sx={{ p: 0 }}>
                  <ListItemButton
                    sx={
                      pathname === "/settings"
                        ? {
                            textAlign: "start",
                            color: "black",
                            "& .MuiSvgIcon-root": { color: "grey" },
                            bgcolor: "#d1e8ff",
                          }
                        : {
                            textAlign: "start",
                            color: "black",
                            "& .MuiSvgIcon-root": { color: "grey" },
                          }
                    }
                  >
                    <SettingsIcon />
                    <ListItemText
                      sx={{
                        ml: "1.5vmax",
                        color: "grey",
                        "& .MuiTypography-root": {
                          fontWeight: 700,
                          fontSize: "2.2vmax",
                        },
                      }}
                      primary="Setings"
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                onClick={() => {
                  if (user?.user?.signedUpFor === "mentor") {
                    dispatch(logoutUser());
                  } else if (stuUser?.user?.signedUpFor === "student") {
                    dispatch(stuLogout());
                  }
                }}
              >
                <ListItem sx={{ p: 0 }}>
                  <ListItemButton
                    sx={{
                      textAlign: "start",
                      color: "black",
                      "& .MuiSvgIcon-root": { color: "grey" },
                    }}
                  >
                    <LogoutIcon />
                    <ListItemText
                      sx={{
                        ml: "1.5vmax",
                        color: "grey",
                        "& .MuiTypography-root": {
                          fontWeight: 700,
                          fontSize: "2.2vmax",
                        },
                      }}
                      primary="Logout"
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Box>
          ) : (
            <>
              <Box sx={{ width: "100%", mt: "2vmax" }}>
                <Link to="/login">
                  <Button
                    variant="contained"
                    sx={{ width: "90%", m: "0 auto", mb: "2.8vmax" }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="contained"
                    sx={{
                      width: "90%",
                      m: "0 auto",
                      mb: "2.8vmax",
                      bgcolor: "var(--button1)",
                      "&:hover": { bgcolor: "var(--button1Hover)" },
                    }}
                  >
                    SignUp
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Box>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
     <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Notification
            </Typography>
           
            {notification?.length > 0 ? (
              <>{notification?.map((i) => (
                <Box sx={{height:{md:'80px'}, width:'100%', bgcolor:'#dddddd', display:'flex', alignItems:'center', borderRadius:'20px'}} onClick={() => {
                  setOpen(false)
                  navigate('/chat', { state: { senderId: i?.senderId } });
                  setNot((prev) => prev.filter(item => item._id !== i._id))
                }}>
                  <Box sx={{margin:'10px'}}>
                    <CardMedia sx={{width:'50px', height:'50px', borderRadius:'50%'}} component={'img'} src={i?.senderAvatar}>
  
                    </CardMedia>
                  </Box>
                  <Box>
                    <Typography component={'p'} sx={{fontWeight:'600'}}>{i?.senderName}</Typography>
                    <Typography>{(((i?.senderContent?.length > 16 || i?.senderContent?.length > 16) && window?.innerWidth > 900)) ? ((i?.senderContent|| i?.senderContent)?.substr(0,16) + '...'): (((i?.senderContent || i?.senderContent)?.length > 25)?(((i?.senderContent || i?.senderContent)?.substr(0,25))+'...'):(i?.senderContent || i?.senderContent))}</Typography>
                  </Box>
                </Box>
              ))}</>
            ) : (<>
            <Box>No New Notification</Box>
            </>)}
            
          </Box>
        </Fade>
      </Modal>
      <AppBar
        position="sticky"
        ref={navbarRefInternal}
        sx={{ transition: "top 0.5s ease-in-out" }}
        className="voooppp"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 70 }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Box component="img" src="/images/logo.png" height={50}></Box>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "flex", md: "none", flexDirection: "column" },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/lists/mentors");
                }}
              >
                <Typography textAlign="center">Mentorship</Typography>
              </MenuItem>
            </Menu> */}
            </Box>

            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Box component="img" src="/images/logo.png" height={45}></Box>
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                flexDirection: "row-reverse",
              }}
            >
              <Box display="flex">
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/lists/mentors");
                  }}
                  sx={{
                    width: { xs: "10vmax", md: "8vmax" },
                    mr: "1vmax",
                    fontSize: { xs: "1.2vmax", md: "0.9vmax" },
                    borderRadius: "20px",
                  }}
                >
                  Mentorship
                </Button>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {Boolean(loggedIn) || Boolean() ? (
                <>
                  <IconButton onClick={() => handleOpen()} aria-label="cart">
                    <Badge
                      badgeContent={notification?.length}
                      color="error"
                    >
                      <MailIcon color="action" />
                    </Badge>
                  </IconButton>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        user?.user?.avatar?.public_URI ||
                        stuUser?.user?.avatar?.public_URI
                      }
                    />
                  </IconButton>
                  <Menu
                    sx={{
                      mt: "45px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    id="menu-appbarr"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        user?.user?.signedUpFor === "mentor" &&
                          navigate(`/user/${user?.user._id}`);
                        stuUser?.user?.signedUpFor === "student" &&
                          navigate(`/user/${stuUser?.user._id}`);
                      }}
                    >
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    {user?.user.signedUpFor === "mentor" && (
                      <MenuItem onClick={handleNavigation}>
                        <Typography textAlign="center">
                          Mentor Application
                        </Typography>
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        if (
                          user?.user.role === "admin" ||
                          user?.user.role === "mentor"
                        ) {
                          navigate("/update/profile/mentor");
                        } else if (stuUser?.user.role === "student") {
                          navigate("/update/profile/student");
                        }
                      }}
                    >
                      <Typography textAlign="center">Edit Profile</Typography>
                    </MenuItem>
                    {user?.user.role === "admin" && (
                      <MenuItem
                        onClick={() => {
                          handleCloseUserMenu();
                          navigate("/admin/dashboard");
                        }}
                      >
                        <Typography textAlign="center">Dashboard</Typography>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography
                        width={"100%"}
                        textAlign="center"
                        component="span"
                        onClick={() => {
                          if (user?.user?.signedUpFor === "mentor") {
                            dispatch(logoutUser());
                          } else if (stuUser?.user?.signedUpFor === "student") {
                            dispatch(stuLogout());
                          }
                        }}
                      >
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Box to="/login" component={Link} sx={{ display: "flex" }}>
                    {/* <IconButton components={Link} to="/login" sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton> */}
                    <Link to="/signup">
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          bgcolor: "#0054a7",
                          width: { xs: "10vmax", md: "8vmax" },
                          ml: "1vmax",
                          fontSize: { xs: "1.2vmax", md: "0.9vmax" },
                        }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          bgcolor: "#e2a515",
                          width: { xs: "10vmax", md: "8vmax" },
                          ml: "1vmax",
                          fontSize: { xs: "1.2vmax", md: "0.9vmax" },
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        Login
                      </Button>
                    </Link>
                  </Box>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
export default ResponsiveAppBar;