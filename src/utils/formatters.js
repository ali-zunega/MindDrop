export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateLong(iso) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getInitial(name) {
  return name.charAt(0).toUpperCase();
}

export function nowISO() {
  return new Date().toISOString();
}
