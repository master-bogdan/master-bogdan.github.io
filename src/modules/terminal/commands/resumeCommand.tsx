import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { appConfig, profile } from '@/config';
import { contentHref } from '@/modules/navigation';

import type { CommandHandler } from '../types';
import { commandStyles } from './styles';
import { resumeStyles } from './resumeStyles';

const certifications = [
  { image: 'cka.svg', title: 'Certified Kubernetes Administrator (CKA)' },
  { image: 'ckad.svg', title: 'Certified Kubernetes Application Developer (CKAD)' },
] as const;

export const resumeCommand: CommandHandler = () => {
  return (
    <Box sx={resumeStyles.root}>
      <Typography component="h1" sx={resumeStyles.name}>
        {profile.name}
      </Typography>
      <Typography sx={resumeStyles.role}>{profile.role}</Typography>
      <Box sx={resumeStyles.links}>
        <Link
          href={`${appConfig.basePath}${profile.resumeFileName}`}
          download={profile.resumeFileName}
          sx={commandStyles.downloadLink}
        >
          [Download PDF]
        </Link>
        <Link
          href={profile.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          sx={commandStyles.downloadLink}
        >
          [View LinkedIn profile]
        </Link>
      </Box>
      <Typography sx={commandStyles.text}>
        8+ years building software, with experience leading engineering teams. I work across product
        development, architecture, cloud infrastructure, and production delivery, with a focus on
        clear design, performance, and reliability.
      </Typography>
      <Typography component="h2" sx={resumeStyles.sectionTitle}>
        What I work on
      </Typography>
      <Box component="ul" sx={resumeStyles.list}>
        <li>
          <strong>Software products & technical leadership:</strong> system design, hands-on
          implementation, code reviews, and delivery across engineering teams.
        </li>
        <li>
          <strong>Platform engineering & DevOps:</strong> Kubernetes, AWS, CI/CD, observability, and
          reliable releases.
        </li>
        <li>
          <strong>Agentic AI workflows:</strong> local models, coding-agent integrations, custom MCP
          tools, web search, and repository knowledge retrieval.
        </li>
      </Box>
      <Typography component="h2" sx={resumeStyles.sectionTitle}>
        Main technologies
      </Typography>
      <Typography sx={commandStyles.text}>
        TypeScript · Node.js · Go · React · AWS · Kubernetes · PostgreSQL · MongoDB · Redis ·
        RabbitMQ · Prometheus · Grafana
      </Typography>
      <Typography component="h2" sx={resumeStyles.sectionTitle}>
        Selected impact
      </Typography>
      <Box component="ul" sx={resumeStyles.list}>
        <li>
          Approximately $200K/year saved by replacing DocuSign with an in-house eSignature
          application I took over and later led.
        </li>
        <li>
          PDF generation reduced from around 2 minutes to 20 seconds by rewriting an AWS Lambda from
          Node.js to Go.
        </li>
      </Box>
      <Typography component="h2" sx={resumeStyles.sectionTitle}>
        Certifications
      </Typography>
      <Typography sx={commandStyles.muted}>CNCF / The Linux Foundation</Typography>
      <Box sx={resumeStyles.certifications}>
        {certifications.map(({ image, title }) => (
          <Box component="figure" key={image} sx={resumeStyles.certification}>
            <Box
              component="img"
              src={`${appConfig.basePath}certifications/${image}`}
              alt={title}
              width={96}
              height={96}
              sx={resumeStyles.badge}
            />
            <Box component="figcaption">{title}</Box>
          </Box>
        ))}
      </Box>
      <Typography sx={commandStyles.text}>
        See what I build in{' '}
        <Link href={contentHref('projects')} sx={commandStyles.link}>
          projects
        </Link>
        , or read my{' '}
        <Link href={contentHref('blog')} sx={commandStyles.link}>
          technical notes
        </Link>
        .
      </Typography>
    </Box>
  );
};
