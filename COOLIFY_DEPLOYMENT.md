# 🚀 Coolify Deployment Guide for Firestarter

This guide will help you deploy your Firestarter application to Coolify, a self-hosted alternative to Heroku/Netlify/Vercel.

## 📋 Prerequisites

1. **Coolify Server**: You need a running Coolify instance
2. **Git Repository**: Push your code to GitHub/GitLab/Gitea
3. **Environment Variables**: Collect your API keys (see `.env.example`)

## 🐳 Docker Configuration

Your app is now containerized with these files:
- `Dockerfile` - Multi-stage build for production
- `docker-compose.yml` - Local testing and deployment
- `.dockerignore` - Optimized build context
- `.env.example` - Environment variable template

## 🔧 Local Testing

Test the Docker build locally before deploying:

```bash
# Build the Docker image
docker build -t firestarter .

# Test with docker-compose
cp .env.example .env
# Edit .env with your actual API keys
docker-compose up

# Visit http://localhost:3000
```

## 🚀 Coolify Deployment Methods

### Method 1: Git Repository (Recommended)

1. **Push to Git**:
   ```bash
   git add .
   git commit -m "Add Docker configuration for Coolify"
   git push origin main
   ```

2. **Create Application in Coolify**:
   - Go to your Coolify dashboard
   - Click "New Resource" → "Application"
   - Select "Public Repository" or connect your Git provider
   - Enter your repository URL
   - Select branch (usually `main`)

3. **Configure Build**:
   - Build Pack: `Docker`
   - Dockerfile Path: `./Dockerfile`
   - Docker Compose Path: `./docker-compose.yml` (optional)

4. **Set Environment Variables**:
   ```env
   NEXT_PUBLIC_URL=https://firestarter.ignitabull.org
   FIRECRAWL_API_KEY=fc-your-key
   OPENAI_API_KEY=sk-proj-your-key
   # ... add all variables from .env.example
   ```

5. **Deploy**: Click "Deploy" button

### Method 2: Docker Image

1. **Build and Push to Registry**:
   ```bash
   # Build image
   docker build -t your-registry/firestarter:latest .
   
   # Push to registry (Docker Hub, GitHub Container Registry, etc.)
   docker push your-registry/firestarter:latest
   ```

2. **Deploy from Image**:
   - In Coolify: "New Resource" → "Service"
   - Select "Docker Image"
   - Image: `your-registry/firestarter:latest`
   - Port: `3000`

## 📊 Health Checks

The container includes a health check endpoint:
- **URL**: `/api/check-env`
- **Purpose**: Validates environment variables and dependencies
- **Coolify**: Will automatically use this for health monitoring

## 🔐 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_URL` | Yes | https://firestarter.ignitabull.org |
| `FIRECRAWL_API_KEY` | Yes | Web scraping API key |
| `OPENAI_API_KEY` | Yes | Primary AI provider |
| `ANTHROPIC_API_KEY` | No | Claude AI provider |
| `GROQ_API_KEY` | No | Groq AI provider |
| `UPSTASH_SEARCH_REST_URL` | No | Vector database URL |
| `UPSTASH_SEARCH_REST_TOKEN` | No | Vector database token |
| `UPSTASH_REDIS_REST_URL` | No | Redis database URL |
| `UPSTASH_REDIS_REST_TOKEN` | No | Redis database token |
| `DISABLE_CHATBOT_CREATION` | No | Set to 'true' for read-only mode |

## 🔧 Coolify-Specific Configuration

### Domains & DNS Configuration
- **Your Custom Domain**: `firestarter.ignitabull.org`
- **DNS Setup Required**:
  ```bash
  # Add A record pointing to your Coolify server IP
  # OR add CNAME record pointing to your Coolify server domain
  
  # Example DNS records:
  Type: A
  Name: firestarter
  Value: YOUR_COOLIFY_SERVER_IP
  TTL: 300 (or Auto)
  ```
- Configure custom domain in Coolify dashboard
- SSL certificates are automatically managed via Let's Encrypt

### Scaling
- **Horizontal**: Use Coolify's built-in load balancing
- **Vertical**: Adjust container resources in dashboard
- **Database**: Use managed Upstash services (Redis, Vector DB)

### Backups
- **Code**: Automatic Git-based deployments
- **Data**: Handled by external services (Upstash)
- **Logs**: Available in Coolify dashboard

## 🐛 Troubleshooting

### Build Issues
```bash
# Check build logs in Coolify dashboard
# Common issues:
# 1. Missing environment variables
# 2. pnpm vs npm conflicts (fixed with pnpm in Dockerfile)
# 3. Memory limits during build
```

### Runtime Issues
```bash
# Check application logs in Coolify
# Visit /api/check-env to validate configuration
# Ensure all required API keys are set
```

### Performance Optimization
- **Image Size**: ~150MB (optimized with multi-stage build)
- **Cold Start**: ~2-3 seconds with standalone build
- **Memory**: Minimum 512MB recommended
- **CPU**: 0.5 vCPU minimum for production

## 🔄 CI/CD Pipeline

Enable automatic deployments:
1. **Webhook**: Coolify provides Git webhooks
2. **Auto-Deploy**: Enable in repository settings
3. **Branch Protection**: Deploy only from `main` branch
4. **Build Cache**: Coolify caches Docker layers

## 📚 Additional Resources

- [Coolify Documentation](https://coolify.io/docs)
- [Next.js Docker Best Practices](https://nextjs.org/docs/deployment#docker-image)
- [Firecrawl API Documentation](https://docs.firecrawl.dev)

## 🆘 Support

If you encounter issues:
1. Check Coolify logs first
2. Verify environment variables at `/api/check-env`
3. Test Docker build locally
4. Check API key validity and quotas

---

**🎉 Your Firestarter app is now ready for Coolify deployment!** 