FROM node:23.6.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Build TypeScript code
RUN npm run build

# Explicitly set Node environment
ENV NODE_ENV=production

# Use non-root user for better security
USER node

EXPOSE 3000
CMD ["npm", "start"]