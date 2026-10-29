import React from 'react';
import PageHero from './PageHero';
import PageCTA from './PageCTA';
import '../styles/pages.css';

const steps = [
  {
    title: 'Tell us what you need',
    desc: 'Describe the problem or idea in your own words, by email or with the contact form. No technical knowledge needed.'
  },
  {
    title: 'Get a clear plan and price',
    desc: 'We explain what we suggest, how long it will take and what it costs, in plain language. Nothing starts until you agree.'
  },
  {
    title: 'We do the work',
    desc: 'We build or fix it and keep you updated along the way, with as little disruption to your business as possible.'
  },
  {
    title: 'Handover and support',
    desc: 'We test everything, show you how it works, hand over your logins and stay available if you need help later.'
  }
];

function Steps({ headingLevel }) {
  const Heading = `h${headingLevel}`;
  return (
    <ol className="pg-grid pg-grid-4 pg-steps">
      {steps.map((step) => (
        <li key={step.title} className="pg-card pg-step">
          <Heading>{step.title}</Heading>
          <p>{step.desc}</p>
        </li>
      ))}
    </ol>
  );
}

// The four-step process: a section on the home page, or the full How We Work page.
export default function HowWeWork({ page = false }) {
  if (page) {
    return (
      <div className="pg">
        <PageHero id="how-heading" eyebrow="How we work" title="Simple, Clear Steps From Start to Finish">
          You always know what is happening, what it costs and what comes next.
        </PageHero>
        <section className="pg-section pg-light" aria-label="Our process">
          <div className="container pg-container">
            <Steps headingLevel={2} />
          </div>
        </section>
        <PageCTA
          title="Ready for Step One?"
          text="Tell us what you need in your own words. We'll reply with questions or a clear plan and price."
        />
      </div>
    );
  }

  return (
    <section id="how-we-work" className="pg-section pg-white" aria-labelledby="how-we-work-heading">
      <div className="container pg-container">
        <div className="pg-section-head">
          <span className="pg-eyebrow">How it works</span>
          <h2 id="how-we-work-heading" className="pg-title">Simple Steps, No Surprises</h2>
          <p className="pg-lead">You always know what is happening, what it costs and what comes next.</p>
        </div>
        <Steps headingLevel={3} />
      </div>
    </section>
  );
}
