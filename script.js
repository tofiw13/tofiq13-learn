document.addEventListener("DOMContentLoaded", () => {
  
  console.log('script.js loaded — DOMContentLoaded');

  const siteSelect = document.getElementById("siteSelect");
  const addBtn = document.getElementById("addSite");
  const siteList = document.getElementById("siteList");

  const customName = document.getElementById("customName");
  const customLink = document.getElementById("customLink");
  const addCustom = document.getElementById("addCustom");

  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    const savedTheme = localStorage.getItem('theme');
    const icon = themeBtn.querySelector('i');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    }

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
        localStorage.setItem('theme', 'dark');
      } else {
        if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
        localStorage.setItem('theme', 'light');
      }
    });
  }

  if (siteSelect && siteList && addBtn && addCustom) {
    function normalizeUrl(url) {
      return url.replace(/\/$/, "");
    }

    function optionExists(value) {
      const val = normalizeUrl(value);
      return [...siteSelect.options].some(opt => normalizeUrl(opt.value) === val);
    }

    function createListItem(name, link) {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${link}" target="_blank">${name}</a>
        <div class="item-controls">
          <button class="edit-btn">Düzəliş et</button>
          <button class="delete-btn">Sil</button>
        </div>
      `;

  const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        if (!optionExists(link)) {
          const option = document.createElement("option");
          option.text = name;
          option.value = link;
          siteSelect.add(option);
        }
        li.remove();
      });

  // attach edit handler
  attachEditHandler(li);

      return li;
    }

    document.querySelectorAll("#siteList li").forEach(li => {
      const link = li.querySelector("a").href;
      [...siteSelect.options].forEach((opt, index) => {
        if (normalizeUrl(opt.value) === normalizeUrl(link)) {
          siteSelect.remove(index);
        }
      });
    });

    document.querySelectorAll("#siteList li").forEach(li => {
      const deleteBtn = li.querySelector(".delete-btn");
      const name = li.querySelector("a").textContent;
      const link = li.querySelector("a").href;
      deleteBtn.addEventListener("click", () => {
        if (!optionExists(link)) {
          const option = document.createElement("option");
          option.text = name;
          option.value = link;
          siteSelect.add(option);
        }
        li.remove();
      });
      attachEditHandler(li);
    });

    function attachEditHandler(li) {
      const editBtn = li.querySelector('.edit-btn');
      if (!editBtn) return;
      editBtn.addEventListener('click', () => {
        if (li.classList.contains('editing')) return;
        li.classList.add('editing');
        const a = li.querySelector('a');
        const oldName = a.textContent;
        const oldHref = a.href;

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = oldName;
        nameInput.style.marginRight = '8px';
        const linkInput = document.createElement('input');
        linkInput.type = 'text';
        linkInput.value = oldHref;
        linkInput.style.width = '300px';
        linkInput.style.marginRight = '8px';

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Yadda saxla';
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Ləğv et';

        a.style.display = 'none';
        editBtn.style.display = 'none';
        const delBtn = li.querySelector('.delete-btn');
        if (delBtn) delBtn.style.display = 'none';

        li.insertBefore(nameInput, li.firstChild);
        li.insertBefore(linkInput, nameInput.nextSibling);
        li.appendChild(saveBtn);
        li.appendChild(cancelBtn);

        function finish() {
          li.classList.remove('editing');
          nameInput.remove();
          linkInput.remove();
          saveBtn.remove();
          cancelBtn.remove();
          a.style.display = '';
          editBtn.style.display = '';
          if (delBtn) delBtn.style.display = '';
        }

        cancelBtn.addEventListener('click', () => {
          finish();
        });

        saveBtn.addEventListener('click', () => {
          const newName = nameInput.value.trim();
          const newLink = linkInput.value.trim();
          if (!newName || !newLink) { alert('Hər iki sahə doldurulmalıdır'); return; }

          a.textContent = newName;
          a.href = newLink;

          [...siteSelect.options].forEach((opt, idx) => {
            if (opt.value === oldHref) siteSelect.remove(idx);
          });
          if (!optionExists(newLink)) {
            const option = document.createElement('option');
            option.text = newName;
            option.value = newLink;
            siteSelect.add(option);
          }

          finish();
        });
      });
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
      if (!name || !link) { alert("Ad və link yaz!"); return; }
      const li = createListItem(name, link);
      siteList.appendChild(li);
      customName.value = '';
      customLink.value = '';
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

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });

  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-in").forEach(el => {
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

  (function attachContact() {
    const myForm = document.getElementById('my-form') || document.getElementById('contactForm');
    if (!myForm) return;

    const status = document.getElementById('my-form-status') || document.getElementById('formMessage');

    myForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (status) { status.textContent = 'Göndərilir...'; status.style.color = ''; }
      try {
        const response = await fetch(myForm.action, { method: myForm.method || 'POST', body: new FormData(myForm) });
        if (response.ok) {
          if (status) { status.textContent = 'Cavabiniz qeyde alindi ✅'; status.style.color = 'lightgreen'; }
          myForm.reset();
        } else {
          let txt = 'Xəta baş verdi ❌';
          try { const j = await response.json(); if (j && j.error) txt = j.error; } catch(e){}
          if (status) { status.textContent = txt; status.style.color = 'red'; }
          console.error('Contact submit failed', response.status, response.statusText);
        }
      } catch (err) {
        if (status) { status.textContent = 'Serverə qoşulmaq olmadı ❌'; status.style.color = 'red'; }
        console.error('Contact submit error', err);
      }
    });
  })();

  const loadBtn = document.getElementById('loadMessages');
  if (loadBtn) {
    loadBtn.addEventListener('click', async () => {
      const list = document.getElementById('messagesList');
      if (!list) return;
      list.textContent = 'Yüklənir...';
      try {
        const res = await fetch('/api/messages');
        if (!res.ok) throw new Error('Server error');
        const data = await res.json();
        const msgs = data.messages || [];
        if (!msgs.length) { list.innerHTML = '<p>Mesaj yoxdur</p>'; return; }
        list.innerHTML = msgs.map(m => `<div style="padding:10px;border:1px solid var(--border);margin-bottom:8px;border-radius:8px;"><strong>${escapeHtml(m.name)}</strong> <em>(${m.email})</em><div style="margin-top:6px;">${escapeHtml(m.message)}</div><small style="color:var(--text-muted);">${m.created_at}</small></div>`).join('');
      } catch (e) { list.textContent = 'Mesajlar alınmadı'; console.error(e); }
    });
  }

  function escapeHtml(s) { return String(s).replace(/[&"'<>]/g, c => ({'&':'&amp;','"':'&quot;',"'":"&#39;",'<':'&lt;','>':'&gt;'})[c]); }

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

      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {

      if (e.key === "Escape") {
        closeModal();
      }
    });
  }

  (function authModal() {
  const API = '/api';
    const openBtn = document.getElementById('openAuth');
    const modalAuth = document.getElementById('authModal');
    if (!openBtn || !modalAuth) return;

    const closeBtnAuth = document.getElementById('closeAuth');
    const loginForm = document.getElementById('authLoginForm');
    const registerForm = document.getElementById('authRegisterForm');
    const modalMsg = document.getElementById('modalMsg');
    const modalRegMsg = document.getElementById('modalRegMsg');

    function open() { modalAuth.style.pointerEvents = 'auto'; modalAuth.style.opacity = '1'; }
    function close() { modalAuth.style.opacity = '0'; modalAuth.style.pointerEvents = 'none'; }

    openBtn.addEventListener('click', open);
    if (closeBtnAuth) closeBtnAuth.addEventListener('click', close);

    document.querySelectorAll('#authTabs .auth-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#authTabs .auth-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        if (tab === 'login') { loginForm.style.display = 'block'; registerForm.style.display = 'none'; }
        else { loginForm.style.display = 'none'; registerForm.style.display = 'block'; }
      });
    });

    const modalLoginBtn = document.getElementById('modalLoginBtn');
    if (modalLoginBtn) modalLoginBtn.addEventListener('click', async () => {
      const email = (document.getElementById('modalEmail') || {}).value || '';
      const password = (document.getElementById('modalPassword') || {}).value || '';
      if (!email || !password) { if (modalMsg) { modalMsg.style.color='red'; modalMsg.textContent='Email və şifrəni daxil edin'; } return; }
      try {
        const res = await fetch(`${API}/login`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email, password }) });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('token', data.token);
          if (modalMsg) { modalMsg.style.color='green'; modalMsg.textContent = data.message || 'Uğurlu giriş'; }
          setTimeout(() => { close(); location.reload(); }, 700);
        } else { if (modalMsg) { modalMsg.style.color='red'; modalMsg.textContent = data.error || 'Giriş alınmadı'; } }
      } catch (err) { if (modalMsg) { modalMsg.style.color='red'; modalMsg.textContent='Serverə qoşulmaq olmadı'; } console.error(err); }
    });

    const modalRegisterBtn = document.getElementById('modalRegisterBtn');
    if (modalRegisterBtn) modalRegisterBtn.addEventListener('click', async () => {
      const username = (document.getElementById('modalUser') || {}).value || '';
      const email = (document.getElementById('modalRegEmail') || {}).value || '';
      const password = (document.getElementById('modalRegPass') || {}).value || '';
      if (!username || !email || !password) { if (modalRegMsg) { modalRegMsg.style.color='red'; modalRegMsg.textContent='Bütün sahələri doldurun'; } return; }
      try {
        const res = await fetch(`${API}/register`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ username, email, password }) });
        const data = await res.json();
        if (res.ok) { if (modalRegMsg) { modalRegMsg.style.color='green'; modalRegMsg.textContent = data.message || 'Qeydiyyat uğurlu'; } setTimeout(() => { document.querySelector('#authTabs .auth-tab[data-tab="login"]').click(); }, 800); }
        else { if (modalRegMsg) { modalRegMsg.style.color='red'; modalRegMsg.textContent = data.error || 'Qeydiyyat alınmadı'; } }
      } catch (err) { if (modalRegMsg) { modalRegMsg.style.color='red'; modalRegMsg.textContent='Serverə qoşulmaq olmadı'; } console.error(err); }
    });
  })();

});
