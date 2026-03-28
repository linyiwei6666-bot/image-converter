<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import { useHead } from '@vueuse/head'

useHead({
  title: 'Free Image Converter — JPG, PNG, WebP, HEIC | No Uploads',
  meta: [
    { name: 'description', content: 'Convert and compress JPG, PNG, WebP and HEIC images without uploading anything. Runs entirely in your browser — free, private, and instant.' },
    { property: 'og:title', content: 'Free Image Converter — Browser-Based, No Uploads' },
    { property: 'og:description', content: 'Convert JPG, PNG, WebP and HEIC images locally in your browser — nothing goes to a server.' },
    { name: 'robots', content: 'index, follow' }
  ]
})

const tools = [
  {
    emoji: "🔄",
    label: "Format Convert",
    desc: "JPG, PNG and WebP — convert between any combination.",
    path: "/convert",
    paths: ["/jpg-to-png", "/png-to-jpg", "/png-to-webp", "/webp-to-png", "/jpg-to-webp", "/webp-to-jpg"],
    cta: "Open converter",
    badge: null,
  },
  {
    emoji: "📱",
    label: "HEIC to JPG",
    desc: "iPhone photos that won't open anywhere else. Converted instantly.",
    path: "/heic-to-jpg",
    cta: "Convert HEIC",
    badge: "iPhone",
  },
  {
    emoji: "🗜️",
    label: "Compress Image",
    desc: "Cut file size by 60–80% with no visible quality loss.",
    path: "/compress-image",
    cta: "Compress now",
    badge: "New",
  },
]
</script>

<template>
  <Navbar />

  <div class="container home">

    <!-- Hero -->
    <section class="hero">
      <h1>Image Tools That Stay in Your Browser</h1>
      <p class="subtitle">
        I built this because I got tired of uploading photos to random converters
        and wondering what happened to them afterward. Everything runs locally —
        your files never leave your device.
      </p>
      <router-link to="/convert" class="cta-btn">Start Converting</router-link>
    </section>

    <!-- Tool cards -->
    <section class="tools-section">
      <h2>All tools</h2>
      <div class="tools-grid">
        <router-link
          v-for="tool in tools"
          :key="tool.path"
          :to="tool.path"
          class="tool-card"
        >
          <div class="tool-top">
            <span class="tool-emoji">{{ tool.emoji }}</span>
            <span v-if="tool.badge" class="tool-badge">{{ tool.badge }}</span>
          </div>
          <h3>{{ tool.label }}</h3>
          <p>{{ tool.desc }}</p>
          <span class="tool-cta">{{ tool.cta }} →</span>
        </router-link>
      </div>
    </section>

    <!-- Features -->
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
            No server queue, no waiting on bandwidth. A 5 MB image takes a second or two.
          </p>
        </div>
        <div class="feature">
          <h3>🖼 JPG, PNG, WebP, HEIC</h3>
          <p>
            The formats that cover most real use cases — including iPhone HEIC photos
            that most other tools handle badly or require an account for.
          </p>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="content">
      <h2>The story behind this</h2>
      <p>
        This started as a script I ran locally when I needed to batch-convert some product photos.
        I turned it into a website when a few friends asked if they could use it too.
        It's still just me running it.
      </p>
      <p>
        The reason it works locally instead of uploading to a server isn't really a technical
        achievement — it's just the way I wanted to use it myself. Chrome, Firefox, and Safari
        can handle JPG, PNG, and WebP encoding natively now. No plugins, no server-side code needed.
        HEIC conversion uses a WebAssembly decoder that runs the same way.
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
        If you're sharing with someone using older desktop software, stick with JPG or PNG.
        WebP support in desktop apps is still inconsistent.
      </p>
      <p>
        If you're dealing with iPhone photos that won't open on Windows or won't upload
        to a website, that's a HEIC file — use the
        <router-link to="/heic-to-jpg">HEIC to JPG tool</router-link>.
      </p>
      <p>
        There's a longer breakdown in the <router-link to="/blog/image-formats">image formats guide</router-link>
        if you want the full comparison.
      </p>

      <h2>When does compressing images actually help?</h2>
      <p>
        Mostly when you're putting images on a website and care about load speed.
        Switching a large hero PNG to a compressed WebP can cut the file by 70% with no visible
        quality difference. That directly affects Core Web Vitals scores.
      </p>
      <p>
        For archiving or editing, keep the original lossless format. Export compressed
        only for the final version that goes on the web. The
        <router-link to="/compress-image">image compressor</router-link> shows you
        the exact before/after file size so you can decide what to keep.
      </p>
    </section>

    <!-- FAQ -->
    <section class="faq">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-item">
        <h3>Is it really free?</h3>
        <p>Yes. No signup, no trial, no limit on how many files you convert. I built it to use myself and just kept it public.</p>
      </div>
      <div class="faq-item">
        <h3>Are my images uploaded anywhere?</h3>
        <p>Nothing is uploaded. The conversion runs in your browser using your device's own CPU. I genuinely have no access to your files — there's no server receiving them. You can verify this by watching the network tab in dev tools while converting.</p>
      </div>
      <div class="faq-item">
        <h3>What formats are supported?</h3>
        <p>JPG, PNG, WebP, and HEIC. The converter handles format switching between the first three. HEIC conversion outputs JPG and is specifically useful for iPhone photos.</p>
      </div>
      <div class="faq-item">
        <h3>Can I compress without converting?</h3>
        <p>Yes — the <router-link to="/compress-image">image compressor</router-link> keeps your file in its original format and just reduces the file size. Useful when you have a photo that's too large to email or upload somewhere.</p>
      </div>
    </section>

  </div>

  <Footer />
</template>

<style scoped>
.home { padding: 60px 0; }

/* Hero */
.hero { text-align: center; margin-bottom: 70px; }
.hero h1 { font-size: 36px; margin-bottom: 20px; }
.subtitle { max-width: 600px; margin: 0 auto 30px; color: var(--gray); font-size: 16px; }
.cta-btn { display: inline-block; background: var(--primary); color: white; padding: 14px 32px; border-radius: 4px; font-weight: 600; text-decoration: none; transition: 0.3s; }
.cta-btn:hover { background: #b00000; }

/* Tool cards */
.tools-section { margin-bottom: 70px; }
.tools-section h2 { margin-bottom: 24px; }
.tools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.tool-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.15s;
}
.tool-card:hover { border-color: var(--primary); box-shadow: 0 2px 12px rgba(0,0,0,0.07); }
.tool-top { display: flex; align-items: center; justify-content: space-between; }
.tool-emoji { font-size: 28px; }
.tool-badge { font-size: 11px; font-weight: 700; padding: 2px 8px; background: #fff0f0; color: #c40000; border-radius: 10px; border: 1px solid #fcc; }
.tool-card h3 { font-size: 16px; margin: 0; color: #111; }
.tool-card p { font-size: 14px; color: var(--gray); margin: 0; line-height: 1.5; flex: 1; }
.tool-cta { font-size: 13px; font-weight: 600; color: var(--primary); }

/* Features */
.features { margin-bottom: 70px; }
.features h2 { text-align: center; margin-bottom: 40px; }
.feature-list { display: flex; gap: 30px; justify-content: space-between; }
.feature { flex: 1; padding: 20px; border: 1px solid #eee; border-radius: 6px; }
.feature h3 { margin-bottom: 10px; }
.feature p { color: var(--gray); font-size: 14px; }

/* Content */
.content { margin-bottom: 70px; }
.content h2 { margin-bottom: 20px; }
.content p { margin-bottom: 16px; color: var(--gray); line-height: 1.6; }

.extended-content { margin-bottom: 70px; }
.extended-content h2 { margin-bottom: 20px; margin-top: 40px; }
.extended-content h2:first-child { margin-top: 0; }
.extended-content p { margin-bottom: 16px; color: var(--gray); line-height: 1.6; }

/* FAQ */
.faq h2 { margin-bottom: 30px; }
.faq-item { margin-bottom: 20px; }
.faq-item h3 { font-size: 16px; margin-bottom: 6px; }
.faq-item p { color: var(--gray); font-size: 14px; line-height: 1.6; }

/* Responsive */
@media (max-width: 640px) {
  .tools-grid { grid-template-columns: 1fr; }
  .feature-list { flex-direction: column; }
}
</style>