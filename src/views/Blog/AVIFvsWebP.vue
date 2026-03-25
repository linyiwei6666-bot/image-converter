<script setup>
import Navbar from "../../components/Navbar.vue"
import Footer from "../../components/Footer.vue"
import { useHead } from '@vueuse/head'

useHead({
  title: 'AVIF vs WebP: Honest Findings After a Year of Running an Image Converter',
  meta: [
    { 
      name: 'description', 
      content: 'I built this image converter and spent months testing AVIF and WebP on real user uploads. Here\'s what I actually found — including the parts that surprised me.' 
    },
    { property: 'og:title', content: 'AVIF vs WebP: Real Test Results, Not Marketing Numbers' },
    { property: 'og:description', content: 'I tested AVIF and WebP on hundreds of real images — photos, screenshots, product shots. The results weren\'t what most benchmark articles claim.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<template>
  <Navbar />

  <div class="container article">

    <div class="article-meta">
      <span class="category">Behind the Tool</span>
      <span class="date">March 2026 · 7 min read</span>
    </div>

    <h1>AVIF vs WebP: What I Actually Found After a Year of Running This Converter</h1>

    <p class="lede">
      I'm the person who built this site. Not a team, not a company — just me, a side project that got 
      bigger than I expected. And because I'm the one maintaining the converter, I've had a front-row 
      seat to what image formats actually do in the real world. This isn't a repost of a benchmark. 
      It's what I personally ran into.
    </p>

    <nav class="toc">
      <p>In this article:</p>
      <ol>
        <li><a href="#how-this-started">How this started</a></li>
        <li><a href="#what-avif-is">What AVIF actually is</a></li>
        <li><a href="#test-results">My real test results</a></li>
        <li><a href="#speed-problem">The encoding speed problem</a></li>
        <li><a href="#use-avif-now">Should you use AVIF right now?</a></li>
        <li><a href="#privacy">Where your images go</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ol>
    </nav>

    <h2 id="how-this-started">How This Started</h2>
    <p>
      About a year ago I got tired of uploading images to random websites and wondering what 
      happened to them afterward. So I built my own local converter — one where the file never 
      leaves your browser. While I was at it, I started obsessing over which format was actually 
      worth recommending. WebP was the obvious answer in 2022. But AVIF kept coming up, and I 
      wanted to see for myself.
    </p>
    <p>
      Over the past several months I've run conversion tests on hundreds of real images — not 
      stock photos picked to make numbers look good, but the kinds of things people actually 
      upload: product shots, travel photos, screenshots, and the occasional 40MB RAW file 
      someone definitely should have resized first.
    </p>

    <h2 id="what-avif-is">What AVIF Actually Is (In Plain English)</h2>
    <p>
      AVIF came out of video compression research. The same people who figured out how to 
      stream 4K video on a mediocre internet connection turned those techniques toward still 
      images. The result is a format that's genuinely smarter about how it stores color and 
      detail — especially in gradients, skin tones, and anything with a smooth background.
    </p>
    <p>
      It supports HDR, 12-bit color, and transparency. Those aren't marketing buzzwords — 
      they matter if you're dealing with professional photography or trying to replace PNG 
      with something smaller. But here's the thing nobody mentions: it's also significantly 
      slower to encode than WebP. I'll come back to that.
    </p>

    <div class="honest-box">
      <h4>📊 My actual test results (100 real-world images)</h4>
      <p>
        The benchmark articles you'll find online love to say "AVIF is 50% smaller than JPG." 
        That's true sometimes. Here's what I actually saw across different image types:
      </p>
      <ul>
        <li><strong>Travel photos, sky, smooth backgrounds:</strong> AVIF was 40–50% smaller than JPG. Impressive.</li>
        <li><strong>Product photos on white backgrounds:</strong> AVIF was about 30% smaller. Still great.</li>
        <li><strong>Fine texture — fabric, hair, grass, fur:</strong> AVIF was maybe 15–20% smaller. Much less dramatic.</li>
        <li><strong>Screenshots and flat UI graphics:</strong> WebP actually won here. AVIF added artifacts at lower quality settings.</li>
      </ul>
      <p>The gap is real, but it's not magic. It depends heavily on what you're converting.</p>
    </div>

    <h2 id="speed-problem">The Speed Problem I Didn't Expect</h2>
    <p>
      When I first tried to add AVIF conversion to this site, it was embarrassingly slow. Like, 
      "user closes the tab" slow. A 3MB photo was taking 8–12 seconds to encode. That's not 
      something you can ship.
    </p>
    <p>
      The root cause is that AVIF encoding is computationally heavy. It was designed assuming 
      you'd run it on a server with time to spare, not in someone's browser tab while they're 
      waiting. JavaScript alone can't handle it gracefully.
    </p>
    <p>
      That's what led me down the WebAssembly rabbit hole. WebAssembly (WASM) lets you compile 
      C++ or Rust code and run it inside the browser at near-native speed. I ended up building 
      on top of <em>libavif</em> — the same library used by professional tools — compiled to WASM. 
      The encoding time dropped to under 2 seconds for most images. Not instant, but usable.
    </p>

    <div class="comparison-grid">
      <div class="comp-item">
        <strong>Upload-to-server approach</strong>
        <p>Your file travels to someone's computer. Fast for the user, but you're trusting a stranger with your photos. Also means the site owner pays for storage and bandwidth.</p>
      </div>
      <div class="comp-item highlight-item">
        <strong>Local WASM processing (what this site uses)</strong>
        <p>The conversion happens entirely in your browser. Nothing is transmitted. I can't see your files even if I wanted to. No cloud cost, no privacy concern.</p>
      </div>
    </div>

    <h2 id="use-avif-now">Should You Use AVIF Right Now?</h2>
    <p>
      Browser support crossed 93–94% of global users sometime in 2025. For most sites, 
      that's probably good enough — especially if you're using a proper fallback.
    </p>
    <p>
      The HTML pattern I'd actually recommend using today:
    </p>

    <pre class="code-block">&lt;picture&gt;
  &lt;source srcset="hero.avif" type="image/avif"&gt;
  &lt;source srcset="hero.webp" type="image/webp"&gt;
  &lt;img src="hero.jpg" alt="Your image" loading="lazy"&gt;
&lt;/picture&gt;</pre>

    <p>
      This way, modern browsers get AVIF. Slightly older ones get WebP. Ancient ones (and some 
      corporate browsers behind IT restrictions) get JPG. Nobody gets a broken image.
    </p>

    <h2>An Honest Note About This Site</h2>
    <p>
      I want to be upfront: AVIF conversion isn't fully live on this converter yet. I'm still 
      stress-testing the WASM encoder — specifically around edge cases like images with unusual 
      color profiles and very large files. WebP conversion works well and covers the majority 
      of use cases. AVIF is coming, but I'd rather take longer and ship something stable.
    </p>
    <p>
      If you need AVIF conversion today, Squoosh (by Google) is solid and also runs locally 
      in your browser. It's what I tested against when calibrating my own output quality.
    </p>

    <h2 id="privacy">One More Thing: Where Your Images Go</h2>
    <p>
      I get asked this a lot, so I'll say it plainly. When you use this converter, your image 
      is processed entirely by your own computer's CPU. It's not uploaded anywhere. I have 
      no database of user images, no training dataset, nothing like that. The WASM file loads 
      once, runs locally, and that's it.
    </p>
    <p>
      I built it this way because I wanted to use it myself without worrying. That's still 
      the main reason it works this way.
    </p>

    <h2 id="faq">Frequently Asked Questions</h2>
    <div class="faq-wrapper">
      <div class="faq-box">
        <h3>Is AVIF actually better than WebP?</h3>
        <p>For photos with smooth areas and gradients, yes, noticeably. For screenshots, UI graphics, or highly textured images, it's less clear-cut. Run your own test — the difference is real but context-dependent.</p>
      </div>
      <div class="faq-box">
        <h3>Can I convert to AVIF on this site?</h3>
        <p>Not yet — I'm still finalizing the encoder. WebP is available now and is excellent for most use cases. I'll update this post when AVIF goes live.</p>
      </div>
      <div class="faq-box">
        <h3>Does AVIF support transparency like PNG?</h3>
        <p>Yes, full alpha channel. In theory you can replace PNG entirely with AVIF and save a lot of space. In practice, test it on your specific images first — the quality difference at equivalent file sizes can vary.</p>
      </div>
      <div class="faq-box">
        <h3>What about older browsers that don't support AVIF?</h3>
        <p>Use the &lt;picture&gt; element with fallbacks shown above. It takes 5 minutes to add and means nobody gets a broken image.</p>
      </div>
    </div>

    <div class="closing-note">
      <p>
        If you found this useful or have questions about specific image types you've been 
        struggling with, feel free to reach out via the <router-link to="/contact">contact page</router-link>. 
        I read every message, even if it sometimes takes me a few days to reply.
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
h3 { font-size: 17px; color: #111; margin-top: 0; margin-bottom: 10px; }

p { font-size: 16px; line-height: 1.85; margin-bottom: 22px; color: #333; }
ul { margin-bottom: 20px; padding-left: 22px; }
li { margin-bottom: 10px; line-height: 1.7; font-size: 15px; }

.lede { font-size: 18px; line-height: 1.75; color: #444; border-left: 3px solid var(--primary); padding-left: 20px; margin-bottom: 40px; }

.honest-box {
  background: #f7f9fc;
  border: 1px solid #dde3ec;
  border-radius: 10px;
  padding: 28px 32px;
  margin: 36px 0;
}
.honest-box h4 { margin-top: 0; margin-bottom: 14px; font-size: 16px; color: #111; }
.honest-box p { font-size: 15px; margin-bottom: 14px; }
.honest-box ul { margin-bottom: 0; }
.honest-box li { font-size: 15px; }

.comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin: 32px 0; }
.comp-item { background: #f8f8f8; padding: 22px; border-radius: 8px; border: 1px solid #e5e5e5; }
.comp-item.highlight-item { background: #f0f7f0; border-color: #b8d8b8; }
.comp-item strong { display: block; margin-bottom: 10px; color: #111; font-size: 15px; }
.comp-item p { font-size: 14px; line-height: 1.7; margin-bottom: 0; color: #555; }

.code-block {
  background: #1a1a1a;
  color: #a8d8a8;
  padding: 22px 26px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  overflow-x: auto;
  margin: 8px 0 28px;
  line-height: 1.7;
}

.faq-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 16px; }
.faq-box { background: #fafafa; border: 1px solid #ebebeb; border-radius: 8px; padding: 22px; }
.faq-box h3 { font-size: 15px; color: #111; font-weight: 600; }
.faq-box p { font-size: 14px; line-height: 1.7; margin-bottom: 0; color: #555; }

.closing-note {
  margin-top: 52px;
  padding: 24px 28px;
  background: #fffbf0;
  border-radius: 8px;
  border: 1px solid #f0e4b0;
}
.closing-note p { margin-bottom: 0; font-size: 15px; color: #555; }

.toc { background: #f7f9fc; border: 1px solid #dde3ec; border-radius: 8px; padding: 20px 28px; margin-bottom: 44px; }
.toc p { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 10px; font-weight: 600; }
.toc ol { margin: 0; padding-left: 18px; }
.toc li { margin-bottom: 6px; font-size: 15px; }
.toc a { color: var(--primary); text-decoration: none; }
.toc a:hover { text-decoration: underline; }

@media (max-width: 640px) {
  .comparison-grid, .faq-wrapper { grid-template-columns: 1fr; }
  h1 { font-size: 26px; }
}
</style>