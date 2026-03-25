<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import { useHead } from '@unhead/vue'

useHead({
  title: 'Privacy Policy — ImageConverter.website',
  meta: [
    { name: 'description', content: 'ImageConverter processes all images locally in your browser. No uploads, no server storage, no tracking of your files. Read our full privacy policy.' },
    { property: 'og:title', content: 'Privacy Policy — ImageConverter.website' },
    { property: 'og:description', content: 'Your images never leave your device. Here\'s exactly how ImageConverter handles your data.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<template>
  <Navbar />

  <div class="container privacy">
    <div class="content-wrapper">
      <h1>Privacy Policy</h1>
      <p class="update">Last updated: March 2026</p>

      <section>
        <h2>The short version</h2>
        <p>
          When you convert an image on this site, nothing is uploaded anywhere. The conversion 
          happens entirely inside your browser using your device's own CPU. I have no access to 
          your files, I don't store them, and I don't transmit them. That's the whole point of 
          building it this way.
        </p>
        <p>
          The longer version below covers what data this site does collect (basic server logs 
          and analytics), how cookies work, and your rights. But if your main concern is 
          "does someone see my images" — the answer is no.
        </p>
      </section>

      <section>
        <h2>1. Image Processing</h2>
        <p>
          All image conversion on this site is performed client-side using browser APIs 
          (HTML5 Canvas and Blob objects). Your files are loaded into your browser's local 
          memory, processed there, and the result is made available for download — all 
          without any data leaving your device.
        </p>
        <p>
          I do not upload your images to any server. I do not store copies of your images. 
          I do not have access to what images you convert. This is true for every conversion 
          tool on this site.
        </p>
      </section>

      <section>
        <h2>2. Information Automatically Collected</h2>
        <p>
          Like most websites, this site's hosting provider automatically records standard 
          server log data when you visit. This may include:
        </p>
        <ul>
          <li>Your IP address</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and time spent</li>
          <li>Referring website (how you found this site)</li>
        </ul>
        <p>
          This data is used solely to understand general traffic patterns and diagnose 
          technical issues. It is not linked to any personally identifiable information 
          and is not shared with third parties for marketing purposes.
        </p>
      </section>

      <section>
        <h2>3. Analytics</h2>
        <p>
          This site uses basic analytics to understand which tools and pages are most used. 
          Analytics data is aggregated and anonymized — it tells me "the PNG to WebP tool 
          was used 200 times today," not who used it or what images were converted.
        </p>
      </section>

      <section>
        <h2>4. Cookies</h2>
        <p>
          This site uses cookies for basic functionality — remembering your preferences 
          (such as interface settings) and for analytics purposes described above. 
          Cookies do not track your image files or conversion activity.
        </p>
        <p>
          You can disable cookies through your browser settings. This may affect some 
          site functionality but will not affect image conversion, which requires no cookies.
        </p>
      </section>

      <section>
        <h2>5. Third-Party Services</h2>
        <p>
          This site may use third-party services including Google Analytics for traffic 
          analysis. These services have their own privacy policies. Google's privacy 
          policy is available at 
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.
        </p>
        <p>
          If advertising is displayed on this site in the future, it will be served by 
          Google AdSense and governed by Google's advertising privacy policies. 
          You can opt out of personalized advertising at 
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">google.com/settings/ads</a>.
        </p>
      </section>

      <section>
        <h2>6. Data Retention</h2>
        <p>
          Because no image data is collected or stored, there is no image data to retain 
          or delete. Server log data is retained for a limited period for technical 
          troubleshooting purposes and then deleted.
        </p>
      </section>

      <section>
        <h2>7. Children's Privacy</h2>
        <p>
          This site does not knowingly collect personal information from children under 13. 
          The service is a general-purpose image conversion tool with no age-restricted content.
        </p>
      </section>

      <section>
        <h2>8. Changes to This Policy</h2>
        <p>
          If this privacy policy changes in a material way, I'll update the date at the top 
          of this page. The core commitment — that your image files are never uploaded or 
          stored — will not change, as it is a fundamental part of how this tool works.
        </p>
      </section>

      <section>
        <h2>9. Contact</h2>
        <p>
          If you have questions about this privacy policy or how this site handles data, 
          please use the <router-link to="/contact">contact page</router-link>. 
          I read and respond to every message.
        </p>
      </section>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
.privacy {
  padding: 70px 20px;
  max-width: 780px;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  color: #111;
  margin-bottom: 8px;
  font-weight: 700;
}

.update {
  font-size: 13px;
  color: #999;
  margin-bottom: 52px;
}

section {
  margin-bottom: 44px;
}

h2 {
  font-size: 18px;
  color: #111;
  margin-bottom: 14px;
  font-weight: 700;
}

p {
  color: #444;
  line-height: 1.85;
  font-size: 15px;
  margin-bottom: 14px;
}

ul {
  padding-left: 22px;
  margin: 12px 0 18px;
}

li {
  color: #444;
  line-height: 1.7;
  font-size: 15px;
  margin-bottom: 6px;
}

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>