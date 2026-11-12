import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import type { ReactElement } from 'react';

import { appConfig } from '@/config';
import { contentHref } from '@/modules/navigation';

import { getProject, projects, type Project } from '../projects';
import { projectStyles } from './styles';

const projectListOutput = (): ReactElement => {
  return (
    <Box sx={projectStyles.root}>
      <h1>Featured Projects:</h1>
      {projects.map((project) => (
        <Box component="section" key={project.slug} sx={projectStyles.card}>
          <h2>
            <Link href={contentHref('projects', project.slug)}>{project.title}</Link>
          </h2>
          <p>{project.summary}</p>
          <Box component="p" sx={projectStyles.technologies}>
            {project.technologies.join(' · ')}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const projectContentOutput = (project: Project): ReactElement => {
  return (
    <Box component="article" sx={projectStyles.root}>
      <h1>{project.title}</h1>
      <p>{project.summary}</p>
      <p>
        <Link href={project.repository} target="_blank" rel="noopener noreferrer">
          View on GitHub ↗
        </Link>
      </p>
      <h2>Overview</h2>
      <p>{project.description}</p>
      <h2>What it does</h2>
      <ul>
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <h2>Technologies</h2>
      <p>{project.technologies.join(' · ')}</p>
      {project.preview ? (
        <Box
          component="img"
          src={`${appConfig.basePath}${project.preview.src}`}
          alt={project.preview.alt}
          width={1200}
          height={760}
          loading="lazy"
          sx={projectStyles.preview}
        />
      ) : null}
      {project.example ? (
        <section>
          <h2>{project.example.title}</h2>
          <p>{project.example.text}</p>
          <p>
            <Link href={project.example.href} target="_blank" rel="noopener noreferrer">
              Explore the example ↗
            </Link>
          </p>
        </section>
      ) : null}
      <h2>Updates</h2>
      {project.updates.map((update) => (
        <Box key={update.href} component="section" sx={projectStyles.update}>
          <time dateTime={update.date}>{update.date}</time>
          <Link href={update.href} target="_blank" rel="noopener noreferrer">
            {update.title} ↗
          </Link>
          <p>{update.description}</p>
        </Box>
      ))}
      <Link href={contentHref('projects')}>← All projects</Link>
    </Box>
  );
};

export const projectsCommand = (args: readonly string[]): ReactElement => {
  const slug = args[0];
  if (!slug) {
    return projectListOutput();
  }
  const project = getProject(slug);
  if (!project) {
    return (
      <Box sx={projectStyles.root}>
        Project &apos;{slug}&apos; not found.{' '}
        <Link href={contentHref('projects')}>View all projects</Link>.
      </Box>
    );
  }
  return projectContentOutput(project);
};
