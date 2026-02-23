document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;

  /* ================= THEME ================= */
  const themeBtn = document.querySelector(".theme-toggle");

  if (themeBtn) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      body.classList.add("dark");
      themeBtn.textContent = "İşıqlı Rejim";
    } else {
      themeBtn.textContent = "Qaranlıq Rejim";
    }

    themeBtn.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        themeBtn.textContent = "İşıqlı Rejim";
        localStorage.setItem("theme", "dark");
      } else {
        themeBtn.textContent = "Qaranlıq Rejim";
        localStorage.setItem("theme", "light");
      }
    });
  }

  document.querySelectorAll("section, article").forEach(el => {
  el.classList.add("fade-in");
});

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{threshold:0.2});

document.querySelectorAll(".fade-in").forEach(el=>{
  observer.observe(el);
});

  /* ================= MENU ================= */
 /* ================= MENU ================= */
const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
const overlay = document.querySelector(".overlay");

if (menuBtn && menu && overlay) {

  function openMenu() {
    menu.classList.add("open");
    overlay.classList.add("active");
  }

  function closeMenu() {
    menu.classList.remove("open");
    overlay.classList.remove("active");
  }

  // Menu düyməsi
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (menu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Overlay klik → bağla
  overlay.addEventListener("click", () => {
    closeMenu();
  });

  // Menu içində klik bağlamasın
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // ESC ilə bağla
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
}

  /* ================= CONTACT FORM ================= */
  const form = document.getElementById("contactForm");

  if (form) {
    const status = document.getElementById("formMessage");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      status.textContent = "Göndərilir...";
      status.style.color = "";

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.textContent = "Mesaj göndərildi ✅";
          status.style.color = "lightgreen";
          form.reset();
        } else {
          status.textContent = "Xəta baş verdi ❌";
          status.style.color = "red";
        }
      } catch {
        status.textContent = "Şəbəkə xətası ❌";
        status.style.color = "red";
      }
    });
  }

  /* ================= GALLERY MODAL ================= */
  const images = document.querySelectorAll(".preview-img");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close-btn");

  if (images.length && modal && modalImg && closeBtn) {

    images.forEach((img) => {
      img.addEventListener("click", () => {
        modal.classList.add("open");
        modalImg.src = img.src;
        modalImg.alt = img.alt || "";
      });
    });

    const closeModal = () => {
      modal.classList.remove("open");
    };

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

});