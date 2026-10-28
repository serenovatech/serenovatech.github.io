import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Code2, CloudUpload, Compass, GitBranch, GraduationCap,
  Layers, Lightbulb, Lock, MessagesSquare, Network, Server, ShieldCheck, Target, Terminal, Users
} from 'lucide-react';

import {
  coreValues, differentiators, expertise, expertiseLevels, founder, growthAreas, mission, vision
} from '../data/aboutData';
import FounderPhoto from '../components/FounderPhoto';
import PortfolioSection from '../components/PortfolioSection';
import PageCTA from '../components/PageCTA';
import '../styles/pages.css';
import '../styles/about.css';

const ICONS = {
  Code2, CloudUpload, GitBranch, GraduationCap, Layers, Lightbulb, Lock, MessagesSquare, Network, Server,
  ShieldCheck, Terminal, Users
};

const HERO_SERVICES = [
  { icon: Code2, title: 'Websites', text: 'Design, development and updates' },
  { icon: Terminal, title: 'Linux & NGINX servers', text: 'Setup, fixes and hardening' },
  { icon: CloudUpload, title: 'Hosting & deployment', text: 'DNS, SSL and going live' },
  { icon: Network, title: 'IT infrastructure', text: 'Networks, servers and support' }
];

function Icon({ name, size = 22 }) {
  const Component = ICONS[name];
  return Component ? <Component size={size} aria-hidden="true" /> : null;
}

export default function AboutPage() {
  return (
    <div className="pg">
      {/* A. Hero */}
      <section className="pg-hero pg-dark" aria-labelledby="about-hero-heading">
        <div className="container pg-container about-hero">
          <div>
            <span className="pg-eyebrow pg-eyebrow-dark">About Serenova Tech</span>
            <h1 id="about-hero-heading" className="pg-hero-title">
              Technology That Moves Your Business Forward.
            </h1>
            <p className="pg-hero-text">
              Serenova Tech helps businesses build, improve, and maintain their digital foundations through practical IT
              infrastructure, web development, server management, and technology consulting.
            </p>
            <div className="pg-actions">
              <Link to="/contact" className="btn btn-primary">
                <span>Let's Discuss Your Project</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/services" className="btn btn-secondary">Explore Our Services</Link>
            </div>
            <p className="pg-tagline">Innovating Technology. Empowering Growth.</p>
          </div>

          <div className="hero-panel">
            <p className="hero-panel-title">What we help with</p>
            <ul>
              {HERO_SERVICES.map(({ icon: ServiceIcon, title, text }) => (
                <li key={title}>
                  <span className="hero-panel-icon"><ServiceIcon size={18} aria-hidden="true" /></span>
                  <span>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* B. About Serenova Tech */}
      <section className="pg-section pg-light" aria-labelledby="about-intro-heading">
        <div className="container pg-container pg-split">
          <div>
            <span className="pg-eyebrow">Who we are</span>
            <h2 id="about-intro-heading" className="pg-title">Reliable Technology, Without Unnecessary Complexity</h2>
          </div>
          <div className="pg-prose">
            <p>
              Serenova Tech was created around a simple idea: businesses should have access to reliable technology
              solutions without unnecessary complexity. By combining hands-on infrastructure experience with web
              development and practical technical problem-solving, we aim to help businesses build a stronger digital
              foundation.
            </p>
            <p>
              We are a growing technology brand working with small and medium-sized businesses, startups, agencies and
              freelancers in Sri Lanka and internationally, whether you need a new website, dependable hosting, help
              with a Linux server or support with your network and IT infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* C. Founder */}
      <section className="pg-section pg-white" aria-labelledby="founder-heading">
        <div className="container pg-container founder">
          <figure className="founder-profile">
            <div className="founder-photo-frame">
              <FounderPhoto className="founder-photo" size={480} />
            </div>
            <figcaption>
              <span className="founder-name">{founder.name}</span>
              <span className="founder-role">{founder.role}</span>
            </figcaption>
          </figure>

          <div className="founder-body">
            <span className="pg-eyebrow">Founder</span>
            <h2 id="founder-heading" className="pg-title">Built on Practical Engineering Experience.</h2>
            <div className="pg-prose">
              <p>
                Serenova Tech is driven by {founder.name}, an IT professional with a background in system engineering,
                enterprise infrastructure, networking, Linux administration and web technologies. With more than three
                years of hands-on experience, his work spans Windows and Linux environments, server virtualization,
                network troubleshooting, web hosting and infrastructure maintenance.
              </p>
              <p>
                Through Serenova Tech, he aims to help businesses solve practical technology problems, establish
                dependable digital services and improve their IT environments with solutions that are secure,
                maintainable and fit for purpose.
              </p>
            </div>

            <dl className="founder-highlights">
              {founder.highlights.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="pg-tags founder-focus" aria-label="Focus areas">
              {founder.focusAreas.map((area) => <li key={area} className="pg-tag">{area}</li>)}
            </ul>

            <Link to="/contact" className="pg-link founder-cta">
              Talk to {founder.name.split(' ')[0]} about your project
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* D. Mission and vision */}
      <section className="pg-section pg-light" aria-labelledby="mission-heading">
        <div className="container pg-container">
          <h2 id="mission-heading" className="sr-only">Mission and vision</h2>
          <div className="pg-grid pg-grid-2">
            <div className="pg-card mv-card">
              <span className="pg-icon"><Target size={22} aria-hidden="true" /></span>
              <h3>Our Mission</h3>
              <p>{mission}</p>
            </div>
            <div className="pg-card mv-card">
              <span className="pg-icon pg-icon-teal"><Compass size={22} aria-hidden="true" /></span>
              <h3>Our Vision</h3>
              <p>{vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* F. What makes us different */}
      <section className="pg-section pg-white" aria-labelledby="different-heading">
        <div className="container pg-container">
          <div className="pg-section-head">
            <span className="pg-eyebrow">Why Serenova Tech</span>
            <h2 id="different-heading" className="pg-title">What Makes Serenova Tech Different?</h2>
          </div>
          <ul className="pg-grid pg-grid-3 diff-list">
            {differentiators.map((item) => (
              <li key={item.title} className="diff-item">
                <CheckCircle2 size={20} aria-hidden="true" className="diff-check" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* G. Technical expertise */}
      <section className="pg-section pg-light" aria-labelledby="expertise-heading">
        <div className="container pg-container">
          <div className="pg-section-head">
            <span className="pg-eyebrow">Technical expertise</span>
            <h2 id="expertise-heading" className="pg-title">Services and Technical Expertise</h2>
            <p className="pg-lead">
              Each area is labelled to show whether it comes from professional roles, or from projects and ongoing
              development. No skill bars or percentages, just an honest picture.
            </p>
          </div>

          <div className="pg-grid pg-grid-4">
            {expertise.map((area) => (
              <article key={area.title} className="pg-card expertise-card">
                <span className="pg-icon"><Icon name={area.icon} /></span>
                <h3>{area.title}</h3>
                <p>{area.summary}</p>
                <p className={`expertise-level level-${area.level}`}>{expertiseLevels[area.level]}</p>
                <ul className="pg-tags" aria-label={`${area.title} technologies`}>
                  {area.tags.map((tag) => (
                    <li key={tag} className="pg-tag">{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="growth-note">
            <strong>Currently developing:</strong> {growthAreas.join(', ')}.{' '}
            <Link to="/services" className="pg-link">See the services we offer</Link>
          </p>
        </div>
      </section>

      {/* H. Portfolio */}
      <PortfolioSection id="portfolio" />

      {/* E. Core values */}
      <section className="pg-section pg-white" aria-labelledby="values-heading">
        <div className="container pg-container">
          <div className="pg-section-head">
            <span className="pg-eyebrow">Core values</span>
            <h2 id="values-heading" className="pg-title">What We Stand For</h2>
          </div>
          <div className="pg-grid pg-grid-3">
            {coreValues.map((value) => (
              <div key={value.title} className="pg-card value-card">
                <span className="pg-icon pg-icon-teal"><Icon name={value.icon} /></span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* I. Final CTA */}
      <PageCTA
        title="Have a Technology Challenge?"
        text="Whether you need a website, reliable server hosting, infrastructure support, or help planning your next technology project, let's discuss a practical solution."
      />
    </div>
  );
}
