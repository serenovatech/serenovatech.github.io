import React from 'react';
import { ExternalLink } from 'lucide-react';
import { projectStatuses } from '../data/portfolioData';

export default function ProjectCard({ project, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  const status = projectStatuses[project.status];

  return (
    <article className="pg-card project-card">
      <div className="project-card-top">
        <span className="project-category">{project.category}</span>
        {status && <span className={`pg-badge pg-badge-${status.tone}`}>{status.label}</span>}
      </div>

      <Heading className="project-title">{project.title}</Heading>
      <p className="project-desc">{project.description}</p>

      {project.note && <p className="project-note">{project.note}</p>}

      {project.plannedFeatures?.length > 0 && (
        <div className="project-planned">
          <p className="project-subheading">Planned capabilities</p>
          <ul>
            {project.plannedFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {project.technologies.length > 0 && (
        <ul className="pg-tags" aria-label={`Technologies used in ${project.title}`}>
          {project.technologies.map((tech) => (
            <li key={tech} className="pg-tag">{tech}</li>
          ))}
        </ul>
      )}

      {project.links.length > 0 && (
        <div className="project-links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="pg-link">
              {link.label}
              <ExternalLink size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
