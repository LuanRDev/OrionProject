import {
  Card,
  CardContent,
  CardActions,
  Stack,
  Typography,
  Button
} from '@mui/material';
import DeleteEventoForm from 'src/components/Forms/DeleteEventoForm';
import Link from 'src/components/Link';
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

function EventosApplication() {
  const eventos: IEvento[] = [
    {
      id: 1,
      tipoEvento: 1,
      descricao:
        'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
      cargaHoraria: 19,
      dataRealizado: '2022-08-04T07:11:23Z',
      empresa: 'Skimia',
      instrutor: 'Irène',
      participantesConfirmados: 2,
      participantesEsperados: 10,
      inativo: false,
      conteudoEvento: [
        {
          nome: 'teste.txt',
          url: 'eventos/empresas/empresa teste/121/documentos/8a409c26-647b-47b6-9c54-5e292de3f77a'
        },
        {
          nome: 'arquivopdf.pdf',
          url: 'eventos/empresas/empresa teste/121/documentos/a009b719-ca8a-40a5-af78-970a65e25144'
        }
      ]
    },
    {
      id: 2,
      cargaHoraria: 10,
      dataRealizado: '2022-04-01T04:58:25Z',
      empresa: 'Eare',
      instrutor: 'Estée',
      descricao:
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
      tipoEvento: 1,
      conteudoEvento: [],
      participantesConfirmados: 2,
      participantesEsperados: 10,
      inativo: false
    },
    {
      id: 2,
      cargaHoraria: 10,
      dataRealizado: '2022-04-01T04:58:25Z',
      empresa: 'Eare',
      instrutor: 'Estée',
      descricao:
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
      tipoEvento: 1,
      conteudoEvento: [],
      participantesConfirmados: 2,
      participantesEsperados: 10,
      inativo: false
    }
  ];
  return (
    <Stack
      direction={'row'}
      gap={2}
      maxWidth={'100vw'}
      flexWrap={'wrap'}
      textAlign={'center'}
    >
      {eventos.map((evento) => (
        <Card
          key={evento.id}
          sx={{ width: '30vw', height: '40vh', textAlign: 'left' }}
        >
          <CardContent>
            <Typography variant="h3" marginBottom={0.5} textAlign="center">
              {evento.empresa} - {evento.tipoEvento}
            </Typography>
            <Typography variant="body2" marginBottom={0.5}>
              Data do evento:{' '}
              {evento.dataRealizado != undefined ? evento.dataRealizado : ''}
            </Typography>
            <Typography
              variant="body1"
              marginBottom={0.5}
              maxHeight={'12vh'}
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
      ))}
    </Stack>
  );
}

export default EventosApplication;
