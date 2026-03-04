#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const CONFIGS_DIR = path.join(__dirname, 'configs');
const SITE_GENERATOR_DIR = path.join(__dirname, '../site-generator');
const PORT = process.env.PORT || 3000;

// Store running demo processes
const runningDemos = new Map();

function loadConfig(slug) {
  const configPath = path.join(CONFIGS_DIR, `${slug}.json`);
  
  if (!fs.existsSync(configPath)) {
    return null;
  }
  
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function getAllConfigs() {
  if (!fs.existsSync(CONFIGS_DIR)) {
    return [];
  }
  
  const files = fs.readdirSync(CONFIGS_DIR);
  const configs = [];
  
  for (const file of files) {
    if (file.endsWith('.json') && !file.startsWith('_')) {
      try {
        const config = JSON.parse(fs.readFileSync(path.join(CONFIGS_DIR, file), 'utf8'));
        configs.push(config);
      } catch (error) {
        console.error(`Error loading ${file}:`, error.message);
      }
    }
  }
  
  return configs;
}

function getTimeRemaining(expiryDate) {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diff = expiry - now;
  
  if (diff <= 0) {
    return 'Expired';
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h remaining`;
  }
  
  return `${hours}h ${minutes}m remaining`;
}

function generateDemoHTML(config) {
  const timeRemaining = getTimeRemaining(config.demo_expires);
  const isExpired = timeRemaining === 'Expired';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.business_name} - Demo Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    
    .demo-banner {
      background: ${isExpired ? '#dc2626' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
      color: white;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 9999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .demo-banner-left {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .demo-badge {
      background: rgba(255,255,255,0.2);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .demo-timer {
      font-size: 14px;
      font-weight: 500;
    }
    
    .demo-cta {
      background: white;
      color: #667eea;
      padding: 10px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      transition: transform 0.2s, box-shadow 0.2s;
      display: inline-block;
    }
    
    .demo-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    
    .site-content {
      background: #f3f4f6;
      min-height: calc(100vh - 48px);
      padding: 40px 20px;
    }
    
    .site-preview {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      padding: 60px 40px;
    }
    
    .hero {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .hero h1 {
      font-size: 48px;
      color: #1f2937;
      margin-bottom: 16px;
    }
    
    .hero .tagline {
      font-size: 20px;
      color: #6b7280;
      margin-bottom: 24px;
    }
    
    .rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 18px;
      color: #f59e0b;
      margin-bottom: 12px;
    }
    
    .contact-info {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    
    .contact-item {
      color: #4b5563;
      font-size: 16px;
    }
    
    .section {
      margin: 50px 0;
    }
    
    .section h2 {
      font-size: 32px;
      color: #1f2937;
      margin-bottom: 24px;
      text-align: center;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    
    .service-card {
      background: #f9fafb;
      padding: 24px;
      border-radius: 8px;
      border: 2px solid #e5e7eb;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      color: #374151;
    }
    
    .reviews {
      display: grid;
      gap: 20px;
      margin-top: 30px;
    }
    
    .review {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    
    .review-text {
      color: #4b5563;
      line-height: 1.6;
      font-style: italic;
    }
    
    .hours-table {
      max-width: 500px;
      margin: 30px auto;
      background: #f9fafb;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .hours-row {
      display: flex;
      justify-content: space-between;
      padding: 16px 24px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .hours-row:last-child {
      border-bottom: none;
    }
    
    .hours-day {
      font-weight: 600;
      color: #1f2937;
      text-transform: capitalize;
    }
    
    .hours-time {
      color: #6b7280;
    }
    
    @media (max-width: 768px) {
      .demo-banner {
        flex-direction: column;
        gap: 10px;
        padding: 15px;
      }
      .hero h1 { font-size: 32px; }
      .site-preview { padding: 30px 20px; }
    }
  </style>
</head>
<body>
  <div class="demo-banner">
    <div class="demo-banner-left">
      <span class="demo-badge">🎨 Demo Preview</span>
      <span class="demo-timer">⏰ ${timeRemaining}</span>
    </div>
    <a href="https://buy.stripe.com/test_your_payment_link" class="demo-cta">
      Get This Website →
    </a>
  </div>
  
  <div class="site-content">
    <div class="site-preview">
      <div class="hero">
        <h1>${config.business_name}</h1>
        <p class="tagline">${config.tagline || config.description}</p>
        
        <div class="rating">
          ${'⭐'.repeat(Math.floor(config.rating))}
          <span style="color: #1f2937;">${config.rating} (${config.review_count} reviews)</span>
        </div>
        
        <div class="contact-info">
          ${config.phone ? `<div class="contact-item">📞 ${config.phone}</div>` : ''}
          ${config.address ? `<div class="contact-item">📍 ${config.address}</div>` : ''}
          ${config.email ? `<div class="contact-item">✉️ ${config.email}</div>` : ''}
        </div>
      </div>
      
      ${config.description ? `
      <div class="section">
        <h2>About Us</h2>
        <p style="text-align: center; color: #4b5563; line-height: 1.8; max-width: 800px; margin: 20px auto;">
          ${config.description}
        </p>
      </div>
      ` : ''}
      
      ${config.services && config.services.length > 0 ? `
      <div class="section">
        <h2>Our Services</h2>
        <div class="services-grid">
          ${config.services.map(service => `
            <div class="service-card">✨ ${service}</div>
          `).join('')}
        </div>
      </div>
      ` : ''}
      
      ${config.hours ? `
      <div class="section">
        <h2>Hours</h2>
        <div class="hours-table">
          ${Object.entries(config.hours).map(([day, time]) => `
            <div class="hours-row">
              <span class="hours-day">${day}</span>
              <span class="hours-time">${time}</span>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
      
      ${config.reviews && config.reviews.length > 0 ? `
      <div class="section">
        <h2>Customer Reviews</h2>
        <div class="reviews">
          ${config.reviews.slice(0, 5).map(review => `
            <div class="review">
              <div class="review-text">"${review}"</div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>`;
}

function generateIndexHTML(configs) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SiteForge AI - Demo Sites</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    header {
      text-align: center;
      color: white;
      margin-bottom: 60px;
    }
    
    h1 {
      font-size: 48px;
      margin-bottom: 16px;
    }
    
    .subtitle {
      font-size: 20px;
      opacity: 0.9;
    }
    
    .stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 30px;
      flex-wrap: wrap;
    }
    
    .stat {
      background: rgba(255,255,255,0.2);
      padding: 20px 30px;
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }
    
    .stat-number {
      font-size: 36px;
      font-weight: 700;
    }
    
    .stat-label {
      font-size: 14px;
      opacity: 0.9;
      margin-top: 4px;
    }
    
    .demos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
    }
    
    .demo-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .demo-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    }
    
    .demo-card h3 {
      font-size: 24px;
      color: #1f2937;
      margin-bottom: 12px;
    }
    
    .demo-category {
      display: inline-block;
      background: #e0e7ff;
      color: #4338ca;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    
    .demo-rating {
      color: #f59e0b;
      font-size: 16px;
      margin-bottom: 16px;
    }
    
    .demo-link {
      display: block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 12px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
    }
    
    .demo-link:hover {
      opacity: 0.9;
    }
    
    @media (max-width: 768px) {
      h1 { font-size: 32px; }
      .demos-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🎨 SiteForge AI Demo Sites</h1>
      <p class="subtitle">Professional websites, ready in minutes</p>
      
      <div class="stats">
        <div class="stat">
          <div class="stat-number">${configs.length}</div>
          <div class="stat-label">Demo Sites</div>
        </div>
        <div class="stat">
          <div class="stat-number">3</div>
          <div class="stat-label">Templates</div>
        </div>
        <div class="stat">
          <div class="stat-number">48h</div>
          <div class="stat-label">Trial Period</div>
        </div>
      </div>
    </header>
    
    <div class="demos-grid">
      ${configs.map(config => `
        <div class="demo-card">
          <span class="demo-category">${config.category}</span>
          <h3>${config.business_name}</h3>
          <div class="demo-rating">
            ${'⭐'.repeat(Math.floor(config.rating))} ${config.rating}
          </div>
          <p style="color: #6b7280; line-height: 1.6;">
            ${config.description ? config.description.substring(0, 120) + '...' : 'Professional website demo'}
          </p>
          <a href="/demo/${config.slug}" class="demo-link">
            View Demo →
          </a>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;
}

function handleRequest(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  
  // Root path - show index
  if (url.pathname === '/') {
    const configs = getAllConfigs();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(generateIndexHTML(configs));
    return;
  }
  
  // Demo path
  const demoMatch = url.pathname.match(/^\/demo\/([a-z0-9-]+)$/);
  if (demoMatch) {
    const slug = demoMatch[1];
    const config = loadConfig(slug);
    
    if (!config) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 100px;">
            <h1>404 - Demo Not Found</h1>
            <p>The demo "${slug}" does not exist.</p>
            <a href="/">← Back to demos</a>
          </body>
        </html>
      `);
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(generateDemoHTML(config));
    return;
  }
  
  // 404 for other paths
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

function startServer() {
  const server = http.createServer(handleRequest);
  
  server.listen(PORT, () => {
    console.log(`\n✨ SiteForge AI Demo Server Running!`);
    console.log(`\n📍 Local:     http://localhost:${PORT}`);
    console.log(`📁 Configs:   ${CONFIGS_DIR}`);
    
    const configs = getAllConfigs();
    console.log(`\n🎨 ${configs.length} demo site(s) available:\n`);
    
    configs.forEach(config => {
      console.log(`   • ${config.business_name}`);
      console.log(`     http://localhost:${PORT}/demo/${config.slug}`);
      console.log('');
    });
    
    console.log(`💡 Press Ctrl+C to stop\n`);
  });
  
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use.`);
      console.error(`   Try: PORT=3001 node serve-demo.js`);
      process.exit(1);
    } else {
      throw err;
    }
  });
}

// Run if called directly
if (require.main === module) {
  startServer();
}

module.exports = { startServer, loadConfig, getAllConfigs };
