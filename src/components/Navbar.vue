<template>

  <header class="navbar">
    <div class="container nav-inner">
      <div class="logo">ImageConverter</div>

      <nav class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/convert">Converter</router-link>
        <router-link to="/blog">Blog</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/privacy">Privacy</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background: var(--white);
  border-bottom: 1px solid #eee;
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: var(--black);
}

.nav-links a {
  margin-left: 24px;
  font-size: 14px;
  color: var(--black);
  transition: 0.3s;
}

.nav-links a:hover {
  color: var(--primary);
}
</style>

