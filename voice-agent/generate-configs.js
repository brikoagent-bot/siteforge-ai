#!/usr/bin/env node
/**
 * SiteForge AI — Lead → Demo Config Generator
 * Reads scraped leads and generates niche-specific demo site configs
 */

const fs = require('fs');
const path = require('path');

const LEADS_DIR = path.join(__dirname, '..', 'scraper', 'leads');
const CONFIGS_DIR = path.join(__dirname, '..', 'demo-generator', 'configs');

// Niche mapping from search terms to categories
const NICHE_MAP = {
  'restaurants': 'restaurant',
  'restaurant': 'restaurant',
  'barbershops': 'barbershop',
  'barbershop': 'barbershop',
  'barber': 'barbershop',
  'dentists': 'dentist',
  'dentist': 'dentist',
  'dental': 'dentist',
  'salons': 'salon',
  'salon': 'salon',
  'hair': 'salon',
  'beauty': 'salon',
  'contractors': 'contractor',
  'contractor': 'contractor',
  'construction': 'contractor',
  'auto repair': 'auto_repair',
  'auto': 'auto_repair',
  'mechanic': 'auto_repair',
  'automotive': 'auto_repair',
};

// Niche-specific content
const NICHE_CONTENT = {
  dentist: {
    taglines: ['Your Smile, Our Priority', 'Modern Dentistry, Compassionate Care', 'Creating Confident Smiles', 'Where Dental Excellence Meets Comfort', 'Gentle Care for the Whole Family'],
    services: ['Cleanings & Prevention', 'Teeth Whitening', 'Dental Implants', 'Crowns & Bridges', 'Root Canal Therapy', 'Cosmetic Dentistry'],
    reviews: [
      "Dr. and the team made my root canal completely painless. The office is immaculate and everyone is so friendly.",
      "Best dental experience I've ever had. They take the time to explain everything and the results are amazing.",
      "I was terrified of dentists until I came here. The staff is so patient and gentle. Now I actually look forward to my appointments.",
      "My kids love coming here. The pediatric team is incredible and the office has a great vibe.",
      "Got my veneers done here and I couldn't be happier. Professional, detailed, and the results are stunning.",
    ],
    photos: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800',
    ],
    description: (name) => `${name} provides comprehensive dental care in a warm, modern environment. Our experienced team combines cutting-edge technology with a gentle approach to help you achieve and maintain your healthiest smile.`,
  },
  barbershop: {
    taglines: ['Crafted Cuts, Timeless Style', 'Where Tradition Meets Modern Grooming', 'Your Style, Perfected', 'The Art of the Perfect Cut', 'Sharp Looks, Every Time'],
    services: ['Classic Haircuts', 'Beard Trim & Shape', 'Hot Towel Shave', 'Fade & Taper', 'Hair Design', 'Kids Cuts'],
    reviews: [
      "Best fade in the city, hands down. Been coming here for three years and never been disappointed.",
      "Finally found a barber who actually listens. The attention to detail is unmatched.",
      "The vibe in here is incredible. Great music, cold drinks, and the most precise lineups I've ever gotten.",
      "Walked in looking rough, walked out looking like a million bucks. These guys are artists.",
      "My go-to spot. Consistent quality every single time. The hot towel shave is a must-try.",
    ],
    photos: [
      'https://images.unsplash.com/photo-1585747860019-24e16c60506e?w=800',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
    ],
    description: (name) => `${name} is more than a barbershop — it's an experience. Our skilled barbers combine traditional techniques with modern styles to deliver precision cuts in a relaxed, welcoming atmosphere.`,
  },
  restaurant: {
    taglines: ['Flavors That Tell a Story', 'Fresh Ingredients, Bold Flavors', 'A Culinary Experience Like No Other', 'Where Every Meal Is a Celebration', 'Taste the Difference'],
    services: ['Dine-In', 'Takeout & Delivery', 'Catering', 'Private Events', 'Full Bar', 'Weekend Brunch'],
    reviews: [
      "The food was absolutely incredible. Every dish was beautifully presented and bursting with flavor.",
      "Best dining experience in the area. The atmosphere is perfect for date night and the menu never disappoints.",
      "We had our anniversary dinner here and it was magical. The staff went above and beyond to make it special.",
      "The chef's special was out of this world. Fresh, creative, and perfectly executed. Will definitely be back.",
      "Great food, great service, great vibes. This place has become our family's favorite spot.",
    ],
    photos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    description: (name) => `${name} brings you a dining experience crafted with passion and the finest ingredients. From our kitchen to your table, every dish tells a story of flavor, tradition, and culinary artistry.`,
  },
  salon: {
    taglines: ['Where Beauty Meets Artistry', 'Elevate Your Look', 'Your Personal Style Sanctuary', 'Beauty Refined', 'The Art of Beautiful Hair'],
    services: ['Precision Cuts', 'Color Services', 'Balayage & Highlights', 'Keratin Treatments', 'Styling & Updos', 'Hair Extensions'],
    reviews: [
      "Pure luxury from start to finish. My stylist understood exactly what I wanted and delivered perfection.",
      "The color work here is incredible. My balayage looks natural and beautiful — exactly what I envisioned.",
      "Finally found a salon that truly listens. Every visit feels like self-care, not just a haircut.",
      "The atmosphere is serene, the team is talented, and the results speak for themselves.",
      "I've been to dozens of salons and this one is by far the best. The attention to detail is remarkable.",
    ],
    photos: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800',
    ],
    description: (name) => `${name} is a sanctuary for self-care and style. Our expert stylists combine artistry with the finest products to create looks that are uniquely you. Experience beauty at its finest.`,
  },
  contractor: {
    taglines: ['Building Excellence, One Project at a Time', 'Quality Craftsmanship You Can Trust', 'Your Vision, Built Right', 'Built to Last', 'Where Quality Meets Commitment'],
    services: ['Kitchen Remodeling', 'Bathroom Renovation', 'Room Additions', 'Roofing & Siding', 'Flooring Installation', 'Custom Decks & Patios'],
    reviews: [
      "They transformed our outdated kitchen into a modern masterpiece. On time, on budget, and incredible craftsmanship.",
      "Professional from day one. The crew was respectful, clean, and the results exceeded every expectation.",
      "Best contractor we've ever worked with. They handled permits, timeline, and quality like true pros.",
      "Our bathroom renovation turned out even better than the design plans. Meticulous attention to every detail.",
      "Honest, reliable, and skilled. Hard to find all three in a contractor but these guys deliver on all counts.",
    ],
    photos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    ],
    description: (name) => `${name} delivers quality construction and renovation services with integrity and precision. From concept to completion, our licensed team treats every project as if it were our own home.`,
  },
  auto_repair: {
    taglines: ['Honest Service, Expert Repair', 'Keeping You on the Road', 'Precision Auto Care You Can Trust', 'Your Car Deserves the Best', 'Expert Care, Fair Prices'],
    services: ['Oil Change & Fluids', 'Brake Service', 'Engine Diagnostics', 'Transmission Repair', 'AC & Heating', 'Tire Service & Alignment'],
    reviews: [
      "Honest mechanics are hard to find. These guys diagnosed the issue in 20 minutes and didn't try to upsell me.",
      "Fast, fair, and thorough. They showed me exactly what was wrong and had me back on the road same day.",
      "Been bringing both our cars here for two years. Consistent quality and they always go the extra mile.",
      "The diagnostic team found a problem two other shops missed. Saved me thousands in potential damage.",
      "No-nonsense auto shop. Fair prices, quality work, and they actually explain what they're doing.",
    ],
    photos: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
      'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800',
    ],
    description: (name) => `${name} provides expert auto repair and maintenance with transparency and integrity. Our certified technicians use state-of-the-art diagnostics to keep your vehicle running at its best.`,
  },
};

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);
}

function detectCategory(lead) {
  const niche = (lead.search_niche || '').toLowerCase();
  const cat = (lead.category || '').toLowerCase();
  
  for (const [key, val] of Object.entries(NICHE_MAP)) {
    if (niche.includes(key) || cat.includes(key)) return val;
  }
  return 'dentist'; // fallback
}

function generateConfig(lead) {
  const category = detectCategory(lead);
  const content = NICHE_CONTENT[category];
  const slug = slugify(lead.name);
  
  // Pick random items
  const tagline = content.taglines[Math.floor(Math.random() * content.taglines.length)];
  const reviews = content.reviews.sort(() => Math.random() - 0.5).slice(0, 3);
  
  return {
    business_name: lead.name,
    category,
    address: lead.address || lead.city || '',
    phone: lead.phone || '',
    email: `contact@${slug}.com`,
    rating: lead.rating || 5.0,
    review_count: Math.min(lead.review_count || 50, 9999),
    reviews,
    hours: { 'mon-fri': '9am-6pm', saturday: '10am-4pm', sunday: 'Closed' },
    photos: content.photos,
    services: content.services,
    tagline,
    description: content.description(lead.name),
    demo_mode: true,
    demo_expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    maps_url: lead.maps_url || '',
    slug,
  };
}

function main() {
  // Load all leads
  const allLeads = [];
  const files = fs.readdirSync(LEADS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));
  
  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(LEADS_DIR, file), 'utf8'));
      if (data.leads) allLeads.push(...data.leads);
    } catch {}
  }
  
  console.log(`📊 Total leads: ${allLeads.length}`);
  
  // Load existing configs
  const existingSlugs = new Set();
  if (fs.existsSync(CONFIGS_DIR)) {
    fs.readdirSync(CONFIGS_DIR)
      .filter(f => f.endsWith('.json') && !f.startsWith('_'))
      .forEach(f => existingSlugs.add(f.replace('.json', '')));
  }
  
  console.log(`📁 Existing configs: ${existingSlugs.size}`);
  
  // Sort by rating * review_count (best first)
  allLeads.sort((a, b) => (b.rating * (b.review_count || 1)) - (a.rating * (a.review_count || 1)));
  
  // Generate configs for leads that don't have one yet
  let generated = 0;
  for (const lead of allLeads) {
    const slug = slugify(lead.name);
    if (existingSlugs.has(slug)) continue;
    
    const config = generateConfig(lead);
    const configPath = path.join(CONFIGS_DIR, `${slug}.json`);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    existingSlugs.add(slug);
    generated++;
    
    console.log(`  ✅ ${lead.name} (${config.category}) → ${slug}`);
  }
  
  console.log(`\n🎯 Generated ${generated} new configs (total: ${existingSlugs.size})`);
}

main();
