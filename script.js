// Contact form validation and feedback
const contactForm = document.querySelector("#contact form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

function showError(input, message) {
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains("form-error")) {
    error = document.createElement("span");
    error.className = "form-error";
    input.parentNode.insertBefore(error, input.nextSibling);
  }
  error.textContent = message;
  input.classList.add("input-error");
}

function clearError(input) {
  let error = input.nextElementSibling;
  if (error && error.classList.contains("form-error")) {
    error.textContent = "";
  }
  input.classList.remove("input-error");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateContactForm() {
  let valid = true;
  if (!nameInput.value.trim()) {
    showError(nameInput, "Name is required.");
    valid = false;
  } else {
    clearError(nameInput);
  }
  if (!emailInput.value.trim()) {
    showError(emailInput, "Email is required.");
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email address.");
    valid = false;
  } else {
    clearError(emailInput);
  }
  if (!messageInput.value.trim()) {
    showError(messageInput, "Message is required.");
    valid = false;
  } else {
    clearError(messageInput);
  }
  return valid;
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateContactForm()) {
      alert("Thank you for your message!");
      contactForm.reset();
      [nameInput, emailInput, messageInput].forEach(clearError);
    }
  });
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", validateContactForm);
    input.addEventListener("blur", validateContactForm);
  });
}
// Filter feature for Projects section
function filterProjects(category) {
  const articles = document.querySelectorAll("#projects article");
  articles.forEach((article) => {
    if (category === "all" || article.dataset.category === category) {
      article.style.display = "";
    } else {
      article.style.display = "none";
    }
  });
}

// Lightbox effect for project images
function openLightbox(src, alt) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  img.alt = alt;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  modal.style.display = "none";
  img.src = "";
  document.body.style.overflow = "";
}

// Attach click event to project images
document.querySelectorAll(".project-img").forEach((img) => {
  img.addEventListener("click", function () {
    openLightbox(this.src, this.alt);
  });
});

// Allow closing modal with Escape key
document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("lightbox-modal");
  if (e.key === "Escape" && modal.style.display === "flex") {
    closeLightbox();
  }
});

// Always enable scrolling when clicking outside the modal image
document.addEventListener("click", function (e) {
  const modal = document.getElementById("lightbox-modal");
  if (modal && modal.style.display === "flex" && e.target === modal) {
    closeLightbox();
  }
});

// Safety: always enable scrolling on page load
window.addEventListener("load", function () {
  document.body.style.overflow = "";
});
// Hamburger menu toggle for mobile navigation
const hamburger = document.querySelector(".hamburger");
const navList = document.getElementById("main-nav");

function toggleMenu() {
  if (hamburger && navList) {
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !expanded);
    navList.classList.toggle("active");
  }
}

if (hamburger && navList) {
  hamburger.addEventListener("click", toggleMenu);
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      // Optionally close menu on mobile after click
      if (navList.classList.contains("active")) {
        toggleMenu();
      }
    }
  });
});
