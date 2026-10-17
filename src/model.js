export const rates = {
  residencial: 11500,
  comercial: 13500,
  remodelacion: 6500,
};
export const finishes = { esencial: 1, confort: 1.25, premium: 1.6 };
export const stages = [
  "Planeación",
  "Preparación",
  "Estructura",
  "Instalaciones",
  "Acabados",
  "Entrega",
];
export function estimate({ service, area, finish, sustainable = false }) {
  if (!Object.hasOwn(rates, service) || !Object.hasOwn(finishes, finish))
    throw new Error("Selecciona un servicio y un acabado válidos.");
  if (!Number.isFinite(area) || area < 20 || area > 5000)
    throw new Error("La superficie debe estar entre 20 y 5,000 m².");
  const base = Math.round(area * rates[service] * finishes[finish]);
  const eco = sustainable ? Math.round(base * 0.08) : 0;
  const subtotal = base + eco;
  const tax = Math.round(subtotal * 0.16);
  return {
    base,
    eco,
    subtotal,
    tax,
    total: subtotal + tax,
    weeks: Math.ceil(area / 35) + (service === "remodelacion" ? 4 : 8),
  };
}
export function projectProgress(stage) {
  if (!Number.isInteger(stage) || stage < 0 || stage >= stages.length)
    throw new Error("Etapa no válida.");
  return Math.round((stage / (stages.length - 1)) * 100);
}
