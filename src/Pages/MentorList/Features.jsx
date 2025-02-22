import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

const Features = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "2rem 1rem",
        color: "#333",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          maxWidth: "1000px",
          margin: "1rem auto",
          textAlign: "center",
          marginBottom: "5rem",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}
        >
          Why Join Our Mentorship Program?
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}
        >
          Our mentorship program is designed to provide students with a
          structured learning path, continuous guidance, and personalized
          support. Whether you are enrolled in a coaching institute or doing
          self-study, our mentors will help you navigate your preparation
          journey effectively. We ensure that every student receives the best
          possible mentorship to maximize their potential and achieve their
          goals. Here’s what you can expect from the program:
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}
        >
          Our program goes beyond just academic support—it fosters discipline,
          time management, and a strategic approach to learning. By following a
          well-defined study plan, students can enhance their conceptual
          understanding, minimize distractions, and maintain a steady
          progression towards their goals. Our mentors also provide motivation
          and accountability, ensuring that students remain focused and
          committed to their journey. With regular assessments and feedback,
          every student can identify their strengths and work on areas that
          require improvement, leading to a more efficient and effective
          preparation experience.
        </Typography>
      </Box>

      {/* Goal-Oriented Weekly Planning Section */}
      <Box sx={{ maxWidth: "1500px", paddingLeft: "2rem", textAlign: "left" }}>
      {/* 1. Goal-Oriented Weekly Planning */}
      <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
        1. Goal-Oriented Weekly Planning
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
        • Each student will receive a structured weekly target tailored to their academic needs, ensuring that they have a clear direction to follow.
        <br />• The mentor will meticulously monitor progress on a daily basis, ensuring students stay on track and identify areas that need improvement.
        <br />• Personalized guidance will be provided to help students overcome challenges, refine their study techniques, and stay motivated throughout their learning journey.
        <br />• Regular reviews will be conducted to assess performance and make necessary adjustments to the study plan, ensuring continuous growth and learning.
      </Typography>

      {/* 2. Daily One-on-One Mentorship Sessions */}
      <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
        2. Daily One-on-One Mentorship Sessions
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
        • Students will have the opportunity to interact with their mentors every day through Google Meet, allowing them to clarify doubts and stay motivated.
        <br />• These daily sessions ensure that students receive consistent guidance, structured learning, and immediate solutions to their queries.
        <br />• Mentors will track student progress in real-time and make necessary adjustments to study plans based on student performance and feedback.
        <br />• The one-on-one interaction creates a strong mentor-student bond, ensuring students feel comfortable sharing their concerns and seeking personalized advice.
      </Typography>

      {/* 3. Weekly Progress Reports for Parents */}
      <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
        3. Weekly Progress Reports for Parents
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
        • Every week, a detailed Google Meet session will be held with parents to discuss the student’s academic growth, strengths, weaknesses, and areas requiring improvement.
        <br />• Parents can actively participate and provide their own insights, enabling them to support their child’s learning journey more effectively.
        <br />• Mentors will also share study strategies with parents so they can encourage their children and ensure a conducive learning environment at home.
      </Typography>

      {/* 4. Personalized Attention with Small Mentor Groups */}
      <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
        4. Personalized Attention with Small Mentor Groups
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
        • Each mentor will be assigned only 3-5 mentees, ensuring focused attention and personalized study plans.
        <br />• With fewer mentees, mentors can spend more time on individual progress tracking, providing in-depth explanations, and addressing specific concerns.
        <br />• This setup helps create a close-knit learning community where students receive tailored support based on their academic needs.
        <br />• Mentors can dedicate more time to solving doubts, providing constructive feedback, and helping students build effective study habits.
      </Typography>

      {/* 5. Peer Networking and Collaborative Learning */}
      <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
        5. Peer Networking and Collaborative Learning
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
        • If a mentor has multiple mentees, students will have the opportunity to interact, collaborate, and build strong peer networks.
        <br />• A friendly and competitive atmosphere is cultivated, helping students develop critical thinking and problem-solving skills through peer discussions.
        <br />• Group study sessions and collaborative projects will be encouraged to enhance teamwork and shared learning experiences.
        <br />• Engaging discussions and study groups allow students to gain different perspectives on various topics and improve their conceptual understanding.
      </Typography>

      {/* 6. Real-Life College Insights for Motivation */}
      <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
        6. Real-Life College Insights for Motivation
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
        • Mentors will share their personal experiences from college life to inspire students, giving them a clear idea of what to expect in higher education.
        <br />• Insights into academic challenges, extracurricular activities, and career-building opportunities will be discussed to help students make informed decisions.
        <br />• Mentors will also guide students on how to balance academics with social life, internships, and skill-building activities.
        <br />• Real-world examples and experiences will help students stay motivated and set clear career goals for their future endeavors.
      </Typography>

      {/* 7. Proven Preparation Strategies from Mentors */}
      <Typography variant="h4" sx={{ color: "#3A5AFF", fontWeight: "bold", mb: 2 }}>
        7. Proven Preparation Strategies from Mentors
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.8", mb: 4 }}>
        • Each mentor will share their personal journey of how they prepared for competitive exams, providing students with effective strategies that actually work.
        <br />• Students will receive tried-and-tested study plans, practical tips, and learning techniques that have helped mentors achieve academic success.
        <br />• Detailed insights into time management, revision techniques, and question-solving strategies will be shared to help students optimize their preparation.
        <br />• Mentors will also recommend the best resources, including books, online lectures, and mock tests, ensuring students have access to high-quality study materials.
      </Typography>
    </Box>
    </Box>
  );
};

export default Features;
