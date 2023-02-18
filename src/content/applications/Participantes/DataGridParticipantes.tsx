import { FC } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { Divider, Box, Card, useTheme, CardHeader } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Participante } from '../../../models/participante';
import { FormatDate } from '../../../components/FormatDate';

interface DataGridParticipantesProps {
  className?: string;
  participantes: Participante[];
}

const DataGridParticipantes: FC<DataGridParticipantesProps> = ({
  participantes
}) => {
  participantes.forEach((participante) => {
    if (participante.dataParticipacao !== undefined) {
      participante.dataParticipacao = FormatDate(participante.dataParticipacao);
    }
  });
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 300
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 200
    },
    {
      field: 'codigoEvento',
      headerName: 'Código do Evento',
      width: 150
    },
    {
      field: 'dataParticipacao',
      headerName: 'Data da Participação',
      width: 250
    }
  ];
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Lista de todos os participantes" />
      <Divider />
      <Box height={'35vh'}>
        <DataGrid
          rows={participantes}
          columns={columns}
          pageSize={5}
          checkboxSelection
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              csvOptions: { hideToolbar: true, allColumns: true },
              printOptions: { hideToolbar: true, allColumns: true }
            }
          }}
        />
      </Box>
    </Card>
  );
};

DataGridParticipantes.propTypes = {
  participantes: PropTypes.array.isRequired
};

DataGridParticipantes.defaultProps = {
  participantes: []
};

export default DataGridParticipantes;
