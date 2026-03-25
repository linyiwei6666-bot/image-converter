<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import { useHead } from '@vueuse/head'

useHead({
  title: 'Contact — ImageConverter',
  meta: [
    { name: 'description', content: 'Get in touch with the developer behind ImageConverter. Questions, bug reports, and feedback all go directly to me.' },
    { property: 'og:title', content: 'Contact — ImageConverter' },
    { property: 'og:description', content: 'Questions about a specific conversion or a bug you found? Drop me a message.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<template>
  <Navbar />

  <div class="container contact">
    <h1>Contact</h1>

    <p class="intro">
      Questions, bug reports, or feedback about a specific conversion — all goes directly to me.
      If something isn't working the way you expected, I'd rather know about it than not.
    </p>

    <div class="contact-wrapper">
      <!-- 联系信息 -->
      <div class="contact-info">
        <h2>Get in Touch</h2>

        <p>
          📧 Email:
          <a href="mailto:nasa07383@gmail.com">
            nasa07383@gmail.com
          </a>
        </p>

        <p>
          I usually get back within a day or two, sometimes longer depending on what's going on.
          Bug reports and questions about specific image types are especially useful.
        </p>
      </div>

      <!-- 社交二维码 -->
      <div class="social-box">
        <div class="social-inner">
          
          <!-- 左侧二维码 -->
          <div class="qr-wrapper">
            <img src="/qr-code.png" alt="Youtube QR Code" />
          </div>

          <!-- 右侧文字 -->
          <div class="social-content">
            <h2>Follow on Youtube</h2>

            <p class="social-desc">
              I post image optimization tips and occasional updates about the converter.
            </p>

            <p class="social-note">
              Scan the QR code to follow.
            </p>
          </div>

  </div>
</div>


    </div>
  </div>

  <Footer />
</template>

<style scoped>
.contact {
  padding: 60px 0;
}

h1 {
  margin-bottom: 20px;
}

.intro {
  max-width: 700px;
  margin-bottom: 50px;
  color: var(--gray);
  line-height: 1.6;
}

.contact-wrapper {
  display: flex;
  gap: 60px;
  flex-wrap: wrap;
}

/* 左侧信息 */
.contact-info {
  flex: 1;
  min-width: 260px;
}

.contact-info h2 {
  margin-bottom: 20px;
}

.contact-info p {
  margin-bottom: 14px;
  color: var(--gray);
}

.contact-info a {
  color: var(--primary);
}

/* 社交区域 */
.social-box {
  flex: 1;
  min-width: 300px;
  background: #fafafa;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.social-inner {
  display: flex;
  align-items: center;
  gap: 40px;
}

.qr-wrapper {
  flex-shrink: 0;
}

.qr-wrapper img {
  width: 160px;
  height: auto;
  border-radius: 12px;
  border: 1px solid #eee;
}

.social-content {
  flex: 1;
}

.social-content h2 {
  margin-bottom: 16px;
}

.social-desc {
  color: var(--gray);
  margin-bottom: 16px;
  line-height: 1.6;
}

.social-box h2 {
  margin-bottom: 20px;
}


.social-note {
  font-size: 14px;
  color: var(--gray);
}

</style>
