FROM node:16.15-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts

COPY . .

RUN npm run build:client

FROM nginx:1.15-alpine

ARG APP_TYPE=client
ARG CONFIG

RUN apk update && apk add jq && rm -rf /var/cache/apk/*

COPY --from=builder /app/dist/${APP_TYPE} /usr/share/nginx/html/
COPY --from=builder /app/ops/config/nginx-default-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/ops/config/nginx-custom.conf /etc/nginx/nginx.conf

RUN mkdir /usr/share/nginx/html/.well-known
RUN echo \"${CONFIG}\" > /usr/share/nginx/html/assets/token.${APP_TYPE}.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
