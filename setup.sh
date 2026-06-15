#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Smart QR Platform Setup${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
  exit 1
fi

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
yarn install

echo ""
echo -e "${YELLOW}🐳 Starting Docker containers...${NC}"
yarn docker:up

echo ""
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 10

echo ""
echo -e "${YELLOW}🗄️  Running database migrations...${NC}"
yarn db:migrate

echo ""
echo -e "${YELLOW}🌱 Seeding database...${NC}"
yarn db:seed

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${GREEN}🎉 Smart QR Platform is ready!${NC}"
echo ""
echo -e "${YELLOW}📍 Services available at:${NC}"
echo -e "  Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "  Backend: ${GREEN}http://localhost:3001${NC}"
echo -e "  MinIO: ${GREEN}http://localhost:9001${NC}"
echo ""
echo -e "${YELLOW}📝 To start development:${NC}"
echo -e "  ${GREEN}yarn dev${NC}"
echo ""
