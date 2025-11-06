# ============================================
# COMPLETE REACT DOCKER MULTI-STAGE BUILD
# ============================================

# This file contains everything you need:
# 1. Dockerfile (multi-stage)
# 2. .dockerignore
# 3. nginx.conf
# 4. package.json
# 5. React App code
# 6. Build and run instructions

# ============================================
# FILE 1: Dockerfile
# ============================================
# Save as: Dockerfile

# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy all source files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


# ============================================
# FILE 2: .dockerignore
# ============================================
# Save as: .dockerignore

node_modules
npm-debug.log
build
.dockerignore
Dockerfile
.git
.gitignore
README.md
.env
.DS_Store
coverage
.vscode


# ============================================
# FILE 3: nginx.conf
# ============================================
# Save as: nginx.conf

server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}


# ============================================
# FILE 4: package.json
# ============================================
# Save as: package.json

{
  "name": "react-docker-app",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}


# ============================================
# FILE 5: public/index.html
# ============================================
# Save as: public/index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="React Docker Multi-Stage Build Demo" />
    <title>React Docker App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>


# ============================================
# FILE 6: src/index.js
# ============================================
# Save as: src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


# ============================================
# FILE 7: src/App.js
# ============================================
# Save as: src/App.js

import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>🐳 React Docker Multi-Stage Build</h1>
          <div className="info-card">
            <h2>✅ Successfully Dockerized!</h2>
            <p>This React application is running in a Docker container using:</p>
            <ul>
              <li><strong>Stage 1:</strong> Node.js 18 Alpine for building</li>
              <li><strong>Stage 2:</strong> Nginx Alpine for serving</li>
            </ul>
          </div>
          <div className="stats">
            <div className="stat">
              <h3>Image Size</h3>
              <p>~50MB</p>
              <small>(vs ~1.2GB with dev dependencies)</small>
            </div>
            <div className="stat">
              <h3>Build Time</h3>
              <p>2-3 min</p>
              <small>(first build)</small>
            </div>
            <div className="stat">
              <h3>Server</h3>
              <p>Nginx</p>
              <small>(production-ready)</small>
            </div>
          </div>
          <div className="tech-stack">
            <span className="badge">React 18</span>
            <span className="badge">Docker</span>
            <span className="badge">Multi-Stage</span>
            <span className="badge">Nginx</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;


# ============================================
# FILE 8: src/App.css
# ============================================
# Save as: src/App.css

.App {
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.App-header {
  color: white;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
  animation: fadeInDown 0.8s ease;
}

.info-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInUp 1s ease;
}

.info-card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.info-card ul {
  list-style: none;
  padding: 0;
  text-align: left;
  max-width: 500px;
  margin: 1rem auto;
}

.info-card li {
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.stats {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0;
}

.stat {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  min-width: 150px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 1.2s ease;
}

.stat h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  opacity: 0.9;
}

.stat p {
  font-size: 2rem;
  margin: 0.5rem 0;
  font-weight: bold;
}

.stat small {
  font-size: 0.8rem;
  opacity: 0.7;
}

.tech-stack {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: fadeIn 1.5s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


# ============================================
# FILE 9: src/index.css
# ============================================
# Save as: src/index.css

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}


# ============================================
# SETUP AND BUILD INSTRUCTIONS
# ============================================

## Step 1: Create Project Structure
mkdir react-docker-app
cd react-docker-app

## Step 2: Create all files listed above
## Copy each section to its corresponding file

## Step 3: Build the Docker image
docker build -t react-docker-app .

## Step 4: Run the container
docker run -d -p 80:80 --name react-app react-docker-app

## Step 5: Access the application
## Open browser: http://localhost

## Step 6: Verify image size
docker images react-docker-app

## Additional Commands:

# Stop container
docker stop react-app

# Remove container
docker rm react-app

# View logs
docker logs react-app

# Check running containers
docker ps

# Remove image
docker rmi react-docker-app

# Build without cache
docker build --no-cache -t react-docker-app .


# ============================================
# VERIFICATION CHECKLIST
# ============================================

# ✓ Multi-stage build (Node.js + Nginx)
# ✓ Optimized image size (~50MB vs ~1.2GB)
# ✓ .dockerignore excludes unnecessary files
# ✓ Production-ready Nginx configuration
# ✓ Static file caching enabled
# ✓ Security headers configured
# ✓ Gzip compression enabled
# ✓ React app serves at http://localhost
# ✓ Clear separation of build/runtime stages
