# 🌐 DNS Setup for firestarter.ignitabull.org

## Quick DNS Configuration

To make your Firestarter app accessible at `https://firestarter.ignitabull.org`, you need to configure DNS records.

### Option 1: A Record (Recommended)
```
Type: A
Name: firestarter
Value: [YOUR_COOLIFY_SERVER_IP]
TTL: 300 (or Auto)
```

### Option 2: CNAME Record
```
Type: CNAME  
Name: firestarter
Value: [YOUR_COOLIFY_SERVER_DOMAIN]
TTL: 300 (or Auto)
```

## Steps:

1. **Get Coolify Server IP**: Check your Coolify server's public IP address
2. **Access DNS Settings**: Go to your domain provider (where you manage ignitabull.org)
3. **Add Record**: Create the A or CNAME record above
4. **Wait for Propagation**: DNS changes take 5-60 minutes to propagate
5. **Verify**: Test with `nslookup firestarter.ignitabull.org`

## Coolify Configuration:

1. In Coolify dashboard, go to your application
2. Navigate to "Domains" section  
3. Add `firestarter.ignitabull.org` as custom domain
4. Coolify will automatically request SSL certificate from Let's Encrypt
5. Your app will be accessible with HTTPS! 🔒

## Verification:
```bash
# Check DNS propagation
nslookup firestarter.ignitabull.org

# Test connectivity
curl -I https://firestarter.ignitabull.org
```

That's it! Your domain will be ready for deployment. 🚀 