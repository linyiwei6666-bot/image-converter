<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import { useHead } from '@unhead/vue'

useHead({
  title: 'About Us - Privacy-First Image Conversion Technology',
  meta: [
    { name: 'description', content: 'Learn about ImageConverter, our browser-based image processing technology, and our commitment to user privacy and web performance.' }
  ]
})
</script>

<template>
  <Navbar />

  <div class="container about">
    <div class="content-wrapper">
      <h1>About ImageConverter</h1>

      <section>
        <h2>Our Mission: Privacy & Performance</h2>
        <p>
          ImageConverter was founded with a single mission: to provide a high-performance, privacy-first alternative to traditional online image converters. In an era where data privacy is often compromised, we believe that simple digital tasks like image conversion should not require users to sacrifice their personal or professional data.
        </p>
      </section>

      <section>
        <h2>Next-Generation Browser Technology</h2>
        <p>
          Our platform leverages the power of modern <strong>Client-Side Processing</strong>. By utilizing advanced browser APIs like <strong>HTML5 Canvas</strong> and <strong>Blob objects</strong>, we handle the heavy lifting of image re-encoding directly on your local CPU.
        </p>
        
        <div class="tech-highlight">
          <p><strong>The technical benefits of our approach include:</strong></p>
          <ul>
            <li><strong>Zero Server Latency:</strong> Since no upload is required, processing starts instantly regardless of your internet speed.</li>
            <li><strong>Data Integrity:</strong> Your original files remain untouched and reside exclusively within your local memory (RAM).</li>
            <li><strong>Unlimited Access:</strong> We don't have to pay for massive server bandwidth, so we can offer our tool for free without aggressive limits.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Why We Are Different</h2>
        <p>
          Most online tools act as a "black box" where you upload a file and hope for the best. ImageConverter operates with total transparency. We don't use tracking scripts on your image content, and we don't store "previews" or "thumbnails" on any remote database. 
        </p>
        <p>
          Our tool is optimized for <strong>Core Web Vitals</strong>, ensuring that the interface is responsive and stable across all devices, from high-end desktops to mobile smartphones.
        </p>
      </section>

      <section>
        <h2>Our Vision for the Future</h2>
        <p>
          As web standards evolve, so do we. We are currently working on integrating <strong>WebAssembly (WASM)</strong> modules to support even more complex formats like AVIF and high-fidelity JPEG XL conversion. Our goal is to become the go-to resource for developers, designers, and everyday users who value speed and security.
        </p>
      </section>

      <section>
        <h2>Get in Touch</h2>
        <p>
          We are a community-driven project and we thrive on user feedback. Whether you've found a bug, have a feature suggestion, or just want to say hello, we'd love to hear from you.
        </p>
        <p>
          Visit our <router-link to="/contact" class="contact-link">Contact page</router-link> or reach out via email. Your input helps us build a better web, one pixel at a time.
        </p>
      </section>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
/* 在你原来的基础上微调 */
.about {
  padding: 60px 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: #333;
}

section {
  margin-bottom: 45px;
}

h2 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #2c3e50;
  border-left: 4px solid var(--primary); /* 增加一个小装饰提升视觉感 */
  padding-left: 15px;
}

p {
  color: #555;
  line-height: 1.8;
  margin-bottom: 16px;
  font-size: 16px;
}

.tech-highlight {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

ul {
  list-style: disc;
  padding-left: 20px;
}

li {
  margin-bottom: 12px;
  color: #555;
  font-size: 15px;
}

.contact-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
}
</style>