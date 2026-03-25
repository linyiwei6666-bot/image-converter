<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import { useHead } from '@vueuse/head'

useHead({
  title: 'Free Image Converter — JPG, PNG, WebP | No Uploads',
  meta: [
    { name: 'description', content: 'Convert JPG, PNG, and WebP images without uploading anything. The conversion runs entirely in your browser — free, private, and fast.' },
    { property: 'og:title', content: 'Free Image Converter — Browser-Based, No Uploads' },
    { property: 'og:description', content: 'A one-person project. Converts images locally in your browser — nothing goes to a server.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<template>
  <Navbar />

  <div class="container home">
    <!-- Hero 区域 -->
    <section class="hero">
      <h1>Image Converter That Stays in Your Browser</h1>

      <p class="subtitle">
        I built this because I got tired of uploading photos to random converters
        and wondering what happened to them afterward. Everything runs locally —
        your files never leave your device.
      </p>

      <router-link to="/convert" class="cta-btn">
        Start Converting
      </router-link>
    </section>

    <!-- 功能介绍 -->
    <section class="features">
      <h2>What makes this different</h2>

      <div class="feature-list">
        <div class="feature">
          <h3>🔒 Nothing leaves your device</h3>
          <p>
            Your files are processed entirely by your own browser. No server receives them,
            no database stores them. Open the network inspector while converting — zero upload requests.
          </p>
        </div>

        <div class="feature">
          <h3>⚡ Starts immediately</h3>
          <p>
            Because nothing is uploaded, conversion starts the moment you drop a file.
            No server queue, no waiting on bandwidth. A 5MB image takes a second or two.
          </p>
        </div>

        <div class="feature">
          <h3>🖼 JPG, PNG, and WebP</h3>
          <p>
            The three formats that cover most real use cases. AVIF is something I looked
            into — in-browser encoding turned out to be too slow to ship reliably.
          </p>
        </div>
      </div>
    </section>

    <!-- SEO 内容区域 -->
    <section class="content">
      <h2>The story behind this</h2>

      <p>
        This started as a script I ran locally when I needed to batch-convert some product photos.
        I turned it into a website when a few friends asked if they could use it too.
        That was about a year ago. It's still just me running it.
      </p>

      <p>
        The reason it works locally instead of uploading to a server isn't really a technical
        achievement — it's just the way I wanted to use it myself. I had no idea what
        other converters were doing with my files, and I didn't want to find out.
        Chrome, Firefox, and Safari can handle JPG, PNG, and WebP encoding natively now.
        No plugins, no server-side code needed.
      </p>

      <p>
        If you want to know more about how it works or why I built it this way,
        the <router-link to="/about">about page</router-link> has the longer version.
      </p>
    </section>

    <section class="extended-content">
      <h2>A quick note on which format to use</h2>

      <p>
        If you're putting an image on a website and you don't know which format to pick,
        convert it to WebP. It's smaller than JPG or PNG at equivalent quality,
        and browser support is effectively universal in 2026.
      </p>

      <p>
        If you need a transparent background, WebP or PNG both work — JPG doesn't support it.
        If you're sharing the file with someone who might open it in older software like
        Photoshop or the default Windows photo viewer, stick with JPG or PNG.
        WebP support in desktop apps is still inconsistent.
      </p>

      <p>
        There's a longer breakdown in the <router-link to="/blog/image-formats">image formats guide</router-link>
        if you want the full comparison, including when PNG actually beats WebP on file size.
      </p>

      <h2>When does converting formats actually help?</h2>

      <p>
        Mostly when you're putting images on a website and care about load speed.
        Switching a large hero PNG to WebP can cut the file by 60–70% with no visible
        quality difference. That directly affects how fast your page loads, which
        matters both for users and for Core Web Vitals.
      </p>

      <p>
        It's less useful for archiving or editing workflows — for those, keeping the original
        lossless format (PNG or RAW) makes more sense. Export to a compressed format
        only for the final version that goes on the web.
      </p>
    </section>


    <!-- FAQ -->
    <section class="faq">
      <h2>Frequently Asked Questions</h2>

      <div class="faq-item">
        <h3>Is it really free?</h3>
        <p>
          Yes. No signup, no trial, no limit on how many files you convert.
          I built it to use myself and just kept it public.
        </p>
      </div>

      <div class="faq-item">
        <h3>Are my images uploaded anywhere?</h3>
        <p>
          Nothing is uploaded. The conversion runs in your browser using your device's own CPU.
          I genuinely have no access to your files — there's no server receiving them.
          You can verify this by watching the network tab in dev tools while converting.
        </p>
      </div>

      <div class="faq-item">
        <h3>What formats are supported?</h3>
        <p>
          JPG, PNG, and WebP. AVIF is something I looked into but in-browser encoding
          was too slow for practical use, so I haven't shipped it yet.
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
