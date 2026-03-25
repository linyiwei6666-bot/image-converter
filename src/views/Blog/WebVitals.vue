<script setup>
import Navbar from "../../components/Navbar.vue"
import Footer from "../../components/Footer.vue"
import { useHead } from '@vueuse/head'

useHead({
  title: 'Images and LCP: How I Fixed a 5-Second Load Time With Format Conversion',
  meta: [
    { 
      name: 'description', 
      content: 'A practical walkthrough of how image formats affect Largest Contentful Paint and Core Web Vitals. Real before/after numbers, no fluff — from someone who maintains an image converter.' 
    },
    { property: 'og:title', content: 'How Image Formats Affect Your LCP Score — Real Numbers' },
    { property: 'og:description', content: 'Images are usually the largest element on a page, which makes them the biggest factor in LCP. Here\'s how to fix it without losing visual quality.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<template>
  <Navbar />

  <div class="container article">

    <div class="article-meta">
      <span class="category">Performance & SEO</span>
      <span class="date">March 2026 · 8 min read</span>
    </div>

    <h1>Images and LCP: How I Fixed a 5-Second Load Time With Format Conversion</h1>

    <p class="lede">
      When I first launched this site, the PageSpeed score was embarrassing. 
      The biggest culprit was the hero image — a PNG I'd grabbed from a design tool 
      without thinking about size. Fixing it taught me more about Core Web Vitals 
      than any tutorial I'd read. Here's what actually matters.
    </p>

    <nav class="toc">
      <p>In this article:</p>
      <ol>
        <li><a href="#what-is-lcp">What LCP actually measures</a></li>
        <li><a href="#images-and-lcp">Why images are almost always the problem</a></li>
        <li><a href="#format-impact">How image format affects load time</a></li>
        <li><a href="#cls-issue">The CLS problem nobody talks about</a></li>
        <li><a href="#practical-steps">What to actually do about it</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ol>
    </nav>

    <h2 id="what-is-lcp">What LCP actually measures</h2>
    <p>
      Largest Contentful Paint measures how long it takes for the biggest visible element 
      on the page to fully load. In most cases, that's a hero image, a large banner, 
      or the main article image. Google considers it "good" if it happens within 2.5 seconds.
    </p>
    <p>
      The reason Google chose this metric is that it correlates with how users perceive 
      page speed better than raw load time does. A page can technically "load" in 1 second 
      if all it does is show a spinner, but users experience it as slow because nothing 
      meaningful appeared. LCP tries to measure when the page actually looks like something.
    </p>
    <p>
      Where most sites fail: the biggest element is an image, and that image is large, 
      unoptimized, or not prioritized correctly. The browser discovers it late, fetches 
      it slowly, and LCP suffers.
    </p>

    <div class="honest-box">
      <h4>What happened on my own site</h4>
      <p>
        The hero section had a PNG exported directly from Figma. It was 1.4MB. 
        On a fast connection it loaded in about 3 seconds. On a mobile connection 
        it was taking 6–7 seconds. PageSpeed Insights was showing LCP of 5.2 seconds 
        and flagging it as "Poor."
      </p>
      <p>
        I converted it to WebP at 82% quality. The file dropped to 180KB. 
        LCP on mobile went to 1.8 seconds. Same visual quality — I couldn't 
        tell the difference looking at them side by side.
      </p>
    </div>

    <h2 id="images-and-lcp">Why images are almost always the LCP problem</h2>
    <p>
      Text renders from HTML, which loads early and fast. CSS loads early. 
      JavaScript can be deferred. Images, especially large ones, are often 
      discovered late in the loading process — the browser has to parse the HTML, 
      find the image reference, then start a separate fetch request for the image file. 
      If that file is large, it arrives late, and LCP is high.
    </p>
    <p>
      There's also a prioritization issue. By default, browsers treat most images 
      as lower priority than HTML, CSS, and scripts. Your hero image — the one that 
      determines your LCP score — might be sitting in a queue behind resources 
      that matter less. One of the most useful things I learned was the 
      <code>fetchpriority</code> attribute, which I'll come back to.
    </p>

    <h2 id="format-impact">How image format directly affects load time</h2>
    <p>
      File size and load time are directly connected. A smaller file arrives faster. 
      That's the whole argument for modern image formats — not that they look better, 
      but that they're smaller, so they arrive sooner, so LCP is lower.
    </p>
    <p>
      Here's a rough sense of the file size differences between formats for the same image:
    </p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Format</th>
            <th>Relative file size</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PNG (photo)</td>
            <td>Largest — often 3–5× JPG</td>
            <td>Lossless, every pixel stored. Not for photos on web.</td>
          </tr>
          <tr>
            <td>JPG</td>
            <td>Baseline</td>
            <td>Fine for photos, but larger than WebP/AVIF.</td>
          </tr>
          <tr>
            <td>WebP</td>
            <td>~65–75% of JPG</td>
            <td>Better compression, nearly universal browser support.</td>
          </tr>
          <tr>
            <td>AVIF</td>
            <td>~50–60% of JPG</td>
            <td>Best compression, slightly lower support, slow to encode.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      The practical implication: if your LCP element is a 1MB PNG, converting it to WebP 
      could take it to 150–200KB. That difference in download time, especially on mobile 
      connections, directly translates to LCP improvement.
    </p>

    <h2 id="cls-issue">The CLS problem nobody talks about</h2>
    <p>
      Cumulative Layout Shift (CLS) is a separate Core Web Vitals metric, but it's 
      often caused by the same images. When a browser loads an image without knowing 
      its dimensions in advance, it initially renders the page without reserving space 
      for the image. When the image loads, everything shifts down to make room. 
      That's a layout shift, and it feels jarring to users.
    </p>
    <p>
      The fix is simple and often missed: always specify width and height on your 
      image elements.
    </p>

    <pre class="code-block">&lt;!-- Bad: browser doesn't know how tall this will be --&gt;
&lt;img src="hero.webp" alt="Hero image"&gt;

&lt;!-- Good: browser reserves the right space immediately --&gt;
&lt;img src="hero.webp" alt="Hero image" width="1200" height="600"&gt;</pre>

    <p>
      You can use CSS to make the image responsive — <code>max-width: 100%; height: auto</code> — 
      while still providing the dimensions so the browser knows the aspect ratio. 
      This is one of those fixes that takes 5 minutes and has an immediate impact on CLS.
    </p>

    <h2 id="practical-steps">What to actually do about it</h2>
    <p>
      Start by running your URL through 
      <a href="https://pagespeed.web.dev" target="_blank" rel="noopener">PageSpeed Insights</a>. 
      Look specifically at the LCP element — it tells you what element caused the LCP score 
      and how long it took. If it's an image and it's either large or slow, that's your target.
    </p>
    <p>
      For the LCP image specifically, two things matter most:
    </p>
    <p>
      <strong>Convert it to WebP.</strong> If it's currently a PNG or JPG hero image, 
      converting to WebP is the fastest meaningful improvement. 
      Use the <router-link to="/png-to-webp">PNG to WebP tool</router-link> or 
      <router-link to="/jpg-to-webp">JPG to WebP tool</router-link> here — 
      your file stays local, nothing is uploaded.
    </p>
    <p>
      <strong>Add <code>fetchpriority="high"</code>.</strong> This tells the browser 
      to treat this image as high priority and fetch it early. Add it only to the 
      LCP image — adding it to everything defeats the purpose.
    </p>

    <pre class="code-block">&lt;picture&gt;
  &lt;source srcset="hero.webp" type="image/webp"&gt;
  &lt;img 
    src="hero.jpg" 
    alt="Hero image"
    width="1200" 
    height="600"
    fetchpriority="high"
  &gt;
&lt;/picture&gt;</pre>

    <p>
      For everything else on the page — images below the fold, article images, 
      thumbnails — add <code>loading="lazy"</code>. This defers their loading 
      until the user scrolls near them, which frees up bandwidth for the LCP image 
      to load faster.
    </p>

    <div class="nav-card">
      <div class="nav-content">
        <h4>Convert your images without uploading them</h4>
        <div class="nav-links">
          <router-link to="/png-to-webp" class="nav-btn highlight">PNG → WebP</router-link>
          <router-link to="/jpg-to-webp" class="nav-btn highlight">JPG → WebP</router-link>
          <router-link to="/webp-to-jpg" class="nav-btn">WebP → JPG</router-link>
        </div>
      </div>
    </div>

    <h2 id="faq">Frequently asked questions</h2>
    <div class="faq-wrapper">
      <div class="faq-box">
        <h3>Does Google penalize JPG or PNG images?</h3>
        <p>Not directly. Google doesn't care about format by name. It cares about LCP, which is driven by file size and loading order. JPG and PNG tend to produce larger files, which leads to slower LCP, which affects rankings. The format is the cause, not the direct issue.</p>
      </div>
      <div class="faq-box">
        <h3>Should I lazy-load my hero image?</h3>
        <p>No — this is a common mistake. Lazy loading tells the browser to delay fetching the image, which will hurt your LCP score. Use <code>fetchpriority="high"</code> on the LCP image. Use <code>loading="lazy"</code> on everything else.</p>
      </div>
      <div class="faq-box">
        <h3>Is it worth updating old blog post images?</h3>
        <p>Often yes. If old posts have large unoptimized images, converting them to WebP can improve their PageSpeed scores, which can contribute to ranking improvements on those specific pages. It's not glamorous work but it's effective.</p>
      </div>
      <div class="faq-box">
        <h3>My PageSpeed score is already good. Should I still convert to WebP?</h3>
        <p>If your LCP is under 2.5 seconds and PageSpeed isn't flagging images as a problem, the impact of converting to WebP will be marginal. Focus your time elsewhere. Run the test first, optimize what it tells you to optimize.</p>
      </div>
    </div>

    <div class="closing-note">
      <p>
        If you ran PageSpeed Insights and have a specific LCP element that's causing problems, 
        I'm happy to look at it with you. The <router-link to="/contact">contact page</router-link> 
        comes directly to me — include the URL and what PageSpeed is reporting and I'll take a look.
      </p>
    </div>

  </div>

  <Footer />
</template>

<style scoped>
.article { padding: 70px 0; max-width: 860px; margin: 0 auto; color: #222; }

.article-meta { margin-bottom: 24px; display: flex; gap: 16px; align-items: center; }
.category { color: var(--primary); text-transform: uppercase; letter-spacing: 1.5px; font-size: 11px; font-weight: 700; }
.date { color: #888; font-size: 13px; }

h1 { font-size: 32px; margin-bottom: 28px; line-height: 1.35; font-weight: 700; color: #111; }
h2 { font-size: 22px; margin-top: 52px; margin-bottom: 18px; border-bottom: 1px solid #e8e8e8; padding-bottom: 10px; color: #111; }
h3 { font-size: 16px; color: #111; margin-top: 0; margin-bottom: 8px; font-weight: 600; }
p { font-size: 16px; line-height: 1.85; margin-bottom: 22px; color: #333; }

.lede { font-size: 18px; line-height: 1.8; color: #444; border-left: 3px solid var(--primary); padding-left: 20px; margin-bottom: 36px; }

.toc { background: #f7f9fc; border: 1px solid #dde3ec; border-radius: 8px; padding: 20px 28px; margin-bottom: 44px; }
.toc p { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 10px; font-weight: 600; }
.toc ol { margin: 0; padding-left: 18px; }
.toc li { margin-bottom: 6px; font-size: 15px; }
.toc a { color: var(--primary); text-decoration: none; }
.toc a:hover { text-decoration: underline; }

.honest-box { background: #f7f9fc; border: 1px solid #dde3ec; border-radius: 10px; padding: 28px 32px; margin: 36px 0; }
.honest-box h4 { margin-top: 0; margin-bottom: 14px; font-size: 15px; color: #111; font-weight: 700; }
.honest-box p { font-size: 15px; margin-bottom: 12px; color: #444; }
.honest-box p:last-child { margin-bottom: 0; }

.table-wrapper { margin: 24px 0 32px; border: 1px solid #e8e8e8; border-radius: 8px; overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
th { background: #f5f5f5; padding: 14px 16px; text-align: left; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e8e8e8; color: #111; }
td { padding: 14px 16px; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #444; vertical-align: top; }
tr:last-child td { border-bottom: none; }

pre.code-block { background: #1a1a1a; color: #a8d8a8; padding: 22px 26px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 13px; overflow-x: auto; margin: 8px 0 28px; line-height: 1.7; }
code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: 14px; color: #333; }

.nav-card { background: #f5f5f5; border-radius: 8px; padding: 20px 24px; margin: 36px 0; border: 1px solid #e8e8e8; }
.nav-content h4 { margin: 0 0 14px 0; font-size: 14px; color: #555; font-weight: 600; }
.nav-links { display: flex; flex-wrap: wrap; gap: 10px; }
.nav-btn { text-decoration: none; padding: 8px 16px; background: white; border: 1px solid #ddd; color: #333; border-radius: 4px; font-size: 14px; font-weight: 500; }
.nav-btn.highlight { background: var(--primary); color: white; border-color: var(--primary); }

.faq-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 16px; }
.faq-box { background: #fafafa; border: 1px solid #ebebeb; border-radius: 8px; padding: 22px; }
.faq-box h3 { font-size: 15px; color: #111; font-weight: 600; margin-bottom: 10px; }
.faq-box p { font-size: 14px; line-height: 1.75; margin-bottom: 0; color: #555; }

.closing-note { margin-top: 52px; padding: 24px 28px; background: #fffbf0; border-radius: 8px; border: 1px solid #f0e4b0; }
.closing-note p { margin-bottom: 0; font-size: 15px; color: #555; }

@media (max-width: 640px) {
  .faq-wrapper { grid-template-columns: 1fr; }
  h1 { font-size: 26px; }
}
</style>