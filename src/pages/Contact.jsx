import { useState } from 'react'
import { useInView } from '../hooks/useScrollAnimation'

export default function Contact() {
  const [heroRef, heroIn] = useInView({ threshold: 0.01 })
  const [formRef, formIn] = useInView()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Replace with your actual form submission logic
    setSent(true)
  }

  return (
    <div className="contact-page">
      <div className="container">

        <header
          ref={heroRef}
          className={`contact-page__hero animate${heroIn ? ' in-view' : ''}`}
        >
          <p className="section-label">Contact</p>
          <h1 className="contact-page__title">
            Let's make something
            <br />
            <em>worth making.</em>
          </h1>
          <p className="contact-page__subtitle">
            I'm open to full-time roles, freelance projects, and conversations about
            design. Say hello — I respond within 48 hours.
          </p>
        </header>

        <div
          ref={formRef}
          className={`contact-page__body animate${formIn ? ' in-view' : ''}`}
        >
          <div className="contact-page__info">
            <div className="contact-page__info-section">
              <h3 className="sidebar-label">Email</h3>
              <a href="mailto:yulin4167@gmail.com" className="contact-page__link">
                yulin4167@gmail.com
              </a>
            </div>
            <div className="contact-page__info-section">
              <h3 className="sidebar-label">LinkedIn</h3>
              <a
                href="http://www.linkedin.com/in/yulin-li-1b256a380"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page__link"
              >
                linkedin.com/in/yulin-li-1b256a380
              </a>
            </div>
            <div className="contact-page__info-section">
              <h3 className="sidebar-label">Location</h3>
              <p className="contact-page__text">San Francisco Bay Area, CA</p>
              <p className="contact-page__text">Open to relocation in the US</p>
            </div>
            <div className="contact-page__info-section">
              <h3 className="sidebar-label">Availability</h3>
              <p className="contact-page__text">Available for full-time roles</p>
              <p className="contact-page__text" style={{ color: 'var(--color-accent)' }}>
                ● Open to work
              </p>
            </div>
          </div>

          <div className="contact-page__form-wrapper">
            {sent ? (
              <div className="contact-page__success">
                <p className="contact-page__success-title">Message sent.</p>
                <p className="contact-page__success-body">
                  Thank you for reaching out. I'll be in touch within 48 hours.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="name" className="contact-form__label">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="contact-form__input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="email" className="contact-form__label">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="contact-form__input"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="contact-form__field">
                  <label htmlFor="message" className="contact-form__label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="contact-form__input contact-form__textarea"
                    placeholder="Tell me about your project or role..."
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn--primary contact-form__submit">
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
