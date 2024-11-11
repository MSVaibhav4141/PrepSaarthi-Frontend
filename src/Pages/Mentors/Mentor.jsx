import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import "./mentor.css";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import LockIcon from "@mui/icons-material/Lock";
import { usePDF } from "react-to-pdf";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import minMax from "dayjs/plugin/minMax";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  Fade,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import MenorInfoConnection from "../MenorInfoConnection/MenorInfoConnection";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import { Link, useNavigate } from "react-router-dom";
import {
  allMentorConnection,
  allSelfConnection,
  clearError,
  clearMessage,
  loadUser,
  popUpState,
  reset,
  updateCoverImage,
  updateMentoringStatus,
} from "../../action/userAction";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../../Components/Loader/Loader";
import EditIcon from "@mui/icons-material/Edit";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MetaData from "../../utils/Metadata";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  updateCoverImageStu,
  loadUser as stuLoad,
  reset as sReset,
  clearError as sClearError,
  getAllConnectionsStu,
} from "../../action/studentAction";
dayjs.extend(minMax);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: { xs: "95vw", md: "70vw" },
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: "15px",
  p: 4,
};
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: { xs: "95vw", md: "70vw" },
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: "15px",
  p: 2,
};
const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "98vw", md: "50vw" },
  borderRadius: "15px",
  bgcolor: "background.paper",
  maxHeight: "95vh",
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};
const style5 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "85vw", md: "30vw" },
  borderRadius: "15px",
  bgcolor: "background.paper",
  textAlign:'center',
  maxHeight: "95vh",
  boxShadow: 24,
  p: 4,
};
const style4 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "98vw", md: "70vw" },
  borderRadius: "15px",
  bgcolor: "background.paper",
  maxHeight: "95vh",
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const Mentor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading: statusLoading,
    user: mentoringStatus,
    error: statusError,
  } = useSelector((state) => state.status);
  const { error, loading, user, isAuthenticated } = useSelector(
    (state) => state.mentor
  );
  const { connection:stuCon, loading:stuConLoad} = useSelector(
    (state) => state.getAllConnectionStuPast  
  );

  const [tooltipOpen, setTooltipOpen] = useState({ physics: false, chemistry: false, math: false });

  const handleTooltipToggle = (subject) => {
    setTooltipOpen((prev) => ({
      ...prev,
      [subject]: !prev[subject],
    }));
  };

  const {
    error: coverImgError,
    loading: coverImgLoading,
    success: coverImgSuccess,
  } = useSelector((state) => state.changeCoverImage);
  const {
    error: coverImgErrorStu,
    loading: coverImgLoadingStu,
    success: coverImgSuccessStu,
  } = useSelector((state) => state.changeCoverImageStu);
  const {
    loading: stuLoading,
    user: stuUser,
    isAuthenticated: stuAuth,
  } = useSelector((state) => state.student);

  const { loading: connectionLoad, connection } = useSelector(
    (state) => state.connectionsHead
  );

  useEffect(() => {
    if (coverImgSuccess) {
      toast.success("Cover Photo updated successfully");
      dispatch(loadUser());
      setOpen(false);
      dispatch(reset());
    }
    if (coverImgError) {
      toast.success(coverImgError.message);
      dispatch(clearError());
    }
    if (coverImgSuccessStu) {
      toast.success("Cover Photo updated successfully");
      dispatch(stuLoad());
      setOpen(false);
      dispatch(sReset());
    }
    if (coverImgErrorStu) {
      toast.success(coverImgErrorStu.message);
      dispatch(sClearError());
    }
    dispatch(allSelfConnection());
  }, [
    dispatch,
    coverImgError,
    coverImgSuccess,
    coverImgErrorStu,
    coverImgSuccessStu,
  ]);
  const {
    success: connSuccess,
    loading: connLoading,
    error: connError,
  } = useSelector((state) => state.getAllConnectionMenPast); //this

  useEffect(() => {
    if (connError) {
      dispatch(clearError());
      return;
    }
  }, [connError, dispatch]);

  useEffect(() => {
    dispatch(allMentorConnection());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      if (error.message === "Resource not found _id") {
        navigate("/notfound");
      }
      dispatch(clearError());
    }
  }, [error, dispatch, navigate]);
  useEffect(() => {
    if (statusError) {
      toast.error(statusError.message);
      dispatch(clearError());
    }
    if (mentoringStatus?.success) {
      toast.success("Your Status Changed Successfully");
      dispatch(clearMessage());
    }
  }, [statusError, mentoringStatus, dispatch]);
  useEffect(() => {
    if (
      loading === false &&
      stuLoading === false &&
      isAuthenticated === false &&
      stuAuth === false
    ) {
      navigate("/login");
      return;
    }
    if (user?.user?.verified === false || stuUser?.user?.verified === false) {
      navigate("/verify/account");
      return;
    }
  }, [
    isAuthenticated,
    stuAuth,
    navigate,
    user?.user?.verified,
    stuUser?.user?.verified,
    loading,
    stuLoading,
  ]);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        className="_mentor-inf0-section"
        style={{ height: "100%" }}
      >
        {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
      </div>
    );
  }

  const [value, setValue] = React.useState(0);
  const [openConnection, setModalConenction] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = (event, newValue) => {
    setOpen(true);
  };
  const handleClose = (event, newValue) => {
    setOpen(false);
  };
  const [avatarPrview, setAvatarPreview] = React.useState("");

  useEffect(() => {
    if (loading === false && isAuthenticated) {
      setAvatarPreview(user?.user?.coverImg?.public_URI || "/images/cover.jpg");
    }
    if (stuLoading === false && stuAuth) {
      setAvatarPreview(
        stuUser?.user?.coverImg?.public_URI || "/images/cover.jpg"
      );
    }
  }, [
    stuLoading,
    loading,
    user?.user?.coverImg?.public_URI,
    stuUser?.user?.coverImg?.public_URI,
    isAuthenticated,
    stuAuth,
  ]);
  useEffect(() => {
    dispatch(getAllConnectionsStu());
  }, [dispatch]);
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const { toPDF, targetRef } = usePDF({ filename: `${user?.user?.name}'s Earning From PrepSaarthi` });
  const [prgress, setProgress] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [uploading, setuploading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [openEarning, setEarningModal] = React.useState(false);
  const [openCompletion, setCompletion] = React.useState(false);

  const dates = connection
    ?.map((item) => dayjs(item?.boughtAt))
    .filter((date) => date.isValid()); 

  const minDate = dates?.length > 0 ? dayjs.min(...dates) : null; 
  const maxDate = dates?.length > 0 ? dayjs.max(...dates) : null; 
  const getCurrentDateTimeInIST = () => {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata', 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const istDate = now.toLocaleString('en-US', options);
    return istDate;
  };
  React.useEffect(() => {
    if (prgress === 100) {
      setSuccess(true);
      setTimeout(() => {
        setProgress(0);
      }, 800);
      setTimeout(() => {
        setSuccess(false);
      }, 1200);
    }
  }, [prgress]);

  const handleChangeCover = async (event) => {
    if (event.target.name === "avatar") {
      setuploading(true);
      const imageFile = event.target.files[0];
      const options = {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1920,
        onProgress: (progress) => {
          setProgress((prevProgress) => {
            if (progress !== prevProgress) {
              return progress;
            }
            return prevProgress;
          });
        },
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        const base64img = await convertBase64(compressedFile);
        setuploading(false);
        setAvatar(base64img);
        setAvatarPreview(base64img);
      } catch (error) {
        setuploading(false);
        toast.error(error.message);
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const userCoverPhoto = new FormData();
    userCoverPhoto.set("avatar", avatar);

    const serializedData = {};
    userCoverPhoto.forEach((value, key) => {
      serializedData[key] = value;
    });
    if (isAuthenticated) {
      dispatch(updateCoverImage(serializedData));
    }
    if (stuAuth) {
      dispatch(updateCoverImageStu(serializedData));
    }
  };
  const activeConnection = connSuccess?.connection?.filter(
    (item) => item.isActive
  );
  const closedConnection = connSuccess?.connection?.filter(
    (item) => !item.isActive
  );
  const activeStuConnection = stuCon?.connection?.filter(
    (item) => item.isActive
  );
  const closedStuConnection = stuCon?.connection?.filter(
    (item) => !item.isActive
  );
  const [display, setDisplay] = useState("none");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredConnection, setConnection] = useState(connection);
  const [openPop, setPop] = useState(false);
  useEffect(() => {
    setPop(user?.user?.popUp);
  }, [user?.user?.popUp]);

  useEffect(() => {
    const filterData = () => {
      if (!startDate || !endDate) return connection; // Return all data if dates are not selected
      const filteredData = connection?.filter((item) => {
        const itemDate = dayjs(item?.boughtAt); // Convert the date string to a Day.js object
        // Check if the item date is between or exactly matches the start and end dates
        return itemDate?.isBetween(startDate, endDate, "day", "[]");
      });
      return filteredData;
    };

    setConnection(filterData());
  }, [startDate, endDate, connection]);
  return (
    <>
      {loading || stuLoading ? (
        <Loader />
      ) : (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component={"form"} onSubmit={handleSubmit}>
              <Box display="flex" alignItems="center" flexDirection={"column"}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: `${prgress}%`,
                      bgcolor: "#e5dfdf99",
                      transition: "0.3s ease-in-out",
                      bottom: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  ></Box>
                  <Typography
                    sx={
                      prgress > 0
                        ? {
                            zIndex: 12,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            fontSize: "4vmax",
                            color: "white",
                            transition: "0.5s ease-in-out",
                            opacity: 1,
                            fontWeight: 700,
                          }
                        : { opacity: 1 }
                    }
                  >
                    {prgress}%
                  </Typography>
                  <CircularProgress
                    variant="determinate"
                    value={prgress}
                    sx={
                      prgress === 0
                        ? {
                            position: "absolute",
                            top: "5.18px",
                            left: "5px",
                            display: "none",
                          }
                        : {
                            position: "absolute",
                            top: "5.18px",
                            left: "5px",
                          }
                    }
                  />
                  <div
                    class="success-animation"
                    style={success ? { display: "block" } : { display: "none" }}
                  >
                    <svg
                      class="checkmark"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 52 52"
                    >
                      <circle
                        class="checkmark__circle"
                        cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                      />
                      <path
                        class="checkmark__check"
                        fill="none"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      />
                    </svg>
                  </div>
                  <Box
                    component="img"
                    src={avatarPrview}
                    width="100%"
                    height="100%"
                    sx={{
                      aspectRatio: "1/1",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    mr="10px"
                  ></Box>
                </Box>

                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mt: "1vmax" }}
                >
                  Upload Your Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    name="avatar"
                    onChange={handleChangeCover}
                  />
                </Button>
                <LoadingButton
                  variant="contained"
                  sx={{
                    mt: "1vmax",
                    bgcolor: "var(--button1)",
                    "&:hover": { bgcolor: "var(--button1Hover)" },
                  }}
                  type="submit"
                  disabled={uploading}
                  loading={coverImgLoading || coverImgLoadingStu}
                >
                  submit
                </LoadingButton>
                <Button
                  sx={{ fontSize: { xs: "1.5vmax", md: "0.8vmax" } }}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>
          {user?.user?.role === "mentor" &&
            user?.user?.isHeadMentor === true && (
              <Modal
                open={openPop}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style1}>
                  <Box
                    sx={{ position: "relative", width: "100%", height: "100%" }}
                  >
                    <IconButton
                      onClick={() => {
                        dispatch(popUpState(isChecked));
                        setPop(false);
                      }}
                      sx={{ position: "absolute", top: "1px", right: "1px" }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Box>
                      <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                        fontWeight={700}
                      >
                        Congratulations, {(user?.user?.name).split(" ")[0]}!🥳
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        marginBottom={"1vmax"}
                      >
                        You have been appointed as the Head Mentor at
                        PrepSaarthi. This is a significant and honorable
                        responsibility, and we are confident in your ability to
                        lead with excellence.
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        marginBottom={"1vmax"}
                      >
                        To help you get started and familiarize yourself with
                        your new role, please click on the "Dashboard" button
                        below your status updater. There, you'll find a
                        comprehensive list of mentors. By selecting specific
                        mentors, you can delve deeper into their profiles and
                        tasks.
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        marginBottom={"1vmax"}
                      >
                        Wishing you the best of luck as you embark on this
                        exciting journey as Head Mentor. Your leadership and
                        dedication will undoubtedly inspire and guide many.
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        marginBottom={"2vmax"}
                      >
                        Feel free to ask any questions or give any suggestions.
                        We are here to support you every step of the way.
                      </Typography>
                      <Typography variant="body1" fontWeight={700} gutterBottom>
                        Best regards,
                      </Typography>
                      <Typography variant="body1" fontWeight={700} gutterBottom>
                        The PrepSaarthi Team
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={isChecked}
                          onChange={() => setIsChecked((prev) => !prev)}
                        />
                      }
                      label="Do not show this message again"
                    />
                  </Box>
                </Box>
              </Modal>
            )}
          <MetaData title="Your Profile" />
          <div className="header__wrapper">
            <div className="cols__container">
              <div className="left__col">
                <div className="_college-background">
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "5px",
                      bgcolor: "grey",
                      borderRadius: "50%",
                      fontSize: "35px",
                      padding: "5px",
                      color: "white",
                      transition: "0.3s",
                    }}
                    onClick={() => handleOpen()}
                  >
                    <EditIcon />
                  </IconButton>
                  <img
                    src={
                      user?.user?.coverImg?.public_URI ||
                      stuUser?.user?.coverImg?.public_URI ||
                      "/images/cover.jpg"
                    }
                    alt={"college"}
                  />
                  <div className="img__container">
                    <img
                      src={
                        user?.user?.avatar?.public_URI ||
                        stuUser?.user?.avatar?.public_URI
                      }
                      alt={user?.user?.name || stuUser?.user?.name}
                    />
                    <Link
                      to={
                        user?.user?.role === "mentor" ||
                        user?.user?.role === "user" ||
                        user?.user?.role === "admin"
                          ? "/update/profile/mentor"
                          : stuUser?.user?.role === "student" &&
                            "/update/profile/student"
                      }
                    >
                      {" "}
                      <EditIcon
                        sx={{
                          position: "absolute",
                          bottom: "10px",
                          right: "-5px",
                          bgcolor: "var(--button1)",
                          borderRadius: "50%",
                          fontSize: "35px",
                          padding: "5px",
                          color: "white",
                          transition: "0.3s",
                          "&:hover": {
                            fontSize: "40px",
                          },
                        }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="_mentor-profile-and-name">
                  <div className="_mentor-initals">
                    <h2>{user?.user?.name || stuUser?.user?.name}</h2>
                    <p>
                      {user?.user?.collegeName}
                      {user?.user?.branch}
                    </p>
                    <p>
                      {user?.user?.mobileNumber || stuUser?.user?.mobileNumber}
                    </p>

                    <p>{user?.user?.email || stuUser?.user?.email}</p>

                    <p>
                      {user?.exam?.name === "jeemains" && (
                        <span>JEE MAINS({user?.exam?.rank})</span>
                      )}
                      {user?.exam?.name === "jeeadv" && (
                        <span>JEE ADV({user?.exam?.rank})</span>
                      )}
                      {user?.exam?.name === "bitsat" && (
                        <span>BITSAT({user?.exam?.rank})</span>
                      )}
                    </p>
                    {user?.user?.isStepLastCompleted &&
                      user?.user?.role === "mentor" && (
                        <>
                          <FormControl sx={{ p: 2 }}>
                            <FormLabel
                              id="demo-radio-buttons-group-label"
                              disabled={statusLoading}
                            >
                              Your Status
                            </FormLabel>
                            <hr />
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue={
                                user?.user?.mentoringStatus === "active"
                                  ? "active"
                                  : "inactive"
                              }
                              name="radio-buttons-group"
                            >
                              <FormControlLabel
                                value="active"
                                control={<Radio />}
                                label="Active"
                                onClick={() =>
                                  dispatch(updateMentoringStatus("active"))
                                }
                              />
                              <FormControlLabel
                                value="inactive"
                                control={<Radio />}
                                label="Inactive"
                                onClick={() =>
                                  dispatch(updateMentoringStatus("inactive"))
                                }
                              />
                            </RadioGroup>
                          </FormControl>
                          <div>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "var(--button1)",
                                color: "#fff",
                                "&:hover": {
                                  backgroundColor: "var(--button1Hover)",
                                },
                                mb: "2vmax",
                              }}
                              startIcon={<AttachEmailIcon />}
                              href="/files/Message To Mentors.pdf" // Replace with the correct path to your PDF file
                              download
                            >
                              Message To Mentors
                            </Button>
                          </div>
                        </>
                      )}
                          <div>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "var(--button1)",
                                color: "#fff",
                                "&:hover": {
                                  backgroundColor: "var(--button1Hover)",
                                },
                                mb: "2vmax",
                              }}
                              startIcon={<AttachEmailIcon />}
                              onClick={() => {
                                navigate('/chat')
                              }}
                            >
                              Open Chats
                            </Button>
                          </div>
                  </div>

                  {stuLoading === false &&
                    stuUser?.user?.role === "student" && (
                      <div>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "var(--button1)",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "var(--button1Hover)",
                            },
                            m: "2vmax 0",
                          }}
                          startIcon={<AttachEmailIcon />}
                          href="/files/Message To Students.pdf" // Replace with the correct path to your PDF file
                          download
                        >
                          Message To Students
                        </Button>
                      </div>
                    )}
                  {user?.user?.isHeadMentor && user?.user?.isHeadMentor && (
                    <>
                      <div>
                        <Link to="/mentor/controlls/dash">
                          <Button variant="contained" sx={{ mb: "2vmax" }}>
                            Dashboard
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="right__col">
                {user?.user?.signedUpFor === "mentor" &&
                user?.user?.role === "user" ? (
                  <>
                    {user?.user?.isStepLastCompleted === false ? (
                      <>
                        <Box
                          sx={{
                            background: "rgba( 255, 255, 255, 0.25 )",
                            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                            backdropFilter: " blur( 13px )",
                            borderRadius: "10px",
                            border: "1px solid rgba( 255, 255, 255, 0.18 )",
                            height: { xs: "60vh", md: "96%" },
                            width: "95%",
                            margin: "10px auto",
                            display: "flex",
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            p: 2,
                          }}
                        >
                          <LockIcon
                            sx={{
                              color: "grey",
                              fontSize: { xs: "6vmax", md: "3vmax" },
                            }}
                          />
                          <Typography
                            component="h2"
                            variant="p"
                            color={"grey"}
                            sx={{ fontSize: { xs: "2vmax", md: "1.8vmax" } }}
                          >
                            Kindly complete the mentor application to activate
                            your Mentor's dashboard
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <>
                        {/* <Box
                          sx={{
                            position: "relative",
                            minHeight: "40vmax",
                            overflow: "hidden",
                          }}
                        >
                         */}
                        <Box
                          sx={{
                            background: "rgba( 255, 255, 255, 0.25 )",
                            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                            backdropFilter: " blur( 13px )",
                            borderRadius: "10px",
                            border: "1px solid rgba( 255, 255, 255, 0.18 )",
                            height: { xs: "60vh", md: "96%" },
                            width: "95%",
                            margin: "10px auto",
                            display: "flex",
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            p: 2,
                          }}
                        >
                          <LockIcon
                            sx={{
                              fontSize: { xs: "3.8vmax", md: "2.8vmax" },
                              color: "grey",
                            }}
                          />
                          <Typography
                            component="h2"
                            variant="p"
                            color={"grey"}
                            sx={{
                              fontSize: { xs: "2vmax", md: "1.8vmax" },
                            }}
                          >
                            {user?.user?.updateRequest === "yes" ? (
                              <>
                                You can access your mentor's dashboard once your
                                changes are approved{" "}
                              </>
                            ) : (
                              <>
                                You can access your mentor's dashboard once your
                                account is verified{" "}
                              </>
                            )}
                          </Typography>
                        </Box>
                        {/* </Box> */}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Box sx={{ width: "100%" }}>
                      <Box
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",
                          overflow: "hidden  ",
                        }}
                      >
                        {stuLoading === false &&
                          stuUser?.user?.role === "student" && (
                            <>
                              <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                sx={{
                                  justifyContent: "center",
                                  backgroundColor: "#2b2b2b",
                                }}
                              >
                                <Tab
                                  sx={{ minWidth: "50%", color: "white" }}
                                  label="Active Mentorship"
                                  {...a11yProps(0)}
                                />
                                <Tab
                                  sx={{ minWidth: "50%", color: "white" }}
                                  label="Past Mentoships"
                                  {...a11yProps(1)}
                                />
                              </Tabs>
                            </>
                          )}
                        {(loading === false && (user?.user?.role === "mentor"||stuUser?.user?.role === "student") )&& (
                          <>
                          {user?.user?.role === "mentor" && ( 
                            <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={openEarning}
                            onClose={() => setEarningModal(false)}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                              backdrop: {
                                timeout: 500,
                              },
                            }}
                          >
                            <Fade in={openEarning}>
                              <Box sx={style3}>
                                <Box sx={{width:'100%', display:'flex', justifyContent:'end'}}><CloseIcon onClick={() => setEarningModal(false)}/></Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: {
                                      xs: "column",
                                      md: "row",
                                      marginBottom: "10px",
                                    },
                                  }}
                                >
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DemoContainer
                                      components={["DatePicker"]}
                                    >
                                      <DatePicker
                                        format="YYYY/MM/DD"
                                        label="Start Date"
                                        value={startDate}
                                        onChange={(newValue) =>
                                          setStartDate(newValue)
                                        }
                                        minDate={minDate}
                                        maxDate={maxDate}
                                      />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                  <Button
                                    disabled={
                                      filteredConnection?.length === 0
                                    }
                                    sx={{ m: "10px 0" }}
                                    variant="contained"
                                    onClick={() => {
                                      setDisplay("block");
                                      setTimeout(() => {
                                        toPDF();
                                      }, 500);
                                      setTimeout(() => {
                                        setDisplay("none");
                                      }, 1000);
                                    }}
                                  >
                                    Download PDF
                                  </Button>

                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DemoContainer
                                      components={["DatePicker"]}
                                    >
                                      <DatePicker
                                        format="YYYY/MM/DD"
                                        value={endDate}
                                        label="End Date"
                                        onChange={(newValue) =>
                                          setEndDate(newValue)
                                        }
                                        minDate={minDate}
                                        maxDate={maxDate}
                                      />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                </Box>
                                <TableContainer component={Paper}>
                                  <Table aria-label="collapsible table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell sx={{ fontWeight: 800 }}>
                                          Mentee
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          sx={{ fontWeight: 800 }}
                                        >
                                          Earning&nbsp;(&#8377;)
                                        </TableCell>
                                        <TableCell />
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {filteredConnection?.map((row, k) => (
                                        <Row key={k} row={row} />
                                      ))}
                                    </TableBody>
                                    <TableRow>
                                      <TableCell
                                        sx={{
                                          fontWeight: 900,
                                          color: "darkgreen",
                                        }}
                                      >
                                        Total:-
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        sx={{
                                          fontWeight: 900,
                                          color: "darkgreen",
                                        }}
                                      >
                                        &#8377;
                                        {filteredConnection
                                          ?.reduce((total, current) => {
                                            return (
                                              total +
                                              (current?.price * 73) / 100
                                            );
                                          }, 0)
                                          ?.toFixed(1)}
                                        &asymp;&#8377;
                                        {Math.round(
                                          filteredConnection?.reduce(
                                            (total, current) => {
                                              return (
                                                total +
                                                (current?.price * 73) / 100
                                              );
                                            },
                                            0
                                          )
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </Fade>
                          </Modal>
                          )}
                          {stuUser?.user?.role === "student" && (
                             <Modal
                             aria-labelledby="transition-modal-title"
                             aria-describedby="transition-modal-description"
                             open={openCompletion}
                             onClose={() => setCompletion(false)}
                             closeAfterTransition
                             slots={{ backdrop: Backdrop }}
                             slotProps={{
                               backdrop: {
                                 timeout: 500,
                               },
                             }}
                           >
                             <Fade in={openCompletion}>
                               <Box sx={style5}>
                                 <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                                   <CloseIcon onClick={() => setCompletion(false)} style={{ cursor: 'pointer' }} />
                                 </Box>
                       
                                 <Typography variant="h6" sx={{ mb: 2 }}>Overall Progress</Typography>
                       
                                 <Box sx={{ position: 'relative', display: 'inline-flex', mb: 4 }}>
                                   <CircularProgress
                                     variant="determinate"
                                     value={stuUser?.completion?.total || 0}
                                     size={120}
                                     thickness={4}
                                     sx={{ color: 'red' }}
                                   />
                                   <Box
                                     sx={{
                                       top: 0,
                                       left: 0,
                                       bottom: 0,
                                       right: 0,
                                       position: 'absolute',
                                       display: 'flex',
                                       alignItems: 'center',
                                       justifyContent: 'center',
                                     }}
                                   >
                                     <Typography variant="h4" component="div" color="textPrimary">
                                       {`${stuUser?.completion?.total || 0}%`}
                                     </Typography>
                                   </Box>
                                 </Box>
                       
                                 {/* Subject Progress Bars */}
                                 <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                   <Tooltip
                                     title={`Physics 11: ${stuUser?.completion?.phys11 || 0}% and Physics 12: ${stuUser?.completion?.phys12 || 0}%`}
                                     arrow
                                     open={tooltipOpen.physics}
                                     disableFocusListener
                                     disableHoverListener
                                     onClose={() => setTooltipOpen((prev) => ({ ...prev, physics: false }))}
                                   >
                                     <Box
                                       sx={{ position: 'relative', textAlign: 'center', cursor: 'pointer' }}
                                       onClick={() => handleTooltipToggle('physics')}
                                       onTouchStart={() => handleTooltipToggle('physics')}
                                     >
                                       <CircularProgress
                                         variant="determinate"
                                         value={stuUser?.completion?.physicsTotalOb || 0}
                                         size={60}
                                         thickness={4}
                                         sx={{ color: '#3f51b5' }} // Blue for Physics
                                       />
                                       <Box
                                         sx={{
                                           top: 0,
                                           left: 0,
                                           bottom: 0,
                                           right: 0,
                                           position: 'absolute',
                                           display: 'flex',
                                           alignItems: 'center',
                                           justifyContent: 'center',
                                         }}
                                       >
                                         <Typography variant="body2" component="div" color="textPrimary">
                                           {`${stuUser?.completion?.physicsTotalOb || 0}%`}
                                         </Typography>
                                       </Box>
                                     </Box>
                                       <Typography variant="body2" color="textSecondary">Physics</Typography>
                                   </Tooltip>
                       
                                   <Tooltip
                                     title={`Chemistry 11: ${stuUser?.completion?.chem11 || 0}% and Chemistry 12: ${stuUser?.completion?.chem12 || 0}%`}
                                     arrow
                                     open={tooltipOpen.chemistry}
                                     disableFocusListener
                                     disableHoverListener
                                     onClose={() => setTooltipOpen((prev) => ({ ...prev, chemistry: false }))}
                                   >
                                     <Box
                                       sx={{ position: 'relative', textAlign: 'center', cursor: 'pointer' }}
                                       onClick={() => handleTooltipToggle('chemistry')}
                                       onTouchStart={() => handleTooltipToggle('chemistry')}
                                     >
                                       <CircularProgress
                                         variant="determinate"
                                         value={stuUser?.completion?.chemistryTotalOb || 0}
                                         size={60}
                                         thickness={4}
                                         sx={{ color: '#ff5722' }} // Orange for Chemistry
                                       />
                                       <Box
                                         sx={{
                                           top: 0,
                                           left: 0,
                                           bottom: 0,
                                           right: 0,
                                           position: 'absolute',
                                           display: 'flex',
                                           alignItems: 'center',
                                           justifyContent: 'center',
                                         }}
                                       >
                                         <Typography variant="body2" component="div" color="textPrimary">
                                           {`${stuUser?.completion?.chemistryTotalOb || 0}%`}
                                         </Typography>
                                       </Box>
                                     </Box>
                                       <Typography variant="body2" color="textSecondary">Chemistry</Typography>
                                   </Tooltip>
                       
                                   <Tooltip
                                     title={`Math 11: ${stuUser?.completion?.maths11 || 0}% and Math 12: ${stuUser?.completion?.maths12 || 0}%`}
                                     arrow
                                     open={tooltipOpen.math}
                                     disableFocusListener
                                     disableHoverListener
                                     onClose={() => setTooltipOpen((prev) => ({ ...prev, math: false }))}
                                   >
                                     <Box
                                       sx={{ position: 'relative', textAlign: 'center', cursor: 'pointer' }}
                                       onClick={() => handleTooltipToggle('math')}
                                       onTouchStart={() => handleTooltipToggle('math')}
                                     >
                                       <CircularProgress
                                         variant="determinate"
                                         value={stuUser?.completion?.mathsTotalOb || 0}
                                         size={60}
                                         thickness={4}
                                         sx={{ color: '#4caf50' }} // Green for Math
                                       />
                                       <Box
                                         sx={{
                                           top: 0,
                                           left: 0,
                                           bottom: 0,
                                           right: 0,
                                           position: 'absolute',
                                           display: 'flex',
                                           alignItems: 'center',
                                           justifyContent: 'center',
                                         }}
                                       >
                                         <Typography variant="body2" component="div" color="textPrimary">
                                           {`${stuUser?.completion?.mathsTotalOb || 0}%`}
                                         </Typography>
                                       </Box>
                                     </Box>
                                       <Typography variant="body2" color="textSecondary">Math</Typography>
                                   </Tooltip>
                                 </Box>
                               </Box>
                             </Fade>
                           </Modal>
                          )}
                            <Modal
                              aria-labelledby="transition-modal-title"
                              aria-describedby="transition-modal-description"
                              open={openConnection}
                              onClose={() => setModalConenction(false)}
                              closeAfterTransition
                              slots={{ backdrop: Backdrop }}
                              slotProps={{
                                backdrop: {
                                  timeout: 500,
                                },
                              }}
                            >
                              <Fade in={openConnection}>
                                <Box sx={style4}>
                                <Box sx={{width:'100%', display:'flex', justifyContent:'end', mb:'1vmax'}}><CloseIcon onClick={() => setModalConenction(false)}/></Box>

                                  <>
                                    <Tabs
                                      value={value}
                                      onChange={handleChange}
                                      aria-label="basic tabs example"
                                      sx={{
                                        justifyContent: "center",
                                        backgroundColor: "#2b2b2b",
                                      }}
                                    >
                                      <Tab
                                        sx={{
                                          minWidth: "50%",
                                          color: "white",
                                          fontSize: {
                                            xs: "1.5vmax",
                                            md: "1vmax",
                                          },
                                        }}
                                        label="Active Mentorship"
                                        {...a11yProps(0)}
                                      />
                                      <Tab
                                        sx={{
                                          minWidth: "50%",
                                          color: "white",
                                          fontSize: {
                                            xs: "1.5vmax",
                                            md: "1vmax",
                                          },
                                        }}
                                        label="Past Mentoships"
                                        {...a11yProps(1)}
                                      />
                                    </Tabs>
                                    <Box sx={{ width: "100%" }}>
                                      <CustomTabPanel value={value} index={0}>
                                        {loading === false &&
                                            <>
                                              {connLoading === false && stuConLoad === false ? (
                                                isAuthenticated ? (<MenorInfoConnection
                                                  active={activeConnection}
                                                />):(stuAuth && (<MenorInfoConnection active={activeStuConnection}/>) )
                                              ) : (
                                                <Loader />
                                              )}
                                            </>
                                          }
                                      </CustomTabPanel>
                                      <CustomTabPanel value={value} index={1}>
                                      {loading === false &&
                                            <>
                                              {connLoading === false && stuConLoad === false ? (
                                                isAuthenticated ? (<MenorInfoConnection
                                                  active={closedConnection}
                                                />):(stuAuth && (<MenorInfoConnection active={closedStuConnection}/>) )
                                              ) : (
                                                <Loader />
                                              )}
                                            </>
                                          }
                                      </CustomTabPanel>
                                    </Box>
                                  </>
                                </Box>
                              </Fade>
                            </Modal>
                            <Box
                              sx={{
                                width: "95%",
                                m: "0 auto",
                                minHeight: "70vh",
                                display: "flex",
                                flexDirection: { xs: "column" },

                                bgcolor: "#e9e9e9",
                                borderRadius: "20px",
                                p: "10px",
                              }}
                            >
                              <Typography
                                component={"p"}
                                sx={{
                                  fontSize: {
                                    xs: "3vmax",
                                    md: "1.5vmax",
                                    textAlign: "center",
                                  },
                                  fontWeight: "600",
                                  m: "3vmax 0",
                                }}
                              >
                                Your Dashboard
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: { xs: "column", md: "row" },
                                  justifyContent: "space-around",
                                  alignItems: {
                                    xs: "center",
                                    md: "start",
                                    gap: "11px",
                                  },
                                }}
                              >
                                {stuAuth &&<Card
                                  onClick={() => setCompletion(true)}
                                  sx={{
                                    width: { xs: "80vw", md: "25vmax" },
                                    height: { xs: "25vmax", md: "15vmax" },
                                    borderRadius: "2vmax",
                                  }}
                                >
                                  <CardActionArea
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                      display: "flex",
                                    }}
                                  >
                                    <CardContent>
                                      <OutlinedFlagIcon
                                        sx={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          padding: {
                                            xs: "0.5vmax",
                                            md: "0.2vmax",
                                          },
                                          color: "white",
                                          width: {
                                            xs: "3vmax",
                                            sm: "2vmax",
                                            md: "1.8vmax",
                                          },
                                          height: {
                                            xs: "3vmax",
                                            sm: "2vmax",
                                            md: "1.8vmax",
                                          },
                                          fontSize: {
                                            xs: "3vmax",
                                            sm: "2vmax",
                                            md: "1.8vmax",
                                          },
                                          backgroundColor: "var(--button1)",

                                          borderRadius: "50%",
                                        }}
                                      />
                                      <Typography
                                        sx={{ fontSize: 20, fontWeight: 600 }}
                                        color="text.secondary"
                                        gutterBottom
                                      >
                                        Total Progress
                                      </Typography>
                                      <Typography variant="h3">
                                      {stuUser?.completion?.total || 0 + "%"|| <CircularProgress />}
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card> }
                                {isAuthenticated &&<Card
                                  onClick={() => setEarningModal(true)}
                                  sx={{
                                    width: { xs: "80vw", md: "25vmax" },
                                    height: { xs: "25vmax", md: "15vmax" },
                                    borderRadius: "2vmax",
                                  }}
                                >
                                  <CardActionArea
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                      display: "flex",
                                    }}
                                  >
                                    <CardContent>
                                      <CurrencyRupeeIcon
                                        sx={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          padding: {
                                            xs: "0.5vmax",
                                            md: "0.2vmax",
                                          },
                                          color: "white",
                                          width: {
                                            xs: "3vmax",
                                            sm: "2vmax",
                                            md: "1.8vmax",
                                          },
                                          height: {
                                            xs: "3vmax",
                                            sm: "2vmax",
                                            md: "1.8vmax",
                                          },
                                          fontSize: {
                                            xs: "3vmax",
                                            sm: "2vmax",
                                            md: "1.8vmax",
                                          },
                                          backgroundColor: "var(--button1)",

                                          borderRadius: "50%",
                                        }}
                                      />
                                      <Typography
                                        sx={{ fontSize: 20, fontWeight: 600 }}
                                        color="text.secondary"
                                        gutterBottom
                                      >
                                        Earningsss
                                      </Typography>
                                      <Typography variant="h3">
                                      &#8377;{(connectionLoad === false ? 
                                          Math.round(
                                            connection?.reduce(
                                              (total, current) => {
                                                return (
                                                  total +
                                                  (current?.price * 73) / 100
                                                );
                                              },
                                              0
                                            )
                                          ):<CircularProgress />) }
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card> }
                                <Card
                                  onClick={() => setModalConenction(true)}
                                  sx={{
                                    width: { xs: "80vw", md: "25vmax" },
                                    height: { xs: "25vmax", md: "15vmax" },
                                    borderRadius: "2vmax",
                                  }}
                                >
                                  <CardActionArea
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                      display: "flex",
                                    }}
                                  >
                                    <CardContent>
                                      <SyncAltIcon
                                        sx={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          padding: {
                                            xs: "0.5vmax",
                                            md: "0.2vmax",
                                          },
                                          color: "white",
                                          width: {
                                            xs: "3vmax",
                                            sm: "2vmax",
                                            md: "1.8vmax",
                                          },
                                          height: {
                                            xs: "3vmax",
                                            sm: "2vmax",
                                            md: "1.8vmax",
                                          },
                                          fontSize: {
                                            xs: "3vmax",
                                            sm: "2vmax",
                                            md: "1.8vmax",
                                          },
                                          backgroundColor: "blue",

                                          borderRadius: "50%",
                                        }}
                                      />
                                      <Typography
                                        sx={{ fontSize: 20, fontWeight: 600 }}
                                        color="text.secondary"
                                        gutterBottom
                                      >
                                        Connections
                                      </Typography>
                                      <Typography variant="h3">
                                        {(connectionLoad === false ? 
                                          <>{connection?.length}</>: (
                                            <CircularProgress />) 
                                        )}
                                        {(connectionLoad === false ? 
                                          <>{stuCon?.connection?.length}</>: (
                                            <CircularProgress />) 
                                        )}
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card>
                              </Box>
                              {/* <Card sx={{width:{xs:'38vmax'}}}>
                                <CardContent>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    Earning
                                    <CurrencyRupeeIcon />
                                    <Typography>
                                      {connectionLoad === false &&
                                        Math.round(
                                          connection?.reduce(
                                            (total, current) => {
                                              return (
                                                total +
                                                (current?.price * 73) / 100
                                              );
                                            },
                                            0
                                          )
                                        )}
                                    </Typography>
                                  </Box>
                                </CardContent>
                                <CardActions>
                                  <Button
                                    size="small"
                                    onClick={() => setEarningModal(true)}
                                  >
                                    Learn More
                                  </Button>
                                </CardActions>
                              </Card> */}
                              <Typography sx={{fontSize:{xs:"1.8vmax", md:'0.8vmax'}, textAlign:{xs:'center', md:'start'}, fontStyle:'italic', color:'var(--theme2)', mt:'1vmax', ml:{xs:0, md:'1.4vmax'}}}>More features will be added soon.-Team PrepSaarthi</Typography>
                            </Box>
                            <Box
                              ref={targetRef}
                              sx={{
                                width: "1000px",
                                position: "absolute",
                                top: "-1000vw",
                                display,
                              }}
                            >
                              <Typography
                                component={"p"}
                                sx={{
                                  width: "100%",
                                  textAlign: "center",
                                  fontWeight: 700,
                                  color: "var(--theme2)",
                                  fontSize: "20px",
                                }}
                              >
                                {user?.user?.name}'s Earning from PrepSaarthi
                              </Typography>
                              <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Mentee Name</TableCell>
                                      <TableCell align="right">
                                        Purchase Date(YYYY/MM/DD)
                                      </TableCell>
                                      <TableCell align="right">
                                        Mentorship Duration
                                      </TableCell>
                                      <TableCell align="right">
                                        (&#8377;)Subscription Price
                                      </TableCell>
                                      <TableCell align="right">
                                        (&#8377;)Platform Fee(27%)
                                      </TableCell>
                                      <TableCell align="right">
                                        (&#8377;)Earning
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {filteredConnection?.map((row, k) => (
                                      <TableRow
                                        key={k}
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell component="th" scope="row">
                                          {row?.studentDetails?.name}
                                        </TableCell>
                                        <TableCell align="right">
                                          {row?.boughtAt?.split("T")[0]}
                                        </TableCell>
                                        <TableCell align="right">
                                          {(new Date(row?.expiresIn) -
                                            new Date(row?.boughtAt)) /
                                            (1000 * 60 * 60 * 24) <
                                          10
                                            ? "Weekly"
                                            : "Monthly"}
                                        </TableCell>
                                        <TableCell align="right">
                                          {row?.price}
                                        </TableCell>
                                        <TableCell align="right">
                                          {((row?.price * 27) / 100)?.toFixed(
                                            1
                                          )}
                                        </TableCell>
                                        <TableCell align="right">
                                          {((row?.price * 73) / 100)?.toFixed(
                                            1
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                    <TableRow>
                                      <TableCell>Total Earning</TableCell>
                                      <TableCell />
                                      <TableCell />
                                      <TableCell />
                                      <TableCell />
                                      <TableCell align="right">
                                        {filteredConnection
                                          ?.reduce((total, current) => {
                                            return (
                                              total +
                                              (current?.price * 73) / 100
                                            );
                                          }, 0)
                                          ?.toFixed(1)}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <Box>
                               <Typography component={'p'} fontSize={'10px'} sx={{mt:'10px', ml:'5px'}}> Downloaded At:- {getCurrentDateTimeInIST()}</Typography>
                              </Box>
                            </Box>
                          </>
                        )}
                      </Box>
      
                    </Box>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          component="th"
          scope="row"
          sx={{ fontWeight: 800, color: "var(--theme2)" }}
        >
          {row?.studentDetails?.name}
        </TableCell>
        <TableCell align="right" sx={{ color: "green" }}>
          <strong>&#8377;{((row?.price * 73) / 100)?.toFixed(1)}</strong>
        </TableCell>
        {/* <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  component="div"
                  sx={{ fontWeight: 800 }}
                >
                  Date :- {row?.boughtAt?.split("T")[0]}
                </Typography>
              </Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Mentorship Price</TableCell>
                    <TableCell sx={{ color: "green" }}>
                      &#8377;{row?.price}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Platform Fee(27%)</TableCell>
                    <TableCell sx={{ color: "red" }}>
                      -&#8377;{((row?.price * 27) / 100)?.toFixed(1)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell sx={{ color: "green" }}>
                      <strong>
                        &#8377;{((row?.price * 73) / 100)?.toFixed(1)}
                      </strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                    <TableRow key={row?.price}>
                      <TableCell>{row?.price}</TableCell>
                      <TableCell component="th" scope="row">
                        {row?.boughtAt?.split("T")[0]}
                      </TableCell>
                       <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    Mentee: PropTypes.string.isRequired,
    Earning: PropTypes.number.isRequired,
    Deatails: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Mentor;
