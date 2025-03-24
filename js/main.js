// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader")
    preloader.classList.add("hide")
  })

  // Current Year
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("show")
  })

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("show")
    })
  })

  // Active link on scroll
  function activeLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(".nav-link[href*=" + sectionId + "]").classList.add("active")
      } else {
        document.querySelector(".nav-link[href*=" + sectionId + "]").classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", activeLink)

  // Dark/Light Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle")

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")

    if (document.body.classList.contains("dark-mode")) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
      localStorage.setItem("theme", "dark")
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
      localStorage.setItem("theme", "light")
    }
  })

  // Check for saved theme preference
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show")
    } else {
      backToTopBtn.classList.remove("show")
    }
  })

  // Skills tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const target = this.getAttribute("data-target")

      // Remove active class from all buttons and contents
      tabBtns.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      this.classList.add("active")
      document.getElementById(target).classList.add("active")
    })
  })

  // Animate skill bars
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")

    skillBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress")
      bar.style.width = progress + "%"
    })
  }

  // Projects filter
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectItems = document.querySelectorAll(".project-item")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      projectItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Contact form submission to Google Sheets
  const contactForm = document.getElementById("contactForm")
  const formStatus = document.getElementById("formStatus")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      timestamp: new Date().toISOString(),
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalBtnText = submitBtn.innerHTML
    submitBtn.disabled = true
    submitBtn.innerHTML =
      '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>'

    // Replace with your Google Apps Script URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbwsSpOOhAs_wQN9xM4VMjErEd7lftSMmKOZmQCB1ItPv242eaGZF032zbPXKoHmA7BAdA/exec"

    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Reset form
        contactForm.reset()

        // Show success message
        formStatus.textContent = "Your message has been sent successfully!"
        formStatus.classList.add("success")

        // Reset button
        submitBtn.disabled = false
        submitBtn.innerHTML = originalBtnText

        // Hide success message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = ""
          formStatus.classList.remove("success")
        }, 5000)
      })
      .catch((error) => {
        console.error("Error:", error)

        // Show error message
        formStatus.textContent = "There was an error sending your message. Please try again."
        formStatus.classList.add("error")

        // Reset button
        submitBtn.disabled = false
        submitBtn.innerHTML = originalBtnText

        // Hide error message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = ""
          formStatus.classList.remove("error")
        }, 5000)
      })
  })

  // GSAP Animations
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger)

  // Hero section animations
  gsap.from(".hero-text h1", { opacity: 0, y: 50, duration: 1, delay: 0.2 })
  gsap.from(".hero-text h2", { opacity: 0, y: 50, duration: 1, delay: 0.4 })
  gsap.from(".hero-text p", { opacity: 0, y: 50, duration: 1, delay: 0.6 })
  gsap.from(".hero-btns", { opacity: 0, y: 50, duration: 1, delay: 0.8 })
  gsap.from(".social-icons", { opacity: 0, y: 50, duration: 1, delay: 1 })
  gsap.from(".hero-image", { opacity: 0, scale: 0.8, duration: 1, delay: 0.5 })

  // Scroll trigger animations

  // Section titles
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  })

  // About section
  gsap.from(".about-image", {
    opacity: 0,
    x: -50,
    duration: 1,
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  gsap.from(".about-text", {
    opacity: 0,
    x: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  // Skills section
  gsap.from(".skills-tabs", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".skills-content",
      start: "top 80%",
      toggleActions: "play none none none",
      onEnter: animateSkillBars,
    },
  })

  // Projects section
  gsap.from(".projects-filter", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".projects-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  gsap.utils.toArray(".project-item").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.2,
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    })
  })

  // Contact section
  gsap.from(".contact-info", {
    opacity: 0,
    x: -50,
    duration: 1,
    scrollTrigger: {
      trigger: ".contact-content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })

  gsap.from(".contact-form-container", {
    opacity: 0,
    x: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".contact-content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  })
})

