import { useState } from 'react'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false); // Untuk menu di HP

  return (
    <div className="app-container">
      
      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="logo">Lorenzia<span className="dot">.</span></div>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
        </div>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h4>Halo, nama saya</h4>
          <h1>Lorenzia</h1>
          <h3>Web Developer & <span className="text-highlight">UI Designer</span></h3>
          <p>
            Membangun pengalaman digital yang estetik dan fungsional. 
            Fokus pada React dan desain antarmuka yang modern.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn primary">Lihat Karya</a>
            <a href="#contact" className="btn secondary">Hubungi Saya</a>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="section-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <p>
            Saya adalah seorang pengembang web yang bersemangat. Saya menikmati proses mengubah ide-ide kompleks menjadi antarmuka yang sederhana dan indah. 
            Saat ini saya sedang mendalami ekosistem React dan Modern CSS.
          </p>
          <div className="skills">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>React</span>
            <span>Git</span>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="section-container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-card">
            <div className="card-image"></div>
            <div className="card-info">
              <h3>Portfolio Website</h3>
              <p>Website portofolio pribadi yang dibangun dengan React dan Vite.</p>
              <a href="#" className="link-text">Lihat Detail →</a>
            </div>
          </div>
           {/* Project 2 */}
           <div className="project-card">
            <div className="card-image"></div>
            <div className="card-info">
              <h3>Landing Page UI</h3>
              <p>Desain landing page modern untuk produk teknologi.</p>
              <a href="#" className="link-text">Lihat Detail →</a>
            </div>
          </div>
           {/* Project 3 */}
           <div className="project-card">
            <div className="card-image"></div>
            <div className="card-info">
              <h3>Todo App</h3>
              <p>Aplikasi manajemen tugas sederhana menggunakan React State.</p>
              <a href="#" className="link-text">Lihat Detail →</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="section-container contact-section">
        <h2 className="section-title">Get In Touch</h2>
        <p>Apakah kamu punya ide project? Atau sekadar ingin menyapa? <br/>Kotak masuk saya selalu terbuka!</p>
        <a href="mailto:emailmu@example.com" className="btn primary">Kirim Email</a>
      </section>

      {/* --- FOOTER --- */}
      <footer>
        <p>© 2024 Lorenzia Portfolio. Built with React.</p>
      </footer>

    </div>
  )
}

export default App