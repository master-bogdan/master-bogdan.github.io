import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../../types';
import { hiddenCommandStyles } from './styles';

const UbuntuLogo = `       _,met$$$$$gg.
    ,g$$$$$$$$$$$$$$$P.
  ,g$$P"     """Y$$.".
 ,$$P'              \`$$$.
',$$P       ,ggs.     \`$$b:
\`d$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
 $$:      $$.   -    ,d$$'
 $$;      Y$b._   _,d$P'
 Y$$.    \`.\`"Y$$$$P"'
 \`$$b      "-.__
  \`Y$$
   \`Y$$.
     \`$$b.
       \`Y$$b.
          \`"Y$b._
              \`""""`;

export const neofetchCommand: CommandHandler = () => {
  const uptimeSeconds = Math.floor(performance.now() / 1000);
  const memoryMiB = Math.floor(Math.random() * 2000 + 1000);
  const systemDetails = [
    ['OS', 'Ubuntu 22.04 LTS x86_64'],
    ['Host', 'Personal Portfolio'],
    ['Kernel', '6.2.0-terminal'],
    ['Uptime', `${uptimeSeconds} seconds`],
    ['Shell', 'bash 5.1.16'],
    ['Terminal', 'xterm-256color'],
    ['CPU', 'TypeScript Engine (8) @ 3.9GHz'],
    ['Memory', `${memoryMiB}MiB / 16384MiB`],
  ] as const;

  return (
    <Box sx={hiddenCommandStyles.neofetchRoot}>
      <Box sx={hiddenCommandStyles.asciiArtContainer}>
        <Typography component="pre" sx={hiddenCommandStyles.asciiArt}>
          {UbuntuLogo}
        </Typography>
      </Box>
      <Box sx={hiddenCommandStyles.systemDetails}>
        <Typography sx={hiddenCommandStyles.systemName}>bogdan@homelab</Typography>
        <Typography sx={hiddenCommandStyles.mutedText}>---------------</Typography>
        {systemDetails.map(([label, value]) => (
          <Typography key={label} sx={hiddenCommandStyles.text}>
            <Box component="span" sx={hiddenCommandStyles.label}>
              {label}:
            </Box>{' '}
            {value}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
