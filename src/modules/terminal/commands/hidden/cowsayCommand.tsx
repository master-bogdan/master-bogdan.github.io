import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../../types';
import { hiddenCommandStyles } from './styles';

export const cowsayCommand: CommandHandler = (args) => {
  const message = args.length > 0 ? args.join(' ') : 'Hello from the terminal!';
  const messageBorder = '_'.repeat(message.length + 2);
  const messageUnderline = '-'.repeat(message.length + 2);

  return (
    <Typography component="pre" sx={hiddenCommandStyles.preformatted}>
      {`
 ${messageBorder}
< ${message} >
 ${messageUnderline}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
        `}
    </Typography>
  );
};
