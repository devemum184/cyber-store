<template>
  <div class="catalog-view container">
    <div class="sidebar">
      <div class="search-box">
        <input type="text" placeholder="Search" v-model="searchQuery" />
      </div>

      <div class="filter-group">
        <h3>Brand</h3>
        <label v-for="brand in uniqueBrands" :key="brand">
          <input type="checkbox" :value="brand" v-model="selectedBrands" /> {{ brand }} <span>{{ getBrandCount(brand) }}</span>
        </label>
      </div>

      <div class="filter-group">
        <h3>Battery capacity</h3>
        <label><input type="checkbox" value="2000-3000" v-model="selectedBattery" /> 2000-3000 mAh</label>
        <label><input type="checkbox" value="3000-4000" v-model="selectedBattery" /> 3000-4000 mAh</label>
        <label><input type="checkbox" value="4000+" v-model="selectedBattery" /> 4000+ mAh</label>
      </div>

      <div class="filter-group">
        <h3>Screen type</h3>
        <label><input type="checkbox" value="OLED" v-model="selectedScreenTypes" /> OLED</label>
        <label><input type="checkbox" value="IPS" v-model="selectedScreenTypes" /> IPS</label>
      </div>

      <div class="filter-group">
        <h3>Screen diagonal</h3>
        <label><input type="checkbox" value="4.7" v-model="selectedDiagonals" /> 4.7"</label>
        <label><input type="checkbox" value="6.1" v-model="selectedDiagonals" /> 6.1"</label>
        <label><input type="checkbox" value="6.7" v-model="selectedDiagonals" /> 6.7"</label>
      </div>
    </div>

    <div class="content">
      <div class="catalog-header">
        <span>Selected Products: <b>{{ filteredProducts.length }}</b></span>
        <select v-model="sortBy">
          <option value="rating">By rating</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      <div v-if="store.isLoading" class="loading">Loading...</div>
      <div v-else class="product-grid">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from '../store'
import ProductCard from '../components/ProductCard.vue'

const store = useStore()

const searchQuery = ref('')
const selectedBrands = ref([])
const selectedBattery = ref([])
const selectedScreenTypes = ref([])
const selectedDiagonals = ref([])
const sortBy = ref('rating')

const uniqueBrands = computed(() => {
  const brands = store.products.map(p => p.brand)
  return [...new Set(brands)]
})

const getBrandCount = (brand) => {
  return store.products.filter(p => p.brand === brand).length
}

const getCharacteristicValue = (product, charName) => {
  if (!product.characteristics) return null
  const char = product.characteristics.find(c => c.characteristic === charName)
  return char ? char.value : null
}

const filteredProducts = computed(() => {
  let result = store.products

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => p.title.toLowerCase().includes(q))
  }

  if (selectedBrands.value.length > 0) {
    result = result.filter(p => selectedBrands.value.includes(p.brand))
  }

  if (selectedBattery.value.length > 0) {
    result = result.filter(p => {
      const battery = parseInt(getCharacteristicValue(p, 'Аккумулятор'))
      if (isNaN(battery)) return false
      return selectedBattery.value.some(range => {
        if (range === '2000-3000') return battery >= 2000 && battery <= 3000
        if (range === '3000-4000') return battery > 3000 && battery <= 4000
        if (range === '4000+') return battery > 4000
        return false
      })
    })
  }

  if (selectedScreenTypes.value.length > 0) {
    result = result.filter(p => {
      const screen = getCharacteristicValue(p, 'Разрешение')
      return screen !== null
    })
  }

  if (selectedDiagonals.value.length > 0) {
    result = result.filter(p => {
      const diagonal = getCharacteristicValue(p, 'Диагональ')
      if (!diagonal) return false
      return selectedDiagonals.value.includes(diagonal)
    })
  }

  if (sortBy.value === 'price_asc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price_desc') {
    result = [...result].sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'rating') {
    result = [...result].sort((a, b) => b.rating - a.rating)
  }

  return result
})

onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts()
  }
})
</script>

<style scoped>
.catalog-view { display: flex; gap: 40px; margin-top: 40px; }
.sidebar { width: 250px; flex-shrink: 0; }
.search-box { margin-bottom: 32px; }
.search-box input { width: 100%; padding: 12px; background: #f5f5f7; border: none; border-radius: 8px; outline: none; }
.filter-group { margin-bottom: 32px; }
.filter-group h3 { font-size: 16px; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e5e5e5; }
.filter-group label { display: flex; align-items: center; gap: 8px; font-size: 14px; margin-bottom: 12px; color: #4a4a4a; cursor: pointer; }
.filter-group label span { color: #a0a0a0; margin-left: auto; }
.content { flex: 1; }
.catalog-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
.catalog-header select { padding: 10px 16px; border: 1px solid #e5e5e5; border-radius: 8px; outline: none; background: #fff; }
.product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.loading { text-align: center; padding: 40px; font-size: 18px; color: #a0a0a0; }
</style>