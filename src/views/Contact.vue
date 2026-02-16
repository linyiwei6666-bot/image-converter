<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
</script>

<template>
  <Navbar />

  <div class="container contact">
    <h1>Contact Us</h1>

    <p class="intro">
      If you have questions, suggestions, or feedback about our online image converter,
      feel free to contact us. We value your feedback and will do our best to improve the service.
    </p>

    <div class="contact-wrapper">
      <!-- 联系信息 -->
      <div class="contact-info">
        <h2>Get in Touch</h2>

        <p>
          📧 Email:
          <a href="mailto:support@yourdomain.com">
            support@yourdomain.com
          </a>
        </p>

        <p>
          We typically respond within 24–48 hours.
        </p>
      </div>

      <!-- 社交二维码 -->
      <div class="social-box">
        <div class="social-inner">
          
          <!-- 左侧二维码 -->
          <div class="qr-wrapper">
            <img src="/3de39abd2ca682368623e0b1c9ffcdef.jpg" alt="Xiaohongshu QR Code" />
          </div>

          <!-- 右侧文字 -->
          <div class="social-content">
            <h2>Follow Us on Xiaohongshu</h2>

            <p class="social-desc">
              Get image optimization tips, tool updates, and useful design tricks.
            </p>

            <p class="social-note">
              Scan the QR code to follow us and stay updated 🚀
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
