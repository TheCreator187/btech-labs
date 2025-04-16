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

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
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
      alert('Email Sent');
      contactForm.reset();
    } else {
      alert('Failed to send email. Please try again later.');
    }
  } catch (error) {
    alert('An error occurred. Please try again later.');
  }
});