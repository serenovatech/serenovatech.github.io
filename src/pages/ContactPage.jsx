import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ClipboardList, Layers, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

import usePageMeta from '../hooks/usePageMeta';
import { companyInfo } from '../data/companyInfo';
import { contactFaqs, getContactMethods, quoteTips, serviceCategories } from '../data/contactData';
import { founder } from '../data/aboutData';
import { matchService } from '../utils/enquiry';
import FounderPhoto from '../components/FounderPhoto';
import { GithubIcon, LinkedInIcon } from '../components/SocialIcons';
import EnquiryForm from '../components/EnquiryForm';
import PageCTA from '../components/PageCTA';
import '../styles/pages.css';
import '../styles/contact.css';

const METHOD_ICONS = {
  email: () => <Mail size={22} aria-hidden="true" />,
  whatsapp: () => <MessageCircle size={22} aria-hidden="true" />,
  linkedin: () => <LinkedInIcon size={22} />,
  github: () => <GithubIcon size={22} />
};

function ContactMethodCard({ method }) {
  const Icon = METHOD_ICONS[method.id];
  return (
    <li className={`pg-card method-card${method.available ? '' : ' is-unavailable'}`}>
      <span className="pg-icon" aria-hidden="true"><Icon /></span>
      <h3>{method.label}</h3>
      <p>{method.description}</p>
      {method.available ? (
        <a
          href={method.href}
          className="pg-link method-link"
          {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {method.id === 'email' ? method.value : method.action}
          {method.external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      ) : (
        <p className="method-unavailable">Not configured yet (shown in development only)</p>
      )}
    </li>
  );
}

export default function ContactPage() {
  const location = useLocation();
  const initialService = matchService(location.state?.service);

  usePageMeta({
    title: 'Contact Serenova Tech | Website, Server & IT Support Enquiries',
    description:
      'Tell Serenova Tech about your website, Linux or NGINX server, hosting, networking or IT infrastructure project and explore a practical next step.',
    path: '/contact'
  });

  // Hide unconfigured methods on the live site; flag them during development.
  const methods = getContactMethods(companyInfo).filter((m) => m.available || import.meta.env.DEV);

  return (
    <div className="pg">
      {/* A. Hero */}
      <section className="pg-hero pg-dark" aria-labelledby="contact-hero-heading">
        <div className="container pg-container">
          <span className="pg-eyebrow pg-eyebrow-dark">Contact Serenova Tech</span>
          <h1 id="contact-hero-heading" className="pg-hero-title">Let's Talk About Your Project.</h1>
          <p className="pg-hero-text">
            Tell us what you are building, what needs fixing, or how you want to improve your IT infrastructure.
            We'll help you explore a practical next step.
          </p>
        </div>
      </section>

      {/* B. Contact methods */}
      {methods.length > 0 && (
        <section className="pg-section pg-light methods-section" aria-labelledby="methods-heading">
          <div className="container pg-container">
            <h2 id="methods-heading" className="pg-title pg-title-sm">Ways to reach us</h2>
            <ul className="pg-grid pg-grid-4 methods-grid">
              {methods.map((method) => (
                <ContactMethodCard key={method.id} method={method} />
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* C–F. Form and helpful information */}
      <section className="pg-section pg-white" aria-labelledby="enquiry-heading">
        <div className="container pg-container contact-layout">
          <div className="contact-form-col">
            <span className="pg-eyebrow">Project enquiry</span>
            <h2 id="enquiry-heading" className="pg-title">Tell Us About Your Project</h2>
            <EnquiryForm recipient={companyInfo.email} initialService={initialService} />
          </div>

          <aside className="contact-info-col" aria-label="Helpful information">
            <div className="pg-card founder-card">
              <FounderPhoto className="founder-card-photo" size={72} alt="" />
              <div>
                <p className="founder-card-label">Who you'll work with</p>
                <p className="founder-card-name">{founder.name}</p>
                <p className="founder-card-text">
                  Your enquiry goes straight to the founder, with no sales team in between.
                </p>
              </div>
            </div>

            <div className="pg-card info-card">
              <h3><ClipboardList size={18} aria-hidden="true" /> What helps us prepare a quote</h3>
              <ul className="info-list">
                {quoteTips.map((tip) => <li key={tip}>{tip}</li>)}
              </ul>
              <p className="info-note">
                Project scope, timelines and pricing depend on your requirements. We will confirm them with you before
                any work begins.
              </p>
            </div>

            <div className="pg-card info-card">
              <h3><Layers size={18} aria-hidden="true" /> Typical services</h3>
              <ul className="pg-tags">
                {serviceCategories.map((service) => <li key={service} className="pg-tag">{service}</li>)}
              </ul>
              <p className="info-links">
                <Link to="/services" className="pg-link">Browse our services</Link>
                <Link to="/about" className="pg-link">Learn about Serenova Tech</Link>
              </p>
            </div>

            <div className="pg-card info-card" id="privacy-notice">
              <h3><ShieldCheck size={18} aria-hidden="true" /> Your privacy</h3>
              <p>
                This website does not collect, store or transmit what you type into the form. Your details stay in your
                browser until you choose to send the email from your own email app, or copy them.
              </p>
              <p>
                When you email us, we use your details only to respond to your enquiry and discuss your project. We do
                not sell or share them with third parties.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="pg-section pg-light" aria-labelledby="faq-heading">
        <div className="container pg-container pg-narrow">
          <div className="pg-section-head">
            <span className="pg-eyebrow">FAQ</span>
            <h2 id="faq-heading" className="pg-title">Common Questions About Enquiries</h2>
          </div>
          <div className="faq-list">
            {contactFaqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>
                  <span>{faq.question}</span>
                  <ChevronDown size={18} aria-hidden="true" className="faq-chevron" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Not Sure Where to Start?"
        text="See how Serenova Tech combines infrastructure engineering with web development, and the kind of work we do."
        to="/about"
        label="About Serenova Tech"
        secondary={{ to: '/services', label: 'Explore Our Services' }}
      />
    </div>
  );
}
