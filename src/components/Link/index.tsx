import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Link = styled(NavLink)(
  ({ theme }) => `
        text-decoration: none;
        color: ${theme.palette.secondary.main};
`
);

export default Link;
