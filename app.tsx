import { useEffect, useRef, useCallback, useState, type ReactNode } from "react";

/* ─── Intersection Observer hook for fade-in ─── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── Reusable Section wrapper ─── */
function FadeSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in-section ${className}`}>
      {children}
    </div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [navHidden, setNavHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);

  /* Auto-hide nav on scroll */
  const handleScroll = useCallback(() => {
    const current = window.scrollY;
    if (current > 120 && current > lastScroll.current) {
      setNavHidden(true);
      setMenuOpen(false);
    } else {
      setNavHidden(false);
    }
    lastScroll.current = current;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* ═══════ NAVIGATION ═══════ */}
      <nav className={`luxury-nav ${navHidden ? "nav-hidden" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo">Yeo Benedicte</div>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>
                À propos
              </a>
            </li>
            <li>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo("skills"); }}>
                Compétences
              </a>
            </li>
            <li>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}>
                Projets
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
                Contact
              </a>
            </li>
          </ul>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="hero-section">
        <div className="hero-content">
          <FadeSection>
            <span className="hero-tag">Portfolio professionnel</span>
            <h1 className="hero-title">
              <span className="hero-title-accent">Yeo Benedicte</span>
              Étudiante en réseaux et sécurité informatique
            </h1>
            <p className="hero-subtitle">
              Passionnée par les réseaux et la cybersécurité, je développe mes
              compétences en protection des infrastructures et en détection des
              menaces pour construire un futur numérique plus sûr.
            </p>
            <div className="hero-buttons">
              <a
                href="#contact"
                className="btn btn-gold"
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
              >
                <span>✉</span> Me contacter
              </a>
              <a
                href="#projects"
                className="btn btn-outline"
                onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}
              >
                <span>→</span> Découvrir mes projets
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="content-section">
        <FadeSection>
          <div className="luxury-card">
            <div className="section-header">
              <span className="section-tag">Qui suis-je ?</span>
              <h2>À propos</h2>
              <p className="section-subtitle">
                Mon parcours dans le monde de la cybersécurité
              </p>
              <div className="gold-divider" />
            </div>
            <div className="about-grid">
              <div className="about-text">
                <p>
                  Actuellement étudiante en réseaux et sécurité informatique, je
                  me spécialise dans la protection des infrastructures numériques
                  et l'analyse des vulnérabilités.
                </p>
                <p>
                  Mon parcours m'a permis de développer une approche méthodique
                  de la sécurité, alliant connaissances théoriques et pratique sur
                  des environnements simulés.
                </p>
                <div className="features-list">
                  <div className="feature-item">
                    <div className="feature-icon">🛡</div>
                    <div>
                      <h3>Sécurité Réseau</h3>
                      <p>
                        Configuration de pare-feu, VPN et systèmes de détection
                        d'intrusions.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🌐</div>
                    <div>
                      <h3>Administration Réseaux</h3>
                      <p>
                        Maîtrise des protocoles TCP/IP et configuration
                        d'équipements Cisco.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">⌨</div>
                    <div>
                      <h3>Développement</h3>
                      <p>
                        Scripts d'automatisation et développement d'applications
                        web sécurisées.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="about-photo-frame">
                  <img src="yemaaa.png" alt="Yeo Benedicte" />
                </div>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ═══════ SKILLS ═══════ */}
      <section id="skills" className="content-section">
        <FadeSection>
          <div className="luxury-card">
            <div className="section-header">
              <span className="section-tag">Mes compétences</span>
              <h2>Expertise technique</h2>
              <p className="section-subtitle">
                Les technologies et outils que je maîtrise
              </p>
              <div className="gold-divider" />
            </div>
            <div className="skills-grid stagger-children visible">
              <div className="skill-card">
                <div className="skill-icon">🔗</div>
                <h3>Réseaux</h3>
                <ul>
                  <li>Modèles OSI et TCP/IP</li>
                  <li>Adressage IP et routage</li>
                  <li>Configuration Cisco Packet Tracer</li>
                  <li>Protocoles réseaux avancés</li>
                </ul>
              </div>
              <div className="skill-card">
                <div className="skill-icon">🖥</div>
                <h3>Systèmes</h3>
                <ul>
                  <li>Linux (commandes, services)</li>
                  <li>Administration Windows</li>
                  <li>Scripts Bash</li>
                  <li>Virtualisation</li>
                </ul>
              </div>
              <div className="skill-card">
                <div className="skill-icon">🔒</div>
                <h3>Sécurité</h3>
                <ul>
                  <li>Principes de sécurité réseau</li>
                  <li>Configuration pare-feu et VPN</li>
                  <li>Détection d'intrusions (IDS/IPS)</li>
                  <li>Analyse de vulnérabilités</li>
                </ul>
              </div>
              <div className="skill-card">
                <div className="skill-icon">💻</div>
                <h3>Programmation</h3>
                <ul>
                  <li>Python (automatisation)</li>
                  <li>PHP et MySQL</li>
                  <li>JavaScript (ES6+)</li>
                  <li>HTML5 et CSS3</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ═══════ PROJECTS ═══════ */}
      <section id="projects" className="content-section">
        <FadeSection>
          <div className="luxury-card">
            <div className="section-header">
              <span className="section-tag">Mes réalisations</span>
              <h2>Projets académiques</h2>
              <p className="section-subtitle">
                Découvrez mes projets et expérimentations
              </p>
              <div className="gold-divider" />
            </div>
            <div className="projects-grid stagger-children visible">
              <div className="project-card">
                <h3>Configuration Réseau d'Entreprise</h3>
                <p>
                  Simulation d'une infrastructure réseau sécurisée avec
                  segmentation VLAN, politiques de sécurité et configuration de
                  routeurs Cisco.
                </p>
                <div className="tags">
                  <span className="tag">Cisco</span>
                  <span className="tag">VLAN</span>
                  <span className="tag">Sécurité</span>
                  <span className="tag">Routage</span>
                </div>
              </div>
              <div className="project-card">
                <h3>Script de Surveillance Réseau</h3>
                <p>
                  Développement d'un outil Python pour monitorer les connexions,
                  détecter les anomalies et générer des alertes en temps réel.
                </p>
                <div className="tags">
                  <span className="tag">Python</span>
                  <span className="tag">Monitoring</span>
                  <span className="tag">Sécurité</span>
                  <span className="tag">Alertes</span>
                </div>
              </div>
              <div className="project-card">
                <h3>Analyse de Vulnérabilités</h3>
                <p>
                  Étude des failles courantes (OWASP Top 10), tests d'intrusion
                  simulés et proposition de solutions de correction.
                </p>
                <div className="tags">
                  <span className="tag">Sécurité</span>
                  <span className="tag">Audit</span>
                  <span className="tag">Pentesting</span>
                  <span className="tag">OWASP</span>
                </div>
              </div>
              <div className="project-card">
                <h3>Jeu de Mémoire</h3>
                <p>
                  Jeu interactif développé en HTML, CSS et JavaScript.
                </p>
                <a
                  href="projets/jeuDeMemoire/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Jouer →
                </a>
                <div className="tags">
                  <span className="tag">JavaScript</span>
                  <span className="tag">HTML5</span>
                  <span className="tag">CSS3</span>
                  <span className="tag">Jeu</span>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="content-section">
        <FadeSection>
          <div className="luxury-card contact-section">
            <span className="section-tag">Restons connectés</span>
            <h2>Me contacter</h2>
            <div className="gold-divider" style={{ marginBottom: "1.5rem" }} />
            <p>
              Je suis ouverte aux opportunités de stage et aux collaborations.
              N'hésitez pas à me contacter pour échanger.
            </p>
            <div className="contact-buttons">
              <a
                href="mailto:yeobenedicte@hotmail.com"
                className="contact-btn contact-btn-primary"
              >
                ✉ Email
              </a>
              <a
                href="https://www.linkedin.com/in/benedicte-yeo-50759a398"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn-secondary"
              >
                in LinkedIn
              </a>
              <a
                href="https://github.com/yeo0314"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn-secondary"
              >
                {"{ }"} GitHub
              </a>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="luxury-footer">
        <p>© 2026 Yeo Benedicte · Portfolio Cybersécurité</p>
      </footer>
    </>
  );
}
