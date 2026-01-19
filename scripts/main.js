// ================================================
// LUCIA MANRIQUE U. - Terapeuta Holística
// Main JavaScript
// ================================================

document.addEventListener('DOMContentLoaded', function() {
  // ========== Header Scroll Effect ==========
  const header = document.getElementById('header');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ========== Mobile Menu Toggle ==========
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ========== Smooth Scroll for Anchor Links ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== Active Navigation Link ==========
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - header.offsetHeight;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (navLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);

  // ========== Scroll Reveal Animation ==========
  const revealElements = document.querySelectorAll('.reveal');
  
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ========== Contact Form Handler ==========
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      
      // Create WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `¡Hola! Soy ${name}.\n\nTeléfono: ${phone}\n\nMensaje: ${message}`
      );
      
      // Open WhatsApp with the message
      window.open(`https://wa.me/573238230779?text=${whatsappMessage}`, '_blank');
      
      // Reset form
      contactForm.reset();
    });
  }

  // ========== Testimonials Slider (Optional Auto-scroll) ==========
  const testimonialsTrack = document.querySelector('.testimonials-track');
  
  if (testimonialsTrack) {
    let isHovering = false;
    
    testimonialsTrack.addEventListener('mouseenter', () => isHovering = true);
    testimonialsTrack.addEventListener('mouseleave', () => isHovering = false);
  }

  // ========== Parallax Effect for Hero ==========
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg img');
  
  if (hero && heroBg) {
    window.addEventListener('scroll', function() {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // ========== Counter Animation for Stats ==========
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;
  
  function animateCounters() {
    if (hasAnimated) return;
    
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;
    
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
      hasAnimated = true;
      
      statNumbers.forEach(stat => {
        const target = stat.innerText;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            current = numericValue;
            clearInterval(counter);
          }
          
          let displayValue = Math.floor(current);
          if (isPlus) displayValue += '+';
          if (isPercentage) displayValue += '%';
          stat.innerText = displayValue;
        }, stepTime);
      });
    }
  }
  
  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // ========== Typing Effect for Hero (Optional) ==========
  // Uncomment if you want a typing effect
  /*
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    setTimeout(typeWriter, 500);
  }
  */
});
