/* =========================================================
   Serene Heights Lahore — interactions
   ========================================================= */
(function () {
  const ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 8h11M9 4l4 4-4 4"/></svg>';
  const CHEV = '<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 3.5l3 3 3-3"/></svg>';
  const page = document.body.dataset.page || "home";

  /* ---------- Shared header ---------- */
  const header = document.createElement("header");
  header.className = "header" + (page === "home" ? "" : " is-solid");
  header.innerHTML = `
    <div class="wrap">
      <a class="logo" href="index.html" aria-label="Serene Heights Lahore home">
        <span>SERENE HEIGHTS<small>LAHORE</small></span>
      </a>
      <nav class="nav" aria-label="Main">
        <a href="project.html" data-p="project">The Project</a>
        <span class="has-drop">
          <a href="project.html#configuration">Floors ${CHEV}</a>
          <span class="drop">
            <a href="project.html#commercial">Commercial Floors</a>
            <a href="project.html#offices">Office Floors</a>
            <a href="project.html#coworking">Co-Working Floors</a>
            <a href="project.html#hotel">Hotel Apartments</a>
          </span>
        </span>
        <span class="has-drop">
          <a href="amenities.html" data-p="amenities">Amenities ${CHEV}</a>
          <span class="drop">
            <a href="amenities.html#architecture">Architecture</a>
            <a href="amenities.html#services">Services &amp; Amenities</a>
          </span>
        </span>
        <a href="invest.html" data-p="invest">Invest</a>
        <a href="about.html" data-p="about">About</a>
        <a href="contact.html" data-p="contact">Contact</a>
      </nav>
      <a class="btn" href="contact.html">Book a Visit</a>
      <button class="burger" aria-label="Open menu" aria-expanded="false"><span></span></button>
    </div>`;
  document.body.prepend(header);
  const active = header.querySelector(`[data-p="${page}"]`);
  if (active) active.classList.add("is-active");

  const mm = document.createElement("div");
  mm.className = "mobile-menu";
  mm.innerHTML = `
    <a href="index.html">Home</a>
    <a href="project.html">The Project</a>
    <a href="amenities.html">Amenities</a>
    <a href="invest.html">Invest</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a class="btn btn--light" href="contact.html">Book a Visit ${ARROW}</a>`;
  document.body.append(mm);
  const burger = header.querySelector(".burger");
  burger.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  /* ---------- Shared footer ---------- */
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="wrap">
      <div class="footer__top">
        <div>
          <h3>Request a Callback</h3>
          <form class="sub-form" data-sub>
            <input type="tel" placeholder="Enter your phone number" aria-label="Phone number" required>
            <button aria-label="Submit">${ARROW}</button>
          </form>
          <div class="sub-ok" aria-live="polite"></div>
          <div class="footer__info">
            <div><small>Project Site</small><p>Gulberg Main Boulevard,<br>Lahore, Pakistan</p></div>
            <div><small>Email Us</small><a href="mailto:info@sereneheightslahore.com">info@sereneheightslahore.com</a></div>
            <div><small>Call Us</small>
              <a href="tel:03041111106">0304-1111106</a>
              <a href="tel:03214979446">0321-4979446</a>
              <a href="tel:03008497999">0300-8497999</a>
            </div>
          </div>
        </div>
        <nav class="footer__nav" aria-label="Footer">
          <a href="project.html">The Project</a>
          <a href="amenities.html">Amenities</a>
          <a href="invest.html">Invest</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact</a>
        </nav>
        <div class="footer__soc">
          <a href="https://www.sereneheightsgroup.com/lahore" target="_blank" rel="noopener">Group Website</a>
          <a href="https://wa.me/923041111106" target="_blank" rel="noopener">WhatsApp</a>
          <a href="mailto:info@sereneheightslahore.com">Email</a>
        </div>
      </div>
      <div class="footer__mark">
        <span>SERENE</span>
        <img src="assets/logo/serene-white-transp.png" alt="Serene Heights Lahore logo" loading="lazy">
      </div>
      <div class="footer__legal">
        <span>Corporate Office / Commercial: 0304-1111106</span>
        <span>Co-Working / Hotel Apartments: 0321-4979446 · 0300-8497999</span>
        <span>A joint venture by Fatir Developers, Falah Developers &amp; DM Consortium</span>
        <span>© ${new Date().getFullYear()} Serene Heights Lahore. All Rights Reserved.</span>
        <img class="lda" src="assets/home/lda-approved.png" alt="LDA Approved" loading="lazy">
      </div>
    </div>`;
  document.body.append(footer);

  document.querySelectorAll("[data-arrow]").forEach((el) => el.insertAdjacentHTML("beforeend", ARROW));

  /* ---------- Forms (no backend: hand off to email / show note) ---------- */
  document.querySelectorAll("[data-sub]").forEach((f) =>
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = f.querySelector("input").value.trim();
      const body = encodeURIComponent("Please call me back about Serene Heights Lahore. My number: " + v);
      window.location.href = "mailto:info@sereneheightslahore.com?subject=Callback%20Request&body=" + body;
      f.nextElementSibling.textContent = "Thank you — our team will call you shortly.";
      f.reset();
    })
  );
  const cf = document.querySelector("[data-contact]");
  if (cf) cf.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(cf);
    const lines = [...d.entries()].map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href = "mailto:info@sereneheightslahore.com?subject=" +
      encodeURIComponent("Enquiry — " + (d.get("Interest") || "Serene Heights Lahore")) + "&body=" + encodeURIComponent(lines);
    cf.querySelector(".form-ok").textContent = "Thank you — your email app will open to send the enquiry.";
  });

  /* ---------- Split text for scroll reveal ---------- */
  const reveals = [...document.querySelectorAll("[data-reveal]")].map((el) => {
    const mode = el.dataset.reveal; // "chars" | "words"
    const units = [];
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          const parts = mode === "chars" ? [...n.textContent] : n.textContent.split(/(\s+)/);
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.append(p); return; }
            const s = document.createElement("span");
            s.className = mode === "chars" ? "ch" : "w";
            s.textContent = p;
            units.push(s);
            frag.append(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
      });
    };
    walk(el);
    return { el, units, start: +(el.dataset.start || 0.9), end: +(el.dataset.end || 0.45) };
  });

  /* ---------- Fade-up on enter ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll(".fade-up").forEach((el) => io.observe(el));

  /* ---------- Hero ---------- */
  const hero = document.querySelector(".hero");
  const H = hero && {
    media: hero.querySelector(".hero__media"),
    copy: hero.querySelector(".hero__copy"),
    fogs: hero.querySelectorAll(".fog"),
    sky: hero.querySelector(".hero__sky"),
    brand: hero.querySelector(".hero__brand"),
    mask: hero.querySelector(".hero__mask"),
    sub: hero.querySelector(".hero__mask-sub"),
    hint: hero.querySelector(".hero__scroll"),
  };
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const seg = (p, a, b) => clamp((p - a) / (b - a));

  // Zoom origin: the stem of the second "E", so the zoom flies through solid letterform.
  let origin = "50% 50%";
  function heroOrigin() {
    const t = H.mask.dataset.target && H.mask.querySelector(".zoom-target");
    if (!t) return;
    const prev = H.mask.style.transform;
    H.mask.style.transform = "none";
    const m = H.mask.getBoundingClientRect(), r = t.getBoundingClientRect();
    H.mask.style.transform = prev;
    origin = `${r.left - m.left + r.width * 0.2}px ${r.top - m.top + r.height * 0.5}px`;
    H.mask.style.transformOrigin = origin;
  }

  function heroFrame(vh) {
    const r = hero.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - vh));
    // 1. Intro copy lifts away, video starts pushing in.
    const out = seg(p, 0, 0.2);
    H.copy.style.transform = `translateY(${-out * 140}px)`;
    H.copy.style.opacity = 1 - seg(p, 0.05, 0.2);
    H.hint.style.opacity = 1 - seg(p, 0, 0.04);
    // 2. Fog rises and swallows the tower.
    H.fogs.forEach((f, i) => {
      const k = seg(p, 0.04 + i * 0.03, 0.36);
      f.style.transform = `translateY(${(1 - k) * (34 + i * 6) - k * 40}%) scale(${1 + k * 0.4})`;
      f.style.opacity = 1 - seg(p, 0.48, 0.56);
    });
    H.sky.style.opacity = 1 - seg(p, 0.4, 0.5);
    // 3. White layer fades in, letters show the video; then the letters zoom until the video fills the screen.
    const b = seg(p, 0.26, 0.4);
    const z = seg(p, 0.52, 0.86);
    const ze = z * z * (3 - 2 * z);
    H.brand.style.opacity = b * (1 - seg(p, 0.8, 0.9));
    H.mask.style.transform = `scale(${(0.8 + seg(p, 0.26, 0.5) * 0.2) * Math.pow(70, ze)})`;
    H.sub.style.opacity = 1 - seg(p, 0.5, 0.58);
    H.sub.style.transform = `translateY(${seg(p, 0.5, 0.6) * 60}px)`;
    // Video: steady push-in through the intro, then a continued zoom as we fly through the letters.
    const vz = 1 + seg(p, 0, 0.5) * 0.15 + ze * 0.25 - seg(p, 0.86, 1) * 0.12;
    H.media.style.transform = `scale(${vz})`;
    header.classList.toggle("is-solid", p > 0.24 || r.bottom < vh);
  }

  /* ---------- Chevrons / steps / parallax ---------- */
  const chevRow = document.querySelector(".arrows__row");
  const chevs = chevRow ? [...chevRow.children] : [];
  const steps = [...document.querySelectorAll(".step")];
  const pars = [...document.querySelectorAll("[data-speed]")];

  function frame() {
    const vh = window.innerHeight;
    if (hero) heroFrame(vh);
    else header.classList.toggle("is-solid", true);

    reveals.forEach(({ el, units, start, end }) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const p = clamp((vh * start - r.top) / (vh * (start - end) + r.height * 0.5));
      const n = Math.round(p * units.length);
      units.forEach((u, i) => u.classList.toggle("on", i < n));
    });

    if (chevRow) {
      const r = chevRow.getBoundingClientRect();
      const p = clamp((vh * 0.85 - r.top) / (vh * 0.55));
      chevs.forEach((c, i) => c.classList.toggle("on", p > (i + 0.5) / chevs.length || (i === 0 && p > 0.05)));
    }
    steps.forEach((s) => s.classList.toggle("on", s.getBoundingClientRect().top < vh * 0.7));
    pars.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const c = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${c * el.dataset.speed * 100}px, 0)`;
    });
  }
  let ticking = false;
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { frame(); ticking = false; }); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { if (hero) heroOrigin(); onScroll(); });
  if (hero) { heroOrigin(); document.fonts && document.fonts.ready.then(() => { heroOrigin(); frame(); }); }
  frame();

  /* ---------- Developers slider ---------- */
  const devs = document.querySelector("[data-devs]");
  if (devs) {
    const imgs = devs.querySelectorAll(".devs__img img");
    const qs = devs.querySelectorAll(".devs__q > div");
    const dots = devs.querySelectorAll(".dots button");
    let i = 0, timer;
    const go = (n) => {
      i = (n + qs.length) % qs.length;
      [imgs, qs, dots].forEach((set) => set.forEach((el, k) => el.classList.toggle("on", k === i)));
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 6500); };
    dots.forEach((d, k) => d.addEventListener("click", () => { go(k); auto(); }));
    go(0); auto();
  }

  /* ---------- Services hover image ---------- */
  const peek = document.querySelector(".svc__peek");
  if (peek && matchMedia("(hover: hover)").matches) {
    const pimg = peek.querySelector("img");
    document.querySelectorAll(".svc__row").forEach((row) => {
      row.addEventListener("mouseenter", () => { pimg.src = row.dataset.img; peek.classList.add("on"); });
      row.addEventListener("mouseleave", () => peek.classList.remove("on"));
      row.addEventListener("mousemove", (e) => { peek.style.left = e.clientX + "px"; peek.style.top = e.clientY + "px"; });
    });
  }
})();
