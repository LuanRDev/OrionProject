FROM node:current-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . /app

RUN npm run build

# STAGE 2

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5573

CMD ["nginx", "-g", "daemon off;"]