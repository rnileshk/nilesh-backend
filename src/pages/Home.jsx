import AnimatedBackground from "../components/AnimatedBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Work from "../components/Work";
import Education from "../components/Education";
import Certificates from "../components/Certificates";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";

function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Work />
      <Education />
      <Certificates />
      <Contact />
      <Footer />
      <ChatWidget />
    </>
  );
}

export default Home;