#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { generateDemoConfig, saveConfig, loadLeads } = require('./generate-demo');

const CONFIGS_DIR = path.join(__dirname, 'configs');

function sortLeadsByRating(leads) {
  return leads
    .filter(lead => lead.rating && lead.rating > 0)
    .sort((a, b) => {
      // Sort by rating (descending), then by review count (descending)
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return (b.review_count || 0) - (a.review_count || 0);
    });
}

function main() {
  const args = process.argv.slice(2);
  let numLeads = 10; // Default to top 10
  
  if (args.length > 0) {
    numLeads = parseInt(args[0]);
    if (isNaN(numLeads) || numLeads < 1) {
      console.error('❌ Invalid number. Usage: node generate-all-demos.js [number]');
      process.exit(1);
    }
  }
  
  console.log(`\n🚀 Generating configs for top ${numLeads} leads by rating...\n`);
  
  // Load and sort leads
  const allLeads = loadLeads();
  const sortedLeads = sortLeadsByRating(allLeads);
  const topLeads = sortedLeads.slice(0, numLeads);
  
  console.log(`📋 Found ${sortedLeads.length} leads with ratings`);
  console.log(`🎯 Processing top ${topLeads.length} leads\n`);
  
  // Ensure configs directory exists
  if (!fs.existsSync(CONFIGS_DIR)) {
    fs.mkdirSync(CONFIGS_DIR, { recursive: true });
  }
  
  // Generate configs for each lead
  const results = [];
  
  topLeads.forEach((lead, index) => {
    try {
      console.log(`[${index + 1}/${topLeads.length}] Generating: ${lead.name} (${lead.rating}⭐)`);
      
      const config = generateDemoConfig(lead);
      const filename = `${config.slug}.json`;
      saveConfig(config, filename);
      
      results.push({
        name: lead.name,
        slug: config.slug,
        rating: lead.rating,
        category: config.category,
        filename: filename,
        success: true
      });
      
    } catch (error) {
      console.error(`   ❌ Error generating ${lead.name}: ${error.message}`);
      results.push({
        name: lead.name,
        success: false,
        error: error.message
      });
    }
  });
  
  // Save summary
  const summaryPath = path.join(CONFIGS_DIR, '_summary.json');
  const summary = {
    generated_at: new Date().toISOString(),
    total_generated: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    configs: results
  };
  
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  
  console.log(`\n✨ Generation complete!`);
  console.log(`✅ Successfully generated: ${summary.total_generated}`);
  if (summary.failed > 0) {
    console.log(`❌ Failed: ${summary.failed}`);
  }
  console.log(`📁 Configs saved to: ${CONFIGS_DIR}`);
  console.log(`📊 Summary: ${summaryPath}`);
  
  console.log(`\n💡 To serve demos:`);
  console.log(`   node serve-demo.js`);
  console.log(`   Then visit: http://localhost:3000/demo/<slug>`);
  
  return summary;
}

// Run if called directly
if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

module.exports = { sortLeadsByRating };
