import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { assetUrl } from '../config/site';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Solutions, How We Work and FAQ remain available from the footer.
  // Items without a sectionId always open their own page.
  const navItems = [
    { label: 'Home', path: '/', sectionId: 'hero' },
    { label: 'Services', path: '/services', sectionId: 'services' },
    { label: 'Projects', path: '/projects', sectionId: 'projects' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' }
  ];

  const isActive = (item) =>
    item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);

    if (location.pathname === '/' && item.sectionId) {
      const element = document.getElementById(item.sectionId);
      if (element) {
        const headerOffset = 76;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        return;
      }
    }

    if (location.pathname === item.path) {
      // Already on this page: there's no route change, so scroll up here.
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // ScrollToTop (App.jsx) resets the scroll once the new page renders.
    navigate(item.path);
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-inner">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="logo-brand" 
          onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          aria-label={`${companyInfo.name} Homepage`}
        >
          <img 
            src={assetUrl('/assets/Serenova logo.png')} 
            alt={`${companyInfo.name} Logo`} 
            className="logo-img"
            width="110"
            height="44" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop nav-links" aria-label="Main Navigation">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <button
                key={item.label}
                className={`nav-link ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => handleNavClick(item)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action CTA & Mobile Toggle */}
        <div className="header-right">
          <Link
            to="/contact"
            className="btn btn-primary header-cta-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Discuss a Project</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        id="mobile-navigation-drawer"
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="mobile-drawer-links" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-link ${isActive(item) ? 'active' : ''}`}
              aria-current={isActive(item) ? 'page' : undefined}
              onClick={() => handleNavClick(item)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', textAlign: 'left', width: '100%' }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mobile-drawer-cta">
          <Link
            to="/contact"
            className="btn btn-primary mobile-cta-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Discuss a Project</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
