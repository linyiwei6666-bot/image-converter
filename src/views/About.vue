<script setup>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
</script>

<template>
  <Navbar />

  <div class="container about">
    <h1>About ImageConverter</h1>

    <section>
      <h2>Our Mission</h2>
      <p>
        ImageConverter was created to provide a simple, secure,
        and efficient way to convert image formats online.
        Our goal is to make image conversion accessible to everyone
        without requiring software installation or registration.
      </p>
    </section>

    <section>
      <h2>Why We Built This Tool</h2>
      <p>
        Many online image converters require users to upload files
        to external servers, which may raise privacy concerns.
        We believe users should have full control over their data.
      </p>

      <p>
        That is why our tool processes images directly in your browser.
        Your files never leave your device, ensuring maximum privacy
        and fast performance.
      </p>
    </section>

    <section>
      <h2>What We Offer</h2>
      <ul>
        <li>✔ Free JPG, PNG, and WEBP conversion</li>
        <li>✔ Fast browser-based processing</li>
        <li>✔ No file uploads or storage</li>
        <li>✔ Simple and clean user interface</li>
      </ul>
    </section>

    <section>
      <h2>Our Commitment</h2>
      <p>
        We are committed to maintaining a lightweight,
        easy-to-use image conversion tool that respects
        user privacy and delivers reliable performance.
      </p>

      <p>
        We continuously improve the website to enhance
        usability, performance, and compatibility with modern browsers.
      </p>
    </section>

    <section>
      <h2>Contact</h2>
      <p>
        If you have feedback or suggestions, please visit our
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
