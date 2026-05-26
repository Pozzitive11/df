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

  // 3. AJAX Submission for Lead Form via internal API
  const leadForm = document.getElementById("leadForm");
  if (leadForm) {
    const submitBtn = leadForm.querySelector("button[type='submit']");
    
    // Show validation styles only after first submit attempt
    submitBtn.addEventListener("click", () => {
      leadForm.classList.add("was-validated");
    });

    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = leadForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = "Надсилання...";
      
      const formData = new FormData(leadForm);

      // Map form fields to API schema
      const payload = {
        created_at: new Date().toISOString(),
        company_name: formData.get("company") || "",
        contact_person: formData.get("name") || "",
        phone_number: formData.get("phone") || "",
        email: formData.get("email") || "",
        description: formData.get("message") || ""
      };
      
      const formAlert = document.getElementById("formAlert");
      formAlert.className = "form-alert"; // reset

      fetch("http://10.11.32.60:8778/c-register/api/v0/filling-form", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (response.ok) {
          formAlert.className = "form-alert success";
          formAlert.innerHTML = `<strong>✓ Дякуємо!</strong> Ваша заявка успішно надіслана. Наш менеджер звʼяжеться з вами найближчим часом.`;
          leadForm.classList.add("is-success");
        } else {
          return response.json().catch(() => null).then(body => {
            throw new Error(body?.detail || body?.message || 'Помилка відправки');
          });
        }
      })
      .catch(error => {
        console.error("Form submission error:", error);
        formAlert.className = "form-alert error";
        formAlert.innerHTML = `Ой! Сталася помилка при надсиланні. Спробуйте ще раз або зв'яжіться з нами по телефону.`;
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
      });
    });
  }
});
