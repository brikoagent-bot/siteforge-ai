#!/usr/bin/env node
/**
 * SiteForge AI — Batch Outbound Dialer
 * Calls leads from scraped list using Vapi voice agent
 * 
 * Usage: node batch-dialer.js [--dry-run] [--limit N] [--delay SECONDS]
 * 
 * Calls are made sequentially with configurable delay between each.
 * Only calls leads with phone numbers during business hours (9 AM - 5 PM local time).
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Config
const VAPI_ORG_TOKEN_FILE = path.join(__dirname, 'vapi-org-token.txt');
const ASSISTANT_ID = '2e715585-f66a-45ea-9327-98327c55e21f';
const PHONE_NUMBER_ID = '4a88b0ec-07bc-43e1-96e7-af4aee86f4f4'; // Vapi native number (bypasses Twilio trial limit)
const RENDER_URL = 'https://siteforge-ai-6q5h.onrender.com';
const CONFIGS_DIR = path.join(__dirname, '..', 'demo-generator', 'configs');
const LEADS_DIR = path.join(__dirname, '..', 'scraper', 'leads');
const CALLABLE_FILE = path.join(LEADS_DIR, 'callable-leads.json');
const YP_LEADS_FILE = path.join(LEADS_DIR, 'yp-leads-consolidated.json');
const CALL_LOG = path.join(__dirname, 'call-log.json');
const DEFAULT_DELAY = 120; // 2 minutes between calls (Vapi credits conservation)
const BUSINESS_HOURS = { start: 9, end: 17 }; // 9 AM - 5 PM

// Parse args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitIdx = args.indexOf('--limit');
const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1]) : Infinity;
const delayIdx = args.indexOf('--delay');
const delay = delayIdx >= 0 ? parseInt(args[delayIdx + 1]) : DEFAULT_DELAY;

function loadCallLog() {
  try {
    return JSON.parse(fs.readFileSync(CALL_LOG, 'utf8'));
  } catch {
    return { calls: [], calledNumbers: [] };
  }
}

function saveCallLog(log) {
  fs.writeFileSync(CALL_LOG, JSON.stringify(log, null, 2));
}

function loadAllLeads() {
  const leads = [];
  
  // Priority 1: curated callable leads
  for (const file of [CALLABLE_FILE, YP_LEADS_FILE]) {
    try {
      if (fs.existsSync(file)) {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (data.leads) leads.push(...data.leads);
        console.log(`  📂 Loaded ${data.leads?.length || 0} leads from ${path.basename(file)}`);
      }
    } catch (e) {
      console.error(`  ⚠️ Error loading ${path.basename(file)}: ${e.message}`);
    }
  }
  
  // Fallback: all JSON files in leads dir
  if (leads.length === 0) {
    const files = fs.readdirSync(LEADS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));
    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(LEADS_DIR, file), 'utf8'));
        if (data.leads) leads.push(...data.leads);
      } catch (e) {
        console.error(`  ⚠️ Error loading ${file}: ${e.message}`);
      }
    }
  }
  
  return leads;
}

function findDemoSlug(businessName) {
  // Try to find a matching config
  const slug = businessName.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);
  
  const configPath = path.join(CONFIGS_DIR, `${slug}.json`);
  if (fs.existsSync(configPath)) return slug;
  
  // Try partial match
  const configs = fs.readdirSync(CONFIGS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));
  for (const c of configs) {
    if (c.includes(slug.split('-')[0])) return c.replace('.json', '');
  }
  
  return null;
}

function makeCall(lead, token) {
  return new Promise((resolve, reject) => {
    const slug = findDemoSlug(lead.name);
    const demoUrl = slug ? `${RENDER_URL}/demo/${slug}` : `${RENDER_URL}/demos`;
    
    const payload = JSON.stringify({
      assistantId: ASSISTANT_ID,
      phoneNumberId: PHONE_NUMBER_ID,
      customer: {
        number: '+1' + lead.phone.replace(/[^0-9]/g, '')
      },
      assistantOverrides: {
        variableValues: {
          businessName: lead.name,
          demoUrl: demoUrl
        }
      }
    });
    
    const options = {
      hostname: 'api.vapi.ai',
      path: '/call',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({ status: res.statusCode, data: result });
        } catch {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function isBusinessHours() {
  const now = new Date();
  const hour = now.getHours(); // Local time
  return hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('═'.repeat(60));
  console.log('🏗️  SITEFORGE AI — Batch Outbound Dialer');
  console.log(`   Mode: ${dryRun ? '🔍 DRY RUN' : '📞 LIVE CALLS'}`);
  console.log(`   Limit: ${limit === Infinity ? 'unlimited' : limit}`);
  console.log(`   Delay: ${delay}s between calls`);
  console.log(`   Hours: ${BUSINESS_HOURS.start} AM - ${BUSINESS_HOURS.end > 12 ? BUSINESS_HOURS.end - 12 + ' PM' : BUSINESS_HOURS.end}`);
  console.log('═'.repeat(60));
  
  // Check business hours
  if (!isBusinessHours() && !dryRun) {
    console.log('\n❌ Outside business hours. Calls only between 9 AM - 5 PM.');
    console.log('   Use --dry-run to test without calling.');
    process.exit(1);
  }
  
  // Load token
  let token;
  try {
    token = fs.readFileSync(VAPI_ORG_TOKEN_FILE, 'utf8').trim();
  } catch {
    console.error('❌ No Vapi token found. Save it to:', VAPI_ORG_TOKEN_FILE);
    process.exit(1);
  }
  
  // Load leads
  const allLeads = loadAllLeads();
  console.log(`\n📊 Total leads loaded: ${allLeads.length}`);
  
  // Filter: must have phone, not already called
  const callLog = loadCallLog();
  const calledSet = new Set(callLog.calledNumbers);
  
  const callable = allLeads.filter(lead => {
    if (!lead.phone) return false;
    const normalized = lead.phone.replace(/[^0-9]/g, '');
    if (normalized.length < 10) return false;
    if (calledSet.has(normalized)) return false;
    return true;
  });
  
  console.log(`📞 Callable leads (with phone, not called yet): ${callable.length}`);
  
  // Sort by rating * review_count (best leads first)
  callable.sort((a, b) => (b.rating * b.review_count) - (a.rating * a.review_count));
  
  const toCall = callable.slice(0, limit);
  console.log(`🎯 Will call: ${toCall.length} leads\n`);
  
  let success = 0;
  let failed = 0;
  
  for (let i = 0; i < toCall.length; i++) {
    const lead = toCall[i];
    const phone = lead.phone.replace(/[^0-9]/g, '');
    const slug = findDemoSlug(lead.name);
    
    console.log(`[${i + 1}/${toCall.length}] ${lead.name}`);
    console.log(`   📍 ${lead.city} | ★${lead.rating} (${lead.review_count} reviews)`);
    console.log(`   📞 ${lead.phone}`);
    console.log(`   🌐 ${slug ? `${RENDER_URL}/demo/${slug}` : 'generic demo'}`);
    
    if (dryRun) {
      console.log('   ✅ [DRY RUN] Would call\n');
      success++;
      continue;
    }
    
    // Check hours before each call
    if (!isBusinessHours()) {
      console.log('\n⏰ Business hours ended. Stopping calls.');
      break;
    }
    
    try {
      const result = await makeCall(lead, token);
      
      if (result.status === 201 || result.status === 200) {
        console.log(`   ✅ Call initiated: ${result.data.id || 'OK'}`);
        success++;
        
        // Log the call
        callLog.calls.push({
          leadName: lead.name,
          phone: phone,
          city: lead.city,
          rating: lead.rating,
          callId: result.data.id,
          timestamp: new Date().toISOString(),
          status: 'initiated'
        });
        callLog.calledNumbers.push(phone);
        saveCallLog(callLog);
      } else {
        console.log(`   ❌ Failed: ${JSON.stringify(result.data).substring(0, 100)}`);
        failed++;
      }
    } catch (e) {
      console.log(`   ❌ Error: ${e.message}`);
      failed++;
    }
    
    // Delay between calls
    if (i < toCall.length - 1) {
      console.log(`   ⏳ Waiting ${delay}s...\n`);
      await sleep(delay * 1000);
    }
  }
  
  console.log('\n' + '═'.repeat(60));
  console.log(`📊 Results: ${success} initiated, ${failed} failed`);
  console.log(`💰 Vapi cost estimate: ~$${(success * 0.15).toFixed(2)} (at ~$0.15/call)`);
  console.log('═'.repeat(60));
}

main().catch(console.error);
