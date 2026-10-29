import React from 'react';
import '../styles/pages.css';

// Short navy page header for the inner pages (Services, Solutions, How We Work, FAQ).
export default function PageHero({ id, eyebrow, title, children }) {
  return (
    <section className="pg-hero pg-hero-compact pg-dark" aria-labelledby={id}>
      <div className="container pg-container">
        <span className="pg-eyebrow pg-eyebrow-dark">{eyebrow}</span>
        <h1 id={id} className="pg-hero-title">{title}</h1>
        {children && <p className="pg-hero-text">{children}</p>}
      </div>
    </section>
  );
}
