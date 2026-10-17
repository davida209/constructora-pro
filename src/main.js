import "./style.css";
import {
  shell,
  footer,
  bindMenu,
  money,
  esc,
  load,
  save,
  modal,
  toast,
  empty,
} from "./utils.js";
import { estimate, projectProgress, stages } from "./model.js";
const stored = load("les-construction-v1", {});
let quotes = Array.isArray(stored?.quotes) ? stored.quotes : [];
let projects = Array.isArray(stored?.projects) ? stored.projects : [];
const serviceNames = {
  residencial: "Construcción residencial",
  comercial: "Espacios comerciales",
  remodelacion: "Remodelación",
};
const works = [
  {
    name: "Casa Patio",
    category: "Residencial",
    image: "/images/house.jpg",
    type: "Vivienda / 180 m²",
    description:
      "Espacios abiertos, luz natural y una relación cercana con el exterior. Proyecto conceptual de muestra.",
  },
  {
    name: "Oficinas Norte",
    category: "Comercial",
    image: "/images/building.jpg",
    type: "Oficinas / 420 m²",
    description:
      "Una propuesta de oficinas que combina áreas de encuentro y espacios de trabajo. Proyecto conceptual de muestra.",
  },
  {
    name: "Estudio Central",
    category: "Remodelación",
    image: "/images/interior.jpg",
    type: "Interior / 85 m²",
    description:
      "Reorganización de un espacio para darle una nueva forma de habitar. Proyecto conceptual de muestra.",
  },
];
document.querySelector("#app").innerHTML =
  `${shell({ brand: "Constructora Pro", mark: "CP", nav: '<a href="#servicios">Servicios</a><a href="#obras">Obras</a><a href="#cotizar">Cotizador</a><button id="portal">Portal demo ↗</button>' })}<main id="main"><section class="hero"><div class="engineering-copy"><p class="eyebrow">CP / DISEÑO · PLANIFICACIÓN · OBRA</p><h1>Construir<br>con <span>criterio.</span></h1><p>Arquitectura que responde al espacio. Planificación que da claridad a cada decisión. Explora nuestros proyectos conceptuales y configura el tuyo.</p><div class="engineering-actions"><a class="btn" href="#cotizar">Estimar mi proyecto ↗</a><a href="#obras">VER PROYECTOS / 01—03</a></div></div><div class="engineering-photo"><img src="/images/house.jpg" alt="Referencia de arquitectura residencial contemporánea" fetchpriority="high"><div class="drawing-caption"><span>CP—001 / CASA PATIO</span><span>ESTUDIO CONCEPTUAL</span></div></div></section><div class="engineering-strip"><div><strong>Residencial</strong><span>Espacios para habitar</span></div><div><strong>Comercial</strong><span>Entornos para trabajar</span></div><div><strong>Remodelación</strong><span>Una nueva distribución</span></div><div><strong>Portal de obra</strong><span>Planificación en 6 etapas</span></div></div><section class="section" id="servicios"><div class="section-title"><div><p class="eyebrow">UNA VISIÓN INTEGRAL</p><h2>Una disciplina. Tres escalas.</h2></div><p>Servicios ilustrativos para probar el proceso de estimación y seguimiento.</p></div><div class="steps"><div class="step"><span>01 /</span><h3>Residencial</h3><p>Viviendas pensadas alrededor de los espacios, las necesidades y el ritmo de cada día.</p></div><div class="step"><span>02 /</span><h3>Comercial</h3><p>Entornos de trabajo y encuentro que conectan la operación con la identidad de un negocio.</p></div><div class="step"><span>03 /</span><h3>Remodelación</h3><p>Una nueva lectura de los espacios existentes: distribución, acabados y funcionalidad.</p></div></div></section><section class="section alt" id="obras"><div class="section-title"><div><p class="eyebrow">PORTAFOLIO CONCEPTUAL</p><h2>Proyectos seleccionados.</h2></div><div class="chips" id="work-filters">${["Todas", "Residencial", "Comercial", "Remodelación"].map((x, i) => `<button class="chip ${i === 0 ? "active" : ""}" data-filter="${x}" aria-pressed="${i === 0}">${x}</button>`).join("")}</div></div><div class="card-grid" id="works"></div></section><section class="section" id="cotizar"><div class="split"><div><p class="eyebrow">PRIMER PASO / COTIZACIÓN</p><h2>Dale dimensión<br>a tu próximo proyecto.</h2><p style="margin-top:22px;color:var(--muted)">Explora cómo cambia una estimación al ajustar la superficie, el tipo de obra y los acabados.</p><p class="notice">El cálculo es ilustrativo, con tarifas ficticias. No es una oferta comercial ni una cotización profesional.</p><div class="panel"><h3>Cómo se calcula</h3><p class="hint">Superficie × tarifa por m² × acabado. La opción sustentable añade 8% al costo base. Se aplica 16% de IVA al subtotal para ilustrar el desglose.</p><div class="list-row"><span>Residencial</span><strong>${money(11500)} / m²</strong></div><div class="list-row"><span>Comercial</span><strong>${money(13500)} / m²</strong></div><div class="list-row"><span>Remodelación</span><strong>${money(6500)} / m²</strong></div></div></div><form class="panel" id="quote-form"><h3>Configura tu obra</h3><div class="field"><label for="service">Tipo de proyecto</label><select name="service" id="service"><option value="residencial">Construcción residencial</option><option value="comercial">Espacios comerciales</option><option value="remodelacion">Remodelación</option></select></div><div class="form-grid"><div class="field"><label for="area">Superficie en m²</label><input id="area" name="area" type="number" min="20" max="5000" value="120" required></div><div class="field"><label for="finish">Acabados</label><select name="finish" id="finish"><option value="esencial">Esencial · ×1.00</option><option value="confort">Confort · ×1.25</option><option value="premium">Premium · ×1.60</option></select></div></div><label style="display:flex;gap:12px;align-items:center"><input name="sustainable" type="checkbox" style="width:18px;min-height:18px"> Paquete sustentable · +8%</label><div id="quote-result" class="summary" aria-live="polite"></div><div class="field"><label for="project-name">Nombre del proyecto de prueba</label><input id="project-name" name="projectName" maxlength="80" value="Mi próxima obra" required></div><button class="btn wide" type="submit">Guardar estimación demo</button><p class="hint" style="margin-top:12px">Puedes consultarla y crear un seguimiento desde Portal demo.</p></form></div></section></main>${footer("Constructora Pro", "les-construction-v1")}`;
bindMenu();
const form = document.querySelector("#quote-form");
const current = () => ({
  service: form.service.value,
  area: Number(form.area.value),
  finish: form.finish.value,
  sustainable: form.sustainable.checked,
});
function persist() {
  save("les-construction-v1", { quotes, projects });
}
function renderQuote() {
  try {
    const q = estimate(current());
    document.querySelector("#quote-result").innerHTML =
      `<div class="list-row"><span>Costo base</span><strong>${money(q.base)}</strong></div>${q.eco ? `<div class="list-row"><span>Sustentabilidad</span><strong>${money(q.eco)}</strong></div>` : ""}<div class="list-row"><span>IVA de ejemplo (16%)</span><strong>${money(q.tax)}</strong></div><div class="list-row"><span>Estimación total</span><strong class="total">${money(q.total)}</strong></div><p class="hint">Plazo orientativo: ${q.weeks} semanas. Tarifas de muestra.</p>`;
  } catch (e) {
    document.querySelector("#quote-result").textContent = e.message;
  }
}
form.addEventListener("input", renderQuote);
form.onsubmit = (e) => {
  e.preventDefault();
  try {
    const config = current();
    const result = estimate(config);
    const name = form.projectName.value.trim();
    if (!name) throw new Error("Escribe el nombre del proyecto.");
    quotes.unshift({
      id: crypto.randomUUID(),
      name,
      config,
      result,
      date: new Date().toLocaleDateString("es-MX"),
    });
    persist();
    toast("Estimación demo guardada. Consúltala en el portal.");
  } catch (error) {
    toast(error.message);
  }
};
function renderWorks(category = "Todas") {
  document.querySelector("#works").innerHTML = works
    .filter((w) => category === "Todas" || w.category === category)
    .map(
      (w, i) =>
        `<article class="card"><div class="card-image"><img src="${w.image}" alt="Fotografía de referencia para ${w.name}" loading="lazy"><span class="badge">${w.category}</span></div><div class="card-content"><p class="eyebrow">${w.type}</p><h3>${w.name}</h3><p>${w.description}</p><button class="btn secondary small" data-work="${w.name}" style="margin-top:20px">Ver concepto ↗</button></div></article>`,
    )
    .join("");
  document.querySelectorAll("[data-work]").forEach(
    (b) =>
      (b.onclick = () => {
        const w = works.find((w) => w.name === b.dataset.work);
        modal(
          w.name,
          `<img src="${w.image}" alt="Referencia arquitectónica" style="height:240px;width:100%;border-radius:4px"><h3>${w.type}</h3><p>${w.description}</p><p class="notice">Este proyecto y la fotografía son referencias de demostración; no representan una obra ejecutada por una empresa real.</p>`,
        );
      }),
  );
}
document.querySelectorAll("[data-filter]").forEach(
  (b) =>
    (b.onclick = () => {
      document.querySelectorAll("[data-filter]").forEach((x) => {
        x.classList.toggle("active", x === b);
        x.setAttribute("aria-pressed", x === b);
      });
      renderWorks(b.dataset.filter);
    }),
);
function showPortal(tab = "quotes") {
  const el = modal(
    "Portal de proyectos",
    `<div class="chips" style="margin-bottom:24px"><button class="chip ${tab === "quotes" ? "active" : ""}" id="tab-quotes">Estimaciones (${quotes.length})</button><button class="chip ${tab === "projects" ? "active" : ""}" id="tab-projects">Seguimiento (${projects.length})</button></div>${tab === "quotes" ? (quotes.length ? quotes.map((q) => `<div class="panel" style="margin-bottom:15px"><span class="badge">${esc(q.date)}</span><h3>${esc(q.name)}</h3><p>${esc(serviceNames[q.config.service])} · ${q.config.area} m²</p><div class="card-row"><strong>${money(q.result.total)}</strong><button class="btn small" data-start="${esc(q.id)}" ${projects.some((p) => p.quoteId === q.id) ? "disabled" : ""}>${projects.some((p) => p.quoteId === q.id) ? "Seguimiento creado" : "Crear seguimiento"}</button></div></div>`).join("") : empty("Aún no hay estimaciones", "Utiliza el cotizador y guarda una propuesta de prueba.")) : projects.length ? projects.map((p) => `<div class="panel" style="margin-bottom:15px"><span class="badge">${p.stage === 5 ? "Entregado" : "En curso"}</span><h3>${esc(p.name)}</h3><p>Etapa ${p.stage + 1} / 6 · ${stages[p.stage]}</p><div class="progress"><span style="width:${projectProgress(p.stage)}%"></span></div><div class="list-row"><span>Avance simulado</span><strong>${projectProgress(p.stage)}%</strong></div><div class="list-row"><span>Presupuesto de muestra</span><strong>${money(p.total)}</strong></div><div class="card-row"><button class="btn secondary small" data-back="${esc(p.id)}" ${p.stage === 0 ? "disabled" : ""}>← Etapa anterior</button><button class="btn small" data-next="${esc(p.id)}" ${p.stage === 5 ? "disabled" : ""}>Avanzar etapa →</button></div><p class="hint" style="margin-top:15px">Simulación controlada por el visitante, sin seguimiento de obra real.</p></div>`).join("") : empty("No hay obras de prueba", "Crea un seguimiento desde una estimación guardada.")}`,
  );
  el.querySelector("#tab-quotes").onclick = () => showPortal("quotes");
  el.querySelector("#tab-projects").onclick = () => showPortal("projects");
  el.querySelectorAll("[data-start]").forEach(
    (b) =>
      (b.onclick = () => {
        const q = quotes.find((q) => q.id === b.dataset.start);
        if (projects.some((p) => p.quoteId === q.id)) return;
        projects.unshift({
          id: crypto.randomUUID(),
          quoteId: q.id,
          name: q.name,
          total: q.result.total,
          stage: 0,
        });
        persist();
        showPortal("projects");
      }),
  );
  ["next", "back"].forEach((action) =>
    el.querySelectorAll("[data-" + action + "]").forEach(
      (b) =>
        (b.onclick = () => {
          const p = projects.find((p) => p.id === b.dataset[action]);
          p.stage = Math.min(
            5,
            Math.max(0, p.stage + (action === "next" ? 1 : -1)),
          );
          persist();
          showPortal("projects");
        }),
    ),
  );
}
document.querySelector("#portal").onclick = () => showPortal();
renderWorks();
renderQuote();
