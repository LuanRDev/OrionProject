import { parseISO, format } from 'date-fns';
import { pt } from 'date-fns/locale';

export const FormatDate = (data: string) => {
  var formatedDate: string = format(
    parseISO(data),
    "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
    { locale: pt }
  );
  return formatedDate;
};
