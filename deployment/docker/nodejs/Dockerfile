#TODO
FROM node:22
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["yarn", "start"]
