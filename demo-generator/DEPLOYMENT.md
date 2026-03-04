# Demo Generator Deployment Guide

## System Overview

The SiteForge AI Demo Generator is now fully operational with:

- ✅ 21 demo sites generated from your leads database
- ✅ Zavva Holdings test demo successfully created
- ✅ HTTP server running on port 3002
- ✅ All tests passing

## Current Status

**Server:** Running at `http://localhost:3002`

**Generated Demos:** 21 total
- 8 Barbershops
- 5 Dentists
- 3 Salons
- 1 Contractor (Dantes Construction)
- 1 Contractor (Zavva Holdings - test)
- 1 Auto repair (miscategorized, needs review)

**Files Created:**
```
demo-generator/
├── content-templates.js       (10.8 KB)
├── generate-demo.js           (4.6 KB)
├── generate-all-demos.js      (3.2 KB)
├── serve-demo.js              (14.6 KB)
├── package.json               (558 B)
├── README.md                  (5.1 KB)
├── DEPLOYMENT.md              (this file)
├── test.sh                    (2.2 KB)
└── configs/                   (21 demos + summary)
```

## Usage Instructions

### 1. Generate Individual Demo

```bash
cd /Users/admin/.openclaw/workspace/web-agency/demo-generator
node generate-demo.js "Business Name"
```

Example:
```bash
node generate-demo.js "Joe's Pizza"
```

### 2. Generate Batch Demos (Top N by Rating)

```bash
node generate-all-demos.js 20
```

This will:
- Sort all 114 leads by rating
- Take the top 20
- Generate configs for each
- Save summary to `configs/_summary.json`

### 3. Start Demo Server

```bash
PORT=3002 node serve-demo.js
```

Then visit:
- **Index:** http://localhost:3002/
- **Zavva Holdings:** http://localhost:3002/demo/zavva-holdings
- **Any demo:** http://localhost:3002/demo/{slug}

### 4. Run Tests

```bash
./test.sh
```

## Demo Features

Each demo includes:

### 1. Banner with Countdown Timer
- Shows time remaining until demo expires (48 hours)
- "Demo Preview" badge
- "Get This Website" CTA button (links to Stripe payment)

### 2. Business Profile
- Business name and tagline
- Star rating and review count
- Contact information (phone, address, email)

### 3. Content Sections
- **About Us:** Auto-generated description based on category
- **Services:** Category-appropriate service list
- **Hours:** Realistic operating hours
- **Reviews:** 5-8 customer testimonials

### 4. Responsive Design
- Mobile-friendly layout
- Professional gradient design
- Smooth animations and hover effects

## Content Generation

No external APIs are used. Content is generated via templates:

**Categories Supported:**
- Restaurant (& cafe, pizza, grill, etc.)
- Barbershop
- Contractor (& construction, builder)
- Auto Repair (& mechanic)
- Dentist (& dental)
- Salon (& hair, beauty)

**Generated Content:**
- Business descriptions (3 variants per category)
- Taglines (5 variants per category)
- Services (6-8 per category)
- Operating hours (realistic defaults)
- Customer reviews (10 templates, rotated)
- Photos (Unsplash URLs, curated per category)

## Integration Workflow

### Current Setup
1. **Scraper** → Finds businesses without websites → `leads.json`
2. **Demo Generator** → Creates configs → `configs/*.json`
3. **HTTP Server** → Serves demos → `http://localhost:3002/demo/*`

### Recommended Production Workflow
1. **Lead Acquisition**
   ```bash
   # Run scraper (existing tool)
   cd ../scraper
   node scrape.js
   ```

2. **Demo Generation**
   ```bash
   # Generate top 20 demos
   cd ../demo-generator
   node generate-all-demos.js 20
   ```

3. **Outreach Campaign**
   - Send personalized emails with demo links
   - Subject: "I built you a website - take a look!"
   - Body: Include demo link + 48-hour trial notice
   - CTA: "Get This Website" button in demo

4. **Conversion**
   - User clicks "Get This Website"
   - Redirects to Stripe payment link
   - After payment, copy config to site-generator
   - Deploy to Vercel with custom domain

5. **Fulfillment**
   ```bash
   # Copy winning config to site-generator
   cp configs/business-name.json ../site-generator/configs/current.json
   
   # Deploy to production
   cd ../site-generator
   vercel --prod
   ```

## Deployment to Production

### Option 1: Keep on Local Server (Testing)
Current setup works for local demos. Good for testing and preview.

### Option 2: Deploy to Cloud (Recommended)

**A. Deploy to Vercel (Static)**
```bash
# Add build script to package.json
# Convert to static HTML generator
# Deploy to Vercel for CDN hosting
```

**B. Deploy to Railway/Render (Node Server)**
```bash
# Add Procfile: web: node serve-demo.js
# Set environment variables
# Deploy via Git push
```

**C. Deploy to VPS (Full Control)**
```bash
# Use PM2 for process management
pm2 start serve-demo.js --name demo-server
pm2 save
pm2 startup

# Add nginx reverse proxy
# Set up SSL with Let's Encrypt
```

## Configuration

### Environment Variables
```bash
PORT=3002                    # Server port
STRIPE_PAYMENT_LINK=...      # Stripe payment URL (currently hardcoded)
DEMO_EXPIRY_HOURS=48         # Demo expiry time (currently 48h)
```

### Customization

**To change demo expiry time:**
Edit `generate-demo.js`, line 33:
```javascript
expiryDate.setHours(expiryDate.getHours() + 48);  // Change 48 to desired hours
```

**To change Stripe payment link:**
Edit `serve-demo.js`, line 155:
```javascript
<a href="https://buy.stripe.com/test_your_payment_link" class="demo-cta">
```

**To add new business categories:**
Edit `content-templates.js` and add new category object with:
- services array
- hours object
- taglines array
- descriptions array
- photos array

## Monitoring & Analytics

### Recommended Additions
- [ ] Add Google Analytics to track demo views
- [ ] Log CTA button clicks to database
- [ ] Set up email notifications when demo is accessed
- [ ] Track conversion rate (views → clicks)
- [ ] A/B test different CTAs and designs

### Current Logging
Server logs show:
- Demo page requests
- 404 errors
- Server start/stop events

View logs:
```bash
# If using PM2
pm2 logs demo-server

# If running directly
# Check terminal output
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3002

# Kill process
kill -9 <PID>

# Or use different port
PORT=3003 node serve-demo.js
```

### Demo Not Found (404)
- Check that config file exists in `configs/`
- Verify slug matches filename (without .json)
- Check file permissions (should be readable)

### Content Not Generated
- Verify leads.json file exists and is valid JSON
- Check business category is recognized
- Review content-templates.js for category mapping

### Server Crashes
- Check Node.js version (requires 14+)
- Verify all dependencies are installed
- Review error logs for stack trace
- Run test.sh to verify system integrity

## Next Steps

### Immediate
1. ✅ Generate more demos (currently have 21)
2. ✅ Test Zavva Holdings demo
3. ⏳ Update Stripe payment link with real link
4. ⏳ Add email notification system
5. ⏳ Deploy to production server

### Short-term
- Set up automated email outreach
- Implement analytics tracking
- Add custom domain routing
- Create admin dashboard for demo management
- Set up automated expiry cleanup cron job

### Long-term
- Integrate OpenAI for custom content
- Add multi-language support
- Build full CRM integration
- Create mobile app for demo management
- Add video walkthrough on demo pages

## Success Metrics

**Current Achievement:**
- ✅ 21 demos generated automatically
- ✅ Server running successfully
- ✅ All tests passing
- ✅ Zavva Holdings test demo verified

**Target Metrics:**
- 100+ demos generated
- 20% view-to-click rate on CTA
- 5% click-to-payment conversion
- <2s page load time
- 99.9% uptime

## Support

For issues or questions:
1. Check README.md for usage instructions
2. Run `./test.sh` to verify system health
3. Review server logs for errors
4. Check this deployment guide for troubleshooting

---

**System Status:** ✅ Fully Operational  
**Last Updated:** 2026-03-03  
**Version:** 1.0.0
