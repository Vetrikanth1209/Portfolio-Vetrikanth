import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./contact.css";
import { Player } from "@lottiefiles/react-lottie-player";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Project from "./project";
import emailjs from "emailjs-com";


const App = () => {
  const [shuffledText, setShuffledText] = useState("VETRIKANTH");
  const originalText = "VETRIKANTH";

  const shuffleText = (text) => {
    let array = text.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  };

  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setShuffledText((prevText) =>
        prevText === originalText ? shuffleText(originalText) : originalText
      );
    }, 1000);

    return () => clearInterval(shuffleInterval);
  }, []);

  useEffect(() => {
    const aboutContainer = document.querySelector(".about-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            aboutContainer.style.opacity = 1;
            aboutContainer.style.transform = "scale(1)";
          } else {
            aboutContainer.style.opacity = 0; // Reset opacity when out of view
            aboutContainer.style.transform = "scale(0.5)"; // Reset scale when out of view
          }
        });
      },
      { threshold: 0.3 } // 40% of the element is visible
    );

    observer.observe(aboutContainer);

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  useEffect(() => {
    const skillCards = document.querySelectorAll(".total-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const isSmallScreen = window.innerWidth <= 480; // Check if the screen size is small

            if (isSmallScreen) {
              // For small screens, apply the small screen animation
              entry.target.style.opacity = 1;
              entry.target.style.transform = "scale(1)";
              entry.target.style.transition =
                "opacity 1s ease-in-out, transform 1s ease-in-out"; // Ensure transition is applied
            } else {
              // For large screens, apply the large screen animation
              entry.target.classList.add("animate"); // Add animation class for large screen
              entry.target.style.opacity = 1; // Make it visible
            }
          } else {
            // Reset styles when out of view
            entry.target.style.opacity = 0; // Reset opacity when out of view
            entry.target.style.transform = "scale(1)"; // Reset scale when out of view
            entry.target.classList.remove("animate"); // Remove animation class for large screens
          }
        });
      },
      { threshold: 0.4 } // 20% of the element is visible
    );

    skillCards.forEach((card) => observer.observe(card));

    return () => {
      skillCards.forEach((card) => observer.unobserve(card)); // Cleanup observer
    };
  }, []);

  const [users, setUsers] = useState({
    username: "",
    email: "",
    notes: "",
  });

  const collect = (eve) => {
    const { name, value } = eve.target;
    setUsers((old) => ({
      ...old,
      [name]: value,
    }));
  };

  // const sub = async () => {
  //   alert(`Username: ${users.username}\nEmail: ${users.email}\nNotes: ${users.notes}`);
  // };

  const sub = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const templateParams = {
      username: users.username,
      email: users.email,
      notes: users.notes,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
      (result) => {
        console.log(result.text);
        alert("Message Sent Successfully");
        clearFields();
      },
      (error) => {
        console.log(error.text);
        alert("Something went wrong!");
      }
    );
  };

  const clearFields = () => {
    setUsers({
      username: "",
      email: "",
      notes: "",
    });
  };

  const validateForm = () => {
    const { username, email, notes } = users;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!username) {
      alert("Please enter a username.");
      return false;
    }
    if (!email) {
      alert("Please enter an email.");
      return false;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!notes) {
      alert("Please enter your notes.");
      return false;
    }
    return true;
  };
  
  const SERVICE_ID = "service_8n7c5j6";
  const TEMPLATE_ID = "template_2go8ay6";
  const PUBLIC_KEY = "eamMW8-inNNUfW39G";

  return (
    <div
      style={{ margin: 0, padding: 0, minHeight: "100vh", overflowY: "auto" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap');
        @import
        url('https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Dots:wght@400..700&family=Inconsolata:wght@200..900&display=swap');
      </style>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&display=swap');
      </style>

      <div
        style={{
          backgroundColor: "rgb(6, 19, 32)",
          width: "100vw",
          height: "80px",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
       
      >
        <div
          style={{
            color: "#8B60C1",
            fontSize: "24px",
            fontWeight: "bold",
            marginLeft: "20%",
          }}
        >
          {shuffledText}
        </div>
        <div style={{ marginRight: "30%", color: "#8B60C1" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-file-code-fill"
            viewBox="0 0 16 16"
          >
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708zm2.708 0 2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 1 1 .708-.708" />
          </svg>
        </div>
      </div>

      {/* New scrollable content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
        }}
         id="home"
      >
        <img
          loading="lazy"
          src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/wpegmqw3olb74a4p3zbx"
          alt="img"
          style={{
            borderRadius: "50%",
            width: "150px",
            height: "auto",
            marginBottom: "10px",
            border: "5px solid #8B60C1",
          }}
        />
        <div
          className="responsive-text-container"
          style={{ color: "#8B60C1", marginTop: "20px", marginLeft: "100px" }}
        >
          <div class="typewriter">
            <h1>&lt; Hello, I'm Vetri. &gt;</h1>
            <h1>&lt; Developer, Designer, Mentor. &gt;</h1>
            <h1>&lt; Empowering Ideas through Code! &gt;</h1>
            <h1>&lt; Let's Code Something Amazing! &gt;</h1>
          </div>
        </div>
        <Player
          src="https://lottie.host/b6c074cc-b8c9-42d5-a4b6-2c5a3bb11dc7/ammF8XMERb.json"
          background="transparent"
          speed={1}
          style={{ width: "300px", height: "300px", marginTop: "-50px" }}
          loop
          autoplay
        />
      </div>

      {/* <Fab
        variant="extended"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "340px",
          height: "55px",
          backgroundColor: "#8B60C1",
          opacity: 0.4,
          borderRadius: "25px",
        }}
        aria-label="add"
      >
        <div className="fab-icons">
          <div className="fab-icon">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
            </svg>
          </div>
          <div className="fab-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
          </div>
          <div className="fab-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
            </svg>
          </div>
        </div>
      </Fab> */}

      <div
        style={{ marginTop: "2%", height: "100vh", width: "100vw" }}
        className="about-container" // Corrected spelling
      >
        <div>
          <h5 style={{ textAlign: "center", color: "gray" }}>My Intro</h5>
          <h3
            style={{
              textAlign: "center",
              color: "#8B60C1",
              fontFamily: "Protest Strike",
            }}
          >
            About Me
          </h3>
        </div>
        <div className="card-container">
          <img
            src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/fhbreofsrhbasergszhm"
            alt="img"
            className="profile-image"
            loading="lazy"
          />
          <div
            className="info-container"
            style={{ fontFamily: "Protest Strike" }}
          >
            <div className="info-item">
              <img
                src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/mesgamu2ac6i658s58ry"
                alt="Certificate"
                className="icon"
                loading="lazy"
              />
              <h5 className="info-title">EXPERIENCE</h5>
              <p>2 Years Working</p> {/* Changed <texts> to <p> */}
            </div>
            <div className="info-item">
              <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/dvpm63jekpzgurhquhon" alt="Suit" className="icon" loading="lazy" />
              <h5 className="info-title">PROJECTS</h5>
              <p>5+ projects</p> {/* Changed <texts> to <p> */}
            </div>
            <div className="info-item">
              <img
                src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/rnsbbxoapcvsrlmtmclx"
                alt="Support"
                className="icon"
                loading="lazy"
              />
              <h5 className="info-title">SUPPORT</h5>
              <p>Online 24/7</p> {/* Changed <texts> to <p> */}
            </div>
          </div>
          <div style={{ fontFamily: "Inconsolata" }} className="about-summary">
            <p>
              MERN stack developer with expertise in creating dynamic and
              responsive web applications. With years of experience, I excel at
              delivering user-friendly interfaces and seamless experiences that
              satisfy both clients and end-users. I stay updated on industry
              trends to ensure top-notch results for every project.
            </p>{" "}
          </div>
        </div>
      </div>

      <div
        style={{ marginTop: "-12%", height: "100vh", width: "100vw" }}
        className="skill-cointainer"
      >
        <div>
          <h5 style={{ textAlign: "center", color: "gray" }}>My Skills</h5>
          <h3
            style={{
              textAlign: "center",
              color: "#8B60C1",
              fontFamily: "Protest Strike",
            }}
          >
            Technologies
          </h3>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-1 p-5 skill-cointainer-cards">
          <div className="col first-card">
            <Card className="card" style={{ boxShadow: "5px 5px 5px #8B60C1" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/ej3i4ps7mgqt4hi2k5os"
                  alt="Hollywood Sign on The Hill"
                  className="card-img"
                />
                <CardContent style={{ color: "#8B60C1", textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontFamily: "Protest Strike" }}
                  >
                    JAVA
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>

          <div className="col total-card">
            <Card className="card" style={{ boxShadow: "5px 5px 5px #8B60C1" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/iyxiqrpxlktnekp3bnbc"
                  alt="Palm Springs Road"
                  className="card-img"
                />
                <CardContent style={{ color: "#8B60C1", textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontFamily: "Protest Strike" }}
                  >
                    JAVASCRIPT
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>

          <div className="col total-card">
            <Card className="card" style={{ boxShadow: "5px 5px 5px #8B60C1" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/hfbq0ji2eskvt5gjgaj7"
                  alt="Los Angeles Skyscrapers"
                  className="card-img"
                />
                <CardContent style={{ color: "#8B60C1", textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontFamily: "Protest Strike" }}
                  >
                    EXPRESS JS
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>

          <div className="col total-card">
            <Card className="card" style={{ boxShadow: "5px 5px 5px #8B60C1" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/h2l8mgqsm2tkqs6zfjra"
                  alt="Skyscrapers"
                  className="card-img"
                />
                <CardContent style={{ color: "#8B60C1", textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontFamily: "Protest Strike" }}
                  >
                    REACT JS
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>

        <div
          className="row row-cols-1 row-cols-md-3 g-1 p-5 skill-cointainer-cards"
          style={{ marginTop: "-8%" }}
        >
          <div className="col first-card">
            <Card className="card" style={{ boxShadow: "5px 5px 5px #8B60C1" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/dyo3zrunlctacljmivyw"
                  alt="Hollywood Sign on The Hill"
                  className="card-img"
                />
                <CardContent style={{ color: "#8B60C1", textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontFamily: "Protest Strike" }}
                  >
                    PYTHON
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>

          <div className="col total-card">
            <Card className="card" style={{ boxShadow: "5px 5px 5px #8B60C1" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/jvqik6zccvfokibctozt"
                  alt="Palm Springs Road"
                  className="card-img"
                />
                <CardContent style={{ color: "#8B60C1", textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontFamily: "Protest Strike" }}
                  >
                    AWS CLOUD
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>

          <div className="col total-card">
            <Card className="card" style={{ boxShadow: "5px 5px 5px #8B60C1" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/evozexbij7pbz9hcnb42"
                  alt="Los Angeles Skyscrapers"
                  className="card-img"
                />
                <CardContent style={{ color: "#8B60C1", textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontFamily: "Protest Strike" }}
                  >
                    MONGO DB
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>

          <div className="col total-card">
            <Card className="card" style={{ boxShadow: "5px 5px 5px #8B60C1" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="160"
                  image="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/ikgbhedp61nitzbf0wah"
                  alt="Skyscrapers"
                  className="card-img"
                />
                <CardContent style={{ color: "#8B60C1", textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontFamily: "Protest Strike" }}
                  >
                    CREW AI
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
      </div>

      <div className="project">
        <h5 style={{ textAlign: "center", color: "gray" }}>My Works</h5>
        <h3
          style={{
            textAlign: "center",
            color: "#8B60C1",
            fontFamily: "Protest Strike",
          }}
        >
          Projects
        </h3>
        <Project />
      </div>

      <div className="certification">
        <h5 style={{ textAlign: "center", color: "gray" }}>My Achievements</h5>
        <h3
          style={{
            textAlign: "center",
            color: "#8B60C1",
            fontFamily: "Protest Strike",
          }}
        >
          Certifications
        </h3>
        <div className="certificate-container">
          <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/kzexwac7csq178jwrmbp" className="cert-img-container" loading="lazy"  alt="img"/>
          <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/z7rjdsmhz0gidgjnuwq3" className="cert-img-container" loading="lazy"  alt="img"/>
          <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/opamarlop3meeijcj7gx" className="cert-img-container" loading="lazy"  alt="img"/>
          <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/k82esocoavxd0v30nwuc" className="cert-img-container" loading="lazy"  alt="img"/>
          <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/so3esb3wlwpzjnsy1hw5" className="cert-img-container" loading="lazy"  alt="img"/>
          <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/chc1uxkhztnrkbo2mpob" className="cert-img-container" loading="lazy"  alt="img"/>
          <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/hpuqq2evcjy509o948p1" className="cert-img-container" loading="lazy"  alt="img"/>
          <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/atuqkm1bojs90kfkaxac" className="cert-img-container" loading="lazy"  alt="img"/>
          <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/kdep1onkzw66euuho6bi" className="cert-img-container" loading="lazy"  alt="img"/>
          <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/urkma7vefgqk0aizt9z5" className="cert-img-container" loading="lazy"  alt="img"/>
        </div>
      </div>

      <div className="contact">
        <h5 style={{ textAlign: "center", color: "gray" }}>Get In Touch</h5>
        <h3
          style={{
            textAlign: "center",
            color: "#8B60C1",
            fontFamily: "Protest Strike",
          }}
        >
          Contacts
        </h3>
        <div
          style={{
            marginBottom: "30%",
            display: "flex",
            justifyContent: "space-evenly",
            width: "80vw",
          }}
          className="contact-container"
        >
          <div className="pin-wrapper">
            <textarea
              tabindex="-1"
              className="notes"
              placeholder="Give a short Note"
              name="notes"
              value={users.notes}
              onChange={collect}
            ></textarea>
          </div>

          <div>
            <form className="form" autoComplete="off">
              <div className="control block-cube block-input">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={users.username}
                  onChange={collect}
                />
                <div className="bg-top">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg-right">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg">
                  <div className="bg-inner"></div>
                </div>
              </div>
              <div className="control block-cube block-input">
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={users.email}
                  onChange={collect}
                />
                <div className="bg-top">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg-right">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg">
                  <div className="bg-inner"></div>
                </div>
              </div>
              <div></div>
              <button
                className="btn block-cube block-cube-hover"
                type="button"
                onClick={sub}
              >
                <div className="bg-top">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg-right">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg">
                  <div className="bg-inner"></div>
                </div>
                <div className="text">Send</div>
              </button>
              <button
                className="btn block-cube block-cube-hover"
                type="button"
                onClick={clearFields}
                style={{ marginTop: "20px" }}
              >
                <div className="bg-top">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg-right">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg">
                  <div className="bg-inner"></div>
                </div>
                <div className="text">Clear</div>
              </button>
            </form>
          </div>

          <div>
            <div
              style={{
                background: "grey",
                borderRadius: "20px",
                width: "20vw",
                height: "10vh",
                marginBottom: "10%",
                marginTop: "20%",
              }}
              className="social-container"
            >
              <img
                src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/w5cha8mxigckdea6drke"
                 alt="img"
                style={{
                  width: "50px",
                  height: "50px",
                  marginLeft: "30px",
                  marginTop: "10px",
                }}
              />
              <a
                href="https://www.linkedin.com/in/vetri-kanth-9ba868249"
                target="_blank"
                rel="noreferrer"
              >
                <button
                  className="followButton"
                  onclick="window.open('www.linkedin.com/in/vetri-kanth-9ba868249', '_blank')"
                >
                  <p className="buttonText">Follow me</p>
                  <svg
                    viewBox="0 0 16 16"
                    className="buttonIcon bi bi-whatsapp"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
                  </svg>
                </button>
              </a>
            </div>
            <div
              style={{
                background: "grey",
                borderRadius: "20px",
                width: "20vw",
                height: "10vh",
                marginBottom: "10%",
              }}
              className="social-container"
            >
              <img
                src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/tidkvh1qkyvzzg54q61q"
                 alt="img"
                style={{
                  width: "50px",
                  height: "50px",
                  marginLeft: "30px",
                  marginTop: "10px",
                }}
              />
              <a href="https://github.com/Vetrikanth1209" target="_blank" rel="noreferrer">
                <button className="followButtonGitHub">
                  <p className="buttonTextGitHub">Follow me</p>
                  <svg
                    viewBox="0 0 24 24"
                    className="buttonIconGitHub"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.001 2C6.476 2 2 6.476 2 12c0 4.418 2.868 8.166 6.838 9.487.5.093.686-.216.686-.482 0-.237-.009-.868-.014-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.833.092-.647.349-1.088.635-1.338-2.22-.253-4.555-1.11-4.555-4.947 0-1.092.39-1.987 1.03-2.684-.103-.253-.447-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.845c.85.004 1.705.114 2.504.335 1.91-1.296 2.748-1.026 2.748-1.026.546 1.376.202 2.393.1 2.646.64.697 1.03 1.592 1.03 2.684 0 3.847-2.337 4.691-4.565 4.94.359.31.678.92.678 1.856 0 1.34-.012 2.419-.012 2.749 0 .27.182.58.691.481C19.135 20.165 22 16.417 22 12c0-5.524-4.475-10-10-10z"></path>
                  </svg>
                </button>
              </a>
            </div>
            <div
              style={{
                background: "grey",
                borderRadius: "20px",
                width: "20vw",
                height: "10vh",
                marginBottom: "2%",
              }}
              className="social-container"
            >
              <img
                src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/uyk9jj5f09kim43qlerv"
                 alt="img"
                style={{
                  width: "50px",
                  height: "50px",
                  marginLeft: "30px",
                  marginTop: "10px",
                }}
              />
              <a href="https://www.instagram.com/vetree_1209/" target="_blank" rel="noreferrer">
                <button className="custom-button">
                  <p className="custom-button-text">Follow me</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="custom-button-icon bi bi-whatsapp"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <main class="container">
        <p>Thank 👋 You</p>
        <section class="animation">
          <div class="first">
            <div>For Your Time</div>
          </div>
          <div class="second">
            <div>For Your Interest</div>
          </div>
          <div class="third">
            <div>Share Feedback</div>
          </div>
        </section>
      </main>
      <div
        style={{ backgroundColor: "#8B60C1", width: "100vw", height: "55vh" }}
        className="final-footer"
      >
         <div className="footer-name">
        <p>VETRIKANTH</p>
        </div>
        <div className="footer-email">
        <p>vetrigokul2018@gmail.com</p>
        </div>
        <div className="footer-copyright">
        <p>© 2024 S44WN. All rights reserved.</p>
        </div>
        <div className="footer-button">
          <img src="https://res.cloudinary.com/dclragtzq/image/upload/f_auto,q_auto/xkiypfkbimvvnkrap7bs"  alt="img"/>
          <button onClick={() => window.open('https://drive.google.com/file/d/1kAsdnb_VIaliswH8qB4QRTqDouYC_QQG/view?usp=drive_link', '_blank')}>View Resume</button>
        </div>
        <Player
          src="https://lottie.host/2d5f5966-8bcb-4980-b04c-5dfb062c26f5/UvnFaC37VT.json"
          background="transparent"
          speed={1}
          style={{ width: "300px", height: "300px" ,borderRadius:'25px !important'}}
          loop
          autoplay
          className="rocket"
        />
        <Player
          src="https://lottie.host/df3285c0-6a30-44da-8b24-822256ece1d4/4v42SwzweI.json"
          background="transparent"
          speed={1}
          style={{ width: "120px", height: "120px" }}
          loop
          autoplay
         className="footer-text"
        />
      </div>
    </div>
  );
};

export default App;
