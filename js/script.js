document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Hamburger Toggle
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
    
    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (navMenu.classList.contains("active") && !navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
  
  // 2. IntersectionObserver for Reveal on Scroll
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px"
  });
  
  reveals.forEach(reveal => {
    observer.observe(reveal);
  });

  // 3. AJAX Submission for Lead Form via FormSubmit.co
  const leadForm = document.getElementById("leadForm");
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = leadForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = "Надсилання...";
      
      const formData = new FormData(leadForm);
      const data = {};
      formData.forEach((value, key) => data[key] = value);
      
      fetch(leadForm.action, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          leadForm.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #fff;">
              <div style="font-size: 48px; margin-bottom: 16px;">✓</div>
              <h3 style="margin-bottom: 8px; font-size: 22px;">Дякуємо!</h3>
              <p style="color: #b6c2d5; font-size: 15px;">Ваша заявка успішно надіслана. Наш менеджер звʼяжеться з вами найближчим часом.</p>
            </div>
          `;
        } else {
          throw new Error('Помилка відправки');
        }
      })
      .catch(error => {
        alert("Ой! Сталася помилка при надсиланні. Спробуйте ще раз або зв'яжіться з нами по телефону.");
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
      });
    });
  }
});
