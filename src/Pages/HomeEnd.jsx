import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./homeend.css";

const HomeEnd = () => {
  const [answer, setAnswer] = useState(false);
  const [index, setIndex] = useState(-1);
  const [cssClass, setClass] = useState("");
  const [buttonBG, setBG] = useState("");
  const [animatePage, setAnimatePage] = useState(false);

  // Trigger animation when the page loads
  useEffect(() => {
    setTimeout(() => setAnimatePage(true), 200); // Delayed animation start
  }, []);

  const toggleAnswer = (i) => {
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
      question: "What is PrepSaarthi?",
      answer:
        "PrepSaarthi is a platform that provides opportunities for aspiring individuals to choose their mentors...",
    },
    {
      question: "What services do PrepSaarthi provide?",
      answer:
        "PrepSaarthi is a platform that connects a student with his mentor...",
    },
    {
      question: "How do we select mentors (Saarthi)?",
      answer:
        "The mentors listed on the website have been carefully selected through various steps...",
    },
    {
      question: "Is there any Refund Policy?",
      answer: "No, There's no Refund Policy.",
    },
    {
      question: "Who can join PrepSaarthi?",
      answer:
        "PrepSaarthi is exclusively designed for aspirants preparing for the IIT JEE exam...",
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={animatePage ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="_home-end"
    >
      <h2 className="_home-middle-heading" id="_faq-end">
        FAQs
      </h2>
      <div className="_home-end-faq">
        {faq.map((item, i) => {
          const isOpen = answer && index === i;
          return (
            <motion.div
              key={i}
              initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={animatePage ? { x: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 * i,
                ease: "easeOut",
              }}
              className={
                isOpen
                  ? i % 2 === 0
                    ? "_faq-align-start toggleHeightI"
                    : "_faq-align-end toggleHeight"
                  : i % 2 === 0
                  ? "_faq-align-start"
                  : "_faq-align-end"
              }
              onClick={() => toggleAnswer(i)}
            >
              <div>
                <span>{item.question}</span>
                <span>
                  <AddIcon />
                </span>
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={isOpen ? { height: "auto", opacity: 1 } : {}}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="_faq-answer"
              >
                <span>{item.answer}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="_homeend-two">
        <h2 className="_home-middle-heading">More Questions?</h2>
        <p className="_more-doubts">Don't worry, we are here 😊</p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={animatePage ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`_more-question ${cssClass}`}
        >
          <Button
            className={`askus_button ${buttonBG}`}
            variant="contained"
            onMouseEnter={() => handleBackground("_containerBG", "_buttonBG")}
            onMouseLeave={() => handleBackground("", "")}
            startIcon={<WhatsAppIcon sx={{ fontSize: "2vmax !important" }} />}
            onClick={openWhatsapp}
          >
            Let's Clear Your Doubts
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeEnd;
