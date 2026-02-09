import { useState, useEffect, useRef } from 'react';
import './App.css';
// --- IMPORT VIDEO & DATA ---
import bgVideo from '/assets/video-banner.mp4';
// UPDATE: Tambahkan certificatesData di import ini
import { projectsData, skillsData, certificatesData } from './data.js';

// --- TAMBAHAN IMPORT ICON UNTUK FOOTER ---
import { 
  FaDiscord, FaInstagram, FaTwitter, FaSnapchatGhost, 
  FaTelegramPlane, FaGithub, FaDownload, FaMicrosoft, FaFilePdf 
} from 'react-icons/fa';

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
          <a href="#certificates" onClick={(e) => handleSmoothScroll(e, '#certificates')}>Certificates</a> {/* Link Baru (Opsional) */}
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a>

          {/* TOMBOL DARK MODE */}
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
          <h1>LORENZIA</h1>
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
              <h3>Hi,Im Wilhelmina Lorenzia Wijaya.</h3>
              <p>I am a Software Engineering student at SMKN 1 Lumajang with a passion for building robust systems. My coding journey began in 6th grade with Lua 5.1 (Roblox Studio), which sparked a lifelong love for programming.
Today, I specialize in modern web and mobile development using Next.js, React, Flutter, and Node.js. I bridge the gap between creative design and technical performance, ensuring that my projects look as good as they run. As a perfectionist, I take pride in writing clean, maintainable code and crafting pixel-perfect interfaces using Figma.</p>
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
              <h3 className="group-title">Languages</h3>
              <div className="grid-box">
                {skillsData.languages.map((skill, index) => (<div key={index} className="tech-card">{skill}</div>))}
              </div>
            </div>
            <div className="skill-group mt-large">
              <h3 className="group-title">Tools,Framework,Design & Database</h3>
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

        {/* --- SECTION BARU: CERTIFICATES --- */}
        <section id="certificates" className="section padded bg-light">
          <div className="section-header">
            <AnimatedTitle text="Certifications" />
            <div className="line"></div>
          </div>
          
          <div className="cert-grid">
            {certificatesData.map((cert) => (
              <div key={cert.id} className="cert-card">
                <div className="cert-img-wrapper">
                  <img src={cert.image} alt={cert.title} className="cert-img" />
                </div>
                <div className="cert-content">
                  <h3>{cert.title}</h3>
                  <span className="cert-issuer">{cert.issuer} • {cert.date}</span>
                  
                  {/* Tombol Download PDF */}
                  <a href={cert.pdf} download className="btn-download-cert">
                    <FaFilePdf /> Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- CONTACT & FOOTER --- */}
        <section id="contact" className="section padded dark-footer">
          <div className="contact-wrapper">
            <AnimatedTitle text="Connect With Me" />
            <p className="footer-desc">
              Tertarik bekerja sama atau ingin melihat detail profesional saya? 
              Silakan unduh CV saya atau hubungi melalui media sosial di bawah ini.
            </p>

            {/* DOWNLOAD CV BUTTON */}
            <a href="/cv-wilhelmina.pdf" download className="btn-cv">
              <FaDownload style={{ marginRight: '10px' }} /> Download CV
            </a>
            
            {/* SOCIAL MEDIA ICONS */}
            <div className="social-links">
              <a href="https://discord.com/users/868450274296102933" aria-label="Discord"><FaDiscord className="social-icon" /></a>
              <a href="https://www.instagram.com/ren_eyebqgs?igsh=MXB0ZHJ3aW5uODhwNg==" aria-label="Instagram"><FaInstagram className="social-icon" /></a>
              <a href="https://x.com/ren_atos_person" aria-label="Twitter"><FaTwitter className="social-icon" /></a>
              <a href="https://www.snapchat.com/add/renn6508?share_id=U8yiU9w5QtU&locale=en-US" aria-label="Snapchat"><FaSnapchatGhost className="social-icon" /></a>
              <a href="https://t.me/wilhelmina6508" aria-label="Telegram"><FaTelegramPlane className="social-icon" /></a>
              <a href="https://github.com/Renn6508" aria-label="GitHub"><FaGithub className="social-icon" /></a>
              <a href="https://learn.microsoft.com/en-us/users/wilhelminalorenziawijaya-4296/" aria-label="Microsoft Learn"><FaMicrosoft className="social-icon" /></a>
            </div>

            <div className="footer-bottom">
              <p>&copy; 2026 Rn's Hub. All Rights Reserved.</p>
              <p style={{fontSize: '0.7rem', marginTop: '5px', opacity: 0.5}}>Designed with Love.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;