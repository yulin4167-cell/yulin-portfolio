import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { useInView } from '../hooks/useScrollAnimation'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  const [heroRef, heroIn] = useInView({ threshold: 0.01 })
  const [metaRef, metaIn] = useInView()
  const [bodyRef, bodyIn] = useInView()

  if (!project) {
    return (
      <div className="container" style={{ paddingTop: '140px', paddingBottom: '6rem' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Project not found.</p>
        <Link to="/work" className="btn btn--ghost" style={{ marginTop: '2rem', display: 'inline-flex' }}>
          ← Back to Work
        </Link>
      </div>
    )
  }

  const hasHeroImg = !!project.heroImage
  const heroStyle = hasHeroImg
    ? {
        backgroundImage: `linear-gradient(rgba(20,18,16,0.56), rgba(20,18,16,0.56)), url(${project.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { background: project.color }

  const heroTextColor  = hasHeroImg ? '#F9F8F5' : (project.textColor || 'var(--color-text)')
  const heroSubColor   = hasHeroImg ? 'rgba(249,248,245,0.72)' : (project.textColor ? `${project.textColor}bb` : 'var(--color-text-secondary)')
  const heroTagColor   = hasHeroImg ? 'rgba(249,248,245,0.6)' : (project.textColor ? `${project.textColor}88` : 'var(--color-text-secondary)')
  const heroBackColor  = hasHeroImg ? 'rgba(249,248,245,0.55)' : undefined

  return (
    <div className="case-study">

      {/* ─── Hero ─── */}
      <div className="case-study__hero-bg" style={heroStyle}>
        <div className="container">
          <div
            ref={heroRef}
            className={`case-study__hero animate${heroIn ? ' in-view' : ''}`}
          >
            <div className="case-study__back">
              <Link
                to="/work"
                className="case-study__back-link"
                style={heroBackColor ? { color: heroBackColor } : {}}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                All Work
              </Link>
            </div>

            <div className="case-study__hero-tags">
              <span className="case-study__category-badge">{project.category}</span>
              {project.tags.map(tag => (
                <span key={tag} className="tag" style={{ background: 'rgba(255,255,255,0.45)' }}>{tag}</span>
              ))}
            </div>

            <h1 className="case-study__title" style={{ color: heroTextColor }}>
              {project.title}
            </h1>
            <p className="case-study__subtitle" style={{ color: heroSubColor }}>
              {project.subtitle}
            </p>
            <p className="case-study__tagline" style={{ color: heroTagColor }}>
              {project.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="container">

        {/* ─── Meta Bar ─── */}
        <div
          ref={metaRef}
          className={`case-study__meta animate${metaIn ? ' in-view' : ''}`}
        >
          {[
            { label: 'Role', value: project.role },
            { label: 'Duration', value: project.duration },
            { label: 'Year', value: project.year },
            { label: 'Tools', value: project.tools },
          ].filter(m => m.value).map(m => (
            <div key={m.label} className="case-study__meta-item">
              <label>{m.label}</label>
              <span>{m.value}</span>
            </div>
          ))}
        </div>

        {/* ─── Body ─── */}
        <div
          ref={bodyRef}
          className={`case-study__body animate${bodyIn ? ' in-view' : ''}`}
        >

          {project.overview && (
            <section className="case-study__section">
              <h2 className="case-study__section-title">Overview</h2>
              <p>{project.overview}</p>
            </section>
          )}

          {project.context && (
            <section className="case-study__section">
              <h2 className="case-study__section-title">Context</h2>
              <p>{project.context}</p>
            </section>
          )}

          {project.contextImage && (
            <div className="case-study__image-block case-study__image-block--context">
              <img src={project.contextImage} alt={`${project.title} context`} />
            </div>
          )}

          {project.challenge && (
            <div className="case-study__callout">
              <p className="case-study__callout-label">Design Question</p>
              <p className="case-study__callout-text">"{project.challenge}"</p>
            </div>
          )}

          {/* Full-bleed cover — only if a cover image exists */}
          {project.cover && (
            <div className="case-study__image-block" style={{ background: project.color }}>
              <img src={project.cover} alt={project.title} />
            </div>
          )}

          {project.myRole && (
            <section className="case-study__section">
              <h2 className="case-study__section-title">My Role</h2>
              <p>{project.myRole}</p>
            </section>
          )}

          {project.process && project.process.length > 0 && (
            <section className="case-study__section">
              <h2 className="case-study__section-title">Process</h2>
              <ul className="case-study__list">
                {project.process.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Process image — themed (deep bg) / full-view (contain) / standard */}
          {project.processImage && (
            project.processImageBg ? (
              <div
                className="case-study__process-bg-block"
                style={{ background: project.processImageBg }}
              >
                <img src={project.processImage} alt={`${project.title} process`} />
              </div>
            ) : (
              <div className={`case-study__image-block case-study__image-block--narrow${project.processImageContain ? " case-study__image-block--no-ratio" : ""}`}>
                <img
                  src={project.processImage}
                  alt={`${project.title} process`}
                  style={project.processImageContain ? { objectFit: "contain", height: "auto" } : {}}
                />
              </div>
            )
          )}

          {/* NMDP-specific: Core Insights */}
          {project.coreInsights && (
            <section className="case-study__section">
              <h2 className="case-study__section-title">Core Insights</h2>
              <div className="case-study__insights">
                {project.coreInsights.map((insight, i) => (
                  <div key={i} className="insight-card">
                    <h4 className="insight-card__title">{insight.title}</h4>
                    <p className="insight-card__body">{insight.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Kindred Care-specific: System Layers */}
          {project.systemLayers && (
            <section className="case-study__section">
              <h2 className="case-study__section-title">System Layers</h2>
              <div className="case-study__insights">
                {project.systemLayers.map((layer, i) => (
                  <div key={i} className="insight-card">
                    <h4 className="insight-card__title">{layer.title}</h4>
                    <p className="insight-card__body">{layer.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Scent Library / Listable-specific: Key Insights */}
          {project.insights && (
            <section className="case-study__section">
              <h2 className="case-study__section-title">Key Insights</h2>
              <ul className="case-study__list">
                {project.insights.map((insight, i) => (
                  <li key={i}>{insight}</li>
                ))}
              </ul>
            </section>
          )}

          {project.outcomes && (
            <section className="case-study__section">
              <h2 className="case-study__section-title">Outcomes</h2>
              <p>{project.outcomes}</p>
            </section>
          )}

          {project.outcomeVideo ? (
            <div className="case-study__video-block">
              <video
                src={project.outcomeVideo}
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>
          ) : project.outcomeImage && (
            <div className="case-study__image-block case-study__image-block--narrow">
              <img src={project.outcomeImage} alt={`${project.title} outcomes`} />
            </div>
          )}

          {project.images && project.images.length > 0 && (
            <div className="case-study__extra-images">
              {project.images.map((src, i) => (
                <div key={i} className="case-study__image-block case-study__image-block--narrow">
                  <img src={src} alt={`${project.title} visual ${i + 1}`} />
                </div>
              ))}
            </div>
          )}

          {/* HiFi screen grid — phone UI mockups shown at full proportion */}
          {project.hifiImages && project.hifiImages.length > 0 && (
            <div className="case-study__hifi-grid">
              {project.hifiImages.map((src, i) => (
                <div key={i} className="case-study__hifi-item">
                  <img src={src} alt={`${project.title} screen ${i + 1}`} />
                </div>
              ))}
            </div>
          )}

          {project.reflection && (
            <section className="case-study__section">
              <h2 className="case-study__section-title">Reflection</h2>
              <p>{project.reflection}</p>
            </section>
          )}

          {/* ─── Next Project ─── */}
          <div className="case-study__next">
            <NextProject currentSlug={slug} />
          </div>

        </div>
      </div>
    </div>
  )
}

function NextProject({ currentSlug }) {
  const idx = projects.findIndex(p => p.slug === currentSlug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <Link to={`/work/${next.slug}`} className="next-project">
      <div className="next-project__label">Next Project</div>
      <div className="next-project__card" style={{ background: next.color }}>
        <div>
          <p className="next-project__category" style={{ color: next.accentColor }}>{next.category}</p>
          <h3 className="next-project__title" style={{ color: next.textColor || 'var(--color-text)' }}>
            {next.title}
          </h3>
        </div>
        <div className="next-project__arrow" style={{ color: next.accentColor }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 19L19 5M19 5H7M19 5V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  )
}
