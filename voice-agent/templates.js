// SiteForge AI - Premium Demo Templates
// 6 radically different, niche-specific templates that look like $5K premium designs

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getTimeRemaining(expiryDate) {
  const total = Date.parse(expiryDate) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

// Common animation JavaScript (used across all templates)
function getAnimationScript() {
  return `
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-up, .animate-scale-in, .animate-slide-left, .animate-slide-right').forEach(el => {
      observer.observe(el);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }

    // FAQ accordion
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
      });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (mobileMenu) mobileMenu.classList.remove('active');
        }
      });
    });

    // Demo countdown timer
    function updateCountdown() {
      const expiryDate = document.querySelector('.demo-banner').dataset.expires;
      const { days, hours, minutes, seconds } = getTimeRemaining(expiryDate);
      document.getElementById('countdown-days').textContent = days;
      document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
    }

    function getTimeRemaining(expiryDate) {
      const total = Date.parse(expiryDate) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      return { total, days, hours, minutes, seconds };
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  `;
}

// ============================================================================
// TEMPLATE 1: DENTIST - "Clinical Elegance"
// ============================================================================

function dentistTemplate(config) {
  const photos = config.photos || ['https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800', 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800'];
  const services = config.services || ['General Dentistry', 'Cosmetic Whitening', 'Orthodontics', 'Dental Implants', 'Emergency Care', 'Preventive Care'];
  const reviews = config.reviews || ['Dr. Alfonso transformed my smile completely. Professional, caring, and absolutely worth it.', 'The best dental experience I\'ve ever had. The team makes you feel like family.', 'Finally found a dentist I can trust. Their attention to detail is remarkable.'];
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.business_name} - ${config.tagline || 'Professional Dental Care'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg: #FAFBFC;
      --accent: #2563EB;
      --text: #0F172A;
      --text-light: #64748B;
      --border: #E2E8F0;
      --card-bg: #FFFFFF;
    }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      line-height: 1.2;
    }

    /* Demo Banner */
    .demo-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%);
      color: white;
      padding: 12px 20px;
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 24px;
      font-size: 14px;
      box-shadow: 0 4px 20px rgba(37, 99, 235, 0.2);
    }

    .demo-banner-content {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .countdown {
      display: flex;
      gap: 12px;
      font-weight: 600;
    }

    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 40px;
    }

    .countdown-value {
      font-size: 20px;
      font-weight: 700;
    }

    .countdown-label {
      font-size: 10px;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .demo-cta {
      background: white;
      color: #2563EB;
      padding: 8px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .demo-cta:hover {
      transform: translateY(-2px);
    }

    /* Navbar */
    .navbar {
      position: fixed;
      top: 48px;
      left: 0;
      right: 0;
      background: transparent;
      padding: 20px 5%;
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .navbar.scrolled {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(12px);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      padding: 16px 5%;
    }

    .navbar-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-family: 'Outfit', sans-serif;
      font-size: 24px;
      font-weight: 700;
      color: var(--text);
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      gap: 40px;
      list-style: none;
    }

    .nav-links a {
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
      font-size: 15px;
      transition: color 0.2s;
    }

    .nav-links a:hover {
      color: var(--accent);
    }

    .nav-cta {
      background: var(--accent);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 6px;
      background: none;
      border: none;
      cursor: pointer;
    }

    .menu-toggle span {
      width: 24px;
      height: 2px;
      background: var(--text);
      transition: all 0.3s;
    }

    .mobile-menu {
      display: none;
    }

    /* Hero */
    .hero {
      margin-top: 140px;
      padding: 80px 5% 120px;
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    .hero-content h1 {
      font-size: 64px;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
    }

    .hero-tagline {
      font-size: 20px;
      color: var(--text-light);
      margin-bottom: 40px;
      line-height: 1.6;
    }

    .social-proof {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 40px;
      padding: 20px 0;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stars {
      color: #F59E0B;
      font-size: 18px;
    }

    .rating-text {
      font-weight: 600;
      font-size: 18px;
    }

    .review-count {
      color: var(--text-light);
      font-size: 14px;
    }

    .hero-cta {
      display: inline-block;
      background: var(--accent);
      color: white;
      padding: 18px 40px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-cta:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(37, 99, 235, 0.4);
    }

    .hero-image {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      aspect-ratio: 4/5;
    }

    .hero-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-image:hover img {
      transform: scale(1.05);
    }

    /* Services Section */
    .services {
      padding: 120px 5%;
      background: white;
    }

    .section-header {
      max-width: 600px;
      margin-bottom: 64px;
    }

    .section-label {
      color: var(--accent);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 14px;
      margin-bottom: 12px;
    }

    .section-title {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .section-subtitle {
      color: var(--text-light);
      font-size: 18px;
      line-height: 1.7;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .service-card {
      background: var(--bg);
      padding: 40px 32px;
      border-radius: 16px;
      border: 1px solid var(--border);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
      border-color: var(--accent);
    }

    .service-card h3 {
      font-size: 22px;
      margin-bottom: 12px;
    }

    .service-card p {
      color: var(--text-light);
      line-height: 1.7;
    }

    /* About Section */
    .about {
      padding: 120px 5%;
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    .about-image {
      border-radius: 24px;
      overflow: hidden;
      aspect-ratio: 4/5;
    }

    .about-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .about-image:hover img {
      transform: scale(1.05);
    }

    .about-content h2 {
      font-size: 42px;
      margin-bottom: 24px;
    }

    .about-content p {
      color: var(--text-light);
      font-size: 17px;
      line-height: 1.8;
      margin-bottom: 32px;
    }

    /* Process Section */
    .process {
      padding: 120px 5%;
      background: white;
    }

    .process-steps {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
    }

    .process-step {
      text-align: center;
      position: relative;
    }

    .step-number {
      width: 64px;
      height: 64px;
      background: var(--accent);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
      margin: 0 auto 24px;
    }

    .process-step h3 {
      font-size: 20px;
      margin-bottom: 12px;
    }

    .process-step p {
      color: var(--text-light);
      font-size: 15px;
      line-height: 1.6;
    }

    /* Testimonials */
    .testimonials {
      padding: 120px 5%;
      background: var(--bg);
    }

    .testimonials-grid {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
    }

    .testimonial-card {
      background: white;
      padding: 40px;
      border-radius: 16px;
      border: 1px solid var(--border);
    }

    .testimonial-stars {
      color: #F59E0B;
      font-size: 16px;
      margin-bottom: 20px;
    }

    .testimonial-text {
      color: var(--text);
      font-size: 16px;
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .testimonial-author {
      font-weight: 600;
      color: var(--text);
    }

    /* FAQ */
    .faq {
      padding: 120px 5%;
      background: white;
    }

    .faq-list {
      max-width: 800px;
      margin: 0 auto;
    }

    .faq-item {
      border-bottom: 1px solid var(--border);
      padding: 24px 0;
    }

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
      color: var(--text);
    }

    .faq-question::after {
      content: '+';
      font-size: 24px;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .faq-item.active .faq-question::after {
      transform: rotate(45deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      color: var(--text-light);
      line-height: 1.7;
    }

    .faq-item.active .faq-answer {
      max-height: 300px;
      margin-top: 16px;
    }

    /* CTA Final */
    .cta-final {
      padding: 120px 5%;
      background: var(--accent);
      color: white;
      text-align: center;
    }

    .cta-final h2 {
      font-size: 48px;
      margin-bottom: 24px;
      color: white;
    }

    .cta-final p {
      font-size: 20px;
      margin-bottom: 40px;
      opacity: 0.95;
    }

    .cta-button {
      display: inline-block;
      background: white;
      color: var(--accent);
      padding: 18px 48px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
    }

    /* Footer */
    .footer {
      padding: 60px 5%;
      background: var(--text);
      color: white;
    }

    .footer-content {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 60px;
    }

    .footer-brand h3 {
      font-size: 24px;
      margin-bottom: 16px;
      color: white;
    }

    .footer-brand p {
      opacity: 0.8;
      line-height: 1.7;
    }

    .footer-section h4 {
      font-size: 16px;
      margin-bottom: 20px;
      color: white;
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section a {
      color: white;
      opacity: 0.8;
      text-decoration: none;
      display: block;
      margin-bottom: 12px;
      transition: opacity 0.2s;
    }

    .footer-section a:hover {
      opacity: 1;
    }

    .footer-bottom {
      max-width: 1400px;
      margin: 40px auto 0;
      padding-top: 40px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      opacity: 0.7;
      font-size: 14px;
    }

    /* Animations */
    .animate-fade-up {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .animate-scale-in {
      opacity: 0;
      transform: scale(0.95);
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-scale-in.visible {
      opacity: 1;
      transform: scale(1);
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .demo-banner {
        font-size: 12px;
        padding: 10px;
      }

      .countdown {
        gap: 8px;
      }

      .countdown-value {
        font-size: 16px;
      }

      .navbar {
        top: 38px;
      }

      .nav-links {
        display: none;
      }

      .menu-toggle {
        display: flex;
      }

      .mobile-menu {
        display: block;
        position: fixed;
        top: 110px;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.3s;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }

      .mobile-menu.active {
        transform: translateY(0);
        opacity: 1;
      }

      .mobile-menu a {
        display: block;
        padding: 12px 0;
        color: var(--text);
        text-decoration: none;
        font-weight: 500;
      }

      .hero {
        grid-template-columns: 1fr;
        gap: 40px;
        margin-top: 100px;
        padding: 40px 5% 80px;
      }

      .hero-content h1 {
        font-size: 40px;
      }

      .hero-tagline {
        font-size: 18px;
      }

      .social-proof {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .services-grid,
      .testimonials-grid,
      .process-steps {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .about {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      .section-title {
        font-size: 36px;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }
  </style>
</head>
<body>
  <!-- Demo Banner -->
  <div class="demo-banner" data-expires="${config.demo_expires}">
    <div class="demo-banner-content">
      <span>🎉 This site is available! Claim it before:</span>
      <div class="countdown">
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-days">0</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-hours">00</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-minutes">00</span>
          <span class="countdown-label">Min</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-seconds">00</span>
          <span class="countdown-label">Sec</span>
        </div>
      </div>
      <a href="tel:${config.phone}" class="demo-cta">Claim This Site</a>
    </div>
  </div>

  <!-- Navbar -->
  <nav class="navbar">
    <div class="navbar-content">
      <a href="#" class="logo">${config.business_name.split(' ')[0]}</a>
      <ul class="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#testimonials">Reviews</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <a href="tel:${config.phone}" class="nav-cta">Book Appointment</a>
      <button class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="mobile-menu">
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="#testimonials">Reviews</a>
      <a href="#faq">FAQ</a>
      <a href="tel:${config.phone}">Book Appointment</a>
    </div>
  </nav>

  <!-- Hero -->
  <section class="hero">
    <div class="hero-content">
      <h1 class="animate-fade-up">${config.tagline || 'Your Smile, Our Priority'}</h1>
      <p class="hero-tagline animate-fade-up" style="transition-delay: 0.1s">${config.description || 'Experience world-class dental care in a comfortable, modern environment. We combine advanced technology with a gentle touch to give you the smile you deserve.'}</p>
      
      <div class="social-proof animate-fade-up" style="transition-delay: 0.2s">
        <div class="rating">
          <span class="stars">★★★★★</span>
          <span class="rating-text">${config.rating}</span>
        </div>
        <span class="review-count">${config.review_count}+ verified patients</span>
      </div>
      
      <a href="tel:${config.phone}" class="hero-cta animate-fade-up" style="transition-delay: 0.3s">Schedule Consultation</a>
    </div>
    <div class="hero-image animate-scale-in" style="transition-delay: 0.2s">
      <img src="${photos[0]}" alt="${config.business_name}" loading="lazy">
    </div>
  </section>

  <!-- Services -->
  <section id="services" class="services">
    <div class="section-header animate-fade-up">
      <div class="section-label">Our Services</div>
      <h2 class="section-title">Comprehensive Dental Care</h2>
      <p class="section-subtitle">From routine checkups to complete smile transformations, we offer the full spectrum of modern dentistry.</p>
    </div>
    <div class="services-grid">
      ${services.map((service, i) => `
        <div class="service-card animate-fade-up" style="transition-delay: ${i * 0.1}s">
          <h3>${service}</h3>
          <p>Expert care using the latest techniques and technology for optimal results.</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- About -->
  <section id="about" class="about">
    <div class="about-image animate-scale-in">
      <img src="${photos[1] || photos[0]}" alt="Our Practice" loading="lazy">
    </div>
    <div class="about-content">
      <h2 class="animate-fade-up">Where Expertise Meets Compassion</h2>
      <p class="animate-fade-up" style="transition-delay: 0.1s">${config.description || 'Our practice combines decades of experience with the newest dental technology. We believe great dentistry starts with listening to our patients and understanding their unique needs and concerns.'}</p>
      <p class="animate-fade-up" style="transition-delay: 0.2s">Every member of our team is dedicated to making your visit comfortable, efficient, and effective. From your first consultation to your final checkup, we're with you every step of the way.</p>
    </div>
  </section>

  <!-- Process -->
  <section class="process">
    <div class="section-header animate-fade-up">
      <div class="section-label">How It Works</div>
      <h2 class="section-title">Your Journey to a Perfect Smile</h2>
    </div>
    <div class="process-steps">
      <div class="process-step animate-fade-up" style="transition-delay: 0.1s">
        <div class="step-number">1</div>
        <h3>Consultation</h3>
        <p>Complete exam and personalized treatment planning</p>
      </div>
      <div class="process-step animate-fade-up" style="transition-delay: 0.2s">
        <div class="step-number">2</div>
        <h3>Treatment</h3>
        <p>Expert care in a comfortable, modern environment</p>
      </div>
      <div class="process-step animate-fade-up" style="transition-delay: 0.3s">
        <div class="step-number">3</div>
        <h3>Recovery</h3>
        <p>Personalized aftercare and support</p>
      </div>
      <div class="process-step animate-fade-up" style="transition-delay: 0.4s">
        <div class="step-number">4</div>
        <h3>Maintain</h3>
        <p>Ongoing care to keep your smile healthy</p>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section id="testimonials" class="testimonials">
    <div class="section-header animate-fade-up">
      <div class="section-label">Patient Stories</div>
      <h2 class="section-title">What Our Patients Say</h2>
    </div>
    <div class="testimonials-grid">
      ${reviews.slice(0, 3).map((review, i) => `
        <div class="testimonial-card animate-fade-up" style="transition-delay: ${i * 0.1}s">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">"${review}"</p>
          <div class="testimonial-author">Verified Patient</div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="faq">
    <div class="section-header animate-fade-up">
      <div class="section-label">FAQ</div>
      <h2 class="section-title">Common Questions</h2>
    </div>
    <div class="faq-list">
      <div class="faq-item animate-fade-up">
        <div class="faq-question">Do you accept insurance?</div>
        <div class="faq-answer">Yes, we accept most major insurance plans and will help you maximize your benefits. We also offer flexible payment options for out-of-pocket costs.</div>
      </div>
      <div class="faq-item animate-fade-up" style="transition-delay: 0.1s">
        <div class="faq-question">What should I expect at my first visit?</div>
        <div class="faq-answer">Your first visit includes a comprehensive exam, digital X-rays, oral health assessment, and a personalized treatment plan discussion. We'll take time to answer all your questions.</div>
      </div>
      <div class="faq-item animate-fade-up" style="transition-delay: 0.2s">
        <div class="faq-question">Do you offer emergency dental care?</div>
        <div class="faq-answer">Yes, we provide same-day emergency appointments for dental pain, broken teeth, or other urgent issues. Call us immediately if you have a dental emergency.</div>
      </div>
      <div class="faq-item animate-fade-up" style="transition-delay: 0.3s">
        <div class="faq-question">How often should I visit the dentist?</div>
        <div class="faq-answer">Most patients benefit from checkups and cleanings every six months. However, we'll create a schedule tailored to your specific oral health needs.</div>
      </div>
    </div>
  </section>

  <!-- CTA Final -->
  <section class="cta-final">
    <h2 class="animate-fade-up">Ready for Your Best Smile?</h2>
    <p class="animate-fade-up" style="transition-delay: 0.1s">Book your consultation today and take the first step toward confident, healthy teeth.</p>
    <a href="tel:${config.phone}" class="cta-button animate-fade-up" style="transition-delay: 0.2s">Schedule Appointment</a>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <h3>${config.business_name}</h3>
        <p>${config.tagline || 'Your trusted partner in dental health'}</p>
      </div>
      <div class="footer-section">
        <h4>Services</h4>
        <ul>
          ${services.slice(0, 4).map(s => `<li><a href="#services">${s}</a></li>`).join('')}
        </ul>
      </div>
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#about">About Us</a></li>
          <li><a href="#testimonials">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="tel:${config.phone}">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:${config.phone}">${config.phone}</a></li>
          <li><a href="mailto:${config.email}">${config.email}</a></li>
          <li>${config.address}</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      © ${new Date().getFullYear()} ${config.business_name}. All rights reserved.
    </div>
  </footer>

  <script>
    ${getAnimationScript()}
  </script>
</body>
</html>`;
}

// ============================================================================
// TEMPLATE 2: BARBERSHOP - "Heritage Craft"
// ============================================================================

function barbershopTemplate(config) {
  const photos = config.photos || ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800', 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800'];
  const services = config.services || ['Classic Cuts', 'Hot Towel Shave', 'Beard Sculpting', 'Hair & Beard Combo', 'Gray Blending', 'Scalp Treatment'];
  const reviews = config.reviews || ['Best barbershop experience in the city. Old-school quality with modern style.', 'These guys know their craft. Every cut is precision work.', 'Finally found a shop that understands traditional grooming. Worth every penny.'];
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.business_name} - ${config.tagline || 'Traditional Barbering, Modern Style'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg: #0C0C0C;
      --accent: #C4A052;
      --text: #F5F5F0;
      --text-dim: #A3A39E;
      --card-bg: #1A1A1A;
    }

    body {
      font-family: 'Work Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
    }

    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        repeating-linear-gradient(0deg, rgba(0,0,0,.03), rgba(0,0,0,.03) 1px, transparent 1px, transparent 2px),
        repeating-linear-gradient(90deg, rgba(0,0,0,.03), rgba(0,0,0,.03) 1px, transparent 1px, transparent 2px);
      pointer-events: none;
      z-index: 1;
      opacity: 0.4;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    /* Demo Banner */
    .demo-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #C4A052 0%, #B89440 100%);
      color: #0C0C0C;
      padding: 12px 20px;
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 24px;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 4px 20px rgba(196, 160, 82, 0.3);
    }

    .demo-banner-content {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .countdown {
      display: flex;
      gap: 12px;
      font-weight: 700;
    }

    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 40px;
    }

    .countdown-value {
      font-size: 20px;
      font-weight: 700;
    }

    .countdown-label {
      font-size: 10px;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .demo-cta {
      background: #0C0C0C;
      color: #C4A052;
      padding: 8px 20px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 700;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .demo-cta:hover {
      transform: translateY(-2px);
    }

    /* Navbar */
    .navbar {
      position: fixed;
      top: 48px;
      left: 0;
      right: 0;
      background: transparent;
      padding: 24px 5%;
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .navbar.scrolled {
      background: rgba(12, 12, 12, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(196, 160, 82, 0.2);
      padding: 18px 5%;
    }

    .navbar-content {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
    }

    .logo {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 26px;
      font-weight: 700;
      color: var(--accent);
      text-decoration: none;
      letter-spacing: -0.02em;
    }

    .nav-links {
      display: flex;
      gap: 48px;
      list-style: none;
    }

    .nav-links a {
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
      font-size: 15px;
      transition: color 0.2s;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 13px;
    }

    .nav-links a:hover {
      color: var(--accent);
    }

    .nav-cta {
      background: transparent;
      color: var(--accent);
      padding: 12px 28px;
      border: 2px solid var(--accent);
      border-radius: 2px;
      text-decoration: none;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 13px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-cta:hover {
      background: var(--accent);
      color: #0C0C0C;
      transform: translateY(-2px);
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 6px;
      background: none;
      border: none;
      cursor: pointer;
    }

    .menu-toggle span {
      width: 28px;
      height: 2px;
      background: var(--accent);
      transition: all 0.3s;
    }

    .mobile-menu {
      display: none;
    }

    /* Hero */
    .hero {
      min-height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0 5%;
      margin-top: 48px;
    }

    .hero-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }

    .hero-bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.4;
      filter: grayscale(0.3);
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(12,12,12,0.6) 0%, rgba(12,12,12,0.9) 100%);
    }

    .hero-content {
      position: relative;
      z-index: 10;
      max-width: 900px;
    }

    .hero-label {
      color: var(--accent);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-size: 13px;
      margin-bottom: 24px;
    }

    .hero-content h1 {
      font-size: 96px;
      margin-bottom: 32px;
      color: var(--text);
      text-transform: uppercase;
      letter-spacing: -0.03em;
    }

    .hero-tagline {
      font-size: 22px;
      color: var(--text-dim);
      margin-bottom: 48px;
      line-height: 1.6;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .social-proof {
      display: inline-flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 48px;
      padding: 20px 32px;
      background: rgba(26, 26, 26, 0.6);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(196, 160, 82, 0.2);
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .stars {
      color: var(--accent);
      font-size: 18px;
    }

    .rating-text {
      font-weight: 700;
      font-size: 20px;
      color: var(--accent);
    }

    .divider {
      width: 1px;
      height: 30px;
      background: rgba(196, 160, 82, 0.3);
    }

    .review-count {
      color: var(--text-dim);
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .hero-cta {
      display: inline-block;
      background: var(--accent);
      color: #0C0C0C;
      padding: 20px 48px;
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      border: 2px solid var(--accent);
    }

    .hero-cta:hover {
      background: transparent;
      color: var(--accent);
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(196, 160, 82, 0.3);
    }

    /* Services */
    .services {
      padding: 160px 5%;
      background: var(--bg);
      position: relative;
      z-index: 10;
    }

    .services-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .section-header {
      max-width: 700px;
      margin-bottom: 80px;
    }

    .section-label {
      color: var(--accent);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 13px;
      margin-bottom: 16px;
      display: inline-block;
      position: relative;
    }

    .section-label::before {
      content: '';
      position: absolute;
      left: -40px;
      top: 50%;
      width: 30px;
      height: 1px;
      background: var(--accent);
    }

    .section-title {
      font-size: 56px;
      margin-bottom: 24px;
      color: var(--text);
    }

    .section-subtitle {
      color: var(--text-dim);
      font-size: 19px;
      line-height: 1.7;
    }

    .services-list {
      display: grid;
      gap: 2px;
      background: rgba(196, 160, 82, 0.1);
    }

    .service-item {
      background: var(--card-bg);
      padding: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 3px solid transparent;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-item:hover {
      background: rgba(26, 26, 26, 0.8);
      border-left-color: var(--accent);
      transform: translateX(8px);
    }

    .service-name {
      font-size: 28px;
      font-weight: 700;
      color: var(--text);
    }

    .service-arrow {
      color: var(--accent);
      font-size: 32px;
      transition: transform 0.3s;
    }

    .service-item:hover .service-arrow {
      transform: translateX(8px);
    }

    /* About */
    .about {
      padding: 160px 5%;
      background: var(--card-bg);
      position: relative;
      z-index: 10;
    }

    .about-container {
      max-width: 1600px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 100px;
      align-items: center;
    }

    .about-image {
      aspect-ratio: 3/4;
      overflow: hidden;
      position: relative;
    }

    .about-image::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      right: -20px;
      bottom: -20px;
      border: 2px solid var(--accent);
      z-index: -1;
    }

    .about-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(0.2);
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .about-image:hover img {
      transform: scale(1.05);
    }

    .about-content h2 {
      font-size: 52px;
      margin-bottom: 32px;
      color: var(--text);
    }

    .about-content p {
      color: var(--text-dim);
      font-size: 18px;
      line-height: 1.8;
      margin-bottom: 28px;
    }

    /* Process */
    .process {
      padding: 160px 5%;
      background: var(--bg);
      position: relative;
      z-index: 10;
    }

    .process-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .process-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 48px;
      margin-top: 80px;
    }

    .process-step {
      position: relative;
    }

    .step-number {
      font-size: 80px;
      font-weight: 700;
      color: transparent;
      -webkit-text-stroke: 2px var(--accent);
      line-height: 1;
      margin-bottom: 24px;
    }

    .process-step h3 {
      font-size: 24px;
      margin-bottom: 16px;
      color: var(--text);
      text-transform: uppercase;
      letter-spacing: -0.02em;
    }

    .process-step p {
      color: var(--text-dim);
      font-size: 15px;
      line-height: 1.7;
    }

    /* Testimonials */
    .testimonials {
      padding: 160px 5%;
      background: var(--card-bg);
      position: relative;
      z-index: 10;
    }

    .testimonials-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }

    .testimonial-card {
      background: var(--bg);
      padding: 48px;
      border: 1px solid rgba(196, 160, 82, 0.2);
      position: relative;
    }

    .testimonial-card::before {
      content: '"';
      position: absolute;
      top: 20px;
      left: 30px;
      font-size: 120px;
      color: var(--accent);
      opacity: 0.1;
      font-family: Georgia, serif;
      line-height: 1;
    }

    .testimonial-stars {
      color: var(--accent);
      font-size: 16px;
      margin-bottom: 24px;
    }

    .testimonial-text {
      color: var(--text);
      font-size: 17px;
      line-height: 1.7;
      margin-bottom: 32px;
      position: relative;
      z-index: 1;
    }

    .testimonial-author {
      font-weight: 600;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 13px;
    }

    /* FAQ */
    .faq {
      padding: 160px 5%;
      background: var(--bg);
      position: relative;
      z-index: 10;
    }

    .faq-container {
      max-width: 900px;
      margin: 0 auto;
    }

    .faq-list {
      margin-top: 80px;
    }

    .faq-item {
      border-bottom: 1px solid rgba(196, 160, 82, 0.2);
      padding: 32px 0;
    }

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-size: 22px;
      font-weight: 600;
      color: var(--text);
      font-family: 'Space Grotesk', sans-serif;
    }

    .faq-question::after {
      content: '+';
      font-size: 32px;
      color: var(--accent);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .faq-item.active .faq-question::after {
      transform: rotate(45deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      color: var(--text-dim);
      line-height: 1.8;
      font-size: 16px;
    }

    .faq-item.active .faq-answer {
      max-height: 300px;
      margin-top: 20px;
    }

    /* CTA Final */
    .cta-final {
      padding: 160px 5%;
      background: var(--accent);
      color: #0C0C0C;
      text-align: center;
      position: relative;
      z-index: 10;
    }

    .cta-final h2 {
      font-size: 64px;
      margin-bottom: 32px;
      color: #0C0C0C;
      text-transform: uppercase;
    }

    .cta-final p {
      font-size: 22px;
      margin-bottom: 48px;
      opacity: 0.9;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-button {
      display: inline-block;
      background: #0C0C0C;
      color: var(--accent);
      padding: 20px 56px;
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      border: 2px solid #0C0C0C;
    }

    .cta-button:hover {
      background: transparent;
      color: #0C0C0C;
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
    }

    /* Footer */
    .footer {
      padding: 80px 5%;
      background: #000000;
      color: var(--text);
      position: relative;
      z-index: 10;
    }

    .footer-content {
      max-width: 1600px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 80px;
    }

    .footer-brand h3 {
      font-size: 28px;
      margin-bottom: 20px;
      color: var(--accent);
    }

    .footer-brand p {
      color: var(--text-dim);
      line-height: 1.7;
      font-size: 15px;
    }

    .footer-section h4 {
      font-size: 14px;
      margin-bottom: 24px;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section a {
      color: var(--text-dim);
      text-decoration: none;
      display: block;
      margin-bottom: 14px;
      transition: color 0.2s;
      font-size: 15px;
    }

    .footer-section a:hover {
      color: var(--accent);
    }

    .footer-bottom {
      max-width: 1600px;
      margin: 60px auto 0;
      padding-top: 40px;
      border-top: 1px solid rgba(196, 160, 82, 0.2);
      text-align: center;
      color: var(--text-dim);
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Animations */
    .animate-fade-up {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .animate-scale-in {
      opacity: 0;
      transform: scale(0.95);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-scale-in.visible {
      opacity: 1;
      transform: scale(1);
    }

    /* Mobile */
    @media (max-width: 768px) {
      .demo-banner {
        font-size: 11px;
        padding: 10px;
      }

      .navbar {
        top: 38px;
      }

      .nav-links {
        display: none;
      }

      .menu-toggle {
        display: flex;
      }

      .mobile-menu {
        display: block;
        position: fixed;
        top: 110px;
        left: 0;
        right: 0;
        background: rgba(12, 12, 12, 0.98);
        padding: 24px;
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.3s;
        border-bottom: 2px solid var(--accent);
      }

      .mobile-menu.active {
        transform: translateY(0);
        opacity: 1;
      }

      .mobile-menu a {
        display: block;
        padding: 16px 0;
        color: var(--text);
        text-decoration: none;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 13px;
      }

      .hero-content h1 {
        font-size: 48px;
      }

      .hero-tagline {
        font-size: 18px;
      }

      .social-proof {
        flex-direction: column;
        gap: 16px;
      }

      .services-list,
      .testimonials-grid,
      .process-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .about-container {
        grid-template-columns: 1fr;
        gap: 60px;
      }

      .section-title {
        font-size: 40px;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 48px;
      }

      .section-label::before {
        display: none;
      }

      .about-image::before {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="demo-banner" data-expires="${config.demo_expires}">
    <div class="demo-banner-content">
      <span>⚡ AVAILABLE NOW - CLAIM BEFORE:</span>
      <div class="countdown">
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-days">0</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-hours">00</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-minutes">00</span>
          <span class="countdown-label">Min</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-seconds">00</span>
          <span class="countdown-label">Sec</span>
        </div>
      </div>
      <a href="tel:${config.phone}" class="demo-cta">CLAIM NOW</a>
    </div>
  </div>

  <nav class="navbar">
    <div class="navbar-content">
      <a href="#" class="logo">${config.business_name.split(' ')[0].toUpperCase()}</a>
      <ul class="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#testimonials">Reviews</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <a href="tel:${config.phone}" class="nav-cta">Book Now</a>
      <button class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="mobile-menu">
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="#testimonials">Reviews</a>
      <a href="#faq">FAQ</a>
      <a href="tel:${config.phone}">Book Now</a>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-bg">
      <img src="${photos[0]}" alt="${config.business_name}">
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-label animate-fade-up">TRADITIONAL BARBERING</div>
      <h1 class="animate-fade-up" style="transition-delay: 0.1s">HERITAGE<br>CRAFT</h1>
      <p class="hero-tagline animate-fade-up" style="transition-delay: 0.2s">${config.tagline || 'Where timeless barbering traditions meet modern precision. Every cut is a craft, every detail matters.'}</p>
      
      <div class="social-proof animate-fade-up" style="transition-delay: 0.3s">
        <div class="rating">
          <span class="stars">★★★★★</span>
          <span class="rating-text">${config.rating}</span>
        </div>
        <div class="divider"></div>
        <span class="review-count">${config.review_count}+ Reviews</span>
      </div>
      
      <a href="tel:${config.phone}" class="hero-cta animate-fade-up" style="transition-delay: 0.4s">Book Appointment</a>
    </div>
  </section>

  <section id="services" class="services">
    <div class="services-container">
      <div class="section-header animate-fade-up">
        <div class="section-label">Our Services</div>
        <h2 class="section-title">Masterful Grooming</h2>
        <p class="section-subtitle">Each service is performed with precision, care, and decades of refined technique. No shortcuts, no compromises.</p>
      </div>
      <div class="services-list">
        ${services.map((service, i) => `
          <div class="service-item animate-fade-up" style="transition-delay: ${i * 0.1}s">
            <div class="service-name">${service}</div>
            <div class="service-arrow">→</div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section id="about" class="about">
    <div class="about-container">
      <div class="about-image animate-scale-in">
        <img src="${photos[1] || photos[0]}" alt="Our Shop" loading="lazy">
      </div>
      <div class="about-content">
        <h2 class="animate-fade-up">Built on Tradition, Refined by Time</h2>
        <p class="animate-fade-up" style="transition-delay: 0.1s">${config.description || 'This isn\'t just a barbershop — it\'s a sanctuary for men who appreciate quality, craftsmanship, and authenticity. We honor the old ways while embracing modern refinement.'}</p>
        <p class="animate-fade-up" style="transition-delay: 0.2s">Every barber here has earned their place through skill, dedication, and respect for the craft. When you sit in our chair, you're part of a tradition that spans generations.</p>
      </div>
    </div>
  </section>

  <section class="process">
    <div class="process-container">
      <div class="section-header animate-fade-up">
        <div class="section-label">The Process</div>
        <h2 class="section-title">How We Work</h2>
      </div>
      <div class="process-grid">
        <div class="process-step animate-fade-up" style="transition-delay: 0.1s">
          <div class="step-number">01</div>
          <h3>Consultation</h3>
          <p>We discuss your style, preferences, and vision before the first cut.</p>
        </div>
        <div class="process-step animate-fade-up" style="transition-delay: 0.2s">
          <div class="step-number">02</div>
          <h3>Precision Work</h3>
          <p>Expert cutting, shaping, and grooming with masterful technique.</p>
        </div>
        <div class="process-step animate-fade-up" style="transition-delay: 0.3s">
          <div class="step-number">03</div>
          <h3>Finishing</h3>
          <p>Hot towel, styling, and final touches for the perfect result.</p>
        </div>
        <div class="process-step animate-fade-up" style="transition-delay: 0.4s">
          <div class="step-number">04</div>
          <h3>Maintenance</h3>
          <p>Tips and scheduling to keep you looking sharp between visits.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="testimonials" class="testimonials">
    <div class="testimonials-container">
      <div class="section-header animate-fade-up">
        <div class="section-label">Testimonials</div>
        <h2 class="section-title">What Our Clients Say</h2>
      </div>
      <div class="testimonials-grid">
        ${reviews.slice(0, 3).map((review, i) => `
          <div class="testimonial-card animate-fade-up" style="transition-delay: ${i * 0.1}s">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">${review}</p>
            <div class="testimonial-author">Verified Client</div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section id="faq" class="faq">
    <div class="faq-container">
      <div class="section-header animate-fade-up">
        <div class="section-label">FAQ</div>
        <h2 class="section-title">Common Questions</h2>
      </div>
      <div class="faq-list">
        <div class="faq-item animate-fade-up">
          <div class="faq-question">Do I need an appointment?</div>
          <div class="faq-answer">We strongly recommend booking in advance. Walk-ins are welcome when chairs are available, but appointments ensure you get your preferred barber and time.</div>
        </div>
        <div class="faq-item animate-fade-up" style="transition-delay: 0.1s">
          <div class="faq-question">What's included in a full service?</div>
          <div class="faq-answer">Our signature service includes precision cut, hot towel treatment, neck shave, styling, and a relaxing scalp massage. It's the complete experience.</div>
        </div>
        <div class="faq-item animate-fade-up" style="transition-delay: 0.2s">
          <div class="faq-question">How often should I come in?</div>
          <div class="faq-answer">Most clients maintain their look with visits every 2-3 weeks. We'll recommend a schedule based on your hair type and style.</div>
        </div>
        <div class="faq-item animate-fade-up" style="transition-delay: 0.3s">
          <div class="faq-question">Do you offer beard services?</div>
          <div class="faq-answer">Absolutely. We specialize in beard sculpting, hot towel shaves, and complete grooming. It's an art form we take seriously.</div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-final">
    <h2 class="animate-fade-up">Ready for the Best Cut of Your Life?</h2>
    <p class="animate-fade-up" style="transition-delay: 0.1s">Book your chair now and experience traditional barbering at its finest.</p>
    <a href="tel:${config.phone}" class="cta-button animate-fade-up" style="transition-delay: 0.2s">Book Appointment</a>
  </section>

  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <h3>${config.business_name}</h3>
        <p>${config.tagline || 'Traditional barbering. Modern precision.'}</p>
      </div>
      <div class="footer-section">
        <h4>Services</h4>
        <ul>
          ${services.slice(0, 4).map(s => `<li><a href="#services">${s}</a></li>`).join('')}
        </ul>
      </div>
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#testimonials">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="tel:${config.phone}">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:${config.phone}">${config.phone}</a></li>
          <li><a href="mailto:${config.email}">${config.email}</a></li>
          <li>${config.address}</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      © ${new Date().getFullYear()} ${config.business_name}. All Rights Reserved.
    </div>
  </footer>

  <script>
    ${getAnimationScript()}
  </script>
</body>
</html>`;
}

// ============================================================================
// TEMPLATE 3: RESTAURANT - "Culinary Story"
// ============================================================================

function restaurantTemplate(config) {
  const photos = config.photos || ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800'];
  const services = config.services || ['Seasonal Tasting Menu', 'Private Dining', 'Wine Pairings', 'Chef\'s Table Experience', 'Weekend Brunch', 'Catering Services'];
  const reviews = config.reviews || ['An absolute revelation. Every dish tells a story. This is what modern dining should be.', 'The attention to detail is extraordinary. Ingredients sing, flavors dance. Unforgettable.', 'Chef creates magic with local ingredients. This place has soul, heart, and incredible talent.'];
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.business_name} - ${config.tagline || 'Farm-to-Table Dining'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg: #FAF8F5;
      --accent: #B45309;
      --secondary: #7C2D12;
      --text: #1C1917;
      --text-light: #78716C;
      --card-bg: #FFFFFF;
    }

    body {
      font-family: 'Nunito Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.7;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Playfair Display', serif;
      font-weight: 600;
      line-height: 1.2;
    }

    /* Demo Banner */
    .demo-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #B45309 0%, #7C2D12 100%);
      color: #FAF8F5;
      padding: 12px 20px;
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 24px;
      font-size: 14px;
      box-shadow: 0 4px 20px rgba(180, 83, 9, 0.2);
    }

    .demo-banner-content {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .countdown {
      display: flex;
      gap: 12px;
      font-weight: 700;
    }

    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 40px;
    }

    .countdown-value {
      font-size: 20px;
      font-weight: 700;
    }

    .countdown-label {
      font-size: 10px;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .demo-cta {
      background: white;
      color: #B45309;
      padding: 8px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 700;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .demo-cta:hover {
      transform: translateY(-2px);
    }

    /* Navbar */
    .navbar {
      position: fixed;
      top: 48px;
      left: 0;
      right: 0;
      background: transparent;
      padding: 24px 5%;
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .navbar.scrolled {
      background: rgba(250, 248, 245, 0.95);
      backdrop-filter: blur(12px);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      padding: 18px 5%;
    }

    .navbar-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      font-weight: 600;
      color: var(--text);
      text-decoration: none;
      font-style: italic;
    }

    .nav-links {
      display: flex;
      gap: 40px;
      list-style: none;
    }

    .nav-links a {
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
      font-size: 15px;
      transition: color 0.2s;
    }

    .nav-links a:hover {
      color: var(--accent);
    }

    .nav-cta {
      background: var(--accent);
      color: white;
      padding: 12px 28px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-cta:hover {
      background: var(--secondary);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(180, 83, 9, 0.25);
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 6px;
      background: none;
      border: none;
      cursor: pointer;
    }

    .menu-toggle span {
      width: 24px;
      height: 2px;
      background: var(--text);
      transition: all 0.3s;
    }

    .mobile-menu {
      display: none;
    }

    /* Hero */
    .hero {
      margin-top: 140px;
      padding: 60px 5% 100px;
      max-width: 1600px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 60px;
      align-items: start;
    }

    .hero-content {
      padding-top: 40px;
    }

    .hero-label {
      color: var(--accent);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 12px;
      margin-bottom: 20px;
    }

    .hero-content h1 {
      font-size: 72px;
      margin-bottom: 28px;
      line-height: 1.1;
      font-style: italic;
    }

    .hero-tagline {
      font-size: 22px;
      color: var(--text-light);
      margin-bottom: 40px;
      line-height: 1.6;
      max-width: 500px;
    }

    .social-proof {
      display: flex;
      align-items: center;
      gap: 32px;
      margin-bottom: 44px;
      padding-bottom: 32px;
      border-bottom: 1px solid #E7E5E4;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .stars {
      color: var(--accent);
      font-size: 18px;
    }

    .rating-text {
      font-weight: 700;
      font-size: 20px;
    }

    .review-count {
      color: var(--text-light);
      font-size: 14px;
    }

    .hero-cta {
      display: inline-block;
      background: var(--accent);
      color: white;
      padding: 18px 44px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-cta:hover {
      background: var(--secondary);
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(180, 83, 9, 0.3);
    }

    .hero-image {
      position: relative;
      aspect-ratio: 3/4;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
    }

    .hero-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-image:hover img {
      transform: scale(1.05);
    }

    /* Services */
    .services {
      padding: 120px 5%;
      background: white;
    }

    .services-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .section-header {
      max-width: 650px;
      margin-bottom: 72px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }

    .section-label {
      color: var(--accent);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 12px;
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 52px;
      margin-bottom: 20px;
      font-style: italic;
    }

    .section-subtitle {
      color: var(--text-light);
      font-size: 18px;
      line-height: 1.7;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }

    .service-card {
      background: var(--bg);
      padding: 48px;
      border-radius: 8px;
      border: 1px solid #E7E5E4;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
      border-color: var(--accent);
    }

    .service-card h3 {
      font-size: 28px;
      margin-bottom: 16px;
      font-style: italic;
    }

    .service-card p {
      color: var(--text-light);
      line-height: 1.7;
      font-size: 16px;
    }

    /* About */
    .about {
      padding: 120px 5%;
      background: var(--bg);
    }

    .about-container {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    .about-content h2 {
      font-size: 48px;
      margin-bottom: 28px;
      font-style: italic;
    }

    .about-content p {
      color: var(--text-light);
      font-size: 17px;
      line-height: 1.8;
      margin-bottom: 24px;
    }

    .about-image {
      border-radius: 8px;
      overflow: hidden;
      aspect-ratio: 4/5;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
    }

    .about-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .about-image:hover img {
      transform: scale(1.05);
    }

    /* Process */
    .process {
      padding: 120px 5%;
      background: white;
    }

    .process-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .process-steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
      margin-top: 72px;
    }

    .process-step {
      text-align: center;
    }

    .step-number {
      width: 72px;
      height: 72px;
      background: var(--accent);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 700;
      margin: 0 auto 24px;
      font-family: 'Playfair Display', serif;
    }

    .process-step h3 {
      font-size: 22px;
      margin-bottom: 14px;
      font-style: italic;
    }

    .process-step p {
      color: var(--text-light);
      font-size: 15px;
      line-height: 1.6;
    }

    /* Testimonials */
    .testimonials {
      padding: 120px 5%;
      background: var(--bg);
    }

    .testimonials-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 36px;
    }

    .testimonial-card {
      background: white;
      padding: 44px;
      border-radius: 8px;
      border: 1px solid #E7E5E4;
    }

    .testimonial-stars {
      color: var(--accent);
      font-size: 16px;
      margin-bottom: 24px;
    }

    .testimonial-text {
      color: var(--text);
      font-size: 17px;
      line-height: 1.7;
      margin-bottom: 28px;
      font-style: italic;
    }

    .testimonial-author {
      font-weight: 700;
      color: var(--text);
      font-size: 14px;
    }

    /* FAQ */
    .faq {
      padding: 120px 5%;
      background: white;
    }

    .faq-container {
      max-width: 900px;
      margin: 0 auto;
    }

    .faq-list {
      margin-top: 72px;
    }

    .faq-item {
      border-bottom: 1px solid #E7E5E4;
      padding: 28px 0;
    }

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-size: 20px;
      font-weight: 600;
      color: var(--text);
      font-family: 'Playfair Display', serif;
    }

    .faq-question::after {
      content: '+';
      font-size: 28px;
      color: var(--accent);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .faq-item.active .faq-question::after {
      transform: rotate(45deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      color: var(--text-light);
      line-height: 1.7;
      font-size: 16px;
    }

    .faq-item.active .faq-answer {
      max-height: 300px;
      margin-top: 18px;
    }

    /* CTA Final */
    .cta-final {
      padding: 120px 5%;
      background: var(--secondary);
      color: white;
      text-align: center;
    }

    .cta-final h2 {
      font-size: 56px;
      margin-bottom: 28px;
      color: white;
      font-style: italic;
    }

    .cta-final p {
      font-size: 20px;
      margin-bottom: 48px;
      opacity: 0.95;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-button {
      display: inline-block;
      background: white;
      color: var(--secondary);
      padding: 18px 48px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .cta-button:hover {
      background: var(--bg);
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
    }

    /* Footer */
    .footer {
      padding: 80px 5%;
      background: var(--text);
      color: white;
    }

    .footer-content {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 60px;
    }

    .footer-brand h3 {
      font-size: 28px;
      margin-bottom: 18px;
      color: white;
      font-family: 'Playfair Display', serif;
      font-style: italic;
    }

    .footer-brand p {
      opacity: 0.8;
      line-height: 1.7;
      font-size: 15px;
    }

    .footer-section h4 {
      font-size: 16px;
      margin-bottom: 20px;
      color: white;
      font-family: 'Playfair Display', serif;
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section a {
      color: white;
      opacity: 0.8;
      text-decoration: none;
      display: block;
      margin-bottom: 12px;
      transition: opacity 0.2s;
      font-size: 15px;
    }

    .footer-section a:hover {
      opacity: 1;
    }

    .footer-bottom {
      max-width: 1400px;
      margin: 48px auto 0;
      padding-top: 40px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      opacity: 0.7;
      font-size: 14px;
    }

    /* Animations */
    .animate-fade-up {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .animate-scale-in {
      opacity: 0;
      transform: scale(0.95);
      transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-scale-in.visible {
      opacity: 1;
      transform: scale(1);
    }

    .animate-slide-right {
      opacity: 0;
      transform: translateX(-40px);
      transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-slide-right.visible {
      opacity: 1;
      transform: translateX(0);
    }

    /* Mobile */
    @media (max-width: 768px) {
      .demo-banner {
        font-size: 11px;
        padding: 10px;
      }

      .navbar {
        top: 38px;
      }

      .nav-links {
        display: none;
      }

      .menu-toggle {
        display: flex;
      }

      .mobile-menu {
        display: block;
        position: fixed;
        top: 110px;
        left: 0;
        right: 0;
        background: white;
        padding: 24px;
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.3s;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }

      .mobile-menu.active {
        transform: translateY(0);
        opacity: 1;
      }

      .mobile-menu a {
        display: block;
        padding: 14px 0;
        color: var(--text);
        text-decoration: none;
        font-weight: 500;
      }

      .hero {
        margin-top: 100px;
        padding: 40px 5% 80px;
      }

      .hero-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      .hero-content h1 {
        font-size: 44px;
      }

      .hero-tagline {
        font-size: 18px;
      }

      .social-proof {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .services-grid,
      .testimonials-grid,
      .process-steps {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .about-container {
        grid-template-columns: 1fr;
        gap: 48px;
      }

      .section-title {
        font-size: 38px;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 44px;
      }
    }
  </style>
</head>
<body>
  <div class="demo-banner" data-expires="${config.demo_expires}">
    <div class="demo-banner-content">
      <span>🍽️ This restaurant site is available - Claim before:</span>
      <div class="countdown">
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-days">0</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-hours">00</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-minutes">00</span>
          <span class="countdown-label">Min</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value" id="countdown-seconds">00</span>
          <span class="countdown-label">Sec</span>
        </div>
      </div>
      <a href="tel:${config.phone}" class="demo-cta">Claim Now</a>
    </div>
  </div>

  <nav class="navbar">
    <div class="navbar-content">
      <a href="#" class="logo">${config.business_name.split(' ')[0]}</a>
      <ul class="nav-links">
        <li><a href="#services">Menu</a></li>
        <li><a href="#about">Story</a></li>
        <li><a href="#testimonials">Reviews</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <a href="tel:${config.phone}" class="nav-cta">Reserve Table</a>
      <button class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="mobile-menu">
      <a href="#services">Menu</a>
      <a href="#about">Story</a>
      <a href="#testimonials">Reviews</a>
      <a href="#faq">FAQ</a>
      <a href="tel:${config.phone}">Reserve Table</a>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-grid">
      <div class="hero-content">
        <div class="hero-label animate-fade-up">FARM TO TABLE</div>
        <h1 class="animate-fade-up" style="transition-delay: 0.1s">${config.tagline || 'Where Every Ingredient Tells a Story'}</h1>
        <p class="hero-tagline animate-fade-up" style="transition-delay: 0.2s">${config.description || 'Seasonal menus crafted from the finest local ingredients. Simple preparations that let nature\'s flavors shine.'}</p>
        
        <div class="social-proof animate-fade-up" style="transition-delay: 0.3s">
          <div class="rating">
            <span class="stars">★★★★★</span>
            <span class="rating-text">${config.rating}</span>
          </div>
          <span class="review-count">${config.review_count}+ diners</span>
        </div>
        
        <a href="tel:${config.phone}" class="hero-cta animate-fade-up" style="transition-delay: 0.4s">Book a Table</a>
      </div>
      <div class="hero-image animate-scale-in" style="transition-delay: 0.2s">
        <img src="${photos[0]}" alt="${config.business_name}" loading="lazy">
      </div>
    </div>
  </section>

  <section id="services" class="services">
    <div class="services-container">
      <div class="section-header animate-fade-up">
        <div class="section-label">Our Offerings</div>
        <h2 class="section-title">Experiences We Create</h2>
        <p class="section-subtitle">From intimate dinners to celebrations, every experience is thoughtfully curated and lovingly prepared.</p>
      </div>
      <div class="services-grid">
        ${services.map((service, i) => `
          <div class="service-card animate-fade-up" style="transition-delay: ${i * 0.1}s">
            <h3>${service}</h3>
            <p>Crafted with passion, served with care. Each dish celebrates the season and the story behind it.</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section id="about" class="about">
    <div class="about-container">
      <div class="about-content">
        <h2 class="animate-fade-up">Rooted in Tradition, Inspired by Nature</h2>
        <p class="animate-fade-up" style="transition-delay: 0.1s">${config.description || 'Our kitchen is a celebration of the land and the people who tend it. We work directly with local farmers, foragers, and artisans to bring you ingredients at their peak.'}</p>
        <p class="animate-fade-up" style="transition-delay: 0.2s">Every plate that leaves our kitchen tells a story — of the seasons, the soil, the hands that grew it, and the passion we pour into every preparation. This is dining with intention, honesty, and soul.</p>
      </div>
      <div class="about-image animate-scale-in">
        <img src="${photos[1] || photos[0]}" alt="Our Kitchen" loading="lazy">
      </div>
    </div>
  </section>

  <section class="process">
    <div class="process-container">
      <div class="section-header animate-fade-up">
        <div class="section-label">Our Approach</div>
        <h2 class="section-title">From Field to Fork</h2>
      </div>
      <div class="process-steps">
        <div class="process-step animate-fade-up" style="transition-delay: 0.1s">
          <div class="step-number">1</div>
          <h3>Source</h3>
          <p>We partner with local farms and foragers for peak-season ingredients</p>
        </div>
        <div class="process-step animate-fade-up" style="transition-delay: 0.2s">
          <div class="step-number">2</div>
          <h3>Create</h3>
          <p>Our chefs craft menus that honor the ingredient and the season</p>
        </div>
        <div class="process-step animate-fade-up" style="transition-delay: 0.3s">
          <div class="step-number">3</div>
          <h3>Prepare</h3>
          <p>Simple techniques that elevate rather than mask natural flavors</p>
        </div>
        <div class="process-step animate-fade-up" style="transition-delay: 0.4s">
          <div class="step-number">4</div>
          <h3>Serve</h3>
          <p>Every dish plated with care, served with warmth and intention</p>
        </div>
      </div>
    </div>
  </section>

  <section id="testimonials" class="testimonials">
    <div class="testimonials-container">
      <div class="section-header animate-fade-up">
        <div class="section-label">What Diners Say</div>
        <h2 class="section-title">Voices from the Table</h2>
      </div>
      <div class="testimonials-grid">
        ${reviews.slice(0, 3).map((review, i) => `
          <div class="testimonial-card animate-fade-up" style="transition-delay: ${i * 0.1}s">
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"${review}"</p>
            <div class="testimonial-author">Verified Diner</div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section id="faq" class="faq">
    <div class="faq-container">
      <div class="section-header animate-fade-up">
        <div class="section-label">FAQ</div>
        <h2 class="section-title">Common Questions</h2>
      </div>
      <div class="faq-list">
        <div class="faq-item animate-fade-up">
          <div class="faq-question">Do you accommodate dietary restrictions?</div>
          <div class="faq-answer">Absolutely. Please let us know when you book, and our chef will create something special that honors your needs without compromise.</div>
        </div>
        <div class="faq-item animate-fade-up" style="transition-delay: 0.1s">
          <div class="faq-question">How often does your menu change?</div>
          <div class="faq-answer">Our menu evolves with the seasons and what's available from our farm partners. Some dishes rotate weekly as ingredients reach peak freshness.</div>
        </div>
        <div class="faq-item animate-fade-up" style="transition-delay: 0.2s">
          <div class="faq-question">Can I book a private event?</div>
          <div class="faq-answer">Yes, we offer private dining experiences and can host groups of various sizes. Contact us to discuss your vision and we'll craft something memorable.</div>
        </div>
        <div class="faq-item animate-fade-up" style="transition-delay: 0.3s">
          <div class="faq-question">What is your cancellation policy?</div>
          <div class="faq-answer">We ask for 24 hours notice for cancellations. Since we source fresh ingredients specifically for reservations, this helps minimize waste and respect our farmers.</div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-final">
    <h2 class="animate-fade-up">Ready to Experience Our Table?</h2>
    <p class="animate-fade-up" style="transition-delay: 0.1s">Reserve your seat and discover food that honors the land, the season, and the craft.</p>
    <a href="tel:${config.phone}" class="cta-button animate-fade-up" style="transition-delay: 0.2s">Make Reservation</a>
  </section>

  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <h3>${config.business_name}</h3>
        <p>${config.tagline || 'Seasonal dining with soul'}</p>
      </div>
      <div class="footer-section">
        <h4>Menu</h4>
        <ul>
          ${services.slice(0, 4).map(s => `<li><a href="#services">${s}</a></li>`).join('')}
        </ul>
      </div>
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#about">Our Story</a></li>
          <li><a href="#testimonials">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="tel:${config.phone}">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:${config.phone}">${config.phone}</a></li>
          <li><a href="mailto:${config.email}">${config.email}</a></li>
          <li>${config.address}</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      © ${new Date().getFullYear()} ${config.business_name}. All rights reserved.
    </div>
  </footer>

  <script>
    ${getAnimationScript()}
  </script>
</body>
</html>`;
}

// ============================================================================
// TEMPLATE 4: SALON - "Soft Luxury"
// ============================================================================

function salonTemplate(config) {
  const photos = config.photos || ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800'];
  const services = config.services || ['Precision Cuts', 'Color Services', 'Balayage & Highlights', 'Keratin Treatments', 'Styling & Updo', 'Hair Extensions'];
  const reviews = config.reviews || ['Pure luxury from start to finish. My stylist understood exactly what I wanted and delivered perfection.', 'The atmosphere is serene, the team is talented, and the results speak for themselves. I\'ll never go anywhere else.', 'Finally found a salon that truly listens. Every visit feels like self-care, and I always leave feeling beautiful.'];
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.business_name} - ${config.tagline || 'Luxury Hair & Beauty'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg: #FDFBF9;
      --accent: #9B2335;
      --secondary: #D4A574;
      --text: #2D2A26;
      --text-light: #8B8680;
      --card-bg: #FFFFFF;
    }

    body {
      font-family: 'Instrument Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'DM Serif Display', serif;
      font-weight: 400;
      line-height: 1.2;
    }

    /* Demo Banner */
    .demo-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #9B2335 0%, #7C1C2A 100%);
      color: #FDFBF9;
      padding: 12px 20px;
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 24px;
      font-size: 13px;
      box-shadow: 0 4px 20px rgba(155, 35, 53, 0.15);
    }

    .demo-banner-content {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .countdown {
      display: flex;
      gap: 12px;
      font-weight: 600;
    }

    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 40px;
    }

    .countdown-value {
      font-size: 20px;
      font-weight: 700;
    }

    .countdown-label {
      font-size: 10px;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .demo-cta {
      background: white;
      color: #9B2335;
      padding: 8px 20px;
      border-radius: 20px;
      text-decoration: none;
      font-weight: 600;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .demo-cta:hover {
      transform: translateY(-2px);
    }

    /* Navbar */
    .navbar {
      position: fixed;
      top: 48px;
      left: 0;
      right: 0;
      background: transparent;
      padding: 24px 5%;
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .navbar.scrolled {
      background: rgba(253, 251, 249, 0.95);
      backdrop-filter: blur(16px);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      padding: 18px 5%;
    }

    .navbar-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-family: 'DM Serif Display', serif;
      font-size: 26px;
      font-weight: 400;
      color: var(--text);
      text-decoration: none;
      font-style: italic;
    }

    .nav-links {
      display: flex;
      gap: 40px;
      list-style: none;
    }

    .nav-links a {
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
      transition: color 0.2s;
      letter-spacing: 0.3px;
    }

    .nav-links a:hover {
      color: var(--accent);
    }

    .nav-cta {
      background: var(--accent);
      color: white;
      padding: 12px 28px;
      border-radius: 24px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.3px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-cta:hover {
      background: #7C1C2A;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(155, 35, 53, 0.2);
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
    }

    .menu-toggle span {
      width: 24px;
      height: 2px;
      background: var(--text);
      transition: all 0.3s;
    }

    .mobile-menu {
      display: none;
    }

    /* Hero */
    .hero {
      margin-top: 140px;
      padding: 80px 5% 120px;
      text-align: center;
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-label {
      color: var(--accent);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 11px;
      margin-bottom: 24px;
    }

    .hero h1 {
      font-size: 80px;
      margin-bottom: 32px;
      font-style: italic;
      color: var(--text);
    }

    .hero-tagline {
      font-size: 22px;
      color: var(--text-light);
      margin-bottom: 48px;
      line-height: 1.6;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .social-proof {
      display: inline-flex;
      align-items: center;
      gap: 32px;
      margin-bottom: 48px;
      padding: 20px 40px;
      background: white;
      border-radius: 40px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .stars {
      color: var(--secondary);
      font-size: 16px;
    }

    .rating-text {
      font-weight: 700;
      font-size: 18px;
    }

    .divider {
      width: 1px;
      height: 24px;
      background: #E6E3E0;
    }

    .review-count {
      color: var(--text-light);
      font-size: 14px;
    }

    .hero-cta {
      display: inline-block;
      background: var(--accent);
      color: white;
      padding: 18px 48px;
      border-radius: 32px;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      letter-spacing: 0.3px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-cta:hover {
      background: #7C1C2A;
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(155, 35, 53, 0.25);
    }

    .hero-image {
      margin-top: 80px;
      border-radius: 16px;
      overflow: hidden;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      aspect-ratio: 16/10;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    }

    .hero-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-image:hover img {
      transform: scale(1.05);
    }

    /* Services */
    .services {
      padding: 140px 5%;
      background: white;
    }

    .services-container {
      max-width: 900px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 80px;
    }

    .section-label {
      color: var(--accent);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 11px;
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 56px;
      margin-bottom: 20px;
      font-style: italic;
    }

    .section-subtitle {
      color: var(--text-light);
      font-size: 17px;
      line-height: 1.7;
      max-width: 600px;
      margin: 0 auto;
    }

    .services-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .service-item {
      padding: 40px 0;
      border-bottom: 1px solid #E6E3E0;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-item:hover {
      padding-left: 20px;
    }

    .service-item:hover .service-name {
      color: var(--accent);
    }

    .service-name {
      font-size: 32px;
      font-family: 'DM Serif Display', serif;
      font-style: italic;
      color: var(--text);
      transition: color 0.3s;
    }

    .service-desc {
      margin-top: 12px;
      color: var(--text-light);
      font-size: 15px;
      line-height: 1.7;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-item:hover .service-desc {
      max-height: 100px;
    }

    /* About */
    .about {
      padding: 140px 5%;
      background: var(--bg);
    }

    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 100px;
      align-items: center;
    }

    .about-content h2 {
      font-size: 52px;
      margin-bottom: 28px;
      font-style: italic;
    }

    .about-content p {
      color: var(--text-light);
      font-size: 17px;
      line-height: 1.8;
      margin-bottom: 24px;
    }

    .about-image {
      border-radius: 16px;
      overflow: hidden;
      aspect-ratio: 4/5;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
    }

    .about-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .about-image:hover img {
      transform: scale(1.05);
    }

    /* Process */
    .process {
      padding: 140px 5%;
      background: white;
    }

    .process-container {
      max-width: 1100px;
      margin: 0 auto;
    }

    .process-steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 60px;
      margin-top: 80px;
    }

    .process-step {
      text-align: center;
    }

    .step-number {
      width: 56px;
      height: 56px;
      background: var(--bg);
      color: var(--accent);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
      margin: 0 auto 24px;
      border: 2px solid var(--accent);
      font-family: 'DM Serif Display', serif;
    }

    .process-step h3 {
      font-size: 24px;
      margin-bottom: 14px;
      font-style: italic;
    }

    .process-step p {
      color: var(--text-light);
      font-size: 15px;
      line-height: 1.6;
    }

    /* Testimonials */
    .testimonials {
      padding: 140px 5%;
      background: var(--bg);
    }

    .testimonials-container {
      max-width: 1300px;
      margin: 0 auto;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 36px;
    }

    .testimonial-card {
      background: white;
      padding: 48px;
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    }

    .testimonial-stars {
      color: var(--secondary);
      font-size: 15px;
      margin-bottom: 24px;
    }

    .testimonial-text {
      color: var(--text);
      font-size: 16px;
      line-height: 1.7;
      margin-bottom: 28px;
    }

    .testimonial-author {
      font-weight: 600;
      color: var(--text);
      font-size: 14px;
    }
    .testimonial-role {
      color: var(--text-light);
      font-size: 13px;
      margin-top: 4px;
    }

    /* FAQ */
    .faq { padding: 140px 5%; background: white; }
    .faq-container { max-width: 800px; margin: 0 auto; }
    .faq-item { border-bottom: 1px solid #E6E3E0; }
    .faq-question {
      padding: 28px 0; display: flex; justify-content: space-between; align-items: center;
      cursor: pointer; font-size: 18px; font-weight: 500; color: var(--text); transition: color 0.2s;
    }
    .faq-question:hover { color: var(--accent); }
    .faq-icon { font-size: 24px; transition: transform 0.3s; color: var(--secondary); }
    .faq-item.active .faq-icon { transform: rotate(45deg); }
    .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1); color: var(--text-light); font-size: 15px; line-height: 1.7; }
    .faq-item.active .faq-answer { max-height: 200px; padding-bottom: 28px; }

    /* CTA */
    .cta-section { padding: 140px 5%; background: var(--accent); text-align: center; color: white; }
    .cta-section h2 { font-size: 56px; font-style: italic; margin-bottom: 20px; }
    .cta-section p { font-size: 17px; opacity: 0.85; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
    .cta-white { display: inline-block; background: white; color: var(--accent); padding: 18px 48px; border-radius: 32px; text-decoration: none; font-weight: 600; font-size: 15px; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
    .cta-white:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.15); }

    /* Footer */
    .footer { padding: 60px 5%; background: #2D2A26; color: #8B8680; }
    .footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .footer-logo { font-family: 'DM Serif Display', serif; font-size: 22px; color: #FDFBF9; font-style: italic; }
    .footer-links { display: flex; gap: 32px; }
    .footer-links a { color: #8B8680; text-decoration: none; font-size: 14px; transition: color 0.2s; }
    .footer-links a:hover { color: #FDFBF9; }

    .animate-fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
    .animate-scale-in { opacity: 0; transform: scale(0.95); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    .animate-slide-left { opacity: 0; transform: translateX(-40px); transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
    .animate-slide-right { opacity: 0; transform: translateX(40px); transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
    .animate-fade-up.visible, .animate-scale-in.visible, .animate-slide-left.visible, .animate-slide-right.visible { opacity: 1; transform: none; }
    .stagger-1 { transition-delay: 0.1s; } .stagger-2 { transition-delay: 0.2s; } .stagger-3 { transition-delay: 0.3s; } .stagger-4 { transition-delay: 0.4s; }

    @media (max-width: 768px) {
      .navbar .nav-links, .navbar .nav-cta { display: none; }
      .menu-toggle { display: flex; }
      .mobile-menu.active { display: flex; flex-direction: column; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: var(--bg); z-index: 999; justify-content: center; align-items: center; gap: 32px; }
      .mobile-menu a { font-size: 24px; font-family: 'DM Serif Display', serif; font-style: italic; color: var(--text); text-decoration: none; }
      .hero h1 { font-size: 44px; }
      .section-title { font-size: 36px; }
      .about-container { grid-template-columns: 1fr; gap: 40px; }
      .process-steps { grid-template-columns: 1fr; gap: 40px; }
      .testimonials-grid { grid-template-columns: 1fr; }
      .footer-container { flex-direction: column; gap: 20px; text-align: center; }
    }
  </style>
</head>
<body>
  <div class="demo-banner" data-expires="${config.demo_expires}">
    <div class="demo-banner-content">
      <span>✨ Preview of your new website</span>
      <div class="countdown"><div class="countdown-item"><span class="countdown-value" id="countdown-days">0</span><span class="countdown-label">Days</span></div><div class="countdown-item"><span class="countdown-value" id="countdown-hours">00</span><span class="countdown-label">Hrs</span></div><div class="countdown-item"><span class="countdown-value" id="countdown-minutes">00</span><span class="countdown-label">Min</span></div><div class="countdown-item"><span class="countdown-value" id="countdown-seconds">00</span><span class="countdown-label">Sec</span></div></div>
      <a href="tel:+18507539920" class="demo-cta">Claim This Site</a>
    </div>
  </div>
  <nav class="navbar"><div class="navbar-content"><a href="#" class="logo">${config.business_name}</a><ul class="nav-links"><li><a href="#services">Services</a></li><li><a href="#about">About</a></li><li><a href="#testimonials">Reviews</a></li><li><a href="#faq">FAQ</a></li></ul><a href="tel:${config.phone || '#'}" class="nav-cta">Book Now</a><button class="menu-toggle"><span></span><span></span><span></span></button></div></nav>
  <div class="mobile-menu"><a href="#services">Services</a><a href="#about">About</a><a href="#testimonials">Reviews</a><a href="tel:${config.phone || '#'}">Book Now</a></div>

  <section class="hero">
    <p class="hero-label animate-fade-up">Welcome to ${config.business_name}</p>
    <h1 class="animate-fade-up stagger-1">${config.tagline || 'Where Beauty Meets Artistry'}</h1>
    <p class="hero-tagline animate-fade-up stagger-2">${config.description || 'A sanctuary for self-care. Expert stylists, luxurious treatments, and an experience that leaves you feeling radiant.'}</p>
    <div class="social-proof animate-fade-up stagger-3"><div class="rating"><span class="stars">${'★'.repeat(Math.floor(config.rating || 5))}</span><span class="rating-text">${config.rating || 5.0}</span></div><div class="divider"></div><span class="review-count">${config.review_count || 0}+ reviews</span></div>
    <a href="tel:${config.phone || '#'}" class="hero-cta animate-fade-up stagger-4">Book Your Visit</a>
    <div class="hero-image animate-scale-in"><img src="${photos[0]}" alt="${config.business_name}" loading="lazy"></div>
  </section>

  <section class="services" id="services"><div class="services-container"><div class="section-header"><p class="section-label animate-fade-up">Our Services</p><h2 class="section-title animate-fade-up stagger-1">Crafted for You</h2><p class="section-subtitle animate-fade-up stagger-2">Every service is a personalized experience, tailored to bring out your unique beauty.</p></div><div class="services-list">${services.map((s, i) => `<div class="service-item animate-fade-up stagger-${(i%4)+1}"><span class="service-name">${typeof s === 'string' ? s : s.name}</span><p class="service-desc">Expertly crafted to exceed your expectations.</p></div>`).join('')}</div></div></section>

  <section class="about" id="about"><div class="about-container"><div class="about-content animate-slide-left"><p class="section-label">Our Story</p><h2>${config.business_name}</h2><p>${config.description || 'We believe beauty is an art form. Our passionate stylists create personalized experiences that leave you feeling confident and radiant.'}</p></div><div class="about-image animate-slide-right"><img src="${photos[1] || photos[0]}" alt="About" loading="lazy"></div></div></section>

  <section class="process"><div class="process-container"><div class="section-header"><p class="section-label animate-fade-up">The Experience</p><h2 class="section-title animate-fade-up stagger-1">Your Visit</h2></div><div class="process-steps"><div class="process-step animate-fade-up stagger-1"><div class="step-number">1</div><h3>Book</h3><p>Schedule online or call. We'll match you with the perfect stylist.</p></div><div class="process-step animate-fade-up stagger-2"><div class="step-number">2</div><h3>Consult</h3><p>Your stylist listens to your vision and recommends the best approach.</p></div><div class="process-step animate-fade-up stagger-3"><div class="step-number">3</div><h3>Transform</h3><p>Sit back, relax, and leave feeling absolutely radiant.</p></div></div></div></section>

  <section class="testimonials" id="testimonials"><div class="testimonials-container"><div class="section-header"><p class="section-label animate-fade-up">Kind Words</p><h2 class="section-title animate-fade-up stagger-1">What Our Clients Say</h2></div><div class="testimonials-grid">${reviews.map((r, i) => `<div class="testimonial-card animate-fade-up stagger-${i+1}"><div class="testimonial-stars">★★★★★</div><p class="testimonial-text">"${r}"</p><div class="testimonial-author">Happy Client</div><div class="testimonial-role">Verified Review</div></div>`).join('')}</div></div></section>

  <section class="faq" id="faq"><div class="faq-container"><div class="section-header"><p class="section-label animate-fade-up">FAQ</p><h2 class="section-title animate-fade-up stagger-1">Common Questions</h2></div>
    <div class="faq-item animate-fade-up"><div class="faq-question"><span>Do I need an appointment?</span><span class="faq-icon">+</span></div><div class="faq-answer">We recommend booking to ensure full attention. Walk-ins welcome based on availability.</div></div>
    <div class="faq-item animate-fade-up stagger-1"><div class="faq-question"><span>What products do you use?</span><span class="faq-icon">+</span></div><div class="faq-answer">We use only premium, salon-grade products from trusted brands.</div></div>
    <div class="faq-item animate-fade-up stagger-2"><div class="faq-question"><span>How long does an appointment take?</span><span class="faq-icon">+</span></div><div class="faq-answer">Cuts take 45-60 min, color services 2-3 hours. We'll estimate when you book.</div></div>
    <div class="faq-item animate-fade-up stagger-3"><div class="faq-question"><span>Do you offer consultations?</span><span class="faq-icon">+</span></div><div class="faq-answer">Yes! Complimentary consultations for all new clients.</div></div>
  </div></section>

  <section class="cta-section"><h2 class="animate-fade-up">Ready to Feel Beautiful?</h2><p class="animate-fade-up stagger-1">Book your appointment today and experience the difference.</p><a href="tel:${config.phone || '#'}" class="cta-white animate-fade-up stagger-2">Book Your Visit</a></section>
  <footer class="footer"><div class="footer-container"><div><div class="footer-logo">${config.business_name}</div><p style="font-size:13px;margin-top:8px">${config.address || ''}</p></div><div class="footer-links"><a href="#services">Services</a><a href="#about">About</a><a href="#testimonials">Reviews</a>${config.phone ? `<a href="tel:${config.phone}">${config.phone}</a>` : ''}</div></div></footer>
  <script>${getAnimationScript()}</script>
</body></html>`;
}

// ============================================================================
// TEMPLATE 5: CONTRACTOR - "Built to Last"
// ============================================================================

function contractorTemplate(config) {
  const photos = config.photos || ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'];
  const services = config.services || ['Kitchen Remodeling', 'Bathroom Renovation', 'Room Additions', 'Roofing & Siding', 'Flooring Installation', 'Custom Decks & Patios'];
  const reviews = config.reviews || ['They transformed our outdated kitchen into a modern masterpiece. On time, on budget, and the craftsmanship is incredible.', 'Professional from day one. The crew was respectful, clean, and the results exceeded every expectation we had.', 'Best contractor we\'ve ever worked with. They handled permits, timeline, and quality like true pros.'];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${config.business_name} - ${config.tagline || 'Quality Construction & Renovation'}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0A0A0A;--bg2:#111111;--accent:#EA580C;--accent-glow:rgba(234,88,12,0.15);--text:#FAFAFA;--text-secondary:#A1A1A1;--text-muted:#666;--border:rgba(255,255,255,0.08);--border-hover:rgba(255,255,255,0.15)}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:9999}
h1,h2,h3{font-family:'Sora',sans-serif;font-weight:600;line-height:1.1;letter-spacing:-0.02em}

.demo-banner{position:fixed;top:0;left:0;right:0;background:#EA580C;color:white;padding:10px 20px;z-index:10000;display:flex;justify-content:center;align-items:center;gap:20px;font-size:13px;font-family:'Sora',sans-serif}
.demo-banner .countdown{display:flex;gap:8px;font-weight:600}
.demo-banner .countdown-item{display:flex;flex-direction:column;align-items:center;min-width:36px}
.demo-banner .countdown-value{font-size:18px;font-weight:700}
.demo-banner .countdown-label{font-size:9px;text-transform:uppercase;letter-spacing:0.5px;opacity:0.8}
.demo-cta{background:white;color:#EA580C;padding:7px 18px;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px;transition:transform 0.2s}
.demo-cta:hover{transform:translateY(-2px)}

.navbar{position:fixed;top:44px;left:0;right:0;background:transparent;padding:20px 5%;z-index:1000;transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}
.navbar.scrolled{background:rgba(10,10,10,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
.navbar-content{max-width:1400px;margin:0 auto;display:flex;justify-content:space-between;align-items:center}
.logo{font-family:'Sora',sans-serif;font-size:20px;font-weight:700;color:var(--text);text-decoration:none;letter-spacing:-0.5px}
.logo span{color:var(--accent)}
.nav-links{display:flex;gap:36px;list-style:none}
.nav-links a{color:var(--text-secondary);text-decoration:none;font-size:14px;font-weight:500;transition:color 0.2s}
.nav-links a:hover{color:var(--text)}
.nav-cta{background:var(--accent);color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-family:'Sora',sans-serif;font-weight:600;font-size:13px;letter-spacing:0.5px;text-transform:uppercase;transition:all 0.2s cubic-bezier(0.16,1,0.3,1)}
.nav-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px var(--accent-glow)}
.menu-toggle{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer}
.menu-toggle span{width:24px;height:2px;background:var(--text);transition:all 0.3s}
.mobile-menu{display:none}

.hero{margin-top:110px;padding:80px 5% 120px;position:relative}
.hero-container{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--accent-glow);border:1px solid rgba(234,88,12,0.3);padding:8px 16px;border-radius:6px;font-size:12px;font-weight:600;color:var(--accent);text-transform:uppercase;letter-spacing:1px;margin-bottom:24px;font-family:'Sora',sans-serif}
.hero h1{font-size:clamp(40px,5.5vw,72px);margin-bottom:24px;letter-spacing:-3px}
.hero h1 span{color:var(--accent)}
.hero-desc{font-size:18px;color:var(--text-secondary);margin-bottom:40px;line-height:1.7;max-width:520px}
.hero-stats{display:flex;gap:40px;margin-bottom:40px}
.stat{text-align:left}
.stat-number{font-family:'Sora',sans-serif;font-size:36px;font-weight:700;color:var(--accent);line-height:1}
.stat-label{font-size:13px;color:var(--text-muted);margin-top:4px;text-transform:uppercase;letter-spacing:0.5px}
.hero-buttons{display:flex;gap:12px}
.btn-primary{background:var(--accent);color:white;padding:16px 32px;border-radius:6px;text-decoration:none;font-family:'Sora',sans-serif;font-weight:600;font-size:14px;transition:all 0.2s cubic-bezier(0.16,1,0.3,1)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px var(--accent-glow)}
.btn-secondary{background:transparent;color:var(--text);border:1px solid var(--border);padding:16px 32px;border-radius:6px;text-decoration:none;font-family:'Sora',sans-serif;font-weight:500;font-size:14px;transition:all 0.2s}
.btn-secondary:hover{border-color:var(--border-hover)}
.hero-image{border-radius:12px;overflow:hidden;aspect-ratio:4/5;position:relative}
.hero-image img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s cubic-bezier(0.16,1,0.3,1)}
.hero-image:hover img{transform:scale(1.05)}
.hero-image::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,0.4),transparent);pointer-events:none}

.services{padding:120px 5%;background:var(--bg2)}
.services-container{max-width:1200px;margin:0 auto}
.section-label{font-family:'Sora',sans-serif;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:2px;color:var(--accent);margin-bottom:16px}
.section-title{font-size:clamp(32px,4vw,48px);margin-bottom:20px;letter-spacing:-2px}
.section-subtitle{color:var(--text-secondary);font-size:16px;max-width:600px;margin-bottom:60px}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border)}
.service-card{background:var(--bg2);padding:40px 32px;transition:all 0.3s cubic-bezier(0.16,1,0.3,1);position:relative;overflow:hidden}
.service-card::before{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--accent);transform:scaleX(0);transition:transform 0.3s cubic-bezier(0.16,1,0.3,1)}
.service-card:hover::before{transform:scaleX(1)}
.service-card:hover{background:rgba(234,88,12,0.05)}
.service-number{font-family:'Sora',sans-serif;font-size:48px;font-weight:700;color:rgba(255,255,255,0.05);margin-bottom:16px;line-height:1}
.service-card h3{font-size:20px;margin-bottom:10px;font-weight:500}
.service-card p{color:var(--text-secondary);font-size:14px;line-height:1.6}

.about{padding:120px 5%;background:var(--bg)}
.about-container{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.about-content p{color:var(--text-secondary);font-size:16px;line-height:1.8;margin-bottom:20px}
.about-image{border-radius:12px;overflow:hidden;aspect-ratio:4/3}
.about-image img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s cubic-bezier(0.16,1,0.3,1)}
.about-image:hover img{transform:scale(1.05)}

.process{padding:120px 5%;background:var(--bg2)}
.process-container{max-width:1100px;margin:0 auto}
.process-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;margin-top:60px}
.process-step{position:relative;padding-left:0}
.step-num{font-family:'Sora',sans-serif;font-size:72px;font-weight:700;color:rgba(234,88,12,0.15);line-height:1;margin-bottom:16px}
.process-step h3{font-size:18px;margin-bottom:10px;font-weight:600}
.process-step p{color:var(--text-secondary);font-size:14px;line-height:1.6}

.testimonials{padding:120px 5%;background:var(--bg)}
.testimonials-container{max-width:1200px;margin:0 auto}
.testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px}
.testimonial-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:40px;transition:border-color 0.3s}
.testimonial-card:hover{border-color:var(--border-hover)}
.testimonial-stars{color:var(--accent);font-size:14px;margin-bottom:20px}
.testimonial-text{color:var(--text-secondary);font-size:15px;line-height:1.7;margin-bottom:24px;font-style:italic}
.testimonial-author{font-weight:600;font-size:14px;color:var(--text)}
.testimonial-role{color:var(--text-muted);font-size:13px;margin-top:4px}

.faq{padding:120px 5%;background:var(--bg2)}
.faq-container{max-width:800px;margin:0 auto}
.faq-item{border-bottom:1px solid var(--border)}
.faq-question{padding:24px 0;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:17px;font-weight:500;color:var(--text);transition:color 0.2s;font-family:'Sora',sans-serif}
.faq-question:hover{color:var(--accent)}
.faq-icon{font-size:22px;transition:transform 0.3s;color:var(--accent)}
.faq-item.active .faq-icon{transform:rotate(45deg)}
.faq-answer{max-height:0;overflow:hidden;transition:max-height 0.4s cubic-bezier(0.16,1,0.3,1);color:var(--text-secondary);font-size:15px;line-height:1.7}
.faq-item.active .faq-answer{max-height:200px;padding-bottom:24px}

.cta-section{padding:120px 5%;background:var(--accent);text-align:center}
.cta-section h2{font-size:clamp(32px,4vw,48px);margin-bottom:16px;letter-spacing:-2px}
.cta-section p{font-size:16px;opacity:0.85;margin-bottom:36px;max-width:500px;margin-left:auto;margin-right:auto}
.btn-white{display:inline-block;background:white;color:#0A0A0A;padding:16px 36px;border-radius:6px;text-decoration:none;font-family:'Sora',sans-serif;font-weight:600;font-size:14px;transition:all 0.2s}
.btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.2)}

.footer{padding:48px 5%;background:var(--bg);border-top:1px solid var(--border)}
.footer-container{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center}
.footer-logo{font-family:'Sora',sans-serif;font-size:18px;font-weight:700;color:var(--text)}
.footer-logo span{color:var(--accent)}
.footer-links{display:flex;gap:28px}
.footer-links a{color:var(--text-muted);text-decoration:none;font-size:14px;transition:color 0.2s}
.footer-links a:hover{color:var(--text)}

.animate-fade-up{opacity:0;transform:translateY(30px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)}
.animate-scale-in{opacity:0;transform:scale(0.95);transition:all 0.8s cubic-bezier(0.16,1,0.3,1)}
.animate-slide-left{opacity:0;transform:translateX(-40px);transition:all 0.7s cubic-bezier(0.16,1,0.3,1)}
.animate-slide-right{opacity:0;transform:translateX(40px);transition:all 0.7s cubic-bezier(0.16,1,0.3,1)}
.animate-fade-up.visible,.animate-scale-in.visible,.animate-slide-left.visible,.animate-slide-right.visible{opacity:1;transform:none}
.stagger-1{transition-delay:0.1s}.stagger-2{transition-delay:0.2s}.stagger-3{transition-delay:0.3s}.stagger-4{transition-delay:0.4s}

@media(max-width:768px){
  .navbar .nav-links,.navbar .nav-cta{display:none}
  .menu-toggle{display:flex}
  .mobile-menu.active{display:flex;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:var(--bg);z-index:999;justify-content:center;align-items:center;gap:28px}
  .mobile-menu a{font-family:'Sora',sans-serif;font-size:20px;font-weight:500;color:var(--text);text-decoration:none}
  .hero-container{grid-template-columns:1fr}
  .hero-stats{flex-wrap:wrap;gap:24px}
  .services-grid{grid-template-columns:1fr}
  .about-container{grid-template-columns:1fr;gap:40px}
  .process-steps{grid-template-columns:1fr 1fr;gap:32px}
  .testimonials-grid{grid-template-columns:1fr}
  .footer-container{flex-direction:column;gap:20px;text-align:center}
}
</style>
</head>
<body>
<div class="demo-banner" data-expires="${config.demo_expires}">
  <span>🔨 Preview of your new website</span>
  <div class="countdown"><div class="countdown-item"><span class="countdown-value" id="countdown-days">0</span><span class="countdown-label">Days</span></div><div class="countdown-item"><span class="countdown-value" id="countdown-hours">00</span><span class="countdown-label">Hrs</span></div><div class="countdown-item"><span class="countdown-value" id="countdown-minutes">00</span><span class="countdown-label">Min</span></div><div class="countdown-item"><span class="countdown-value" id="countdown-seconds">00</span><span class="countdown-label">Sec</span></div></div>
  <a href="tel:+18507539920" class="demo-cta">Claim This Site</a>
</div>

<nav class="navbar"><div class="navbar-content"><a href="#" class="logo">${config.business_name.split(' ')[0]}<span>.</span></a><ul class="nav-links"><li><a href="#services">Services</a></li><li><a href="#about">About</a></li><li><a href="#testimonials">Reviews</a></li><li><a href="#faq">FAQ</a></li></ul><a href="tel:${config.phone || '#'}" class="nav-cta">Get Quote</a><button class="menu-toggle"><span></span><span></span><span></span></button></div></nav>
<div class="mobile-menu"><a href="#services">Services</a><a href="#about">About</a><a href="#testimonials">Reviews</a><a href="tel:${config.phone || '#'}">Get Quote</a></div>

<section class="hero">
  <div class="hero-container">
    <div>
      <div class="hero-badge animate-fade-up">Licensed & Insured</div>
      <h1 class="animate-fade-up stagger-1">${config.tagline || 'We Build<span> What Matters</span>'}</h1>
      <p class="hero-desc animate-fade-up stagger-2">${config.description || 'From concept to completion. Quality craftsmanship, transparent pricing, and a team that treats your project like their own.'}</p>
      <div class="hero-stats animate-fade-up stagger-3">
        <div class="stat"><div class="stat-number">15+</div><div class="stat-label">Years Experience</div></div>
        <div class="stat"><div class="stat-number">500+</div><div class="stat-label">Projects Done</div></div>
        <div class="stat"><div class="stat-number">${config.rating || 5.0}</div><div class="stat-label">Star Rating</div></div>
      </div>
      <div class="hero-buttons animate-fade-up stagger-4">
        <a href="tel:${config.phone || '#'}" class="btn-primary">Get Free Quote</a>
        ${config.maps_url ? `<a href="${config.maps_url}" class="btn-secondary">Our Projects</a>` : ''}
      </div>
    </div>
    <div class="hero-image animate-scale-in"><img src="${photos[0]}" alt="${config.business_name}" loading="lazy"></div>
  </div>
</section>

<section class="services" id="services"><div class="services-container"><p class="section-label animate-fade-up">What We Do</p><h2 class="section-title animate-fade-up stagger-1">Our Services</h2><p class="section-subtitle animate-fade-up stagger-2">Expert craftsmanship across every trade. One team, one vision, exceptional results.</p>
<div class="services-grid">${services.map((s, i) => `<div class="service-card animate-fade-up stagger-${(i%4)+1}"><div class="service-number">0${i+1}</div><h3>${typeof s === 'string' ? s : s.name}</h3><p>Professional-grade work with premium materials and attention to detail.</p></div>`).join('')}</div></div></section>

<section class="about" id="about"><div class="about-container"><div class="about-image animate-slide-left"><img src="${photos[1] || photos[0]}" alt="About" loading="lazy"></div><div class="about-content animate-slide-right"><p class="section-label">About Us</p><h2 class="section-title">${config.business_name}</h2><p>${config.description || 'Built on integrity, driven by craftsmanship. We bring decades of experience to every project, large or small.'}</p><p>Our team of licensed professionals handles everything from planning and permits to the final walkthrough. Your satisfaction is guaranteed.</p></div></div></section>

<section class="process"><div class="process-container"><p class="section-label animate-fade-up">How It Works</p><h2 class="section-title animate-fade-up stagger-1">Our Process</h2>
<div class="process-steps">
  <div class="process-step animate-fade-up stagger-1"><div class="step-num">01</div><h3>Consultation</h3><p>Free on-site assessment. We listen to your vision and evaluate the scope.</p></div>
  <div class="process-step animate-fade-up stagger-2"><div class="step-num">02</div><h3>Proposal</h3><p>Detailed quote with timeline, materials, and transparent pricing. No surprises.</p></div>
  <div class="process-step animate-fade-up stagger-3"><div class="step-num">03</div><h3>Build</h3><p>Our crew gets to work. Daily updates, clean site, quality at every stage.</p></div>
  <div class="process-step animate-fade-up stagger-4"><div class="step-num">04</div><h3>Deliver</h3><p>Final walkthrough together. We don't finish until you're completely satisfied.</p></div>
</div></div></section>

<section class="testimonials" id="testimonials"><div class="testimonials-container"><p class="section-label animate-fade-up">Testimonials</p><h2 class="section-title animate-fade-up stagger-1">What Our Clients Say</h2>
<div class="testimonials-grid">${reviews.map((r, i) => `<div class="testimonial-card animate-fade-up stagger-${i+1}"><div class="testimonial-stars">★★★★★</div><p class="testimonial-text">"${r}"</p><div class="testimonial-author">Verified Homeowner</div></div>`).join('')}</div></div></section>

<section class="faq" id="faq"><div class="faq-container"><p class="section-label animate-fade-up">FAQ</p><h2 class="section-title animate-fade-up stagger-1">Common Questions</h2>
  <div class="faq-item animate-fade-up"><div class="faq-question"><span>Are you licensed and insured?</span><span class="faq-icon">+</span></div><div class="faq-answer">Yes. Fully licensed, bonded, and insured. We carry comprehensive liability and workers' comp coverage for your protection.</div></div>
  <div class="faq-item animate-fade-up stagger-1"><div class="faq-question"><span>How long does a typical project take?</span><span class="faq-icon">+</span></div><div class="faq-answer">It depends on scope. A bathroom remodel takes 2-3 weeks, kitchen 4-6 weeks, additions 2-3 months. We provide a detailed timeline upfront.</div></div>
  <div class="faq-item animate-fade-up stagger-2"><div class="faq-question"><span>Do you handle permits?</span><span class="faq-icon">+</span></div><div class="faq-answer">Absolutely. We handle all necessary permits and inspections so you don't have to worry about it.</div></div>
  <div class="faq-item animate-fade-up stagger-3"><div class="faq-question"><span>What's your payment structure?</span><span class="faq-icon">+</span></div><div class="faq-answer">Typically a deposit to begin, progress payments at milestones, and final payment on completion. No payment in full upfront, ever.</div></div>
</div></section>

<section class="cta-section"><h2 class="animate-fade-up">Ready to Build?</h2><p class="animate-fade-up stagger-1">Get a free, no-obligation quote for your project today.</p><a href="tel:${config.phone || '#'}" class="btn-white animate-fade-up stagger-2">Get Free Quote</a></section>
<footer class="footer"><div class="footer-container"><div><div class="footer-logo">${config.business_name.split(' ')[0]}<span>.</span></div><p style="font-size:13px;color:var(--text-muted);margin-top:6px">${config.address || ''}</p></div><div class="footer-links"><a href="#services">Services</a><a href="#about">About</a><a href="#testimonials">Reviews</a>${config.phone ? `<a href="tel:${config.phone}">${config.phone}</a>` : ''}</div></div></footer>
<script>${getAnimationScript()}</script>
</body></html>`;
}

// ============================================================================
// TEMPLATE 6: AUTO REPAIR - "Precision Garage"
// ============================================================================

function autoRepairTemplate(config) {
  const photos = config.photos || ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800', 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800'];
  const services = config.services || ['Oil Change & Fluids', 'Brake Service', 'Engine Diagnostics', 'Transmission Repair', 'AC & Heating', 'Tire Service & Alignment'];
  const reviews = config.reviews || ['Honest mechanics are hard to find. These guys diagnosed the issue in 20 minutes and didn\'t try to upsell me on anything I didn\'t need.', 'Fast, fair, and thorough. They showed me exactly what was wrong, explained my options, and had me back on the road same day.', 'Been bringing both our cars here for two years. Consistent quality, fair prices, and they always go the extra mile.'];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${config.business_name} - ${config.tagline || 'Expert Auto Repair & Service'}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Work+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#111111;--bg2:#1A1A1A;--bg3:#222;--accent:#DC2626;--accent-glow:rgba(220,38,38,0.12);--blue:#3B82F6;--text:#E5E5E5;--text-secondary:#999;--text-muted:#666;--border:rgba(255,255,255,0.06);--border-hover:rgba(255,255,255,0.12)}
body{font-family:'Work Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:9999}
h1,h2,h3{font-family:'Manrope',sans-serif;font-weight:700;line-height:1.1}

.demo-banner{position:fixed;top:0;left:0;right:0;background:#DC2626;color:white;padding:10px 20px;z-index:10000;display:flex;justify-content:center;align-items:center;gap:20px;font-size:13px;font-family:'Manrope',sans-serif}
.demo-banner .countdown{display:flex;gap:8px;font-weight:700}
.demo-banner .countdown-item{display:flex;flex-direction:column;align-items:center;min-width:36px}
.demo-banner .countdown-value{font-size:18px;font-weight:800}
.demo-banner .countdown-label{font-size:9px;text-transform:uppercase;letter-spacing:0.5px;opacity:0.8}
.demo-cta{background:white;color:#DC2626;padding:7px 18px;border-radius:4px;text-decoration:none;font-weight:700;font-size:13px;transition:transform 0.2s}
.demo-cta:hover{transform:translateY(-2px)}

.navbar{position:fixed;top:44px;left:0;right:0;background:transparent;padding:20px 5%;z-index:1000;transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}
.navbar.scrolled{background:rgba(17,17,17,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
.navbar-content{max-width:1400px;margin:0 auto;display:flex;justify-content:space-between;align-items:center}
.logo{font-family:'Manrope',sans-serif;font-size:22px;font-weight:800;color:white;text-decoration:none;text-transform:uppercase;letter-spacing:2px}
.logo span{color:var(--accent)}
.nav-links{display:flex;gap:32px;list-style:none}
.nav-links a{color:var(--text-secondary);text-decoration:none;font-size:14px;font-weight:500;transition:color 0.2s;text-transform:uppercase;letter-spacing:0.5px}
.nav-links a:hover{color:var(--text)}
.nav-cta{background:var(--accent);color:white;padding:12px 24px;border-radius:4px;text-decoration:none;font-family:'Manrope',sans-serif;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:1px;transition:all 0.2s cubic-bezier(0.16,1,0.3,1)}
.nav-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px var(--accent-glow)}
.menu-toggle{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer}
.menu-toggle span{width:24px;height:2px;background:var(--text);transition:all 0.3s}
.mobile-menu{display:none}

.hero{margin-top:110px;padding:80px 5% 100px}
.hero-container{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1.2fr 1fr;gap:60px;align-items:center}
.hero-overline{color:var(--accent);font-family:'Manrope',sans-serif;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px}
.hero h1{font-size:clamp(36px,5vw,64px);margin-bottom:24px;letter-spacing:-2px}
.hero h1 span{color:var(--accent)}
.hero-desc{font-size:17px;color:var(--text-secondary);margin-bottom:36px;line-height:1.7;max-width:500px}
.hero-trust{display:flex;gap:24px;align-items:center;margin-bottom:36px;flex-wrap:wrap}
.trust-badge{display:flex;align-items:center;gap:8px;background:var(--bg2);border:1px solid var(--border);padding:10px 16px;border-radius:8px;font-size:13px;font-weight:500;color:var(--text-secondary)}
.trust-badge strong{color:var(--text);font-weight:700}
.hero-buttons{display:flex;gap:12px}
.btn-primary{background:var(--accent);color:white;padding:16px 32px;border-radius:4px;text-decoration:none;font-family:'Manrope',sans-serif;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;transition:all 0.2s cubic-bezier(0.16,1,0.3,1)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px var(--accent-glow)}
.btn-secondary{background:transparent;color:var(--text);border:1px solid var(--border);padding:16px 32px;border-radius:4px;text-decoration:none;font-family:'Manrope',sans-serif;font-weight:600;font-size:14px;transition:all 0.2s}
.btn-secondary:hover{border-color:var(--border-hover)}
.hero-image{border-radius:8px;overflow:hidden;aspect-ratio:4/3;position:relative}
.hero-image img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s cubic-bezier(0.16,1,0.3,1)}
.hero-image:hover img{transform:scale(1.05)}

.services{padding:100px 5%;background:var(--bg2)}
.services-container{max-width:1200px;margin:0 auto}
.section-label{font-family:'Manrope',sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:var(--accent);margin-bottom:16px}
.section-title{font-size:clamp(28px,3.5vw,42px);margin-bottom:16px;letter-spacing:-1px}
.section-subtitle{color:var(--text-secondary);font-size:16px;max-width:550px;margin-bottom:60px}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.service-card{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:32px 24px;transition:all 0.3s cubic-bezier(0.16,1,0.3,1);position:relative}
.service-card:hover{border-color:var(--accent);background:rgba(220,38,38,0.04)}
.service-icon{width:48px;height:48px;background:var(--accent-glow);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:20px}
.service-card h3{font-size:17px;margin-bottom:8px;font-weight:600}
.service-card p{color:var(--text-secondary);font-size:14px;line-height:1.6}

.about{padding:100px 5%;background:var(--bg)}
.about-container{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.about-content p{color:var(--text-secondary);font-size:16px;line-height:1.8;margin-bottom:20px}
.about-image{border-radius:8px;overflow:hidden;aspect-ratio:4/3}
.about-image img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s cubic-bezier(0.16,1,0.3,1)}
.about-image:hover img{transform:scale(1.05)}

.process{padding:100px 5%;background:var(--bg2)}
.process-container{max-width:1000px;margin:0 auto}
.process-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;margin-top:60px}
.process-step{text-align:center}
.step-circle{width:56px;height:56px;background:var(--accent-glow);border:2px solid var(--accent);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Manrope',sans-serif;font-size:20px;font-weight:800;color:var(--accent);margin:0 auto 16px}
.process-step h3{font-size:16px;margin-bottom:8px;font-weight:600}
.process-step p{color:var(--text-secondary);font-size:13px;line-height:1.6}

.testimonials{padding:100px 5%;background:var(--bg)}
.testimonials-container{max-width:1200px;margin:0 auto}
.testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:60px}
.testimonial-card{background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:32px;transition:border-color 0.3s}
.testimonial-card:hover{border-color:var(--accent)}
.testimonial-stars{color:var(--accent);font-size:14px;margin-bottom:16px}
.testimonial-text{color:var(--text-secondary);font-size:14px;line-height:1.7;margin-bottom:20px}
.testimonial-author{font-weight:600;font-size:14px;color:var(--text)}

.faq{padding:100px 5%;background:var(--bg2)}
.faq-container{max-width:800px;margin:0 auto}
.faq-item{border-bottom:1px solid var(--border)}
.faq-question{padding:22px 0;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:16px;font-weight:600;color:var(--text);transition:color 0.2s;font-family:'Manrope',sans-serif}
.faq-question:hover{color:var(--accent)}
.faq-icon{font-size:22px;transition:transform 0.3s;color:var(--accent)}
.faq-item.active .faq-icon{transform:rotate(45deg)}
.faq-answer{max-height:0;overflow:hidden;transition:max-height 0.4s cubic-bezier(0.16,1,0.3,1);color:var(--text-secondary);font-size:14px;line-height:1.7}
.faq-item.active .faq-answer{max-height:200px;padding-bottom:22px}

.cta-section{padding:100px 5%;background:var(--accent);text-align:center}
.cta-section h2{font-size:clamp(28px,3.5vw,42px);margin-bottom:16px;letter-spacing:-1px}
.cta-section p{font-size:16px;opacity:0.85;margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto}
.btn-white{display:inline-block;background:white;color:#111;padding:16px 36px;border-radius:4px;text-decoration:none;font-family:'Manrope',sans-serif;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;transition:all 0.2s}
.btn-white:hover{transform:translateY(-2px)}

.footer{padding:48px 5%;background:var(--bg);border-top:1px solid var(--border)}
.footer-container{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center}
.footer-logo{font-family:'Manrope',sans-serif;font-size:18px;font-weight:800;color:white;text-transform:uppercase;letter-spacing:1px}
.footer-logo span{color:var(--accent)}
.footer-links{display:flex;gap:24px}
.footer-links a{color:var(--text-muted);text-decoration:none;font-size:13px;transition:color 0.2s;text-transform:uppercase;letter-spacing:0.5px}
.footer-links a:hover{color:var(--text)}

.animate-fade-up{opacity:0;transform:translateY(30px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)}
.animate-scale-in{opacity:0;transform:scale(0.95);transition:all 0.8s cubic-bezier(0.16,1,0.3,1)}
.animate-slide-left{opacity:0;transform:translateX(-40px);transition:all 0.7s cubic-bezier(0.16,1,0.3,1)}
.animate-slide-right{opacity:0;transform:translateX(40px);transition:all 0.7s cubic-bezier(0.16,1,0.3,1)}
.animate-fade-up.visible,.animate-scale-in.visible,.animate-slide-left.visible,.animate-slide-right.visible{opacity:1;transform:none}
.stagger-1{transition-delay:0.1s}.stagger-2{transition-delay:0.2s}.stagger-3{transition-delay:0.3s}.stagger-4{transition-delay:0.4s}

@media(max-width:768px){
  .navbar .nav-links,.navbar .nav-cta{display:none}
  .menu-toggle{display:flex}
  .mobile-menu.active{display:flex;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:var(--bg);z-index:999;justify-content:center;align-items:center;gap:28px}
  .mobile-menu a{font-family:'Manrope',sans-serif;font-size:18px;font-weight:600;color:var(--text);text-decoration:none;text-transform:uppercase}
  .hero-container{grid-template-columns:1fr}
  .hero-trust{flex-direction:column;align-items:flex-start}
  .services-grid{grid-template-columns:1fr}
  .about-container{grid-template-columns:1fr;gap:40px}
  .process-steps{grid-template-columns:1fr 1fr;gap:24px}
  .testimonials-grid{grid-template-columns:1fr}
  .footer-container{flex-direction:column;gap:20px;text-align:center}
}
</style>
</head>
<body>
<div class="demo-banner" data-expires="${config.demo_expires}">
  <span>🔧 Preview of your new website</span>
  <div class="countdown"><div class="countdown-item"><span class="countdown-value" id="countdown-days">0</span><span class="countdown-label">Days</span></div><div class="countdown-item"><span class="countdown-value" id="countdown-hours">00</span><span class="countdown-label">Hrs</span></div><div class="countdown-item"><span class="countdown-value" id="countdown-minutes">00</span><span class="countdown-label">Min</span></div><div class="countdown-item"><span class="countdown-value" id="countdown-seconds">00</span><span class="countdown-label">Sec</span></div></div>
  <a href="tel:+18507539920" class="demo-cta">Claim This Site</a>
</div>

<nav class="navbar"><div class="navbar-content"><a href="#" class="logo">${config.business_name.split(' ').slice(0,2).join(' ')}<span>.</span></a><ul class="nav-links"><li><a href="#services">Services</a></li><li><a href="#about">About</a></li><li><a href="#testimonials">Reviews</a></li><li><a href="#faq">FAQ</a></li></ul><a href="tel:${config.phone || '#'}" class="nav-cta">Schedule</a><button class="menu-toggle"><span></span><span></span><span></span></button></div></nav>
<div class="mobile-menu"><a href="#services">Services</a><a href="#about">About</a><a href="#testimonials">Reviews</a><a href="tel:${config.phone || '#'}">Schedule</a></div>

<section class="hero">
  <div class="hero-container">
    <div>
      <p class="hero-overline animate-fade-up">Trusted Auto Care</p>
      <h1 class="animate-fade-up stagger-1">${config.tagline || 'Precision Service.<span> Honest Prices.</span>'}</h1>
      <p class="hero-desc animate-fade-up stagger-2">${config.description || 'Factory-trained technicians, state-of-the-art diagnostics, and a commitment to getting it right the first time. Your car deserves the best.'}</p>
      <div class="hero-trust animate-fade-up stagger-3">
        <div class="trust-badge">★ <strong>${config.rating || 5.0}</strong> Rating</div>
        <div class="trust-badge"><strong>${config.review_count || 0}+</strong> Reviews</div>
        <div class="trust-badge">ASE Certified</div>
      </div>
      <div class="hero-buttons animate-fade-up stagger-4">
        <a href="tel:${config.phone || '#'}" class="btn-primary">Schedule Service</a>
        ${config.maps_url ? `<a href="${config.maps_url}" class="btn-secondary">Get Directions</a>` : ''}
      </div>
    </div>
    <div class="hero-image animate-scale-in"><img src="${photos[0]}" alt="${config.business_name}" loading="lazy"></div>
  </div>
</section>

<section class="services" id="services"><div class="services-container"><p class="section-label animate-fade-up">Services</p><h2 class="section-title animate-fade-up stagger-1">What We Fix</h2><p class="section-subtitle animate-fade-up stagger-2">Comprehensive auto care. From routine maintenance to complex repairs.</p>
<div class="services-grid">${services.map((s, i) => {
  const icons = ['🔧','🛞','⚡','⚙️','❄️','🔩'];
  return `<div class="service-card animate-fade-up stagger-${(i%4)+1}"><div class="service-icon">${icons[i] || '🔧'}</div><h3>${typeof s === 'string' ? s : s.name}</h3><p>Expert diagnosis and repair with quality OEM and aftermarket parts.</p></div>`;
}).join('')}</div></div></section>

<section class="about" id="about"><div class="about-container"><div class="about-content animate-slide-left"><p class="section-label">About</p><h2 class="section-title">${config.business_name}</h2><p>${config.description || 'We\'re not just mechanics — we\'re car people. Our shop is built on honesty, expertise, and a genuine love for keeping vehicles running at their best.'}</p><p>Every technician is factory-trained and ASE certified. We explain what's wrong, give you options, and never push services you don't need.</p></div><div class="about-image animate-slide-right"><img src="${photos[1] || photos[0]}" alt="About" loading="lazy"></div></div></section>

<section class="process"><div class="process-container"><p class="section-label animate-fade-up">How It Works</p><h2 class="section-title animate-fade-up stagger-1">Simple Process</h2>
<div class="process-steps">
  <div class="process-step animate-fade-up stagger-1"><div class="step-circle">1</div><h3>Schedule</h3><p>Call or book online. Drop off or wait.</p></div>
  <div class="process-step animate-fade-up stagger-2"><div class="step-circle">2</div><h3>Diagnose</h3><p>Full inspection with transparent findings.</p></div>
  <div class="process-step animate-fade-up stagger-3"><div class="step-circle">3</div><h3>Approve</h3><p>We explain and you decide. No pressure.</p></div>
  <div class="process-step animate-fade-up stagger-4"><div class="step-circle">4</div><h3>Drive</h3><p>Quality repair, backed by warranty.</p></div>
</div></div></section>

<section class="testimonials" id="testimonials"><div class="testimonials-container"><p class="section-label animate-fade-up">Reviews</p><h2 class="section-title animate-fade-up stagger-1">What Drivers Say</h2>
<div class="testimonials-grid">${reviews.map((r, i) => `<div class="testimonial-card animate-fade-up stagger-${i+1}"><div class="testimonial-stars">★★★★★</div><p class="testimonial-text">"${r}"</p><div class="testimonial-author">Verified Customer</div></div>`).join('')}</div></div></section>

<section class="faq" id="faq"><div class="faq-container"><p class="section-label animate-fade-up">FAQ</p><h2 class="section-title animate-fade-up stagger-1">Questions</h2>
  <div class="faq-item animate-fade-up"><div class="faq-question"><span>Do you work on all makes and models?</span><span class="faq-icon">+</span></div><div class="faq-answer">Yes, we service all domestic and foreign vehicles — cars, trucks, and SUVs.</div></div>
  <div class="faq-item animate-fade-up stagger-1"><div class="faq-question"><span>Do you offer warranties?</span><span class="faq-icon">+</span></div><div class="faq-answer">All repairs come with a 12-month/12,000-mile warranty on parts and labor.</div></div>
  <div class="faq-item animate-fade-up stagger-2"><div class="faq-question"><span>Can I wait while my car is serviced?</span><span class="faq-icon">+</span></div><div class="faq-answer">Of course. We have a comfortable waiting area with WiFi and refreshments.</div></div>
  <div class="faq-item animate-fade-up stagger-3"><div class="faq-question"><span>Do I need an appointment?</span><span class="faq-icon">+</span></div><div class="faq-answer">Appointments are preferred for faster service, but we accept walk-ins when capacity allows.</div></div>
</div></section>

<section class="cta-section"><h2 class="animate-fade-up">Keep Your Car Running Right</h2><p class="animate-fade-up stagger-1">Schedule your service today. Fair prices, expert care.</p><a href="tel:${config.phone || '#'}" class="btn-white animate-fade-up stagger-2">Schedule Service</a></section>
<footer class="footer"><div class="footer-container"><div><div class="footer-logo">${config.business_name.split(' ').slice(0,2).join(' ')}<span>.</span></div><p style="font-size:12px;color:var(--text-muted);margin-top:6px">${config.address || ''}</p></div><div class="footer-links"><a href="#services">Services</a><a href="#about">About</a><a href="#testimonials">Reviews</a>${config.phone ? `<a href="tel:${config.phone}">${config.phone}</a>` : ''}</div></div></footer>
<script>${getAnimationScript()}</script>
</body></html>`;
}

// ============================================================================
// DISPATCHER
// ============================================================================

function generateDemoHTML(config) {
  const templates = {
    dentist: dentistTemplate,
    barbershop: barbershopTemplate,
    restaurant: restaurantTemplate,
    salon: salonTemplate,
    contractor: contractorTemplate,
    auto_repair: autoRepairTemplate
  };
  const generator = templates[config.category] || templates.dentist;
  return generator(config);
}

module.exports = { generateDemoHTML, getTimeRemaining };
