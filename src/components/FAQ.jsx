import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { api } from '../admin/services/api';
import { IS_STATIC_SITE } from '../config/site';
import PageHero from './PageHero';
import PageCTA from './PageCTA';
import '../styles/pages.css';

// Plain-language answers. Keep them honest: no response-time guarantees,
// certifications or round-the-clock promises unless they are actually offered.
const fallbackFaqs = [
  {
    id: 1,
    question: "I'm not technical. Can you still help me?",
    answer: 'Yes. Tell us the problem in your own words, for example "my website is slow" or "our Wi-Fi keeps dropping". We explain the options in plain language before any work starts.'
  },
  {
    id: 2,
    question: 'How much does it cost?',
    answer: 'It depends on the job. Some services show a starting price; for everything else we send you a clear quote first. You decide before any work begins.'
  },
  {
    id: 3,
    question: 'How do I get a quote?',
    answer: 'Send us a message from the Contact page, describing what you need. We reply with any questions we have, or with a quote.'
  },
  {
    id: 4,
    question: 'I already have a website, server or network. Can you fix it?',
    answer: 'Yes. We can look at what you already have, find out what is wrong and fix it, even if someone else set it up.'
  },
  {
    id: 5,
    question: 'Do you work with clients outside Sri Lanka?',
    answer: 'Yes. Most work, such as websites, hosting and server support, can be done remotely, so we help clients in Sri Lanka and internationally.'
  },
  {
    id: 6,
    question: 'Can you look after my website after it is finished?',
    answer: 'Yes. We offer ongoing care: updates, backups and fixes when something breaks. Ask us about a maintenance plan.'
  },
  {
    id: 7,
    question: 'Is my login information safe with you?',
    answer: 'We only ask for the access a job needs, and we recommend changing those passwords once the work is finished.'
  }
];

function FaqList({ faqs }) {
  return (
    <div className="pg-faq">
      {faqs.map((faq, index) => (
        <details key={faq.id || index} className="pg-faq-item" open={index === 0}>
          <summary>
            <span>{faq.question}</span>
            <ChevronDown size={18} aria-hidden="true" />
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

// Common questions: a short section on the home page (`limit`), or the full FAQ page.
export default function FAQ({ page = false, limit }) {
  const [faqs, setFaqs] = useState(fallbackFaqs);

  useEffect(() => {
    if (IS_STATIC_SITE) return;
    async function loadFaqs() {
      try {
        const res = await api.getPublicFaqs();
        if (res && res.success && res.faqs && res.faqs.length > 0) {
          setFaqs(res.faqs);
        }
      } catch (e) {
        console.warn('FAQ fetch fallback:', e.message);
      }
    }
    loadFaqs();
  }, []);

  if (page) {
    return (
      <div className="pg">
        <PageHero id="faq-heading" eyebrow="FAQ" title="Questions People Often Ask">
          Short, honest answers. If yours isn't here, just ask us.
        </PageHero>
        <section className="pg-section pg-light" aria-label="Questions and answers">
          <div className="container pg-container pg-narrow">
            <FaqList faqs={faqs} />
          </div>
        </section>
        <PageCTA title="Still Have a Question?" text="Send us a message and we'll answer it in plain language." />
      </div>
    );
  }

  return (
    <section id="faq" className="pg-section pg-light" aria-labelledby="faq-section-heading">
      <div className="container pg-container pg-narrow">
        <div className="pg-section-head">
          <span className="pg-eyebrow">Questions</span>
          <h2 id="faq-section-heading" className="pg-title">Common Questions</h2>
        </div>
        <FaqList faqs={limit ? faqs.slice(0, limit) : faqs} />
        <p className="pg-note">
          <Link to="/faq" className="pg-link">
            See all questions <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
