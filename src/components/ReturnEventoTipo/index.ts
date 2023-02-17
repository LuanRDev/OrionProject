export const ReturnEventoTipo = (tipo: number) => {
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
};
