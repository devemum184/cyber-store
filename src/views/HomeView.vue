<template>
  <div class="home-view">
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-text">
          <span class="subtitle">Pro.Beyond.</span>
          <h1>iPhone 14 Pro</h1>
          <p>Created to change everything for the better. For everyone</p>
          <router-link to="/catalog" class="btn-outline" style="border-color: #fff; color: #fff; display: inline-block;">Shop Now</router-link>
        </div>
        <div class="hero-img-wrapper">
          <img :src="ip14h" alt="iPhone 14 Pro" class="hero-img" />
        </div>
      </div>
    </section>

    <section class="banners container">
      <div class="banner-large">
        <div class="banner-content">
          <h2>Playstation 5</h2>
          <p>Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
        </div>
        <img :src="ps5h" alt="Playstation 5" class="banner-img-ps" />
      </div>
      <div class="banner-side">
        <div class="banner-dark banner-mac">
          <div class="banner-content">
            <h3>Macbook Air</h3>
            <p>The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
            <button class="btn-outline" style="border-color: #fff; color: #fff; margin-top: 16px;">Shop Now</button>
          </div>
          <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665" alt="Macbook" class="banner-img-mac" />
        </div>
        <div class="banner-light banner-airpods">
          <div class="banner-content">
            <h3>AirPods Max</h3>
            <p>Computational audio. Listen, it's powerful</p>
          </div>
          <img :src="airpodsh" alt="AirPods Max" class="banner-img-airpods" />
        </div>
        <div class="banner-dark banner-vision">
          <div class="banner-content">
            <h3>Vision Pro</h3>
            <p>An immersive way to experience entertainment</p>
          </div>
          <img :src="visionh" alt="Vision Pro" class="banner-img-vision" />
        </div>
      </div>
    </section>

    <section class="categories container">
      <h2>Browse By Category</h2>
      <div class="category-list">
        <router-link to="/catalog" class="cat-item"><span>Phones</span></router-link>
        <router-link to="/catalog" class="cat-item"><span>Smart Watches</span></router-link>
        <router-link to="/catalog" class="cat-item"><span>Cameras</span></router-link>
        <router-link to="/catalog" class="cat-item"><span>Headphones</span></router-link>
        <router-link to="/catalog" class="cat-item"><span>Computers</span></router-link>
        <router-link to="/catalog" class="cat-item"><span>Gaming</span></router-link>
      </div>
    </section>

    <section class="products container">
      <div class="section-header">
        <div class="tabs">
          <span class="active">New Arrival</span>
          <span>Bestseller</span>
          <span>Featured Products</span>
        </div>
      </div>
      <div v-if="store.isLoading" class="loading">Loading...</div>
      <div v-else class="product-grid">
        <ProductCard v-for="product in store.products.slice(0, 4)" :key="product.id" :product="product" />
      </div>
    </section>

    <section class="popular container">
       <div class="popular-grid">
         <div class="pop-card">
           <h3>Popular Products</h3>
           <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
           <router-link to="/catalog" class="btn-outline">Shop Now</router-link>
         </div>
         <div class="pop-card">
           <h3>iPad Pro</h3>
           <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
           <router-link to="/catalog" class="btn-outline">Shop Now</router-link>
         </div>
         <div class="pop-card">
           <h3>Samsung Galaxy</h3>
           <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
           <router-link to="/catalog" class="btn-outline">Shop Now</router-link>
         </div>
         <div class="pop-card dark">
           <h3>Macbook Pro</h3>
           <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
           <router-link to="/catalog" class="btn-outline" style="border-color:#fff; color:#fff">Shop Now</router-link>
         </div>
       </div>
    </section>

    <section class="products container">
      <div class="section-header">
        <h2>Discounts up to -50%</h2>
      </div>
      <div v-if="store.isLoading" class="loading">Loading...</div>
      <div v-else class="product-grid">
        <ProductCard v-for="product in store.products.slice(4, 8)" :key="product.id" :product="product" />
      </div>
    </section>

    <section class="sale-banner">
      <div class="container sale-inner">
        <div class="sale-left">
           <img :src="planshet2sale" alt="Tablet" class="sale-img-tablet" />
        </div>
        <div class="sale-content">
          <h2>Big Summer Sale</h2>
          <p>Commodo fames vitae vitae leo in varius.</p>
          <router-link to="/catalog" class="btn-outline" style="border-color: #fff; color: #fff; display: inline-block;">Shop Now</router-link>
        </div>
        <div class="sale-right">
          <img :src="iphsale" alt="Phone" class="sale-img-phone" />
          <img :src="watchsale" alt="Watch" class="sale-img-watch" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '../store'
import ProductCard from '../components/ProductCard.vue'

import ip14h from '../assets/images/ip14h.png'
import ps5h from '../assets/images/ps5h.png'
import airpodsh from '../assets/images/airpodsh.png'
import visionh from '../assets/images/visionh.png'
import planshetsale from '../assets/images/planshetsale.png'
import planshet2sale from '../assets/images/planshet2sale.png'
import iphsale from '../assets/images/iphsale.png'
import watchsale from '../assets/images/watchsale.png'

const store = useStore()

onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts()
  }
})
</script>

<style scoped>
.hero { background: #211c24; color: #fff; padding: 80px 0; overflow: hidden; }
.hero-inner { display: flex; align-items: center; justify-content: space-between; position: relative; }
.hero-text { max-width: 500px; z-index: 2; }
.subtitle { font-size: 24px; color: #909090; margin-bottom: 16px; display: block; }
.hero-text h1 { font-size: 72px; font-weight: 600; margin-bottom: 16px; }
.hero-text p { font-size: 18px; color: #909090; margin-bottom: 32px; }
.hero-img-wrapper { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 60%; height: 120%; display: flex; justify-content: flex-end; pointer-events: none; }
.hero-img { height: 100%; object-fit: contain; object-position: right center; }

.banners { display: flex; gap: 20px; margin-top: 80px; align-items: stretch; }
.banner-large { background: #f5f5f7; border-radius: 12px; flex: 1; display: flex; align-items: center; justify-content: space-between; padding: 40px; overflow: hidden; position: relative; }
.banner-large .banner-content { flex: 1; z-index: 2; }
.banner-img-ps { position: absolute; right: 0; bottom: 0; height: 120%; object-fit: contain; }
.banner-side { flex: 1; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 20px; }
.banner-side .banner-dark { background: #2c2c2c; color: #fff; border-radius: 12px; display: flex; padding: 30px; overflow: hidden; position: relative; }
.banner-side .banner-light { background: #f5f5f7; border-radius: 12px; display: flex; padding: 30px; overflow: hidden; position: relative; }
.banner-mac { grid-column: 1 / -1; }
.banner-mac .banner-content { width: 60%; z-index: 2; }
.banner-img-mac { position: absolute; right: 0; bottom: 0; height: 100%; width: 40%; object-fit: cover; border-radius: 0 12px 12px 0; }
.banner-airpods .banner-content { z-index: 2; }
.banner-img-airpods { position: absolute; bottom: -20px; right: -20px; width: 150px; height: auto; transform: rotate(-15deg); }
.banner-vision .banner-content { z-index: 2; }
.banner-img-vision { position: absolute; bottom: -10px; right: -10px; width: 120px; height: auto; }
.banner-content h2 { font-size: 32px; margin-bottom: 8px; }
.banner-content h3 { font-size: 24px; margin-bottom: 8px; }
.banner-content p { font-size: 14px; color: #909090; line-height: 1.4; }
.banner-dark p { color: #a0a0a0; }

.categories { margin-top: 80px; }
.categories h2 { font-size: 24px; margin-bottom: 32px; }
.category-list { display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; }
.cat-item { background: #f5f5f7; padding: 24px; border-radius: 12px; text-align: center; font-size: 14px; font-weight: 500; cursor: pointer; transition: background 0.2s; display: block; color: inherit; }
.cat-item:hover { background: #e5e5e5; }

.products { margin-top: 80px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
.tabs { display: flex; gap: 32px; color: #a0a0a0; font-size: 16px; font-weight: 500; }
.tabs .active { color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 4px; }
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

.popular-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 80px; }
.pop-card { background: #f5f5f7; padding: 32px; border-radius: 12px; display: flex; flex-direction: column; justify-content: space-between; min-height: 300px; }
.pop-card.dark { background: #2c2c2c; color: #fff; }
.pop-card h3 { font-size: 24px; margin-bottom: 12px; }
.pop-card p { font-size: 14px; color: #6a6a6a; margin-bottom: 24px; line-height: 1.5; }
.pop-card.dark p { color: #a0a0a0; }
.pop-card .btn-outline { width: fit-content; display: inline-block; text-align: center; }

.sale-banner { background: #211c24; color: #fff; padding: 80px 0; margin-top: 80px; overflow: hidden; }
.sale-inner { display: flex; align-items: center; justify-content: space-between; text-align: center; position: relative; }
.sale-content { flex: 1; z-index: 2; }
.sale-content h2 { font-size: 48px; margin-bottom: 16px; }
.sale-content p { color: #909090; margin-bottom: 32px; }

.sale-left { position: absolute; left: -50px; top: 50%; transform: translateY(-50%); width: 400px; height: 300px; z-index: 1; }
.sale-img-tablet { width: 100%; height: 100%; object-fit: contain; }

.sale-right { position: absolute; right: -50px; top: 50%; transform: translateY(-50%); width: 400px; height: 300px; z-index: 1; }
.sale-img-phone { position: absolute; right: 0; top: 50%; transform: translateY(-50%) rotate(15deg); width: 200px; height: auto; }
.sale-img-watch { position: absolute; right: 120px; bottom: -20px; width: 180px; height: auto; transform: rotate(-10deg); }

.loading { text-align: center; padding: 40px; font-size: 18px; color: #a0a0a0; }
</style>