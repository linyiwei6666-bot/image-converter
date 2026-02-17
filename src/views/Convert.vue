<script setup>
import { ref, watch, onMounted } from "vue"
import { useRoute } from "vue-router"
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import UploadBox from "../components/UploadBox.vue"
import ConvertOptions from "../components/ConvertOptions.vue"

const route = useRoute()
const selectedFile = ref(null)
const showModal = ref(false)
const success = ref(false)
const resultUrl = ref(null)
const isLoading = ref(false)
const pageTitle = ref("Free Online Image Converter")

const titleMap = {
  "jpg-to-png": "JPG to PNG Converter",
  "png-to-jpg": "PNG to JPG Converter",
  "png-to-webp": "PNG to WEBP Converter",
  "webp-to-png": "WEBP to PNG Converter",
  "jpg-to-webp": "JPG to WEBP Converter",
  "webp-to-jpg": "WEBP to JPG Converter",
}

function updatePageTitle(path) {
  const key = Object.keys(titleMap).find(k => path.includes(k))
  pageTitle.value = key ? titleMap[key] : "Free Online Image Converter"
}

onMounted(() => updatePageTitle(route.path))
watch(() => route.path, (newPath) => updatePageTitle(newPath), { immediate: true })

function handleFile(file) { selectedFile.value = file }

function convertImage(options) {
  if (!selectedFile.value) {
    success.value = false
    showModal.value = true
    return
  }

  const { format, quality } = options
  isLoading.value = true

  const img = new Image()
  img.src = URL.createObjectURL(selectedFile.value)
  img.onload = () => {
    try {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0)

      canvas.toBlob(
        (blob) => {
          isLoading.value = false
          if (!blob) success.value = false
          else {
            resultUrl.value = URL.createObjectURL(blob)
            success.value = true
          }
          showModal.value = true
        },
        format,
        format === "image/png" ? undefined : quality
      )
    } catch {
      isLoading.value = false
      success.value = false
      showModal.value = true
    }
  }

  img.onerror = () => {
    isLoading.value = false
    success.value = false
    showModal.value = true
  }
}

function closeModal() { showModal.value = false }
</script>

<template>
  <Navbar />

  <div class="container">
    <h1>{{ pageTitle }}</h1>

    <UploadBox @file-selected="handleFile" />

    <ConvertOptions @convert="convertImage" />


    <!-- 页面广告位 ：主区域底部 -->
    <!-- <div class="adsense-slot">
      
      AdSense Space (728x90)
    </div> -->
  </div>

  <!-- 弹窗 -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <button class="modal-close" @click="closeModal"> × </button>

      <div class="status-icon" :class="success ? 'success-icon' : 'error-icon'">
        {{ success ? "✓" : "!" }}
      </div>

      <h2>{{ success ? "Conversion Successful" : "Conversion Failed" }}</h2>

      <p>{{ success ? "Your image has been successfully converted." : "Please upload a valid image and try again." }}</p>

      <a v-if="success" :href="resultUrl" download="converted-image" class="download-btn">
        Download Image
      </a>

      <!-- 弹窗广告位 -->
      <!-- <div class="adsense-modal">
        
        AdSense Space (300x250)
      </div> -->
    </div>
  </div>

  <div v-if="isLoading" class="loading-overlay">Converting...</div>

  <Footer />
</template>

<style scoped>
/* 页面广告占位样式 */
.adsense-slot {
  margin: 20px auto;
  padding: 15px;
  border: 1px dashed #ccc;
  text-align: center;
  font-size: 14px;
  color: #777;
}

/* 弹窗广告占位 */
.adsense-modal {
  margin: 20px auto 0;
  padding: 10px;
  border: 1px dashed #ccc;
  text-align: center;
  font-size: 13px;
  color: #777;
  max-width: 300px;
}

.adsense-slot {
  margin-top: 40px;
  padding: 20px;
  border: 1px dashed #ccc;
  text-align: center;
  font-size: 14px;
  color: #777;
}

/* modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

}



.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
}

.modal {
  background: #fff;
  width: 420px;
  padding: 35px 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.25s ease;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 18px;
  background: transparent;
  border: none;
  font-size: 22px;
  font-weight: 300;
  cursor: pointer;
  color: #888;
  transition: 0.2s;
}

.modal-close:hover {
  color: #c40000;
}

/* 图标 */
.status-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
}

.success-icon {
  background: #c40000;
  color: white;
}

.error-icon {
  background: #111;
  color: white;
}

.modal h2 {
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
}

.modal p {
  font-size: 14px;
  color: #555;
  margin-bottom: 25px;
  text-align: center;
}



/* 下载按钮 */
.download-btn {
  display: inline-block;
  background: #c40000;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.2s;
}

.download-btn:hover {
  background: #a80000;
}

/* 广告区域 */
.adsense-modal {
  margin: 30px 0 20px;
  padding: 15px;
  border: 1px dashed #ddd;
  border-radius: 6px;
  font-size: 13px;
  color: #777;
}

/* 关闭按钮 */
.close-btn {
  background: transparent;
  border: none;
  color: #555;
  font-size: 13px;
  cursor: pointer;
  margin-top: 10px;
}

.close-btn:hover {
  color: #111;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.download-btn {
  display: inline-block;
  margin: 20px auto 0;
  background: #111;
  color: white;
  padding: 10px 18px;
  text-decoration: none;
}

.close-btn {
  display: block;
  margin: 20px auto 0;
  background: transparent;
  border: 1px solid #111;
  padding: 8px 18px;
  cursor: pointer;
}

.adsense-modal {
  margin: 25px auto 0;
  padding: 15px;
  border: 1px dashed #ccc;
  font-size: 13px;
  color: #777;
  max-width: 300px;
}




.download-btn {
  display: inline-block;
  margin-top: 15px;
  background: #111;
  color: white;
  padding: 10px 16px;
  text-decoration: none;
}

.download-btn:hover {
  opacity: 0.9;
}

.close-btn {
  margin-top: 15px;
  background: transparent;
  border: 1px solid #111;
  padding: 8px 14px;
  cursor: pointer;
}

.adsense-modal {
  margin-top: 20px;
  padding: 15px;
  border: 1px dashed #ccc;
  text-align: center;
  font-size: 13px;
  color: #777;
}

/* loading */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
}


</style>
