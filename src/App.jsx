import { useState, useEffect, useRef } from 'react';
import './App.css';
import { useSpotify } from './spotify';
// --- IMPORT VIDEO & DATA ---
import bgVideo from '/assets/video-banner.mp4';
import { projectsData, skillsData, certificatesData } from './data.js';

// --- UPDATE IMPORT ICON (Tambahkan Icon baru: FaBriefcase, FaClock, FaCheckCircle, FaMusic, FaBolt) ---
import { 
  FaDiscord, FaInstagram, FaTwitter, FaSnapchatGhost, 
  FaTelegramPlane, FaGithub, FaDownload, FaMicrosoft, FaFilePdf,
  FaLinkedin, FaTwitch, FaSteam, FaPaypal, 
  FaStar, FaBriefcase, FaSearch,
  FaClock, FaMapMarkerAlt, FaCheckCircle, FaMusic, FaBolt // <--- Icon Baru
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

  const { song, isPlaying, loading } = useSpotify();
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
        
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</a>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a>
          <a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')}>Skills</a>
          <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projects</a>
          <a href="#certificates" onClick={(e) => handleSmoothScroll(e, '#certificates')}>Certificates</a>
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
              <h3>I create aesthetic & functional websites.</h3>
              <p>I am a Software Engineering student at SMKN 1 Lumajang with a passion for building robust systems. My coding journey began in 6th grade with Lua 5.1 (Roblox Studio), which sparked a lifelong love for programming. Today, I specialize in modern web and mobile development using Next.js, React, Flutter, and Node.js. I bridge the gap between creative design and technical performance, ensuring that my projects look as good as they run. As a perfectionist, I take pride in writing clean, maintainable code and crafting pixel-perfect interfaces using Figma.</p>
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

        {/* --- [BARU] SECTION INTERNSHIP INFO & SELLING POINT --- */}
        {/* Disisipkan di antara About dan Skills, menggunakan style bg-light agar selang seling */}
        <section className="section padded bg-light">
          <div className="section-header">
            <AnimatedTitle text="Internship Availability" />
            <div className="line"></div>
          </div>
          
          <div className="intern-container">
            
            {/* Kartu Kiri: Status Ketersediaan */}
            <div className="intern-card availability-card">
              <div className="card-badge">OPEN TO WORK</div>
              <h3><FaBriefcase style={{marginRight: '10px'}}/> Internship Plan</h3>
              <div className="intern-details">
                <div className="detail-item">
                  <FaClock className="icon-gold" />
                  <div>
                    <strong>Period:</strong>
                    <p>July 2026 - December 2026</p>
                  </div>
                </div>
                <div className="detail-item">
                  <FaBolt className="icon-gold" />
                  <div>
                    <strong>Duration:</strong>
                    <p>6 Months (Full Time)</p>
                  </div>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt className="icon-gold" />
                  <div>
                    <strong>Location:</strong>
                    <p>Anywhere / Remote</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kartu Kanan: Why Hire Me (Selling Point) */}
            <div className="intern-card why-card">
              <h3>Why Hire Me?</h3>
              <p className="why-desc">Ready to contribute and grow with your team.</p>
              
              <ul className="selling-points">
                <li>
                  <FaCheckCircle className="icon-check" />
                  <span><strong>Fast Learner:</strong> Quickly adapt to new tech stacks.</span>
                </li>
                <li>
                  <FaCheckCircle className="icon-check" />
                  <span><strong>Discipline:</strong> Used to school assignment deadlines.</span>
                </li>
                <li>
                  <FaCheckCircle className="icon-check" />
                  <span><strong>Team Player:</strong> Communicative and ready to take direction.</span>
                </li>
                <li>
                  <FaCheckCircle className="icon-check" />
                  <span><strong>Passionate:</strong> Always curious about the latest technology updates.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>
        {/* --- [AKHIR SECTION BARU] --- */}

        {/* SKILLS */}
        <section id="skills" className="section padded">
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
        <section id="projects" className="section padded bg-light">
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
        
{/* --- [BARU] SECTION CERTIFICATES --- */}
        <section id="certificates" className="section padded">
          <div className="section-header">
            <AnimatedTitle text="Certificates" />
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
                  <p className="cert-issuer">{cert.issuer} • {cert.date}</p>
                  
                  {/* Tombol Download PDF */}
                  <a href={cert.pdf} download className="btn-download-cert">
                    <FaFilePdf style={{ marginRight: '8px' }} /> Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* ----------------------------------- */}

        {/* --- CONTACT & FOOTER --- */}
        <section id="contact" className="section padded dark-footer">
          <div className="contact-wrapper">
            <AnimatedTitle text="Connect With Me" />
            <p className="footer-desc">
              Interested in collaborating or want to see my professional details?  
              Feel free to download my CV or contact me through the social media below.
            </p>

            <a href="/cv-wilhelmina.pdf" download className="btn-cv">
              <FaDownload style={{ marginRight: '10px' }} /> Download CV
            </a>
            
            <div className="social-links">
              {/* Media Sosial & Komunikasi */}
              <a href="https://www.linkedin.com/in/wilhelmina-lorenzia-wijaya-97045b3a9/" aria-label="LinkedIn" title="LinkedIn"><FaLinkedin className="social-icon" /></a>
              <a href="https://github.com/Renn6508" aria-label="Github" title="Github"><FaGithub className="social-icon" /></a>
              <a href="https://www.instagram.com/ren_eyebqgs?igsh=MXB0ZHJ3aW5uODhwNg==" aria-label="Instagram" title="Instagram"><FaInstagram className="social-icon" /></a>
              <a href="https://x.com/ren_atos_person" aria-label="Twitter" title="Twitter/X"><FaTwitter className="social-icon" /></a>
              <a href="https://discord.com/users/86845027429610293" aria-label="Discord" title="Discord"><FaDiscord className="social-icon" /></a>
              <a href="https://t.me/wilhelmina6508" aria-label="Telegram" title="Telegram"><FaTelegramPlane className="social-icon" /></a>
              <a href="https://www.snapchat.com/add/renn6508?share_id=U8yiU9w5QtU&locale=en-US" aria-label="Snapchat" title="Snapchat"><FaSnapchatGhost className="social-icon" /></a>
              <a href="https://learn.microsoft.com/en-us/users/wilhelminalorenziawijaya-4296/" aria-label="Microsoft Learn"><FaMicrosoft className="social-icon" /></a>
              
              {/* Gaming & Payment */}
              <a href="https://www.twitch.tv/renneyeb4gs" aria-label="Twitch" title="Twitch"><FaTwitch className="social-icon" /></a>
              <a href="https://steamcommunity.com/id/USERNAME_STEAM_KAMU" aria-label="Steam" title="Steam"><FaSteam className="social-icon" /></a>
              <a href="https://paypal.me/wilhelren" aria-label="PayPal" title="PayPal"><FaPaypal className="social-icon" /></a>
              
              {/* Job Platforms */}
              <a href="https://glints.com/id/profile/public/ID_GLINTS_KAMU" aria-label="Glints" title="Glints"><FaStar className="social-icon" /></a> 
              <a href="#" aria-label="Indeed" title="Indeed"><FaSearch className="social-icon" /></a> 
              <a href="#" aria-label="JobStreet" title="JobStreet"><FaBriefcase className="social-icon" /></a>
            </div>

            {/* --- [BARU] WIDGET CURRENT STATUS / NOW PLAYING --- */}
            <div className="status-widget">
              <div className="status-item">
                <span className="pulsing-dot"></span>
                <span>Open for Internship</span>
              </div>
              <div className="status-divider">|</div>
              {/* --- SPOTIFY LIVE STATUS --- */}
              <div className="status-item spotify-container">
                <FaMusic className={`music-icon ${isPlaying ? 'spin-animation' : ''}`} />
                
                <div className="spotify-info">
                  {loading ? (
                    <span>Connecting...</span>
                  ) : isPlaying && song ? (
                    <a 
                      href={song.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="spotify-link"
                      title={`Listen to ${song.title} on Spotify`}
                    >
                      <span className="song-title">{song.title}</span>
                      <span className="song-artist"> — {song.artist}</span>
                    </a>
                  ) : (
                    <span>Not Playing (Offline)</span>
                  )}
                </div>
              </div>
            </div>
            {/* ------------------------------------------------ */}

            <div className="footer-bottom">
              <p>&copy; 2026 Lorenzia Portfolio. All Rights Reserved.</p>
              <p style={{fontSize: '0.7rem', marginTop: '5px', opacity: 0.5}}>Designed with Passion.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;