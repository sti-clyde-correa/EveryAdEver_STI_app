# Deployment Guide for Vibe Lab Application

This guide outlines the steps to build and deploy the Vibe Lab application, which consists of a Vite frontend and NestJS backend.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Access to your production server
- Git (optional, for version control)

## Local Build Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build Both Frontend and Backend**
   ```bash
   npm run build
   ```
   This command will:
   - Build the Vite frontend (`npm run build:client`)
   - Build the NestJS backend (`npm run build:server`)
   - Output frontend files to `dist/spa`
   - Output backend files to `dist/server`

## Production Deployment Steps

### Option 1: Traditional Server Deployment

1. **Prepare Production Server**
   ```bash
   # Update system packages
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   ```

2. **Transfer Files to Server**
   ```bash
   # Option A: Using SCP
   scp -r dist/* user@your-server:/path/to/app
   
   # Option B: Using Git
   git clone <repository-url>
   cd your-app
   npm install
   npm run build
   ```

3. **Configure Environment Variables**
   Create a `.env` file in your production server:
   ```
   NODE_ENV=production
   PORT=8080
   # Add other environment variables
   ```

4. **Start the Application**
   ```bash
   # Start using PM2
   pm2 start dist/server/main.js --name vibe-lab
   
   # Save PM2 configuration to run on system startup
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx as Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       # Serve static frontend files
       location / {
           root /path/to/app/dist/spa;
           try_files $uri $uri/ /index.html;
       }

       # Proxy API requests to NestJS backend
       location /api {
           proxy_pass http://localhost:8080;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable HTTPS (Recommended)**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx
   
   # Obtain SSL certificate
   sudo certbot --nginx -d your-domain.com
   ```

### Option 2: Docker Deployment

1. **Create a Dockerfile**
   ```dockerfile
   # Build stage
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # Production stage
   FROM node:18-alpine
   WORKDIR /app
   COPY --from=builder /app/dist ./dist
   COPY package*.json ./
   RUN npm install --production
   EXPOSE 8080
   CMD ["node", "dist/server/main.js"]
   ```

2. **Build and Run Docker Container**
   ```bash
   # Build Docker image
   docker build -t vibe-lab .

   # Run container
   docker run -d -p 80:8080 --name vibe-lab vibe-lab
   ```

## Monitoring and Maintenance

1. **Monitor Application**
   ```bash
   # Check PM2 status
   pm2 status
   pm2 logs vibe-lab

   # Check Nginx status
   sudo systemctl status nginx
   ```

2. **Backup Strategy**
   - Regularly backup your database
   - Keep backup of environment configurations
   - Document any custom modifications

3. **Update Application**
   ```bash
   # Pull latest changes
   git pull origin main

   # Install dependencies
   npm install

   # Rebuild application
   npm run build

   # Restart PM2 process
   pm2 restart vibe-lab
   ```

## Security Considerations

1. **Enable Security Headers in Nginx**
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN";
   add_header X-XSS-Protection "1; mode=block";
   add_header X-Content-Type-Options "nosniff";
   ```

2. **Set Up Firewall**
   ```bash
   # Allow only necessary ports
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 22
   sudo ufw enable
   ```

3. **Regular Updates**
   ```bash
   # Update system packages
   sudo apt update && sudo apt upgrade -y

   # Update npm packages
   npm audit
   npm update
   ```

## Troubleshooting

1. **Check Logs**
   ```bash
   # PM2 logs
   pm2 logs vibe-lab

   # Nginx logs
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```

2. **Common Issues**
   - Port conflicts: Check if ports 80/443 are available
   - Permission issues: Ensure proper file ownership
   - Memory issues: Monitor system resources with `htop`

## Rollback Procedure

1. **Keep Previous Builds**
   ```bash
   # Create backup of current build
   cp -r dist dist_backup_$(date +%Y%m%d)
   ```

2. **Rollback Steps**
   ```bash
   # Restore previous version
   rm -rf dist
   cp -r dist_backup_[DATE] dist
   pm2 restart vibe-lab
   ```

For any issues or questions, refer to the project documentation or contact the development team.
