<template>
  <div>
    {{ isVisible }}
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
      @click.self="isVisible = false"
    >
      <!-- Modal content, now centered -->
      <div
        class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md m-auto"
        @click.stop
      >
        <div class="modal-header flex justify-between items-start mb-4">
          <h2 class="text-xl font-semibold">{{ modalSettings.title }}</h2>
          <button
            @click="isVisible = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <span class="sr-only">Close</span>
            <close class="icon-close" />
          </button>
        </div>
        <div class="modal-body">{{ modalSettings.content }}</div>
        <div class="modal-footer flex justify-end mt-4">
          <button
            @click="modalSettings.leftBtn.action"
            class="text-gray-400 hover:text-gray-600"
          >
            {{ modalSettings.leftBtn.text }}
          </button>
          <button
            @click="modalSettings.rightBtn.action"
            class="text-blue-500 hover:text-blue-700 ml-4"
          >
            {{ modalSettings.rightBtn.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <div class="modal">
  <div class="modal-content">
    <span class="close" @click="toggleVisibility">X</span>
    <h3>{{ modalSettings.title }}</h3>
    <p>{{ modalSettings.content }}</p>
  </div>
</div>
<div v-if="isVisible">
  {{ isVisible }}
</div> -->

<script setup lang="ts">
import close from '../../assets/svg/close.vue'
import { defineExpose, ref } from 'vue'
const isVisible = ref(false)
// initiate modal settings:
const modalSettings = reactive({
  title: 'Title',
  content: 'This is the content of the modal',
  leftBtn: {
    text: 'Cancel',
    action: () => {}
  },
  rightBtn: {
    text: 'Save',
    action: () => {}
  }
})
function setModalSettings(modalSettingsArg: object) {
  Object.assign(modalSettings, modalSettingsArg)
  toggleVisibility()
}
function toggleVisibility() {
  isVisible.value = !isVisible.value
}

defineExpose({ setModalSettings, toggleVisibility })
</script>

<style></style>
