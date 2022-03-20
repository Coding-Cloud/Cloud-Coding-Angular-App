FROM node:16 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:prod

FROM nginx:alpine
COPY --from=node /app/dist/cloud-coding /usr/share/nginx/html
