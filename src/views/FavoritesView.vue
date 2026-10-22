<template>
  <div class="favorites-view container">
    <h1>Favorite</h1>
    <div class="favorites-layout" v-if="store.favorites.length > 0">
      <div class="fav-item" v-for="item in store.favorites" :key="item.id">
        <img :src="item.image" :alt="item.title" class="fav-img" />
        <div class="fav-info">
          <h3>{{ item.title }}</h3>
          <p class="fav-price">${{ item.price }}</p>
        </div>
        <button class="btn-primary" @click="store.addToCart(item)">Add to Cart</button>
        <button class="remove-btn" @click="store.toggleFavorite(item)">×</button>
      </div>
    </div>
    <div v-else class="empty-favorites">
      <h2>Your favorites list is empty</h2>
      <router-link to="/catalog" class="btn-primary">Go to Catalog</router-link>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../store'
const store = useStore()
</script>

<style scoped>
.favorites-view { margin-top: 40px; }
.favorites-view h1 { font-size: 32px; margin-bottom: 40px; }
.favorites-layout { display: flex; flex-direction: column; gap: 20px; }
.fav-item { display: flex; align-items: center; gap: 24px; padding: 24px; background: #f5f5f7; border-radius: 12px; }
.fav-img { width: 80px; height: 80px; object-fit: contain; }
.fav-info { flex: 1; }
.fav-info h3 { font-size: 16px; margin-bottom: 8px; font-weight: 500; }
.fav-price { font-weight: 600; font-size: 18px; }
.remove-btn { background: transparent; font-size: 24px; color: #a0a0a0; }
.empty-favorites { text-align: center; padding: 80px 0; }
.empty-favorites h2 { margin-bottom: 24px; color: #a0a0a0; }
</style>