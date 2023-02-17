import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
  ListItemText,
  List,
  ListItem,
  Grid
} from '@mui/material';
import Chart from 'react-apexcharts';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import { ApexOptions } from 'apexcharts';
import { FormatDate } from '../../../components/FormatDate';
import { Evento } from '../../../models/evento';
import { ReturnEventoTipo } from '../../../components/ReturnEventoTipo';

interface PropsEvento {
  Evento: Evento;
}

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
`
);

function EventoInformation({ Evento }: PropsEvento) {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    series: [44, 65],
    chart: {
      width: 320,
      type: 'pie'
    },
    labels: ['Team A', 'Team B'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };
  const chart1Data = [44, 65];
  return (
    <Card>
      <CardHeader title="Informações Gerais" />
      <Divider />
      <Box px={1} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <EventIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">
            {Evento.empresa} - {ReturnEventoTipo(Evento.tipoEvento)}
          </Typography>
          <Box pt={2} display="flex">
            <Box pr={4}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(14)}` }}
              >
                ID
              </Typography>
              <Typography variant="h4"> {Evento.id}</Typography>
            </Box>
            <Box pr={4}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  fontSize: `${theme.typography.pxToRem(16)}`
                }}
              >
                Carga Horária
              </Typography>
              <Typography variant="h4">{Evento.cargaHoraria} horas</Typography>
            </Box>
            <Box pr={4}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Instrutor
              </Typography>
              <Typography variant="h4">{Evento.instrutor}</Typography>
            </Box>
            <Box pr={4}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Data do Evento
              </Typography>
              <Typography variant="h4">
                {FormatDate(Evento.dataRealizado)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={1} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <GroupsIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Participantes</Typography>

          <Box pt={2} display="flex">
            <Box pr={4}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Esperados
              </Typography>
              <Typography variant="h4">
                {Evento.participantesEsperados}
              </Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Confirmados
              </Typography>
              <Typography variant="h4">
                {Evento.participantesConfirmados}
              </Typography>
            </Box>
          </Box>
          <Grid item md={4} xs={4} sm={4}>
            <Chart options={chartOptions} series={chart1Data} type="pie" />
          </Grid>
        </Box>
      </Box>
      <Divider />
      <Box px={1} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <InsertDriveFileIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Conteúdo do evento</Typography>

          <Box pt={1} display="flex">
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Arquivos
              </Typography>
              {Evento.conteudoEvento?.map((arquivo) => (
                <Typography mb={0.5} key={arquivo.nome}>
                  <a href={arquivo.url}>{arquivo.nome}</a>
                </Typography>
              ))}
            </Box>
            <Box pr={4}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Quantidade
              </Typography>
              <Typography variant="h4">
                {Evento.conteudoEvento?.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default EventoInformation;
