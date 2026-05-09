document.addEventListener("DOMContentLoaded", () => {
  const siteSelect = document.getElementById("siteSelect");
const addBtn = document.getElementById("addSite");
const siteList = document.getElementById("siteList");

const customName = document.getElementById("customName");
const customLink = document.getElementById("customLink");
const addCustom = document.getElementById("addCustom");


function createListItem(name, link) {
  const li = document.createElement("li");

  li.innerHTML = `
    <a href="${link}" target="_blank">${name}</a>
    <button class="delete-btn">Sil</button>
  `;

  li.querySelector(".delete-btn").addEventListener("click", () => {
    if(optionExists(link)) {
    const option = document.createElement("option");
    option.text = name;
    option.value = link;
    siteSelect.add(option);
    }
    li.remove();
  });

  return li;
}
function optionExists(value) {
  const val = normalizeUrl(value);
  return [...siteSelect.options].some(opt => opt.value === value);
}

// Səhifə açılarkən: siyahıda olanları select-dən sil
document.querySelectorAll("#siteList li").forEach(li => {
  const link = li.querySelector("a").href;

  [...siteSelect.options].forEach((opt, index) => {
    if (opt.value === link) {
      siteSelect.remove(index);
    }
  });
});
document.querySelectorAll("#siteList li").forEach(li => {
  const name = li.querySelector("a").textContent;
  const link = li.querySelector("a").href;

  li.querySelector(".delete-btn").addEventListener("click", () => {
    const option = document.createElement("option");
    option.text = name;
    option.value = link;
    siteSelect.add(option);

    li.remove();
  });
});
function normalizeUrl(url) {
  return url.replace(/\/$/, "");
} 

addBtn.addEventListener("click", () => {
  const selected = siteSelect.options[siteSelect.selectedIndex];
  if (!selected) return;

  const li = createListItem(selected.text, selected.value);
  siteList.appendChild(li);

  siteSelect.remove(siteSelect.selectedIndex);
});

addCustom.addEventListener("click", () => {
  const name = customName.value.trim();
  const link = customLink.value.trim();

  if (!name || !link) {
    alert("Ad və link yaz!");
    return;
  }

  const li = createListItem(name, link);
  siteList.appendChild(li);

  customName.value = "";
  customLink.value = "";
});

  const body = document.body;

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

      document.querySelectorAll(".clickable-html").forEach(el => {
  el.addEventListener("click", () => {
    window.location.href = "https://www.w3schools.com/html/";
  });
});

document.querySelectorAll(".clickable-css").forEach(el => {
  el.addEventListener("click", () => {
    window.location.href = "https://www.w3schools.com/css/";
  });
});

document.querySelectorAll(".clickable-js").forEach(el => {
  el.addEventListener("click", () => {
    window.location.href = "https://www.w3schools.com/js/";
  });
});
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

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (menu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener("click", () => {
    closeMenu();
  });

  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
}

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
    }   catch (error) {
          status.textContent = "Xəta baş verdi ❌";
          status.style.color = "red";
        }
      });
  }

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