<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import { useHead } from '@unhead/vue'

useHead({
  title: 'About Our Privacy-First Image Converter | local processing',
  meta: [
    { 
      name: 'description', 
      content: 'Founded by developer Linyiwei, ImageConverter offers 100% browser-based image conversion. No uploads, no data storage, just pure privacy and speed using HTML5 technology.' 
    }
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

      <section class="tools-navigation">
        <h3>Our Secure Conversion Tools</h3>
        <p>Start optimizing your images using our browser-based technology:</p>
        <div class="tools-grid">
          <router-link to="/png-to-webp" class="tool-card">
            <strong>PNG to WebP</strong>
            <span>Best for SEO & Speed</span>
          </router-link>
          <router-link to="/jpg-to-webp" class="tool-card">
            <strong>JPG to WebP</strong>
            <span>Maximum Compression</span>
          </router-link>
          <router-link to="/jpg-to-png" class="tool-card">
            <strong>JPG to PNG</strong>
            <span>Lossless Quality</span>
          </router-link>
          <router-link to="/webp-to-jpg" class="tool-card">
            <strong>WebP to JPG</strong>
            <span>High Compatibility</span>
          </router-link>
        </div>
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
        <h2>Meet the Developer</h2>
        <p>
          I'm Nasa, a developer passionate about building tools that don't compromise user security. I created ImageConverter to ensure that no one has to upload their private photos to a remote server just to change a file format. With a background in web development and a strong belief in digital privacy, I am committed to maintaining and improving this project for the benefit of all users.
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

      <section>
        <h2>Our Core Principles</h2>
        <div class="principles-grid">
          <div class="principle-item">
            <h3>🔒 100% Privacy</h3>
            <p>We believe your data is yours. By processing images in your browser, your files never leave your computer, making it safer than 99% of online converters.</p>
          </div>
          <div class="principle-item">
            <h3>🚀 Performance</h3>
            <p>Utilizing your device's local CPU means no waiting for uploads or downloads. It's the fastest way to convert images on the modern web.</p>
          </div>
          <div class="principle-item">
            <h3>🌱 No Tracking</h3>
            <p>We don't use invasive tracking cookies. Our goal is to provide a clean, ad-supported (to keep the lights on) but non-intrusive experience.</p>
          </div>
        </div>
      </section>

      <section class="faq">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-item">
          <h3>Is my data safe with ImageConverter?</h3>
          <p>Yes. Unlike 90% of online converters, we use client-side technology. Your images are processed locally in your browser's memory and are never uploaded to any server.</p>
        </div>
        <div class="faq-item">
          <h3>Which formats are supported?</h3>
          <p>We currently support major web formats including PNG, JPG, and WebP. We are working on adding AVIF support via WebAssembly (WASM) in the next update.</p>
        </div>
        <div class="faq-item">
          <h3>Why is this tool free?</h3>
          <p>By using your device's processing power instead of expensive server-side CPUs, we keep our overhead low and offer this professional tool to the community for free.</p>
        </div>
      </section>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
.about {
  padding: 60px 20px;
  max-width: 850px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: #111;
  text-align: center;
}

section {
  margin-bottom: 50px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #111;
  border-left: 5px solid var(--primary);
  padding-left: 15px;
}

p {
  color: #444;
  line-height: 1.8;
  margin-bottom: 18px;
  font-size: 16px;
}

.tech-highlight {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #eee;
  margin: 25px 0;
}

/* 内链导航矩阵样式 */
.tools-navigation {
  background: #111;
  padding: 30px;
  border-radius: 16px;
  color: #fff;
}
.tools-navigation h3 { color: #fff; margin-top: 0; }
.tools-navigation p { color: #ccc; }

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.tool-card {
  background: #222;
  padding: 15px;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid #333;
}

.tool-card:hover {
  background: #333;
  border-color: var(--primary);
  transform: translateY(-3px);
}

.tool-card strong {
  display: block;
  color: var(--primary);
  font-size: 15px;
  margin-bottom: 5px;
}

.tool-card span {
  font-size: 12px;
  color: #888;
}

/* 原有其它样式 */
.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
.principle-item {
  background: #fff;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 12px;
}
.principle-item h3 { margin-top: 0; font-size: 18px; }

.faq-item {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}
.faq-item h3 { font-size: 18px; color: #111; margin-bottom: 10px; }

ul { padding-left: 20px; }
li { margin-bottom: 10px; color: #555; }
.contact-link { color: var(--primary); font-weight: 600; text-decoration: underline; }
</style>