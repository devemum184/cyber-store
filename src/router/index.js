import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/catalog', name: 'catalog', component: CatalogView },
    { path: '/product/:id', name: 'product', component: ProductView },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/favorites', name: 'favorites', component: FavoritesView }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router