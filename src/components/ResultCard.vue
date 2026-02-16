<script setup>
defineProps({
  fileUrl: String,
  fileName: String
})
</script>

<template>
  <div class="result-card">
    <img :src="fileUrl" alt="result" />

    <a :href="fileUrl" :download="fileName" class="download-btn">
      Download
    </a>
  </div>
</template>

<style scoped>
.result-card {
  margin-top: 40px;
  text-align: center;
}

.result-card img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.download-btn {
  background: var(--primary);
  color: white;
  padding: 12px 28px;
  border-radius: 4px;
  font-weight: 600;
  transition: 0.3s;
}

.download-btn:hover {
  background: #b00000;
}
</style>
