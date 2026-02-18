import { useEffect, useRef, useState, Suspense } from 'react'
import './App.css'
import Lanyard from './Lanyard'

// Simple loading fallback
function LanyardFallback() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.5)',
      fontSize: '0.875rem'
    }}>
      Loading 3D...
    </div>
  )
}

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const refs = [heroRef, aboutRef, skillsRef, projectsRef, contactRef]
      
      refs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sections[index])
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const skills = [
    { name: 'HTML/CSS', level: 95, color: '#e34c26' },
    { name: 'JavaScript', level: 88, color: '#f7df1e' },
    { name: 'React.js', level: 85, color: '#61dafb' },
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'Python', level: 75, color: '#3776ab' },
    { name: 'PHP', level: 82, color: '#777bb4' },
    { name: 'MySQL', level: 78, color: '#4479a1' },
    { name: 'Git/GitHub', level: 85, color: '#f05032' }
  ]

  const projects = [
    {
      title: 'Sistem Informasi Perpustakaan',
      desc: 'Aplikasi manajemen perpustakaan digital dengan fitur peminjaman, pengembalian, dan katalog online.',
      tech: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop',
      year: '2024'
    },
    {
      title: 'E-Commerce UMKM',
      desc: 'Platform e-commerce untuk UMKM lokal Lumajang dengan payment gateway dan manajemen inventori.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
      year: '2024'
    },
    {
      title: 'Aplikasi Absensi QR Code',
      desc: 'Sistem absensi berbasis QR Code dengan real-time tracking dan laporan otomatis.',
      tech: ['React Native', 'Firebase', 'QR Scanner'],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop',
      year: '2023'
    },
    {
      title: 'Portfolio Generator',
      desc: 'Tool generator portfolio otomatis untuk siswa RPL dengan template yang dapat dikustomisasi.',
      tech: ['Vue.js', 'Python', 'Flask', 'SQLite'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      year: '2023'
    }
  ]

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar" style={{ transform: `translateY(${scrollY > 100 ? 0 : -100}%)` }}>
        <div className="nav-content">
          <div className="logo">
            <span className="logo-text">RPL</span>
            <span className="logo-dot">.</span>
            <span className="logo-highlight">Lumajang</span>
          </div>
          <ul className="nav-links">
            {[
              { id: 'home', ref: heroRef, label: 'Home' },
              { id: 'about', ref: aboutRef, label: 'About' },
              { id: 'skills', ref: skillsRef, label: 'Skills' },
              { id: 'projects', ref: projectsRef, label: 'Projects' },
              { id: 'contact', ref: contactRef, label: 'Contact' }
            ].map((item) => (
              <li key={item.id}>
                <button 
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => scrollToSection(item.ref)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <button className="mobile-menu-btn" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section with Lanyard */}
      <section ref={heroRef} id="home" className="hero">
        <div className="hero-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
        
        <div className="hero-grid">
          <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
            <div className="hero-badge">
              <span className="pulse"></span>
              SMKN 1 Lumajang
            </div>
            <h1 className="hero-title">
              <span className="gradient-text">Rekayasa</span>
              <span className="gradient-text">Perangkat Lunak</span>
            </h1>
            <p className="hero-subtitle">
              Membangun solusi digital dengan kode dan kreativitas
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection(projectsRef)}>
                Lihat Proyek
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection(contactRef)}>
                Hubungi
              </button>
            </div>
          </div>

          {/* Lanyard 3D Component */}
          <div className="lanyard-container" style={{ opacity: Math.max(0, 1 - scrollY / 600) }}>
            <Suspense fallback={<LanyardFallback />}>
              <Lanyard 
                position={[0, 0, 22]} 
                gravity={[0, -40, 0]} 
                fov={28}
                cardImage="/lorenziatm.png"
              />
            </Suspense>
          </div>
        </div>

        <div 
          className="scroll-indicator"
          style={{ opacity: Math.max(0, 1 - scrollY / 400) }}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tentang</h2>
          </div>
          
          <div className="about-content">
            <p className="about-text">
              Siswi jurusan Rekayasa Perangkat Lunak di SMKN 1 Lumajang. 
              Fokus pada pengembangan web modern dan aplikasi yang berdampak.
            </p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Tahun</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Proyek</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Sertifikat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="skills">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Keahlian</h2>
          </div>

          <div className="skills-grid">
            {skills.map((skill) => (
              <div 
                key={skill.name}
                className="skill-card"
                style={{ '--skill-color': skill.color }}
              >
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: skill.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Proyek</h2>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-year">{project.year}</div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Kontak</h2>
          </div>

          <div className="contact-content">
            <p className="contact-subtitle">Mari berkolaborasi</p>
            
            <div className="contact-links">
              <a href="mailto:siswi.rpl@smkn1lumajang.sch.id" className="contact-link">
                <span>📧</span>
                Email
              </a>
              <a href="#" className="contact-link">
                <span>💼</span>
                LinkedIn
              </a>
              <a href="#" className="contact-link">
                <span>🐙</span>
                GitHub
              </a>
              <a href="#" className="contact-link">
                <span>📱</span>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 RPL SMKN 1 Lumajang</p>
        </div>
      </footer>
    </div>
  )
}

export default App