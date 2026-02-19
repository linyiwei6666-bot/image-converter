<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
</script>

<template>
  <Navbar />

  <div class="container home">
    <!-- Hero 区域 -->
    <section class="hero">
      <h1>Free Online Image Converter</h1>

      <p class="subtitle">
        Convert JPG, PNG, and WEBP images instantly in your browser.
        No uploads. No registration. 100% secure and fast.
      </p>

      <router-link to="/convert" class="cta-btn">
        Start Converting
      </router-link>
    </section>

    <!-- 广告预留位 -->
    <!-- <div class="ad-placeholder">
      Advertisement
    </div> -->

    <!-- 功能介绍 -->
    <section class="features">
      <h2>Why Use Our Image Converter?</h2>

      <div class="feature-list">
        <div class="feature">
          <h3>🔒 100% Secure</h3>
          <p>
            Your images are processed locally in your browser.
            We do not upload, store, or track your files.
          </p>
        </div>

        <div class="feature">
          <h3>⚡ Fast Conversion</h3>
          <p>
            Instant image conversion powered by modern browser technology.
            No waiting time and no server delays.
          </p>
        </div>

        <div class="feature">
          <h3>🖼 Multiple Formats</h3>
          <p>
            Easily convert between JPG, PNG, and WEBP formats
            for web optimization and storage efficiency.
          </p>
        </div>
      </div>
    </section>

    <!-- SEO 内容区域 -->
    <section class="content">
      <h2>Online Image Format Conversion Made Simple</h2>

      <p>
        Our free online image converter allows you to quickly convert
        images between popular formats including JPG, PNG, and WEBP.
        Whether you need to optimize images for your website,
        reduce file size, or change formats for compatibility,
        this tool provides a simple and efficient solution.
      </p>

      <p>
        Unlike traditional converters that require uploading files
        to external servers, our tool works entirely in your browser.
        This ensures maximum privacy and faster performance.
        Your images never leave your device.
      </p>

      <p>
        The converter is compatible with modern browsers including
        Chrome, Edge, and Firefox. No software installation is required.
        Simply upload your image, choose the desired format,
        and download the converted file instantly.
      </p>
    </section>

    <section class="extended-content">
      <h2>Understanding Image Formats: JPG vs PNG vs WEBP</h2>

      <p>
        JPG (JPEG) is one of the most widely used image formats for photographs.
        It provides excellent compression and smaller file sizes, making it ideal
        for websites and social media platforms. However, it does not support
        transparency.
      </p>

      <p>
        PNG is commonly used for graphics, logos, and images that require
        transparent backgrounds. It preserves image quality but typically results
        in larger file sizes compared to JPG.
      </p>

      <p>
        WEBP is a modern image format developed for web optimization.
        It offers superior compression while maintaining high visual quality.
        Many websites use WEBP to improve loading speed and SEO performance.
      </p>

      <h2>When Should You Convert Image Formats?</h2>

      <p>
        You may need to convert image formats when optimizing your website,
        reducing storage space, improving compatibility across platforms,
        or enhancing page speed performance. Converting images can
        significantly improve user experience and search engine rankings.
      </p>

      <p>
        Our browser-based converter allows you to safely transform images
        without uploading them to any server, ensuring complete privacy
        and instant results.
      </p>
    </section>


    <!-- FAQ -->
    <section class="faq">
      <h2>Frequently Asked Questions</h2>

      <div class="faq-item">
        <h3>Is this image converter really free?</h3>
        <p>
          Yes. Our tool is completely free to use without
          registration or hidden fees.
        </p>
      </div>

      <div class="faq-item">
        <h3>Are my images uploaded to your server?</h3>
        <p>
          No. All image processing happens locally in your browser.
          Your files are never uploaded or stored.
        </p>
      </div>

      <div class="faq-item">
        <h3>What formats are supported?</h3>
        <p>
          You can convert between JPG, PNG, and WEBP formats.
        </p>
      </div>
    </section>
  </div>

  <Footer />
</template>

<style scoped>
.home {
  padding: 60px 0;
}

/* Hero */
.hero {
  text-align: center;
  margin-bottom: 80px;
}

.hero h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.subtitle {
  max-width: 600px;
  margin: 0 auto 30px;
  color: var(--gray);
  font-size: 16px;
}

.cta-btn {
  display: inline-block;
  background: var(--primary);
  color: white;
  padding: 14px 32px;
  border-radius: 4px;
  font-weight: 600;
  transition: 0.3s;
}

.cta-btn:hover {
  background: #b00000;
}

/* 广告位 */
.ad-placeholder {
  margin: 60px 0;
  padding: 40px;
  background: var(--light-gray);
  text-align: center;
  color: var(--gray);
}

/* Features */
.features {
  margin-bottom: 80px;
}

.features h2 {
  text-align: center;
  margin-bottom: 40px;
}

.feature-list {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.feature {
  flex: 1;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 6px;
}

.feature h3 {
  margin-bottom: 10px;
}

.feature p {
  color: var(--gray);
  font-size: 14px;
}

/* Content */
.content {
  margin-bottom: 80px;
}

.content h2 {
  margin-bottom: 20px;
}

.content p {
  margin-bottom: 16px;
  color: var(--gray);
  line-height: 1.6;
}

/* FAQ */
.faq h2 {
  margin-bottom: 30px;
}

.faq-item {
  margin-bottom: 20px;
}

.faq-item h3 {
  font-size: 16px;
  margin-bottom: 6px;
}

.faq-item p {
  color: var(--gray);
  font-size: 14px;
}

.extended-content {
  margin-bottom: 80px;
}

.extended-content h2 {
  margin-bottom: 20px;
}

.extended-content p {
  margin-bottom: 16px;
  color: var(--gray);
  line-height: 1.6;
}

</style>
