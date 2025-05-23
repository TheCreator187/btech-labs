// Smooth Scrolling
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: 'smooth'
      });
    });
  });
  
  // Particle Background (Simple Canvas Animation)
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 50;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
  
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.01;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
  
    draw() {
      ctx.fillStyle = '#00ffea';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function initParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    particles.forEach((particle, index) => {
      if (particle.size <= 0.2) {
        particles.splice(index, 1);
        particles.push(new Particle());
      }
    });
    requestAnimationFrame(animateParticles);
  }
  
  initParticles();
  animateParticles();
  
  // Resize Canvas
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // Form Validation
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
  
    if (name && email && message) {
      alert('Message sent! (This is a demo)');
      this.reset();
    } else {
      alert('Please fill all fields.');
    }
  });
  
  // Add an event listener to the contact form to handle submission
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    const formData = new FormData(contactForm);
  
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
  
      if (response.ok) {
        alert('Email Sent'); // Display success message
        contactForm.reset(); // Reset the form fields
      } else {
        alert('Failed to send email. Please try again later.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  });

  // Terminal typing animation
  const typingTextElement = document.getElementById('typingText');
  const commands = [
      'node server.js',
      'npm run build',
      'git push origin main',
      'mongo --eval "db.status()"',
      'curl https://api.btechlabs.com'
  ];
  let commandIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
      const currentCommand = commands[commandIndex];
      if (!isDeleting) {
          // Typing
          if (charIndex < currentCommand.length) {
              typingTextElement.textContent += currentCommand[charIndex];
              charIndex++;
              setTimeout(type, 100); // Typing speed
          } else {
              isDeleting = true;
              setTimeout(type, 2000); // Pause before deleting
          }
      } else {
          // Deleting
          if (charIndex > 0) {
              typingTextElement.textContent = currentCommand.substring(0, charIndex - 1);
              charIndex--;
              setTimeout(type, 50); // Deleting speed
          } else {
              isDeleting = false;
              commandIndex = (commandIndex + 1) % commands.length; // Cycle to next command
              setTimeout(type, 500); // Pause before typing next
          }
      }
  }
  
  // Start typing animation
  if (typingTextElement) {
      type();
  }