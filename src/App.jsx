import { useState, useEffect, useRef } from 'react';
import './App.css';
// --- IMPORT VIDEO & IMAGES ---
import bgVideo from '/assets/video-banner.mp4'

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
          <a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')}>Skills</a>
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
      <section id="home" className="hero-fixed" style={{ 
          filter: `brightness(${1 - offset / 1000})` 
      }}>
        
        <video 
          className="hero-bg" 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            transform: `translateY(${offset * 0.5}px) scale(${1 + offset * 0.0005})` 
          }}
        >
          <source src={bgVideo} type="video/mp4" />
          Browser kamu tidak mendukung tag video.
        </video>

        <div className="hero-content" style={{
          transform: `translateY(${offset * -0.2}px)`, 
          opacity: 1 - offset / 500 
        }}>
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
            <div className="about-quote">
              <p>"Code is like humor. When you have to explain it, it's bad."</p>
            </div>
          </div>
        </section>

        {/* SKILLS & TOOLS SECTION */}
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
                <div className="tech-card">CSS</div>
                <div className="tech-card">JavaScript</div>
                <div className="tech-card">Python</div>
                <div className="tech-card">PHP</div>
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
                <div className="tool-card">Composer</div>
                <div className="tool-card">Node Js</div> 
                <div className="tool-card">Postman</div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section padded">
          <div className="section-header">
            <AnimatedTitle text="Selected Works" />
            <div className="line"></div>
          </div>

          <div className="projects-container">
            
            {/* Project 1: Alpan Agro Jaya */}
            <div className="project-item">
              <img src="/assets/proyek/alpanagro.png" alt="Alpan Agro Jaya" className="project-img" />
              <div className="project-info">
                <h3>Alpan Agro Jaya</h3>
                <p className="project-category">Website Company Profile</p>
                <p className="project-desc">
                  Company profile website untuk perusahaan agribisnis dengan desain modern dan informasi lengkap tentang produk dan layanan.
                </p>
                <div className="tools-stack">
                  <span className="tools-label">Tech Stack:</span>
                  <div className="tools-list">
                    <span className="tool-badge">Next.js</span>
                    <span className="tool-badge">CSS</span>
                    <span className="tool-badge">JavaScript</span>
                  </div>
                </div>
                <a href="https://alpan-agro-jaya.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-link">View Project</a>
              </div>
            </div>

            {/* Project 2: H2O Pure Bali */}
            <div className="project-item reverse">
              <img src="/assets/proyek/H2Opurebali.jpeg" alt="H2O Pure Bali" className="project-img" />
              <div className="project-info">
                <h3>H2O Pure Bali</h3>
                <p className="project-category">Layout Company Profile</p>
                <p className="project-desc">
                  Desain UI/UX layout company profile untuk perusahaan air minum dengan konsep clean dan modern.
                </p>
                <div className="tools-stack">
                  <span className="tools-label">Tech Stack:</span>
                  <div className="tools-list">
                    <span className="tool-badge">Figma</span>
                    <span className="tool-badge">UI/UX Design</span>
                  </div>
                </div>
                <a href="https://www.figma.com/design/XFhqjrIOSDc46SRi68lLXt/H2OPURE-Layout-Company-Profile?node-id=0-1&t=GMLgkYsmFXmG3jbX-1" target="_blank" rel="noopener noreferrer" className="btn-link">View Project</a>
              </div>
            </div>

            {/* Project 3: Buku Tahunan Siswa */}
            <div className="project-item">
              <img src="/assets/proyek/bukutahunansiswa.png" alt="Buku Tahunan Siswa" className="project-img" />
              <div className="project-info">
                <h3>Buku Tahunan Siswa SMKN 1 Lumajang</h3>
                <p className="project-category">Website Online Book</p>
                <p className="project-desc">
                  Platform digital untuk buku tahunan siswa dengan fitur galeri foto, profil siswa, dan kenangan sekolah.
                </p>
                <div className="tools-stack">
                  <span className="tools-label">Tech Stack:</span>
                  <div className="tools-list">
                    <span className="tool-badge">HTML</span>
                    <span className="tool-badge">CSS</span>
                    <span className="tool-badge">JavaScript</span>
                    <span className="tool-badge">PHP</span>
                  </div>
                </div>
                <a href="https://jurnalistik.smkn1lmj.sch.id/bts-smk/" target="_blank" rel="noopener noreferrer" className="btn-link">View Project</a>
              </div>
            </div>

            {/* Project 4: Seblak Sultan */}
            <div className="project-item reverse">
              <img src="/assets/proyek/blessingstore.png" alt="Seblak Sultan" className="project-img" />
              <div className="project-info">
                <h3>Seblak Sultan Bleesing Store</h3>
                <p className="project-category">Website Company Profile</p>
                <p className="project-desc">
                  Website company profile untuk bisnis kuliner dengan tampilan menarik dan informasi menu lengkap.
                </p>
                <div className="tools-stack">
                  <span className="tools-label">Tech Stack:</span>
                  <div className="tools-list">
                    <span className="tool-badge">HTML</span>
                    <span className="tool-badge">CSS</span>
                    <span className="tool-badge">JavaScript</span>
                  </div>
                </div>
                <a href="https://praktikum-sizie.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-link">View Project</a>
              </div>
            </div>

            {/* Project 5: Management BarangKu */}
            <div className="project-item">
              <img src="/assets/proyek/barangku.png" alt="Management BarangKu" className="project-img" />
              <div className="project-info">
                <h3>Management BarangKu</h3>
                <p className="project-category">Website Management Stok Barang</p>
                <p className="project-desc">
                  Aplikasi web untuk mengelola inventori dan stok barang dengan fitur CRUD lengkap dan dashboard analytics.
                </p>
                <div className="tools-stack">
                  <span className="tools-label">Tech Stack:</span>
                  <div className="tools-list">
                    <span className="tool-badge">HTML</span>
                    <span className="tool-badge">CSS</span>
                    <span className="tool-badge">JavaScript</span>
                    <span className="tool-badge">PHP</span>
                  </div>
                </div>
                <a href="https://projek-barangku.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn-link">View Project</a>
              </div>
            </div>

            {/* Project 6: Krunchi Melt */}
            <div className="project-item reverse">
              <img src="/assets/proyek/krunchimelt.png" alt="Krunchi Melt" className="project-img" />
              <div className="project-info">
                <h3>Krunchi Melt Profile</h3>
                <p className="project-category">Website Company Profile</p>
                <p className="project-desc">
                  Website katalog produk untuk bisnis makanan dengan tampilan gallery yang menarik dan user-friendly.
                </p>
                <div className="tools-stack">
                  <span className="tools-label">Tech Stack:</span>
                  <div className="tools-list">
                    <span className="tool-badge">HTML</span>
                    <span className="tool-badge">CSS</span>
                    <span className="tool-badge">JavaScript</span>
                  </div>
                </div>
                <a href="https://renn6508.github.io/html_catalog/" target="_blank" rel="noopener noreferrer" className="btn-link">View Project</a>
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
              <p>&copy; 2026 Lorenzia Portfolio. All Rights Reserved.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;