FROM node:18 as builder

WORKDIR /app

COPY package.json  ./
RUN npm install
RUN npm install recharts

COPY . .
RUN npm run build

FROM node:18 as runner
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]