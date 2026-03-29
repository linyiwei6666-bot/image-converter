/**
 * useSchema.js
 * Drop this in src/composables/
 * Usage: call the relevant function inside <script setup> on each page
 *
 * Each function injects a <script type="application/ld+json"> into <head>
 * via @vueuse/head, which you already have installed.
 */

import { useHead } from "@vueuse/head"

const SITE_NAME = "Image Converter"  // change this to your site's name
const SITE_URL  = "https://imageconvert.website" // change this to your site's URL (no trailing slash)
const LOGO_URL  = `${SITE_URL}/logo.png`   // put a real OG image here

// ─── 1. WebApplication schema ────────────────────────────────────────────────
// Use on every tool page (converter, compressor, heic-to-jpg, etc.)
//
// Example:
//   useToolSchema({
//     name: "JPG to PNG Converter",
//     description: "Convert JPG images to PNG in your browser — free, no upload.",
//     url: "https://yourdomain.com/jpg-to-png",
//   })

export function useToolSchema({ name, description, url }) {
  useHead({
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name,
          description,
          url,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "All",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          provider: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
        }),
      },
    ],
  })
}

// ─── 2. FAQPage schema ───────────────────────────────────────────────────────
// Use on any page that has a FAQ section.
// Pass the same faq array you're already rendering in the template.
//
// Example:
//   useFaqSchema([
//     { q: "Is it free?", a: "Yes, completely free." },
//     { q: "Are files uploaded?", a: "No, everything runs in your browser." },
//   ])

export function useFaqSchema(items) {
  useHead({
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      },
    ],
  })
}

// ─── 3. HowTo schema ─────────────────────────────────────────────────────────
// Great for blog posts that explain a process step by step.
// Google can show this as a rich result with numbered steps.
//
// Example:
//   useHowToSchema({
//     name: "How to Convert HEIC to JPG for Free",
//     description: "Convert iPhone HEIC photos to JPG in seconds using your browser.",
//     steps: [
//       { name: "Open the tool",  text: "Go to yourdomain.com/heic-to-jpg" },
//       { name: "Upload your file", text: "Drag your .heic file onto the upload box." },
//       { name: "Download",       text: "Click Download JPG." },
//     ],
//   })

export function useHowToSchema({ name, description, steps }) {
  useHead({
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name,
          description,
          step: steps.map(({ name: stepName, text }, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: stepName,
            text,
          })),
        }),
      },
    ],
  })
}

// ─── 4. Article schema ───────────────────────────────────────────────────────
// Use on every blog post page.
//
// Example:
//   useArticleSchema({
//     headline: "WebP vs PNG: Which Format Should You Use in 2025?",
//     description: "A practical comparison of WebP and PNG...",
//     url: "https://imageconvert.website/blog/webp-vs-png",
//     datePublished: "2025-01-15",
//     dateModified:  "2025-06-01",
//   })

export function useArticleSchema({ headline, description, url, datePublished, dateModified }) {
  useHead({
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline,
          description,
          url,
          datePublished,
          dateModified: dateModified || datePublished,
          image: LOGO_URL,
          author: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: { "@type": "ImageObject", url: LOGO_URL },
          },
        }),
      },
    ],
  })
}

// ─── 5. BreadcrumbList schema ────────────────────────────────────────────────
// Use on blog posts and deep tool pages to show the breadcrumb in Google results.
//
// Example:
//   useBreadcrumbSchema([
//     { name: "Home",           url: "https://imageconvert.website/" },
//     { name: "Blog",           url: "https://imageconvert.website/blog" },
//     { name: "WebP vs PNG",    url: "https://imageconvert.website/blog/webp-vs-png" },
//   ])

export function useBreadcrumbSchema(items) {
  useHead({
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map(({ name, url }, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name,
            item: url,
          })),
        }),
      },
    ],
  })
}