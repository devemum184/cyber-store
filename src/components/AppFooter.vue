<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-col brand-col">
        <router-link to="/" class="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          cyber
        </router-link>
        <p>We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
        <div class="socials"><span>T</span><span>F</span><span>I</span></div>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="#">Bonus program</a></li>
          <li><a href="#">Gift cards</a></li>
          <li><a href="#">Credit and payment</a></li>
          <li><a href="#">Service contracts</a></li>
          <li><a href="#">Non-cash account</a></li>
          <li><a href="#">Payment</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Assistance to the buyer</h4>
        <ul>
          <li><a href="#">Find an order</a></li>
          <li><a href="#">Terms of delivery</a></li>
          <li><a href="#">Exchange and return of goods</a></li>
          <li><a href="#">Guarantee</a></li>
          <li><a href="#">Frequently asked questions</a></li>
          <li><a href="#">Terms of use of the site</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background-color: #000; color: #fff; padding: 60px 0; margin-top: 80px; }
.footer-inner { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; }
.logo { display: flex; align-items: center; gap: 8px; font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 20px; }
.brand-col p { color: #a0a0a0; max-width: 300px; line-height: 1.6; margin-bottom: 24px; }
.socials { display: flex; gap: 16px; color: #a0a0a0; }
.footer-col h4 { font-size: 16px; margin-bottom: 20px; font-weight: 600; }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.footer-col a { color: #a0a0a0; font-size: 14px; transition: color 0.2s; }
.footer-col a:hover { color: #fff; }
</style>