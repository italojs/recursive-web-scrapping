FROM node:8.9-alpine

ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json /tmp/app/
RUN cd /tmp/app \
    && time npm install --verbose \
    && npm cache clean --force --verbose
COPY . /usr/src/app
RUN rm -rf /usr/src/app/node_modules \
    && mv -f /tmp/app/node_modules /usr/src/app

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=1s \
    CMD curl -f http://localhost:3000/ping || exit 1

CMD [ "npm", "start" ]
