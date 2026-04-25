const contentByTab = {
  servicios: {
    kicker: "Servicios",
    title: "Promociona lo que haces y convierte visitas en consultas.",
    text: "Ideal para profesionales, estudios, consultores, tecnicos, estetica, salud, educacion y marcas personales.",
    cta: "Comprar una web de servicios",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
  tienda: {
    kicker: "Tienda online",
    title: "Vende productos con catalogo, carrito, pagos y envios.",
    text: "Perfecta para marcas, locales, lanzamientos, productos digitales y negocios que quieren cobrar online.",
    cta: "Comprar una tienda online",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
  },
  reservas: {
    kicker: "Reservas",
    title: "Permite que tus clientes pidan turno sin escribirte de mas.",
    text: "Ideal para estetica, bienestar, fotografos, entrenadores, clinicas y servicios por agenda.",
    cta: "Comprar web con reservas",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
  },
  portfolio: {
    kicker: "Portafolio",
    title: "Muestra tu trabajo con una presencia visual clara y memorable.",
    text: "Pensada para diseñadores, artistas, arquitectos, creadores, estudios y profesionales visuales.",
    cta: "Comprar portfolio",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
  },
  blog: {
    kicker: "Blog",
    title: "Publica contenido, gana autoridad y atrae visitas desde Google.",
    text: "Una buena opcion para proyectos educativos, medios, marcas personales y negocios con contenido frecuente.",
    cta: "Comprar web con blog",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
  },
};

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector("[data-menu]");

menuBtn?.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const data = contentByTab[button.dataset.tab];
    const panel = document.querySelector("[data-panel]");

    document.querySelectorAll("[data-tab]").forEach((tab) => {
      tab.classList.toggle("active", tab === button);
    });

    panel.animate(
      [{ opacity: 0.35, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 320, easing: "ease-out" }
    );

    panel.style.backgroundImage = `linear-gradient(90deg, rgba(0,0,0,.9), rgba(12,8,24,.48)), url("${data.image}")`;
    panel.querySelector(".panel-kicker").textContent = data.kicker;
    panel.querySelector("h3").textContent = data.title;
    panel.querySelector("p:not(.panel-kicker)").textContent = data.text;
    panel.querySelector("a").textContent = data.cta;
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number(entry.target.dataset.count);
      const duration = 1100;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        entry.target.textContent = Math.round(target * eased);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          entry.target.textContent = target;
        }
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll("[data-count]").forEach((item) => countObserver.observe(item));

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelector(".buy-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("[data-form-state]").textContent = "Solicitud recibida. Te contactamos para cerrar detalles.";
});

const pointerGlow = document.createElement("div");
pointerGlow.className = "pointer-glow";
document.body.appendChild(pointerGlow);

window.addEventListener("pointermove", (event) => {
  pointerGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});
