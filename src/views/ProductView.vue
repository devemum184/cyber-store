<template>
  <div class="product-view container" v-if="product">
    <div class="product-main">
      <div class="gallery">
        <img :src="product.image" :alt="product.title" class="main-image" @error="handleImageError" />
      </div>
      <div class="details">
        <h1>{{ product.title }}</h1>
        <div class="price-row">
          <span class="price">${{ product.price }}</span>
          <span class="old-price" v-if="product.discount_price">${{ product.price + 100 }}</span>
        </div>
        <div class="specs">
          <div class="spec-item"><span>Brand</span><b>{{ product.brand }}</b></div>
          <div class="spec-item"><span>CPU</span><b>{{ getChar('Процессор') }}</b></div>
          <div class="spec-item"><span>Screen</span><b>{{ getChar('Диагональ') }}"</b></div>
          <div class="spec-item"><span>Battery</span><b>{{ getChar('Аккумулятор') }} mAh</b></div>
        </div>
        <p class="desc">Enhanced capabilities thanks to an enlarged display of 6.7 inches and work without recharging throughout the day. Incredible photos in weak and bright light using the new system with two cameras more...</p>
        <div class="actions">
          <button class="btn-outline" @click="store.toggleFavorite(product)">Add to Wishlist</button>
          <button class="btn-primary" @click="store.addToCart(product)">Add to Card</button>
        </div>
        <div class="delivery-info">
          <div class="info-item"><span>Free Delivery</span><small>1-2 day</small></div>
          <div class="info-item"><span>In Stock</span><small>Today</small></div>
          <div class="info-item"><span>Guaranteed</span><small>1 year</small></div>
        </div>
      </div>
    </div>

    <div class="details-table">
      <h2>Details</h2>
      <div class="table-row" v-for="char in product.characteristics" :key="char.characteristic">
        <span>{{ char.characteristic }}</span>
        <span>{{ char.value }} {{ char.unit_type === 'значение' ? '' : char.unit_type }}</span>
      </div>
    </div>

    <div class="related">
      <h2>Related Products</h2>
      <div class="product-grid">
        <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
      </div>
    </div>
  </div>
  <div v-else-if="store.isLoading" class="container loading">Loading...</div>
  <div v-else class="container loading">Product not found</div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const store = useStore()

const product = computed(() => {
  return store.products.find(p => String(p.id) === String(route.params.id))
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return store.products.filter(p => String(p.id) !== String(route.params.id) && p.category === product.value.category).slice(0, 4)
})

const getChar = (name) => {
  if (!product.value || !product.value.characteristics) return ''
  const c = product.value.characteristics.find(c => c.characteristic === name)
  return c ? c.value : ''
}

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found'
}

onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts()
  }
})
</script>

<style scoped>
.product-view { margin-top: 40px; }
.product-main { display: flex; gap: 60px; margin-bottom: 80px; }
.gallery { flex: 1; background: #f5f5f7; border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 40px; }
.main-image { max-width: 400px; width: 100%; object-fit: contain; }
.details { flex: 1; }
.details h1 { font-size: 32px; margin-bottom: 16px; }
.price-row { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
.price { font-size: 32px; font-weight: 600; }
.old-price { font-size: 20px; color: #a0a0a0; text-decoration: line-through; }
.specs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
.spec-item { background: #f5f5f7; padding: 12px; border-radius: 8px; font-size: 12px; display: flex; flex-direction: column; }
.spec-item span { color: #a0a0a0; margin-bottom: 4px; }
.spec-item b { font-size: 14px; }
.desc { color: #6a6a6a; line-height: 1.6; margin-bottom: 32px; }
.actions { display: flex; gap: 16px; margin-bottom: 40px; }
.delivery-info { display: flex; gap: 20px; }
.info-item { display: flex; flex-direction: column; font-size: 14px; font-weight: 500; background: #f5f5f7; padding: 16px; border-radius: 8px; flex: 1; }
.info-item small { color: #a0a0a0; font-weight: 400; margin-top: 4px; }
.details-table { background: #f5f5f7; padding: 40px; border-radius: 12px; margin-bottom: 80px; }
.details-table h2 { font-size: 24px; margin-bottom: 32px; }
.table-row { display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; }
.table-row:last-child { border-bottom: none; }
.table-row span:first-child { color: #6a6a6a; }
.related h2 { font-size: 24px; margin-bottom: 32px; }
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.loading { text-align: center; padding: 100px 0; font-size: 18px; color: #a0a0a0; }
</style>