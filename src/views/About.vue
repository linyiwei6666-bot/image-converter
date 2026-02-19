<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
</script>

<template>
  <Navbar />

  <div class="container about">
    <h1>About ImageConverter</h1>

    <section>
      <h2>Who We Are</h2>
      <p>
        ImageConverter is an independent online tool designed to make
        image format conversion simple, fast, and secure. We focus on
        providing a lightweight web-based solution that works entirely
        inside modern browsers without requiring software installation.
      </p>
    </section>

    <section>
      <h2>How Our Technology Works</h2>
      <p>
        Unlike traditional image converters that upload files to remote servers,
        our platform uses modern browser technologies such as HTML5 Canvas
        to process images locally on your device.
      </p>

      <p>
        This means your files never leave your computer.
        The conversion happens directly in your browser,
        ensuring maximum privacy, security, and faster performance.
      </p>
    </section>

    <section>
      <h2>Why Privacy Matters</h2>
      <p>
        We understand that many users convert personal images,
        work-related graphics, or sensitive content.
        For this reason, we built our tool with a privacy-first approach.
      </p>

      <p>
        No image uploads, no file storage, and no tracking of image content.
        Your data stays entirely under your control.
      </p>
    </section>

    <section>
      <h2>Our Vision</h2>
      <p>
        Our goal is to build a reliable and accessible online image
        conversion platform that supports modern web standards,
        improves website performance, and simplifies digital workflows.
      </p>

      <p>
        We continuously improve the platform to ensure compatibility
        with major browsers including Chrome, Edge, and Firefox.
      </p>
    </section>

    <section>
      <h2>Contact and Feedback</h2>
      <p>
        We value user feedback and are committed to improving the service.
        If you have suggestions, questions, or feature requests, please visit our
        <router-link to="/contact" class="contact-link">
          Contact page
        </router-link>.
        We appreciate your input.
      </p>
    </section>
  </div>

  <Footer />
</template>

<style scoped>
.about {
  padding: 60px 0;
}

h1 {
  margin-bottom: 30px;
}

section {
  margin-bottom: 40px;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

p {
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: 14px;
  font-size: 14px;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin-bottom: 10px;
  color: var(--gray);
  font-size: 14px;
}

.contact-link {
  color: var(--primary);
  font-weight: 600;
}
</style>
