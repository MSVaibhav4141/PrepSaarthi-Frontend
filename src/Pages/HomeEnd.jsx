import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./homeend.css";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
const HomeEnd = () => {
  const [answer, setAnswer] = useState(false);
  const [index, setIndex] = useState(-1);
  const [cssClass, setClass] = useState("");
  const [buttonBG, setBG] = useState("");

  const toggleAnwser = (i) => {
    if (index !== i) {
      setAnswer(true);
    } else {
      setAnswer((prev) => !prev);
    }
    setIndex(i);
  };

  const handleBackground = (cont, butt) => {
    setClass(cont);
    setBG(butt);
  };

  const faq = [
    {
      question: "What is PrepSaarthi ?",
      answer:
        " PrepSaarthi is a platform that provides opportunities for aspiring individuals to choose their mentors. The selected mentor will be available to the aspirants as a friend, providing emotional and mental support throughout their preparation journey. The mentor has already qualified the exam for which the aspirant is preparing, and will provide secret insights and help throughout the journey.",
    },
    {
      question: "What services do PrepSaarthi provide?",
      answer:
        "PrepSaarthi is a platform that connects a student with his mentor. The mentor will assist the aspirant like a big brother throughout his preparation journey for IIT JEE.",
    },
    {
      question: "How do we select mentors(Saarthi)?",
      answer:
        "The mentors listed on the website have been carefully selected through various steps. First, they went through a screening round. We thoroughly analyzed their profiles and then conducted a workshop, personally guided by Ayush Tiwari. After proper refining steps, these mentors are now available for you.",
    },
    {
      question: "Is there any Refund Policy?",
      answer: "No, There's no Refund Policy",
    },
    {
      question: "Who can join PrepSaarthi?",
      answer:
        "PrepSaarthi is exclusively designed for aspirants preparing for the IIT JEE exam through online mode.PrepSaarthi ensures a supportive environment for students preparing via online mode.Students opting for offline mode can also join to overcome challenges in their offline classes.Thus, PrepSaarthi caters to the needs of both online and offline students.",
    },
  ];

  const openWhatsapp = () => {
    const phoneNumber = "+91 9336254473";
    const message = "Hello! I want to resolve some doubts";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      <div className="_home-end">
        <h2 className="_home-middle-heading" id="_faq-end">
          FAQs
        </h2>
        <div className="_home-end-faq">
          {faq.map((item, i) => {
            if (i % 2 === 0) {
              return (
                  <div
                    key={i}
                    className={
                      answer && index === i
                        ? "_faq-align-start toggleHeightI"
                        : "_faq-align-start"
                    }
                    onClick={() => {
                      toggleAnwser(i);
                    }}
                   
                  >
                    <div>
                      <span>{item.question}</span>
                      <span>
                        <AddIcon />
                      </span>
                    </div>
                    <div className={answer && index === i ? "_faq-answer" : ""}>
                      <span>{item.answer}</span>
                    </div>
                  </div>
              );
            } else {
              return (
                  <div
                    key={i}
                    className={
                      answer && index === i
                        ? (i === 3 ? "_faq-align-end toggleHeight _policy-height" : "_faq-align-end toggleHeight")
                        : "_faq-align-end"
                    }
                    onClick={() => {
                      toggleAnwser(i);
                    }}
                    
                  >
                    <div>
                      <span>{item.question}</span>
                      <span>
                        <AddIcon />
                      </span>
                    </div>
                    <div className={answer && index === i ? "_faq-answer" : ""}>
                      <span>{item.answer}</span>
                    </div>
                  </div>
              );
            }
          })}
        </div>
        <div className="_homeend-two">
          <h2 className="_home-middle-heading">More Questions?</h2>
          <p className="_more-doubts">Dont worry we are here &#128522;</p>
          <div className={`_more-question  ${cssClass}`}>
            <Button
              className={`askus_button ${buttonBG}`}
              variant="contained"
              onMouseEnter={() => handleBackground("_containerBG", "_buttonBG")}
              onMouseLeave={() => handleBackground("", "")}
              startIcon={<WhatsAppIcon sx={{ fontSize: "2vmax !important" }} />}
              // sx={{width:'100%'}}
              onClick={openWhatsapp}
            >
              Lets Clear Your Doubt
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeEnd;
