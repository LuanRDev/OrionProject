import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import NewParticipacaoForm from '../../../components/Forms/NewParticipacaoForm';
import { Evento } from '../../../models/evento';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface PropsEvento {
  Evento: Evento;
}

function RegistrarParticipacao({ Evento }: PropsEvento) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const docs = Evento.conteudoEventos.map((arquivo) => ({ uri: arquivo.url }));
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="h4">Conteúdo do evento</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack margin={2}>
                  <Typography variant="h5">
                    Código do evento: {Evento?.id}
                  </Typography>
                </Stack>
                <Divider />
                <Stack margin={2}>
                  <Typography variant="h5">
                    Links para acessar diretamente o conteúdo:{' '}
                  </Typography>
                  <List>
                    {Evento.conteudoEventos.map((arquivo) => (
                      <ListItem>
                        <ListItemText
                          primary={arquivo.name}
                          secondary={arquivo.url}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
                <Divider />
                <Stack margin={2}>
                  <Typography variant={'body1'}>
                    Abaixo encontre uma visualização do arquivo embutida à nossa
                    plataforma. Nem todos os arquivos são compatíveis com a
                    pré-visualização, nesses casos é recomendado abrir
                    diretamente o link dos arquivos.
                  </Typography>
                  <Box height={'15vh'}>
                    <DocViewer
                      documents={docs}
                      pluginRenderers={DocViewerRenderers}
                      language={'pt'}
                    />
                  </Box>
                </Stack>
                <Divider />
                <Stack marginTop={2}>
                  <Typography variant="h5">
                    Declaro que li e consumi todos os conteúdos disponibilizados
                    neste evento.
                  </Typography>
                  <Box>
                    <Checkbox onChange={handleChange('panel2')} />
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Divider />
            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="h4">Formulário</Typography>
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
