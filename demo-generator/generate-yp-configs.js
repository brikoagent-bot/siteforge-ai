#!/usr/bin/env node
/**
 * Generate personalized demo configs for YellowPages leads
 * Each config creates a unique landing page for the business
 */
const fs = require('fs');
const path = require('path');

const LEADS_FILE = path.join(__dirname, '..', 'scraper', 'leads', 'yp-leads-consolidated.json');
const CONFIGS_DIR = path.join(__dirname, 'configs');

// Category templates with relevant services, photos, taglines
const CATEGORY_TEMPLATES = {
  'auto repair': {
    services: ['Oil Change & Filter', 'Brake Repair', 'Engine Diagnostics', 'Transmission Service', 'AC Repair', 'Tire Rotation & Balance'],
    photos: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800'
    ],
    taglines: ['Your Trusted Local Mechanic', 'Expert Auto Care You Can Count On', 'Honest Service, Fair Prices'],
    accent: '#DC2626'
  },
  'contractors': {
    services: ['General Construction', 'Home Remodeling', 'Kitchen & Bath Renovation', 'Roofing & Siding', 'Flooring Installation', 'Commercial Build-Outs'],
    photos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'
    ],
    taglines: ['Building Your Vision', 'Quality Craftsmanship, Every Project', 'From Blueprint to Reality'],
    accent: '#EA580C'
  },
  'dentists': {
    services: ['General Dentistry', 'Teeth Whitening', 'Dental Implants', 'Invisalign', 'Root Canal Therapy', 'Pediatric Dentistry'],
    photos: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
      'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800'
    ],
    taglines: ['Your Smile, Our Priority', 'Modern Dentistry, Gentle Care', 'Transforming Smiles Daily'],
    accent: '#2563EB'
  },
  'cleaning services': {
    services: ['Residential Cleaning', 'Commercial Cleaning', 'Deep Cleaning', 'Move-In/Move-Out Cleaning', 'Carpet Cleaning', 'Window Cleaning'],
    photos: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800'
    ],
    taglines: ['Spotless Every Time', 'Professional Cleaning You Can Trust', 'A Cleaner Space, A Better Life'],
    accent: '#0891B2'
  },
  'restaurants': {
    services: ['Dine-In', 'Takeout & Delivery', 'Catering Services', 'Private Events', 'Online Ordering', 'Family Meals'],
    photos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
    ],
    taglines: ['Flavors That Tell a Story', 'Where Every Meal Is an Experience', 'Authentic Taste, Every Plate'],
    accent: '#B45309'
  },
  'salons': {
    services: ['Haircuts & Styling', 'Color & Highlights', 'Blowouts', 'Hair Treatments', 'Bridal Packages', 'Men\'s Grooming'],
    photos: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800'
    ],
    taglines: ['Style That Speaks', 'Where Beauty Meets Artistry', 'Look Good, Feel Amazing'],
    accent: '#9B2335'
  },
  'locksmiths': {
    services: ['Emergency Lockout', 'Lock Installation', 'Key Duplication', 'Commercial Security', 'Auto Locksmith', 'Safe Services'],
    photos: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800',
      'https://images.unsplash.com/photo-1585153279622-e91f4276eced?w=800'
    ],
    taglines: ['24/7 Emergency Service', 'Your Security Is Our Business', 'Fast, Reliable Locksmith Service'],
    accent: '#4338CA'
  },
  'moving services': {
    services: ['Local Moving', 'Long Distance Moving', 'Packing Services', 'Commercial Moving', 'Storage Solutions', 'Piano & Specialty Moving'],
    photos: [
      'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800'
    ],
    taglines: ['Moving Made Simple', 'Your Belongings, Our Priority', 'Stress-Free Moves, Every Time'],
    accent: '#059669'
  },
  'home improvement': {
    services: ['Kitchen Remodeling', 'Bathroom Renovation', 'Flooring', 'Painting', 'Deck & Patio', 'Basement Finishing'],
    photos: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'
    ],
    taglines: ['Transform Your Home', 'Quality Renovations, Lasting Results', 'Your Dream Home Awaits'],
    accent: '#D97706'
  },
  'pest control': {
    services: ['Termite Treatment', 'Rodent Control', 'Bed Bug Removal', 'Mosquito Treatment', 'Wildlife Removal', 'Commercial Pest Control'],
    photos: [
      'https://images.unsplash.com/photo-1632935190845-4b9ed23a4930?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    taglines: ['Pest-Free Guaranteed', 'Protecting Your Home & Family', 'Safe, Effective Pest Solutions'],
    accent: '#16A34A'
  },
  'spa services': {
    services: ['Swedish Massage', 'Deep Tissue Massage', 'Facials', 'Body Wraps', 'Couples Packages', 'Prenatal Massage'],
    photos: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
      'https://images.unsplash.com/photo-1540555700478-4be289fbec6e?w=800'
    ],
    taglines: ['Relax, Restore, Rejuvenate', 'Your Wellness Journey Starts Here', 'Luxury Spa Experience'],
    accent: '#7C3AED'
  },
  'real estate services': {
    services: ['Residential Sales', 'Property Management', 'Commercial Real Estate', 'Investment Consulting', 'Home Staging', 'Market Analysis'],
    photos: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800'
    ],
    taglines: ['Find Your Dream Home', 'Expert Guidance, Every Step', 'Your Real Estate Partner'],
    accent: '#0369A1'
  },
  'doors': {
    services: ['Garage Door Installation', 'Garage Door Repair', 'Spring Replacement', 'Opener Installation', 'Commercial Doors', 'Emergency Service'],
    photos: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    taglines: ['Doors Done Right', 'Expert Installation & Repair', 'Same-Day Service Available'],
    accent: '#78716C'
  },
  'entertainers': {
    services: ['Live Performances', 'DJ Services', 'Event Entertainment', 'Private Parties', 'Corporate Events', 'Wedding Entertainment'],
    photos: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'
    ],
    taglines: ['Unforgettable Entertainment', 'Making Moments Memorable', 'Bringing the Party to You'],
    accent: '#E11D48'
  },
  'hotels lodging': {
    services: ['Rooms & Suites', 'Event Spaces', 'Concierge Service', 'Room Service', 'Airport Shuttle', 'Business Center'],
    photos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'
    ],
    taglines: ['Your Home Away From Home', 'Comfort Meets Elegance', 'Rest, Relax, Recharge'],
    accent: '#0D9488'
  },
  'roadside assistance': {
    services: ['Jump Start', 'Flat Tire Change', 'Fuel Delivery', 'Towing Service', 'Lockout Assistance', 'Winch-Out Service'],
    photos: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800'
    ],
    taglines: ['Help When You Need It Most', '24/7 Roadside Support', 'Stranded? We\'re On Our Way'],
    accent: '#DC2626'
  }
};

// Default template for categories without specific mapping
const DEFAULT_TEMPLATE = {
  services: ['Consultation', 'Custom Solutions', 'Maintenance & Support', 'Emergency Service', 'Free Estimates', 'Satisfaction Guaranteed'],
  photos: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
  ],
  taglines: ['Professional Service You Can Trust', 'Excellence in Every Detail', 'Your Local Experts'],
  accent: '#2563EB'
};

// Category mapping (normalize various category strings)
function getTemplate(category) {
  if (!category) return DEFAULT_TEMPLATE;
  const cat = category.toLowerCase();
  
  // Direct match
  if (CATEGORY_TEMPLATES[cat]) return CATEGORY_TEMPLATES[cat];
  
  // Fuzzy match
  for (const [key, tmpl] of Object.entries(CATEGORY_TEMPLATES)) {
    if (cat.includes(key) || key.includes(cat)) return tmpl;
  }
  
  // Keyword match
  if (cat.includes('auto') || cat.includes('mechanic') || cat.includes('car')) return CATEGORY_TEMPLATES['auto repair'];
  if (cat.includes('construct') || cat.includes('build') || cat.includes('contractor')) return CATEGORY_TEMPLATES['contractors'];
  if (cat.includes('dent')) return CATEGORY_TEMPLATES['dentists'];
  if (cat.includes('clean')) return CATEGORY_TEMPLATES['cleaning services'];
  if (cat.includes('restaurant') || cat.includes('food') || cat.includes('dining')) return CATEGORY_TEMPLATES['restaurants'];
  if (cat.includes('salon') || cat.includes('hair') || cat.includes('beauty')) return CATEGORY_TEMPLATES['salons'];
  if (cat.includes('lock')) return CATEGORY_TEMPLATES['locksmiths'];
  if (cat.includes('mov')) return CATEGORY_TEMPLATES['moving services'];
  if (cat.includes('home') || cat.includes('remodel') || cat.includes('renov')) return CATEGORY_TEMPLATES['home improvement'];
  if (cat.includes('pest')) return CATEGORY_TEMPLATES['pest control'];
  if (cat.includes('spa') || cat.includes('massage') || cat.includes('wellness')) return CATEGORY_TEMPLATES['spa services'];
  if (cat.includes('real estate') || cat.includes('property')) return CATEGORY_TEMPLATES['real estate services'];
  if (cat.includes('door') || cat.includes('garage')) return CATEGORY_TEMPLATES['doors'];
  if (cat.includes('entertain') || cat.includes('dj') || cat.includes('music')) return CATEGORY_TEMPLATES['entertainers'];
  if (cat.includes('hotel') || cat.includes('lodg') || cat.includes('inn')) return CATEGORY_TEMPLATES['hotels lodging'];
  if (cat.includes('tow') || cat.includes('roadside')) return CATEGORY_TEMPLATES['roadside assistance'];
  
  return DEFAULT_TEMPLATE;
}

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

// Generate fake but realistic reviews based on category
function generateReviews(name, category) {
  const templates = [
    `Best ${category || 'service'} in town. ${name} really knows what they're doing.`,
    `Called them on short notice and they delivered. Professional, on time, fair pricing.`,
    `Been using ${name} for years. Wouldn't go anywhere else. Highly recommend.`
  ];
  return templates;
}

function generateDescription(name, category, city) {
  const cityClean = city ? city.replace(/\s*(FL|TX|GA|NC|AZ|TN|CO|NV|OH)\s*$/i, '').trim() : '';
  const catLabel = category || 'services';
  return `${name} provides professional ${catLabel} to the ${cityClean} area. With years of experience and a commitment to quality, we deliver results that exceed expectations. Contact us today for a free consultation.`;
}

function main() {
  const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')).leads;
  
  let created = 0, skipped = 0;
  
  for (const lead of leads) {
    const slug = slugify(lead.name);
    if (!slug) { skipped++; continue; }
    
    const configPath = path.join(CONFIGS_DIR, `${slug}.json`);
    if (fs.existsSync(configPath)) { skipped++; continue; }
    
    const template = getTemplate(lead.category);
    const tagline = template.taglines[Math.floor(Math.random() * template.taglines.length)];
    
    const config = {
      business_name: lead.name,
      category: lead.category || 'general',
      address: lead.address || '',
      phone: lead.phone || '',
      email: '',
      rating: (4.5 + Math.random() * 0.4).toFixed(1),
      review_count: Math.floor(50 + Math.random() * 200),
      reviews: generateReviews(lead.name, lead.category),
      hours: {
        'Mon-Fri': '8:00 AM - 6:00 PM',
        'Saturday': '9:00 AM - 3:00 PM',
        'Sunday': 'Closed'
      },
      photos: template.photos,
      services: template.services,
      tagline: tagline,
      description: generateDescription(lead.name, lead.category, lead.city),
      city: lead.city || '',
      demo_mode: true,
      demo_expires: '2026-03-18T23:59:59.000Z',
      slug: slug
    };
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    created++;
  }
  
  console.log(`✅ Created ${created} configs, skipped ${skipped} (already exist or invalid)`);
  console.log(`📁 Total configs: ${fs.readdirSync(CONFIGS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_')).length}`);
}

main();
