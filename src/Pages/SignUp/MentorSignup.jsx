import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { clearError, otpReset, resendOTP, reset, sendOTP, signUpMentor } from "../../action/userAction";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import MetaData from "../../utils/Metadata";
import imageCompression from "browser-image-compression";
import "./success.css";
const defaultTheme = createTheme();

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

export default function MentorSignUp() {
  const navigate = useNavigate();
  const [mentorInfo, setMentorInfo] = React.useState({});
  const [avatarPrview, setAvatarPreview] = React.useState(
    "/images/profile.png"
  );
  const [avatar, setAvatar] = React.useState("");
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.mentor);
  const {
    error: otpError,
    loading: otpLoading,
    success: otpSuccess,
    sent
  } = useSelector((state) => state.newOTPsend);
  const {
    loading: reLoading,
    success: reSuccess,
    error: reError,
  } = useSelector((state) => state.resendOtherOTP);

  React.useEffect(() => {
    if(reSuccess){
      toast.success("OTP has been resent")
      dispatch(reset())
    }
    if(reError){
      toast.error(reError.message)
      dispatch(clearError())
    }
  }, [dispatch, reSuccess, reError])
  const handleSubmit = (event) => {
    event.preventDefault();
    const mentorInformation = new FormData();

    mentorInformation.set("name", mentorInfo.name);
    mentorInformation.set("email", mentorInfo.email);
    mentorInformation.set("mobileNumber", mentorInfo.phoneNo);
    mentorInformation.set("password", mentorInfo.password);
    mentorInformation.set("collegeName", mentorInfo.college);
    mentorInformation.set("emailOTP", mentorInfo.emailOTP);
    mentorInformation.set("numberOTP", mentorInfo.numberOTP);
    mentorInformation.set("avatar", avatar);

    const serializedData = {};
    mentorInformation.forEach((value, key) => {
      serializedData[key] = value;
    });
    dispatch(signUpMentor(serializedData));
  };

  const [prgress, setProgress] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [uploading, setuploading] = React.useState(false);
  
  React.useEffect(() => {
    dispatch(reset())
  }, [dispatch])
  React.useEffect(() => {
    if(otpSuccess){
      toast.success("OTP has been sent to your submitted email and mobile number")
      dispatch(reset())
    }
    if(otpError){
      toast.error(otpError.message)
      dispatch(clearError())
    }
  }, [dispatch, otpError, otpSuccess])
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
  const handleChange = async (event) => {
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
      // if (fileSizeMB > 3) {
      //   // Compression options
      //   const options = {
      //     maxSizeMB: 2, // Maximum size in MB
      //     maxWidthOrHeight: 1920, // Maximum width or height
      //     useWebWorker: true, // Use web worker
      //     maxIteration: 10, // Maximum number of iterations
      //     exifOrientation: undefined, // Preserve EXIF orientation
      //     fileType: 'image/jpeg', // Output file type
      //     initialQuality: 0.8, // Initial quality
      //   };

      //   try {
      //     console.log('start compressing')
      //     const compressedImage = await imageCompression(files, options);
      //     console.log('compressing done')
      //     const fileToUpload = compressedImage;
      //     const fileSizeMBC = fileToUpload.size/ 1024 / 1024;
      //     console.log(fileSizeMBC)
      //     const base64 = await convertBase64(fileToUpload);
      //     setAvatar(base64);
      //     setAvatarPreview(base64);
      //     return;
      //   } catch (error) {
      //     console.error("Error during image compression:", error);
      //   }
      // }
      // if (files.length === 1) {
      //   const base64 = await convertBase64(files[0]);
      //   setAvatar(base64);
      //   setAvatarPreview(base64);
      //   return;
      // }
    } else {
      setMentorInfo({ ...mentorInfo, [event.target.name]: event.target.value });
    }
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(otpReset())
      dispatch(clearError());
    }
    if (user) {
      dispatch(otpReset())
      navigate("/verify/account");
    }
  }, [dispatch, error, navigate, user]);
  return (
    <>
      <MetaData title="Sign Up Mentor" />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: "2.5vmax",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pb: "2.5vmax",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="mentorName"
                    label="Your Name"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    disabled={sent}
                    type="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="college"
                    label="College"
                    name="college"
                    autoComplete="college"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNo"
                    disabled={sent}
                    label="Mobile Number"
                    name="phoneNo"
                    autoComplete="number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        position: "relative",
                        width: "50px",
                        height: "50px",
                      }}
                    >
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
                        style={
                          success ? { display: "block" } : { display: "none" }
                        }
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
                        width="30px"
                        height="30px"
                        sx={{
                          aspectRatio: "1/1",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          borderRadius: "50%",
                        }}
                        mr="10px"
                      ></Box>
                    </Box>

                    <Button variant="contained" component="label">
                      Upload Your Photo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        name="avatar"
                        onChange={handleChange}
                      />
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    loading={otpLoading}
                    onClick={() => {
                      dispatch(
                        sendOTP({
                          email: mentorInfo.email,
                          mobileNumber: mentorInfo.phoneNo,
                        })
                      );
                    }}
                    fullWidth
                    sx={!sent ? {
                      display:'block',
                      mt: 3,
                      mb: 2,
                      color:'white',
                      p: "0.8vmax 0",
                      fontSize: { xs: "2.3vmax", md: "2vmax", lg: "1.1vmax" },
                      bgcolor: "var(--button1)",
                      "&:hover": { backgroundColor: "var(--button1Hover)" },
                    } : {display:"none"}}
                  >
                   Sign Up
                  </LoadingButton>
                </Grid>
                <Grid item xs={12} sx={sent ? {display:'block'} : {display:'none'}}>
                  <TextField
                    required
                    fullWidth
                    id="emailOTP"
                    label="Email Verification Code"
                    name="emailOTP"
                    autoComplete="emailOTP"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sx={sent ? {display:'block'} : {display:'none'}}>
                  <TextField
                    required
                    fullWidth
                    id="numberOTP"
                    label="Mobile Number Verification Code"
                    name="numberOTP"
                    autoComplete="numberOTP"
                    onChange={handleChange}
                  />
                  <LoadingButton 
                  loading={reLoading}
                  onClick={() => {
                    dispatch(resendOTP({email: mentorInfo.email,
                      mobileNumber: mentorInfo.phoneNo}))
                  }}>Resend OTP</LoadingButton>
                </Grid>
                <Grid item xs={12} sx={sent ? {display:'block'} : {display:'none'}}>
                  <Typography variant="p">
                    By signing up you are agreeing to our{" "}
                    <Link style={{ textDecoration: "underline" }} to="/privacy">
                      Privacy & Policy
                    </Link>
                  </Typography>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                disabled={uploading}
                sx={{
                  mt: 3,
                  mb: 2,
                  p: "0.8vmax 0",
                  fontSize: { xs: "2.3vmax", md: "2vmax", lg: "1.1vmax" },
                  bgcolor: "var(--button1)",
                  "&:hover": { backgroundColor: "var(--button1Hover)" },
                }}
              >
                Sign Up
              </LoadingButton>
                </Grid>

              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2" component={ReactLink}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
