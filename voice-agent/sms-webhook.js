#!/usr/bin/env node
// Combined Webhook + Demo Server for Vapi
// - POST / → handles Vapi tool calls (send_demo_link, send_payment_link) via email
// - GET /demo/:slug → serves demo sites
// - GET / → landing page

const { generateDemoHTML: generatePremiumDemoHTML } = require('./templates');
const http = require('http');
const { execSync } = require('child_process');
const path = require('path');

const FROM_EMAIL = 'zavvaadmin@zavvaholdings.com';
const PORT = 3003;
const DEMO_SERVER_PATH = path.join(__dirname, '..', 'demo-generator', 'serve-demo.js');

// Import demo HTML generator from serve-demo.js
const CONFIGS_DIR = path.join(__dirname, '..', 'demo-generator', 'configs');
const fs = require('fs');

function loadConfig(slug) {
  const p = path.join(CONFIGS_DIR, `${slug}.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf-8')) : null;
}

function getAllConfigs() {
  if (!fs.existsSync(CONFIGS_DIR)) return [];
  return fs.readdirSync(CONFIGS_DIR)
    .filter(f => f.endsWith('.json') && !f.startsWith('_'))
    .map(f => { try { return JSON.parse(fs.readFileSync(path.join(CONFIGS_DIR, f), 'utf-8')); } catch { return null; } })
    .filter(Boolean);
}

function getTimeRemaining(expiryDate) {
  const diff = new Date(expiryDate) - new Date();
  if (diff <= 0) return 'Expired';
  const h = Math.floor(diff / 3600000), m = Math.floor((diff % 3600000) / 60000);
  return h >= 24 ? `${Math.floor(h/24)}d ${h%24}h remaining` : `${h}h ${m}m remaining`;
}

function generateDemoHTML(config) {
  const tr = getTimeRemaining(config.demo_expires);
  const expired = tr === 'Expired';
  const cat = config.category || 'dentist';
  
  // Category accent colors (used VERY sparingly)
  const accents = {
    dentist: '#2563EB',
    barbershop: '#C4A052',
    restaurant: '#B45309',
    salon: '#9B2335',
    contractor: '#EA580C',
    auto_repair: '#DC2626'
  };
  const accent = accents[cat] || '#2563EB';
  
  // Unsplash image search terms
  const unsplashTerms = {
    dentist: 'modern+dental+office',
    barbershop: 'barber+shop+interior',
    restaurant: 'restaurant+interior+design',
    salon: 'hair+salon+interior',
    contractor: 'modern+construction+renovation',
    auto_repair: 'auto+repair+shop'
  };
  
  const photos = config.photos || [];
  const heroImg = photos[0] || `https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80`;
  const aboutImg = photos[1] || `https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80`;
  
  // Services
  const services = (config.services || []).slice(0, 6);
  const serviceItems = services.map((s) => {
    const name = typeof s === 'string' ? s : s.name;
    return `<div class="service-item"><span class="service-name">${name}</span></div>`;
  }).join('');
  
  // Reviews (simple text quotes)
  const reviews = (config.reviews || []).slice(0, 3);
  const reviewItems = reviews.map(r => `
    <div class="review-item">
      <p class="review-text">"${r}"</p>
      <div class="review-author">Verified Customer</div>
    </div>`).join('');
  
  // Hours
  const hoursData = Array.isArray(config.hours) ? config.hours : 
    (config.hours ? Object.entries(config.hours).map(([k,v]) => ({day:k, hours:v})) : []);
  const hoursRows = hoursData.map(h => 
    `<div class="hours-row"><span class="hours-day">${h.day}</span><span class="hours-time">${h.hours}</span></div>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${config.business_name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',-apple-system,sans-serif;color:#0A0A0A;background:#fff;line-height:1.6;font-size:16px;font-weight:400}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
.demo-banner{position:fixed;top:0;left:0;right:0;z-index:9999;background:#0A0A0A;height:40px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;font-size:13px;color:#fff}
.demo-badge{background:${expired?'#DC2626':accent};padding:3px 10px;border-radius:100px;font-weight:500;font-size:11px;text-transform:uppercase;letter-spacing:1px}
.demo-cta-link{color:#fff;text-decoration:underline;font-weight:500}
.navbar{position:fixed;top:40px;left:0;right:0;z-index:999;background:#fff;border-bottom:1px solid #EBEBEB;height:70px;display:flex;align-items:center}
.navbar .container{display:flex;justify-content:space-between;align-items:center;width:100%}
.nav-logo{font-size:18px;font-weight:500;color:#0A0A0A;text-decoration:none}
.nav-links{display:flex;gap:32px;align-items:center}
.nav-links a{color:#0A0A0A;text-decoration:none;font-size:14px;font-weight:400}
.btn-cta{background:#0A0A0A;color:#fff;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:500;text-decoration:none}
.hero{padding:180px 24px 120px;background:#fff}
.hero .container{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.hero-text h1{font-size:clamp(48px,8vw,96px);font-weight:400;letter-spacing:-4px;line-height:1;margin-bottom:20px}
.hero-text p{font-size:16px;color:#757575;line-height:1.6;margin-bottom:32px}
.hero-buttons{display:flex;gap:12px;margin-bottom:32px}
.btn-primary{background:#0A0A0A;color:#fff;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:500;text-decoration:none}
.btn-secondary{background:transparent;color:#0A0A0A;border:1px solid #EBEBEB;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:500;text-decoration:none}
.trust-indicator{font-size:14px;color:#757575}
.hero-image{border-radius:16px;overflow:hidden;height:500px}
.hero-image img{width:100%;height:100%;object-fit:cover}
.features{padding:120px 24px;background:#fff}
.features .container{display:grid;grid-template-columns:repeat(3,1fr);gap:40px}
.feature-card{text-align:left}
.feature-number{font-size:13px;color:#A8A8A8;font-weight:500;margin-bottom:12px}
.feature-card h3{font-size:20px;font-weight:500;letter-spacing:-0.5px;margin-bottom:8px}
.feature-card p{font-size:15px;color:#757575;line-height:1.6}
.services{padding:120px 24px;background:#F5F5F5}
.section-label{font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:1.5px;color:#757575;margin-bottom:16px}
.section-heading{font-size:clamp(32px,4vw,48px);font-weight:500;letter-spacing:-2px;margin-bottom:60px}
.services-grid{display:grid;grid-template-columns:1fr;gap:0}
.service-item{border-bottom:1px solid #EBEBEB;padding:20px 0}
.service-name{font-size:18px;font-weight:500}
.about{padding:120px 24px;background:#fff}
.about .container{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.about-image{border-radius:16px;overflow:hidden;height:500px}
.about-image img{width:100%;height:100%;object-fit:cover}
.about-content h2{font-size:clamp(32px,4vw,48px);font-weight:500;letter-spacing:-2px;margin-bottom:20px}
.about-content p{font-size:16px;color:#757575;line-height:1.6;margin-bottom:32px}
.stats{display:inline-flex;gap:40px}
.stat-item{text-align:left}
.stat-number{font-size:32px;font-weight:500;color:#0A0A0A;line-height:1;margin-bottom:4px}
.stat-label{font-size:13px;color:#757575;font-weight:400}
.reviews{padding:120px 24px;background:#F5F5F5}
.reviews-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:40px;margin-top:60px}
.review-item{padding:0}
.review-text{font-size:20px;font-style:italic;line-height:1.6;color:#0A0A0A;margin-bottom:16px}
.review-author{font-size:14px;color:#757575}
.hours{padding:120px 24px;background:#fff}
.hours-table{max-width:600px;margin:60px auto 0;border:1px solid #EBEBEB;border-radius:12px;overflow:hidden}
.hours-row{display:flex;justify-content:space-between;padding:16px 24px;border-bottom:1px solid #EBEBEB}
.hours-row:last-child{border-bottom:none}
.hours-day{font-weight:500;text-transform:capitalize}
.hours-time{color:#757575}
.cta-section{padding:120px 24px;background:#0A0A0A;color:#fff;text-align:center}
.cta-section h2{font-size:clamp(32px,4vw,40px);font-weight:500;letter-spacing:-2px;margin-bottom:16px}
.cta-section p{font-size:16px;color:#A8A8A8;margin-bottom:32px}
.btn-white{background:#fff;color:#0A0A0A;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:500;text-decoration:none}
.footer{padding:60px 24px;background:#0A0A0A;color:#757575}
.footer .container{display:flex;justify-content:space-between;align-items:center}
.footer-logo{font-size:18px;font-weight:500;color:#fff;margin-bottom:8px}
.footer-copy{font-size:13px}
@media(max-width:768px){
.navbar .nav-links{display:none}
.hero .container,.about .container{grid-template-columns:1fr}
.hero-image,.about-image{height:300px}
.features .container{grid-template-columns:1fr}
.footer .container{flex-direction:column;gap:24px;text-align:center}
}
</style>
</head>
<body>
<div class="demo-banner">
  <div><span class="demo-badge">${expired?'EXPIRED':'DEMO'}</span> <span>${expired?'This preview has expired':tr}</span></div>
  ${expired?'':`<a href="tel:+18507539920" class="demo-cta-link">Claim this site</a>`}
</div>
<nav class="navbar">
  <div class="container">
    <a href="#" class="nav-logo">${config.business_name}</a>
    <div class="nav-links">
      <a href="#services">Services</a>
      <a href="#about">About</a>
      ${hoursRows?'<a href="#hours">Hours</a>':''}
      <a href="#reviews">Reviews</a>
      <a href="tel:${config.phone||'#'}" class="btn-cta">Contact</a>
    </div>
  </div>
</nav>
<section class="hero">
  <div class="container">
    <div class="hero-text">
      <h1>${config.tagline||config.business_name}</h1>
      <p>${config.description||`Professional ${cat.replace('_',' ')} services you can trust.`}</p>
      <div class="hero-buttons">
        <a href="tel:${config.phone||'#'}" class="btn-primary">Book Now</a>
        ${config.maps_url?`<a href="${config.maps_url}" class="btn-secondary">Get Directions</a>`:''}
      </div>
      <div class="trust-indicator">★ ${config.rating} (${config.review_count}+ reviews)</div>
    </div>
    <div class="hero-image"><img src="${heroImg}" alt="${config.business_name}"></div>
  </div>
</section>
<section class="features">
  <div class="container">
    <div class="feature-card"><div class="feature-number">01</div><h3>Expert Service</h3><p>Trusted by thousands of satisfied customers.</p></div>
    <div class="feature-card"><div class="feature-number">02</div><h3>Quality First</h3><p>We never compromise on excellence.</p></div>
    <div class="feature-card"><div class="feature-number">03</div><h3>Your Satisfaction</h3><p>Your experience is our top priority.</p></div>
  </div>
</section>
${serviceItems?`<section class="services" id="services">
  <div class="container">
    <div class="section-label">Services</div>
    <h2 class="section-heading">What We Offer</h2>
    <div class="services-grid">${serviceItems}</div>
  </div>
</section>`:''}
<section class="about" id="about">
  <div class="container">
    <div class="about-image"><img src="${aboutImg}" alt="About ${config.business_name}"></div>
    <div class="about-content">
      <h2>Why Choose ${config.business_name}?</h2>
      <p>${config.description||`We are dedicated to providing exceptional ${cat.replace('_',' ')} services.`}</p>
      <div class="stats">
        <div class="stat-item"><div class="stat-number">${config.rating}</div><div class="stat-label">Star Rating</div></div>
        <div class="stat-item"><div class="stat-number">${config.review_count>999?Math.floor(config.review_count/1000)+'K+':config.review_count+'+'}</div><div class="stat-label">Happy Clients</div></div>
      </div>
    </div>
  </div>
</section>
${reviewItems?`<section class="reviews" id="reviews">
  <div class="container">
    <div class="section-label">Testimonials</div>
    <h2 class="section-heading">What Our Clients Say</h2>
    <div class="reviews-grid">${reviewItems}</div>
  </div>
</section>`:''}
${hoursRows?`<section class="hours" id="hours">
  <div class="container">
    <div class="section-label">Visit Us</div>
    <h2 class="section-heading">Business Hours</h2>
    <div class="hours-table">${hoursRows}</div>
  </div>
</section>`:''}
<section class="cta-section">
  <div class="container">
    <h2>Ready to Get Started?</h2>
    <p>Book your appointment today.</p>
    <a href="tel:${config.phone||'#'}" class="btn-white">Book Now</a>
  </div>
</section>
<footer class="footer">
  <div class="container">
    <div><div class="footer-logo">${config.business_name}</div><div class="footer-copy">© ${new Date().getFullYear()}</div></div>
    <div class="footer-copy">Powered by SiteForge AI</div>
  </div>
</footer>
</body>
</html>`;
}

function generateLandingHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SiteForge AI — Your Website is Already Built</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',-apple-system,sans-serif;color:#0A0A0A;background:#fff;line-height:1.6;font-size:16px;font-weight:400}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
.navbar{position:fixed;top:0;left:0;right:0;z-index:999;background:#fff;border-bottom:1px solid #EBEBEB;height:70px;display:flex;align-items:center}
.navbar .container{display:flex;justify-content:space-between;align-items:center;width:100%}
.nav-logo{font-size:18px;font-weight:500;color:#0A0A0A;text-decoration:none}
.btn-cta{background:#0A0A0A;color:#fff;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:500;text-decoration:none}
.hero{padding:180px 24px 120px;background:#fff;text-align:center}
.hero h1{font-size:clamp(48px,8vw,96px);font-weight:400;letter-spacing:-4px;line-height:1;margin-bottom:24px;max-width:900px;margin-left:auto;margin-right:auto}
.hero p{font-size:18px;color:#757575;max-width:600px;margin:0 auto 40px;line-height:1.6}
.btn-primary{background:#0A0A0A;color:#fff;padding:16px 32px;border-radius:100px;font-size:15px;font-weight:500;text-decoration:none;display:inline-block}
.how{padding:120px 24px;background:#F5F5F5}
.section-label{font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:1.5px;color:#757575;margin-bottom:16px;text-align:center}
.section-heading{font-size:clamp(32px,4vw,48px);font-weight:500;letter-spacing:-2px;margin-bottom:60px;text-align:center}
.how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:40px}
.how-step{text-align:center}
.step-number{font-size:13px;color:#A8A8A8;font-weight:500;margin-bottom:12px}
.how-step h3{font-size:20px;font-weight:500;letter-spacing:-0.5px;margin-bottom:8px}
.how-step p{font-size:15px;color:#757575;line-height:1.6}
.pricing{padding:120px 24px;background:#fff}
.pricing-card{max-width:500px;margin:60px auto 0;border:1px solid #EBEBEB;border-radius:16px;padding:48px;text-align:center}
.price{font-size:48px;font-weight:500;letter-spacing:-2px;margin-bottom:8px}
.price-label{font-size:14px;color:#757575;margin-bottom:32px}
.price-features{text-align:left;margin-bottom:32px}
.price-feature{padding:12px 0;border-bottom:1px solid #EBEBEB;font-size:15px}
.price-feature:last-child{border-bottom:none}
.cta-section{padding:120px 24px;background:#0A0A0A;color:#fff;text-align:center}
.cta-section h2{font-size:clamp(32px,4vw,48px);font-weight:500;letter-spacing:-2px;margin-bottom:16px}
.cta-section p{font-size:16px;color:#A8A8A8;margin-bottom:32px}
.btn-white{background:#fff;color:#0A0A0A;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:500;text-decoration:none}
.footer{padding:60px 24px;background:#0A0A0A;color:#757575;text-align:center}
.footer-logo{font-size:18px;font-weight:500;color:#fff;margin-bottom:8px}
.footer-copy{font-size:13px}
@media(max-width:768px){
.how-grid{grid-template-columns:1fr}
}
</style>
</head>
<body>
<nav class="navbar">
  <div class="container">
    <a href="#" class="nav-logo">SiteForge AI</a>
    <a href="#pricing" class="btn-cta">See Pricing</a>
  </div>
</nav>
<section class="hero">
  <div class="container">
    <h1>Your business deserves a website. We already built yours.</h1>
    <p>We find local businesses without websites, build professional sites for them, and deliver them ready to launch.</p>
    <a href="#pricing" class="btn-primary">See Your Demo Site</a>
  </div>
</section>
<section class="how">
  <div class="container">
    <div class="section-label">How It Works</div>
    <h2 class="section-heading">Three Simple Steps</h2>
    <div class="how-grid">
      <div class="how-step">
        <div class="step-number">01</div>
        <h3>We Find You</h3>
        <p>We identify local businesses that deserve a professional online presence.</p>
      </div>
      <div class="how-step">
        <div class="step-number">02</div>
        <h3>We Build It</h3>
        <p>Our AI builds a custom, professional website tailored to your business.</p>
      </div>
      <div class="how-step">
        <div class="step-number">03</div>
        <h3>You Grow</h3>
        <p>Launch your site and start attracting more customers immediately.</p>
      </div>
    </div>
  </div>
</section>
<section class="pricing" id="pricing">
  <div class="container">
    <div class="section-label">Pricing</div>
    <h2 class="section-heading">Simple, Transparent Pricing</h2>
    <div class="pricing-card">
      <div class="price">$2,000</div>
      <div class="price-label">One-time setup</div>
      <div class="price-features">
        <div class="price-feature">Custom professional design</div>
        <div class="price-feature">Mobile-responsive</div>
        <div class="price-feature">SEO optimized</div>
        <div class="price-feature">Contact forms & booking</div>
      </div>
      <div class="price" style="font-size:32px;margin-top:32px">$700/month</div>
      <div class="price-label">Hosting, maintenance & updates</div>
      <a href="tel:+18507539920" class="btn-primary">Get Started</a>
    </div>
  </div>
</section>
<section class="cta-section">
  <div class="container">
    <h2>Ready to Launch Your Website?</h2>
    <p>Your custom demo is already built. Let's get you online.</p>
    <a href="tel:+18507539920" class="btn-white">See Your Demo</a>
  </div>
</section>
<footer class="footer">
  <div class="container">
    <div class="footer-logo">SiteForge AI</div>
    <div class="footer-copy">© ${new Date().getFullYear()} SiteForge AI. Professional websites for local businesses.</div>
  </div>
</footer>
</body>
</html>`;
}

function sendEmail(to, subject, body) {
  try {
    const cmd = `gog gmail send --account ${FROM_EMAIL} --to "${to}" --subject "${subject.replace(/"/g, '\\"')}" --body "${body.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    const result = execSync(cmd, { timeout: 15000, encoding: 'utf-8' });
    console.log('Email sent:', result.trim());
    return { success: true };
  } catch (err) {
    console.error('Email error:', err.message);
    return { success: false, error: err.message };
  }
}

function handleToolCall(payload) {
  const toolCall = payload?.message?.toolCallList?.[0] || payload;
  const fn = toolCall?.function?.name || toolCall?.name || '';
  const args = toolCall?.function?.arguments ?
    (typeof toolCall.function.arguments === 'string' ? JSON.parse(toolCall.function.arguments) : toolCall.function.arguments) :
    (toolCall?.arguments || {});

  let result = { success: false, error: 'Unknown function' };

  if (fn === 'send_demo_link') {
    const { email, businessName, demoUrl } = args;
    if (!email || !email.includes('@')) {
      result = { success: false, error: 'No valid email. Ask the customer for their email address.' };
    } else {
      const r = sendEmail(email,
        `${businessName} — Your New Website is Ready! 🌐`,
        `Hey!\n\nThis is Jordan from SiteForge AI.\n\nWe built a professional website for ${businessName} — take a look:\n\n🌐 ${demoUrl}\n\nThis preview expires in 48 hours. Let us know what you think!\n\nBest,\nJordan\nSiteForge AI`
      );
      result = r.success ? { success: true, message: `Demo link emailed to ${email}` } : { success: false, error: r.error };
    }
  } else if (fn === 'send_payment_link') {
    const { email, businessName } = args;
    const paymentUrl = `https://siteforgeai.com/pay?biz=${encodeURIComponent(businessName)}`;
    if (!email || !email.includes('@')) {
      result = { success: false, error: 'No valid email. Ask the customer for their email address.' };
    } else {
      const r = sendEmail(email,
        `${businessName} — Launch Your Website Today 🚀`,
        `Hi!\n\nReady to launch your professional website?\n\nHere's your secure payment link:\n💳 ${paymentUrl}\n\n✅ $2,000 setup (one-time)\n✅ $700/month — hosting, maintenance & updates included\n\nOne new customer from your site pays for itself.\n\nQuestions? Just reply to this email.\n\nBest,\nJordan\nSiteForge AI`
      );
      result = r.success ? { success: true, message: `Payment link emailed to ${email}` } : { success: false, error: r.error };
    }
  }

  return {
    results: [{
      toolCallId: toolCall?.id || toolCall?.toolCallId || 'unknown',
      result: JSON.stringify(result)
    }]
  };
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Demo routes
  if (req.method === 'GET' && url.pathname.startsWith('/demo/')) {
    const slug = url.pathname.replace('/demo/', '').replace(/\/$/, '');
    const config = loadConfig(slug);
    if (config) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(generatePremiumDemoHTML(config));
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Demo not found');
  }

  // Demo index
  if (req.method === 'GET' && url.pathname === '/demos') {
    const configs = getAllConfigs();
    const list = configs.map(c => `<li><a href="/demo/${c.slug}">${c.business_name}</a> — ${c.category}</li>`).join('');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(`<h1>SiteForge AI Demos</h1><ul>${list}</ul>`);
  }

  // Landing page
  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(generateLandingHTML());
  }

  // Health check
  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('SiteForge Email Webhook + Demo Server — OK');
  }

  // Fallback GET
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('SiteForge AI');
  }

  // Webhook POST
  if (req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        console.log(`[${new Date().toISOString()}] Tool call:`, JSON.stringify(payload).substring(0, 200));
        const response = handleToolCall(payload);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (err) {
        console.error('Error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  }
});

server.listen(PORT, () => console.log(`SiteForge server on port ${PORT} — webhook + demos`));
