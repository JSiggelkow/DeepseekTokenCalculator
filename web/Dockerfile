FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm i -g @angular/cli
RUN npm ci

COPY . .
ENV BACKEND_URL=http://api:8000

RUN npm run build -- --configuration production

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/web/browser /usr/share/nginx/html

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
