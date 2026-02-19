<script setup>
import Navbar from "../../components/Navbar.vue"
import Footer from "../../components/Footer.vue"
</script>

<template>
  <Navbar />

  <div class="container article">
    <h1>Best Image Formats for Web: Complete Guide</h1>

    <p>
      Choosing the best image format for your website affects speed,
      SEO rankings, and user experience.
      In this complete guide, we compare JPG, PNG, WEBP, and other formats.
    </p>

    <h2>Why Image Format Matters</h2>
    <p>
      Images often account for more than 50% of a webpage’s size.
      Optimized formats reduce load time and improve performance.
    </p>

    <h2>JPG (JPEG)</h2>
    <p>
      JPG is ideal for photographs due to its efficient lossy compression.
    </p>

    <h3>Best For</h3>
    <ul>
      <li>Photos</li>
      <li>Blog images</li>
      <li>Social media</li>
    </ul>

    <h2>PNG</h2>
    <p>
      PNG provides lossless compression and supports transparency.
    </p>

    <h3>Best For</h3>
    <ul>
      <li>Logos</li>
      <li>Icons</li>
      <li>Graphics with text</li>
    </ul>

    <h2>WEBP</h2>
    <p>
      WEBP offers both lossy and lossless compression with smaller file sizes.
    </p>

    <h3>Best For</h3>
    <ul>
      <li>Modern websites</li>
      <li>Performance optimization</li>
      <li>Responsive images</li>
    </ul>

    <h2>SVG</h2>
    <p>
      SVG is a vector format ideal for logos and scalable graphics.
    </p>

    <h2>Comparison Table (Summary)</h2>

    <h3>Smallest File Size</h3>
    <p>WEBP</p>

    <h3>Best Compatibility</h3>
    <p>JPG and PNG</p>

    <h3>Transparency Support</h3>
    <p>PNG and WEBP</p>

    <h2>SEO and Page Speed Considerations</h2>
    <p>
      Google considers page speed as a ranking factor.
      Choosing the right image format improves loading time.
    </p>

    <h2>How to Choose the Right Format</h2>
    <ul>
      <li>Use JPG for photos</li>
      <li>Use PNG for design elements</li>
      <li>Use WEBP for modern optimization</li>
      <li>Use SVG for scalable graphics</li>
    </ul>

    <h2>Frequently Asked Questions</h2>

    <h3>What is the best format for websites?</h3>
    <p>
      WEBP is often the best balance between quality and size.
    </p>

    <h3>Is PNG better than JPG?</h3>
    <p>
      For graphics, yes. For photos, JPG is usually better.
    </p>

    <h2>Conclusion</h2>
    <p>
      The best image format depends on your use case.
      For modern web performance, WEBP is leading the way.
    </p>
  </div>

  <Footer />
</template>

<style scoped>
.article {
  padding: 70px 0;
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
}

h1 {
  font-size: 32px;
  margin-bottom: 25px;
  color: #111;
  position: relative;
  padding-bottom: 15px;
}

h1::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 80px;
  height: 4px;
  background: var(--primary);
}

h2 {
  margin-top: 50px;
  margin-bottom: 15px;
  font-size: 20px;
  color: #111;
  padding-left: 14px;
  border-left: 4px solid var(--primary);
}

h3 {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 16px;
  color: var(--primary);
  font-weight: 600;
}

p {
  color: #444;
  line-height: 1.8;
  font-size: 15px;
  margin-bottom: 18px;
}

ul {
  margin: 15px 0 25px 20px;
}

li {
  margin-bottom: 10px;
  font-size: 15px;
  color: #444;
}

h3 + p {
  background: #f9f9f9;
  padding: 15px 18px;
  border-radius: 8px;
  border: 1px solid #eee;
}
</style>
