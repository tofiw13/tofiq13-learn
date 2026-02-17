document.addEventListener("DOMContentLoaded", () => {

    /* ================= FORM ================= */
    const form = document.getElementById("contactForm");

    if (form) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageBox = document.getElementById("formMessage");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (nameInput.value.trim() === "" || emailInput.value.trim() === "") {
                messageBox.textContent = "Please fill in all fields.";
                messageBox.style.color = "red";
            } else {
                messageBox.textContent = "Message sent successfully!";
                messageBox.style.color = "green";
                form.reset();
            }
        });
    }

    /* ================= TODO ================= */
    const input = document.querySelector("#todoInput");
    const addBtn = document.querySelector("#addBtn");
    const list = document.querySelector("#todoList");

    if (input && addBtn && list) {
        addBtn.addEventListener("click", () => {
            if (input.value.trim() === "") return;

            const li = document.createElement("li");
            li.textContent = input.value;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";

            deleteBtn.addEventListener("click", () => li.remove());

            li.appendChild(deleteBtn);
            list.appendChild(li);
            input.value = "";
        });
    }

    /* ================= THEME ================= */
    const body = document.body;
    const themeBtn = document.querySelector(".theme-toggle");

    if (themeBtn) {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            body.classList.add("dark");
            themeBtn.textContent = "Light";
        } else {
            themeBtn.textContent = "Dark";
        }

        themeBtn.addEventListener("click", () => {
            body.classList.toggle("dark");

            if (body.classList.contains("dark")) {
                themeBtn.textContent = "Light";
                localStorage.setItem("theme", "dark");
            } else {
                themeBtn.textContent = "Dark";
                localStorage.setItem("theme", "light");
            }
        });
    }

    /* ================= MENU ================= */
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.getElementById("menu");

    if (menuBtn && menu) {

        // Menu aç / bağla
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            menu.classList.toggle("open");
        });

        // Menu içində klik bağlamasın
        menu.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        // Boş yerə klik → bağla
        document.addEventListener("click", () => {
            menu.classList.remove("open");
        });

        // ESC ilə bağla
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                menu.classList.remove("open");
            }
        });
    }

});

const images = document.querySelectorAll(".preview-img");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close-btn");

images.forEach(img => {
    img.addEventListener("click", () => {
        modal.classList.add("open");
        modalImg.src = img.src;
    })
})

closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
})

modal.addEventListener("click", (e) => {
    if(e.target === modal) {
        modal.classList.remove("open");
    }
})

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.remove("open")
    }
});