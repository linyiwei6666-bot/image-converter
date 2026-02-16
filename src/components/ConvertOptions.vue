<script setup>
import { ref, watch } from "vue"

const emit = defineEmits(["convert"])

const format = ref("image/png")
const quality = ref(0.8)

/* 当格式是 PNG 时隐藏质量调节 */
const showQuality = ref(false)

watch(format, (newVal) => {
  showQuality.value = newVal !== "image/png"
})

function handleConvert() {
  emit("convert", {
    format: format.value,
    quality: quality.value
  })
}
</script>

<template>
  <div class="options">
    <h3>Convert Options</h3>

    <div class="option-group">
      <label>Target Format</label>
      <select v-model="format">
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPG</option>
        <option value="image/webp">WEBP</option>
      </select>
    </div>

    <div class="option-group" v-if="showQuality">
      <label>Quality (Recommended: 0.8)</label>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.1"
        v-model="quality"
      />
      <span>{{ quality }}</span>
    </div>

    <button class="convert-btn" @click="handleConvert">
      Convert Image
    </button>
  </div>
</template>

<style scoped>
.options {
  margin-top: 40px;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 6px;
  background: #fff;

  display: flex;
  flex-direction: column;
}

h3 {
  margin-bottom: 20px;
  font-size: 18px;
}

.option-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  margin-bottom: 6px;
  color: #555;
}

select,
input[type="range"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.convert-btn {
  margin-top: 10px;
  background: #c40000;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  margin: 20px auto 0;
}

.convert-btn:hover {
  background: #a80000;
}
</style>
