#!/usr/bin/env node
/**
 * SiteForge AI — Mass Email Outreach via Google Maps Contact Discovery
 * 
 * Strategy: For each lead, search for their email via web, then send personalized email.
 * Since most small businesses don't have emails online, we'll also try:
 * 1. Common email patterns (info@, contact@, owner@ + domain)
 * 2. Google Maps page scraping for contact info
 * 3. Direct cold email to found addresses
 * 
 * Uses gog gmail for sending (free, unlimited via zavvaadmin@zavvaholdings.com)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const LEADS_DIR = path.join(__dirname, '..', 'scraper', 'leads');
const RENDER_URL = 'https://siteforge-ai-6q5h.onrender.com';
const CONFIGS_DIR = path.join(__dirname, '..', 'demo-generator', 'configs');
const EMAIL_LOG = path.join(__dirname, 'email-blast-log.json');
const SENDER_ACCOUNT = 'brikoagent@gmail.com';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitIdx = args.indexOf('--limit');
const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1]) : Infinity;

function loadEmailLog() {
  try { return JSON.parse(fs.readFileSync(EMAIL_LOG, 'utf8')); }
  catch { return { sent: [], sentEmails: [], sentPhones: [] }; }
}

function saveEmailLog(log) {
  fs.writeFileSync(EMAIL_LOG, JSON.stringify(log, null, 2));
}

function findDemoSlug(businessName) {
  const slug = businessName.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
  
  const configPath = path.join(CONFIGS_DIR, `${slug}.json`);
  if (fs.existsSync(configPath)) return slug;
  
  // Try partial match on first two words
  const parts = slug.split('-').slice(0, 3).join('-');
  const configs = fs.readdirSync(CONFIGS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));
  for (const c of configs) {
    if (c.startsWith(parts)) return c.replace('.json', '');
  }
  return null;
}

function sendEmail(to, subject, body) {
  const escapedBody = body.replace(/'/g, "'\\''");
  const escapedSubject = subject.replace(/'/g, "'\\''");
  const cmd = `gog gmail send --account '${SENDER_ACCOUNT}' --to '${to}' --subject '${escapedSubject}' --body '${escapedBody}' 2>&1`;
  try {
    const result = execSync(cmd, { timeout: 30000 }).toString();
    return { success: result.includes('message_id'), output: result.substring(0, 200) };
  } catch (e) {
    return { success: false, output: e.message.substring(0, 200) };
  }
}

// Category-aware message templates — short, curiosity-driven, no price
const SMS_TEMPLATES = [
  // Template 1: Direct, curious
  (name, city, cat, url) => 
    `Hey — I was looking for a ${cat} in ${city} and couldn't find a website for ${name}. So I made one: ${url}\n\nNo catch. If you like it, let's talk. If not, no worries.\n\n— Jordan (662) 638-8066`,
  
  // Template 2: Social proof angle
  (name, city, cat, url) => 
    `Quick question — did you know 76% of customers won't trust a business without a website?\n\nI put something together for ${name}: ${url}\n\nTook me about an hour. Yours to keep either way. Text me back if you want to see it live.\n\n— Jordan (662) 638-8066`,
  
  // Template 3: Competitor angle  
  (name, city, cat, url) => 
    `I noticed other businesses like yours in ${city} are showing up on Google but ${name} isn't. That's costing you customers every day.\n\nI built you a site to fix that: ${url}\n\nIt's free — I just want to show you what's possible. Call me if interested.\n\n— Jordan (662) 638-8066`,
  
  // Template 4: Ultra short
  (name, city, cat, url) => 
    `Made this for ${name} — ${url}\n\nFree, no strings. Thought you could use it. Text me back.\n\n— Jordan (662) 638-8066`,
  
  // Template 5: Value-first
  (name, city, cat, url) => 
    `Hey, I help businesses like yours in ${city} get more customers online. I put together a custom site for ${name}: ${url}\n\nMobile-friendly, click-to-call, the whole thing. Happy to walk you through it.\n\n— Jordan (662) 638-8066`,
];

function cleanCategory(cat) {
  if (!cat || cat === 'general') return 'local business';
  // Map awkward categories to natural language
  const catMap = {
    'auto repair': 'auto shop',
    'dentists': 'dentist',
    'contractors': 'contractor',
    'cleaning services': 'cleaning company',
    'moving services': 'moving company',
    'moving storage': 'moving company',
    'moving and storage': 'moving company',
    'home improvement': 'home improvement company',
    'home improvement centers': 'home improvement company',
    'pest control': 'pest control company',
    'spa services': 'spa',
    'real estate services': 'real estate company',
    'real estate agents brokers': 'real estate company',
    'hotels lodging': 'hotel',
    'lodging': 'hotel',
    'roadside assistance': 'towing company',
    'entertainers': 'entertainment company',
    'hospice home health care': 'home care provider',
    'hospice and home health care': 'home care provider',
    'elder care': 'home care provider',
    'mental behavioral health': 'wellness practice',
    'therapy and counselling': 'therapist',
    'therapy counselling': 'therapist',
    'new used dealers': 'car dealership',
    'new and new dealers': 'car dealership',
    'carpet flooring': 'flooring company',
    'doors': 'garage door company',
    'painting and plastering': 'painting contractor',
    'painting floor wall coverings': 'painting contractor',
    'heating air': 'HVAC company',
    'fire water damage repair': 'restoration company',
    'demolition wrecking': 'demolition company',
    'web design': 'business', // don't pitch web design to web designers
    'salons': 'salon',
    'restaurants': 'restaurant',
    'locksmiths': 'locksmith',
    'bus charters transportation': 'transportation company',
    'swimming pool': 'pool company',
    'kitchen bath supplies services': 'remodeling company',
    'kitchen and bath supplies and services': 'remodeling company',
  };
  const lower = cat.toLowerCase();
  if (catMap[lower]) return catMap[lower];
  // Generic cleanup
  return lower
    .replace(/s$/, '')
    .replace(/ services?/g, ' company')
    .replace(/ and /g, ' & ')
    .trim() || 'local business';
}

function cleanCity(city) {
  if (!city) return 'your area';
  return city.replace(/\s*(FL|TX|GA|NC|AZ|TN|CO|NV|OH)\s*$/i, '').trim() || 'your area';
}

function generateSMSStyleEmail(lead, index) {
  const slug = findDemoSlug(lead.name);
  const demoUrl = slug ? `${RENDER_URL}/demo/${slug}` : null;
  
  // Skip leads without a personalized demo
  if (!demoUrl) return null;
  
  const cat = cleanCategory(lead.category);
  const city = cleanCity(lead.city);
  const template = SMS_TEMPLATES[index % SMS_TEMPLATES.length];
  
  return {
    subject: `${lead.name} — quick question`,
    body: template(lead.name, city, cat, demoUrl)
  };
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// Try to find email from phone number using common business email services
function guessEmails(lead) {
  // We can't guess emails without a domain, but we CAN try sending
  // via SMS-to-email gateways using the phone number
  const phone = lead.phone.replace(/[^0-9]/g, '');
  if (phone.length !== 10) return [];
  
  // Major US carrier SMS-to-email gateways
  return [
    `${phone}@txt.att.net`,        // AT&T
    `${phone}@tmomail.net`,        // T-Mobile  
    `${phone}@vtext.com`,          // Verizon
    `${phone}@messaging.sprintpcs.com`, // Sprint
  ];
}

async function main() {
  console.log('═'.repeat(60));
  console.log('📧  SITEFORGE AI — SMS-to-Email Blast');
  console.log(`   Mode: ${dryRun ? '🔍 DRY RUN' : '📨 LIVE'}`);
  console.log(`   Limit: ${limit === Infinity ? 'unlimited' : limit}`);
  console.log('═'.repeat(60));

  // Load leads
  const callable = JSON.parse(fs.readFileSync(path.join(LEADS_DIR, 'callable-leads.json'), 'utf8')).leads;
  const yp = JSON.parse(fs.readFileSync(path.join(LEADS_DIR, 'yp-leads-consolidated.json'), 'utf8')).leads;
  const allLeads = [...callable, ...yp];
  
  console.log(`\n📊 Total leads: ${allLeads.length}`);
  
  const emailLog = loadEmailLog();
  const sentPhones = new Set(emailLog.sentPhones || []);
  
  // Filter leads with phone numbers not already contacted
  const toContact = allLeads.filter(l => {
    if (!l.phone) return false;
    const phone = l.phone.replace(/[^0-9]/g, '');
    if (phone.length < 10) return false;
    if (sentPhones.has(phone)) return false;
    return true;
  }).slice(0, limit);
  
  console.log(`📨 Will contact: ${toContact.length}\n`);
  
  let success = 0, failed = 0, skipped = 0;
  
  for (let i = 0; i < toContact.length; i++) {
    const lead = toContact[i];
    const phone = lead.phone.replace(/[^0-9]/g, '');
    const gateways = guessEmails(lead);
    const emailData = generateSMSStyleEmail(lead, i);
    
    if (!emailData) {
      console.log(`[${i+1}/${toContact.length}] ${lead.name} — ⏭ no personalized demo, skipping`);
      skipped++;
      continue;
    }
    
    const { subject, body } = emailData;
    
    console.log(`[${i+1}/${toContact.length}] ${lead.name} (${lead.phone})`);
    
    if (dryRun) {
      console.log(`   ✅ [DRY RUN] Would send to ${gateways.length} gateways`);
      console.log(`   📝 ${body.substring(0, 80)}...`);
      success++;
      continue;
    }
    
    // Rotate through carrier gateways
    const gateway = gateways[i % gateways.length];
    
    const result = sendEmail(gateway, subject, body);
    
    if (result.success) {
      console.log(`   ✅ Sent via ${gateway.split('@')[1]}`);
      success++;
      emailLog.sent.push({
        business: lead.name,
        phone: phone,
        gateway: gateway,
        city: lead.city,
        timestamp: new Date().toISOString()
      });
      emailLog.sentPhones.push(phone);
      saveEmailLog(emailLog);
    } else {
      console.log(`   ❌ Failed: ${result.output.substring(0, 80)}`);
      failed++;
    }
    
    // Rate limit: 2 seconds between sends
    await sleep(2000);
  }
  
  console.log('\n' + '═'.repeat(60));
  console.log(`📊 Results: ${success} sent, ${failed} failed, ${skipped} skipped (no demo)`);
  console.log('═'.repeat(60));
}

main().catch(console.error);
