import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function PageHeader() {
  const [username, setUsername] = useState('');
  const theme = useTheme();
  const { keycloak } = useKeycloak();
  useEffect(() => {
    async function getUserInfo() {
      const decoded: any = jwt_decode(keycloak?.token!);
      setUsername(decoded.given_name);
    }
    getUserInfo();
  }, [keycloak?.token, username]);
  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={username}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bem-vindo, {username}!
        </Typography>
        <Typography variant="subtitle2">
          Hoje o dia está lindo para monitorar alguns eventos...
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
