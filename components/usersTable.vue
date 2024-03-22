<script setup lang="ts">
import userPlus from '../assets/svg/user-plus.vue'
import userMinus from '../assets/svg/user-minus.vue'
import edit from '../assets/svg/edit.vue'
import close from '../assets/svg/close.vue'
import { ref, watch } from 'vue'

import { storeToRefs } from 'pinia'
import { manageUsers } from '@/stores/store'

const usersStore = manageUsers()
const { users } = storeToRefs(usersStore)

const userName = ref('')

const userEmail = ref('')
const isValidEmail = ref(true)

const userPassword = ref('')

const userPasswordConfirmation = ref('')

const isModalOpen = ref(false) // Controls the modal visibility

watch(userEmail, newValue => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  isValidEmail.value = emailPattern.test(newValue)
})

function addUser() {
  usersStore.addUser(userName.value, userEmail.value)
  userName.value = ''
  userEmail.value = ''
  userPassword.value = ''
  userPasswordConfirmation.value = ''
  isModalOpen.value = false
}
const usedById = usersStore.getUserById(2)

function editUser(id: number) {
  const user = usersStore.getUserById(id)
  console.log('user :>> ', user)
}

function deleteUser(id: number) {
  const user = usersStore.getUserById(id)
  console.log('user :>> ', user)
}
</script>
<template>
  <div>
    <div class="main-header">
      <h1>List of users</h1>
      <button
        @click="isModalOpen = true"
        class="btn-content mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <user-plus class="icon" /> Add User
      </button>
    </div>

    <div class="overflow-auto">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Age
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="bg-white border-b hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.age }}</td>
            <td class="px-5 py-2 text-right text-sm font-medium">
              <div class="actions">
                <span class="btn-content" @click="editUser(user.id)">
                  <edit class="icon" />
                  Edit
                </span>
                <span class="btn-content" @click="deleteUser(user.id)">
                  <user-minus class="icon" />
                  Delete
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <pre class="mt-4">{{ usedById }}</pre> -->
    <!-- -------------- Modal START -------------- -->
    <div>
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
        @click.self="isModalOpen = false"
      >
        <!-- Modal content, now centered -->
        <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md m-auto" @click.stop>
          <div class="modal-header flex justify-between items-start mb-4">
            <h2 class="text-xl font-semibold">Add New User</h2>
            <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-600">
              <span class="sr-only">Close</span>
              <close class="icon-close" />
            </button>
          </div>
          <div class="modal-body flex flex-col gap-4">
            <input
              v-model="userName"
              type="text"
              placeholder="Name"
              class="p-2 border border-gray-300 rounded w-full"
            />
            <input
              v-model="userEmail"
              type="text"
              placeholder="Email"
              class="p-2 border border-gray-300 rounded w-full"
            />
            <div class="flex flex-col gap-2">
              <input
                v-model="userEmail"
                type="email"
                placeholder="Email"
                :class="`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
                  isValidEmail.value
                    ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    : 'border-red-500 focus:ring-red-500 focus:border-red-500'
                }`"
              />
              <p v-if="!isValidEmail.value" class="text-sm text-red-500">Please enter a valid email.</p>
            </div>
            <input
              v-model="userPassword"
              type="password"
              placeholder="Password"
              class="p-2 border border-gray-300 rounded w-full"
            />
            <input
              v-model="userPasswordConfirmation"
              type="password"
              placeholder="Confirm Password"
              class="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div class="modal-footer flex justify-end mt-4">
            <button
              @click="addUser"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- -------------- Modal END -------------- -->
  </div>
</template>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
}
h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}
h2 {
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
}
.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
.actions span {
  display: flex;
  cursor: pointer;
  color: #777;
  align-items: center;
  background-color: #f9f9f9;
  padding: 0.4rem;
  border-radius: 0.25rem;
}
.actions span:hover {
  background-color: #e6e6e6;
  color: #555;
}
.actions span:active {
  background-color: #d9d9d9;
  color: #444;
}
.overflow-auto {
  overflow-x: auto;
  scrollbar-width: auto;
}

.overflow-auto::-webkit-scrollbar {
  height: 8px;
  background: #f1f1f1;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #888;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.icon-close {
  width: 1.5rem;
  height: 1.5rem;
  color: #666;
}
.icon-close:hover {
  color: #333;
}
</style>
