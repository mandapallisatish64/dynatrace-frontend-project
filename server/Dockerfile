FROM node:lts-slim as builder
WORKDIR tmp/
COPY package-lock.json package.json tsconfig.build.json tsconfig.json ./
COPY ./src ./src
RUN npm install
RUN npm run test
RUN npm run build

FROM node:lts-slim
COPY package-lock.json package.json ./
COPY --from=builder /tmp/dist ./dist/
RUN npm ci --only=production
EXPOSE 8080
ENTRYPOINT ["node", "dist/main.js"]
