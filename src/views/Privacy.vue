<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import { useHead } from '@unhead/vue'

// 别忘了给法律页面也加上 SEO 信息，增加权重
useHead({
  title: 'Privacy Policy - ImageConverter.website',
  meta: [
    { name: 'description', content: 'Our Privacy Policy outlines how we handle your data. We prioritize your privacy with 100% browser-based image conversion.' }
  ]
})
</script>

<template>
  <Navbar />

  <div class="container privacy">
    <div class="content-wrapper">
      <h1>Privacy Policy</h1>
      <p class="update">Last updated: January 2026</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          At ImageConverter, accessible from our website, one of our main priorities is the privacy of our visitors. 
          This Privacy Policy document contains types of information that is collected and recorded by ImageConverter and how we use it.
        </p>
      </section>

      <section>
        <h2>2. Browser-Side Image Processing</h2>
        <p>
          <strong>Security Priority:</strong> All image conversions are performed locally in your browser using client-side technology. 
          We do not upload, store, or monitor your image files on our servers. Your original and converted files never leave your device, ensuring maximum privacy and security.
        </p>
      </section>

      <section>
        <h2>3. Log Files</h2>
        <p>
          ImageConverter follows a standard procedure of using log files. These files log visitors when they visit websites. 
          The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, and referring/exit pages. These are not linked to any information that is personally identifiable.
        </p>
      </section>

      <section>
        <h2>4. Cookies and Web Beacons</h2>
        <p>
          Like any other website, ImageConverter uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. 
          The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>
      </section>

      <section>
        <h2>5. Google DoubleClick DART Cookie</h2>
        <p>
          Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our website and other sites on the internet. 
        </p>
        <p>
          However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: 
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">https://policies.google.com/technologies/ads</a>
        </p>
      </section>

      <section>
        <h2>6. Third Party Privacy Policies</h2>
        <p>
          ImageConverter's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>
      </section>

      <section>
        <h2>7. Contact Information</h2>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through our Contact page or via our official email.
        </p>
      </section>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
/* 保持你原来的样式，增加一些最大宽度限制，让长文本更易读 */
.privacy {
  padding: 60px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.update {
  font-size: 14px;
  color: #666;
  margin-bottom: 40px;
}

section {
  margin-bottom: 40px;
}

h2 {
  margin-bottom: 15px;
  font-size: 20px;
  color: #333;
}

p {
  color: #555;
  line-height: 1.8;
  font-size: 15px;
  margin-bottom: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>