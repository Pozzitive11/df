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
});
