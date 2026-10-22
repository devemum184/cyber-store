<template>
  <header class="header">
    <div class="container header-inner">
      <router-link to="/" class="logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        cyber
      </router-link>
      <div class="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div class="header-actions">
        <router-link to="/favorites" class="icon-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span v-if="store.favoritesCount" class="badge">{{ store.favoritesCount }}</span>
        </router-link>
        <router-link to="/cart" class="icon-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span v-if="store.cartCount" class="badge">{{ store.cartCount }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useStore } from '../store'
const store = useStore()
</script>

<style scoped>
.header { border-bottom: 1px solid #e5e5e5; padding: 16px 0; }
.header-inner { display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 8px; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
.search-bar { flex: 1; max-width: 400px; margin: 0 40px; }
.search-bar input { width: 100%; padding: 10px 16px; background-color: #f5f5f5; border: none; border-radius: 8px; font-size: 14px; outline: none; }
.header-actions { display: flex; gap: 24px; }
.icon-btn { position: relative; color: #1a1a1a; }
.badge { position: absolute; top: -8px; right: -8px; background: #000; color: #fff; font-size: 10px; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
</style>