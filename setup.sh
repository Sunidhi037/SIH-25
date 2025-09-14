#!/bin/bash
echo "================================"
echo "  MannMitra Frontend Setup"
echo "================================"

# Step 1 - Create Vite React project
npm create vite@latest mannmitra-frontend -- --template react
cd mannmitra-frontend

# Step 2 - Install dependencies
npm install

# Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Router, Axios, Charts
npm install react-router-dom axios chart.js react-chartjs-2

# Bootstrap (optional)
npm install react-bootstrap bootstrap

echo "================================"
echo "✅ Setup complete!"
echo "cd mannmitra-frontend && npm run dev"
echo "Open http://localhost:5173"
echo "================================"
