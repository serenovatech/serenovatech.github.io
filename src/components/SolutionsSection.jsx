import React from 'react';
import { Building2, Rocket, Users, Wrench, ArrowRight } from 'lucide-react';
import PageHero from './PageHero';
import PageCTA from './PageCTA';
import '../styles/pages.css';

const solutions = [
  {
    id: 'small-business',
    icon: Building2,
    title: 'Small Businesses',
    tagline: 'You run a business and need your website and IT to just work.',
    problems: [
      'No one in-house to call when something breaks.',
      'Worried about your website going down or being hacked.',
      'Your website or systems feel slow and out of date.'
    ],
    help: 'We act as your go-to IT person: we keep your website and servers healthy, secure and backed up, and fix problems when they appear.'
  },
  {
    id: 'startups',
    icon: Rocket,
    title: 'Startups',
    tagline: 'You are launching a product and want hosting set up properly from day one.',
    problems: [
      'Hosting bills that are higher than they should be.',
      'Releasing updates takes too long and feels risky.',
      'No one has checked the security yet.'
    ],
    help: 'We set up simple, secure hosting that can grow with you, with an easy way to release updates and costs you can understand.'
  },
  {
    id: 'agencies',
    icon: Users,
    title: 'Web & Marketing Agencies',
    tagline: 'You design websites and need someone reliable for the hosting and server side.',
    problems: [
      'Your team loses time on server setup and errors.',
      'Client websites break after updates or moves.',
      'You don’t want to hire a full-time developer.'
    ],
    help: 'We handle hosting, security and fixes behind the scenes, so your team can focus on design and your clients.'
  },
  {
    id: 'one-time-fixes',
    icon: Wrench,
    title: 'One-Time Fixes',
    tagline: 'Something is broken and you need it fixed.',
    problems: [
      'A “Not secure” warning on your website.',
      'Your website shows an error or won’t load.',
      'You can’t get into your server or hosting.'
    ],
    help: 'We find the cause, fix it properly and tell you in plain words what went wrong and how to avoid it next time.'
  }
];

export default function SolutionsSection({ onOpenConsultation }) {
  return (
    <div className="pg">
      <PageHero id="solutions-heading" eyebrow="Who we help" title="Help That Fits the Way You Work">
        Whether you run a small business, a startup or an agency, or just need one problem fixed, here is how we can
        help.
      </PageHero>

      <section id="solutions" className="pg-section pg-light" aria-label="Who we help">
        <div className="container pg-container">
          <ul className="pg-grid pg-grid-2">
            {solutions.map(({ id, icon: IconComp, title, tagline, problems, help }) => (
              <li key={id} className="pg-card sol-card">
                <span className="pg-icon"><IconComp size={22} aria-hidden="true" /></span>
                <div>
                  <h2 className="pg-card-title">{title}</h2>
                  <p>{tagline}</p>
                </div>
                <div>
                  <h3>Sounds familiar?</h3>
                  <ul>
                    {problems.map((problem) => <li key={problem}>{problem}</li>)}
                  </ul>
                </div>
                <div>
                  <h3>How we help</h3>
                  <p>{help}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => onOpenConsultation && onOpenConsultation(title)}
                  aria-label={`Talk to us about help for ${title.toLowerCase()}`}
                >
                  <span>Talk to us</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCTA
        title="Not Sure Where You Fit?"
        text="It doesn't matter. Tell us what's going on and we'll take it from there."
      />
    </div>
  );
}
