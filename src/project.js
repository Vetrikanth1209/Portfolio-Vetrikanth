import "./project.css";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";

const cardVariants = {
  offscreen: {
    y: 300
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

function Card({ lottieSrc, hueA, hueB, heading }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className="pro-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="splash" style={{ background }} />
      <motion.div className="pro" variants={cardVariants}>
        <div className="card-content">
          <h2 className="card-heading">{heading}</h2> {/* Positioned on top of the player */}
          <Player
            src={lottieSrc}
            background="transparent"
            speed={1}
            style={{
              width: "300px",
              height: "300px"
            }}
            loop
            autoplay
            className="player"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Project() {
  return (
    <div className="total-project">
      <Card heading="General Bot" lottieSrc="https://lottie.host/8d2b586d-2ff0-4fb4-a25d-c541e6a8b33e/AhS3g88lwW.json" hueA={340} hueB={10} />
      <Card heading="Face Recognition" lottieSrc="https://lottie.host/ff210d79-62ef-4302-8be5-8024a0594b76/Gkdfo6mGuH.json" hueA={205} hueB={245} />
      <Card heading="NFC Catlog" lottieSrc="https://lottie.host/f3ec953f-64b1-44ec-8bf0-3c8994d8820c/eVAhRUmeU5.json" hueA={20} hueB={60} />
      <Card heading="Office Management" lottieSrc="https://lottie.host/c5e6abdb-b593-43e1-ad66-36c973acaa63/aXKrfJlwx3.json" hueA={260} hueB={290} />
      <Card heading="Learning Management" lottieSrc="https://lottie.host/432cfd5b-8888-4a5f-8b8f-cacc075c493a/yPSmnmHFtm.json" hueA={60} hueB={90} />
      <Card heading="Cooking Bot" lottieSrc="https://lottie.host/77cf5c50-fd16-41e2-93cd-b004b7043fc3/KV0FAqLfQE.json" hueA={110} hueB={90} />
    </div>
  );
}
