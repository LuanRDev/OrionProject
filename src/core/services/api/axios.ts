import axios from 'axios';

// export const apiEventos = axios.create({
//   baseURL: "http://34.95.171.65:49164",
// });

// export const apiParticipantes = axios.create({
//   baseURL: "http://34.95.171.65:49166",
// });

export const apiEventos = axios.create({
  baseURL: 'https://omega.messier-g.com.br'
});

export const apiParticipantes = axios.create({
  baseURL: 'https://lagoon.messier-g.com.br'
});
