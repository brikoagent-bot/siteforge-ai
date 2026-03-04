#!/usr/bin/env node
/**
 * SiteForge AI — Email Outreach Campaign
 * Sends personalized demo links to scraped leads via Gmail (gog)
 * For leads WITH email or via Google Maps contact pages
 * 
 * Usage: node email-outreach.js [--dry-run] [--limit N] [--delay SECONDS]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONFIGS_DIR = path.join(__dirname, '..', 'demo-generator', 'configs');
const RENDER_URL = 'https://siteforge-ai-6q5h.onrender.com';
const SENDER = 'zavvaadmin@zavvaholdings.com'; // gog-authenticated account
const EMAIL_LOG = path.join(__dirname, 'email-log.json');
const DEFAULT_DELAY = 30; // 30 seconds between emails

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitIdx = args.indexOf('--limit');
const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1]) : Infinity;
const delayIdx = args.indexOf('--delay');
const delay = delayIdx >= 0 ? parseInt(args[delayIdx + 1]) : DEFAULT_DELAY;

function loadEmailLog() {
  try { return JSON.parse(fs.readFileSync(EMAIL_LOG, 'utf8')); }
  catch { return { sent: [], sentEmails: [] }; }
}

function saveEmailLog(log) {
  fs.writeFileSync(EMAIL_LOG, JSON.stringify(log, null, 2));
}

function sendEmail(to, subject, body) {
  const escaped = body.replace(/'/g, "'\\''");
  const cmd = `gog gmail send --to '${to}' --subject '${subject}' --body '${escaped}' --from '${SENDER}' 2>&1`;
  try {
    const result = execSync(cmd, { timeout: 30000 }).toString();
    return { success: !result.includes('error'), output: result.substring(0, 200) };
  } catch (e) {
    return { success: false, output: e.message.substring(0, 200) };
  }
}

function generateEmailBody(config) {
  const demoUrl = `${RENDER_URL}/demo/${config.slug}`;
  
  return `Hi ${config.business_name} Team,

I came across ${config.business_name} while researching top-rated businesses in your area, and I noticed you don't currently have a website.

I took the liberty of designing a custom website specifically for ${config.business_name} — completely free, no strings attached. You can preview it here:

${demoUrl}

This is a fully functional, mobile-responsive website that includes:
• Your business info, services, and hours
• Customer reviews integration  
• Click-to-call and directions buttons
• Professional design tailored to your industry

If you like what you see, we can have it live and working for you within 24 hours.

I'd love to hear your thoughts. Feel free to reply to this email or call me directly.

Best regards,
Jordan Mitchell
SiteForge AI
(850) 753-9920`;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('═'.repeat(60));
  console.log('📧  SITEFORGE AI — Email Outreach Campaign');
  console.log(`   Mode: ${dryRun ? '🔍 DRY RUN' : '📨 LIVE EMAILS'}`);
  console.log(`   Limit: ${limit === Infinity ? 'unlimited' : limit}`);
  console.log(`   Delay: ${delay}s between emails`);
  console.log('═'.repeat(60));

  // Load configs with demo URLs
  const configs = fs.readdirSync(CONFIGS_DIR)
    .filter(f => f.endsWith('.json') && !f.startsWith('_'))
    .map(f => JSON.parse(fs.readFileSync(path.join(CONFIGS_DIR, f), 'utf8')));

  console.log(`\n📊 Total demo configs: ${configs.length}`);

  // Filter: configs with email addresses
  const emailLog = loadEmailLog();
  const sentSet = new Set(emailLog.sentEmails);
  
  const emailable = configs.filter(c => {
    if (!c.email) return false;
    if (c.email.includes('@example.com') || c.email.startsWith('contact@')) return false; // placeholder emails
    if (sentSet.has(c.email)) return false;
    return true;
  });

  console.log(`📧 Emailable (real email, not sent yet): ${emailable.length}`);
  
  if (emailable.length === 0) {
    console.log('\n⚠️ No leads with real email addresses found.');
    console.log('   The scraped leads have placeholder emails (contact@slug.com).');
    console.log('   To get real emails, we need to:');
    console.log('   1. Scrape individual Google Maps pages for contact info');
    console.log('   2. Use email finder tools (Hunter.io, etc.)');
    console.log('   3. Find emails from business social media profiles');
    console.log('\n   For now, focus on phone outreach via batch-dialer.js');
    return;
  }

  const toSend = emailable.slice(0, limit);
  let success = 0, failed = 0;

  for (let i = 0; i < toSend.length; i++) {
    const config = toSend[i];
    const subject = `I built a website for ${config.business_name} — take a look`;
    const body = generateEmailBody(config);

    console.log(`\n[${i+1}/${toSend.length}] ${config.business_name}`);
    console.log(`   📧 ${config.email}`);
    console.log(`   🌐 ${RENDER_URL}/demo/${config.slug}`);

    if (dryRun) {
      console.log('   ✅ [DRY RUN] Would send');
      success++;
      continue;
    }

    const result = sendEmail(config.email, subject, body);
    if (result.success) {
      console.log('   ✅ Sent');
      success++;
      emailLog.sent.push({
        business: config.business_name,
        email: config.email,
        slug: config.slug,
        timestamp: new Date().toISOString()
      });
      emailLog.sentEmails.push(config.email);
      saveEmailLog(emailLog);
    } else {
      console.log(`   ❌ Failed: ${result.output}`);
      failed++;
    }

    if (i < toSend.length - 1) await sleep(delay * 1000);
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`📊 Results: ${success} sent, ${failed} failed`);
  console.log('═'.repeat(60));
}

main().catch(console.error);
