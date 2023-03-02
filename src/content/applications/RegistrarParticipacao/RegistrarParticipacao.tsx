import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
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
import { ReturnEventoTipo } from '../../../components/ReturnEventoTipo';
import { FormatDate } from '../../../components/FormatDate';

interface PropsEvento {
  Evento: Evento;
}

function RegistrarParticipacao({ Evento }: PropsEvento) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [checked, setChecked] = useState(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleExpand =
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
              onChange={handleExpand('panel1')}
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
                  <Typography variant="h6">
                    Código do evento: {Evento?.id}
                  </Typography>
                  <Typography variant="h6">
                    Registre sua participação para o{' '}
                    {ReturnEventoTipo(Evento.tipoEvento)}, pela empresa
                    {Evento.empresa}.
                  </Typography>
                  <Typography variant="h6">
                    Descrição do evento: {Evento.descricao}
                  </Typography>
                  <Typography variant="h6">
                    Data da realização: {FormatDate(Evento.dataRealizado)}
                  </Typography>
                </Stack>
                <Divider />
                {Evento.conteudoEventos.length > 0 ? (
                  <>
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
                        Abaixo encontre uma visualização do arquivo embutida à
                        nossa plataforma. Nem todos os arquivos são compatíveis
                        com a pré-visualização, nesses casos é recomendado abrir
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
                  </>
                ) : (
                  ''
                )}

                <Divider />
                <Stack marginTop={2}>
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox onChange={handleCheck} checked={checked} />
                      }
                      label={`
                      Declaro que li e consumi todos os conteúdos
                      disponibilizados neste evento.`}
                    />
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Divider />
            <Accordion
              expanded={checked}
              onChange={handleExpand('panel2')}
              disabled={!checked}
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
