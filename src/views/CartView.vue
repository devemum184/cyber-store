<template>
  <div class="cart-view container">
    <h1>Shopping Cart</h1>
    <div class="cart-layout" v-if="store.cart.length > 0">
      <div class="cart-items">
        <div class="cart-item" v-for="item in store.cart" :key="item.id">
          <img :src="item.image" :alt="item.title" class="item-img" />
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p class="item-price">${{ item.price }}</p>
          </div>
          <div class="item-qty">
            <button @click="store.updateQuantity(item.id, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="store.updateQuantity(item.id, item.quantity + 1)">+</button>
          </div>
          <div class="item-total">${{ item.price * item.quantity }}</div>
          <button class="remove-btn" @click="store.removeFromCart(item.id)">×</button>
        </div>
      </div>
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="promo-inputs">
          <input type="text" placeholder="Discount code / Promo code" />
          <input type="text" placeholder="Your bonus card number" />
          <button>Apply</button>
        </div>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ store.cartTotal }}</span>
        </div>
        <div class="summary-row">
          <span>Estimated Tax</span>
          <span>$50</span>
        </div>
        <div class="summary-row">
          <span>Estimated shipping & Handling</span>
          <span>$29</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ store.cartTotal + 79 }}</span>
        </div>
        <button class="btn-primary checkout-btn">Checkout</button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <h2>Your cart is empty</h2>
      <router-link to="/catalog" class="btn-primary">Go to Catalog</router-link>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../store'
const store = useStore()
</script>

<style scoped>
.cart-view { margin-top: 40px; }
.cart-view h1 { font-size: 32px; margin-bottom: 40px; }
.cart-layout { display: flex; gap: 40px; align-items: flex-start; }
.cart-items { flex: 1; }
.cart-item { display: flex; align-items: center; gap: 24px; padding: 24px 0; border-bottom: 1px solid #e5e5e5; }
.item-img { width: 80px; height: 80px; object-fit: contain; }
.item-info { flex: 1; }
.item-info h3 { font-size: 16px; margin-bottom: 8px; font-weight: 500; }
.item-price { color: #a0a0a0; }
.item-qty { display: flex; align-items: center; gap: 16px; font-weight: 500; background: #f5f5f7; padding: 8px 16px; border-radius: 6px; }
.item-qty button { background: transparent; font-size: 18px; color: #a0a0a0; }
.item-total { font-weight: 600; font-size: 18px; width: 80px; text-align: right; }
.remove-btn { background: transparent; font-size: 24px; color: #a0a0a0; padding: 0 10px; }
.order-summary { width: 380px; background: #f5f5f7; padding: 32px; border-radius: 12px; }
.order-summary h2 { font-size: 20px; margin-bottom: 24px; }
.promo-inputs { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
.promo-inputs input { padding: 12px; border: 1px solid #e5e5e5; border-radius: 6px; outline: none; background: #fff; }
.promo-inputs button { padding: 12px; background: #fff; border: 1px solid #000; border-radius: 6px; font-weight: 500; }
.summary-row { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 14px; color: #6a6a6a; }
.summary-row.total { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e5e5; }
.checkout-btn { width: 100%; margin-top: 32px; }
.empty-cart { text-align: center; padding: 80px 0; }
.empty-cart h2 { margin-bottom: 24px; color: #a0a0a0; }
</style>