FROM node:7.2-alpine

RUN apk add --no-cache bash

RUN mkdir /npm
WORKDIR /npm
ADD package.json package.json
RUN npm install

RUN npm install -g grunt-cli

ADD docker/grunt/run.sh /opt/run.sh

ENTRYPOINT ["/opt/run.sh"]

CMD [""]
