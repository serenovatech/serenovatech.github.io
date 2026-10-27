import React from 'react';
import { portfolioProjects } from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import '../styles/pages.css';

// Real project and experience highlights. Used on the About page, the Projects
// page and (on the static site) the home page.
export default function PortfolioSection({ id = 'projects', headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;

  return (
    <section id={id} className="pg-section pg-light" aria-labelledby={`${id}-heading`}>
      <div className="container pg-container">
        <div className="pg-section-head">
          <span className="pg-eyebrow">Portfolio & experience</span>
          <Heading id={`${id}-heading`} className="pg-title">Projects and Hands-On Work</Heading>
          <p className="pg-lead">
            A mix of client work, products in progress, professional infrastructure experience and learning labs.
            Each card is labelled so it is clear which is which.
          </p>
        </div>

        <div className="pg-grid pg-grid-3">
          {portfolioProjects.map((project) => (
            <ProjectCard key={project.id} project={project} headingLevel={headingLevel + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
