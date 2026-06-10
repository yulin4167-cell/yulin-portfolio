import { useInView } from '../hooks/useScrollAnimation'

export default function Resume() {
  const [headerRef, headerIn] = useInView({ threshold: 0.01 })
  const [viewerRef, viewerIn] = useInView({ threshold: 0.01 })

  return (
    <div className="resume-page">
      <div className="container">

        <header
          ref={headerRef}
          className={`resume-pdf__header animate${headerIn ? ' in-view' : ''}`}
        >
          <div className="resume-pdf__meta">
            <p className="section-label">Resume</p>
            <h1 className="resume-pdf__title">Yulin Li</h1>
            <p className="resume-pdf__subtitle">
              Interaction Designer · San Francisco · yulin4167@gmail.com
            </p>
          </div>
          <a
            href="/resume.pdf"
            download="Yulin-Li-Resume.pdf"
            className="btn btn--primary resume-pdf__download-btn"
          >
            Download PDF
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v8M4 7l4 4 4-4M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </header>

        <div
          ref={viewerRef}
          className={`resume-pdf__viewer animate${viewerIn ? ' in-view' : ''}`}
          style={{ transitionDelay: '60ms' }}
        >
          <iframe
            src="/resume.pdf"
            title="Yulin Li — Resume"
            className="resume-pdf__frame"
          />
        </div>

      </div>
    </div>
  )
}
