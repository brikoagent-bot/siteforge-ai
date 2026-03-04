# SiteForge AI Demo Generator

Automated demo site generator for creating instant website previews for potential clients.

## Features

- 🎨 Generates professional demo sites from lead data
- ⚡ Template-based content generation (no external APIs needed)
- 🏷️ Support for 6+ business categories (restaurant, barbershop, contractor, etc.)
- ⏰ 48-hour demo expiry with countdown timer
- 💳 Built-in CTA for Stripe payment
- 📊 Batch generation for top-rated leads

## Quick Start

### 1. Generate a Single Demo

```bash
node generate-demo.js "Business Name"
```

Example:
```bash
node generate-demo.js "Zavva Holdings"
```

This creates a config file in `configs/` with:
- Business info mapped from leads database
- Auto-generated description, tagline, services
- Realistic hours based on business category
- 48-hour expiry timestamp
- Professional photos from Unsplash

### 2. Generate Multiple Demos (Top N by Rating)

```bash
node generate-all-demos.js 10
```

This will:
- Load all 114 leads from the database
- Sort by rating and review count
- Generate configs for the top 10
- Save summary to `configs/_summary.json`

### 3. Serve the Demos

```bash
node serve-demo.js
```

Then visit:
- `http://localhost:3000/` - Index page showing all demos
- `http://localhost:3000/demo/{slug}` - Individual demo site

Each demo includes:
- Countdown timer banner (48h trial)
- "Get This Website" CTA button
- Full business profile with services, hours, reviews
- Responsive design

## File Structure

```
demo-generator/
├── content-templates.js      # Content generation logic
├── generate-demo.js          # Single demo generator
├── generate-all-demos.js     # Batch generator
├── serve-demo.js             # HTTP server for demos
├── package.json              # NPM config
├── README.md                 # This file
└── configs/                  # Generated demo configs
    ├── zavva-holdings.json
    ├── joes-pizza.json
    └── _summary.json
```

## Config Format

Each generated config includes:

```json
{
  "business_name": "Zavva Holdings",
  "category": "contractor",
  "address": "Greenville, SC",
  "phone": "+1 7282193918",
  "email": "contact@zavva-holdings.com",
  "rating": 4.8,
  "review_count": 42,
  "reviews": ["Great service!", "Highly recommend!"],
  "hours": {
    "mon-fri": "7am-6pm",
    "saturday": "8am-4pm",
    "sunday": "Closed"
  },
  "photos": ["https://images.unsplash.com/..."],
  "services": ["Kitchen Remodeling", "Bathroom Renovation", "..."],
  "tagline": "Quality craftsmanship, reliable service",
  "description": "Full-service contractor...",
  "demo_mode": true,
  "demo_expires": "2026-03-05T16:00:00Z",
  "slug": "zavva-holdings"
}
```

## Content Generation

Content is generated using template-based logic (no external APIs):

### Supported Categories
- Restaurant (& variations: cafe, pizza, grill, bistro)
- Barbershop
- Contractor (& construction, builder, remodeling)
- Auto Repair (& mechanic, auto shop)
- Dentist (& dental)
- Salon (& hair, beauty)

### Generated Content
- **Taglines**: Rotating set of professional taglines per category
- **Descriptions**: Template-based with business name/category injection
- **Services**: Category-appropriate service lists (6-8 items)
- **Hours**: Realistic default hours by business type
- **Reviews**: 5-8 generic positive reviews
- **Photos**: Curated Unsplash images per category

## CLI Options

### generate-demo.js
```bash
node generate-demo.js "Business Name" [options]

Options:
  --config-only     Only generate config, skip deployment info
  --port <number>   Port number for demo (default: 3001)
```

### generate-all-demos.js
```bash
node generate-all-demos.js [number]

Arguments:
  number           Number of top leads to generate (default: 10)
```

### serve-demo.js
```bash
node serve-demo.js

Environment:
  PORT             Server port (default: 3000)
```

## Testing

Generate and serve the Zavva Holdings demo:

```bash
# Generate config
node generate-demo.js "Zavva Holdings"

# Start server
node serve-demo.js

# Visit: http://localhost:3000/demo/zavva-holdings
```

## Integration with Next.js Site Generator

The configs generated here are compatible with the site-generator project at `../site-generator/`. You can:

1. Copy a config to `../site-generator/configs/current.json`
2. Run `npm run dev` in site-generator
3. See the full Next.js template in action

## Deployment Workflow

1. **Lead Acquisition**: Scraper finds businesses without websites
2. **Demo Generation**: `generate-all-demos.js` creates configs for top leads
3. **Demo Serving**: `serve-demo.js` hosts preview sites
4. **Outreach**: Send demo links to business owners
5. **Conversion**: CTA button leads to Stripe payment
6. **Production**: Copy config to site-generator, deploy to Vercel

## Future Enhancements

- [ ] Add OpenAI integration for custom content generation
- [ ] Support for more business categories
- [ ] Custom domain routing per demo
- [ ] Analytics tracking (views, clicks)
- [ ] Email notification on CTA clicks
- [ ] Automated expiry cleanup
- [ ] Database integration for config storage

## License

MIT
