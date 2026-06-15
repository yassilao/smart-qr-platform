#!/bin/bash

echo "🧹 Cleaning up Docker containers and volumes..."
docker-compose down -v

echo "✅ Cleanup complete!"
echo ""
echo "To remove images as well, run:"
echo "  docker rmi smart-qr-backend smart-qr-frontend"
