import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useScrollAnimation'

export default function ProjectCard({ project, featured = false, delay = 0 }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={`animate${inView ? ' in-view' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link
        to={`/work/${project.slug}`}
        className={`project-card${featured ? ' project-card--featured' : ''}${project.dark ? ' project-card--dark' : ''}`}
      >
        {/* ─── Image / Color Block ─── */}
        <div
          className="project-card__image"
          style={{ background: project.color }}
        >
          {project.cover && (
            <img
              src={project.cover}
              alt={project.title}
              className="project-card__cover-img"
            />
          )}

          {/* Category — always visible, fades on hover */}
          <span
            className="project-card__cat"
            style={{ color: project.accentColor }}
          >
            {project.category}
          </span>

          {/* "View Project" pill — slides in on hover */}
          <div className="project-card__overlay">
            <div className="project-card__view">
              <span className="project-card__view-label">View Project</span>
              <svg
                className="project-card__view-arrow"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 19L19 5M19 5H7M19 5V17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ─── Meta below image ─── */}
        <div className="project-card__meta">
          <div className="project-card__meta-row">
            <span
              className="project-card__number"
              style={{ color: project.accentColor }}
            >
              0{project.id}
            </span>
            <span className="project-card__year">{project.year}</span>
          </div>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__tagline">{project.tagline}</p>
        </div>
      </Link>
    </div>
  )
}
