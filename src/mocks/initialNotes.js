export const INITIAL_NOTES = [
  {
    id: "1",
    title: "Ideas para el diseño de MindDrop",
    content:
      "Usar una paleta basada en #eeccbb para los componentes principales. Buscar un look muy limpio, minimalista y mobile-first.",
    categoryId: "cat-ideas",
    tags: ["diseño", "frontend", "ui"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Resumen: Introducción a Bases de Datos",
    content:
      "Repasar conceptos clave para el parcial: Entidad-Relación, claves primarias, foráneas y normalización.",
    categoryId: "cat-estudio",
    tags: ["parcial", "teoria"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Lista de compras para la semana",
    content:
      "Frutas: manzanas, plátanos, naranjas. Verduras: lechuga, tomates, zanahorias. Proteínas: pollo, tofu.",
    categoryId: "cat-personal",
    tags: ["compras", "semana"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Tareas para el proyecto de backend",
    content:
      "1. Investigar sobre GraphQL. 2. Implementar un endpoint básico. 3. Escribir tests para el backend.",
    categoryId: "cat-trabajo",
    tags: ["proyecto", "backend", "graphql"],
    createdAt: new Date().toISOString(),
  },
];
