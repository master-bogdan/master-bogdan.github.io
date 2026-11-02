import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../types';
import { whoamiStyles } from './whoamiStyles';

const expertiseSections = [
  {
    title: '[ TECHNICAL LEADERSHIP ]',
    description:
      'I stay hands-on while leading architecture decisions, code reviews, and delivery. My experience includes leading technical decisions across two engineering teams of 4 and 3 engineers.',
    topics: ['Architecture', 'Performance', 'Scalability', 'Production reliability'],
  },
  {
    title: '[ BACKEND & PLATFORM ]',
    description:
      'I build backend services and operate cloud infrastructure, from event-driven integrations and databases to Kubernetes deployments, CI/CD, and observability.',
    topics: [
      'TypeScript',
      'Node.js',
      'Go',
      'AWS',
      'Kubernetes',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'RabbitMQ',
      'Prometheus',
      'Grafana',
    ],
  },
  {
    title: '[ AGENTIC AI WORKFLOWS ]',
    description:
      'I introduce agentic AI workflows for development, code reviews, testing, and onboarding, and share these practices with the team.',
    topics: [
      'AI coding agents',
      'Repository instructions',
      'Reusable agent skills',
      'MCP integrations',
    ],
  },
  {
    title: '[ CERTIFICATIONS ]',
    description: 'CNCF / The Linux Foundation',
    topics: [
      'Certified Kubernetes Administrator (CKA)',
      'Certified Kubernetes Application Developer (CKAD)',
    ],
  },
] as const;

const impactHighlights = [
  {
    metric: '~$200K/year',
    description:
      'annual savings from replacing DocuSign with the in-house eSignature application I took over and later led',
  },
  {
    metric: '~2 min → 20 sec',
    description:
      'PDF-generation time after rewriting an AWS Lambda from Node.js to Go; generated files were up to 80% smaller',
  },
  {
    metric: '~8 GB → 700 MB',
    description:
      'backend memory usage after refactoring a spreadsheet application; moving heavy calculations to the backend also brought saves for around 1 million rows below 1 second',
  },
] as const;

export const whoamiCommand: CommandHandler = () => {
  return (
    <Box sx={whoamiStyles.root}>
      <Box sx={whoamiStyles.identity}>
        <Typography component="h2" sx={whoamiStyles.name}>
          Bogdan Shchavinskyi
        </Typography>
        <Typography sx={whoamiStyles.role}>Tech Lead / Senior Software Engineer</Typography>
        <Typography sx={whoamiStyles.summary}>
          8+ years building backend systems and running cloud infrastructure, focused on
          architecture, performance, scalability, and production reliability.
        </Typography>
        <Typography sx={whoamiStyles.paragraph}>
          Open to remote, B2B, contractor roles, and relocation.
        </Typography>
      </Box>

      {expertiseSections.map(({ title, description, topics }) => (
        <Box component="section" key={title} sx={whoamiStyles.section}>
          <Typography component="h3" sx={whoamiStyles.sectionTitle}>
            {title}
          </Typography>
          <Typography sx={whoamiStyles.paragraph}>{description}</Typography>
          <Box component="ul" sx={whoamiStyles.tags}>
            {topics.map((topic) => (
              <Box component="li" key={topic} sx={whoamiStyles.tag}>
                {topic}
              </Box>
            ))}
          </Box>
        </Box>
      ))}

      <Box component="section" sx={whoamiStyles.section}>
        <Typography component="h3" sx={whoamiStyles.sectionTitle}>
          [ RECENT IMPACT ]
        </Typography>
        <Box sx={whoamiStyles.impactGrid}>
          {impactHighlights.map(({ description, metric }) => (
            <Box key={metric} sx={whoamiStyles.impactCard}>
              <Typography sx={whoamiStyles.metric}>{metric}</Typography>
              <Typography sx={whoamiStyles.impactDescription}>{description}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
