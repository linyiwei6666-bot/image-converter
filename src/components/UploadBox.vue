<script setup>
const emit = defineEmits(["fileSelected"])

function handleFile(e) {
  const file = e.target.files[0]
  if (file) {
    emit("fileSelected", file)
  }
}
</script>

<template>
  <div class="upload-box">
    <input type="file" @change="handleFile" accept="image/*" />

    <div class="upload-content">
      <p>Drag & Drop your image here</p>
      <span>or click to browse</span>
    </div>
  </div>
</template>

<style scoped>
.upload-box {
  border: 2px dashed var(--primary);
  padding: 60px 20px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: 0.3s;
}

.upload-box:hover {
  background: #fff5f5;
}

.upload-box input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.upload-content p {
  font-size: 18px;
  font-weight: 600;
  text-align: center;

}

.upload-content span {
  font-size: 14px;
  color: var(--gray);
}
</style>
