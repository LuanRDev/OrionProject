import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { apiEventos } from '../../../core/services/api/axios';
import { Evento } from '../../../models/evento';
import { FormatDate } from '../../../components/FormatDate';
import DeleteEventoForm from '../../../components/Forms/DeleteEventoForm';
import Link from '../../../components/Link';
import { ReturnEventoTipo } from '../../../components/ReturnEventoTipo';

interface EventosApplicationProps {
  Eventos: Evento[];
}

function EventosApplication({ Eventos }: EventosApplicationProps) {
  return (
    <Grid container spacing={3} gap={2}>
      {Eventos.map((evento) => (
        <Grid xs={12} sm={6} md={3} item>
          <Card key={evento.id} sx={{ px: 1 }}>
            <CardContent>
              <Typography variant="h3" marginBottom={0.5} textAlign="center">
                {evento.empresa} - {ReturnEventoTipo(evento.tipoEvento)}
              </Typography>
              <Typography variant="body2" marginBottom={0.5}>
                Data do evento: {FormatDate(evento.dataRealizado)}
              </Typography>
              <Typography
                variant="body1"
                marginBottom={0.5}
                height={'12vh'}
                overflow={'auto'}
              >
                Descrição:
                <br />
                {evento.descricao}
              </Typography>
              <Typography maxWidth={'12vw'} marginBottom={0.5}>
                <Button size="small" variant="outlined">
                  <Link to={`/management/eventos/${evento.id}`}>
                    Ver Detalhes
                  </Link>
                </Button>
              </Typography>
              <Typography maxWidth={'12vw'}>
                <DeleteEventoForm id={evento.id} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default EventosApplication;
