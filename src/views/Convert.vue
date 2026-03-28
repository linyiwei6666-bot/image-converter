<script setup>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import UploadBox from "../components/UploadBox.vue"
import ConvertOptions from "../components/ConvertOptions.vue"
import { useHead } from "@vueuse/head"

const route = useRoute()
const selectedFile = ref(null)
const showModal = ref(false)
const success = ref(false)
const resultUrl = ref(null)
const isLoading = ref(false)

const titleMap = {
  "jpg-to-png": "Convert JPG to PNG — Free, No Upload",
  "png-to-jpg": "Convert PNG to JPG — Free, No Upload",
  "png-to-webp": "Convert PNG to WebP — Free, No Upload",
  "webp-to-png": "Convert WebP to PNG — Free, No Upload",
  "jpg-to-webp": "Convert JPG to WebP — Free, No Upload",
  "webp-to-jpg": "Convert WebP to JPG — Free, No Upload",
}

const descriptionMap = {
  "jpg-to-png": "JPG to PNG makes sense in two situations: you need a transparent background (JPG doesn't support one), or you're going to edit the image multiple times and want to stop recompressing it on every save. Outside those cases, expect the file to get noticeably larger — PNG stores every pixel individually, which takes more space than JPG's compressed approximation. Not a problem, just worth knowing before you start. The conversion runs in your browser; nothing is uploaded.",
  "png-to-jpg": "For photographs going on a website, converting PNG to JPG usually cuts file size by 60–80%. The tradeoff is lossy compression — you're trading some quality for smaller size. In practice, the difference is invisible at quality 85 or above. Keep the PNG if you're still editing. Export to JPG for the final version that goes online. Transparent pixels get filled with white on conversion, so check that before downloading.",
  "png-to-webp": "WebP is typically 25–35% smaller than PNG at the same visual quality. For images going on a website, that difference in file size is real — faster load times, better Core Web Vitals. WebP supports transparency, so nothing is lost in the conversion. This is probably the format switch I use most often. The tool runs entirely in your browser and produces a file ready to drop straight onto a page.",
  "webp-to-png": "WebP works fine in every browser, but desktop editing software is a different story. Older Photoshop versions, some Windows apps, and most print services don't handle WebP well. Converting back to PNG gets you a file that opens anywhere — at the cost of a larger file size. Useful whenever you're sharing or editing outside a browser context. The conversion is lossless once you're in PNG territory.",
  "jpg-to-webp": "WebP is typically 25–34% smaller than the equivalent JPG. If you have photos going on a website, this conversion is usually worth doing — the files load faster and the quality difference at standard compression levels isn't something most people notice. This tool defaults to quality 82, which I've found hits a good balance. Everything runs in your browser; no upload, no server, instant download.",
  "webp-to-jpg": "JPG is the most compatible image format in existence. Email attachments, social media, digital photo frames, older phones — JPG works everywhere. If you have a WebP file that won't upload somewhere, or that someone can't open, converting it to JPG usually solves the problem immediately. The quality slider lets you control file size; 85 is a reasonable default for most uses."
}

const faqMap = {
  "jpg-to-png": [
    { q: "Does JPG to PNG maintain transparency?", a: "JPG files do not have transparency. When you convert to PNG, the background will be opaque, but you can then use editing tools to remove it since PNG supports alpha channels." },
    { q: "Will the file size increase?", a: "Yes, typically PNG files are larger than JPGs because PNG uses lossless compression to preserve every detail of the image." }
  ],
  "png-to-jpg": [
    { q: "Why convert PNG to JPG?", a: "JPG is much smaller in file size, making it ideal for web use and social media where transparency is not required." },
    { q: "What happens to my transparent background?", a: "Since JPG doesn't support transparency, any transparent areas will usually be filled with a solid color (usually white)." }
  ],
  "png-to-webp": [
    { q: "Is WebP better than PNG for SEO?", a: "Absolutely. Google favors WebP because it provides high quality with significantly smaller file sizes, leading to faster page loads." },
    { q: "Does WebP support transparency?", a: "Yes, WebP supports both lossy and lossless transparency, making it a perfect modern replacement for PNG." }
  ],
  "webp-to-png": [
    { q: "Why convert WebP to PNG?", a: "Compatibility. Some older software like Photoshop (older versions) or certain print services do not support the WebP format." },
    { q: "Is this conversion lossless?", a: "Yes, our tool extracts the image data and saves it into a lossless PNG container to ensure no further quality is lost." }
  ],
  "jpg-to-webp": [
    { q: "How much space can I save?", a: "Converting JPG to WebP can reduce file size by an average of 30% without any visible loss in image quality." },
    { q: "Will my SEO improve?", a: "Using WebP is a specific recommendation by Google PageSpeed Insights to improve your Core Web Vitals score." }
  ],
  "webp-to-jpg": [
    { q: "Are WebP files compatible with all devices?", a: "While most modern browsers support WebP, some older mobile devices and email clients require JPG for full compatibility." },
    { q: "Can I adjust the quality?", a: "Yes, our converter allows you to set the quality slider to find the right balance between file size and visual clarity." }
  ]
}

// All tools for the hub — format converters + new tools
const formatTools = [
  { label: "JPG → PNG", path: "/jpg-to-png" },
  { label: "PNG → JPG", path: "/png-to-jpg" },
  { label: "PNG → WebP", path: "/png-to-webp" },
  { label: "WebP → PNG", path: "/webp-to-png" },
  { label: "JPG → WebP", path: "/jpg-to-webp" },
  { label: "WebP → JPG", path: "/webp-to-jpg" },
]

const extraTools = [
  { label: "HEIC → JPG", path: "/heic-to-jpg", badge: "iPhone" },
  { label: "Compress Image", path: "/compress-image", badge: "New" },
]

const currentKey = computed(() => {
  const path = route.path.replace('/', '')
  return Object.keys(titleMap).includes(path) ? path : 'default'
})

const currentSeo = computed(() => {
  const key = currentKey.value
  return {
    title: titleMap[key] || "Free Online Image Converter",
    desc: descriptionMap[key] || "Convert images locally and securely in your browser. Fast, free, and no server uploads."
  }
})

useHead({
  title: () => currentSeo.value.title,
  meta: [
    { name: 'description', content: () => currentSeo.value.desc },
    { property: 'og:title', content: () => currentSeo.value.title },
    { property: 'og:description', content: () => currentSeo.value.desc },
  ],
})

const pageTitle = computed(() => currentSeo.value.title)
const longDescription = computed(() => descriptionMap[currentKey.value] || '')

function handleFile(file) { selectedFile.value = file }
function convertImage(options) {
  if (!selectedFile.value) { success.value = false; showModal.value = true; return; }
  const { format, quality } = options
  isLoading.value = true
  const img = new Image()
  img.src = URL.createObjectURL(selectedFile.value)
  img.onload = () => {
    try {
      const canvas = document.createElement("canvas")
      canvas.width = img.width; canvas.height = img.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        isLoading.value = false
        if (!blob) success.value = false
        else { resultUrl.value = URL.createObjectURL(blob); success.value = true; }
        showModal.value = true
      }, format, format === "image/png" ? undefined : quality)
    } catch { isLoading.value = false; success.value = false; showModal.value = true; }
  }
}
function closeModal() { showModal.value = false }
</script>

<template>
  <Navbar />
  <div class="container">

    <!-- Tool hub nav -->
    <nav class="tool-hub">
      <div class="hub-group">
        <span class="hub-label">Format convert</span>
        <div class="hub-pills">
          <router-link
            v-for="t in formatTools"
            :key="t.path"
            :to="t.path"
            class="pill"
            active-class="pill-active"
          >{{ t.label }}</router-link>
        </div>
      </div>
      <div class="hub-group">
        <span class="hub-label">More tools</span>
        <div class="hub-pills">
          <router-link
            v-for="t in extraTools"
            :key="t.path"
            :to="t.path"
            class="pill pill-extra"
            active-class="pill-active"
          >
            {{ t.label }}
            <span class="badge">{{ t.badge }}</span>
          </router-link>
        </div>
      </div>
    </nav>

    <header class="tool-header">
      <h1>{{ pageTitle }}</h1>
      <p class="subtitle">Secure, Browser-Based Image Conversion. <strong>No Uploads Required.</strong></p>
    </header>

    <UploadBox @file-selected="handleFile" />
    <ConvertOptions @convert="convertImage" />

    <section class="info-section guide-card" v-if="longDescription">
      <h2>Understanding This Tool</h2>
      <p class="long-desc">{{ longDescription }}</p>
    </section>

    <section class="info-section privacy-badge">
      <div class="icon">🛡️</div>
      <div>
        <h3>Privacy-First Technology</h3>
        <p>Unlike other sites, we process your photos locally. Your files never touch our servers, protecting your privacy 100%.</p>
      </div>
    </section>

    <section class="info-section faq-section" v-if="faqMap[currentKey]">
      <h2>Frequently Asked Questions</h2>
      <div v-for="(item, index) in faqMap[currentKey]" :key="index" class="faq-item">
        <h3>{{ item.q }}</h3>
        <p>{{ item.a }}</p>
      </div>
    </section>

    <section class="info-section knowledge-base">
      <h2>Image Optimization Resources</h2>
      <div class="links-grid">
        <router-link to="/blog/webp-vs-png" class="blog-link">WebP vs PNG Comparison</router-link>
        <router-link to="/blog/image-formats" class="blog-link">Understanding Image Formats</router-link>
        <router-link to="/about" class="blog-link">About Our Mission</router-link>
      </div>
    </section>
  </div>

  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <button class="modal-close" @click="closeModal">×</button>
      <div class="status-icon" :class="success ? 'success-icon' : 'error-icon'">{{ success ? "✓" : "!" }}</div>
      <h2>{{ success ? "Conversion Complete" : "Error" }}</h2>
      <p>{{ success ? "Your image has been converted safely in your browser." : "Please upload a valid file." }}</p>
      <a v-if="success" :href="resultUrl" download="converted-image" class="download-btn">Download Now</a>
    </div>
  </div>

  <div v-if="isLoading" class="loading-overlay">Converting in Browser...</div>
  <Footer />
</template>

<style scoped>
.container { max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: sans-serif; }

/* Tool hub */
.tool-hub {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding: 16px 20px;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 36px;
}
.hub-group { display: flex; flex-direction: column; gap: 8px; }
.hub-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #aaa; font-weight: 600; }
.hub-pills { display: flex; flex-wrap: wrap; gap: 6px; }
.pill {
  padding: 5px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 13px;
  color: #444;
  text-decoration: none;
  transition: all 0.15s;
  white-space: nowrap;
}
.pill:hover { border-color: #111; color: #111; }
.pill-active { background: #111; color: #fff; border-color: #111; }
.pill-extra { border-color: #c40000; color: #c40000; }
.pill-extra:hover, .pill-extra.pill-active { background: #c40000; color: #fff; }
.badge {
  display: inline-block;
  margin-left: 5px;
  padding: 1px 6px;
  background: #fff0f0;
  color: #c40000;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 700;
  vertical-align: middle;
}
.pill-active .badge, .pill-extra:hover .badge { background: rgba(255,255,255,0.25); color: #fff; }

/* Header */
.tool-header { text-align: center; margin-bottom: 40px; }
.tool-header h1 { font-size: 2.2rem; color: #111; margin-bottom: 10px; }
.subtitle { font-size: 1.1rem; color: #666; }

/* Info sections */
.info-section { margin-top: 50px; line-height: 1.7; }
.guide-card { border-left: 5px solid #111; background: #fafafa; padding: 20px; }
.long-desc { color: #444; font-size: 16px; }
.privacy-badge { display: flex; align-items: center; gap: 20px; background: #e8f5e9; padding: 25px; border-radius: 8px; border: 1px solid #c8e6c9; }
.privacy-badge .icon { font-size: 32px; }
.privacy-badge h3 { margin: 0; color: #2e7d32; }
.faq-section .faq-item { margin-bottom: 25px; }
.faq-section h3 { font-size: 1.15rem; color: #111; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
.faq-section p { color: #555; }
.knowledge-base { border-top: 2px solid #eee; padding-top: 30px; }
.links-grid { display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px; }
.blog-link { background: #111; color: white; padding: 8px 15px; text-decoration: none; font-size: 14px; border-radius: 4px; }
.blog-link:hover { opacity: 0.8; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal { background: white; padding: 40px; border-radius: 12px; max-width: 400px; text-align: center; position: relative; }
.modal-close { position: absolute; top: 10px; right: 10px; border: none; background: none; font-size: 24px; cursor: pointer; }
.status-icon { width: 60px; height: 60px; margin: 0 auto 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; color: white; }
.success-icon { background: #2e7d32; }
.error-icon { background: #c62828; }
.download-btn { display: inline-block; margin-top: 20px; background: #111; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; }
.loading-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.9); display: flex; justify-content: center; align-items: center; z-index: 2000; font-weight: bold; }
</style>