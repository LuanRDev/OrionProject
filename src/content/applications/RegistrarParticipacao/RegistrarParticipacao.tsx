import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import DocViewer from 'react-doc-viewer';
import NewParticipacaoForm from '../../../components/Forms/NewParticipacaoForm';
import { Evento } from '../../../models/evento';

interface PropsEvento {
  Evento: Evento;
}

function RegistrarParticipacao({ Evento }: PropsEvento) {
  const docs = [
    { uri: 'https://www.trt4.jus.br/portais/media/111485/vantagem_pdf.pdf' },
    { uri: '/auditoriaChat.pdf' }
  ];
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h5">Conteúdo do evento</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack>
                  <Typography variant="body1">
                    Registre sua participação em: {Evento?.empresa} -{' '}
                    {Evento?.tipoEvento}
                    <br />
                    Código do evento: {Evento?.id}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body1">Conteúdo do evento</Typography>
                  <br />
                  <DocViewer documents={docs} />
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Divider />
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h5">Formulário</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack>
                  <NewParticipacaoForm CodigoEvento={Evento.id} />
                </Stack>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RegistrarParticipacao;
