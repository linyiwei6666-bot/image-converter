<script setup>
import { ref } from "vue"
import heic2any from "heic2any"
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import UploadBox from "../components/UploadBox.vue"
import { useHead } from "@vueuse/head"

useHead({
  title: "Convert HEIC to JPG — Free, No Upload",
  meta: [
    { name: "description", content: "Convert iPhone HEIC photos to JPG instantly in your browser. No upload, no account, completely private." },
    { property: "og:title", content: "Convert HEIC to JPG — Free, No Upload" },
    { property: "og:description", content: "Convert iPhone HEIC photos to JPG instantly in your browser. No upload, no account, completely private." },
  ],
})

const selectedFile = ref(null)
const isLoading = ref(false)
const showModal = ref(false)
const success = ref(false)
const resultUrl = ref(null)
const originalSize = ref(0)
const convertedSize = ref(0)
const quality = ref(0.85)

function handleFile(file) {
  selectedFile.value = file
  originalSize.value = file.size
  // Reset previous result
  resultUrl.value = null
  success.value = false
}

async function convertImage() {
  if (!selectedFile.value) {
    success.value = false
    showModal.value = true
    return
  }
  isLoading.value = true
  try {
    const blob = await heic2any({
      blob: selectedFile.value,
      toType: "image/jpeg",
      quality: quality.value,
    })
    // heic2any can return an array when HEIC contains multiple images
    const result = Array.isArray(blob) ? blob[0] : blob
    convertedSize.value = result.size
    resultUrl.value = URL.createObjectURL(result)
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

const savings = () => {
  if (!originalSize.value || !convertedSize.value) return null
  const pct = Math.round((1 - convertedSize.value / originalSize.value) * 100)
  return pct > 0 ? pct : null
}
</script>

<template>
  <Navbar />
  <div class="container">

    <header class="tool-header">
      <h1>Convert HEIC to JPG — Free, No Upload</h1>
      <p class="subtitle">iPhone photos converted instantly in your browser. <strong>Your files never leave your device.</strong></p>
    </header>

    <!-- UploadBox — add accept prop if your component supports it -->
    <UploadBox @file-selected="handleFile" accept=".heic,.HEIC" />

    <!-- File info strip (shows after a file is picked) -->
    <div v-if="selectedFile" class="file-strip">
      <span class="file-name">{{ selectedFile.name }}</span>
      <span class="file-size">{{ formatSize(originalSize) }}</span>
    </div>

    <!-- Quality control -->
    <div class="options">
      <div class="option-group">
        <label>Output quality — {{ Math.round(quality * 100) }}%</label>
        <input type="range" min="0.5" max="1" step="0.05" v-model="quality" />
        <p class="hint">85% is a great default. Lower for smaller files, higher to preserve fine detail.</p>
      </div>
      <button class="convert-btn" @click="convertImage" :disabled="!selectedFile">
        Convert to JPG
      </button>
    </div>

    <!-- Info sections (same pattern as your existing page) -->
    <section class="info-section guide-card">
      <h2>Understanding This Tool</h2>
      <p class="long-desc">
        iPhone and iPad cameras default to HEIC because it's roughly half the file size of a JPG
        at the same visual quality. The problem is compatibility — Windows apps, most social
        platforms, and many web services expect JPG and either reject HEIC outright or convert it
        badly. This tool converts in your browser using the same decoder Apple ships, so the colour
        profile and fine detail are preserved. Nothing is uploaded; the file never leaves your machine.
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
        <h3>Why can't I open HEIC files on Windows?</h3>
        <p>Windows doesn't include a HEIC decoder by default. You can install the Microsoft HEIF extension, or simply convert to JPG for universal compatibility — which is what this tool does.</p>
      </div>
      <div class="faq-item">
        <h3>Will I lose quality converting HEIC to JPG?</h3>
        <p>At quality 85% and above, the difference is invisible in normal viewing. Set the slider higher if you're printing or doing further editing. The original HEIC file stays untouched.</p>
      </div>
      <div class="faq-item">
        <h3>Does this work with Live Photos?</h3>
        <p>This tool converts the still image portion of a HEIC file. The motion part of a Live Photo is stored separately and isn't included in the HEIC itself.</p>
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
      <h2>{{ success ? "Conversion Complete" : "Conversion Failed" }}</h2>

      <template v-if="success">
        <div class="size-row">
          <span>{{ formatSize(originalSize) }} → {{ formatSize(convertedSize) }}</span>
          <span v-if="savings()" class="badge">–{{ savings() }}% smaller</span>
        </div>
        <p>Converted in your browser. Nothing was uploaded.</p>
        <a :href="resultUrl" download="converted.jpg" class="download-btn">Download JPG</a>
      </template>

      <template v-else>
        <p>Please upload a valid HEIC file. Make sure the file extension is .heic or .HEIC.</p>
      </template>
    </div>
  </div>

  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>Converting in browser…</p>
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

/* Options panel */
.options {
  margin-top: 30px;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 6px;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.option-group { margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px; }
.option-group label { font-size: 14px; color: #555; font-weight: 600; }
.option-group input[type="range"] { width: 100%; }
.hint { font-size: 13px; color: #888; margin: 0; }
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
.modal { background: white; padding: 40px; border-radius: 12px; max-width: 400px; width: 90%; text-align: center; position: relative; }
.modal-close { position: absolute; top: 10px; right: 10px; border: none; background: none; font-size: 24px; cursor: pointer; }
.status-icon { width: 60px; height: 60px; margin: 0 auto 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; color: white; }
.success-icon { background: #2e7d32; }
.error-icon { background: #c62828; }
.size-row { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 8px 0 12px; font-size: 15px; color: #444; }
.badge { background: #e8f5e9; color: #2e7d32; padding: 2px 10px; border-radius: 12px; font-size: 13px; font-weight: 600; }
.download-btn { display: inline-block; margin-top: 20px; background: #111; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; }

/* Loading */
.loading-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.92); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; z-index: 2000; font-weight: bold; }
.spinner { width: 40px; height: 40px; border: 3px solid #eee; border-top-color: #c40000; border-radius: 50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>