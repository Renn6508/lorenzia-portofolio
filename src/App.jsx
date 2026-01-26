import { useState, useEffect, useRef } from 'react';
import './App.css';

// --- KOMPONEN ANIMASI JUDUL (Tetap sama) ---
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

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- FUNGSI SCROLL LAMBAT ---
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
      t /= d;
      t--;
      return -c * (t * t * t * t - 1) + b;
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
    <div className="main-container">
      
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">My Portfolio</div>
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</a>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a>
          <a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')}>Skills</a> {/* MENU BARU */}
          <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projects</a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero-fixed" style={{ filter: `brightness(${1 - offset / 1000})` }}>
        <div className="hero-bg" style={{ transform: `translateY(${offset * 0.5}px) scale(${1 + offset * 0.0005})` }}></div>
        <div className="hero-content" style={{ transform: `translateY(${offset * -0.2}px)`, opacity: 1 - offset / 500 }}>
          <p className="subtitle">PORTFOLIO 2026</p>
          <h1>WILHELMINA LORENZIA</h1>
          <p className="description">Building Digital Experiences.</p>
        </div>
      </section>

      {/* CONTENT LAYER */}
      <div className="content-wrapper">
        
        {/* ABOUT SECTION */}
        <section id="about" className="section padded">
          <div className="section-header">
            <AnimatedTitle text="About Me" />
            <div className="line"></div>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <h3>I create aesthetic & functional websites.</h3>
              <p>
                Sebagai seorang developer, saya percaya bahwa kerapian kode sama pentingnya dengan keindahan desain. 
                Saya menggabungkan kreativitas UI dengan performa teknis yang solid.
              </p>
              <div className="stats-row">
                <div className="stat"><h4>2+</h4><span>Years Exp</span></div>
                <div className="stat"><h4>15+</h4><span>Projects</span></div>
              </div>
            </div>
            {/* Bagian skills kecil dihapus agar tidak duplikat dengan section bawah */}
             <div className="about-quote">
                <p>"Code is like humor. When you have to explain it, it’s bad."</p>
            </div>
          </div>
        </section>

        {/* --- SECTION BARU: SKILLS & TOOLS --- */}
        <section id="skills" className="section padded bg-light">
          <div className="section-header">
            <AnimatedTitle text="Technical Expertise" />
            <div className="line"></div>
          </div>

          <div className="skills-container">
            {/* Group 1: Languages & Frameworks */}
            <div className="skill-group">
              <h3 className="group-title">Languages & Frameworks</h3>
              <div className="grid-box">
                <div className="tech-card">HTML</div>
                <div className="tech-card">CSS 3</div>
                <div className="tech-card">JavaScript</div>
                <div className="tech-card">Next.js</div>
                <div className="tech-card">Lua 5.1</div>
                <div className="tech-card">Flutter</div>
                <div className="tech-card">Git</div>
              </div>
            </div>

            {/* Group 2: Tools */}
            <div className="skill-group mt-large">
              <h3 className="group-title">Tools I Use</h3>
              <div className="grid-box">
                <div className="tool-card">GitHub</div>
                <div className="tool-card">VS Code</div>
                <div className="tool-card">Figma</div>
                <div className="tool-card">Postman</div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION (Background jadi Putih biar selang seling) */}
        <section id="projects" className="section padded">
          <div className="section-header">
            <AnimatedTitle text="Selected Works" />
            <div className="line"></div>
          </div>

          <div className="projects-container">
            <div className="project-item">
              <div className="project-img img-1"></div>
              <div className="project-info">
                <h3>Minimalist E-Commerce</h3>
                <p>Web Development</p>
                <a href="#" className="btn-link">View Case Study</a>
              </div>
            </div>
            <div className="project-item reverse">
              <div className="project-info">
                <h3>Finance Dashboard</h3>
                <p>UI/UX Design</p>
                <a href="#" className="btn-link">View Case Study</a>
              </div>
              <div className="project-img img-2"></div>
            </div>
            <div className="project-item">
              <div className="project-img img-3"></div>
              <div className="project-info">
                <h3>Travel Booking App</h3>
                <p>Fullstack React</p>
                <a href="#" className="btn-link">View Case Study</a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section padded dark-footer">
          <div className="contact-wrapper">
            <AnimatedTitle text="Let's Work Together" />
            <p>Punya ide menarik? Mari kita wujudkan.</p>
            <a href="mailto:wilhelmina6508@gmail.com" className="btn-main">Get in Touch</a>
            <div className="footer-bottom">
              <p>&copy; 2024 Lorenzia Portfolio. All Rights Reserved.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;