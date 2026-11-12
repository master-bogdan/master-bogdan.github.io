import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { appConfig, profile } from '@/config';

import type { CommandHandler } from '../types';
import { whoamiStyles } from './whoamiStyles';

const expertiseSections = [
  {
    title: '[ TECHNICAL LEADERSHIP ]',
    description:
      'I work across system design, implementation, and code review, with a focus on clear architecture, maintainable code, and reliable delivery.',
    topics: ['Architecture', 'Performance', 'Scalability', 'Production reliability'],
  },
  {
    title: '[ SOFTWARE & PLATFORM ENGINEERING ]',
    description:
      'I build applications and backend services and operate cloud infrastructure. My platform engineering and DevOps work covers Kubernetes deployments, CI/CD, and observability.',
    topics: [
      'TypeScript',
      'Node.js',
      'Go',
      'React',
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
      'I build agentic AI workflows and tooling, including local-model integrations, custom MCP tools, web search, and repository knowledge retrieval. I also bring AI-assisted development, reviews, testing, and onboarding practices to engineering teams.',
    topics: [
      'AI coding agents',
      'Repository instructions',
      'Reusable agent skills',
      'MCP integrations',
    ],
  },
] as const;

const certifications = [
  { image: 'cka.svg', title: 'Certified Kubernetes Administrator (CKA)' },
  { image: 'ckad.svg', title: 'Certified Kubernetes Application Developer (CKAD)' },
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
        <Typography sx={whoamiStyles.role}>{profile.role}</Typography>
        <Typography sx={whoamiStyles.summary}>
          8+ years building software products and cloud platforms, focused on architecture,
          performance, scalability, and production reliability.
        </Typography>
        <Typography sx={whoamiStyles.paragraph}>
          I work end to end, from product requirements and architecture through implementation,
          delivery, and operation.
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
          [ CERTIFICATIONS ]
        </Typography>
        <Typography sx={whoamiStyles.paragraph}>CNCF / The Linux Foundation</Typography>
        <Box sx={whoamiStyles.certifications}>
          {certifications.map(({ image, title }) => (
            <Box component="figure" key={image} sx={whoamiStyles.certification}>
              <Box
                component="img"
                src={`${appConfig.basePath}certifications/${image}`}
                alt={title}
                width={96}
                height={96}
                sx={whoamiStyles.badge}
              />
              <Box component="figcaption">{title}</Box>
            </Box>
          ))}
        </Box>
      </Box>

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
