import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, FileCheck2, Globe, MessageCircleQuestion, MessagesSquare, Server, ShieldAlert, UserRound,
  Wifi, Wrench
} from 'lucide-react';

import { founder } from '../data/aboutData';
import HowWeWork from '../components/HowWeWork';
import FAQ from '../components/FAQ';
import PageCTA from '../components/PageCTA';
import '../styles/pages.css';

const PROMISES = [
  { icon: MessagesSquare, title: 'Plain language', text: 'No jargon. We explain everything simply.' },
  { icon: FileCheck2, title: 'Clear price first', text: 'You approve the quote before work starts.' },
  { icon: Globe, title: 'Local or remote', text: 'Help in Sri Lanka and online worldwide.' },
  { icon: UserRound, title: 'Direct contact', text: `Talk directly with the founder, ${founder.name.split(' ')[0]}.` }
];

// Written as the visitor would describe their problem, each linking to the matching service.
const HELP_OPTIONS = [
  {
    icon: Code2,
    title: 'I need a new website',
    text: 'A professional website that works well on phones and helps customers get in touch.',
    to: '/services/website-development'
  },
  {
    icon: ShieldAlert,
    title: 'My website is slow, broken or "Not secure"',
    text: 'We find the problem and fix it, including the padlock (SSL) in the address bar.',
    to: '/services/nginx-web-hosting-support'
  },
  {
    icon: Wrench,
    title: 'I want someone to look after my website',
    text: 'Backups, updates and quick fixes, so your website keeps running without you worrying.',
    to: '/services/website-deployment-maintenance'
  },
  {
    icon: Server,
    title: 'I need help with a server or hosting',
    text: 'Setup, security and ongoing care for Linux, Windows and cloud servers.',
    to: '/services'
  },
  {
    icon: Wifi,
    title: 'Our office internet or network keeps failing',
    text: 'Routers, Wi-Fi, firewalls and safe access for staff working from home.',
    to: '/services/network-setup-troubleshooting'
  },
  {
    icon: MessageCircleQuestion,
    title: "I'm not sure what I need",
    text: "Tell us the problem in your own words and we'll suggest the simplest fix.",
    to: '/contact'
  }
];

export default function HomePage({ finalSection }) {
  return (
    <div className="pg">
      <section id="hero" className="pg-hero pg-dark" aria-labelledby="home-heading">
        <div className="container pg-container pg-hero-split">
          <div>
            <span className="pg-eyebrow pg-eyebrow-dark">Serenova Tech</span>
            <h1 id="home-heading" className="pg-hero-title">
              Websites and IT Support for Small Businesses, Explained Simply.
            </h1>
            <p className="pg-hero-text">
              We build websites, keep them online and secure, and fix server, cloud and network problems. You get clear
              advice in plain language, with no technical jargon.
            </p>
            <div className="pg-actions">
              <Link to="/contact" className="btn btn-primary">
                <span>Get Free Advice</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/services" className="btn btn-secondary">See Our Services</Link>
            </div>
          </div>

          <div className="hero-panel">
            <p className="hero-panel-title">Why people choose us</p>
            <ul>
              {PROMISES.map(({ icon: PromiseIcon, title, text }) => (
                <li key={title}>
                  <span className="hero-panel-icon"><PromiseIcon size={18} aria-hidden="true" /></span>
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

      <section id="services" className="pg-section pg-light" aria-labelledby="help-heading">
        <div className="container pg-container">
          <div className="pg-section-head">
            <span className="pg-eyebrow">How can we help?</span>
            <h2 id="help-heading" className="pg-title">Choose What Sounds Like You</h2>
            <p className="pg-lead">No technical words needed. Pick the closest match to find out how we can help.</p>
          </div>
          <ul className="pg-grid pg-grid-3">
            {HELP_OPTIONS.map(({ icon: OptionIcon, title, text, to }) => (
              <li key={title}>
                <Link to={to} className="pg-card pg-card-link">
                  <span className="pg-icon"><OptionIcon size={22} aria-hidden="true" /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="pg-card-more">
                    {to === '/contact' ? 'Ask us' : 'Find out more'}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HowWeWork />

      <FAQ limit={4} />

      {finalSection || (
        <PageCTA
          title="Have a Technology Problem?"
          text="Tell us about it. We'll reply with a clear, practical suggestion, in plain language."
          secondary={{ to: '/projects', label: 'See Our Work' }}
        />
      )}
    </div>
  );
}
