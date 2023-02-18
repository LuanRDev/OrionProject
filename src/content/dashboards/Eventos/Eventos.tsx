import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  Tooltip,
  CardActionArea,
  styled
} from '@mui/material';
import NewEventoForm from '../../../components/Forms/NewEventoForm';
import { TipoEvento } from '../../../models/tipo_evento';
import { Evento } from '../../../models/evento';
import { ReturnEventoTipo } from '../../../components/ReturnEventoTipo';
import NewEventoFormCard from '../../../components/Forms/NewEventoFormCard';

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

interface PropsDashboardEventos {
  Eventos: Evento[] | undefined;
  TiposEventos: TipoEvento[];
}

function Eventos({ Eventos, TiposEventos }: PropsDashboardEventos) {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <NewEventoForm TiposEventos={TiposEventos} />
      </Box>
      <Grid container spacing={3}>
        {Eventos.map((evento) => (
          <Grid xs={12} sm={6} md={3} item key={evento.id}>
            <Card
              sx={{
                px: 1
              }}
              key={evento.id}
            >
              <CardContent>
                <Typography variant="h5" noWrap>
                  {evento.empresa} - {evento.id}
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  {ReturnEventoTipo(evento.tipoEvento)}
                </Typography>
                <Box
                  sx={{
                    pt: 3
                  }}
                >
                  <Typography variant="h4" gutterBottom noWrap>
                    Confirmados: {evento.participacoesConfirmadas}
                  </Typography>
                  <Typography variant="subtitle2" noWrap>
                    Esperados: {evento.participantesEsperados}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Clique para adicionar um novo evento">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1
                }}
              >
                <CardContent>
                  <AvatarAddWrapper>
                    <NewEventoFormCard TiposEventos={TiposEventos} />
                  </AvatarAddWrapper>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}

export default Eventos;
