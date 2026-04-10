<script setup>
import Navbar from "../../components/Navbar.vue"
import Footer from "../../components/Footer.vue"
import { useHead } from '@vueuse/head'

useHead({
  title: 'Why Your Images Look Fine to You but Load Slowly for Everyone Else',
  meta: [
    {
      name: 'description',
      content: 'Your images load fast on your machine because you already downloaded them. Here\'s what actually determines image load time for real users — and what I changed after figuring this out.'
    },
    { property: 'og:title', content: 'Why Your Images Look Fine to You but Load Slowly for Everyone Else' },
    { property: 'og:description', content: 'Browser cache, fast internet, and a powerful laptop make your own site feel fast. Your users aren\'t you. Here\'s what that means for image optimization.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<template>
  <Navbar />

  <div class="container article">

    <div class="article-meta">
      <span class="category">Web Performance</span>
      <span class="date">April 2026 · 9 min read</span>
    </div>

    <h1>Why Your Images Look Fine to You but Load Slowly for Everyone Else</h1>

    <p class="lede">
      The most common image optimization mistake I see isn't a wrong format or a missing attribute. 
      It's testing on your own machine and concluding everything is fine. 
      Your browser has already cached the images. Your internet is fast. Your laptop is powerful. 
      You are the worst possible test subject for your own website.
    </p>

    <nav class="toc">
      <p>In this article:</p>
      <ol>
        <li><a href="#the-cache-problem">Why your own experience is misleading</a></li>
        <li><a href="#real-users">What real users are actually dealing with</a></li>
        <li><a href="#file-size">File size is the one thing that actually matters</a></li>
        <li><a href="#format-decisions">The format decision most people get backwards</a></li>
        <li><a href="#what-i-changed">What I changed on this site after testing properly</a></li>
        <li><a href="#checklist">A checklist that actually helps</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ol>
    </nav>

    <h2 id="the-cache-problem">Why your own experience is misleading</h2>
    <p>
      When you visit your own website, your browser caches everything. Images, fonts, scripts — 
      all of it gets stored locally after the first load. Every subsequent visit, those files 
      load from your disk, not from a server. Your experience of "this loads fast" is 
      almost entirely from cache.
    </p>
    <p>
      Your users aren't cached. They're hitting your site for the first time. 
      Every file has to be fetched from scratch, over whatever connection they happen to be on, 
      on whatever device they're using. That experience can be completely different from yours.
    </p>
    <p>
      I learned this the embarrassing way. I spent a week convinced my site loaded 
      in under a second. Then I ran PageSpeed Insights and got a 43. 
      The hero image was 1.4MB. I'd never noticed because I'd cached it months ago.
    </p>

    <div class="honest-box">
      <h4>How to actually test your own site</h4>
      <p>
        Open DevTools → Network tab → check "Disable cache" → hard reload. 
        That's your real first-load experience. While you're there, throttle the connection 
        to "Fast 3G" — that's closer to what a mobile user on a patchy connection gets. 
        If your images take more than two seconds to appear on Fast 3G, you have a problem.
      </p>
    </div>

    <h2 id="real-users">What real users are actually dealing with</h2>
    <p>
      I'm going to make some assumptions about you: you're probably on a laptop or desktop, 
      probably on WiFi or a fast wired connection, probably in a city. 
      If you're reading a web development article, the odds are good.
    </p>
    <p>
      Your users are not necessarily you. A significant portion of web traffic comes from 
      mobile devices on cellular connections, from lower-end Android phones, 
      from regions where network infrastructure is worse. 
      Even in high-income countries, mobile data speeds vary enormously — 
      a subway commuter or someone in a rural area can be on a connection 
      that's dramatically slower than your office WiFi.
    </p>
    <p>
      This matters for images specifically because images are the largest files on most pages. 
      A 1MB image that arrives in 200ms on your connection might take 4 seconds on theirs. 
      Same file. Completely different experience.
    </p>
    <p>
      I'm not trying to make a political point here — I'm making a practical one. 
      If you optimize for the average of your actual users rather than for yourself, 
      you will have a faster site. That's it.
    </p>

    <h2 id="file-size">File size is the one thing that actually matters</h2>
    <p>
      There are a lot of image optimization techniques floating around: lazy loading, 
      preloading, srcset, CDN delivery, HTTP/2, priority hints. They're all useful. 
      But if I had to pick one thing that has the most direct impact on how fast 
      an image appears for a first-time visitor, it's file size.
    </p>
    <p>
      Smaller file = less to download = arrives sooner. The relationship is that direct. 
      Everything else is about loading strategy — when and how the browser fetches images. 
      File size is about how long that fetch takes once it starts.
    </p>
    <p>
      In my experience, most sites that have slow image loading aren't doing anything 
      clever wrong — they just have images that are larger than they need to be. 
      Usually by a factor of 3–5×. That's not a configuration problem. 
      That's a format and export problem, and it's fixed before the image ever goes on the server.
    </p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Typical file size</th>
            <th>Download time on Fast 3G (~1.5 Mbps)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1200px hero image, PNG from Figma</td>
            <td>1.2–2MB</td>
            <td>6–11 seconds</td>
          </tr>
          <tr>
            <td>Same image, exported as JPG at 85%</td>
            <td>200–350KB</td>
            <td>1–2 seconds</td>
          </tr>
          <tr>
            <td>Same image, converted to WebP at 82%</td>
            <td>120–200KB</td>
            <td>0.6–1 second</td>
          </tr>
          <tr>
            <td>Same image, WebP + resized to actual display width</td>
            <td>60–100KB</td>
            <td>0.3–0.5 seconds</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      That last row is where most sites could be, and most are sitting somewhere 
      in the first or second row. The gap isn't a small optimization — 
      it's the difference between a page that feels instant and one that feels broken.
    </p>

    <h2 id="format-decisions">The format decision most people get backwards</h2>
    <p>
      The most common format mistake I see isn't using JPG when you should use WebP. 
      It's using PNG when you should use JPG — and specifically, using PNG for photographs.
    </p>
    <p>
      PNG is lossless, which sounds strictly better. For photographs on a website, 
      it's almost always worse. Lossless compression isn't designed for the continuous-tone 
      data in photos. A photograph as a PNG can easily be 5–8× larger than the same image 
      as a compressed WebP with no perceptible quality difference at normal viewing sizes.
    </p>
    <p>
      People use PNG for photographs because it feels "safe." 
      You're not losing any quality, so how could it be wrong? 
      It's wrong because the file is enormous, and your users are downloading 
      5× more data than they need to see the same thing.
    </p>
    <p>
      Here's the decision I actually use:
    </p>

    <div class="decision-block">
      <div class="decision-item">
        <span class="decision-label photo">Photograph / complex scene</span>
        <span class="decision-arrow">→</span>
        <span class="decision-format">WebP (JPG as fallback)</span>
      </div>
      <div class="decision-item">
        <span class="decision-label graphic">Screenshot / diagram / text / transparency</span>
        <span class="decision-arrow">→</span>
        <span class="decision-format">PNG or WebP</span>
      </div>
      <div class="decision-item">
        <span class="decision-label icon">Logo / icon / flat graphic</span>
        <span class="decision-arrow">→</span>
        <span class="decision-format">SVG if possible, WebP otherwise</span>
      </div>
    </div>

    <p>
      The practical question for anything that isn't clearly a graphic or icon: 
      does this image have a lot of gradients, texture, and continuous color variation? 
      If yes, it's a photograph for format-selection purposes. Use WebP.
    </p>

    <h2 id="what-i-changed">What I changed on this site after testing properly</h2>
    <p>
      I built this site partly as a tool and partly as something I'd actually maintain and 
      take seriously. So when I ran the first proper audit, I found the same things I just described.
    </p>
    <p>
      The hero image was a PNG. It was 1.4MB. 
      I'd exported it from a design tool and dropped it in without thinking. 
      Converting it to WebP at 82% quality brought it to 180KB. 
      LCP on mobile went from 5.2 seconds to 1.8 seconds. 
      That one change moved me from "Poor" to "Good" on Core Web Vitals.
    </p>
    <p>
      The second thing I found: I hadn't set explicit width and height on several images. 
      This was causing layout shift — the page would render, then jump when images loaded. 
      Fixing that dropped CLS from 0.18 to nearly zero. Both of these were afternoon fixes, 
      not engineering projects.
    </p>
    <p>
      The third thing, which I'm still working on: I didn't have <code>srcset</code> 
      on most images. Mobile users were downloading the same 1200px image as desktop users 
      and displaying it at 375px. That's about 10× more pixels than needed. 
      Setting up proper responsive images requires exporting multiple sizes, 
      which is more friction, but the bandwidth savings for mobile users are significant.
    </p>

    <pre class="code-block">&lt;!-- What I had --&gt;
&lt;img src="hero.webp" alt="..."&gt;

&lt;!-- What I should have had from the start --&gt;
&lt;img
  src="hero-800.webp"
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1600.webp 1600w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="..."
  width="800"
  height="420"
  fetchpriority="high"
&gt;</pre>

    <h2 id="checklist">A checklist that actually helps</h2>
    <p>
      Most image checklists are too long to be useful. Here's the short version — 
      the things that have the most impact in the least time:
    </p>

    <div class="checklist-block">
      <div class="check-item">
        <span class="check-num">1</span>
        <div class="check-content">
          <strong>Test with cache disabled on a throttled connection</strong>
          <p>DevTools → Network → Disable cache → throttle to Fast 3G. Do this before anything else. You need to see what users see, not what you see.</p>
        </div>
      </div>
      <div class="check-item">
        <span class="check-num">2</span>
        <div class="check-content">
          <strong>Convert photographs to WebP</strong>
          <p>Any PNG or JPG that's a photo should be WebP. Use the <router-link to="/convert">converter here</router-link> — your files stay local, nothing is uploaded. Do this for every image above the fold first.</p>
        </div>
      </div>
      <div class="check-item">
        <span class="check-num">3</span>
        <div class="check-content">
          <strong>Add width and height to every img element</strong>
          <p>This prevents layout shift. Five minutes to audit and fix. No excuses for missing this one.</p>
        </div>
      </div>
      <div class="check-item">
        <span class="check-num">4</span>
        <div class="check-content">
          <strong>Add loading="lazy" to everything below the fold</strong>
          <p>One attribute. Do not add it to your LCP image — that one should load immediately.</p>
        </div>
      </div>
      <div class="check-item">
        <span class="check-num">5</span>
        <div class="check-content">
          <strong>Run PageSpeed Insights and fix what it flags</strong>
          <p>Don't guess. Let the tool tell you what's actually slow. Then fix that specific thing.</p>
        </div>
      </div>
    </div>

    <div class="nav-card">
      <div class="nav-content">
        <h4>Convert your images without uploading them</h4>
        <div class="nav-links">
          <router-link to="/png-to-webp" class="nav-btn highlight">PNG → WebP</router-link>
          <router-link to="/jpg-to-webp" class="nav-btn highlight">JPG → WebP</router-link>
          <router-link to="/compress-image" class="nav-btn">Compress Image</router-link>
        </div>
      </div>
    </div>

    <h2 id="faq">Frequently asked questions</h2>
    <div class="faq-wrapper">
      <div class="faq-box">
        <h3>How do I know if my images are the problem?</h3>
        <p>Run PageSpeed Insights on your URL. If it flags "Serve images in next-gen formats," "Efficiently encode images," or "Properly size images," images are the problem. It'll tell you exactly which ones.</p>
      </div>
      <div class="faq-box">
        <h3>Does WebP actually look the same as JPG?</h3>
        <p>At equivalent visual quality, yes. At equivalent file size, WebP looks better. The quality setting I use is 82% — at that level I've never been able to tell the difference on a screen at normal viewing distance.</p>
      </div>
      <div class="faq-box">
        <h3>My site scores 90+ on PageSpeed. Do I still need to do this?</h3>
        <p>A 90 score doesn't mean images are optimal — it means you're above a threshold. Check the individual LCP time. If it's above 2.5 seconds, there's still room to improve regardless of the score.</p>
      </div>
      <div class="faq-box">
        <h3>Is it worth going back and fixing old images?</h3>
        <p>It depends on whether those pages get traffic. Pages that rank and get clicks are worth fixing. Archived posts from years ago that nobody reads — probably not worth the time.</p>
      </div>
    </div>

    <div class="closing-note">
      <p>
        If you've tested properly and images still aren't the issue — good. 
        You've ruled out the most common problem. The <router-link to="/blog">blog</router-link> 
        has more on format selection and compression if you want to go deeper. 
        And if you find something that doesn't convert correctly with the tools here, 
        the <router-link to="/contact">contact page</router-link> comes directly to me.
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

.decision-block { margin: 28px 0 32px; display: flex; flex-direction: column; gap: 12px; }
.decision-item { display: flex; align-items: center; gap: 14px; background: #fafafa; border: 1px solid #ebebeb; border-radius: 8px; padding: 16px 20px; }
.decision-label { font-size: 14px; color: #444; flex: 1; }
.decision-label.photo { border-left: 3px solid #4a9eff; padding-left: 10px; }
.decision-label.graphic { border-left: 3px solid #f5a623; padding-left: 10px; }
.decision-label.icon { border-left: 3px solid #7ed321; padding-left: 10px; }
.decision-arrow { color: #aaa; font-size: 18px; }
.decision-format { font-size: 14px; font-weight: 600; color: #111; min-width: 180px; text-align: right; }

.checklist-block { margin: 24px 0 36px; display: flex; flex-direction: column; gap: 14px; }
.check-item { display: flex; gap: 18px; align-items: flex-start; background: #fafafa; border: 1px solid #ebebeb; border-radius: 8px; padding: 20px 22px; }
.check-num { background: var(--primary); color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; margin-top: 2px; }
.check-content strong { display: block; font-size: 15px; color: #111; margin-bottom: 6px; }
.check-content p { font-size: 14px; color: #555; margin-bottom: 0; line-height: 1.65; }

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
  .decision-item { flex-direction: column; }
  .decision-format { text-align: left; }
}
</style>