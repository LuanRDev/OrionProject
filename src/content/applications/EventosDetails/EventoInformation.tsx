import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled
} from '@mui/material';

interface PropsEvento {
  Evento: IEvento | undefined;
}

interface IEvento {
  id: number;
  tipoEvento: number;
  descricao: string;
  empresa: string;
  instrutor: string;
  dataRealizado: string;
  cargaHoraria: number;
  participantesEsperados: number;
  participantesConfirmados: number;
  inativo: boolean;
  conteudoEvento: IConteudoEvento[];
}

interface IConteudoEvento {
  nome: string;
  url: string;
}

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function EventoInformation({ Evento }: PropsEvento) {
  const theme = useTheme();
  function returnEventoTipo(tipo: number) {
    var tipoConvertido = '';
    switch (tipo) {
      case 1:
        tipoConvertido = 'Palestra';
        break;
      case 2:
        tipoConvertido = 'Curso';
        break;
      case 3:
        tipoConvertido = 'Treinamento';
        break;
      default:
        break;
    }
    return tipoConvertido;
  }
  return (
    <Card>
      <CardHeader title="Informações Gerais" />
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary></AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">
            {Evento.empresa} - {returnEventoTipo(Evento.tipoEvento)}
          </Typography>
          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                ID
              </Typography>
              <Typography variant="h2"> {Evento.id}</Typography>
            </Box>
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Carga Horária
              </Typography>
              <Typography variant="h2">{Evento.cargaHoraria} horas</Typography>
            </Box>
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Instrutor
              </Typography>
              <Typography variant="h2">{Evento.instrutor}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary></AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Participantes</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Esperados
              </Typography>
              <Typography variant="h2">
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
              <Typography variant="h2">
                {Evento.participantesConfirmados}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary></AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Conteúdo do evento</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Quantidade
              </Typography>
              <Typography variant="h2">
                {Evento.conteudoEvento.length}
              </Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Lists
              </Typography>
              <Typography variant="h2">15</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default EventoInformation;
