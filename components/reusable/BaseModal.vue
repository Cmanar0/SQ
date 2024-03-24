<template>
  <div>
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
      @click.self="closeModal"
    >
      <!-- Modal content -->
      <div
        class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md m-auto"
        @click.stop
      >
        <div class="modal-header flex justify-between items-start mb-4">
          <h2 class="text-xl font-semibold">{{ modalSettings.title }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <span class="sr-only">Close</span>
            <CloseIcon />
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

<script setup lang="ts">
import CloseIcon from '../../assets/svg/close.vue'
import { useBaseModalStore } from '@/stores/baseModalStore'

const baseModal = useBaseModalStore()

// Access store state
const { modalSettings, isModalOpen } = storeToRefs(baseModal)

// Access store actions
const { closeModal } = baseModal
</script>

<style></style>
