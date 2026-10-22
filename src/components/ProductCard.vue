<template>
  <div class="product-card">
    <div class="card-image-wrap">
      <button class="fav-btn" @click.stop="store.toggleFavorite(product)">
        <svg width="20" height="20" viewBox="0 0 24 24" :fill="store.isFavorite(product.id) ? '#ff0000' : 'none'" stroke="#a0a0a0" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </button>
      <router-link :to="'/product/' + product.id">
        <img :src="product.image" :alt="product.title" class="product-image" @error="handleImageError" />
      </router-link>
    </div>
    <div class="card-info">
      <router-link :to="'/product/' + product.id" class="title">{{ product.title }}</router-link>
      <p class="price">${{ product.price }}</p>
      <router-link :to="'/product/' + product.id" class="btn-primary buy-btn">Buy Now</router-link>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../store'
const store = useStore()
defineProps({
  product: { type: Object, required: true }
})

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found'
}
</script>

<style scoped>
.product-card { background: #f6f6f8; border-radius: 9px; padding: 24px; display: flex; flex-direction: column; align-items: center; transition: transform 0.2s; }
.product-card:hover { transform: translateY(-4px); }
.card-image-wrap { width: 100%; position: relative; display: flex; justify-content: center; margin-bottom: 20px; }
.product-image { width: 160px; height: 160px; object-fit: contain; mix-blend-mode: multiply; }
.fav-btn { position: absolute; top: 0; right: 0; background: transparent; color: #a0a0a0; z-index: 2; }
.card-info { text-align: center; width: 100%; }
.title { font-size: 14px; font-weight: 500; margin-bottom: 8px; display: block; height: 40px; overflow: hidden; color: #1a1a1a; }
.price { font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #1a1a1a; }
.buy-btn { width: 100%; padding: 12px; background: #000; color: #fff; border-radius: 6px; font-weight: 500; display: block; text-align: center; text-decoration: none; }
</style>