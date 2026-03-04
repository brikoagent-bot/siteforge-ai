#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { generateContent, generateReviews, createSlug } = require('./content-templates');

// Paths
const LEADS_FILE = path.join(__dirname, '../scraper/leads/leads_2026-03-03_16-17.json');
const CONFIGS_DIR = path.join(__dirname, 'configs');
const SITE_GENERATOR_DIR = path.join(__dirname, '../site-generator');

// Ensure configs directory exists
if (!fs.existsSync(CONFIGS_DIR)) {
  fs.mkdirSync(CONFIGS_DIR, { recursive: true });
}

function loadLeads() {
  if (!fs.existsSync(LEADS_FILE)) {
    throw new Error(`Leads file not found: ${LEADS_FILE}`);
  }
  
  const data = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
  return data.leads || [];
}

function generateDemoConfig(lead) {
  // Generate expiry timestamp (48 hours from now)
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 48);
  
  // Generate content based on business category
  const content = generateContent(lead.name, lead.category);
  
  // Generate reviews
  const reviews = generateReviews(lead.rating, lead.review_count);
  
  // Create business config
  const config = {
    business_name: lead.name,
    category: content.normalizedCategory,
    address: lead.address || lead.city || '',
    phone: lead.phone || '',
    email: `contact@${createSlug(lead.name)}.com`,
    rating: lead.rating || 4.5,
    review_count: typeof lead.review_count === 'number' ? Math.min(lead.review_count, 9999) : 100,
    reviews: reviews,
    hours: content.hours,
    photos: content.photos,
    services: content.services,
    tagline: content.tagline,
    description: content.description,
    demo_mode: true,
    demo_expires: expiryDate.toISOString(),
    maps_url: lead.maps_url || '',
    slug: createSlug(lead.name)
  };
  
  return config;
}

function saveConfig(config, filename) {
  const configPath = path.join(CONFIGS_DIR, filename);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`✅ Config saved: ${configPath}`);
  return configPath;
}

function findLeadByName(leads, searchName) {
  const searchLower = searchName.toLowerCase();
  return leads.find(lead => 
    lead.name.toLowerCase().includes(searchLower) || 
    searchLower.includes(lead.name.toLowerCase())
  );
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: node generate-demo.js <business-name> [options]

Examples:
  node generate-demo.js "Zavva Holdings"
  node generate-demo.js "Joe's Pizza" --port 3001
  
Options:
  --port <number>    Port number for demo (default: random)
  --config-only      Only generate config, don't copy site
  
To generate multiple demos:
  node generate-all-demos.js
`);
    process.exit(0);
  }
  
  const businessName = args[0];
  const configOnly = args.includes('--config-only');
  let port = 3001;
  
  const portIndex = args.indexOf('--port');
  if (portIndex !== -1 && args[portIndex + 1]) {
    port = parseInt(args[portIndex + 1]);
  }
  
  console.log(`\n🚀 Generating demo for: ${businessName}\n`);
  
  // Load leads
  const leads = loadLeads();
  console.log(`📋 Loaded ${leads.length} leads`);
  
  // Find the lead
  let lead = findLeadByName(leads, businessName);
  
  // If not found, create a manual entry (for test cases like Zavva Holdings)
  if (!lead) {
    console.log(`⚠️  Lead not found in database, creating manual entry...`);
    lead = {
      name: businessName,
      category: 'contractor',
      address: 'Greenville, SC',
      phone: '+1 7282193918',
      rating: 4.8,
      review_count: 42,
      has_website: false,
      city: 'Greenville SC',
      status: 'new'
    };
  }
  
  // Generate config
  console.log(`\n📝 Generating config for ${lead.name}...`);
  const config = generateDemoConfig(lead);
  
  // Save config
  const configFilename = `${config.slug}.json`;
  const configPath = saveConfig(config, configFilename);
  
  console.log(`\n✨ Demo config generated successfully!`);
  console.log(`📁 Config file: ${configPath}`);
  console.log(`🏷️  Slug: ${config.slug}`);
  console.log(`📅 Expires: ${config.demo_expires}`);
  
  if (!configOnly) {
    console.log(`\n💡 To serve this demo:`);
    console.log(`   node serve-demo.js --config ${configFilename} --port ${port}`);
    console.log(`   Then visit: http://localhost:${port}/demo/${config.slug}`);
  }
  
  return config;
}

// Run if called directly
if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

module.exports = { generateDemoConfig, saveConfig, loadLeads };
