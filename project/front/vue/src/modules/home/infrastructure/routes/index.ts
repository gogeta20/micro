// Importar los componentes de Vue relacionados con el contexto "home"
// import HomeView from '@/modules/home/views/HomeView.vue';
import HomeView from '@/modules/home/views/HomeView.vue';
import AboutView from '@/modules/home/views/AboutView.vue';

// Definir las rutas específicas para el contexto "home"
const homeRoutes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
];

export default homeRoutes;
