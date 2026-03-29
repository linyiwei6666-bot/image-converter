<script setup>
import { ref, computed } from "vue"
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import UploadBox from "../components/UploadBox.vue"
import { useHead } from "@vueuse/head"

useHead({
  title: "Compress Images Free — No Upload, Instant Results",
  meta: [
    { name: "description", content: "Compress JPG, PNG and WebP images without losing quality. Runs entirely in your browser — no upload, no account needed." },
    { property: "og:title", content: "Compress Images Free — No Upload, Instant Results" },
    { property: "og:description", content: "Compress JPG, PNG and WebP images without losing quality. Runs entirely in your browser — no upload, no account needed." },
  ],
})

const selectedFile = ref(null)
const isLoading = ref(false)
const showModal = ref(false)
const success = ref(false)
const resultUrl = ref(null)
const resultFilename = ref("")
const originalSize = ref(0)
const compressedSize = ref(0)

// Compression settings
const maxSizeMB = ref(1)        // target max file size in MB
const maxWidthOrHeight = ref(1920)
const useWebWorker = true

function handleFile(file) {
  selectedFile.value = file
  originalSize.value = file.size
  resultUrl.value = null
  success.value = false
}

async function compressImage() {
  if (!selectedFile.value) {
    success.value = false
    showModal.value = true
    return
  }
  isLoading.value = true
  try {
    const imageCompression = (await import("browser-image-compression")).default
    const options = {
      maxSizeMB: maxSizeMB.value,
      maxWidthOrHeight: maxWidthOrHeight.value,
      useWebWorker: true,
    }
    const compressed = await imageCompression(selectedFile.value, options)
    compressedSize.value = compressed.size

    // Preserve original filename and extension
    const ext = selectedFile.value.name.split(".").pop()
    resultFilename.value = selectedFile.value.name.replace(`.${ext}`, `_compressed.${ext}`)
    resultUrl.value = URL.createObjectURL(compressed)
    success.value = true
  } catch {
    success.value = false
  }
  isLoading.value = false
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function formatSize(bytes) {
  if (bytes === 0) return "—"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

const savingsPct = computed(() => {
  if (!originalSize.value || !compressedSize.value) return null
  return Math.round((1 - compressedSize.value / originalSize.value) * 100)
})

// Human-readable target size label
const targetLabel = computed(() => {
  if (maxSizeMB.value < 1) return Math.round(maxSizeMB.value * 1024) + " KB"
  return maxSizeMB.value + " MB"
})
</script>

<template>
  <Navbar />
  <div class="container">

    <header class="tool-header">
      <h1>Compress Images Free — No Upload, Instant Results</h1>
      <p class="subtitle">Reduce JPG, PNG and WebP file size without visible quality loss. <strong>Everything runs in your browser.</strong></p>
    </header>

    <UploadBox @file-selected="handleFile" accept=".jpg,.jpeg,.png,.webp" />

    <!-- File info strip -->
    <div v-if="selectedFile" class="file-strip">
      <span class="file-name">{{ selectedFile.name }}</span>
      <span class="file-size">{{ formatSize(originalSize) }}</span>
    </div>

    <!-- Compression options -->
    <div class="options">
      <h3>Compression Settings</h3>

      <div class="option-group">
        <label>Target file size — {{ targetLabel }}</label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          v-model.number="maxSizeMB"
        />
        <p class="hint">The tool will try to compress to under this size. Lower = smaller file, but may reduce quality.</p>
      </div>

      <div class="option-group">
        <label>Max dimension — {{ maxWidthOrHeight }}px</label>
        <input
          type="range"
          min="800"
          max="4000"
          step="200"
          v-model.number="maxWidthOrHeight"
        />
        <p class="hint">Images wider or taller than this will be scaled down proportionally. Set to 4000px to preserve full resolution.</p>
      </div>

      <!-- Preset buttons -->
      <div class="presets">
        <span class="preset-label">Presets:</span>
        <button class="preset-btn" @click="maxSizeMB = 0.2; maxWidthOrHeight = 1200">Web thumbnail</button>
        <button class="preset-btn" @click="maxSizeMB = 1; maxWidthOrHeight = 1920">Balanced</button>
        <button class="preset-btn" @click="maxSizeMB = 3; maxWidthOrHeight = 4000">High quality</button>
      </div>

      <button class="convert-btn" @click="compressImage" :disabled="!selectedFile">
        Compress Image
      </button>
    </div>

    <!-- Info sections -->
    <section class="info-section guide-card">
      <h2>Understanding This Tool</h2>
      <p class="long-desc">
        Most images leaving a camera or design tool are far larger than they need to be on the web.
        A 4 MB PNG from Figma, a 6 MB photo from an iPhone — neither needs to be that size to look
        sharp on screen. This tool applies smart lossy compression and optional downscaling, then
        gives you back a file that's typically 60–80% smaller with no visible difference at normal
        viewing sizes. Everything runs in your browser via WebAssembly; the original file is never
        uploaded anywhere.
      </p>
    </section>

    <section class="info-section privacy-badge">
      <div class="icon">🛡️</div>
      <div>
        <h3>Privacy-First Technology</h3>
        <p>Unlike other sites, we process your photos locally. Your files never touch our servers, protecting your privacy 100%.</p>
      </div>
    </section>

    <section class="info-section faq-section">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-item">
        <h3>How much can I compress without losing quality?</h3>
        <p>For photographs, compressing to 70–80% of the original quality is typically invisible to the naked eye. The "Balanced" preset targets this range. For graphics with flat colours (logos, screenshots), PNG compression is lossless so you won't lose any quality at all.</p>
      </div>
      <div class="faq-item">
        <h3>Does this compress PNG files?</h3>
        <p>Yes. PNG compression is lossless — the tool optimises the PNG data structure without removing any image information. File size reductions on PNG are usually smaller (10–40%) compared to JPG, but no quality is lost.</p>
      </div>
      <div class="faq-item">
        <h3>Why compress images for a website?</h3>
        <p>Image size is the single biggest factor in page load time. Google's Core Web Vitals score — which directly affects search rankings — heavily penalises slow-loading images. Compressing before upload is the easiest fix.</p>
      </div>
    </section>

  </div>

  <!-- Result modal -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <button class="modal-close" @click="closeModal">×</button>
      <div class="status-icon" :class="success ? 'success-icon' : 'error-icon'">
        {{ success ? "✓" : "!" }}
      </div>
      <h2>{{ success ? "Compression Complete" : "Something Went Wrong" }}</h2>

      <template v-if="success">
        <div class="size-comparison">
          <div class="size-block">
            <p class="size-label">Before</p>
            <p class="size-value">{{ formatSize(originalSize) }}</p>
          </div>
          <div class="arrow">→</div>
          <div class="size-block">
            <p class="size-label">After</p>
            <p class="size-value highlight">{{ formatSize(compressedSize) }}</p>
          </div>
        </div>
        <p v-if="savingsPct > 0" class="savings-note">
          <span class="badge">{{ savingsPct }}% smaller</span> — compressed in your browser
        </p>
        <a :href="resultUrl" :download="resultFilename" class="download-btn">Download Compressed Image</a>
      </template>

      <template v-else>
        <p>Please upload a valid JPG, PNG or WebP image and try again.</p>
      </template>
    </div>
  </div>

  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>Compressing in browser…</p>
  </div>

  <Footer />
</template>

<style scoped>
.container { max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: sans-serif; }
.tool-header { text-align: center; margin-bottom: 40px; }
.tool-header h1 { font-size: 2.2rem; color: #111; margin-bottom: 10px; }
.subtitle { font-size: 1.1rem; color: #666; }

/* File strip */
.file-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 10px 16px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #444;
}
.file-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70%; }
.file-size { color: #888; flex-shrink: 0; }

/* Options */
.options {
  margin-top: 30px;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 6px;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.options h3 { margin: 0 0 20px; font-size: 18px; }
.option-group { margin-bottom: 24px; display: flex; flex-direction: column; gap: 8px; }
.option-group label { font-size: 14px; color: #555; font-weight: 600; }
.option-group input[type="range"] { width: 100%; }
.hint { font-size: 13px; color: #888; margin: 0; }

/* Presets */
.presets { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.preset-label { font-size: 13px; color: #888; }
.preset-btn {
  padding: 6px 14px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  color: #333;
}
.preset-btn:hover { border-color: #111; background: #f5f5f5; }

.convert-btn {
  margin-top: 10px;
  background: #c40000;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 16px;
}
.convert-btn:hover:not(:disabled) { background: #a80000; }
.convert-btn:disabled { background: #ccc; cursor: not-allowed; }

/* Info sections */
.info-section { margin-top: 50px; line-height: 1.7; }
.guide-card { border-left: 5px solid #111; padding: 20px; background: #fafafa; }
.long-desc { color: #444; font-size: 16px; margin: 0; }
.privacy-badge { display: flex; align-items: center; gap: 20px; background: #e8f5e9; padding: 25px; border-radius: 8px; border: 1px solid #c8e6c9; }
.privacy-badge .icon { font-size: 32px; }
.privacy-badge h3 { margin: 0; color: #2e7d32; }
.faq-section .faq-item { margin-bottom: 25px; }
.faq-section h3 { font-size: 1.05rem; color: #111; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
.faq-section p { color: #555; margin: 0; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal { background: white; padding: 40px; border-radius: 12px; max-width: 420px; width: 90%; text-align: center; position: relative; }
.modal-close { position: absolute; top: 10px; right: 10px; border: none; background: none; font-size: 24px; cursor: pointer; }
.status-icon { width: 60px; height: 60px; margin: 0 auto 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; color: white; }
.success-icon { background: #2e7d32; }
.error-icon { background: #c62828; }

/* Size comparison in modal */
.size-comparison { display: flex; align-items: center; justify-content: center; gap: 16px; margin: 16px 0 8px; }
.size-block { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.size-label { font-size: 12px; color: #888; margin: 0; text-transform: uppercase; letter-spacing: 0.05em; }
.size-value { font-size: 20px; font-weight: 700; color: #111; margin: 0; }
.size-value.highlight { color: #2e7d32; }
.arrow { font-size: 24px; color: #ccc; }
.savings-note { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; color: #555; margin: 6px 0 0; }
.badge { background: #e8f5e9; color: #2e7d32; padding: 2px 10px; border-radius: 12px; font-size: 13px; font-weight: 700; }
.download-btn { display: inline-block; margin-top: 20px; background: #111; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; }

/* Loading */
.loading-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.92); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; z-index: 2000; font-weight: bold; }
.spinner { width: 40px; height: 40px; border: 3px solid #eee; border-top-color: #c40000; border-radius: 50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>