import { createRouter, createWebHistory } from 'vue-router';
import homeRoutes from '@/modules/home/infrastructure/routes';

// Combinar las rutas de los distintos contextos
const routes = [
  ...homeRoutes,     // Rutas del contexto "home"
  // ...noticesRoutes,  // Rutas del contexto "notices"
];

// Crear el router usando el historial web
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
