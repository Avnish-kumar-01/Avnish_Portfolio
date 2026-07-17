/* -------------------------------------------------------------
 * AVNISH KUMAR - PREMIUM PERSONAL PORTFOLIO INTERACTION ENGINE
 * ------------------------------------------------------------- */

// Configuration
const CONFIG = {
  // Replace this with your production backend URL (e.g., https://your-portfolio-backend.onrender.com)
  // API_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  //   ? 'http://localhost:5000' 
  //   : 
  https://avnish-portfolio-7c3y.onrender.com
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // -----------------------------------------------------------
  // 1. HTML5 Canvas Particles Background
  // -----------------------------------------------------------
  const canvas = document.getElementById('canvas-particles');
  const ctx = canvas.getContext('2d');

  let particlesArray = [];
  const numberOfParticles = 75;
  const connectionDistance = 120;

  // Set canvas dimensions
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  // Particle Blueprint
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1; // particle radius
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.color = 'rgba(99, 102, 241, 0.4)'; // Light indigo glow
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // Create particles
  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  initParticles();

  // Connect particles in a network
  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          // Opacity based on proximity
          const opacity = 1 - (distance / connectionDistance);
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.15})`; // neon cyan links
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Canvas Animation loop
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();


  // -----------------------------------------------------------
  // 2. Typewriter Animation for Hero Section
  // -----------------------------------------------------------
  const typewriterText = document.getElementById('typewriter');
  const phrases = [
    "Software Development Engineer.",
    "Full-Stack Web Developer.",
    "Neovim & CLI Enthusiast.",
    "Data Structures practitioner."
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Deleting character
      typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40; // delete faster
    } else {
      // Adding character
      typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; // standard typing speed
    }

    // Checking states
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Completed word. Pause before deleting
      isDeleting = true;
      typeSpeed = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typewriterText) {
    setTimeout(typeEffect, 1000);
  }


  // -----------------------------------------------------------
  // 3. Interactive CLI Terminal Widget
  // -----------------------------------------------------------
  const terminalLog = document.getElementById('terminal-log');
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  const clearBtn = document.getElementById('btn-clear-terminal');
  const helpBtn = document.getElementById('btn-help-terminal');

  // Direct resume command responses
  const commands = {
    objective: `CAREER OBJECTIVE:
To secure a Software Development Engineer position in a progressive organization where I can apply my knowledge of programming, software development, data structures, and modern web technologies to build scalable and efficient solutions. I am eager to contribute to impactful projects, continuously upgrade my technical skills, and grow as a dedicated software professional while adding value to the organization.`,
    
    skills: `TOOLS & SKILLS GRID:
--------------------------------------------------------------------------------
1. Programming Languages : Java (primary), C, Python, JavaScript, SQL, HTML/CSS
2. Frameworks/Libraries  : React, Node.js, Express.js, Streamlit
3. Systems & Dev Tools   : Linux, Git & GitHub, Vim, Neovim, VS Code, CLI Tooling
4. CS Fundamentals       : Data Structures & Algorithms (DSA), OOPs, DBMS
5. Others/Design         : Graphic Design (Adobe Suite, Photoshop, Illustrator)
--------------------------------------------------------------------------------`,

    education: `ACADEMIC PATHWAY:
--------------------------------------------------------------------------------
• Bachelor of Technology (CSE) | 2023 - 2027
  IMS Engineering College Ghaziabad (AKTU)
  Academic Standing: CGPA 8.5
  
• Intermediate (12th Grade)    | 2022 - 2023
  T.S.M Inter College Shahzadpur
  Final Performance Score: 81%
  
• High School (10th Grade)      | 2020 - 2021
  T.S.M Inter College Shahzadpur
  Final Performance Score: 85.3%
--------------------------------------------------------------------------------`,

    achievements: `ACCOLADES & MILESTONES:
--------------------------------------------------------------------------------
🏆 National Level Hackathon Winner: Secure Top 5 Position (Nov 7, 2025)
💻 LeetCode Solved                : Completed 150+ algorithmic DSA problems
🎨 Adobe Graphic Design Cert      : Visual designing & UI mockup (Sep 23, 2025)
🎓 Certificate in Computer App   : 3-month AICT certified business suite course
--------------------------------------------------------------------------------`,

    help: `AVAILABLE COMMANDS:
- skills       : Show engineering skills checklist
- education    : Show academic background timeline
- achievements : Show awards, Hackathon ranks, and LeetCode solve counts
- objective    : Show professional career SDE objective
- clear        : Clear terminal log lines
- help         : Show this manual help command`
  };

  // Run a terminal command
  function executeCommand(cmdStr) {
    const sanitizedCmd = cmdStr.trim().toLowerCase();
    
    // Add command log to window
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-command-line';
    cmdLine.innerHTML = `<span class="prompt">avnish@portfolio:~$</span> <span class="command-text">${cmdStr}</span>`;
    terminalLog.appendChild(cmdLine);

    if (sanitizedCmd === 'clear') {
      terminalLog.innerHTML = '';
    } else if (commands.hasOwnProperty(sanitizedCmd)) {
      const output = document.createElement('div');
      output.className = 'output-text';
      output.innerText = commands[sanitizedCmd];
      terminalLog.appendChild(output);
    } else if (sanitizedCmd !== '') {
      const errorOutput = document.createElement('div');
      errorOutput.className = 'output-text';
      errorOutput.style.color = '#f87171'; // red warning
      errorOutput.innerText = `sh: command not found: "${cmdStr}". Type "help" to see available options.`;
      terminalLog.appendChild(errorOutput);
    }

    // Scroll to bottom of terminal
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Bind input submit
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value;
        executeCommand(cmd);
        terminalInput.value = '';
      }
    });
  }

  // Bind click elements on the badges
  document.querySelectorAll('.cli-badge').forEach(badge => {
    badge.addEventListener('click', () => {
      const command = badge.getAttribute('data-cmd');
      executeCommand(command);
    });
  });

  // Action header shortcuts
  if (clearBtn) {
    clearBtn.addEventListener('click', () => executeCommand('clear'));
  }
  if (helpBtn) {
    helpBtn.addEventListener('click', () => executeCommand('help'));
  }


  // -----------------------------------------------------------
  // 4. Interactive Project Category Filtering
  // -----------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // -----------------------------------------------------------
  // 5. Scroll Reveal IntersectionObserver
  // -----------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));


  // -----------------------------------------------------------
  // 6. Navigation Scroll & Active Highlighting
  // -----------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // 1. Add background blur to navbar on scroll
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 2. Highlight active navigation item
    let currentSection = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop;
      const sectionHeight = sec.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });


  // -----------------------------------------------------------
  // 7. Mobile Drawer Navigation Menu
  // -----------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Toggle icon between Menu and X
      const icon = mobileMenuBtn.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      });
    });
  }


  // -----------------------------------------------------------
  // 8. Contact Form Mock Simulation
  // -----------------------------------------------------------
  // -----------------------------------------------------------
// 8. Contact Form Email Submission
// -----------------------------------------------------------
const contactForm = document.getElementById('contact-form');
const notificationDialog = document.getElementById('contact-notif');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('form-name').value,
      email: document.getElementById('form-email').value,
      subject: document.getElementById('form-subject').value,
      message: document.getElementById('form-message').value
    };

    try {
      const response = await fetch(
        `${CONFIG.API_URL}/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (result.success) {

        if (notificationDialog) {
          notificationDialog.classList.add('show');

          setTimeout(() => {
            notificationDialog.classList.remove('show');
          }, 4000);
        }

        contactForm.reset();

      } else {
        alert('Failed to send message');
      }

    } catch (error) {
      console.error(error);
      alert('Server connection failed');
    }
  });
}
});
