<script setup lang="ts">
import userPlus from '../assets/svg/user-plus.vue'
import userMinus from '../assets/svg/user-minus.vue'
import edit from '../assets/svg/edit.vue'
import options from '../assets/svg/options.vue'

import { storeToRefs } from 'pinia'
import { manageUsers } from '@/stores/store' // Make sure to import the store

const usersStore = manageUsers() // Renamed to usersStore
const { users } = storeToRefs(usersStore) // Now clear that it's different from users

function addUser() {
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie']
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'White']
  const id = Math.floor(Math.random() * 1000)
  const age = Math.floor(Math.random() * 100)
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`
  usersStore.addUser({ id: id, name: name, age: age })
}

const dropdownOptions = ref([
  { value: 'edit', text: 'Edit' },
  { value: 'delete', text: 'Delete' }
])
const usedById = usersStore.getUserById(2)
</script>
<template>
  <div>
    <div class="main-header">
      <h1>List of users</h1>
      <button
        @click="addUser"
        class="btn-content mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <user-plus class="icon" />
        Add User
      </button>
    </div>
    <div>
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
            <th class="px-1 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="bg-white border-b">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.age }}</td>
            <td class="px-1 py-2 text-right text-sm font-medium">
              <div class="actions">
                <span class="btn-content">
                  <edit class="icon" />
                  Edit
                </span>
                <span class="btn-content">
                  <user-minus class="icon" />
                  Delete
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pre class="mt-4">{{ usedById }}</pre>
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
</style>
