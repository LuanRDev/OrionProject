import { FC, ChangeEvent, useState } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from '../../../components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { Participante, ParticipanteStatus } from '../../../models/participante';
import { FormatDate } from '../../../components/FormatDate';

interface TabelaParticipantesProps {
  className?: string;
  participantes: Participante[];
}

interface Filters {
  status?: ParticipanteStatus;
}

const getStatusLabel = (
  participanteStatus: ParticipanteStatus
): JSX.Element => {
  const map = {
    falta: {
      text: 'Falta',
      color: 'error'
    },
    confirmado: {
      text: 'Confirmado',
      color: 'success'
    },
    pendente: {
      text: 'Pendente',
      color: 'warning'
    }
  };

  const { text, color }: any = map[participanteStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  participantes: Participante[],
  filters: Filters
): Participante[] => {
  return participantes.filter((participante) => {
    let matches = true;

    if (filters.status && participante.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  participantes: Participante[],
  page: number,
  limit: number
): Participante[] => {
  return participantes.slice(page * limit, page * limit + limit);
};

const TabelaParticipantes: FC<TabelaParticipantesProps> = ({
  participantes
}) => {
  const [selectedParticipantes, setSelectedParticipantes] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedParticipantes.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'todos',
      name: 'Todos'
    },
    {
      id: 'confirmado',
      name: 'Confirmado'
    },
    {
      id: 'pendente',
      name: 'Pendente'
    },
    {
      id: 'falta',
      name: 'Falta'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllParticipantes = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedParticipantes(
      event.target.checked
        ? participantes.map((participante) => participante.status)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    participanteId: string
  ): void => {
    if (!selectedParticipantes.includes(participanteId)) {
      setSelectedParticipantes((prevSelected) => [
        ...prevSelected,
        participanteId
      ]);
    } else {
      setSelectedParticipantes((prevSelected) =>
        prevSelected.filter((id) => id !== participanteId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredParticipantes = applyFilters(participantes, filters);
  const paginatedParticipantes = applyPagination(
    filteredParticipantes,
    page,
    limit
  );
  const selectedSomeParticipantes =
    selectedParticipantes.length > 0 &&
    selectedParticipantes.length < participantes.length;
  const selectedAllParticipantes =
    selectedParticipantes.length === participantes.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'todos'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Lista de todos os participantes"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllParticipantes}
                  indeterminate={selectedSomeParticipantes}
                  onChange={handleSelectAllParticipantes}
                />
              </TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Código da participação</TableCell>
              <TableCell>Código do evento</TableCell>
              <TableCell align="right">Data da Participação</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedParticipantes.map((participante) => {
              const isCryptoOrderSelected = selectedParticipantes.includes(
                participante.status
              );
              return (
                <TableRow
                  hover
                  key={participante.id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, participante.status)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {participante.nome}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {participante.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {participante.codigoEvento}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {FormatDate(participante.dataParticipacao)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {/* {getStatusLabel(participante.status)} */}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar Participante" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir participante" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredParticipantes.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

TabelaParticipantes.propTypes = {
  participantes: PropTypes.array.isRequired
};

TabelaParticipantes.defaultProps = {
  participantes: []
};

export default TabelaParticipantes;
