# MindDrop

Aplicación web de notas personales que permite crear, editar, eliminar y categorizar notas con una interfaz intuitiva y organizada.

---

## Stack Tecnológico

- **React** para componentes y hooks
- **Vite** para
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

| Comando           | Descripción                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo          |
| `npm run build`   | Compila para producción                   |
| `npm run preview` | Previsualiza el build                     |
| `npm run lint`    | Ejecuta ESLint                            |
| `npm run test`    | Ejecuta la suite de pruebas (Vitest/Jest) |

---

## Estructura del proyecto

```bash
src/
├── assets/            # Imágenes, logos, estilos globales
├── components/        # Componentes reutilizables de la UI
│   ├── common/        #   Botones, Inputs, Modales
│   └── layout/        #   Navbar, Sidebar (categorías)
├── context/           # Estado global de la app
│   ├── AuthContext.jsx
│   └── NotesContext.jsx
├── hooks/             # Custom hooks
│   ├── useAuth.js
│   └── useNotes.js
├── pages/             # Vistas principales
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── NotesDashboard.jsx
│   └── NoteDetail.jsx
├── services/          # Persistencia en localStorage
│   └── storage.js
├── utils/             # Validaciones y utilidades
│   └── validators.js
└── __tests__/         # Tests unitarios / de integración
```

---

## Modelo de datos

### user o currentUser

```json
{
  "id": "user-123",
  "email": "alicia@dev.com",
  "password": "password_mock"
}
```

Campos y tipos de datos:

- **id**: `string` (UUID único del usuario)
- **email**: `string` (Correo electrónico del usuario)
- **password**: `string` (Contraseña en texto plano — solo para mock local)

### note

```json
{
  "id": "note-001",
  "userId": "user-123",
  "title": "Ideas para el próximo deploy",
  "content": "Revisar las variables de entorno en Vercel.",
  "categoryId": "cat-work",
  "createdAt": "2026-05-20T23:00:00.000Z",
  "updatedAt": "2026-05-20T23:30:00.000Z"
}
```

Campos y tipos de datos:

- **id**: `string` (UUID único de la nota)
- **userId**: `string` (ID del usuario propietario, relación con `user.id`)
- **title**: `string`
- **content**: `string`
- **categoryId**: `string | null` (Relación con `category.id`, opcional)
- **createdAt**: `string` (Formato ISO 8601)
- **updatedAt**: `string` (Formato ISO 8601)

### category

```json
{
  "id": "cat-work",
  "userId": "user-123",
  "name": "Trabajo",
  "color": "#3f51b5"
}
```

Campos y tipos de datos:

- **id**: `string` (UUID único de la categoría)
- **userId**: `string` (ID del usuario propietario, relación con `user.id`)
- **name**: `string` (Personal | Trabajo | Estudio | Ideas)
- **color**: `string` (Código hexadecimal, ej. `#3f51b5`)

---

## 📌 Decisiones de Diseño

### ¿Por qué usamos Context API?

Se eligió **Context API** porque es la herramienta nativa de React para compartir información entre componentes sin complicaciones.

- **Evita pasar datos "mano en mano":** Componentes alejados como la barra lateral (filtros), el buscador y la lista de notas necesitan acceder a la misma información. Context les da acceso directo.
- **Sin código de más:** A diferencia de Redux, Context no requiere configurar archivos complejos ni librerías extra, manteniendo la aplicación ligera y fácil de mantener para este alcance.
- **Guardado automático:** Nos permite centralizar la lectura y escritura con `localStorage` en un solo lugar de forma limpia.

### ¿Por qué usar 4 Categorías + Etiquetas (Tags)?

Se optó por un sistema mixto para organizar las notas de forma intuitiva sin saturar al usuario:

- **Categorías fijas:** Se definieron 4 grandes bloques (_Personal, Estudio, Trabajo, Ideas_). Cada nota pertenece a uno solo. Esto da una estructura base inmediata.
- **Etiquetas libres:** Los tags (`#importante`, `#codigo`, `#parcial`) son libres y transversales. Sirven para dar profundidad y conectar notas de diferentes categorías.

### Punto de conexión

El estado de las notas, las categorías disponibles y los filtros activos (qué categoría o tag está haciendo clic el usuario) viven juntos dentro del mismo Context.

Esto permite que, cuando el usuario escribe en el buscador o cambia de categoría en la barra lateral, la lista de notas se actualice en tiempo real cruzando ambos filtros de forma inmediata.

---

## Funcionalidades

- Registro e inicio de sesión de usuarios
- CRUD completo de notas (crear, leer, actualizar, eliminar)
- Asignación y filtrado de notas por categoría
- Búsqueda de notas por título o contenido
- Vista de lista y detalle de nota
- Validaciones en formularios
- Persistencia local con localStorage
