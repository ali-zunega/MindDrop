const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

export function minLength(str, min) {
  return str.trim().length >= min;
}

export function validateRequired(fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || (typeof value === "string" && !value.trim())) {
      return { valid: false, field: key };
    }
  }
  return { valid: true, field: null };
}

export function validateNoteForm({ title, content }) {
  const errors = {};
  if (!title.trim()) errors.title = "El título es obligatorio";
  if (!content.trim()) errors.content = "El contenido es obligatorio";
  else if (content.trim().length < 10)
    errors.content = "Debe tener al menos 10 caracteres";
  return errors;
}
