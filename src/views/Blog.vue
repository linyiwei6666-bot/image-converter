<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"

const posts = [
  {
    title: "How to Convert JPG to PNG",
    path: "/blog/jpg-to-png",
    description: "Learn how to convert JPG images to PNG format online quickly and securely."
  },
  {
    title: "WEBP vs PNG: Which Format is Better?",
    path: "/blog/webp-vs-png",
    description: "Compare WEBP and PNG formats to choose the best option for your website."
  },
  {
    title: "Best Image Formats for Web",
    path: "/blog/image-formats",
    description: "Understand the differences between JPG, PNG, and WEBP formats."
  }
]
</script>

<template>
  <Navbar />

  <div class="container blog">
    <h1>Image Conversion Blog</h1>
    <p class="intro">
      Learn more about image formats, optimization, and online conversion tools.
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

