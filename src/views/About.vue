<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import { useHead } from '@unhead/vue'

useHead({
  title: 'About — ImageConverter.website',
  meta: [
    { 
      name: 'description', 
      content: 'ImageConverter is a one-person project built by Nasa, a developer who wanted a private image converter that doesn\'t upload your files anywhere. Here\'s the story behind it.' 
    },
    { property: 'og:title', content: 'About ImageConverter — Built by One Developer, for Privacy' },
    { property: 'og:description', content: 'A one-person project that converts images locally in your browser. No uploads, no tracking, no cloud. Here\'s why it was built this way.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<template>
  <Navbar />

  <div class="container about">
    <div class="content-wrapper">

      <h1>About This Site</h1>

      <section class="origin-story">
        <p>
          I'm Nasa, and I built this tool because I was annoyed. 
        </p>
        <p>
          I kept needing to convert images — screenshots for documentation, product photos 
          for a client, PNGs that needed to become WebPs before going on a site. Every online 
          converter I tried worked the same way: upload your file, wait for it to travel to 
          some server somewhere, wait for it to come back, download the result. For a 5-second 
          task, the whole process took two minutes. And I had no idea what was happening to 
          my files on the other end.
        </p>
        <p>
          So I built my own. The first version was a 50-line script I ran locally. 
          I made it a proper website when a few friends asked if they could use it too. 
          That was about a year ago. It's still just me maintaining it.
        </p>
      </section>

      <section>
        <h2>How it actually works</h2>
        <p>
          When you drop a file into the converter, the conversion happens inside your browser 
          using your own device's CPU. Nothing is sent to a server. Nothing is uploaded. 
          Nothing is stored. The file goes from your computer into your browser's memory, 
          gets converted, and comes back out as a download — all without touching the internet.
        </p>
        <p>
          This is possible because modern browsers are genuinely powerful. HTML5 Canvas APIs 
          can handle image encoding and decoding directly in the tab. For most format 
          conversions, this is faster than the upload-wait-download approach anyway, 
          because you skip the network entirely.
        </p>
        <p>
          For more complex formats like AVIF — which requires heavier computation — 
          I'm integrating WebAssembly (WASM) modules that allow near-native-speed processing 
          in the browser. That's still in progress, but the goal is the same: everything 
          stays local.
        </p>
      </section>

      <section class="tools-navigation">
        <h3>Tools available now</h3>
        <div class="tools-grid">
          <router-link to="/png-to-webp" class="tool-card">
            <strong>PNG → WebP</strong>
            <span>Smaller files for web</span>
          </router-link>
          <router-link to="/jpg-to-webp" class="tool-card">
            <strong>JPG → WebP</strong>
            <span>Better compression</span>
          </router-link>
          <router-link to="/jpg-to-png" class="tool-card">
            <strong>JPG → PNG</strong>
            <span>Lossless quality</span>
          </router-link>
          <router-link to="/webp-to-jpg" class="tool-card">
            <strong>WebP → JPG</strong>
            <span>Max compatibility</span>
          </router-link>
        </div>
      </section>

      <section>
        <h2>Why I care about the privacy part</h2>
        <p>
          I'm not trying to be dramatic about it, but I do think it's worth being clear: 
          a lot of "free" online tools make money by collecting the files people upload. 
          That might mean using them for AI training datasets, selling metadata, or just 
          retaining images longer than they claim to. The terms of service on most of these 
          sites are long and vague on purpose.
        </p>
        <p>
          Building a tool that processes locally removes that concern entirely. I can't 
          collect your images because they never reach me. That's not a policy — it's 
          a technical reality. You can verify it by opening your browser's network inspector 
          while converting an image and watching that no file upload request is made.
        </p>
      </section>

      <section>
        <h2>What's coming next</h2>
        <p>
          AVIF conversion is the main thing I'm working on. The compression improvements 
          over WebP are real and significant for photographs. The challenge is encoding 
          speed — AVIF is computationally heavy, and I'm not willing to ship something 
          that makes users wait 10 seconds for a conversion. The WASM implementation 
          is getting there.
        </p>
        <p>
          After that, probably batch conversion improvements and better handling of 
          unusual color profiles and large files. I take bug reports seriously — 
          if something isn't working for your specific use case, let me know.
        </p>
      </section>

      <section>
        <h2>Get in touch</h2>
        <p>
          The <router-link to="/contact">contact page</router-link> comes directly to me. 
          I read everything. Response time varies depending on how busy I am, but I 
          try to reply within a few days. Bug reports, feature requests, and feedback 
          about specific image types that aren't converting well are all useful.
        </p>
      </section>

    </div>
  </div>

  <Footer />
</template>

<style scoped>
.about {
  padding: 70px 20px;
  max-width: 780px;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  color: #111;
  margin-bottom: 36px;
  font-weight: 700;
}

section {
  margin-bottom: 52px;
}

h2 {
  font-size: 20px;
  color: #111;
  margin-bottom: 18px;
  font-weight: 700;
  border-left: 3px solid var(--primary);
  padding-left: 14px;
}

p {
  color: #444;
  line-height: 1.85;
  font-size: 16px;
  margin-bottom: 18px;
}

p:last-child { margin-bottom: 0; }

/* Origin story — no heading, just reads like a personal note */
.origin-story p:first-child {
  font-size: 20px;
  color: #111;
  font-weight: 500;
}

/* Tools grid */
.tools-navigation {
  background: #111;
  padding: 28px 32px;
  border-radius: 12px;
  color: #fff;
}

.tools-navigation h3 {
  color: #aaa;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0 0 18px 0;
  font-weight: 600;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.tool-card {
  background: #1a1a1a;
  padding: 14px 16px;
  border-radius: 8px;
  text-decoration: none;
  border: 1px solid #2a2a2a;
  transition: border-color 0.15s ease;
}

.tool-card:hover {
  border-color: var(--primary);
}

.tool-card strong {
  display: block;
  color: #fff;
  font-size: 14px;
  margin-bottom: 4px;
}

.tool-card span {
  font-size: 12px;
  color: #666;
}

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .tools-grid { grid-template-columns: 1fr 1fr; }
  h1 { font-size: 26px; }
}
</style>