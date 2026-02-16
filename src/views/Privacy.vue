<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
</script>

<template>
  <Navbar />

  <div class="container privacy">
    <h1>Privacy Policy</h1>

    <p class="update">Last updated: January 2026</p>

    <section>
      <h2>1. Introduction</h2>
      <p>
        Welcome to ImageConverter. Your privacy is important to us.
        This Privacy Policy explains how we handle your information
        when you use our website and online image conversion tools.
      </p>
    </section>

    <section>
      <h2>2. Image Processing</h2>
      <p>
        All image conversions are performed locally in your browser.
        We do not upload, store, or access your image files on our servers.
        Your files never leave your device.
      </p>
    </section>

    <section>
      <h2>3. Personal Information</h2>
      <p>
        We do not require registration and do not collect personal
        information such as your name, email address, or uploaded content.
      </p>
    </section>

    <section>
      <h2>4. Cookies</h2>
      <p>
        Our website may use cookies to improve user experience.
        Cookies are small text files stored on your device.
        You may disable cookies in your browser settings if you prefer.
      </p>
    </section>

    <section>
      <h2>5. Google AdSense</h2>
      <p>
        We use Google AdSense to display advertisements.
        Google may use cookies and similar technologies
        to serve ads based on your prior visits to this or other websites.
      </p>
      <p>
        You can learn more about how Google uses data here:
        https://policies.google.com/technologies/ads
      </p>
    </section>

    <section>
      <h2>6. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites.
        We are not responsible for the privacy practices
        or content of external sites.
      </p>
    </section>

    <section>
      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time.
        Any changes will be posted on this page with an updated revision date.
      </p>
    </section>

    <section>
      <h2>8. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy,
        you may contact us through our Contact page.
      </p>
    </section>
  </div>

  <Footer />
</template>

<style scoped>
.privacy {
  padding: 60px 0;
}

h1 {
  margin-bottom: 10px;
}

.update {
  font-size: 14px;
  color: var(--gray);
  margin-bottom: 40px;
}

section {
  margin-bottom: 40px;
}

h2 {
  margin-bottom: 10px;
  font-size: 18px;
}

p {
  color: var(--gray);
  line-height: 1.6;
  font-size: 14px;
}
</style>
