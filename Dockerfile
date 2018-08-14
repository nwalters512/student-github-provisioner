FROM mhart/alpine-node:10
WORKDIR /build/
COPY . .
RUN npm install
RUN npm run build

CMD npm run start
