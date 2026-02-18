import { useEffect, useRef, useState } from 'react'
import './App.css'
import GlassSurface from './GlassSurface'
import Lanyard from './Lanyard'

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

  const languages = [
    { name: 'Bahasa Indonesia', level: 'Native', percent: 100 },
    { name: 'English', level: 'Intermediate', percent: 75 },
    { name: 'Javanese', level: 'Native', percent: 95 }
  ]

  const tools = [
    { name: 'VS Code', icon: '💻', category: 'Editor' },
    { name: 'Figma', icon: '🎨', category: 'Design' },
    { name: 'Postman', icon: '📮', category: 'API' },
    { name: 'Docker', icon: '🐳', category: 'DevOps' },
    { name: 'Vite', icon: '⚡', category: 'Build' },
    { name: 'Tailwind', icon: '🌊', category: 'CSS' },
    { name: 'MongoDB', icon: '🍃', category: 'Database' },
    { name: 'Firebase', icon: '🔥', category: 'Backend' }
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
      {/* Navigation with GlassSurface */}
      <nav className="navbar" style={{ transform: `translateY(${scrollY > 100 ? 0 : -100}%)` }}>
        <GlassSurface
          width="90%"
          height={70}
          borderRadius={35}
          borderWidth={0.05}
          brightness={60}
          opacity={0.15}
          blur={20}
          displace={0.3}
          distortionScale={-150}
          redOffset={5}
          greenOffset={15}
          blueOffset={10}
          mixBlendMode="screen"
          className="navbar-glass"
        >
          <div className="nav-content">
            <div className="logo">RPL<span className="highlight">.Lumajang</span></div>
            <ul className="nav-links">
              {[
                { id: 'home', ref: heroRef, label: 'Beranda' },
                { id: 'about', ref: aboutRef, label: 'Tentang' },
                { id: 'skills', ref: skillsRef, label: 'Keahlian' },
                { id: 'projects', ref: projectsRef, label: 'Proyek' },
                { id: 'contact', ref: contactRef, label: 'Kontak' }
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
          </div>
        </GlassSurface>
      </nav>

      {/* Hero Section with Lanyard and Parallax */}
      <section ref={heroRef} id="home" className="hero">
        <div 
          className="hero-bg"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        {/* Lanyard 3D Component */}
        <div className="lanyard-container" style={{ opacity: Math.max(0, 1 - scrollY / 500) }}>
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>
        
        <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
          <div className="hero-badge">
            <span className="pulse"></span>
            Siswi SMKN 1 Lumajang
          </div>
          <h1 className="hero-title">
            <span className="line">Rekayasa</span>
            <span className="line gradient-text">Perangkat Lunak</span>
          </h1>
          <p className="hero-subtitle">
            Membangun solusi digital kreatif dengan kode dan inovasi. 
            Fokus pada pengembangan web modern dan aplikasi yang berdampak.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollToSection(projectsRef)}>
              Lihat Proyek
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection(contactRef)}>
              Hubungi Saya
            </button>
          </div>
        </div>

        <div 
          className="scroll-indicator"
          style={{ opacity: Math.max(0, 1 - scrollY / 500) }}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll untuk eksplorasi</span>
        </div>
      </section>

      {/* About Section with Scroll Sequence */}
      <section ref={aboutRef} id="about" className="about">
        <div className="container">
          <div className="section-header">
            <span className="section-number">01</span>
            <h2 className="section-title">Tentang Saya</h2>
          </div>
          
          <div className="about-grid">
            <div 
              className="about-image"
              style={{ transform: `translateX(${(scrollY - 500) * 0.1}px)` }}
            >
              <GlassSurface
                width={400}
                height={500}
                borderRadius={30}
                borderWidth={0.08}
                brightness={55}
                opacity={0.2}
                blur={15}
                displace={0.4}
                distortionScale={-160}
                mixBlendMode="screen"
                className="profile-glass"
              >
                <div className="profile-placeholder">
                  <span>👩‍💻</span>
                  <p>Siswi RPL</p>
                </div>
              </GlassSurface>
            </div>
            
            <div className="about-content">
              <div className="about-card">
                <h3>Perjalanan di SMKN 1 Lumajang</h3>
                <p>
                  Sebagai siswi jurusan Rekayasa Perangkat Lunak, saya telah mengeksplorasi 
                  berbagai aspek pengembangan software mulai dari pemrograman dasar hingga 
                  pengembangan aplikasi web modern.
                </p>
              </div>
              
              <div className="stats-grid">
                <div className="stat-item" style={{ '--delay': '0s' }}>
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Tahun Pengalaman</span>
                </div>
                <div className="stat-item" style={{ '--delay': '0.1s' }}>
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Proyek Selesai</span>
                </div>
                <div className="stat-item" style={{ '--delay': '0.2s' }}>
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Sertifikasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Parallax Cards */}
      <section ref={skillsRef} id="skills" className="skills">
        <div className="container">
          <div className="section-header">
            <span className="section-number">02</span>
            <h2 className="section-title">Keahlian & Tools</h2>
          </div>

          <div className="skills-layout">
            {/* Programming Skills */}
            <div className="skills-category">
              <h3>Bahasa Pemrograman</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-card"
                    style={{ 
                      transform: `translateY(${Math.sin(scrollY * 0.01 + index) * 10}px)`,
                      '--skill-color': skill.color
                    }}
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

            {/* Languages */}
            <div className="languages-section">
              <h3>Bahasa yang Dikuasai</h3>
              <div className="languages-grid">
                {languages.map((lang, index) => (
                  <GlassSurface
                    key={lang.name}
                    width="100%"
                    height={120}
                    borderRadius={20}
                    borderWidth={0.06}
                    brightness={50}
                    opacity={0.1}
                    blur={10}
                    className="language-card"
                  >
                    <div className="language-content">
                      <h4>{lang.name}</h4>
                      <div className="language-level">
                        <div 
                          className="level-bar" 
                          style={{ width: `${lang.percent}%` }}
                        ></div>
                        <span>{lang.level}</span>
                      </div>
                    </div>
                  </GlassSurface>
                ))}
              </div>
            </div>

            {/* Tools & Frameworks */}
            <div className="tools-section">
              <h3>Tools & Framework</h3>
              <div className="tools-marquee">
                <div className="tools-track">
                  {[...tools, ...tools].map((tool, index) => (
                    <div key={index} className="tool-item">
                      <span className="tool-icon">{tool.icon}</span>
                      <span className="tool-name">{tool.name}</span>
                      <span className="tool-category">{tool.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Scroll Sequence */}
      <section ref={projectsRef} id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-number">03</span>
            <h2 className="section-title">Proyek Unggulan</h2>
          </div>

          <div className="projects-timeline">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`project-item ${index % 2 === 0 ? 'left' : 'right'}`}
                style={{
                  opacity: scrollY > (800 + index * 400) ? 1 : 0.3,
                  transform: `translateY(${(scrollY - (800 + index * 400)) * 0.05}px)`
                }}
              >
                <div className="project-content">
                  <GlassSurface
                    width="100%"
                    height="auto"
                    borderRadius={24}
                    borderWidth={0.07}
                    brightness={45}
                    opacity={0.15}
                    blur={12}
                    displace={0.2}
                    className="project-glass"
                  >
                    <div className="project-card">
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
                  </GlassSurface>
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
            <span className="section-number">04</span>
            <h2 className="section-title">Mari Berkolaborasi</h2>
          </div>

          <div className="contact-content">
            <GlassSurface
              width="100%"
              height="auto"
              borderRadius={30}
              borderWidth={0.08}
              brightness={40}
              opacity={0.2}
              blur={15}
              displace={0.3}
              distortionScale={-140}
              className="contact-glass"
            >
              <div className="contact-grid">
                <div className="contact-info">
                  <h3>Hubungi Saya</h3>
                  <p>Tertarik untuk berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi saya.</p>
                  
                  <div className="contact-links">
                    <a href="mailto:siswi.rpl@smkn1lumajang.sch.id" className="contact-link">
                      <span>📧</span>
                      siswi.rpl@smkn1lumajang.sch.id
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

                <form className="contact-form">
                  <div className="form-group">
                    <input type="text" placeholder="Nama Lengkap" required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email" required />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Pesan Anda" rows="4" required></textarea>
                  </div>
                  <button type="submit" className="btn-primary">Kirim Pesan</button>
                </form>
              </div>
            </GlassSurface>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 Portfolio Siswi RPL SMKN 1 Lumajang. Dibuat dengan ❤️ dan kode.</p>
        </div>
      </footer>
    </div>
  )
}

export default App