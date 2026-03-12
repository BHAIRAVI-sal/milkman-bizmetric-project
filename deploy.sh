#!/bin/bash

cd /home/azureuser/milkman-bizmetric-project

echo "Pulling latest code from GitHub..."
git pull origin main

echo "Updating frontend..."
cd frontend
npm install
npm run build
sudo rm -rf /var/www/frontend/*
sudo cp -r dist/* /var/www/frontend/

echo "Restarting backend..."
cd ../backend
source venv/bin/activate
pm2 restart milkman-backend

echo "Restarting nginx..."
sudo systemctl restart nginx

echo "Deployment finished!"
