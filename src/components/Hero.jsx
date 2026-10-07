import { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import api from "../api";

function Hero() {
  const [about, setAbout] = useState({});
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(smoothY, [-120, 120], [10, -10]);
  const rotateY = useTransform(smoothX, [-120, 120], [-10, 10]);

  useEffect(() => {
    api
      .get("/api/about")
      .then((res) => {
        console.log("ABOUT DATA:", res.data);
        setAbout(res.data || {});
      })
      .catch((err) => {
        console.log("ABOUT FETCH ERROR:", err);
      });
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const openResume = () => {
    if (!about.resumeUrl) {
      alert("Resume not found.");
      return;
    }

    window.open(about.resumeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-6 pt-28 flex items-center overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mb-4 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-blue-300"
          >
            Available for Java Full Stack Developer roles
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.85 }}
            className="text-5xl md:text-7xl font-black leading-tight"
          >
            Hi, I’m{" "}
            <span className="gradient-text">
              {about.fullName || "Nilesh Kumar"}
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.75 }}
            className="mt-5 text-2xl text-blue-300"
          >
            <Typewriter
              words={[
                about.role || "Java Full Stack Developer",
                "Spring Boot Developer",
                "React Developer",
                "Backend Engineer",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.75 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            I build scalable full-stack applications using Java Spring Boot & React, solving real-world problems with clean and efficient architecture.
          </motion.p>

          <div className="mt-6 flex gap-4">
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm animate-pulse">
              Open to Work
            </span>
            <span className="text-slate-400 text-sm">
              Bangalore / Remote / India
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.75 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn magnetic-btn"
            >
              View Projects
            </motion.a>

            <motion.button
              type="button"
              onClick={openResume}
              whileHover={{ y: -4, scale: about.resumeUrl ? 1.04 : 1 }}
              whileTap={{ scale: about.resumeUrl ? 0.97 : 1 }}
              className={`rounded-xl border border-white/15 px-6 py-3 font-semibold hover:bg-white/10 magnetic-btn ${
                !about.resumeUrl ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Download Resume
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 45 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="hero-photo-wrap premium-tilt"
          >
            <div className="hero-ring"></div>
            <div className="hero-ring hero-ring-2"></div>
            <div className="hero-orb hero-orb-1"></div>
            <div className="hero-orb hero-orb-2"></div>

            <motion.div
              style={{ transform: "translateZ(70px)" }}
              className="hero-photo-card premium-card"
            >
              <div className="hero-scan"></div>

              <img
                src={"/mee.jpeg"}
                alt="profile"
                className="hero-photo"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
