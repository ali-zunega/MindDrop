# MindDrop

Aplicación web de notas personales que permite crear, editar, eliminar y categorizar notas con una interfaz intuitiva y organizada.

## Stack

- **React** con **Vite**
- **Material UI** (MUI) para la interfaz de componentes
- **Context API** para manejo de estado global
- **localStorage** para persistencia de datos local

## Instalación

```bash
npm install
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`.

## Scripts

| Comando           | Descripción                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo          |
| `npm run build`   | Compila para producción                   |
| `npm run preview` | Previsualiza el build                     |
| `npm run lint`    | Ejecuta ESLint                            |
| `npm run test`    | Ejecuta la suite de pruebas (Vitest/Jest) |

## Estructura del proyecto

```
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
- **name**: `string`
- **color**: `string` (Código hexadecimal, ej. `#3f51b5`)

## Decisión de diseño: Manejo de estado con Context API

Se eligió **Context API** sobre Redux por las siguientes razones:

1. **Evita Prop Drilling** — Las notas y categorías se consumen desde la Sidebar (filtro), el Buscador y la lista principal. Context permite que cualquier componente acceda a estos datos sin pasarlos manualmente por cada nivel.

2. **Complejidad justificada** — Redux añade boilerplate (store, reducers, actions, dispatch) que no se justifica en una app que persiste datos localmente de forma síncrona. Context API mantiene el código legible y eficiente para este alcance.

3. **Sincronización limpia con localStorage** — El `NotesProvider` inicializa el estado leyendo de localStorage y persiste los cambios automáticamente mediante un `useEffect` cada vez que el estado de notas o categorías se modifica.

## Funcionalidades

- Registro e inicio de sesión de usuarios
- CRUD completo de notas (crear, leer, actualizar, eliminar)
- Asignación y filtrado de notas por categoría
- Búsqueda de notas por título o contenido
- Vista de lista y detalle de nota
- Validaciones en formularios
- Persistencia local con localStorage
