// ============= MULTI-PAGE NAVIGATION ===========================
// Updated JavaScript for multi-page portfolio with smooth transitions

// ============= HAMBURGER MENU ===========================
const menuToggle = document.getElementById('menuToggle');
const homeMenuToggle = document.getElementById('homeMenuToggle');
const menuOverlay = document.getElementById('menuOverlay');
let isMenuOpen = false;

// Handle regular navigation menu
if (menuToggle && menuOverlay) {
  menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  });
}

// Handle home page menu
if (homeMenuToggle && menuOverlay) {
  homeMenuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  });
}

// Close menu when clicking overlay
if (menuOverlay) {
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      closeMenu();
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });
}

function openMenu() {
  if (menuToggle) menuToggle.classList.add('active');
  if (homeMenuToggle) homeMenuToggle.classList.add('active');
  if (menuOverlay) menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  isMenuOpen = true;
}

function closeMenu() {
  if (menuToggle) menuToggle.classList.remove('active');
  if (homeMenuToggle) homeMenuToggle.classList.remove('active');
  if (menuOverlay) menuOverlay.classList.remove('active');
  document.body.style.overflow = '';
  isMenuOpen = false;
}

// ============= PAGE TRANSITIONS ===========================
// Smooth page transitions
function navigateToPage(url) {
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    window.location.href = url;
  }, 300);
}

// Page load animation
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(20px)';
  document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
  }, 100);
});

// ============= MAIN SCREEN ELEMENTS ===========================
const mainScreen = document.getElementById('main-screen');
const myName = document.querySelector('.my-name');
const starElems = document.querySelectorAll('.star');
const bgBoxes = document.querySelectorAll('.background-box');
const featuredWorkText = document.querySelector('.featured-work-text');
const featuredWorkSubtitle = document.querySelector('.featured-work-subtitle');
const subtitleLeft = document.querySelector('.subtitle-left');
const subtitleRight = document.querySelector('.subtitle-right');
const scrollIndicator = document.querySelector('.main-scroll-indicator');

let scrollLocked = false;
let lastDirection = null;
let lastScrollTime = 0;

// ============= SCROLL ANIMATION ON MAIN SCREEN ==========================
// Projects to show when scrolling (in order)
const scrollProjects = [
  { img: 'assets/thumbnails/thehollowchild.png', name: 'The Hollow Child', dataProject: 'the-hollow-child' },
  { img: 'assets/thumbnails/thedisconnect.png', name: 'The Disconnect', dataProject: 'the-disconnect' },
  { img: 'assets/thumbnails/thehungerofmollyfinch.png', name: 'The Hunger of Molly Finch', dataProject: 'the-hunger-of-molly-finch' },
  { img: 'assets/thumbnails/sessionpieces.png', name: 'Session Pieces', dataProject: 'session-pieces' }
];

// Store original image data
const originalImageData = [];

// Store original values when page loads
if (bgBoxes.length > 0) {
  bgBoxes.forEach((box) => {
    const img = box.querySelector('img');
    const overlay = box.querySelector('.rectangle-overlay span');
    originalImageData.push({
      imgSrc: img ? img.src : '',
      overlayText: overlay ? overlay.textContent : '',
      dataProject: box.getAttribute('data-project') || ''
    });
  });
}

function changeBackgroundImages(useProjects) {
  bgBoxes.forEach((box, index) => {
    const img = box.querySelector('img');
    const overlay = box.querySelector('.rectangle-overlay span');
    
    if (!img) return;
    
    // Fade out quickly
    img.style.opacity = '0';
    
    // Use requestAnimationFrame for immediate execution without delay
    requestAnimationFrame(() => {
      // Change image source
      if (useProjects && scrollProjects[index]) {
        img.src = scrollProjects[index].img;
        if (overlay) {
          overlay.textContent = scrollProjects[index].name;
        }
        if (box) {
          box.setAttribute('data-project', scrollProjects[index].dataProject);
        }
      } else if (originalImageData[index]) {
        img.src = originalImageData[index].imgSrc;
        if (overlay) {
          overlay.textContent = originalImageData[index].overlayText;
        }
        if (box) {
          box.setAttribute('data-project', originalImageData[index].dataProject);
        }
      }
      
      // Fade in immediately
      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });
    });
  });
}

function applyScrollZoom(zoomIn) {
  if (zoomIn) {
    // Change images when scrolling down
    changeBackgroundImages(true);
    
    myName.classList.add('scroll-scale', 'inactive');
    
    // Hide scroll indicator when scrolling
    if (scrollIndicator) {
      scrollIndicator.classList.add('inactive');
    }
    
    // Show featured work text when stars fade
    if (featuredWorkText) {
      featuredWorkText.classList.add('visible');
    }
    
    // Show featured work subtitle when stars fade
    if (featuredWorkSubtitle) {
      featuredWorkSubtitle.classList.add('visible');
    }
    
    // Hide subtitles when scrolling
    if (subtitleLeft) {
      subtitleLeft.classList.add('inactive');
    }
    if (subtitleRight) {
      subtitleRight.classList.add('inactive');
    }
    
    // Zoom and fade out all stars
    starElems.forEach((s) => {
      s.classList.add('scroll-scale');
      s.style.opacity = '0';
      s.style.pointerEvents = 'none';
    });
    
    bgBoxes.forEach((box) => box.classList.add('active-hover'));
  } else {
    // Reset name
    myName.classList.remove('scroll-scale', 'inactive');
    
    // Show scroll indicator when scrolling back up
    if (scrollIndicator) {
      scrollIndicator.classList.remove('inactive');
    }
    
    // Hide featured work text
    if (featuredWorkText) {
      featuredWorkText.classList.remove('visible');
    }
    
    // Hide featured work subtitle
    if (featuredWorkSubtitle) {
      featuredWorkSubtitle.classList.remove('visible');
    }
    
    // Show subtitles when scrolling up
    if (subtitleLeft) {
      subtitleLeft.classList.remove('inactive');
    }
    if (subtitleRight) {
      subtitleRight.classList.remove('inactive');
    }
    
    // Reset stars
    starElems.forEach((s) => {
      s.classList.remove('scroll-scale');
      s.style.opacity = '1';
      s.style.pointerEvents = 'auto';
    });
    
    // Remove hover effects
    bgBoxes.forEach((box) => box.classList.remove('active-hover'));
    
    // Restore original images when scrolling back up
    changeBackgroundImages(false);
  }
}

function isOnMainScreen() {
  return mainScreen && (mainScreen.style.display === 'flex' || mainScreen.style.display === '');
}

// ============= ZOOM TRIGGER BASED ON SCROLL DIRECTION ==========================
window.addEventListener('wheel', (e) => {
  if (!isOnMainScreen()) return;
  
  const scrollDown = e.deltaY > 0;
  const newDirection = scrollDown ? 'down' : 'up';
  
  if (newDirection !== lastDirection) {
    applyScrollZoom(scrollDown);
    lastDirection = newDirection;
  }
});

// ============= STAR PULSE ANIMATION ===========================
function animatePulse(el, speed = 3000, scale = 1.2, phaseOffset = 0) {
  function tick() {
    const now = Date.now();
    const progress = ((now + phaseOffset) % speed) / speed;
    
    let s;
    
    if (progress < 0.5) {
      s = 1 + (scale - 1) * (progress * 2);
    } else {
      s = scale - (scale - 1) * ((progress - 0.5) * 2);
    }
    
    el.style.transform = `translate(-50%, -50%) scale(${s})`;
    requestAnimationFrame(tick);
  }
  
  tick();
}

const stars = document.querySelectorAll('.star img');
stars.forEach((star) => {
  const speed = 4000 + Math.random() * 4000; // Slower: 4-8 seconds instead of 2-4
  const scale = 1.1 + Math.random() * 0.3;
  const offset = Math.random() * 5000;
  animatePulse(star, speed, scale, offset);
});

// ============= FEATURED PROJECT CLICKS ===========================
bgBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    const target = box.getAttribute('data-project');
    
    if (target) {
      scrollLocked = true;
      // Determine the correct folder based on current page
      const currentPath = window.location.pathname;
      let projectFolder = 'sound-design'; // default
      
      if (currentPath.includes('interactive-design.html')) {
        projectFolder = 'interactive-media';
      }
      
      navigateToPage(`projects/${projectFolder}/${target}.html`);
    }
  });
});

// ============= PROJECT LINK CLICKS ===========================
const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href) {
      navigateToPage(href);
    }
  });
});

// ============= CAROUSEL FUNCTIONALITY ===========================
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

function updateCarousel() {
  if (!track || !slides.length) return;
  
  currentIndex = Math.max(0, Math.min(currentIndex, slides.length - 1));
  
  // Highlight the active slide
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentIndex);
  });
  
  // Update arrows
  if (leftArrow) {
    leftArrow.style.display = currentIndex === 0 ? 'none' : 'flex';
  }
  if (rightArrow) {
    rightArrow.style.display = currentIndex === slides.length - 1 ? 'none' : 'flex';
  }
  
  requestAnimationFrame(() => {
    const container = document.querySelector('.carousel-container');
    const activeSlide = slides[currentIndex];
    
    if (!container || !activeSlide) return;
    
    const trackBox = track.getBoundingClientRect();
    const slideBox = activeSlide.getBoundingClientRect();
    
    const slideCenter = slideBox.left + slideBox.width / 2;
    const arrowPadding = 20;
    const trackCenter = trackBox.left + (container.offsetWidth - arrowPadding * 2) / 2;
    
    const offset = slideCenter - trackCenter;
    
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(calc(-1 * ${offset}px))`;
    
    // Update navigation dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  });
}

// Arrow event listeners
if (leftArrow) {
  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
}

if (rightArrow) {
  rightArrow.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
}

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel();
  });
});

// Initialize carousel
window.addEventListener('load', () => {
  updateCarousel();
});

// Update carousel on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateCarousel();
  }, 150);
});

// ============= CAROUSEL SLIDE CLICKS ===========================
const allSlides = document.querySelectorAll('.carousel-slide');
allSlides.forEach((slide) => {
  slide.addEventListener('click', () => {
    const target = slide.getAttribute('data-target');
    
    if (!target) return;
    
    // Determine the correct folder based on current page
    const currentPath = window.location.pathname;
    let projectFolder = 'sound-design'; // default
    
    if (currentPath.includes('interactive-design.html')) {
      projectFolder = 'interactive-media';
    }
    
    navigateToPage(`projects/${projectFolder}/${target}.html`);
  });
});

// ============= CONTACT FORM ===========================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    let allValid = true;
    
    // Check if all fields are filled
    inputs.forEach((field) => {
      if (!field.value.trim()) {
        allValid = false;
      }
    });
    
    // If fields are incomplete, show error
    if (!allValid) {
      submitButton.classList.add('shake');
      submitButton.textContent = 'PLEASE FILL OUT ALL FIELDS';
      submitButton.style.backgroundColor = '#ff4444';
      
      setTimeout(() => {
        submitButton.classList.remove('shake');
        submitButton.textContent = 'SUBMIT';
        submitButton.style.backgroundColor = '';
      }, 2000);
      return;
    }
    
    // Check if email is valid
    const emailInput = contactForm.querySelector('input[type="email"]');
    if (emailInput && !emailInput.value.includes('@')) {
      submitButton.classList.add('shake');
      submitButton.textContent = 'EMAIL NOT VALID';
      submitButton.style.backgroundColor = '#ff4444';
      
      setTimeout(() => {
        submitButton.classList.remove('shake');
        submitButton.textContent = 'SUBMIT';
        submitButton.style.backgroundColor = '';
      }, 2000);
      return;
    }
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'SENDING...';
    
    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        submitButton.textContent = 'SUCCESS!';
        submitButton.style.backgroundColor = '#4caf50';
        inputs.forEach((field) => (field.value = ''));
        setTimeout(() => {
          submitButton.textContent = 'SUBMIT';
          submitButton.style.backgroundColor = '';
          submitButton.disabled = false;
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      submitButton.textContent = 'ERROR PLEASE TRY AGAIN';
      submitButton.style.backgroundColor = '#ff4444';
      setTimeout(() => {
        submitButton.textContent = 'SUBMIT';
        submitButton.style.backgroundColor = '';
        submitButton.disabled = false;
      }, 3000);
    }
  });
}

// ============= BACK BUTTON ===========================
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('back-button')) {
    e.preventDefault();
    
    // Check if we're on a project page
    const currentPath = window.location.pathname;
    if (currentPath.includes('/projects/')) {
      // Get the referrer URL
      const referrer = document.referrer;
      
      // Determine the correct path based on referrer
      let targetUrl = null;
      
      // Check if referrer exists and contains our pages
      if (referrer && referrer.length > 0) {
        try {
          const referrerUrl = new URL(referrer);
          const referrerPath = referrerUrl.pathname;
          
          // Determine relative path based on current location
          const isSoundDesignProject = currentPath.includes('/projects/sound-design/');
          const isInteractiveProject = currentPath.includes('/projects/interactive-media/');
          const basePath = (isSoundDesignProject || isInteractiveProject) ? '../../' : '';
          
          // Check which page the user came from
          if (referrerPath.includes('sound-design.html')) {
            targetUrl = basePath + 'sound-design.html';
          } else if (referrerPath.includes('interactive-design.html')) {
            targetUrl = basePath + 'interactive-design.html';
          } else if (referrerPath.includes('all-works.html')) {
            targetUrl = basePath + 'all-works.html';
          }
        } catch (e) {
          // If URL parsing fails, try simple string matching
          const isSoundDesignProject = currentPath.includes('/projects/sound-design/');
          const isInteractiveProject = currentPath.includes('/projects/interactive-media/');
          const basePath = (isSoundDesignProject || isInteractiveProject) ? '../../' : '';
          
          if (referrer.includes('sound-design.html') || referrer.includes('/sound-design')) {
            targetUrl = basePath + 'sound-design.html';
          } else if (referrer.includes('interactive-design.html') || referrer.includes('/interactive-design')) {
            targetUrl = basePath + 'interactive-design.html';
          } else if (referrer.includes('all-works.html') || referrer.includes('/all-works')) {
            targetUrl = basePath + 'all-works.html';
          }
        }
      }
      
      // If we found a target URL, navigate to it, otherwise use browser history
      if (targetUrl) {
        navigateToPage(targetUrl);
      } else {
        // Default fallback - go back in browser history (most reliable)
        window.history.back();
      }
    } else {
      // For other pages, go to home
      navigateToPage('index.html');
    }
  }
});

// ============= SMOOTH SCROLLING ===========================
// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// ============= NAVBAR SCROLL BEHAVIOR ===========================
const navbar = document.getElementById('navbar');
if (navbar) {
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
}

// ============= CURRENT PAGE INDICATOR ===========================
function addCurrentPageIndicator() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop() || 'index.html';
  
  // Map file names to menu link selectors
  const pageMap = {
    'index.html': 'a[href="index.html"]',
    'about.html': 'a[href="about.html"]',
    'contact.html': 'a[href="contact.html"]',
    'sound-design.html': 'a[href="sound-design.html"]',
    'interactive-design.html': 'a[href="interactive-design.html"]',
    'all-works.html': 'a[href="all-works.html"]'
  };
  
  const currentLinkSelector = pageMap[currentFile];
  if (currentLinkSelector) {
    const currentLink = document.querySelector(currentLinkSelector);
    if (currentLink) {
      currentLink.classList.add('current-page');
    }
  }
}

// Add current page indicator when page loads
document.addEventListener('DOMContentLoaded', addCurrentPageIndicator);