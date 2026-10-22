import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('store', {
  state: () => ({
    products: [],
    cart: [],
    favorites: [],
    isLoading: false,
    error: null
  }),
  getters: {
    cartTotal: (state) => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    cartCount: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    favoritesCount: (state) => state.favorites.length
  },
  actions: {
    async fetchProducts() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('/api/products/')
        let data = Array.isArray(response.data) ? response.data : (response.data.products || response.data.data || [])

        this.products = data.map(product => {
          let imageUrl = 'https://via.placeholder.com/300?text=No+Image'
          if (product.images && product.images.length > 0) {
            imageUrl = product.images[0]
            if (imageUrl.startsWith('image/')) {
              imageUrl = 'http://localhost:1452/' + imageUrl
            } else if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
              imageUrl = '/' + imageUrl
            }
          }
          return {
            ...product,
            id: product.id,
            title: product.name || product.title,
            price: product.price,
            image: imageUrl
          }
        })
      } catch (error) {
        this.error = 'Failed to fetch products'
        console.error('Ошибка при загрузке товаров:', error)
      } finally {
        this.isLoading = false
      }
    },
    addToCart(product) {
      const existing = this.cart.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId)
    },
    updateQuantity(productId, quantity) {
      const item = this.cart.find(item => item.id === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
    },
    toggleFavorite(product) {
      const index = this.favorites.findIndex(item => item.id === product.id)
      if (index > -1) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(product)
      }
    },
    isFavorite(productId) {
      return this.favorites.some(item => item.id === productId)
    }
  }
})