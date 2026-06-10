import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useScrollAnimation'
import yulinDanceImg from '../assets/US作品集网站用图/个人爱好展示图1（热爱跳舞）.png'
import yulinFoodImg  from '../assets/US作品集网站用图/个人爱好展示图3（热爱探索美食）.png'
import yulinPetImg   from '../assets/US作品集网站用图/个人爱好展示图2（喜欢小动物，家有萌宠叫薯条）.png'

export default function About() {
  const [heroRef, heroIn] = useInView({ threshold: 0.01 })
  const [bioRef, bioIn] = useInView()
  const [processRef, processIn] = useInView()
  const [interestsRef, interestsIn] = useInView()

  return (
    <div className="about-page">
      <div className="container">

        {/* ─── Hero ─── */}
        <header
          ref={heroRef}
          className={`about-page__hero animate${heroIn ? ' in-view' : ''}`}
        >
          <p className="section-label">About</p>
          <h1 className="about-page__title">
            Designing for the space<br />
            <em>between</em> people<br />
            and systems.
          </h1>
          <p className="about-page__subtitle">
            UX & Interaction Designer — San Francisco Bay Area
          </p>
        </header>

        {/* ─── Bio + Sidebar ─── */}
        <div
          ref={bioRef}
          className={`about-page__body animate${bioIn ? ' in-view' : ''}`}
        >
          <div className="about-page__bio">
            <p>
              I'm Yulin Li (李俞霖) — an MDes Interaction Design candidate at
              California College of the Arts. I'm an interaction designer focused
              on transforming complex experiences into designs that feel clear,
              understandable, and genuinely supportive.
            </p>
            <p>
              My background combines digital media art (Beijing Jiaotong University),
              UX research, service design, and systems thinking. That cross-disciplinary
              foundation means I approach design from multiple angles simultaneously:
              visual logic, interaction flow, user psychology, and the institutional
              structures that shape what's even possible.
            </p>
            <p>
              My practice centers on the relationship between people and systems —
              specifically, the moments where people get confused, hesitate, or give
              up, and what it would take to turn those into moments of clarity and
              support instead. I'm skilled at extracting the real problem from user
              scenarios, emotional needs, and business constraints, then translating
              it into information architecture, interaction flows, prototypes, and
              experience strategy.
            </p>
            <p>
              I'm currently seeking full-time roles in Product Design, UX Design,
              or Interaction Design in the United States.
            </p>
            <div className="about-page__cta">
              <a href="mailto:yulin4167@gmail.com" className="btn btn--primary">
                Get in Touch
              </a>
              <Link to="/resume" className="btn btn--ghost">
                View Resume
              </Link>
            </div>
          </div>

          <aside className="about-page__sidebar">
            <div className="about-page__sidebar-section">
              <h3 className="sidebar-label">Education</h3>
              <ul>
                <li>
                  <strong>MDes, Interaction Design</strong>
                  <br />California College of the Arts
                  <br /><span className="text-tertiary">San Francisco · 2023–2025</span>
                </li>
                <li style={{ marginTop: '1.5rem' }}>
                  <strong>BA, Digital Media Art</strong>
                  <br />Beijing Jiaotong University
                  <br /><span className="text-tertiary">Beijing · 2019–2023</span>
                </li>
              </ul>
            </div>

            <div className="about-page__sidebar-section">
              <h3 className="sidebar-label">Focus Areas</h3>
              <ul>
                <li>UX Research & Strategy</li>
                <li>Interaction Design</li>
                <li>Service Design</li>
                <li>Systems Thinking</li>
                <li>AI-Assisted Prototyping</li>
                <li>Embodied Interaction</li>
                <li>Health & Social Impact Design</li>
              </ul>
            </div>

            <div className="about-page__sidebar-section">
              <h3 className="sidebar-label">Tools</h3>
              <ul>
                <li>Figma · Framer</li>
                <li>Midjourney · Claude</li>
                <li>Photoshop · Illustrator</li>
                <li>SketchUp · Blender</li>
                <li>VS Code · GitHub</li>
                <li>AI-assisted design tools</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* ─── Process ─── */}
        <div
          ref={processRef}
          className={`about-page__process animate${processIn ? ' in-view' : ''}`}
        >
          <p className="section-label">How I Work</p>
          <div className="about-page__process-grid">
            {[
              {
                num: '01',
                title: 'Research',
                body: 'I start with curiosity about people — not just what they say, but what they do, avoid, and feel embarrassed to admit. I use qualitative methods (interviews, observation, co-design) to surface what surveys miss.',
              },
              {
                num: '02',
                title: 'Systems',
                body: 'Most interesting design problems are system problems. I use stakeholder maps, causal loop diagrams, and journey maps to make complexity visible — finding the leverage points that no single touchpoint can fix alone.',
              },
              {
                num: '03',
                title: 'Iteration',
                body: 'I prototype at the speed of thought and test early. Every round of feedback sharpens the concept rather than just validating it. I\'m as comfortable with rough paper sketches as high-fidelity Figma flows.',
              },
              {
                num: '04',
                title: 'Craft',
                body: 'Details that feel inevitable, not decorative. From macro flow to micro-interaction, I care about the quality of experience at every scale — including the moments users don\'t consciously notice.',
              },
            ].map(step => (
              <div key={step.num} className="process-card">
                <span className="process-card__num">{step.num}</span>
                <h3 className="process-card__title">{step.title}</h3>
                <p className="process-card__body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Outside Design ─── */}
        <div
          ref={interestsRef}
          className={`about-page__interests animate${interestsIn ? ' in-view' : ''}`}
        >
          <p className="section-label">Outside of Design</p>
          <div className="about-page__interests-grid">
            <div className="interest-block">
              <h3 className="interest-block__title">Dance & Fitness</h3>
              <p>
                I dance, which means I pay attention to how bodies move through
                space, register rhythm, and give and receive feedback. This
                shows up directly in my interest in embodied interaction —
                designing for physical experience, not just screen behavior.
              </p>
            </div>
            <div className="interest-block">
              <h3 className="interest-block__title">Food Exploration</h3>
              <p>
                Exploring food means studying how culture, scent, texture, and
                context shape emotion and memory. It's taught me that experience
                design is always multi-sensory — even when the product is digital.
              </p>
            </div>
            <div className="interest-block">
              <h3 className="interest-block__title">Small Animals & Nature</h3>
              <p>
                Small pets and natural environments give me a language for
                companionship, healing, and the quiet relationships between
                people and their surroundings. They make me a better designer
                for care, wellness, and emotionally sensitive contexts.
              </p>
            </div>
          </div>
          <div className="about-page__photos" aria-hidden="true">
            <img src={yulinDanceImg} alt="Yulin dancing"    className="about-page__photo" />
            <img src={yulinFoodImg}  alt="Food exploration" className="about-page__photo" />
            <img src={yulinPetImg}   alt="Yulin's pet"      className="about-page__photo" />
          </div>

          <blockquote className="about-page__quote">
            "Design inspiration doesn't only come from screens and products.
            It comes from a body in motion, a taste, a spatial atmosphere,
            or the natural connection between a person and an animal.
            These are the experiences that make me want to design things
            that feel warm, sensory, and close to real life."
          </blockquote>
        </div>

      </div>
    </div>
  )
}
