const btn = document.querySelector(".menu-btn");
const list = document.querySelector("nav ul");
const navLinks = document.querySelectorAll("nav ul a");

btn.addEventListener("click", () => {
  const open = list.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});

list.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    list.classList.remove("open");
    btn.setAttribute("aria-expanded", false);
  }
});

const out = document.getElementById("readout");
const bars = document.querySelectorAll(".bar");

const showBar = (bar) => {
  bars.forEach((x) => x.classList.remove("on"));
  bar.classList.add("on");
  out.textContent = `${bar.dataset.label}: ${bar.dataset.value} orders (sample data)`;
};

bars.forEach((b) => {
  b.addEventListener("mouseenter", () => showBar(b));
  b.addEventListener("focus", () => showBar(b));
  b.addEventListener("click", () => showBar(b));
});

const defaultBar = document.querySelector('.bar[data-label="Sfax"]');
if (defaultBar) showBar(defaultBar);

const sections = document.querySelectorAll("section[id]");
const observerReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!observerReduced) {
  document.querySelectorAll(".reveal").forEach((el) => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

const setActiveNav = () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();
