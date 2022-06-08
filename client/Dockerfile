## generate UI artifacts in build layer 
FROM node:lts-slim as builder
ENV CHROME_BIN='/usr/bin/chromium'
ENV TEST_BROWSER='ChromeHeadlessNoSandbox'
WORKDIR tmp/
RUN apt-get update --assume-yes
RUN apt-get install chromium --assume-yes
COPY . ./

# install, test and build
RUN npm install
RUN npm run test:no-watch
RUN npm run build


## build nginx image
FROM nginx:stable-alpine

# move .conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
RUN chmod +rw /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

# copy from builder image
COPY --from=builder temp/dist/* /usr/share/nginx/html/
EXPOSE 8080
