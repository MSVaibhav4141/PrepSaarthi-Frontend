import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "@mui/material";
import "./homemiddle.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getMentorList } from "../action/metorListAction";

const HomeMiddle = () => {
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width:850px)");
  const { user } = useSelector((state) => state.mentorList);

   

  React.useEffect(() => {
    dispatch(getMentorList());
  }, [dispatch]);
  const unsortedMentor = Array.isArray(user?.users) ? user.users : [];
  const mentors = [...unsortedMentor]
    .sort((a, b) => b.ratings - a.ratings)
    .slice(0, 4);

  const services = [
    {
      img: "https://www.exprto.com/images/1on1meetings.png",
      serviceName: "1:1 Discussions With The Mentors",
    },
    {
      img: "https://www.exprto.com/images/Guidance.jpeg",
      serviceName: "Steps to organize your daily activities",
    },
    {
      img: "https://www.exprto.com/images/pic-6.jpg",
      serviceName:
        "Continuous tracking of progress and making strategies of it",
    },
    {
      img: "https://www.exprto.com/images/grp-1.webp",
      serviceName: "Interactive Group/Team Sessions",
    },
    {
      img: "https://www.exprto.com/images/Individual.jpeg",
      serviceName: "Individual Guidance to Students",
    },
    {
      img: "https://www.exprto.com/images/timemanagement1.png",
      serviceName: "Secret Tips and Tricks by your selected Saarthi",
    },
    // {
    //   img: "https://www.exprto.com/images/Evaluationin.jpg",
    //   serviceName: "Continuous Evaluation of Progress",
    // },
    //
    //   img: "https://www.exprto.com/images/retention.png",
    //   serviceName: "Building Retention Skills for You",
    // },
  ];
  const steps = [
    {
      img: "/images/card1.png",
      serviceName: "Register/Login to get started",
    },
    {
      img: "/images/card2.png",
      serviceName: "Select your mentor",
    },
    {
      img: "/images/card3.png",
      serviceName: "Make a payment",
      // description: "Choose a payment method and click Pay Now",
    },
    {
      img: "/images/card4.png",
      serviceName: "Connect to your mentor",
      // description: "Choose a payment method and click Pay Now",
    },
  ];
  return (
    <>
      <div className="_home-middle">
        <h2 className="_home-middle-heading">Mentors</h2>
        <div className="_mentor-swiper">
          <Swiper
            slidesPerView={window.innerWidth <= 850 ? 1 : 2}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            autoplay={true}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {mentors?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="_mentor-card" key={index}>
                  <div className="_home-miidle-mentor-info">
                    <h2>{item?.name}</h2>
                    <p>
                      AIR - {item?.exam?.rank} 
                      {item.exam?.name === "jeemains" && (
                              <span> (JEE MAINS)</span>
                            )}
                            {item.exam?.name === "jeeadv" && (
                              <span> (JEE ADV)</span>
                            )}
                            {item.exam?.name === "bitsat" && (
                              <span> (BITSAT)</span>
                            )}
                    </p>
                    <p>
                      {item?.collegeName} {item?.branch}
                    </p>
                    <Link to={`/mentors/${item?._id}`}>See more...</Link>
                  </div>
                  <div className="_home-miidle-mentor-img">
                    <img src={item?.avatar?.public_URI} alt={item?.name} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <h2 className="_home-middle-heading">How do we work?</h2>
        <div className="_how-work" >
          {services.map((item, i) => (
            <Card
              key={i}
              raised={true}
              sx={{
                height: isSmallScreen ? 200 : 330,
                width: "95%",
                borderRadius: "1.5vmax",
                
              }}
              data-aos="zoom-in"
            >
              <CardActionArea
                sx={{
                  padding: "1.2vmax",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.img}
                  alt="green iguana"
                  sx={{
                    height: isSmallScreen ? 130 : 200,
                    borderRadius: "1vmax",
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ padding: 0, mt: "1vmax" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    textAlign="start"
                    sx={{
                      fontSize: isSmallScreen ? "1.7vmax" : "1.2vmax",
                      textAlign: isSmallScreen ? "center" : "start",
                      fontWeight: "600",
                    }}
                  >
                    {item.serviceName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
        <h2 className="_home-middle-heading">How to get started?</h2>
        <div className="_how-work _how-work2">
          {steps.map((item, i) => (
            <Card
              key={i}
              raised={true}
              sx={{
                height: isSmallScreen ? 200 : 330,
                width: "95%",
                borderRadius: "1.5vmax",
              }}
              data-aos="zoom-in"
            >
              <CardActionArea
                sx={{
                  padding: "1.2vmax",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.img}
                  alt="green iguana"
                  sx={{
                    height: isSmallScreen ? 130 : 200,
                    borderRadius: "1vmax",
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ padding: 0, mt: "1vmax" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    textAlign="start"
                    sx={{
                      fontSize: isSmallScreen ? "1.7vmax" : "1.2vmax",
                      textAlign: isSmallScreen ? "center" : "start",
                      fontWeight: "600",
                    }}
                  >
                    {item.serviceName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeMiddle;
