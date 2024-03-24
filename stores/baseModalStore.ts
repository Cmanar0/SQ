// stores/baseModal.ts
import { defineStore } from 'pinia'

export const useBaseModalStore = defineStore({
  id: 'baseModal',
  state: () => ({
    // Initial state
    modalSettings: {
      title: 'Add New User',
      content: 'This is the content of the modal',
      leftBtn: {
        text: 'Cancel',
        action: null
      },
      rightBtn: {
        text: 'Save',
        action: null
      }
    },
    isModalOpen: false
  }),
  actions: {
    setModalSettings({
      title,
      content,
      leftBtnText,
      leftBtnAction,
      rightBtnText,
      rightBtnAction
    }: {
      title: string
      content: string
      leftBtnText: string
      leftBtnAction: any
      rightBtnText: string
      rightBtnAction: any
    }) {
      this.modalSettings.title = title
      this.modalSettings.content = content
      this.modalSettings.leftBtn.text = leftBtnText
      this.modalSettings.leftBtn.action = leftBtnAction
      this.modalSettings.rightBtn.text = rightBtnText
      this.modalSettings.rightBtn.action = rightBtnAction
    },
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    }
  },
  getters: {
    getModalSettings(): any {
      return this.modalSettings
    }
  }
})
