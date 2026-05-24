# MindDrop

Aplicación web de notas personales que permite crear, editar, eliminar y categorizar notas con una interfaz intuitiva y organizada.

---

## Stack Tecnológico

- **React** para componentes y hooks
- **Vite** para build y dev server
- **Material UI** y **CSS** para estilos
- **Context API** para manejo de estado global
- **localStorage** para persistencia de datos local

---

## Instalación y configuración

1. Clona el repositorio:

```bash
git clone https://github.com/ali-zunega/MindDrop.git
```

2. Navega a la carpeta del proyecto:

```bash
cd MindDrop
```

3. Instala dependencias:

```bash
npm install
```

4. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`.

---

## Scripts

| Comando           | Descripción                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo |
| `npm run build`   | Compila para producción          |
| `npm run preview` | Previsualiza el build            |
| `npm run lint`    | Ejecuta ESLint                   |
| `npm run test`    | Ejecuta la suite de pruebas      |

---

## Estructura del proyecto

```bash
src/
├── components/        # Componentes de la UI
│   ├── folders/       #   FolderCard, FolderList
│   └── notes/         #   NoteCard, NoteForm, NoteDetail, NotesList
├── context/           # Estado global de la app
│   ├── NotesProvider.jsx
│   └── notesContext.js
├── hooks/             # Custom hooks
│   └── useNotes.js
├── mocks/             # Datos mock iniciales
│   ├── categories.js
│   └── initialNotes.js
├── services/          # Persistencia en localStorage
│   └── notesService.js
├── views/             # Vistas principales
│   └── Dashboard.jsx
├── App.jsx
└── main.jsx
```

---

## Modelo de datos

### note

```json
{
  "id": "note-001",
  "title": "Ideas para el próximo deploy",
  "content": "Revisar las variables de entorno en Vercel.",
  "categoryId": "cat-work",
  "tags": ["deploy", "backend"],
  "createdAt": "2026-05-20T23:00:00.000Z",
  "updatedAt": "2026-05-20T23:30:00.000Z"
}
```

Campos y tipos de datos:

- **id**: `string` (UUID único de la nota)
- **title**: `string`
- **content**: `string`
- **categoryId**: `string | null` (Relación con `category.id`)
- **tags**: `string[]` (Etiquetas libres)
- **createdAt**: `string` (Formato ISO 8601 — fecha de creación)
- **updatedAt**: `string` (Formato ISO 8601 — fecha de última modificación)

### category

```json
{
  "id": "cat-work",
  "name": "Trabajo",
  "slug": "trabajo",
  "color": "#3f51b5",
  "icon": "briefcase"
}
```

Campos y tipos de datos:

- **id**: `string` (UUID único de la categoría)
- **name**: `string` (Personal | Estudio | Trabajo | Ideas)
- **slug**: `string`
- **color**: `string` (Código hexadecimal, ej. `#3f51b5`)
- **icon**: `string` (user | book | briefcase | lightbulb | folder)

---

## 📌 Decisiones de Diseño

### ¿Por qué usamos Context API?

Se eligió **Context API** porque es la herramienta nativa de React para compartir información entre componentes sin complicaciones.

- **Evita pasar datos "mano en mano"**: Componentes como el formulario y la lista de notas acceden al mismo estado sin prop drilling.
- **Sin código de más**: A diferencia de Redux, Context no requiere configuración compleja ni librerías extra.
- **Guardado automático**: Centraliza la lectura y escritura con `localStorage` de forma limpia.

### ¿Por qué usar Carpetas + Etiquetas (Tags)?

Se optó por un sistema mixto para organizar las notas de forma intuitiva sin saturar al usuario:

- **Carpetas por categoría**: 4 bloques (_Personal, Estudio, Trabajo, Ideas_) más una carpeta virtual _Sin categoría_. Cada nota pertenece a una sola y se accede a través de la navegación por carpetas.
- **Etiquetas libres**: Los tags (`#importante`, `#codigo`) son transversales y conectan notas de diferentes carpetas.

---

## Funcionalidades

- CRUD completo de notas (crear, leer, actualizar, eliminar)
- Navegación por carpetas con categorías fijas (Personal, Estudio, Trabajo, Ideas)
- Etiquetas (tags) libres por nota
- Vista de lista con preview: título, tags y fecha de creación/modificación
- Vista detalle con contenido completo, tags, fechas y botones editar/eliminar
- Sidebar con carpetas en desktop para navegación persistente
- Mobile-first con diseño responsive y FAB
- Persistencia local con localStorage
- Datos mock iniciales al primer uso
