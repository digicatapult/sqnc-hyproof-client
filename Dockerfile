# docker build -t dscp-hyproof-client .
# docker run --rm -h gui --name gui -p 3000:80 dscp-hyproof-client
ARG NODE_VERSION=20-alpine
FROM node:$NODE_VERSION AS build

RUN npm -g install npm@10.x.x

WORKDIR /dscp-hyproof-client

# Install base dependencies
COPY . .
RUN npm ci

# RUN Build
RUN npm run build

##################################################################################################

FROM nginx:1.25.3-alpine AS runtime

WORKDIR /dscp-hyproof-client

COPY --from=build /dscp-hyproof-client/build .

# COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf # OLD
RUN sed -i 's|/usr/share/nginx/html|/dscp-hyproof-client|' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
