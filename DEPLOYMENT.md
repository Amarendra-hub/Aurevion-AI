# Deployment Guide - Aurevion AI

This guide covers deploying Aurevion AI to production environments.

## Prerequisites

- Domain name (optional but recommended)
- SSH access to server or container registry
- Database hosting (PostgreSQL recommended)
- API keys for all services

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Push code to GitHub**
```bash
git push origin main
```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select "frontend" as root directory

3. **Configure Environment Variables**
   - Add `VITE_API_URL` pointing to your backend API

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your site will be available at `yourdomain.vercel.app`

### Option 2: Netlify

1. **Create Netlify Account**
   - Visit https://netlify.com
   - Connect GitHub account

2. **Create New Site**
   - Select your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Set root directory: `frontend`

3. **Add Environment Variables**
   - `VITE_API_URL`: Your backend URL

4. **Deploy** - Netlify will build and deploy automatically

### Option 3: Self-Hosted (Docker)

1. **Build Docker Image**
```bash
cd frontend
docker build -t aurevion-frontend:latest .
```

2. **Push to Registry**
```bash
docker tag aurevion-frontend:latest your-registry/aurevion-frontend:latest
docker push your-registry/aurevion-frontend:latest
```

3. **Deploy on Docker Host**
```bash
docker run -d \
  -p 80:3000 \
  -e VITE_API_URL=https://api.yourdomain.com \
  your-registry/aurevion-frontend:latest
```

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Connect Railway to GitHub**
   - Visit https://railway.app
   - Click "New Project"
   - Deploy from GitHub repo

2. **Configure Environment Variables**
   - Add all variables from `.env`
   - Set `DEBUG=False`
   - Set `CORS_ORIGINS` to your frontend URL

3. **Database Setup**
   - Add PostgreSQL plugin
   - Update `DATABASE_URL`

4. **Deploy**
   - Railway deploys automatically on push

### Option 2: Heroku

1. **Create Heroku App**
```bash
heroku login
heroku create aurevion-api
```

2. **Configure Environment Variables**
```bash
heroku config:set GEMINI_API_KEY=your_key
heroku config:set DEBUG=False
# ... set all other variables
```

3. **Add PostgreSQL**
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

4. **Deploy**
```bash
git push heroku main
```

### Option 3: AWS (EC2 + RDS)

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t3.medium or larger
   - Security group: allow ports 80, 443, 8000

2. **Install Dependencies**
```bash
sudo apt-get update
sudo apt-get install -y python3-pip python3-venv postgresql-client

# Clone repository
git clone your-repo
cd Aurevion-AI/backend

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

3. **Configure RDS Database**
   - Create PostgreSQL database
   - Update `DATABASE_URL` in `.env`

4. **Run with Gunicorn**
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app.main:app
```

5. **Setup Systemd Service**
Create `/etc/systemd/system/aurevion.service`:
```
[Unit]
Description=Aurevion AI Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/Aurevion-AI/backend
Environment="PATH=/home/ubuntu/Aurevion-AI/backend/venv/bin"
ExecStart=/home/ubuntu/Aurevion-AI/backend/venv/bin/gunicorn -w 4 -b 0.0.0.0:8000 app.main:app

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable aurevion
sudo systemctl start aurevion
```

### Option 4: Docker on Any Host

1. **Build Image**
```bash
cd backend
docker build -t aurevion-backend:latest .
```

2. **Run with Docker Compose**

Create `docker-compose.prod.yml`:
```yaml
version: '3.8'
services:
  backend:
    image: aurevion-backend:latest
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/aurevion
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - DEBUG=False
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: aurevion
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: aurevion
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## SSL/HTTPS Setup

### Using Let's Encrypt with Nginx

1. **Install Nginx**
```bash
sudo apt-get install -y nginx
```

2. **Configure Nginx**

Create `/etc/nginx/sites-available/aurevion`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/aurevion /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **Setup SSL with Certbot**
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

## Database Migrations

For production, run migrations:
```bash
alembic upgrade head
```

## Monitoring & Logging

### Application Logging

Update backend logging configuration:
```python
# In app/main.py
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

### Health Checks

Monitor your app with:
```bash
curl https://api.yourdomain.com/api/health
```

## Performance Optimization

### Frontend
- Enable gzip compression in Nginx
- Use CDN for static assets
- Implement caching headers

### Backend
- Enable response caching
- Optimize database queries
- Use connection pooling

### Database
- Create indexes on frequently queried columns
- Regular backups
- Monitor slow queries

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Update `CORS_ORIGINS` in backend `.env`
   - Ensure frontend URL is included

2. **Database Connection Issues**
   - Verify `DATABASE_URL` format
   - Check database is running
   - Verify firewall rules

3. **API Key Errors**
   - Verify API keys are correctly set
   - Check key permissions/scopes
   - Ensure keys haven't expired

## Security Checklist

- [ ] Change all default passwords
- [ ] Set `DEBUG=False` in production
- [ ] Use strong `SECRET_KEY`
- [ ] Enable HTTPS/SSL
- [ ] Setup firewall rules
- [ ] Enable database backups
- [ ] Monitor API usage
- [ ] Setup rate limiting
- [ ] Regular security updates
- [ ] Use environment variables for secrets

## Scaling Considerations

- Use load balancer (Nginx, HAProxy)
- Implement caching layer (Redis)
- Use CDN for static assets
- Database read replicas
- Horizontal scaling with containers
- API rate limiting

---

For more help, see main README.md or contact support@aurevion.ai
