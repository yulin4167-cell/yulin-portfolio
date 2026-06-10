import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { mastersProjects, undergradProjects, experiments } from '../data/projects'
import { useInView } from '../hooks/useScrollAnimation'

function WorkSection({ label, title, projects, note }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`work-section animate${inView ? ' in-view' : ''}`}>
      <div className="work-section__header">
        <p className="section-label">{label}</p>
        <div className="work-section__title-row">
          <h2 className="work-section__title">{title}</h2>
          {note && <p className="work-section__note">{note}</p>}
        </div>
      </div>
      <div className="work-section__grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={i * 60} />
        ))}
      </div>
    </div>
  )
}

export default function Work() {
  const [headerRef, headerIn] = useInView({ threshold: 0.01 })

  return (
    <div className="work-page">
      <div className="container">

        <header
          ref={headerRef}
          className={`work-page__header animate${headerIn ? ' in-view' : ''}`}
        >
          <p className="section-label">Portfolio</p>
          <h1 className="work-page__title">Selected Work</h1>
          <p className="work-page__subtitle">
            {mastersProjects.length + undergradProjects.length + experiments.length} projects across
            interaction design, service design, product design, and physical computing.
          </p>
        </header>

        <WorkSection
          label="01 — Master's"
          title="Graduate Projects"
          note="California College of the Arts, MDes Interaction Design"
          projects={mastersProjects}
        />

        <WorkSection
          label="02 — Undergraduate"
          title="Earlier Work"
          note="Beijing Jiaotong University, Digital Media Art"
          projects={undergradProjects}
        />

        <WorkSection
          label="03 — Experiments"
          title="Small Explorations"
          note="Prototypes, installations, and speculative interactions"
          projects={experiments}
        />

        <div className="work-page__footer">
          <p className="work-page__footer-text">
            Come find me — there is more Yulin to discover.
          </p>
          <a href="mailto:yulin4167@gmail.com" className="btn btn--ghost">
            Get in Touch
          </a>
        </div>

      </div>
    </div>
  )
}
