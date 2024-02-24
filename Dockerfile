# docker build -t sqnc-hyproof-client .
# docker run --rm -h gui --name gui -p 3000:80 sqnc-hyproof-client
ARG NODE_VERSION=20-alpine
FROM node:$NODE_VERSION AS build

RUN npm -g install npm@10.x.x

WORKDIR /sqnc-hyproof-client

# Install base dependencies
COPY . .
RUN npm ci

# RUN Build
RUN npm run build

##################################################################################################

FROM nginx:1.25.4-alpine AS runtime

WORKDIR /sqnc-hyproof-client

COPY --from=build /sqnc-hyproof-client/build .

# COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf # OLD
RUN sed -i 's|/usr/share/nginx/html|/sqnc-hyproof-client|' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
