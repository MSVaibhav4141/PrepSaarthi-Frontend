import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./logoMobile.png";
import { clearError } from "../../action/userAction";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  paymentInitator,
  // paymentInitatorSub,
  reset,
} from "../../action/paymentAction";
import MetaData from "../../utils/Metadata";
import SplitButton from "../../Components/SplitButton/SplitButton";
const  ConfirmMentorShipPayment = ({ item, sub, stu }) => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const {
    loading,
    order,
    duration,
    error: paymentError,
  } = useSelector((state) => state.paymentReducer);
  const {
    loading: sloading,
    // subscriptionId,
    // error: subscriptionError,
  } = useSelector((state) => state.subscriptionReducer);

  const handlePayment = (amount, duration) => {
    dispatch(paymentInitator({amount, duration}));
  };

  // const handlePaymentSub = (totalPrice) => {
  //   dispatch(paymentInitatorSub(totalPrice));
  // };

  // useEffect(() => {
  //   if (subscriptionError) {
  //     toast.error(subscriptionError.message);
  //     dispatch(clearError());
  //   }
  //   if (subscriptionId) {
  //     const openPaymentGateway = () => {
  //       var options = {
  //         key: "rzp_test_G0c8c3HClLntUO",
  //         amount: sub.price,
  //         currency: "INR",
  //         name: "PrepSaarthi",
  //         description:
  //           "Get access to india's top IITians mentorship with few clicks",
  //         image: Logo,
  //         subscription_id: subscriptionId,
  //         callback_url: `${process.env.VITE_API_URL}/v1/paymentVerification/subscription?id=${item.id}&price=${sub.price}`,
  //         prefill: {
  //           name: stu.name,
  //           email: stu.email,
  //           contact: stu.mobileNumber,
  //         },
  //         notes: {
  //           address: "Prepsaarthi at  Prepsaarthi.com",
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };
  //       const razor = new window.Razorpay(options);
  //       razor.open();

  //       dispatch(reset());
  //     };
  //     openPaymentGateway();
  //   }
  // }, [
  //   dispatch,
  //   subscriptionError,
  //   sloading,
  //   subscriptionId,
  //   stu?.name,
  //   stu?.email,
  //   item.id,
  //   stu.mobileNumber,
  //   sub.price,
  // ]);
  
  useEffect(() => {
    if (paymentError) {
      toast.error(paymentError.message);
      dispatch(clearError());
    }
    if (loading === false) {
      var options = {
        key: process.env.RAZORPAY_ID,
        amount: sub.price,
        currency: "INR",
        name: "PrepSaarthi",
        description: `Subscrption for ${item.name}'s mentorship`,
        image: Logo,
        order_id: order.id,
        callback_url: `${import.meta.env.VITE_API_URL}/v1/paymentVerification?id=${item.id}&price=${sub.price}&duration=${duration}`,
        prefill: {
           name: stu.name,
            email: stu.email,
            contact: stu.mobileNumber,
        },
        notes: {
          address: "Razorpay Corporate OfficeB606 Luxuria Estate, Aditya World City NH9 , Ghaziabad-201002, India",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();

      dispatch(reset());
    }
  }, [dispatch, loading, paymentError, order, item?.id, sub?.price, duration, item?.name, stu?.email,stu?.mobileNumber,stu?.name]);
  return (
    <>
        <MetaData title="Confirm Your Mentorship" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box textAlign={"center"}>
          <Typography sx={{ fontWeight: 600, fontSize: "2vmax" }}>
            Thanks for choosing us !
          </Typography>
          <Typography>Your mentorship plan is for a {sub.type === 'daily' ? 'week' : 'month'}</Typography>
        </Box>
        <Box>
          <Grid
            item
            xs={12}
            sx={{ width: { xs: "40vmax", md: "30vmax" } }}
            p="1vmax"
          >
            <Card
              sx={{
                display: "flex",
                width: { xs: "100%", md: "95%" },
                borderRadius: "1vmax",
                boxShadow: "-1px 1px 14px -5px rgba(0,0,0,0.4)",
                alignItems: "center",
                margin: "0 auto",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: 100, sm: 120, md: 150 },
                  height: { xs: 100, sm: 120, md: 150 },
                  p: "1vmax",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                image={item?.avatar?.public_URI}
                alt={item?.name}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography
                    component="p"
                    variant="p"
                    sx={{
                      fontSize: { xs: "2.2vmax", md: "1.2vmax" },
                      fontWeight: 600,
                    }}
                  >
                    {item?.name}
                  </Typography>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    component="p"
                    sx={{
                      fontSize: { xs: "1.8vmax", md: "1vmax" },
                      fontWeight: 500,
                    }}
                  >
                    {item?.collegeName}({item?.branch})
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{
                      fontSize: { xs: "1.8vmax", md: "1vmax" },
                      fontWeight: 500,
                    }}
                  >
                    {item?.exam?.name === "jeemains" && (
                      <span>JEE MAINS({item?.exam?.rank})</span>
                    )}
                    {item?.exam?.name === "jeeadv" && (
                      <span>JEE ADV({item?.exam?.rank})</span>
                    )}
                    {item?.exam?.name === "bitsat" && (
                      <span>BITSAT({item?.exam?.rank})</span>
                    )}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{
                      fontSize: { xs: "1.8vmax", md: "1vmax" },
                      fontWeight: 500,
                    }}
                  >
                    Current Year : {item?.yearOfStudy}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pl: 1,
                    pb: 1,
                  }}
                ></Box>
              </Box>
            </Card>
          </Grid>
        </Box>
        <Box sx={{ width: { xs: "38vmax", md: "28vmax" }, p: "1vmax" }}>
  <Typography textAlign="end">Total: {sub.price}</Typography>
  {sub.type === "1month" ? (
    <LoadingButton
      loading={loading}
      sx={{ width: { xs: "36vmax", md: "26vmax" }, p: "1vmax" }}
      variant="contained"
      onClick={() => handlePayment(sub.price, 'month')}
    >
      Pay {sub.price}
    </LoadingButton>
  ) : sub.type === "3month" ? (
    <LoadingButton
      loading={loading}
      sx={{ width: { xs: "36vmax", md: "26vmax" }, p: "1vmax" }}
      variant="contained"
      onClick={() => handlePayment(sub.price, '3month')}
    >
      Pay {sub.price}
    </LoadingButton>
  ) : (
    <LoadingButton
      loading={loading}
      sx={{ width: { xs: "36vmax", md: "26vmax" }, p: "1vmax" }}
      variant="contained"
      onClick={() => handlePayment(sub.price, '6month')}
    >
      Pay {sub.price}
    </LoadingButton>
  )}
</Box>


      
      </Box>
    </>
  );
};

export default ConfirmMentorShipPayment;
