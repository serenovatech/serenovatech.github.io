import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { api } from '../admin/services/api';
import { IS_STATIC_SITE } from '../config/site';
import PageHero from './PageHero';
import PageCTA from './PageCTA';
import '../styles/pages.css';
import {
  Server,
  Globe,
  ShieldCheck,
  Network,
  Rocket,
  Activity,
  Cloud,
  Monitor,
  Code2,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Server,
  Globe,
  ShieldCheck,
  Network,
  Rocket,
  Activity,
  Cloud,
  Monitor,
  Code2
};

// The Services page: every service in plain language, with the technical
// detail kept on each service's own page.
export default function Services({ onOpenConsultation }) {
  const [services, setServices] = useState(servicesData);

  useEffect(() => {
    if (IS_STATIC_SITE) return;
    async function loadPublicServices() {
      try {
        const res = await api.getPublicServices();
        if (res && res.success && res.services && res.services.length > 0) {
          setServices(res.services);
        }
      } catch (e) {
        console.warn('Public services fetch fallback:', e.message);
      }
    }
    loadPublicServices();
  }, []);

  return (
    <div className="pg">
      <PageHero id="services-heading" eyebrow="Our services" title="What We Can Do for Your Business">
        Websites, hosting, servers and networks, explained simply. Pick the one that sounds closest to what you need,
        or just tell us the problem.
      </PageHero>

      <section id="services" className="pg-section pg-light" aria-label="Services">
        <div className="container pg-container">
          <ul className="pg-grid pg-grid-3">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon_name || service.iconName] || Server;
              const slug = service.slug || service.id;
              const startingPrice = service.starting_price || service.startingPrice;

              return (
                <li key={service.id || slug} className="pg-card svc-card">
                  <span className="pg-icon"><IconComponent size={22} aria-hidden="true" /></span>
                  <h2 className="pg-card-title">{service.title}</h2>
                  <p>{service.plainDesc || service.short_desc || service.shortDesc}</p>
                  {startingPrice && <p className="svc-price">{startingPrice}</p>}

                  <div className="svc-actions">
                    <Link to={`/services/${slug}`} className="btn btn-light btn-sm">
                      <span>Learn more</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => onOpenConsultation(service.title)}
                      aria-label={`Ask about ${service.title}`}
                    >
                      Ask about this
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="pg-note">
            Prices are a starting point. Every job is different, so you always get a clear quote before any work begins.
          </p>
        </div>
      </section>

      <PageCTA
        title="Not Sure Which One You Need?"
        text="That's fine. Describe the problem in your own words and we'll suggest the simplest way to fix it."
      />
    </div>
  );
}
