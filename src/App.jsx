import { useState, useEffect, useRef } from 'react';
import './App.css';
// --- IMPORT VIDEO & DATA ---
import bgVideo from '/assets/video-banner.mp4'
import { projectsData, skillsData } from './data.js'

// --- KOMPONEN ANIMASI JUDUL ---
const AnimatedTitle = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, []);

  return (
    <h2 ref={elementRef} className="animated-title">
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className={`char ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: `${index * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h2>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  
  // State Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 2000; 
    let startTime = null;
    const easeOutQuart = (t, b, c, d) => {
      t /= d; t--; return -c * (t * t * t * t - 1) + b;
    };
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeOutQuart(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  return (
    <div className={`main-container ${darkMode ? 'dark-mode-active' : ''}`}>
      
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">My Portfolio</div>
        
        {/* Container Link & Tombol */}
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</a>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a>
          <a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')}>Skills</a>
          <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projects</a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a>

          {/* TOMBOL DARK MODE (POSISI DI SINI AGAR SEBELAH CONTACT) */}
          <button 
            className="theme-toggle" 
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero-fixed" style={{ filter: `brightness(${1 - offset / 1000})` }}>
        <video className="hero-bg" autoPlay loop muted style={{ transform: `translateY(${offset * 0.5}px) scale(${1 + offset * 0.0005})` }}>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="hero-content" style={{ transform: `translateY(${offset * -0.2}px)`, opacity: 1 - offset / 500 }}>
          <p className="subtitle">PORTFOLIO 2026</p>
          <h1>WILHELMINA LORENZIA</h1>
          <p className="description">Building Digital Experiences.</p>
        </div>
      </section>

      {/* CONTENT LAYER */}
      <div className={`content-wrapper ${darkMode ? 'dark-content' : ''}`}>
        
        {/* ABOUT */}
        <section id="about" className="section padded">
          <div className="section-header">
            <AnimatedTitle text="About Me" />
            <div className="line"></div>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <h3>I create aesthetic & functional websites.</h3>
              <p>Sebagai seorang developer, saya percaya bahwa kerapian kode sama pentingnya dengan keindahan desain. Saya menggabungkan kreativitas UI dengan performa teknis yang solid.</p>
              <div className="stats-row">
                <div className="stat"><h4>2+</h4><span>Years Exp</span></div>
                <div className="stat"><h4>15+</h4><span>Projects</span></div>
              </div>
            </div>
            <div className="about-quote">
              <p>"Code is like humor. When you have to explain it, it's bad."</p>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section padded bg-light">
          <div className="section-header">
            <AnimatedTitle text="Technical Expertise" />
            <div className="line"></div>
          </div>
          <div className="skills-container">
            <div className="skill-group">
              <h3 className="group-title">Languages & Frameworks</h3>
              <div className="grid-box">
                {skillsData.languages.map((skill, index) => (<div key={index} className="tech-card">{skill}</div>))}
              </div>
            </div>
            <div className="skill-group mt-large">
              <h3 className="group-title">Tools I Use</h3>
              <div className="grid-box">
                {skillsData.tools.map((tool, index) => (<div key={index} className="tool-card">{tool}</div>))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section padded">
          <div className="section-header">
            <AnimatedTitle text="Selected Works" />
            <div className="line"></div>
          </div>
          <div className="projects-container">
            {projectsData.map((project) => (
              <div key={project.id} className={`project-item ${project.reverse ? 'reverse' : ''}`}>
                <img src={project.image} alt={project.title} className="project-img" />
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                  <p className="project-desc">{project.description}</p>
                  <div className="tools-stack">
                    <span className="tools-label">Tech Stack:</span>
                    <div className="tools-list">
                      {project.techStack.map((tech, index) => (<span key={index} className="tool-badge">{tech}</span>))}
                    </div>
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-link">View Project</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section padded dark-footer">
          <div className="contact-wrapper">
            <AnimatedTitle text="Let's Work Together" />
            <p>Punya ide menarik? Mari kita wujudkan.</p>
            <a href="mailto:wilhelmina6508@gmail.com" className="btn-main">Get in Touch</a>
            <div className="footer-bottom">
              <p>&copy; 2026 Lorenzia Portfolio. All Rights Reserved.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;