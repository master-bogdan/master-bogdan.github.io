import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../../types';
import { hiddenCommandStyles } from './styles';

const CoffeeArt = `
        (  )   (   )  )
         ) (   )  (  (
         ( )  (    ) )
         _____________
        <_____________> ___
        |             |/ _ \\
        |               | | |
        |               |_| |
     ___|             |\\___/
    /    \\___________/    \\
    \\_____________________/
        `;

export const coffeeCommand: CommandHandler = () => {
  return (
    <Box>
      <Typography component="pre" sx={hiddenCommandStyles.coffee}>
        {CoffeeArt}
      </Typography>
      <Typography sx={hiddenCommandStyles.cyanMessage}>
        ☕ Coffee break! Refueling developer energy...
      </Typography>
    </Box>
  );
};
