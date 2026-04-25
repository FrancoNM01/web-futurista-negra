const contentByTab = {
  servicios: {
    kicker: "Mas consultas",
    title: "Mostra lo que haces y lleva a tus clientes directo a WhatsApp.",
    text: "Ideal para negocios locales, profesionales, estetica, servicios, cursos, tecnicos y marcas personales.",
    cta: "Pedir mi pagina",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
  tienda: {
    kicker: "Vender online",
    title: "Mostra tus productos y facilita que te pidan por WhatsApp.",
    text: "Perfecta para marcas, locales, productos digitales y negocios que quieren vender sin complicarse.",
    cta: "Cotizar tienda",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
  },
  reservas: {
    kicker: "Tomar reservas",
    title: "Hace que tus clientes puedan pedir turno de forma simple.",
    text: "Ideal para estetica, barberias, bienestar, fotografos, entrenadores y servicios por agenda.",
    cta: "Pedir web con turnos",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
  },
  portfolio: {
    kicker: "Mostrar trabajos",
    title: "Transforma tus trabajos en prueba de confianza para vender mas.",
    text: "Pensada para barberias, estetica, construccion, arquitectura, diseno, fotografia y servicios visuales.",
    cta: "Quiero mostrar trabajos",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
  },
  blog: {
    kicker: "Generar confianza",
    title: "Responde dudas antes de que el cliente te escriba.",
    text: "Sumamos beneficios, preguntas frecuentes, reseñas y textos claros para que tu negocio se vea serio.",
    cta: "Quiero generar confianza",
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
  const form = event.currentTarget;
  const name = form.querySelector('input[placeholder="Nombre"]').value.trim();
  const contact = form.querySelector('input[placeholder="WhatsApp o email"]').value.trim();
  const type = form.querySelector("select").value;
  const message = [
    "Hola, quiero una pagina web.",
    name ? `Mi nombre es ${name}.` : "",
    contact ? `Mi contacto es ${contact}.` : "",
    `Estoy interesado en: ${type}.`,
  ].filter(Boolean).join(" ");

  document.querySelector("[data-form-state]").textContent = "Te abrimos WhatsApp para enviar la consulta.";
  window.open(`https://wa.me/543517714398?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

const pointerGlow = document.createElement("div");
pointerGlow.className = "pointer-glow";
document.body.appendChild(pointerGlow);

window.addEventListener("pointermove", (event) => {
  pointerGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

const footer = document.querySelector(".footer");
const whatsappFloat = document.querySelector(".whatsapp-float");

if (footer && whatsappFloat) {
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        whatsappFloat.classList.toggle("is-hidden", entry.isIntersecting);
      });
    },
    { threshold: 0.08 }
  );

  footerObserver.observe(footer);
}
