import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { appConfig, profile } from '@/config';

import type { CommandHandler } from '../types';
import { contactsStyles } from './contactsStyles';

export const contactsCommand: CommandHandler = () => {
  return (
    <Box sx={contactsStyles.root}>
      <Typography component="h1" sx={contactsStyles.title}>
        Contact &amp; CV
      </Typography>
      <Typography sx={contactsStyles.person}>
        {profile.name} · {profile.role}
      </Typography>
      <Link
        href={`${appConfig.basePath}${profile.resumeFileName}`}
        download={profile.resumeFileName}
        sx={contactsStyles.download}
      >
        Download CV (PDF)
      </Link>
      <Box component="dl" sx={contactsStyles.details}>
        <Box component="dt" sx={contactsStyles.label}>
          Email
        </Box>
        <Box component="dd" sx={contactsStyles.value}>
          <Link href="mailto:bshchavinskyi@gmail.com" sx={contactsStyles.link}>
            bshchavinskyi@gmail.com
          </Link>
        </Box>
        <Box component="dt" sx={contactsStyles.label}>
          LinkedIn
        </Box>
        <Box component="dd" sx={contactsStyles.value}>
          <Link
            href={profile.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            sx={contactsStyles.link}
          >
            View LinkedIn profile
          </Link>
        </Box>
        <Box component="dt" sx={contactsStyles.label}>
          GitHub
        </Box>
        <Box component="dd" sx={contactsStyles.value}>
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            sx={contactsStyles.link}
          >
            View GitHub profile
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
