import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';

import { PromptIdentity } from '../../constants';
import { promptStyles } from './styles';

type PromptProps = {
  readonly showCursor?: boolean;
};

export function Prompt({ showCursor = true }: PromptProps): ReactElement {
  return (
    <Box sx={promptStyles.root}>
      <Typography component="span" sx={[promptStyles.text, promptStyles.identity]}>
        {PromptIdentity.USER}@{PromptIdentity.HOST}
      </Typography>
      <Typography component="span" sx={[promptStyles.text, promptStyles.punctuation]}>
        :
      </Typography>
      <Typography component="span" sx={[promptStyles.text, promptStyles.path]}>
        ~
      </Typography>
      <Typography component="span" sx={[promptStyles.text, promptStyles.punctuation]}>
        $
      </Typography>
      {showCursor ? <Box aria-hidden="true" component="span" sx={promptStyles.cursor} /> : null}
    </Box>
  );
}
