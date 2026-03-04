# Quick Start Guide

Get your demo generator up and running in 60 seconds.

## Prerequisites

- Node.js 14+ installed
- 114 leads in `../scraper/leads/leads_2026-03-03_16-17.json` ✅

## Step 1: Generate Demos (30 seconds)

```bash
cd /Users/admin/.openclaw/workspace/web-agency/demo-generator

# Generate top 10 demos by rating
node generate-all-demos.js 10

# Or generate a specific demo
node generate-demo.js "Business Name"
```

**Output:**
- Config files created in `configs/`
- Summary saved to `configs/_summary.json`

## Step 2: Start Server (10 seconds)

```bash
# Default port 3000 (or use PORT=3002 if 3000 is busy)
node serve-demo.js
```

**Server starts at:** `http://localhost:3000`

## Step 3: View Demos (20 seconds)

Open your browser:

- **Index page:** http://localhost:3000/
- **Specific demo:** http://localhost:3000/demo/zavva-holdings

## That's It! 🎉

You now have:
- ✅ Automated demo generation
- ✅ Professional preview sites
- ✅ 48-hour trial banners
- ✅ CTA buttons for conversion

## Common Commands

```bash
# Generate single demo
node generate-demo.js "Zavva Holdings"

# Generate top 20 demos
node generate-all-demos.js 20

# Start server on custom port
PORT=3002 node serve-demo.js

# Run tests
./test.sh
```

## What's in a Demo?

Each demo includes:
- ⭐ Star rating and reviews
- 📞 Contact information
- 🕐 Business hours
- ✨ Services list
- 💬 Customer testimonials
- ⏰ 48-hour countdown timer
- 💳 "Get This Website" CTA button

## Next Steps

1. **Customize Stripe Link**
   - Edit `serve-demo.js` line 155
   - Replace with your Stripe payment link

2. **Send to Clients**
   - Email format: "I built you a website!"
   - Include demo link
   - Mention 48-hour trial

3. **Track Conversions**
   - Monitor CTA clicks
   - Follow up after 24 hours
   - Close deals! 💰

## Need Help?

- 📖 Full docs: `README.md`
- 🚀 Deployment: `DEPLOYMENT.md`
- 🧪 Run tests: `./test.sh`

---

**TIP:** The server shows all available demos at startup. Copy the URLs and share them with prospects!
