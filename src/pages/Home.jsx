import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { mastersProjects } from '../data/projects'
import { useInView } from '../hooks/useScrollAnimation'
import editorialImg from '../assets/US作品集网站用图/个人照片.jpg'

const MARQUEE_ITEMS = [
  'Interaction Design', 'Systems Thinking', 'UX Research',
  'Health & Social Impact', 'Embodied Interaction', 'Service Design',
  'AI-Assisted Prototyping', 'Speculative Design', 'Prototyping & Craft',
]

export default function Home() {
  const [heroRef, heroIn] = useInView({ threshold: 0.01 })
  const [workRef, workIn] = useInView()
  const [aboutRef, aboutIn] = useInView()
  const [contactRef, contactIn] = useInView()

  return (
    <div className="home">

      {/* ─── Hero ─── */}
      <section className="home__hero">
        <div className="container">

          <div
            ref={heroRef}
            className={`home__hero-top animate${heroIn ? ' in-view' : ''}`}
          >
            <p className="home__eyebrow">MDes Interaction Design · California College of the Arts</p>
            <span className="home__availability">
              <span className="home__availability-dot" />
              Open to full-time roles
            </span>
          </div>

          <h1
            className={`home__headline animate${heroIn ? ' in-view' : ''}`}
            style={{ transitionDelay: '90ms' }}
          >
            Designing experiences<br />
            that feel <em>clear,</em><br />
            human, and alive.
          </h1>

          <div
            className={`home__hero-bottom animate${heroIn ? ' in-view' : ''}`}
            style={{ transitionDelay: '180ms' }}
          >
            <div className="home__hero-bio">
              <p className="home__subtext">
                I'm Yulin Li — an interaction designer focused on transforming
                complex systems into experiences that feel clear, supportive,
                and genuinely human.
              </p>
              <p className="home__credentials">
                MDes Interaction Design, California College of the Arts
                <span className="home__cred-sep"> · </span>
                STEM-designated
                <span className="home__cred-sep"> · </span>
                OPT eligible · San Francisco
              </p>
            </div>
            <div className="home__cta">
              <Link to="/work" className="btn btn--primary">
                View My Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/about" className="btn btn--ghost">About Me</Link>
            </div>
          </div>

        </div>

        {/* Marquee strip */}
        <div className="home__marquee" aria-hidden="true">
          <div className="home__marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="home__marquee-item">
                {item}
                <span className="home__marquee-sep">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Selected Work ─── */}
      <section
        ref={workRef}
        className={`home__work animate${workIn ? ' in-view' : ''}`}
      >
        <div className="container">
          <div className="home__work-header">
            <div>
              <p className="section-label">Selected Work</p>
              <h2 className="home__work-title">Master's Projects</h2>
            </div>
            <Link to="/work" className="btn btn--ghost home__work-viewall">
              All Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className="home__work-grid">
            {mastersProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={i === 0}
                delay={i * 75}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Editorial Image Break ─── */}
      <div className="home__editorial-break" aria-hidden="true">
        <img src={editorialImg} alt="" className="home__editorial-img" />
      </div>

      {/* ─── About Teaser ─── */}
      <section className="home__about">
        <div className="container">
          <div
            ref={aboutRef}
            className={`home__about-inner animate${aboutIn ? ' in-view' : ''}`}
          >
            <div className="home__about-left">
              <p className="section-label">About</p>
              <h2 className="home__about-heading">
                Research, <em>craft,</em><br />
                and a body<br />
                that pays attention.
              </h2>
            </div>
            <div className="home__about-right">
              <p>
                My design practice sits at the intersection of UX research,
                interaction design, and service design — with a growing focus on
                how AI can support, rather than replace, human judgment and care.
              </p>
              <p>
                I came to design through digital media art in Beijing, and I
                arrived at interaction design because I kept asking the same
                question: why does this feel wrong? I bring that sensitivity
                to every project — whether it's a care system, a consumer app,
                or a speculative installation.
              </p>
              <p>
                I dance, which means I think about how bodies move through space.
                I explore food, which means I think about how context shapes
                experience. Both show up in my work.
              </p>
              <Link to="/about" className="btn btn--ghost home__about-btn">
                Read My Story
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact Teaser ─── */}
      <section className="home__contact">
        <div className="container">
          <div
            ref={contactRef}
            className={`animate${contactIn ? ' in-view' : ''}`}
          >
            <p className="section-label home__contact-label">Let's Talk</p>
            <h2 className="home__contact-heading">
              Let's build something<br />
              <em>worth making.</em>
            </h2>
            <div className="home__contact-row">
              <a href="mailto:yulin4167@gmail.com" className="home__contact-email">
                yulin4167@gmail.com
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 19L19 5M19 5H7M19 5V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <Link to="/contact" className="btn btn--ghost">Open Contact Form</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
