import {
  Button,
  Card,
  Box,
  CardActions,
  Typography,
  Avatar,
  alpha,
  Stack,
  Divider,
  styled,
  useTheme
} from '@mui/material';
import Text from '../../../components/Text';
import Label from '../../../components/Label';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import TrendingDownTwoToneIcon from '@mui/icons-material/TrendingDownTwoTone';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import TrendingFlatTwoToneIcon from '@mui/icons-material/TrendingFlatTwoTone';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

interface GraficoParams {
  DadosGrafico: Tempo;
}

interface Tempo {
  ultimaSemana: number[];
  ultimoMes: number[];
  ultimoTrimestre: number[];
}

function GraficosListaLinha({ DadosGrafico }: GraficoParams) {
  const theme = useTheme();

  const Box1Options: ApexOptions = {
    chart: {
      animations: {
        enabled: false
      },
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      zoom: {
        enabled: false
      }
    },
    labels: [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
      'Domingo'
    ],
    stroke: {
      curve: 'smooth',
      colors: [theme.colors.primary.main],
      width: 2
    },
    yaxis: {
      show: false
    },
    colors: [theme.colors.primary.main],
    grid: {
      padding: {
        top: 10,
        right: 5,
        bottom: 10,
        left: 5
      }
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fixed: {
        enabled: true
      },
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return 'Confirmados: ';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  const Box1Data = [
    {
      name: 'Última Semana',
      data: DadosGrafico.ultimaSemana
    }
  ];

  const Box2Data = [
    {
      name: 'Último Mês',
      data: DadosGrafico.ultimoMes
    }
  ];

  const Box3Data = [
    {
      name: 'Últimos Três Meses',
      data: DadosGrafico.ultimoTrimestre
    }
  ];

  return (
    <Card>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
      >
        <Box
          sx={{
            width: '100%',
            p: 3
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Box>
                <Typography variant="h4" noWrap>
                  Última semana
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  Taxa de participação
                </Typography>
              </Box>
            </Box>
            <Label color="secondary">24h</Label>
          </Box>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  pr: 1
                }}
              >
                256
              </Typography>
              <Text color="success">
                <b>+12.5%</b>
              </Text>
            </Box>
            <TrendingUpTwoToneIcon
              sx={{
                color: `${theme.colors.success.main}`
              }}
            />
          </Box>
          <Box pt={2}>
            <Chart
              options={Box1Options}
              series={Box1Data}
              type="line"
              height={100}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            p: 3
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Box>
                <Typography variant="h4" noWrap>
                  Último mês
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  Taxa de participação
                </Typography>
              </Box>
            </Box>
            <Label color="secondary">24h</Label>
          </Box>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  pr: 1
                }}
              >
                143
              </Typography>
              <Text color="error">
                <b>-3.24%</b>
              </Text>
            </Box>
            <TrendingDownTwoToneIcon
              sx={{
                color: `${theme.colors.error.main}`
              }}
            />
          </Box>
          <Box pt={2}>
            <Chart
              options={Box1Options}
              series={Box2Data}
              type="line"
              height={100}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            p: 3
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Box>
                <Typography variant="h4" noWrap>
                  Cardano
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  Taxa de participação
                </Typography>
              </Box>
            </Box>
            <Label color="secondary">24h</Label>
          </Box>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  pr: 1
                }}
              >
                26
              </Typography>
              <Text color="error">
                <b>-0.33%</b>
              </Text>
            </Box>
            <TrendingFlatTwoToneIcon
              sx={{
                color: `${theme.colors.warning.main}`
              }}
            />
          </Box>
          <Box pt={2}>
            <Chart
              options={Box1Options}
              series={Box3Data}
              type="line"
              height={100}
            />
          </Box>
        </Box>
      </Stack>
      <Divider />
      <CardActions
        disableSpacing
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button variant="outlined">Visualizar todas participações</Button>
      </CardActions>
    </Card>
  );
}

export default GraficosListaLinha;
