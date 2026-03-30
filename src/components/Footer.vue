<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="copyright">
        © 2026 ImageConverter. All rights reserved.
      </div>

      <div class="footer-links">
        <router-link to="/privacy">Privacy</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
        <a href="https://toolpilot.ai" target="_blank" rel="noopener">Featured on ToolPilot</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--light-gray);
  margin-top: 80px;
  padding: 40px 0;
  font-size: 14px;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links a {
  margin-left: 20px;
  color: var(--gray);
  transition: 0.3s;
}

.footer-links a:hover {
  color: var(--primary);
}
</style>
