// Content generation templates for different business categories

const categoryTemplates = {
  restaurant: {
    services: ['Dine-in', 'Takeout', 'Delivery', 'Catering', 'Outdoor Seating'],
    hours: { 'mon-fri': '11am-10pm', 'sat-sun': '12pm-11pm' },
    taglines: [
      'Authentic flavors, unforgettable experiences',
      'Where great food meets great service',
      'Your neighborhood favorite since day one',
      'Fresh ingredients, traditional recipes',
      'Come hungry, leave happy'
    ],
    descriptions: [
      'A beloved local {category} serving the community with authentic flavors and warm hospitality. Our passion for quality ingredients and traditional recipes makes every visit memorable.',
      'Experience the finest {category} cuisine in a welcoming atmosphere. We pride ourselves on exceptional service and dishes made fresh daily with locally-sourced ingredients.',
      'At {name}, we believe great food brings people together. Our menu features classic favorites and innovative creations, all prepared with care and served with a smile.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800'
    ]
  },
  
  barbershop: {
    services: ['Haircuts', 'Beard Trim', 'Hot Towel Shave', 'Hair Styling', 'Kids Cuts', 'Straight Razor Shave'],
    hours: { 'mon-fri': '9am-7pm', 'saturday': '9am-6pm', 'sunday': 'Closed' },
    taglines: [
      'Classic cuts, modern style',
      'Where tradition meets style',
      'Your grooming destination',
      'Sharp cuts, sharper service',
      'Looking good never goes out of style'
    ],
    descriptions: [
      '{name} is your premier barbershop offering classic cuts and modern styles. Our experienced barbers provide personalized service in a relaxed, professional atmosphere.',
      'Step into {name} for a grooming experience that combines traditional barbering techniques with contemporary trends. We specialize in precision cuts, hot towel shaves, and premium grooming services.',
      'More than just a haircut, {name} delivers an experience. Our skilled barbers take pride in every detail, ensuring you leave looking and feeling your absolute best.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800'
    ]
  },
  
  contractor: {
    services: ['Kitchen Remodeling', 'Bathroom Renovation', 'Room Additions', 'Roofing', 'Painting', 'Flooring', 'Deck Construction'],
    hours: { 'mon-fri': '7am-6pm', 'saturday': '8am-4pm', 'sunday': 'Closed' },
    taglines: [
      'Building dreams, one project at a time',
      'Quality craftsmanship, reliable service',
      'Transforming houses into homes',
      'Your trusted home improvement partner',
      'Excellence in every detail'
    ],
    descriptions: [
      '{name} is a full-service general contractor specializing in residential renovations and home improvements. With years of experience and a commitment to quality, we bring your vision to life.',
      'From kitchen remodels to room additions, {name} delivers exceptional craftsmanship and reliable service. Our skilled team works closely with you to ensure your project exceeds expectations.',
      'At {name}, we understand that your home is your biggest investment. That\'s why we treat every project with the care and attention it deserves, delivering outstanding results on time and on budget.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200',
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800'
    ]
  },
  
  'auto repair': {
    services: ['Oil Change', 'Brake Service', 'Engine Diagnostics', 'Tire Rotation', 'AC Repair', 'Transmission Service'],
    hours: { 'mon-fri': '8am-6pm', 'saturday': '8am-2pm', 'sunday': 'Closed' },
    taglines: [
      'Keeping you on the road',
      'Expert auto care you can trust',
      'Your car deserves the best',
      'Quality repairs, honest service',
      'Fast, reliable, professional'
    ],
    descriptions: [
      '{name} provides comprehensive auto repair services with honesty and expertise. Our ASE-certified technicians use state-of-the-art equipment to diagnose and fix any issue.',
      'Trust {name} for all your automotive needs. From routine maintenance to major repairs, we deliver quality workmanship at fair prices with a commitment to customer satisfaction.',
      'At {name}, we treat your vehicle like it\'s our own. Our experienced mechanics provide thorough diagnostics and reliable repairs to keep your car running smoothly for years to come.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200',
      'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800',
      'https://images.unsplash.com/photo-1632823469621-d391c69a0ca8?w=800'
    ]
  },
  
  dentist: {
    services: ['Cleanings & Prevention', 'Fillings & Restorations', 'Teeth Whitening', 'Crowns & Bridges', 'Root Canals', 'Cosmetic Dentistry'],
    hours: { 'mon-fri': '8am-5pm', 'saturday': '9am-1pm', 'sunday': 'Closed' },
    taglines: [
      'Your smile is our priority',
      'Gentle care, beautiful smiles',
      'Where healthy smiles begin',
      'Advanced dental care with a personal touch',
      'Creating confident smiles'
    ],
    descriptions: [
      '{name} offers comprehensive dental care in a comfortable, welcoming environment. Our experienced team provides everything from routine cleanings to advanced cosmetic procedures.',
      'At {name}, we believe everyone deserves a healthy, beautiful smile. Our gentle approach and state-of-the-art technology make dental visits stress-free and effective.',
      'Trust {name} for all your dental needs. We combine clinical excellence with compassionate care, ensuring you and your family receive the best possible treatment in a friendly atmosphere.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800'
    ]
  },
  
  salon: {
    services: ['Haircuts & Styling', 'Hair Color', 'Highlights', 'Blowouts', 'Hair Treatments', 'Special Occasion Styling'],
    hours: { 'mon-fri': '9am-7pm', 'saturday': '9am-6pm', 'sunday': '10am-5pm' },
    taglines: [
      'Where beauty meets expertise',
      'Transforming hair, boosting confidence',
      'Your style, our passion',
      'Beautiful hair starts here',
      'Discover your best look'
    ],
    descriptions: [
      '{name} is your destination for expert hair care and styling. Our talented stylists stay current with the latest trends and techniques to give you the perfect look.',
      'Experience the difference at {name}. From precision cuts to stunning color, we offer a full range of services in a relaxing, upscale atmosphere.',
      'At {name}, we believe great hair can change your day. Our passionate team listens to your needs and delivers personalized service that leaves you looking and feeling amazing.'
    ],
    photos: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
      'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800'
    ]
  }
};

function normalizeCategory(category) {
  const lower = category.toLowerCase();
  
  // Map various category variations to our templates
  if (lower.includes('restaurant') || lower.includes('cafe') || lower.includes('pizza') || 
      lower.includes('grill') || lower.includes('diner') || lower.includes('bistro') ||
      lower.includes('eatery') || lower.includes('kitchen')) {
    return 'restaurant';
  }
  if (lower.includes('barber')) {
    return 'barbershop';
  }
  if (lower.includes('contractor') || lower.includes('construction') || lower.includes('builder') ||
      lower.includes('remodel') || lower.includes('renovation')) {
    return 'contractor';
  }
  if (lower.includes('auto') || lower.includes('mechanic') || lower.includes('repair shop')) {
    return 'auto repair';
  }
  if (lower.includes('dentist') || lower.includes('dental')) {
    return 'dentist';
  }
  if (lower.includes('salon') || lower.includes('hair') || lower.includes('beauty')) {
    return 'salon';
  }
  
  // Default fallback
  return 'restaurant';
}

function generateContent(businessName, category) {
  const normalizedCategory = normalizeCategory(category);
  const template = categoryTemplates[normalizedCategory] || categoryTemplates.restaurant;
  
  // Pick random items from arrays
  const randomIndex = Math.floor(Math.random() * template.taglines.length);
  const tagline = template.taglines[randomIndex];
  
  const descIndex = Math.floor(Math.random() * template.descriptions.length);
  let description = template.descriptions[descIndex];
  
  // Replace placeholders
  description = description.replace(/\{name\}/g, businessName);
  description = description.replace(/\{category\}/g, category);
  
  return {
    tagline,
    description,
    services: template.services.slice(0, 6), // Take first 6 services
    hours: template.hours,
    photos: template.photos,
    normalizedCategory
  };
}

function generateReviews(rating, count) {
  const reviewTemplates = [
    "Excellent service and great quality! Highly recommend.",
    "Very professional and friendly. Will definitely be back!",
    "Amazing experience from start to finish. Five stars!",
    "Best in the area. You won't be disappointed!",
    "Outstanding work and fair prices. Very satisfied!",
    "Exceeded my expectations. Great attention to detail!",
    "Friendly staff and top-notch service. Love this place!",
    "Quality work at reasonable prices. Couldn't ask for more!",
    "Fantastic! They really know what they're doing.",
    "Great customer service and excellent results!"
  ];
  
  // Generate 5-8 reviews
  const numReviews = Math.min(5 + Math.floor(Math.random() * 4), count, 10);
  const selectedReviews = [];
  
  for (let i = 0; i < numReviews; i++) {
    selectedReviews.push(reviewTemplates[i % reviewTemplates.length]);
  }
  
  return selectedReviews;
}

function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
}

module.exports = {
  generateContent,
  generateReviews,
  createSlug,
  normalizeCategory
};
