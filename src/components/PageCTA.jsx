import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../styles/pages.css';

// Navy call-to-action band used at the end of the About and Contact pages.
export default function PageCTA({ title, text, to = '/contact', label = 'Contact Serenova Tech', secondary }) {
  return (
    <section className="pg-section pg-dark pg-cta" aria-labelledby="page-cta-heading">
      <div className="container pg-container pg-cta-inner">
        <h2 id="page-cta-heading" className="pg-title">{title}</h2>
        <p className="pg-lead">{text}</p>
        <div className="pg-actions">
          <Link to={to} className="btn btn-primary">
            <span>{label}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          {secondary && (
            <Link to={secondary.to} className="btn btn-secondary">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
