import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../types';
import { whoamiStyles } from './whoamiStyles';

const ownershipAreas = [
  'Architecture redesigns',
  'Performance bottlenecks',
  'Scaling issues',
  'Integrations',
  'Reliability',
  'Legacy system evolution',
] as const;

const productionToolkit = [
  'Node.js',
  'Go',
  'Kubernetes',
  'AWS',
  'CI/CD',
  'Observability',
  'Production operations',
] as const;

const impactHighlights = [
  {
    metric: '~$200K/year',
    description: 'saved by building an in-house eSignature platform',
  },
  {
    metric: '68–70%',
    description: 'reduction in critical backend response times',
  },
  {
    metric: '50%+',
    description: 'improvement across performance-critical services',
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
          7+ years building and evolving backend systems, cloud infrastructure, and production
          platforms.
        </Typography>
      </Box>

      <Box component="section" sx={whoamiStyles.section}>
        <Typography component="h3" sx={whoamiStyles.sectionTitle}>
          [ BROAD OWNERSHIP ]
        </Typography>
        <Typography sx={whoamiStyles.paragraph}>
          I specialize in complex technical problems that require ownership across architecture and
          implementation—especially systems that have outgrown their original design.
        </Typography>
        <Box component="ul" sx={whoamiStyles.tags}>
          {ownershipAreas.map((area) => (
            <Box component="li" key={area} sx={whoamiStyles.tag}>
              {area}
            </Box>
          ))}
        </Box>
      </Box>

      <Box component="section" sx={whoamiStyles.section}>
        <Typography component="h3" sx={whoamiStyles.sectionTitle}>
          [ SYSTEMS &amp; OPERATIONS ]
        </Typography>
        <Typography sx={whoamiStyles.paragraph}>
          Backend architecture and hands-on implementation combined with cloud infrastructure,
          delivery pipelines, observability, and production operations.
        </Typography>
        <Box component="ul" sx={whoamiStyles.tags}>
          {productionToolkit.map((technology) => (
            <Box component="li" key={technology} sx={whoamiStyles.tag}>
              {technology}
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
