FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN yarn prisma generate

# Copy application code
COPY src ./src
COPY tsconfig.json ./

# Build application
RUN yarn build

# Remove dev dependencies
RUN yarn install --frozen-lockfile --production

EXPOSE 3001

CMD ["yarn", "start"]
