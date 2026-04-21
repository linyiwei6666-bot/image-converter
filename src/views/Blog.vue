<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import { useHead } from '@vueuse/head'

useHead({
  title: 'Blog — Image Formats, Conversion & Web Performance',
  meta: [
    { name: 'description', content: 'Articles about image formats, real test results, and web performance — written by the developer who built this converter.' },
    { property: 'og:title', content: 'Blog — ImageConverter' },
    { property: 'og:description', content: 'Format comparisons, encoding tradeoffs, and notes from building a browser-based image converter.' },
    { name: 'robots', content: 'index, follow' }
  ]
})

const posts = [
  {
    title: "The AI Bubble: Why the Trillion-Dollar GenAI Valuation is a Technical Illusion",
    path: "/blog/ai-market-bubble-analysis",
    description: "As GenAI's ROI fails to meet massive infrastructure costs, a market correction seems inevitable. We analyze the 'Nvidia Tax,' the 'Scaling Wall,' and why the future of AI belongs to local-first, privacy-centric models rather than trillion-parameter cloud giants."
  },
  {
    title: "How to Convert JPG to PNG — And When You Actually Should",
    path: "/blog/jpg-to-png",
    description: "The file gets bigger, not smaller. There are really only two situations where JPG to PNG makes sense — and a lot of cases where it quietly makes things worse."
  },
  {
    title: "WebP vs PNG: The Honest Comparison",
    path: "/blog/webp-vs-png",
    description: "Everyone says WebP is smaller. Usually true — but I ran tests on 60 real images and PNG won on most of the screenshots. Context matters more than the generic advice."
  },
  {
    title: "JPG, PNG, WebP, AVIF, SVG — Which One Should You Actually Use?",
    path: "/blog/image-formats",
    description: "The standard advice is correct but too simplified to be useful. Here's a more honest version, including the cases where the usual rules are wrong."
  },
  {
    title: "WebP: What It Is, Why It Works, and Where It Falls Short",
    path: "/blog/Ultimate-Guide-to-WebP",
    description: "I recommend WebP more than any other format — but not because of marketing. Here's how predictive coding actually works, real numbers from my tests, and three situations where I'd pick something else."
  },
  {
    title: "AVIF vs WebP: What I Found After a Year of Running This Converter",
    path: "/blog/AVIF-vs-WebP",
    description: "AVIF compression is genuinely impressive on the right images. I also tried to build AVIF support into this site, and it didn't go smoothly. Here's both: the format comparison, and an honest update."
  },
  {
    title: "Images and LCP: How I Fixed a 5-Second Load Time",
    path: "/blog/Core-Web-Vitals",
    description: "My own site had an LCP of 5.2 seconds because of one PNG I hadn't thought about. Converting it to WebP took LCP to 1.8 seconds on mobile. Here's what changed and what actually matters."
  },
  {
    title: "Why Do Images Load So Slowly? (And What I Learned Building This Converter)",
    path: "/blog/why-images-load-slows",
    description: "Your images load fast on your machine because you already downloaded them. Here's what actually determines image load time for real users — and what I changed after figuring this out."
  }

]
</script>

<template>
  <Navbar />

  <div class="container blog">
    <h1>Image Conversion Blog</h1>
    <p class="intro">
      Things I've found while building and maintaining this converter — format comparisons with real test numbers, performance fixes, and the occasional thing that surprised me.
    </p>

    <div class="post" v-for="post in posts" :key="post.path">
    <router-link :to="post.path" class="post-link">
        <div class="post-card">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <span class="read-more">Read More →</span>
        </div>
    </router-link>
    </div>

  </div>

  <Footer />
</template>

<style scoped>
.blog {
  padding: 70px 0;
  max-width: 1000px;
  margin: 0 auto;
}

/* 页面主标题 */
h1 {
  font-size: 32px;
  margin-bottom: 15px;
  color: #111;
  position: relative;
  padding-bottom: 15px;
}

h1::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 70px;
  height: 4px;
  background: var(--primary);
}

.intro {
  margin-bottom: 50px;
  color: #555;
  font-size: 15px;
}

/* 文章链接去除默认样式 */
.post-link {
  text-decoration: none;
  color: inherit;
}

/* 卡片 */
.post-card {
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 28px 30px;
  margin-bottom: 30px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

/* Hover效果 */
.post-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  border-color: var(--primary);
}

/* 标题 */
.post-card h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #111;
  transition: color 0.3s ease;
}

/* hover时标题变红 */
.post-card:hover h2 {
  color: var(--primary);
}

/* 描述 */
.post-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 18px;
}

/* Read more按钮 */
.read-more {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
  transition: all 0.3s ease;
}

/* hover时箭头滑动 */
.post-card:hover .read-more {
  letter-spacing: 1px;
}

/* 分割线 */
.post-card::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 30px;
  width: 0;
  height: 3px;
  background: var(--primary);
  transition: width 0.3s ease;
}

/* hover底部红线拉伸 */
.post-card:hover::after {
  width: calc(100% - 60px);
}
</style>

