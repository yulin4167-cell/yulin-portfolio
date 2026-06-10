import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {new Date().getFullYear()} Yulin Li
        </p>
        <div className="footer__links">
          <a href="mailto:yulin4167@gmail.com" className="footer__link">
            Email
          </a>
          <a
            href="http://www.linkedin.com/in/yulin-li-1b256a380"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            LinkedIn
          </a>
          <Link to="/work" className="footer__link">
            Work
          </Link>
        </div>
      </div>
    </footer>
  )
}
