<script setup>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import UploadBox from "../components/UploadBox.vue"
import ConvertOptions from "../components/ConvertOptions.vue"
import { useHead } from "@vueuse/head" // 导入 useHead

const route = useRoute()
const selectedFile = ref(null)
const showModal = ref(false)
const success = ref(false)
const resultUrl = ref(null)
const isLoading = ref(false)
// 1. 将数据映射提取出来（保持不变或进一步丰富）

const titleMap = {
  "jpg-to-png": "JPG to PNG Converter",
  "png-to-jpg": "PNG to JPG Converter",
  "png-to-webp": "PNG to WEBP Converter",
  "webp-to-png": "WEBP to PNG Converter",
  "jpg-to-webp": "JPG to WEBP Converter",
  "webp-to-jpg": "WEBP to JPG Converter",
}


const descriptionMap = {
  "jpg-to-png": `
    Looking to preserve image quality or add transparency? Our JPG to PNG converter is the perfect solution. 
    While JPG uses lossy compression that can degrade quality over time, PNG (Portable Network Graphics) offers 
    lossless compression, ensuring every pixel remains crisp. This conversion is essential for designers 
    who need to remove backgrounds or work with logos and icons that require a transparent layer. 
    By processing your files directly in your browser using Vue 3 technology, we ensure your data never 
    leaves your device, providing 100% privacy and lightning-fast results.
  `,
  
  "png-to-jpg": `
    Need to reduce your image file size for faster web loading? Converting PNG to JPG is one of the most effective 
    ways to optimize digital photos. PNG files are often unnecessarily large for standard photography. 
    By switching to JPG (Joint Photographic Experts Group), you can significantly decrease the file footprint 
    without noticeable loss in visual quality. This is ideal for bloggers, social media managers, and 
    web developers aiming to improve their site's Core Web Vitals and SEO performance. Our tool handles 
    the compression locally, so you don't have to worry about bandwidth or data security.
  `,

  "png-to-webp": `
    Take your website's performance to the next level by converting PNG to WebP. WebP is a modern, 
    next-generation image format developed by Google that provides superior lossless and lossy compression. 
    On average, WebP images are 26% smaller than PNGs while maintaining the same high-quality transparency. 
    This conversion is a "must-have" for modern SEO, as smaller image files lead to faster PageSpeed scores. 
    Whether you are building a professional portfolio or an e-commerce store, our browser-based converter 
    makes it easy to adopt the latest web standards instantly without any software installation.
  `,

  "webp-to-png": `
    Encountering compatibility issues with WebP files? While WebP is great for the web, many older 
    image editors, operating systems, and professional printing services still don't fully support it. 
    Converting WebP back to PNG allows you to regain full editability and lossless quality. 
    This is especially useful for graphic designers who need to import web assets into software like 
    older versions of Photoshop or Illustrator. Our tool ensures that the conversion process 
    remains high-fidelity, giving you a clean, uncompressed PNG file ready for any professional project.
  `,

  "jpg-to-webp": `
    Upgrade your image library with our JPG to WebP converter. As Google continues to prioritize 
    mobile-first indexing and fast loading speeds, switching your standard JPG photos to the 
    modern WebP format is a smart SEO move. WebP offers 25-34% smaller file sizes compared to 
    equivalent JPG images, meaning your pages will load faster and consume less data for your users. 
    Our tool utilizes the power of your browser's local processing to handle the conversion, 
    meaning no waiting for server uploads and no risk to your personal photo privacy.
  `,

  "webp-to-jpg": `
    The most universal way to share your photos is by converting WebP to JPG. While WebP is 
    efficient, it can sometimes be a headache when trying to upload images to certain social media 
    platforms, online forms, or viewing them on older mobile devices. JPG remains the world's 
    most compatible image format. By using our converter, you can quickly transform any WebP file 
    into a standard JPG that works everywhere—from email attachments to digital photo frames. 
    Best of all, you can adjust the quality settings during conversion to find the perfect 
    balance between file size and visual clarity.
  `
}


// 2. 使用计算属性获取当前页面的 SEO 信息
const currentSeo = computed(() => {
  const key = Object.keys(titleMap).find(k => route.path.includes(k))
  if (key) {
    return {
      title: titleMap[key],
      desc: descriptionMap[key]
    }
  }
  return {
    title: "Free Online Image Converter - JPG, PNG, WEBP",
    desc: "Convert images directly in your browser. Fast, secure, and free."
  }
})

// 3. 【关键核心】将信息注入到 HTML 的 <head> 中
useHead({
  title: () => currentSeo.value.title,
  meta: [
    {
      name: 'description',
      content: () => currentSeo.value.desc,
    },
    // 增加 Open Graph 标签，方便在社交媒体（X, Facebook）分享
    { property: 'og:title', content: () => currentSeo.value.title },
    { property: 'og:description', content: () => currentSeo.value.desc },
  ],
})

// 页面内部使用的变量可以关联到计算属性
const pageTitle = computed(() => currentSeo.value.title)
const description = computed(() => currentSeo.value.desc)

// handleFile, convertImage 等逻辑保持不变...
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
    <section class="route-description">
      <h2>About This Conversion</h2>
      <p>{{ description }}</p>
    </section>

    <section class="convert-content">
      <h2>How to Convert Images Online</h2>

      <p>
        Our online image converter allows you to quickly change image formats
        between JPG, PNG, and WEBP directly in your browser.
        Simply upload your file, select your desired format,
        and download the converted image instantly.
      </p>

      <p>
        Image format conversion is useful when optimizing images for websites,
        reducing file size, or improving compatibility across platforms.
        For example, WEBP offers better compression for web performance,
        while PNG supports transparency for graphics and logos.
      </p>

      <p>
        Unlike traditional tools that require server uploads,
        our converter processes files locally in your browser.
        This ensures maximum privacy and security for your images.
      </p>

      <h2>Supported Image Formats</h2>

      <ul>
        <li><strong>JPG (JPEG)</strong> – Best for photographs and compressed images.</li>
        <li><strong>PNG</strong> – Ideal for graphics and transparent backgrounds.</li>
        <li><strong>WEBP</strong> – Modern format optimized for web performance.</li>
      </ul>
    </section>



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

.convert-content {
  margin-top: 60px;
  line-height: 1.6;
}

.convert-content h2 {
  margin-bottom: 15px;
}

.convert-content p {
  margin-bottom: 16px;
  color: var(--gray);
}

.convert-content ul {
  margin-top: 10px;
  padding-left: 20px;
}

.route-description {
  margin-top: 60px;
  line-height: 1.6;
}

.route-description h2 {
  margin-bottom: 15px;
}

.route-description p {
  color: var(--gray);
}




</style>
